import imageCompression from 'browser-image-compression';

/**
 * Compress and convert image to WebP format
 * - Max file size: 5 MB (rejects larger files)
 * - Resizes to max 400x400px (preserves aspect ratio)
 * - Converts to WebP format
 * - Quality: 85%
 * - Target output: ~30-50 KB
 */
export async function compressProfilePicture(file) {
  try {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
    }

    // Check file size (5 MB max)
    const MAX_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error(`File size exceeds ${MAX_SIZE_MB} MB. Please choose a smaller image.`);
    }

    // Compression options
    const options = {
      maxSizeMB: 0.05, // Target 50 KB max
      maxWidthOrHeight: 400, // Max dimension
      useWebWorker: true,
      fileType: 'image/webp', // Convert to WebP
      initialQuality: 0.85, // 85% quality
    };

    // Compress the image
    const compressedFile = await imageCompression(file, options);

    // Create a new File object with .webp extension
    const webpFile = new File(
      [compressedFile],
      file.name.replace(/\.[^/.]+$/, '.webp'),
      { type: 'image/webp' }
    );

    return { file: webpFile, error: null };
  } catch (error) {
    console.error('Compression error:', error);
    return { file: null, error: error.message };
  }
}
