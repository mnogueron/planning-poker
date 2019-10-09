# planning-poker

This repository contains a POC for a real-time planning poker application with server and client.

## Server

The server is implemented in Javascript, using Node, Express and websockets.
It can be run on any OS, using Node and Yarn:
```shell
cd server
yarn install
yarn start
```

The server is running on port 9000, but can be changed if there is already a process bound to this port by doing:
```shell
PORT=XXXX yarn start
```

### Limitations
The server doesn't use a database to store the data, everything is in memory. Every time the server is restarted all the data is lost.

The authentication system is rudimentary and only uses a user name to login. Every time the user logs in, a new user is created in memory with a new id and the user name.
As every vote is linked to a user id, if the user votes, refresh the page and log in again, he will have a new user id, thus when voting, he will create a new vote instead of changing the previous one.

In a real world, the login will be done through a more elaborate system, such as Auth0 or a username / password setup. The user would have a unique secret authToken, and would query the server using it. The user would be bound to a unique user object instead of recreating a new one at every login.
In the context of this POC, this feature has been reduced to a minimal setup. 

### Documentation

The api is documented using Swagger and can be accessed at `localhost:9000/api-docs` when the server is running.

## Client

The client application is implemented in Javascript and uses React.
It can be run on any OS, using Node and Yarn:
```shell
cd client
yarn install
yarn start
```

The client is running on port 3000, but can be changed if there is already a process bound to this port by doing:
```shell
PORT=XXXX yarn start
```

### Limitations
The client doesn't persist redux data, which means that for each reload the user has to login again.
