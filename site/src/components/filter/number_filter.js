import React from 'react'
import {
  TextField,
  IconButton
} from '@mui/material'
import {
  TRANSLATIONS,
  DEFAULT_FILTER
} from 'lib/constants'

export const NumberFilter = ({filters, filterConf, currentFilter, setFilters}) => {
  const constraints = Object.keys(TRANSLATIONS)
  const setFilterConstraint = () => {
    const filter = currentFilter || DEFAULT_FILTER
    const index = constraints.indexOf(filter.constraint) + 1
    setFilters({
      ...filters,
      [filterConf.column]: {
        ...filter,
        constraint: index === constraints.length ? 'eq' : constraints[index]
      }
    })
  }
  const setFilterNumberValue = ({target}) => {
    const value = Number(target.value)
    const filter = currentFilter || DEFAULT_FILTER
    setFilters({
      ...filters,
      [filterConf.column]: {
        ...filter,
        ...filterConf,
        value
      }
    })
  }
  const clearFilter = () => {
    setFilters({
      ...filters,
      [filterConf.column]: {...DEFAULT_FILTER, column: currentFilter.column}
    })
  }

  return (
    <div className='number-filter'>
      <label>{filterConf.label}</label>
      <IconButton size='small' onClick={setFilterConstraint}>
        {TRANSLATIONS[currentFilter.constraint]}
      </IconButton>
      <TextField
        label=''
        type='number'
        name='numberFilter'
        variant='filled'
        inputProps={{'data-filter': JSON.stringify(filterConf)}}
        value={currentFilter.value}
        onChange={setFilterNumberValue}
      />
      <IconButton size='small' onClick={clearFilter}>x</IconButton>
    </div>
  )
}
