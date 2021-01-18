export function convertDatesToStrings(obj) {
  const newObj = {}

  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((x) => {
      if (obj[x] instanceof Date) {
        Object.assign(newObj, { [x]: (obj[x] as Date).toISOString() })
      } else if (obj[x] && typeof obj[x] === "object") {
        if (Array.isArray(obj[x])) {
          Object.assign(newObj, { [x]: obj[x].map((y) => convertDatesToStrings(y)) })
        } else {
          Object.assign(newObj, { [x]: convertDatesToStrings(obj[x]) })
        }
      } else {
        Object.assign(newObj, { [x]: obj[x] })
      }
    })
  } else {
    return obj
  }

  return newObj
}

export function convertStringsToDate(obj) {
  const newObj = {}

  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((x) => {
      if (typeof obj[x] === "string") {
        const date = Date.parse(obj[x])
        if (!isNaN(date)) {
          Object.assign(newObj, { [x]: new Date(date) })
        } else {
          Object.assign(newObj, { [x]: obj[x] })
        }
      } else if (obj[x] && typeof obj[x] === "object" && !Array.isArray(obj[x])) {
        Object.assign(newObj, { [x]: convertStringsToDate(obj[x]) })
      } else {
        Object.assign(newObj, { [x]: obj[x] })
      }
    })
  } else {
    return obj
  }

  return newObj
}
