import * as z from 'zod'

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1)
}

const errorMap: z.ZodErrorMap = (error, ctx) => {
  if (ctx.defaultError === 'Required') {
    return { message: 'Champ requis' }
  }

  if (error.message) {
    return { message: error.message }
  }

  switch (error.code) {
    case z.ZodErrorCode.invalid_type:
      if (error.expected === 'string') {
        return { message: `Pas une chaîne de caractères` }
      }
      if (error.expected === 'number') {
        return { message: `Pas un nombre` }
      }
      break
    case z.ZodErrorCode.invalid_string:
      return { message: `${capitalize(error.validation)} invalide` }
    case z.ZodErrorCode.too_small:
      return { message: `Min. ${error.minimum} caractères` }
    case z.ZodErrorCode.too_big:
      return { message: `Max. ${error.maximum} caractères` }
  }

  return { message: ctx.defaultError }
}

export default errorMap
