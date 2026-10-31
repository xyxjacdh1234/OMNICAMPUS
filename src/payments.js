import { supabase } from './supabaseClient';

// 1. Initialize a transaction when a college accepts a request
async function initiateDealPayment(requestId, totalAmount) {
  // Calculate commission (12%) and provider payout (88%)
  const commission = totalAmount * 0.12;
  const providerPayout = totalAmount * 0.88;

  const { data, error } = await supabase
    .from('payments')
    .insert([
      {
        request_id: requestId,
        total_amount: totalAmount,
        status: 'pending'
      }
    ])
    .select();

  if (error) {
    console.error('Payment initialization error:', error);
    return { success: false, error };
  }

  return { success: true, paymentRecord: data[0], commission, providerPayout };
}

// 2. Update payment status after successful gateway confirmation
async function confirmPayment(paymentId, razorpayPaymentId) {
  const { data, error } = await supabase
    .from('payments')
    .update({ 
      status: 'completed', 
      payment_reference: razorpayPaymentId 
    })
    .eq('id', paymentId)
    .select();

  if (error) {
    console.error('Payment confirmation error:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

export { initiateDealPayment, confirmPayment };