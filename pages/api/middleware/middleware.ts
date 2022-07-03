import { api } from 'app/blitz-server'
import nextConnect from 'next-connect'
import multipartFormParser from './multipart-form-parser'

const middleware = nextConnect()

middleware.use(multipartFormParser)

export default api(middleware)
