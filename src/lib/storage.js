import { supabase } from './supabase'

export async function uploadProfilePicture(personId, file) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Validate file type (WebP preferred, but accept others for legacy)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.')
    }

    // Validate file size (5 MB max - should be much smaller after compression)
    const MAX_SIZE_MB = 5
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error(`File size exceeds ${MAX_SIZE_MB} MB. Please choose a smaller image.`)
    }

    // Generate filename - force .webp extension since all files should be WebP
    const fileName = `${user.id}/${personId}_profile.webp`

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type
      })

    if (uploadError) throw uploadError

    // Get public URL with cache-busting timestamp
    const { data } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(fileName)

    // Add timestamp to prevent browser caching old images
    const urlWithCacheBust = `${data.publicUrl}?t=${Date.now()}`

    return { url: urlWithCacheBust, error: null }
  } catch (error) {
    console.error('Upload error:', error)
    return { url: null, error }
  }
}
