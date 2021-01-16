import {useState, useEffect} from 'react'

const emptyValidator = () => ({})

const useForm = ({
  onSave,
  initialValues,
  validator = emptyValidator
}) => {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    console.log('hook iv', initialValues)
    setValues(initialValues)
  }, [initialValues])

  useEffect(() => {
    console.log('validation', values)
    setErrors(validator(values))
  }, [values])

  const onChange = (ev) => {
    console.log('changes', ev.target.name)
    setValues({...values, [ev.target.name]: ev.target.value})
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    return await onSave(values)
  }

  return {
    values,
    onChange,
    handleSubmit,
    valid: Object.keys(errors).length === 0
  }
}

export default useForm
