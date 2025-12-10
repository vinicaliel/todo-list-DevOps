# Todo List DevOps

A full-stack Todo List application with Express (Backend), React (Frontend), PostgreSQL, and comprehensive DevOps practices.

## Prerequisites
- Docker & Docker Compose
- Node.js (for local dev)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd todo-list-DevOps
```

### 2. Run with Docker Compose
This will start Backend, Frontend, Postgres, Zabbix, and Grafana.
```bash
docker-compose up --build
```

Access the services:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000
- **Zabbix Web**: http://localhost:8080 (User: Admin, Pass: zabbix)
- **Grafana**: http://localhost:3000 (User: admin, Pass: admin)

### 3. CI/CD
The project includes GitHub Actions workflows:
- `staging.yml`: Deploys `staging` branch.
- `production.yml`: Deploys `main` / `master` branch.

## Monitoring
- **Zabbix**: Connects to its own Postgres instance. Configure hosts to monitor the docker agents.
- **Grafana**: Add Zabbix as a data source to visualize metrics.

## API Documentation
Import `postman_collection.json` into Postman to test the API endpoints:
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
