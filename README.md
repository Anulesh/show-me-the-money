
# Show Me The Money - Balance Sheet App

This is a one-page application to display the Balance Sheet Report from Xero using a mock API. The project consists of a backend service that fetches data and a frontend application that displays it.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Project Structure

- `backend/`: The backend Fastify application that handles requests and fetches balance sheet data.
- `frontend/`: The frontend React application that displays the balance sheet report.
- `Dockerfile`: Dockerfiles for backend, frontend, and test runner services.
- `docker-compose.yml`: Defines services to run backend, frontend, and tests.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/show-me-the-money.git
cd show-me-the-money
```

### Running the Application

You can run both the backend and frontend applications using Docker and Docker Compose.

#### 1. Build and Run the Services

```bash
docker-compose up
```

This command will:

- Start the **mock API** service at `http://localhost:3001`
- Start the **backend** service at `http://localhost:4000`
- Start the **frontend** service at `http://localhost:3000`

You can access the frontend application in your browser at `http://localhost:3000`.

### Environment Variables

Each service has an `.env` file where you can configure environment variables:

- **Backend**: `backend/.env`
- **Frontend**: `frontend/.env`

### Running Tests

Tests are available for both the backend and frontend. You can run them using Docker Compose as well.

#### Running Backend Tests

To run backend tests, use the following command:

```bash
docker-compose run backend-tests
```

#### Running Frontend Tests

To run frontend tests, use the following command:

```bash
docker-compose run frontend-tests
```

Both of these commands will run test coverage using `jest` and output the results.

### Building the Services

If you need to rebuild the services (e.g., after code changes), use the following command:

```bash
docker-compose build
```

### Stopping the Services

To stop the running services:

```bash
docker-compose down
```

This will stop and remove all running containers for the project.

## Additional Commands

### Running Backend and Frontend Tests Independently

You can run backend and frontend tests independently using the following Docker commands:

- **Backend Tests**: 

  ```bash
  docker-compose run backend-tests
  ```

- **Frontend Tests**: 

  ```bash
  docker-compose run frontend-tests
  ```

### Test Coverage Reports

After running tests, you can view the test coverage reports generated in the terminal.

## Contributing

Contributions are welcome! If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push the changes to your fork.
5. Open a pull request.

