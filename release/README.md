# Setup production environment

First of all, provision a new virtual machine.

For the following steps, you can can use an SFTP client like [Filezilla](https://filezilla-project.org/download.php?type=client):

- Copy the `release` folder to the virtual machine `home` folder
- Copy the websites SSL certificates to `servers/ssl`
- `mv .env.template .env` and change the environment variables

Finally, run the following commands in the virtual machine:

```
$ chmod +x setup.sh && ./setup.sh
$ docker compose up
```
