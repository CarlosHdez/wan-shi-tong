import React, {useState, useCallback} from 'react'
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
import useForm from 'hooks/useForm'

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

const validateFilter = ({column, value}) => {
  const errors = {}
  if (!value) {
    errors.value = true
  }
  if (!column) {
    errors.column = true
  }
  return errors
}

const FilterModal = ({open, onClose, options, saveFilter}) => {
  const [filter, setFilter] = useState(defaultFilter)

  const handleClose = () => {
    onClose()
    setFilter(defaultFilter)
  }

  const onSave = (values) => {
    saveFilter(values)
    handleClose()
  }

  const selectColumn = ({currentTarget}) => {
    const values = JSON.parse(currentTarget.dataset.content)
    setFilter({...filter, ...values, value: ''})
  }

  const editValue = (value) => {
    onChange({
      target: {
        name: 'value',
        value
      }
    })
  }

  const setFilterValue = ({target}) => {
    editValue(target.value)
  }

  const setFilterNumberValue = ({target}) => {
    const value = filter.type === 'percentage' ?
      target.value / 100 :
      Number(target.value)
    editValue(value)
  }

  const setFilterConstraint = ({target}) => {
    onChange({
      target: {
        name: 'constraint',
        value: target.value
      }
    })
  }

  const {values: formValues, onChange, handleSubmit, valid} = useForm({
    onSave,
    initialValues: filter,
    validator: useCallback(validateFilter, [])
  })

  const filterInput = () => {
    switch (filter.type) {
      case 'string':
      case 'object':
        return (
          <TextField
            label='Contains'
            name='stringFilter'
            variant='filled'
            value={formValues.value}
            onChange={setFilterValue}
          />
        )
      case 'number':
      case 'percentage':
        return (
          <>
            <TextField
              label='Type'
              name='numberType'
              variant='filled'
              value={formValues.constraint}
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
              value={formValues.value}
              onChange={setFilterNumberValue}
              variant='filled'
            />
          </>
        )
      case 'range':
        return (
          <TextField
            label='Value'
            type='number'
            name='rangeFilter'
            value={formValues.value}
            onChange={setFilterNumberValue}
            variant='filled'
          />
        )
      case 'enum':
        const values = filter.options
          .map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)
        return (
          <TextField
            label='Option'
            name='numberType'
            variant='filled'
            value={formValues.value}
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
        onSave={handleSubmit}
        onCancel={handleClose}
        valid={valid}
        hasControls
      >
        <TextField
          label='Column'
          name='column'
          variant='filled'
          value={formValues.column}
          onChange={selectColumn}
          autoFocus
          select
        >
          {options}
        </TextField>
        {filterInput()}
      </FormWrapper>
    </Dialog>
  )
}

const FilterRow = ({filters, setFilters, filterOptions}) => {
  const [open, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const saveFilter = (filter) => {
    setFilters([...filters, filter])
  }

  const removeFilter = (column) => {
    setFilters(filters.filter((i) => i.column !== column))
  }

  // TODO: Move to their component
  const chips = filters.map(({column, value, ...rest}, i) => {
    let label = `${rest.label}: ${value}`
    if (rest.type === 'enum') {
      label = `${rest.label}: ${rest.options.find(({id}) => id === value).name}`
    }
    if (rest.type === 'number') {
      label = `${rest.label} ${TRANSLATIONS[rest.constraint]} ${value}`
    }
    if (rest.type === 'percentage') {
      const val = value.toLocaleString(undefined, {style: 'percent'})
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

  const options = filterOptions.map((option) => {
    const disabled = filters.find(({column}) => column === option.column)
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
    <>
      <Button size='small' onClick={openModal}>
        <FilterList />
      </Button>
      {chips}
      <FilterModal
        open={open}
        onClose={closeModal}
        options={options}
        saveFilter={saveFilter}
      />
    </>
  )
}

export default FilterRow
