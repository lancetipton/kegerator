import * as Actions from 'SVActions'
import { capitalize, isFunc } from 'jsutils'

export const actionLookup = (action, type, ...props) => {
  const name = `${action}${capitalize(type)}`

  return !isFunc(Actions[name])
    ? false
    : props.length
      ? Actions[name](...props)
      : Actions[name]
}
