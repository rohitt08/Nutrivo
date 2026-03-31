import { io } from 'socket.io-client';

const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const socketBase = apiBase.replace(/\/api\/?$/, '');

const socket = io(socketBase, {
  autoConnect: false,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

export default socket;
