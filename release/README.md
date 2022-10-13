# Setup production environment

First of all, provision a new virtual machine.

For the following steps, you can can use an SFTP client like [Filezilla](https://filezilla-project.org/download.php?type=client):

- Copy the `release` folder to the virtual machine `home` folder
- Copy the websites SSL certificates to `servers/ssl`
- `mv .env.template .env` and change the environment variables
- `chmod +x setup.sh && ./setup.sh` to install all requirements

At this step, please **restart** your virtual machine so the group membership is re-evaluated.

- `echo "your_gh_token" | docker login ghcr.io -u your_username --password-stdin` to access private registry
- Finally launch all services with: `docker compose up`
