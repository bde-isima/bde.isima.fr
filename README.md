# 🐭 BDE ISIMA

![Node version](https://img.shields.io/badge/node-16-informational.svg)

The **bde.isima.fr** website is an online platform for the **BDE ISIMA** Student Union featuring a virtual wallet for the members to purchase goods that can be bought on the union's premises.

The aim of this open source repository is to develop a collaborative environment allowing every contributor to improve the experience of the [website](https://bde.isima.fr/) through pull requests, by giving feedbacks via issues or just by giving ideas 💡.

It is separated in three different sections:

- The **public** section gives an introduction of the union, the school and the activities to everyone on the web.
- The **hub** section is the private platform accessible to any member of the union which gives access for example to a virtual wallet, to an overview of the purchasable goods, to upcoming events, etc...
- The **dashboard** section is the admin platform only accessible to the union's board of directors or to members of clubs. It provides all kind of tools to manage users, clubs, articles, etc...

# 📝 Prerequisites for local development

- Docker Desktop 2.0+ or Docker Engine with `docker-compose-plugin`

If using **Visual Code**:

- [Remote Development extension pack](https://aka.ms/vscode-remote/download/extension)

# 🏃 Getting started

With **Visual Code** (Easiest solution):

- Open command palette with Ctrl+Shift+P (Shift+Command+P on macOS)
- Search for "Open folder in container"
- The container will start to build and install dependencies required for local development

For non-VSCode users:

```bash
$ docker compose -f .devcontainer/docker-compose.yml up   # To launch the Docker services
$ docker exec -it bde_isima /bin/bash                     # To connect to the main Docker container and run commands in it
```

# 🤫 Environment file

To run the app locally, you need to have a .env at the root folder and modify the variables accordingly:

```bash
$ cp .env.template .env
```

NOTE: REDACTED variables are not mandatory to run the app, only for specific features like Lydia Payments, Google Analytics, etc...

# 🚀 Start

```bash
$ yarn && yarn dev
```

If using **Visual Code**:

- VSCode should prompt you to open the port of the server in the browser

For non-VSCode users:

- Open your browser, the ports should already be published for you

Then edit the code in your favourite IDE 👨‍💻!

# 🏗 Project architecture

- `.devcontainer/` contains our development setup using [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview)
- `.github/` contains our Github Actions CI/CD configurations and our issue/PR templates
- `.husky/` contains our pre-commit hooks to enforce code quality
- `app/` contains the Blitz app code logic
- `db/` contains the Prisma schema and seeding scripts
- `docs/` contains the preliminary UI/UX and architecture designs
- `mail/` contains the mailing code logic
- `public/` contains all the static files and assets

# 📙 Essential commands

```bash
# Pre-fill the database with basic data
$ yarn seed

# Open Prisma Studio to ease data management
$ yarn studio

# Check formatting with Prettier
$ yarn format

# Check linting with ESlint
$ yarn lint
```

To clean node_modules **(do not rm -rf node_modules)**:

```bash
rm -rf node_modules/* node_modules/.*
```
