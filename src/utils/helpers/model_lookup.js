import * as Models from 'KegModels'

export const modelLookup = type => {
  return Models[type]
}