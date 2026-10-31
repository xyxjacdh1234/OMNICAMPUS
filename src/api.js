import { supabase } from './supabaseClient';

async function fetchRankedMatches(category, maxBudget) {
  const { data, error } = await supabase
    .rpc('get_matched_resources', {
      search_category: category,
      max_budget: maxBudget
    });

  if (error) {
    console.error('Match ranking error:', error);
    return { data: [], error };
  }

  return { data, error: null };
}

export { fetchRankedMatches };