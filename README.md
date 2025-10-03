# GitHub Repository Search

A simple React + TypeScript application to search GitHub users and explore their public repositories.  
Built with [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), and tested with [Vitest](https://vitest.dev/).

---

## &#128640; Features
- &#128269; Search GitHub users
- &#128194; View public repositories
- &#11088; See repository stars
- &#127912; Styled with Tailwind + gradient headings
- &#129514; Unit & integration tested with Vitest + React Testing Library

---

## &#9889; Getting Started

You can run this project in **two ways**:

### 1 Run with **Docker** (no Node.js required)
This option is perfect if you don’t want to install Node.js locally.

#### Requirements
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) or Docker Engine (Linux)
- [Docker Compose](https://docs.docker.com/compose/)

#### Setup
Clone the repo and `cd` into the project:

```bash
git clone https://github.com/your-username/github-repository-search.git
cd github-repository-search
```
Install dependencies inside Docker:
```bash
docker compose run --rm node npm install
```
Start the dev server (exposes `localhost:3000`):
```bash
docker compose run --rm --service-ports node npm run dev
```
Run tests:
```bash
docker compose run --rm node npm test
```
Build production bundle:
```
docker compose run --rm node npm run build
```
##
### 2 Run with local Node.js
If you already have Node installed, you can run the app directly.

#### Requirements
- [Node.js 22+](https://nodejs.org/en)
- [npm](https://docs.npmjs.com/) (comes with Node)

#### Setup
Clone the repo and `cd` into the project:
```bash
git clone https://github.com/your-username/github-repository-search.git
cd github-repository-search
```
Install dependencies:
```bash
npm install
```
Start the dev server:
```bash
npm run dev
```
Run tests:
```bash
npm test
```
Build production bundle:
```bash
npm run build
```
##

## &#9881; Environment Variables
The app uses GitHubs API. Create a `.env` file in the project root:
```env
VITE_API_URL=https://api.github.com
```
##

## &#128220; Scripts Overview
Script | Description
`npm run dev` | Start Vite development server
`npm run build` | Build production-ready files
`npm run preview` | Preview build app locally
`npm test` | Run Vitest test suite
##

&#10137; Tech Stack
- &#9883; React + TypeScript
- &#9889; Vite
- &#127912; TailwindCSS
- &#129514; Vitest + React Testing Library
- &#128051; Docker (for isolated dev environment)

&#10024; Choose between **Dockerized dev workflow** or **native Node workflow** -- both fully documented!
