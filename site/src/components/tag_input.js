import React, {useRef} from 'react';
import {TextField, InputAdornment, Chip} from '@material-ui/core'

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

export default TagInput
