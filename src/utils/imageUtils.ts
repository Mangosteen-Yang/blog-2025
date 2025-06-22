/**
 * Generates a random cover image path from available placeholder images
 * @returns {string} Path to a random placeholder image
 */
export function getRandomCoverImage(): string {
  // We have 5 placeholder images (blog-placeholder-1.jpg through blog-placeholder-5.jpg)
  const placeholderCount = 5;
  const randomIndex = Math.floor(Math.random() * placeholderCount) + 1;
  return `/images/blog-placeholder-${randomIndex}.jpg`;
}
