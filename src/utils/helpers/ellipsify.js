

export const ellipsify = (text, limit=10, after='...') => {
  return !text || text.length < limit
    ? text
    : text.trim().slice(0, limit) + (after ? after : '')
}

export const truncate = (text, limit=10, after='...') => {
  return !text || text.length < limit
    ? text
    : text.trim().split(' ').slice(0, limit).join(' ') + (after ? after : '')
}
