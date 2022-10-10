## Notes

Let me write summary of the things that i am learning..

### Docker

    - Docker is an open source containerization platform. It enables developers to package applications into containers—standardized executable components combining application source code with the operating system (OS) libraries and dependencies required to run that code in any environment. Containers simplify delivery of distributed applications, and have become increasingly popular as organizations shift to cloud-native development and hybrid multicloud environments.
    - Lighter weight, Greater resource efficiency, Improved Developer Productivity, Container Automation, Versioning etc..
    - DockerFile : Every Docker container starts with a simple text file containing instructions for how to build the Docker container image. DockerFile automates the process of Docker image creation. It’s essentially a list of command-line interface (CLI) instructions that Docker Engine will run in order to assemble the image.
    - Docker images : Docker images contain executable application source code as well as all the tools, libraries, and dependencies that the application code needs to run as a container. When you run the Docker image, it becomes one instance (or multiple instances) of the container.
    - Docker containers : Docker containers are the live, running instances of Docker images. While Docker images are read-only files, containers are live, ephemeral, executable content
    - Docker Hub : Docker Hub (link resides outside IBM) is the public repository of Docker images that calls itself the “world’s largest library and community for container images.”
    - Docker daemon : Docker daemon is a service running on your operating system, such as Microsoft Windows or Apple MacOS or iOS. This service creates and manages your Docker images for you using the commands from the client, acting as the control center of your Docker implementation.
    - Docker registry : ??

### Docker deployment and orchestration

If you’re running only a few containers, it’s fairly simple to manage your application within Docker Engine, the industry de facto runtime. But if your deployment comprises thousands of containers and hundreds of services, it’s nearly impossible to manage that workflow without the help of these purpose-built tools.

#### Docker Compose

If you’re building an application out of processes in multiple containers that all reside on the same host, you can use Docker Compose to manage the application’s architecture. Docker Compose creates a YAML file that specifies which services are included in the application and can deploy and run containers with a single command. Using Docker Compose, you can also define persistent volumes for storage, specify base nodes, and document and configure service dependencies.

### Kubernetes

To monitor and manage container lifecycles in more complex environments, you’ll need to turn to a container orchestration tool. While Docker includes its own orchestration tool (called Docker Swarm), most developers choose Kubernetes instead.
<br>
Kubernetes is an open-source container orchestration platform descended from a project developed for internal use at Google. Kubernetes schedules and automates tasks integral to the management of container-based architectures, including container deployment, updates, service discovery, storage provisioning, load balancing, health monitoring, and more. In addition, the open source ecosystem of tools for Kubernetes—including Istio and Knative—enables organizations to deploy a high-productivity Platform-as-a-Service (PaaS) for containerized applications and a faster on-ramp to serverless computing.

### Our Project

#### Basic Anatomy 

Here we are creating a simple blog website ( just prototype to understand the microservices ). 


#### Creating Images

There are different Services out there in our application. For each we can make a container to serve up to the end user. As In start we don't how much traffic will come on which service.
<br>
To Create Image of Services like posts, comments, event-bus... Write a docker file for each of them and create images out of it.
Basic template of the docker-file is as follows. Put it inside that specific folder only.
    
    FROM node:alpine

    WORKDIR /app
    COPY package.json ./
    RUN npm install
    COPY ./ ./

    CMD ["npm","start"]

    Also add .dockerignore file and enter "node_modules" inside it.

For posts inside that folder do : docker build . and then docker run imageid to run the container.

Some Good Docker Commands are as follows : 
- docker build .
- docker build -t ketanrtd1/posts ( Create image based on tag )
- docker run imgTag
- docker ps
- docker logs containerId
- docker exec -it containerid cmd ( execute the given command in container )
- docker run -it [imageid or tag] [ cmd ] ( Create and start the container but also oveeride the default command )

For Complex applications it will not worth it. So let's learn kubernetes

#### Using Kubernetes

- Kubernetes is a tool for running a bunch of different containers.
- We give it some configuration to describe how we want our containers to run and interact with each other.

- Kubernetes Setup : done from docker only.
- kubectl version

- We will give kubernetes a config file, then it will do accordingly and assign container to any nodes in cluster.
- Pod and container are not same but for this lec. it is easy to understand it as same. But pods can have multiple containers.
- Service :  All reach out to this and it will abstract all the interservice communication.
- Kubernetes Cluster : A collection of nodes + A master to manage them all.
- Node : A virtual machine that will run our containers.
- Pod : More or less a running container. technically a pod can have multiple containers.
- Deployment : Monitor a set of pods, make sure they are running and restart them if they crash.
- Service : Provides an easy to remember url to access another running container.
- Kubernetes config files : Tells kubernetes about the different deployments, posts and services refereed to as objects that we want to create.
- Written in YAML
- Always store this files in our project as source code. They provide documentation for other engineers.
- We can create objects without config file, but don't do this unless for testing.

Now create new directory infra/k8s for deployment and management of all the services.

#### Creating Pod 
 
posts.yaml

    apiVersion: v1
    kind: Pod
    metadata: 
    name: posts
    spec:
    containers:
        - name: posts
        image: ketan/posts:0.0.1

Now tell the kubernetes to use this file to create an object.
- kubectl apply -f posts.yaml ( pod/posts created as output )

To know the status of the cluster
- kubectl get pods ( get all the pods )

#### K8S World 
Now we are not going to use the docker world much more.
Important commands are as follows.

- kubectl get pods
- kubectl logs [ pod name]
- kubectl delete pod [pod name]
- kubectl apply -f [ config file name ] ( Tells kubernetes to process the config )
- kubectl describe pod [ pod name ]  ( Print out information about running pod )


Rather then above pod we will create deployments instead, it will maintain all the pods. 

#### Creating deployment

We need a config file to create deployment. We are using deployment so as to handle the replicas of same pods, so that it will be helpfull when updating the whole system. At that time it will update all replicas/pods.

Template Code for this is as follows :

    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: posts-depl
    spec: 
    replicas: 1
    selector: 
        matchLabels:
        app: posts
    template:
        metadata:
        labels:
            app: posts
        spec: 
        containers:
            - name: posts
            image: ketanrtd1/posts

Describe each part of the config file : ??

Deployment commands
- kubectl get deployments
- kubectl describe deployment [ depl name ]
- kubectl apply -f [ config file name ]
- kubectl delete deployment [depl name]

If I delete my pod and then see all the deployments. You will find a new pod created for use by the kubernetes. It has always a back with us.

If i delete a deployment, It will delete all the associated pods too.

#### Updating the different pods using deployments

We use deployments because we can update the version of image and differnt pods.

??


#### Networking with services

- Services provides networking between pods


####

Load balancer is very special thing. 
Load Balancer is just sends request to one pod. It is the single point entry for our cluster.
Ingress controller is the one which handles routing for all the deployments/pods of our cluster.

Sending request to some cluster ip service ( not pod directly in technical sense ).

Here we are using ingress-nginx not using the kubernetes-ingress.



