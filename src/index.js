import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(helmet({ contentSecurityPolicy: false }))
app.use(morgan('tiny'))
app.use(cors())
app.listen(5056, () => {
	console.log('Escuchando puerto 5056')
})
app.use('/images', express.static(path.join(__dirname, '../images')))
app.use(express.static(path.join(__dirname, '../frontend')))
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// funcionando imagenes
export default app
