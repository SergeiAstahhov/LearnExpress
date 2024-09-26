const express = require("express");
const mongoose = require("mongoose");
const Message = require("./models/message");

const app = express();

// Подключение к MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/learnexpress", {})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware для парсинга JSON
app.use(express.json());

// Маршрут для просмотра одного сообщения
app.get("/messages/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
