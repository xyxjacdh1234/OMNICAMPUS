import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as crypto from "https://deno.land/std@0.168.0/node/crypto.ts"

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const signature = req.headers.get('x-razorpay-signature')
  const bodyText = await req.text()
  const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET')!

  // 1. Verify cryptographic signature from Razorpay
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(bodyText)
    .digest('hex')

  if (signature !== expectedSignature) {
    console.error('Invalid Razorpay signature webhook attempt.')
    return new Response('Invalid signature', { status: 400 })
  }

  const event = JSON.parse(bodyText)

  // 2. Initialize Supabase Admin Client using Service Role Key (bypasses RLS for secure server updates)
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // 3. Handle successful 'payment.captured' event
  if (event.event === 'payment.captured') {
    const paymentEntity = event.payload.payment.entity
    const razorpayPaymentId = paymentEntity.id
    const requestId = paymentEntity.notes?.request_id

    if (requestId) {
      // Update payment record securely
      await supabaseAdmin
        .from('payments')
        .update({ 
          status: 'completed', 
          payment_reference: razorpayPaymentId 
        })
        .eq('request_id', requestId)

      // Automatically transition the deal request status to completed
      await supabaseAdmin
        .from('requests')
        .update({ status: 'completed' })
        .eq('id', requestId)
    }
  }

  return new Response(JSON.stringify({ status: 'success' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
