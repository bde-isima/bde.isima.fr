#!/bin/bash

echo "Removing old versions of docker"
sudo apt-get remove docker docker-engine docker.io containerd runc

echo "Setting up docker repository"
sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

echo "Adding GPG docker key"
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --yes --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "Installing docker engine"
sudo chmod a+r /etc/apt/keyrings/docker.gpg
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

echo "Enabling docker services on startup"
sudo systemctl enable docker.service
sudo systemctl enable containerd.service

echo "Starting docker"
sudo service docker start

if ! [ $(getent group docker) ]; then
  echo "Creating docker group"
  sudo groupadd docker
fi

echo "Adding $USER to docker group"
sudo usermod -aG docker $USER
