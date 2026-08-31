import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'netlify-functions-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/.netlify/functions/verify-recaptcha' && req.method === 'POST') {
              let body = ''
              req.on('data', (chunk) => {
                body += chunk
              })
              req.on('end', async () => {
                try {
                  const parsed = JSON.parse(body || '{}')
                  const token = parsed.token
                  const secretKey = env.RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY

                  if (!token) {
                    res.statusCode = 400
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ success: false, message: 'reCAPTCHA token is required.' }))
                    return
                  }

                  if (!secretKey || secretKey === 'PASTE_SECRET_KEY_HERE') {
                    res.statusCode = 500
                    res.setHeader('Content-Type', 'application/json')
                    res.end(
                      JSON.stringify({
                        success: false,
                        message: 'RECAPTCHA_SECRET_KEY is not configured in local .env file.',
                      })
                    )
                    return
                  }

                  const googleRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ secret: secretKey, response: token }),
                  })

                  const data = await googleRes.json()
                  res.statusCode = data.success ? 200 : 400
                  res.setHeader('Content-Type', 'application/json')
                  res.end(
                    JSON.stringify({
                      success: data.success,
                      message: data.success
                        ? 'reCAPTCHA verification successful.'
                        : 'reCAPTCHA verification failed.',
                      errorCodes: data['error-codes'] || [],
                    })
                  )
                } catch (err) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: false, message: 'Local dev verification error.' }))
                }
              })
              return
            }
            next()
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
