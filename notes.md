
## Async communication between services using event-bus

- We need a event bus to gather all the events and redirect it to all other services using POST /events route.
- Post service is used to create post and it's business logic.
- Comment service is used to create comment and it's business logic.
- Moderation service is introduced to put a check on comments. for now if 'orange' word is detected then it will be rejected else approved. It sends results after 5 seconds.
- query service is used to join all the important services data and store it in good easy to use data structure and make read operation on client side fast by reduntant data in this service.
- client is a react app. It will call certain services based on the given APIs.


##
If i stop query service right away and then also make request to other services to make post and comments then it will work absolutely fine if we have stored all the events in the event bus. Later we can get that and run a service for that. Put that logic code just after we start listening to port.

### Deployment Issues : 
- Now what can we do : Rent a virtual machine and put this source code in it and run all this services.

- But as we grow our application in future it becomes challenging, Let our comment service is overloaded by the number of users then we will make a another instance of comment service on another ports. We can then load balance between this services. <br>
There are couple of challenges : <br>
- We have to allocate the ports and we will need to change the code of other services like event-bus.
- If we have second virtual machine, then event-bus need to figure out how to reach out to this other virtual machine.
- Let our website is active for only some time. Like on holidays.. . Then how to save hosting money.
- 