import { ref } from 'vue'

export function useFormValidation() {
  const rules = {
    required: v => !!v || 'Ce champ est requis',
    email: v => /.+@.+\..+/.test(v) || 'Email invalide',
    minLength: (v, length) => (v && v.length >= length) || `Minimum ${length} caractères`
  }

  const errors = ref({})

  const validate = (formData, validationRules) => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach(field => {
      const value = formData[field]
      const fieldRules = validationRules[field]

      const fieldError = fieldRules
        .map(rule => rule(value))
        .find(result => typeof result === 'string')

      if (fieldError) {
        newErrors[field] = fieldError
        isValid = false
      }
    })

    errors.value = newErrors
    return isValid
  }

  return {
    rules,
    errors,
    validate
  }
}
