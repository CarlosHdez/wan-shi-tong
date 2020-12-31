import React, {useState} from 'react'
import {
  Dialog,
  DialogTitle,
  TextField,
  MenuItem,
  Chip
} from '@material-ui/core'
import {FilterList} from '@material-ui/icons'

import FormWrapper from 'components/form'

const defaultFilter = {
  column: '', // key in the data array
  value: '', // the value to match
  type: '', // type of filter
  label: '', // display value
  constraint: 'eq' // The type of filter to apply (greater than, equal, lower than)
}

const TRANSLATIONS = {
  eq: '=',
  gt: '>',
  lt: '<'
}

const FilterModal = ({open, onClose, options, saveFilter}) => {
  const [filter, setFilter] = useState(defaultFilter)

  const handleClose = () => {
    onClose()
    setFilter(defaultFilter)
  }

  const onSave = () => {
    saveFilter(filter)
    handleClose()
  }

  const selectColumn = ({currentTarget}) => {
    const values = JSON.parse(currentTarget.dataset.content)
    setFilter({...filter, ...values, value: ''})
  }

  const setFilterValue = ({target}) => {
    setFilter({...filter, value: target.value})
  }

  const setFilterConstraint = ({target}) => {
    setFilter({...filter, constraint: target.value})
  }

  const filterInput = () => {
    switch (filter.type) {
      case 'string':
        return (
          <TextField
            label='Contains'
            name='stringFilter'
            variant='filled'
            onChange={setFilterValue}
          />
        )
      case 'number':
        return (
          <>
            <TextField
              label='Type'
              name='numberType'
              variant='filled'
              value={filter.constraint}
              onChange={setFilterConstraint}
              select
            >
              <MenuItem value='gt'>Greater than</MenuItem>
              <MenuItem value='lt'>Lower than</MenuItem>
              <MenuItem value='eq'>Equal</MenuItem>
            </TextField>
            <TextField
              label='Value'
              type='number'
              name='numberFilter'
              onChange={setFilterValue}
              variant='filled'
            />
          </>
        )
      case 'enum':
        const values = filter.options
          .map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)
        return (
          <TextField
            label='Option'
            name='numberType'
            variant='filled'
            value={filter.value}
            onChange={setFilterValue}
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
    <Dialog
      aria-labelledby='filter-modal'
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id='filter-modal'>Filter by</DialogTitle>
      <FormWrapper
        wrapperClass='author-editor'
        onSave={onSave}
        onCancel={handleClose}
        hasControls
      >
        <TextField
          label='Column'
          name='column'
          variant='filled'
          value={filter.column}
          onChange={selectColumn}
          select
        >
          {options}
        </TextField>
        {filterInput()}
      </FormWrapper>
    </Dialog>
  )
}

const FilterRow = ({tableFilters, applyFilters}) => {
  const [open, setOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const updateFilters = (filters) => {
    setActiveFilters(filters)
    applyFilters(filters)
  }

  const saveFilter = (filter) => {
    updateFilters([...activeFilters, filter])
  }

  const removeFilter = (column) => {
    updateFilters(activeFilters.filter((i) => i.column !== column))
  }

  // TODO: Move to their component
  const chips = activeFilters.map(({column, value, ...rest}, i) => {
    let label = `${rest.label}: ${value}`
    if (rest.type === 'enum') {
      label = `${rest.label}: ${rest.options.find(({id}) => id === value).name}`
    }
    if (rest.type === 'number') {
      label = `${rest.label} ${TRANSLATIONS[rest.constraint]} ${value}`
    }
    return (
      <Chip
        key={column}
        label={label}
        onDelete={() => removeFilter(column)}
      />
    )
  })

  const options = tableFilters.map((option) => {
    const disabled = activeFilters.find(({column}) => column === option.column)
    return (
      <MenuItem
        key={option.column}
        data-content={JSON.stringify(option)}
        value={option.column}
        disabled={!!disabled}
      >
        {option.label}
      </MenuItem>
    )
  })

  return (
    <div className='table--filters'>
      <FilterList onClick={openModal} />
      {chips}
      <FilterModal
        open={open}
        onClose={closeModal}
        options={options}
        saveFilter={saveFilter}
      />
    </div>
  )
}

export default FilterRow
