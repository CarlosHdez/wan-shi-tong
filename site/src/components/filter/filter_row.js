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

const FilterModal = ({open, onClose, filters, applyFilter}) => {
  const [option, setOption] = useState()
  const [filter, setFilter] = useState({})

  const handleClose = () => {
    onClose()
    setOption()
  }

  const onChangeOption = ({target}) => {
    setOption(target.value)
  }

  const options = filters.map((option) => {
    return (
      <MenuItem key={option.column} value={option}>
        {option.label}
      </MenuItem>
    )
  })

  const filterInput = () => {
    if (!option) {
      return
    }
    if (option.type === 'string') {
      return (
        <TextField
          label='Contains'
          name='stringFilter'
          variant='filled'
          onChange={({target}) => setFilter({...filter, value: target.value})}
        />
      )
    }
    if (option.type === 'number') {
      return (
        <>
          <TextField
            label='Type'
            name='numberType'
            variant='filled'
            select
          >
            <MenuItem value='greater'>Greater than</MenuItem>
            <MenuItem value='lower'>Lower than</MenuItem>
            <MenuItem value='equal'>Equal</MenuItem>
          </TextField>
          <TextField
            label='Value'
            type='number'
            name='numberFilter'
            onChange={({target}) => setFilter({...filter, value: target.value})}
            variant='filled'
          />
        </>
      )
    }
    if (option.type === 'enum') {
      const values = option.options
        .map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)
      return (
        <TextField
          label='Option'
          name='numberType'
          variant='filled'
          value={filter.value || ''}
          onChange={({target}) => setFilter({...filter, value: target.value})}
          select
        >
          {values}
        </TextField>
      )
    }
  }

  const onSave = () => {
    applyFilter({...option, ...filter})
    onClose()
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
          value={option || ''}
          onChange={onChangeOption}
          select
        >
          {options}
        </TextField>
        {filterInput()}
      </FormWrapper>
    </Dialog>
  )
}

const FilterRow = ({filters, filterData}) => {
  const [open, setOpen] = useState(false)
  const [activeFilters, setActiveFilter] = useState([])

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const applyFilter = (filter) => {
    const newFilters = [...activeFilters, filter]
    setActiveFilter(newFilters)
    filterData(newFilters)
  }

  const removeFilter = (column) => () => {
    const newFilters = activeFilters.filter((i) => i.column !== column)
    setActiveFilter(newFilters)
    filterData(newFilters)
  }

  const chips = activeFilters.map(({column, value, ...rest}, i) => {
    let label = `${rest.label}: ${value}`
    if (rest.type === 'enum') {
      label = `${rest.label}: ${rest.options.find(({id}) => id === value).name}`
    }
    return (
      <Chip
        key={column}
        label={label}
        onDelete={removeFilter(column)}
      />
    )
  })

  return (
    <div className='table--filters'>
      <FilterList onClick={openModal} />
      {chips}
      <FilterModal
        open={open}
        onClose={closeModal}
        filters={filters}
        applyFilter={applyFilter}
      />
    </div>
  )
}

export default FilterRow
