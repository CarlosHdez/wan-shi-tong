import React from 'react'
import {
  TextField,
  IconButton
} from '@material-ui/core'
import {
  TRANSLATIONS,
  DEFAULT_FILTER 
} from 'lib/constants'

export const NumberFilter = ({filters, filter, currentFilter, setFilters}) => {
  const constraints = Object.keys(TRANSLATIONS)
  const setFilterConstraint = () => {
    const filter = currentFilter || DEFAULT_FILTER
    const index = constraints.indexOf(filter.constraint) + 1
    setFilters({
      ...filters,
      [currentFilter.column]: {
        ...filter,
        constraint: index === constraints.length ? 'eq' : constraints[index]
      }
    })
  }
  const setFilterNumberValue = ({target}) => {
    const filter = JSON.parse(target.dataset.filter)
    const value = filter.type === 'percentage' ?
      target.value / 100 :
      Number(target.value)
    setFilters({
      ...filters,
      [filter.column]: {
        ...DEFAULT_FILTER,
        ...filter,
        value
      }
    })
  }
  const clearFilter = () => {
    setFilters({
      ...filters,
      [currentFilter.column]: {...DEFAULT_FILTER, column: currentFilter.column}
    })
  }

  return (
    <div className='number-filter'>
      <label>{filter.label}</label>
      <IconButton size='small' onClick={setFilterConstraint}>
        {TRANSLATIONS[currentFilter.constraint]}
      </IconButton>
      <TextField
        label=''
        type='number'
        name='numberFilter'
        variant='filled'
        inputProps={{'data-filter': JSON.stringify(filter)}}
        value={currentFilter.value}
        onChange={setFilterNumberValue}
      />
      <IconButton size='small' onClick={clearFilter}>x</IconButton>
    </div>
  )
}
