# Amplication Server

Amplication Server is the main component of the platform that provides all the core functionality to design and create low-code applications.
The server exposes a GraphQL API for all actions. The server is built with the following awesome open source technologies: Node.js, NestJS, Prisma over PostgreSQL, GraphQL API, and many more...

If you need help or have a question, go to our [Discord channel](https://discord.gg/Z2CG3rUFnu), we are here to help.

### Development

:bulb: Before you begin, make sure you have all the below installed:

- [Node.js v14 or above](https://nodejs.org/en/download/)
- [npm v7 or above](https://github.blog/2020-10-13-presenting-v7-0-0-of-the-npm-cli/)
- [Docker](https://docs.docker.com/desktop/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/)

#### Automatic one-time setup

Amplication is using a mono-repo with multiple packages. To initialize all the packages on a local development environment, you should follow the instruction on the [README.md](../../README.md) file in the project root folder.

You can also use a more manual step-by-step approach to set up Amplication server - to do that, follow the instructions below.

#### Manual one-time set up

- Install dependencies of the monorepo (execute in root directory):

  ```
  npm install
  npm run bootstrap
  ```

- Update code generated by Prisma
  ```
  npm run prisma:generate
  ```
- Build dependencies of the server:
  ```
  npm run build -- --scope @amplication/server --include-dependencies
  ```
- Update other generated code
  ```
  npm run generate
  ```
- Make sure Docker is running
- Move to server directory
  ```
  cd packages/amplication-server
  ```
- Get external services up (execute in server directory "packages/amplication-server")
  ```
  npm run docker
  ```
- Update application database (execute in server directory "packages/amplication-server")

  ```
  npm run start:db
  ```

- Start the development server and watch for changes (execute in server directory "packages/amplication-server")
  ```
  npm run start:watch
  ```

##### Optional: Google Cloud Platform

If you use the Google Cloud Platform integration make sure to execute:

```bash
gcloud auth login
gcloud auth application-default login
```

#### Workflow

- Get external services up, if they're not already running
  ```
  npm run docker
  ```
- Start the development server and watch for changes, if it's not already running
  ```
  npm run start:watch
  ```
- Format files (editors like VSCode can do it for you automatically)
  ```
  npm run format
  ```
- Lint files (editors like VSCode come with integration to display those continuously)
  ```
  npm run lint
  ```
- Run tests and watch for changes
  ```
  npm run test:watch
  ```
- When needed, update Prisma Schema
  ```
  npm run migrate:save
  npm run migrate:up
  npm run prisma:generate
  ```
