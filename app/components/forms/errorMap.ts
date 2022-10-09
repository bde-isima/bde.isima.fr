import { z } from 'zod';

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  if (ctx.defaultError === 'Required') {
    return { message: 'Champ requis' };
  }

  if (issue.message) {
    return { message: issue.message };
  }

  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected === 'string') {
        return { message: 'Pas une chaîne de caractères' };
      }
      if (issue.expected === 'number') {
        return { message: 'Pas un nombre' };
      }
      break;
    case z.ZodIssueCode.invalid_string:
      return { message: `${capitalize(issue.validation)} invalide` };
    case z.ZodIssueCode.too_small:
      return { message: `Min. ${issue.minimum} caractères` };
    case z.ZodIssueCode.too_big:
      return { message: `Max. ${issue.maximum} caractères` };
  }

  return { message: ctx.defaultError };
};

export default errorMap;
