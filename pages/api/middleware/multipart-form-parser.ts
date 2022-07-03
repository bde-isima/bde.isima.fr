import formidable from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'

const form = formidable()

export default async function parseMultipartForm(req: NextApiRequest, res: NextApiResponse, next) {
  const contentType = req.headers['content-type']

  if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
    form.parse(req, (err, fields) => {
      if (!err) {
        req.body = fields
      }
      next()
    })
  } else {
    next()
  }
}
