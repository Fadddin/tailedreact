#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const projectName = process.argv[2];
const projectPath = path.join(process.cwd(), projectName);

// Create project directory
fs.mkdirSync(projectPath);

// Change to project directory
process.chdir(projectPath);

// Initialize npm project
execSync('npm init -y');

// Install dependencies
execSync('npm install react react-dom');
execSync('npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer');

// Create Vite config
fs.writeFileSync('vite.config.js', `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`);

// Create index.html
fs.writeFileSync('index.html', `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React + Vite + Tailwind</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

// Create src directory and files
fs.mkdirSync('src');
fs.mkdirSync('public');
fs.writeFileSync('src/app.css', '');
fs.writeFileSync('src/main.jsx', `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

fs.writeFileSync('src/App.jsx', `
function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Hello, React + Vite + Tailwind!</h1>
    </div>
  )
}

export default App
`);

fs.writeFileSync('src/index.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;
`);

// Initialize Tailwind CSS
execSync('npx tailwindcss init -p');

// Initialize Tailwind CSS
execSync('npx tailwindcss init -p');

// Update tailwind.config.js
fs.writeFileSync('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`);

// Update package.json scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.scripts = {
  ...packageJson.scripts,
  dev: 'vite',
  build: 'vite build',
  preview: 'vite preview'
};
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log(`Project ${projectName} created successfully!`);