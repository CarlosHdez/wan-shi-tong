import React, {useState} from 'react'
import {
  Dialog,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
  Chip
} from '@material-ui/core'
import {FilterList} from '@material-ui/icons'

import FormWrapper from 'components/form'
import {NumberFilter} from 'components/filter/number_filter'
import {
  TRANSLATIONS,
  DEFAULT_FILTER 
} from 'lib/constants'
import 'stylesheets/components/filter.scss'

const FilterModal = ({open, onClose, filterOptions, initialFilters = [], saveFilter}) => {
  const filterObj = initialFilters
    .reduce((acc, filter) => ({...acc, [filter.column]: filter}), {})
  const [filters, setFilters] = useState(filterObj)

  const onSave = () => {
    saveFilter(Object.values(filters).filter(({value}) => value))
    onClose()
  }

  const setFilterValue = ({target}) => {
    const filter = JSON.parse(target.dataset.filter)
    setFilters({
      ...filters,
      [filter.column]: {
        ...DEFAULT_FILTER,
        ...filter,
        value: target.value
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

  const filterInput = (filter) => {
    const currentFilter = filters[filter.column] || DEFAULT_FILTER
    switch (filter.type) {
      case 'string':
      case 'object':
        return (
          <TextField
            key={filter.column}
            inputProps={{'data-filter': JSON.stringify(filter)}}
            label={`${filter.label} (Contains)`}
            name='stringFilter'
            variant='filled'
            value={currentFilter.value}
            onChange={setFilterValue}
          />
        )
      case 'number':
      case 'percentage':
        return (
          <NumberFilter
            key={filter.column}
            filters={filters}
            filterConf={filter}
            currentFilter={currentFilter}
            setFilters={setFilters}
          />
        )
      case 'range':
        return (
          <TextField
            key={filter.column}
            label={filter.label}
            type='number'
            name='rangeFilter'
            variant='filled'
            inputProps={{'data-filter': JSON.stringify(filter)}}
            value={currentFilter.value}
            onChange={setFilterNumberValue}
          />
        )
      case 'enum':
        const values = filter.options
          .map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)
        return (
          <TextField
            key={filter.column}
            label={filter.label}
            name='numberType'
            variant='filled'
            value={currentFilter.value}
            onChange={({target}) => setFilterValue({
              // Hack to mock the input data field
              target: {
                ...target,
                dataset: {filter: JSON.stringify(filter)}
              }
            })}
            select
          >
            {values}
          </TextField>
        )
      default:
        return
    }
  }

  return (
    <Dialog aria-labelledby='filter-modal' onClose={onClose} open >
      <DialogTitle id='filter-modal'>Filter by</DialogTitle>
      <FormWrapper
        wrapperClass='filter-editor'
        onSave={onSave}
        onCancel={onClose}
        canSave
        hasControls
      >
        {filterOptions.map(filterInput)}
      </FormWrapper>
    </Dialog>
  )
}

const FilterRow = ({filters, setFilters, filterOptions}) => {
  const [open, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const removeFilter = (column) => {
    setFilters(filters.filter((i) => i.column !== column))
  }

  // TODO: Move to their component
  const chips = filters
    .filter(({label}) => !!label)
    .map(({column, value, ...rest}, i) => {
      let label = `${rest.label}: ${value}`
      if (rest.type === 'enum') {
        label = `${rest.label}: ${rest.options.find(({id}) => id === value).name}`
      }
      if (rest.type === 'number') {
        label = `${rest.label} ${TRANSLATIONS[rest.constraint]} ${value}`
      }
      if (rest.type === 'percentage') {
        const val = (value / 100).toLocaleString(undefined, {style: 'percent'})
        label = `${rest.label} ${TRANSLATIONS[rest.constraint]} ${val}`
      }
      return (
        <Chip
          key={column}
          label={label}
          color='secondary'
          onDelete={() => removeFilter(column)}
        />
      )
    })

  return (
    <>
      <Button size='small' onClick={openModal}>
        <FilterList />
      </Button>
      {chips}
      {open && (
        <FilterModal
          onClose={closeModal}
          filterOptions={filterOptions}
          initialFilters={filters}
          saveFilter={setFilters}
        />
      )}
    </>
  )
}

export default FilterRow
