import React, {useRef} from 'react';
import {TextField, InputAdornment, Chip} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'

const TagInput = ({id, label, wrapperClass, inputClass, name, value, onChange}) => {
  const inputRef = useRef()
  const onKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      addTag()
    }
  }

  const addTag = () => {
    const val = inputRef?.current.value
    if (!val) {
      return
    }
    onChange([...value, val])
    inputRef.current.value = ''
  }

  const removeTag = (index) => {
    onChange([
      ...value.slice(0, index),
      ...value.slice(index + 1)
    ])
  }

  return (
    <div className={wrapperClass}>
      <TextField
        id={id}
        inputRef={inputRef}
        label={label}
        name={name}
        style={{display: 'flex'}}
        className={inputClass}
        variant='filled'
        onKeyPress={onKeyPress}
        InputProps={{
          endAdornment: <InputAdornment position="end" onClick={addTag}>Add</InputAdornment>
        }}
      />
      {value.map((v, i) => (
        <Chip
          key={i}
          label={v}
          variant='outlined'
          color='primary'
          style={{marginRight: '5px', marginBottom: '3px'}}
          onDelete={() => removeTag(i)}
        />
      ))}
    </div>
  )
}
export const TagInputV2 = ({
  id,
  options = [],
  label,
  wrapperClass,
  inputClass,
  name,
  value,
  onChange
}) => {
  const onOptionSelect = (ev, value, reason) => { onChange(value) }

  return (
    <div className={wrapperClass}>
      <Autocomplete
        freeSolo
        multiple
        filterSelectedOptions
        id={id}
        value={value}
        onChange={onOptionSelect}
        options={options}
        getOptionLabel={({name}) => name}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            name={name}
            style={{display: 'flex'}}
            className={inputClass}
            variant='filled'
          />
        )}
        renderTags={(value, getTagProps) => value.map((option, index) => (
          <Chip key={index}
            label={option?.name || option}
            variant='outlined'
            color='primary'
            {...getTagProps({index})}
          />
        ))}
      />
    </div>
  )
}

export default TagInput
