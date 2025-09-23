#!/usr/bin/env node

import { readdirSync, statSync } from "fs";
import { join } from "path";
import { spawnSync, exec } from "child_process";

// -------------------------------
// Config
// -------------------------------
const baseDir = process.cwd();
const outputDir = join(baseDir, "_site");
const excludedDirs = ["_site", ".github", "node_modules", "scripts"];

// -------------------------------
// Helper: build a Jekyll site
// -------------------------------
function buildSite(dir) {
  const sitePath = join(baseDir, dir);
  const baseurl = `/${dir}`;
  console.log(`\n🔨 Building ${dir} with baseurl=${baseurl}`);

  const result = spawnSync("bundle", [
    "exec",
    "jekyll",
    "build",
    "-s",
    sitePath,
    "-d",
    join(outputDir, dir),
    "--baseurl",
    baseurl
  ], { stdio: "inherit", shell: true });

  if (result.status !== 0) {
    console.error(`❌ Failed to build ${dir}`);
    process.exit(result.status);
  }
}

// -------------------------------
// Detect Jekyll sites
// -------------------------------
const siteDirs = readdirSync(baseDir).filter((dir) => {
  if (excludedDirs.includes(dir)) return false;
  const fullPath = join(baseDir, dir);
  return statSync(fullPath).isDirectory() && statSync(join(fullPath, "_config.yml")).isFile;
});

if (!siteDirs.length) {
  console.error("❌ No Jekyll sites found.");
  process.exit(1);
}

// -------------------------------
// Build all sites
// -------------------------------
siteDirs.forEach(buildSite);
console.log("\n✅ All sites built into _site/");

// -------------------------------
// Serve _site locally
// -------------------------------
console.log("\n🚀 Starting local server at http://localhost:3000");

const serve = spawnSync("npx", ["serve", "_site", "-l", "3000"], { stdio: "inherit", shell: true });

// -------------------------------
// Open browser (cross-platform)
// -------------------------------
const url = "http://localhost:3000";
switch (process.platform) {
  case "darwin":
    exec(`open ${url}`);
    break;
  case "win32":
    exec(`start ${url}`);
    break;
  case "linux":
    exec(`xdg-open ${url}`);
    break;
}
