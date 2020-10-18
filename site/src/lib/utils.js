export const formatTags = (tags) => {
  if (typeof tags === 'string') {
    return tags.split(',').map((tag) => tag.trim())
  }
  if (Array.isArray(tags)) {
    return tags
  }
  return []
}
