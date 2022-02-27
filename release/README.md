# Deploying to production (Ubuntu version)

- Provision a new virtual machine

For the following steps, you can can use an SFTP client like Filezilla:

- Copy the release folder to the VM
- Copy the SSL certificates to /etc/ssl/domains/bde.isima.fr

# TLDR

Simply run this command in the VM after copying all the files:

```
$ chmod +x ./scripts/setup.sh && ./scripts/setup.sh
```

# Detailed steps below

## Install Docker

```
$ sudo apt-get update && sudo apt-get install ca-certificates curl gnupg lsb-release
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## Post Docker installation

```
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
$ newgrp docker
```

## Install Docker Compose

```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

# Launch services

```
$ docker-compose up
```
