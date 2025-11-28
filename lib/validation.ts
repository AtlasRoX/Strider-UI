export interface ValidationRule {
  validate: (value: string) => boolean
  message: string
}

export interface FieldValidation {
  rules: ValidationRule[]
  value: string
}

export const validators = {
  required: (message = "This field is required"): ValidationRule => ({
    validate: (value) => value.trim().length > 0,
    message,
  }),

  email: (message = "Please enter a valid email"): ValidationRule => ({
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    validate: (value) => value.length >= length,
    message: message || `Must be at least ${length} characters`,
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    validate: (value) => value.length <= length,
    message: message || `Must be at most ${length} characters`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validate: (value) => regex.test(value),
    message,
  }),

  match: (getValue: () => string, message = "Fields do not match"): ValidationRule => ({
    validate: (value) => value === getValue(),
    message,
  }),

  password: (): ValidationRule[] => [
    { validate: (v) => v.length >= 8, message: "At least 8 characters" },
    { validate: (v) => /[A-Z]/.test(v), message: "One uppercase letter" },
    { validate: (v) => /[a-z]/.test(v), message: "One lowercase letter" },
    { validate: (v) => /[0-9]/.test(v), message: "One number" },
    { validate: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v), message: "One special character" },
  ],
}

export function validateField(value: string, rules: ValidationRule[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message)
    }
  }
  return { valid: errors.length === 0, errors }
}

export function validateForm(fields: Record<string, FieldValidation>): {
  valid: boolean
  errors: Record<string, string[]>
} {
  const errors: Record<string, string[]> = {}
  let valid = true

  for (const [key, field] of Object.entries(fields)) {
    const result = validateField(field.value, field.rules)
    if (!result.valid) {
      valid = false
      errors[key] = result.errors
    }
  }

  return { valid, errors }
}
