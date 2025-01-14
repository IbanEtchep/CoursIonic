import { createClient } from 'npm:@supabase/supabase-js@2'
import { JWT } from 'npm:google-auth-library@9'
import serviceAccount from '../service-account.json' with { type: 'json' }

const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

Deno.serve(async (req) => {
  try {
    const payload = await req.json()
    console.log('Webhook payload:', payload)

    const { data: deviceTokens, error: tokenError } = await supabase
        .from('device_tokens')
        .select('push_token')
        .eq('user_id', payload.record.user_id)

    console.log('Device tokens result:', { deviceTokens, tokenError })

    if (tokenError) {
      throw new Error(`Token error: ${tokenError.message}`)
    }

    if (!deviceTokens || deviceTokens.length === 0) {
      throw new Error('No FCM tokens found for user')
    }

    const jwtClient = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    })

    const { access_token } = await jwtClient.authorize()
    console.log('Got access token:', !!access_token)

    const notificationPromises = deviceTokens.map(async ({ push_token }) => {
      const fcmResponse = await fetch(
          `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: {
                token: push_token,
                notification: {
                  title: 'TODO',
                  body: payload.record.body
                }
              }
            })
          }
      )

      const fcmResult = await fcmResponse.json()
      console.log('FCM response for token:', push_token, fcmResult)

      await supabase
          .from('sent_notifications')
          .insert({
            todo_id: payload.record.todo_id,
            notification_type_id: payload.record.notification_type_id,
            user_id: payload.record.user_id,
            push_token: push_token,
            message: payload.record.body
          })

      return { token: push_token, result: fcmResult }
    })

    const results = await Promise.all(notificationPromises)

    return new Response(
        JSON.stringify({
          success: true,
          results
        }),
        { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
        JSON.stringify({
          error: error.message,
          stack: error.stack
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        }
    )
  }
})