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
- Basic jest test
- PGlite for in-memory Postgres

### Functionality
- Base case for LangChain Pipeline

### Notes
- Does NOT use an ORM (for now)
  - just defines static `*.sql` files and destructure-export them as needed

## TODO:
- Add RAG
- Add summarizer (2-stage model pipeline)
- Strucuted output example (Ollama `format`)
- Add agentic examples