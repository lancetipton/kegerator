export const ellipsify = string => {
  return string.length > 40 ? `${string.substr(0, 37)}...` : string
}