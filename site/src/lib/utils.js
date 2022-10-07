export const formatTags = (tags) => {
  if (typeof tags === 'string') {
    return tags.split(',').map((tag) => tag.trim())
  }
  if (Array.isArray(tags)) {
    return tags
  }
  return []
}

const numericFilter = (constraintType, limit, value) => {
  switch(constraintType) {
    case 'gt':
      return limit >= value
    case 'lt':
      return limit <= value
    case 'eq':
    default:
      return limit === value
  }
}

const rangeFilter = (min, max, value) => min <= value &&  max >= value

export const filterData = (data, filters) => {
  let newData = data
  filters.forEach(({column, value, type, ...rest}) => {
    newData = newData.filter((item) => {
      if (type === 'number' || type === 'percentage') {
        return numericFilter(rest.constraint, item[column], value)
      }
      if (type === 'range') {
        return rangeFilter(item[column].min, item[column].max, value)
      }

      let test = item[column]
      if (type === 'object') {
        test = Object.values(item[column]).join(' ')
      }
      const reg = new RegExp(value, 'i')
      return reg.test(test)
    })
  })
  return newData
}
