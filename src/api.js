import { supabase } from './supabaseClient';

// 1. Register a new college
async function registerCollege(collegeData) {
  const { data, error } = await supabase
    .from('colleges')
    .insert([collegeData])
    .select();
  return { data, error };
}

// 2. Fetch all active resources for browsing/swiping
async function fetchResources() {
  const { data, error } = await supabase
    .from('resources')
    .select('*, colleges(name, city, logo)')
    .eq('status', 'active');
  return { data, error };
}

// 3. Add a new resource listing (College Tech Dept)
async function addResource(resourceData) {
  const { data, error } = await supabase
    .from('resources')
    .insert([resourceData])
    .select();
  return { data, error };
}

// 4. Send an inter-college deal request
async function sendRequest(requestData) {
  const { data, error } = await supabase
    .from('requests')
    .insert([requestData])
    .select();
  return { data, error };
}

// 5. Fetch Super Admin Metrics (For your 12% commission & analytics view)
async function fetchAdminMetrics() {
  const { count: collegeCount } = await supabase.from('colleges').select('*', { count: 'exact', head: true });
  const { data: payments } = await supabase.from('payments').select('commission_12_percent, total_amount');
  
  const totalVolume = payments?.reduce((acc, curr) => acc + Number(curr.total_amount), 0) || 0;
  const netCommission = payments?.reduce((acc, curr) => acc + Number(curr.commission_12_percent), 0) || 0;

  return { totalVolume, netCommission, registeredColleges: collegeCount || 0 };
}

export { registerCollege, fetchResources, addResource, sendRequest, fetchAdminMetrics };