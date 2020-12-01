# express gateway

## Installation
after that 
```bash
npm install && npm start
```


go to the folder \Microservices\expressMongoCrud and type

## docker swarm

We first tried using the orchestrator Kubernetes, but due to an issue that is still pending a fix, we had to go with Docker Swarm, which also does the job.

Docker swarm is a container orchestration tool, meaning that it allows the user to manage multiple containers deployed across multiple host machines, same as Kubernetes.

```bash
docker swarm init
```

```bash
docker stack deploy --orchestrator swarm --compose-file docker-compose.yml searchingApp
```

This project is two microservices where the first one is an crud appilaction to make turorials and the next one is using Elastic Search. 


