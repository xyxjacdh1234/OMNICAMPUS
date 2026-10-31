import { supabase } from './supabaseClient';

// 1. Send a message within a specific request/deal
async function sendDealMessage(requestId, senderCollegeId, messageText) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        request_id: requestId,
        sender_college_id: senderCollegeId,
        message_text: messageText
      }
    ])
    .select();

  if (error) {
    console.error('Error sending message:', error);
    return { success: false, error };
  }

  return { success: true, data: data[0] };
}

// 2. Fetch existing message history for a deal
async function fetchDealMessages(requestId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, colleges(name, logo)')
    .eq('request_id', requestId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return { data: [], error };
  }

  return { data, error: null };
}

// 3. Subscribe to live real-time incoming messages for an active deal
function subscribeToDealChat(requestId, onNewMessage) {
  return supabase
    .channel(`deal-${requestId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `request_id=eq.${requestId}`
      },
      (payload) => {
        onNewMessage(payload.new);
      }
    )
    .subscribe();
}

export { sendDealMessage, fetchDealMessages, subscribeToDealChat };