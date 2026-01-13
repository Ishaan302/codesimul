const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
