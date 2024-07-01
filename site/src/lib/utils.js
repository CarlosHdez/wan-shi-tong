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
      const reg = new RegExp(value, 'i')
      if (column === 'search') { // Special column to search directly
        return reg.test(item[rest.key])
      }
      if (type === 'number') {
        return numericFilter(rest.constraint, item[column], value)
      }
      if (type === 'percentage') {
        return numericFilter(rest.constraint, item[column], value / 100)
      }
      if (type === 'range') {
        return rangeFilter(item[column].min, item[column].max, value)
      }
      if (type === 'array') {
        return item[column].some((tag) => reg.test(tag.name))
      }

      let test = item[column]
      if (type === 'object') {
        // Join the text values in the object item and filter mathing those
        test = Object.values(item[column]).join(' ')
      }
      return reg.test(test)
    })
  })
  return newData
}
