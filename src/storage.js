import { supabase } from './supabaseClient';

// Upload an image or document to Supabase Storage
async function uploadFile(file, bucketName) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36.substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error);
    return { url: null, error };
  }

  // Get public URL for public buckets (college-images, resource-images)
  if (bucketName !== 'verification-docs') {
    const { data: publicURLData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return { url: publicURLData.publicUrl, error: null };
  }

  return { url: filePath, error: null };
}

export { uploadFile };