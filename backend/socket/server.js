const fs = require('fs')
const path = require('path')

const http = require('http')
const app = require('express')()
const server = http.createServer(app)
const socket = require('socket.io')
const bodyParser = require('body-parser')

const cors = { origin: '*' }
// noinspection JSValidateTypes
const io = socket(server, { cors })

io.on('connection', (socket) => {
  /* doc examples
  socket.on('chat:message', (message) => {
    io.emit('chat:message', message)
  })
   */
  const version = getVersion()
  socket.emit('version:update', version)
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const file = path.join(__dirname, '..', 'public', 'statics', 'version')

const getVersion = () => String(fs.readFileSync(file)).trim()

app.post('/notify', (request, response) => {
  const options = request.body
  io.emit('notify', options)
  response.send('ok')
})

app.get('/version/check', (request, response) => {
  const version = getVersion()
  response.send({ version })
  setTimeout(() => io.emit('version:update', version), 5 * 60 * 1000)
})

const port = 80
const host = '0.0.0.0'

server.listen(port, host, () => {
  const version = getVersion()
  console.log(`Socket.IO server running at http://${host}:${port} under ${version}`)
})
