/**
 * Generate initials from first and last name
 */
export function getInitials(firstName, lastName) {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return first + last;
}

/**
 * Generate a consistent color from a string (person's name)
 * Returns a pleasant pastel color similar to Apple's design
 */
export function getColorFromName(firstName, lastName) {
  const name = `${firstName}${lastName}`;

  // Simple hash function to convert name to a number
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Apple-like color palette (pleasant, accessible colors)
  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Salmon
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE', // Purple
    '#85C1E2', // Sky Blue
    '#F8B88B', // Peach
    '#A8E6CF', // Light Green
    '#FFD3B6', // Light Orange
    '#FFAAA5', // Pink
  ];

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Generate an avatar URL - either the provided image or a data URI with initials
 */
export function getAvatarUrl(firstName, lastName, profilePictureUrl) {
  if (profilePictureUrl) {
    return profilePictureUrl;
  }

  const initials = getInitials(firstName, lastName);
  const bgColor = getColorFromName(firstName, lastName);

  // Create SVG with initials and colored background (single line for better encoding)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="${bgColor}"/><text x="100" y="100" dominant-baseline="central" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="80" font-weight="500" fill="white">${initials}</text></svg>`;

  // Convert to data URI
  const encoded = encodeURIComponent(svg).replace(/'/g, '%27');
  return `data:image/svg+xml,${encoded}`;
}
