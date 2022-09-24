# microservices_architectured_blog
A blog website created using microservices architecture in node Js. It is not a production level website, it is just made to understand how microservices works at low level.

##

- Here there are different services for different functionalities like comments, posts, etc. <br>
- All this services have different databases. <br>
- Some usefull information is stored inside the query services databases. Which is usefull only for reading the data. If other two services stops working, then also this service is going to work always.
- By default services works on the events.
- We are not allowed to lookup inside another services database. It can be harmful in long term.
- #### What to do if one service brokes ?? Then we can store all the events occured ( for eg. "comment created" is event for comment service ). Then later we can give this event to that service and that service will start working fine once fetching all the events occured on other services.


![image](https://user-images.githubusercontent.com/76687839/191833053-9f9267a2-c5b4-4e4c-b7d9-b98b63562074.png)

- #### Some cases that can happen if we make slight mistakes in code ! or due to some reasons. <br>
![image](https://user-images.githubusercontent.com/76687839/191833356-1e1fd9c5-e62e-4f8a-9232-cabdadcddd95.png)


## Docker and Kubernetes

### Basic Docker File
- FROM node : alpine // specify the base image 
- WORKDIR /app // set the working dir to /app in container, we wil use it now in below code
- COPY package.json ./ // copy package.json file 
- RUN npm install // get tall the dependencies
- COPY ./ ./ // copy all code except that in dockerignore file
- CMD ["node","start"] // command to run when container starts 

### Basic Docker Commands
- docker build -t dockerId/posts . // build image based on the tag. Later we can use tag to refer this image
- docker run -it [ image id or tag ] [ cmd ] // Create and start container but also override the default command
- docker ps // All running containers
- docker exec -it [container id] [cmd] // Execute the given command in running container
- docker logs [container id] // print logs of container

### Kubernetes
- Kubernetes is a tool for running a bunch of different containers. 
- We give it some configuration to describe how we want our containersto run and interact with each other.
