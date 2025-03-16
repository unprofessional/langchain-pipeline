# LangChain Pipeline
A general pipeline for GenAI, intended as a modular boilerplate for various runners/APIs/models/etc

## Features
### Webapp wrapped:
- Node ESM + Express
- OpenAPI V3
- Dockerized
- Simple Kubernetes support

### Maintainability / Guardrails
- Winston logger with configurable transports
- ESLint
- Jest
- Husky pre-commit hooks
- Basic jest tests
  - unit, integration, and e2e
- `PGlite` for in-memory Postgres (for integration/e2e tests)

### Functionality
- Base case for LangChain Pipeline

### Notes
- Does NOT use an ORM (for now)
  - just defines static `*.sql` files and destructure-export them as needed

## Get Started (local)
### Prerequisites
- `nvm use` (if using `nvm`)
  - else `node --version` must be `v20.11.1` or higher

### Install deps and run the app
1) `npm i`
2) `npm start`

## TODO:
- Link back to deps/libs declared here in this README
- Add RAG
- Add summarizer (2-stage model pipeline)
- Strucuted output example (Ollama `format`)
- Add agentic examples