const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body))
// app.use(morgan('tiny'));
app.use(morgan(':url :method :body'))

// const PORT = process.env.PORT || 3001
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})