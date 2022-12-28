import app from './index.js'
import { getConnection } from './database/config.js'

// Database
getConnection()

// Listen server
app.listen(process.env.PORT)
console.log(`Server running on port ${process.env.PORT}`)
