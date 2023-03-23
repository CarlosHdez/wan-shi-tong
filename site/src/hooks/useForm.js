import {useState, useEffect} from 'react'

const emptyValidator = () => ({})

const useForm = ({
  onSave,
  initialValues,
  validator = emptyValidator
}) => {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState(initialValues)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  useEffect(() => {
    setErrors(validator(values))
  }, [values, validator])

  const onChange = (ev) => {
    setValues({...values, [ev.target.name]: ev.target.value})
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    setSaving(true)
    try {
      const response = await onSave(values)
      setSaving(false)
      return response
    } catch (e) {
      setSaving(false)
      throw e
    }
  }

  return {
    values,
    onChange,
    handleSubmit,
    saving,
    valid: Object.keys(errors).length === 0
  }
}

export default useForm
