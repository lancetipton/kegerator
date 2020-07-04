const buildApiRoute = (apiType, id, action) => {
  return !apiType
    ? console.error(`apiType is required to build the api route`)
    : `${apiType}?apiType=${apiType}${ id && `&id=${id}` || '' }${ action && `&action=${action}` || '' }`
}

export {
  buildApiRoute
}