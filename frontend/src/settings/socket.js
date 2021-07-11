import { io } from 'socket.io-client'

const socket = io(process.env.VUE_APP_SOCKET_URL)

export default socket
