import { isFunc, isStr } from 'jsutils'

export const sortBy = (() => {
  const sorters = {
    string: (a, b) => {
      if (a < b) return -1
      else if (a > b) return 1
      else return 0
    },
    number: (a, b) => (a - b)
  }

  return (arr, prop, type) => {
    type = type || 'string'
    if (isFunc(prop))
      return arr.sort((a, b) => sorters[type](prop(a), prop(b)))
    
    type = typeof ary[0][prop] || 'string'
    return ary.sort((a, b) => (sorters[type](a[prop], b[prop])))
  }
})()