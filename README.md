# planning-poker

This repository contains a POC for a real-time planning poker application with server and client.

## Server

The server is implemented in Javascript, using Node, Express and websockets.
It can be run on any OS, using Node and Yarn:
```shell
cd server
yarn start
```

The server is running on port 9000, but can be changed if there is already a process bound to this port by doing:
```shell
PORT=XXXX yarn start
```

## Client

The client application is implemented in Javascript and uses React.
It can be run on any OS, using Node and Yarn:
```shell
cd client
yarn start
```

The client is running on port 3000, but can be changed if there is already a process bound to this port by doing:
```shell
PORT=XXXX yarn start
```
