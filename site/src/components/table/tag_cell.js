import React from 'react'
import {Chip} from '@material-ui/core'

export const TableTagCell = ({label, filters, setFilters, column, filterLabel}) => {
  const clickOnTag = (ev) => {
    const hasTagFilter = filters.findIndex((f) => f.column === column)
    const value = ev.target.dataset.value || ev.target.innerHTML
    const newFilter = {
      column,
      value,
      type: 'array',
      label: filterLabel
    }
    if (hasTagFilter === -1) {
      setFilters([...filters, newFilter])
      return 
    } else if (filters[hasTagFilter].value === value) {
      setFilters([
        ...filters.slice(0, hasTagFilter),
        ...filters.slice(hasTagFilter + 1)
      ])
    } else {
      setFilters([
        ...filters.slice(0, hasTagFilter),
        ...filters.slice(hasTagFilter + 1),
        newFilter
      ])
    }
  }

  return (
    <Chip
      data-value={label}
      label={label}
      variant='outlined'
      color='primary'
      onClick={clickOnTag}
    />
  )
}

TableTagCell.defaultProps = {
  column: 'tags',
  filterLabel: 'Tag'
}
