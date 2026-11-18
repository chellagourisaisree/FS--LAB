// Zero-dependency launcher for both Backend and Frontend
const { spawn } = require("child_process");
const path = require("path");

const backendDir = path.join(__dirname, "backend");
const frontendDir = path.join(__dirname, "frontend");

console.log("\n=======================================================");
console.log("   Starting Student Management System (Full Stack)     ");
console.log("=======================================================\n");

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";

// 1. Start Backend
console.log("Starting Backend server on port 5000...");
const backend = spawn(npmCmd, ["start"], {
  cwd: backendDir,
  stdio: "inherit",
  shell: true
});

// 2. Start Frontend
console.log("Starting Frontend Vite server on port 5173...");
const frontend = spawn(npmCmd, ["run", "dev"], {
  cwd: frontendDir,
  stdio: "inherit",
  shell: true
});

// Handle graceful shutdown
function cleanup() {
  console.log("\nStopping all servers...");
  backend.kill();
  frontend.kill();
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
