import { supabase } from './supabase'

export async function uploadProfilePicture(personId, file) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Generate filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${personId}_profile.${fileExt}`

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(fileName)

    return { url: data.publicUrl, error: null }
  } catch (error) {
    console.error('Upload error:', error)
    return { url: null, error }
  }
}
