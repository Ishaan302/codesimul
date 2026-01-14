const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

/* ---------------- BASIC TEST ---------------- */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ---------------- C++ RUN API ---------------- */
app.post("/run", (req, res) => {
  const { code, input } = req.body;

  if (!code) {
    return res.json({ output: "No code provided" });
  }

  const filePath = path.join(__dirname, "main.cpp");
  fs.writeFileSync(filePath, code);

  const inputPath = path.join(__dirname, "input.txt");
  fs.writeFileSync(inputPath, (input ?? "") + "\n");

  exec(
    `g++ main.cpp -o main && ./main < input.txt`,
    { cwd: __dirname, timeout: 5000 },
    (error, stdout, stderr) => {
      if (error) {
        return res.json({ output: stderr || error.message });
      }
      res.json({ output: stdout });
    }
  );
});

/* ---------------- SOCKET.IO SETUP ---------------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });
  
  socket.on("draw", ({ roomId, x0, y0, x1, y1, color }) => {
    socket.to(roomId).emit("draw", { x0, y0, x1, y1, color });
  });
  
  socket.on("clear-board", (roomId) => {
    socket.to(roomId).emit("clear-board");
  });
  
  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

/* ---------------- START SERVER ---------------- */
server.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
