import { supabase } from './supabaseClient';

// 1. Student submits an internal request to their college tech department regarding a resource
async function submitStudentInternalRequest(requestData) {
  // requestData should include: student_email, student_college_id, target_resource_id, notes
  const { data, error } = await supabase
    .from('student_requests')
    .insert([
      {
        ...requestData,
        status: 'pending_college_review'
      }
    ])
    .select();

  if (error) {
    console.error('Error submitting student request:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

// 2. College Tech Dept views incoming requests from their own students
async function fetchCollegeInternalRequests(collegeId) {
  const { data, error } = await supabase
    .from('student_requests')
    .select('*, resources(title, price, listing_type)')
    .eq('student_college_id', collegeId);

  if (error) {
    console.error('Error fetching student requests:', error);
    return { data: [], error };
  }

  return { data, error: null };
}

export { submitStudentInternalRequest, fetchCollegeInternalRequests };