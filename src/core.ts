import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"; // Добавили импорт

export const app = express();

app.use(cors()); // РАЗРЕШАЕМ НАЖАТИЯ КНОПОК
app.use(express.json());

// Enable static files
app.use(express.static('build'));

export const httpServer = createServer(app);
export const io = new Server(httpServer, { 
    cors: {
        origin: "*", // Разрешаем сокеты для всех
        methods: ["GET", "POST"]
    }
});
