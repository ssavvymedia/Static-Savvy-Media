import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { handleContactSubmission, parseJsonBody } from './server/contact/submit-contact.js'

// Paths served by the dev middleware: the production endpoint (Vercel Function
// api/submit-contact.js) and the old Netlify path, kept for `netlify dev`.
const CONTACT_ENDPOINTS = new Set(['/api/submit-contact', '/.netlify/functions/submit-contact'])

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'contact-form-dev-middleware',
        // 'pre' guarantees this runs before Vite's own internal middlewares
        // (including the SPA history fallback), no matter what other plugins
        // are added to this array later. NOTE: Vite does not hot-reload
        // changes to this file's plugins/middleware — after editing
        // vite.config.js you must fully stop and restart `npm run dev`
        // (a browser refresh alone is not enough).
        enforce: 'pre',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const path = (req.url || '').split('?')[0]
            if (!CONTACT_ENDPOINTS.has(path) || req.method !== 'POST') return next()

            const jsonRes = (code, data) => {
              res.statusCode = code
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
            }

            let body = ''
            req.on('data', (chunk) => {
              body += chunk
            })
            req.on('end', async () => {
              try {
                const payload = parseJsonBody(body)
                if (payload === undefined) {
                  return jsonRes(400, { success: false, code: 'INVALID_JSON', message: 'Invalid request payload.' })
                }
                // Same pipeline as production (server/contact/submit-contact.js).
                const { statusCode, body: result } = await handleContactSubmission(payload, { env })
                jsonRes(statusCode, result)
              } catch (err) {
                console.error('Dev middleware error:', err)
                jsonRes(500, { success: false, code: 'DEV_ERROR', message: err.message || 'Server error.' })
              }
            })
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
