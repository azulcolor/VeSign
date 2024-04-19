import express from 'express'
import 'dotenv/config'
import cors from 'cors'

// Routes
import sendDocuments from './routes/sendDocument.routes.js'
import users from './routes/auth.routes.js'
import clientDocument from './routes/clientDocument.routes.js'
import client from './routes/client.routes.js'
import template from './routes/template.routes.js'

// Create the Express server
const app = express()

// Express configuration
// app.use(express.json());
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// CORS
app.use(cors())

// Routes
app.use('/api/sendDocument', sendDocuments)
app.use('/api/auth', users)
app.use('/api/clientDocument', clientDocument)
app.use('/api/client', client)
app.use('/api/template', template)

// error when a endpoint is not found
app.use((req, res) => {
  res.status(404).json({
    message: 'endpoint not found',
  })
})

// Export app for testing purposes
export default app
