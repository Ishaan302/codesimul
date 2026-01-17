// src/socket.js
import { io } from "socket.io-client";

// Dynamic backend selection
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://codesimul-1.onrender.com"
    : "http://localhost:5001";

// Hardcoded fallback
const FALLBACK_URL = "https://codesimul-1.onrender.com";

// Final URL resolution
const SOCKET_URL = BACKEND_URL || FALLBACK_URL;

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;
