import { supabase } from './supabaseClient';

// Fetch real-time platform earnings and system metrics (Co-Founders Only)
async function fetchAdminDashboardMetrics() {
  // 1. Get total registered colleges count
  const { count: collegeCount, error: collegeError } = await supabase
    .from('colleges')
    .select('*', { count: 'exact', head: true });

  // 2. Get total payments & calculate 12% commission revenue
  const { data: payments, error: paymentError } = await supabase
    .from('payments')
    .select('total_amount, commission_12_percent, status');

  if (collegeError || paymentError) {
    console.error('Admin metrics error:', collegeError || paymentError);
    return null;
  }

  const grossVolume = payments?.reduce((acc, curr) => acc + Number(curr.total_amount), 0) || 0;
  const netCommissionRevenue = payments?.reduce((acc, curr) => acc + Number(curr.commission_12_percent), 0) || 0;
  const completedDealsCount = payments?.filter(p => p.status === 'completed').length || 0;

  return {
    registeredColleges: collegeCount || 0,
    grossVolume,
    netCommissionRevenue,
    completedDealsCount
  };
}

export { fetchAdminDashboardMetrics };