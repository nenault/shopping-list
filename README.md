## Shopping list application

### Use with Docker Development Environments

[Open in Docker Dev Environments](https://open.docker.com/dashboard/dev-envs?url=https://github.com/nenault/shopping-list)

### React application with a NodeJS backend and a MongoDB database

Project structure:
```
.
├── backend
│   ├── Dockerfile
│   ...
├── compose.yaml
├── frontend
│   ├── ...
│   └── Dockerfile
└── README.md
```
### Deploy with docker compose

docker compose up -d

After the application starts, navigate to `http://localhost:3000` in your web browser.
