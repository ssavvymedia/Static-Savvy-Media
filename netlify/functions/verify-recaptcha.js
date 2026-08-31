// Netlify Serverless Function: verify-recaptcha
// Verifies Google reCAPTCHA v2 token server-side using RECAPTCHA_SECRET_KEY

export async function handler(event) {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
    }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const token = body.token

    if (!token) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'reCAPTCHA token is required for verification.',
        }),
      }
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey || secretKey === 'PASTE_SECRET_KEY_HERE') {
      console.warn('RECAPTCHA_SECRET_KEY is not configured in server environment variables.')
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'Server error: RECAPTCHA_SECRET_KEY is not configured in environment variables.',
        }),
      }
    }

    // Verify token with Google's reCAPTCHA siteverify endpoint
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()

    if (data.success) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'reCAPTCHA verification successful.',
        }),
      }
    } else {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          message: 'reCAPTCHA verification failed. Please check your captcha and try again.',
          errorCodes: data['error-codes'] || [],
        }),
      }
    }
  } catch (error) {
    console.error('reCAPTCHA server verification error:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        message: 'Server error during reCAPTCHA verification.',
      }),
    }
  }
}
