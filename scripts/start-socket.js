// This is an ES Module script
import { spawn } from "child_process";

// Run ts-node with the --esm flag
const command = "npx";
const args = ["ts-node", "--esm", "src/server/index.ts"];

console.log(`Starting Socket.io server: ${command} ${args.join(" ")}`);

const proc = spawn(command, args, {
  stdio: "inherit",
  shell: true,
});

proc.on("error", (err) => {
  console.error("Failed to start socket server:", err);
});

proc.on("close", (code) => {
  console.log(`Socket server process exited with code ${code}`);
});
