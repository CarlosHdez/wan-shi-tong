import React from 'react';
import {TextField, Chip, Autocomplete} from '@mui/material'

export const TagInput = ({
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
        renderTags={(value, getTagProps) => value.map((option, index) => {
          const {key, ...rest} = getTagProps({index})
          return (
            <Chip
              key={key}
              label={option?.name || option}
              variant='outlined'
              color='primary'
              {...rest}
            />
          )
        })}
      />
    </div>
  )
}
