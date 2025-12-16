import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"; // Импортируем добавленный пакет

export const app = express();

app.use(cors()); // Разрешаем фронтенду отправлять запросы
app.use(express.json());

// Включаем раздачу статических файлов (билда)
app.use(express.static('build'));

export const httpServer = createServer(app);
export const io = new Server(httpServer, { 
    cors: {
        origin: "*", // Разрешаем сокеты для всех подключений
        methods: ["GET", "POST"]
    }
});
