import { io } from 'socket.io-client';

// Явно указываем адрес вашего сервера на Render
const socket = io('https://chessbot-zl45.onrender.com', {
  transports: ['websocket', 'polling'], // Добавляем поддержку разных способов связи
  withCredentials: true
});

export default socket;
