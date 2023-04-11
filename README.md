# Music Plus
# File structure
xxx
# Configuration
```shell
# backend server
# if ./Music Plus/server folder has no .env file
cd ./Music Plus/server
mkdir .env
vi .env
DB_URL=${your mongodb URL} # eg: mongodb://127.0.0.1:27017/MusicPlus

# if ./Music Plus/server folder has .env file
cd ./Music Plus/server
vi .env
DB_URL=${your mongodb URL} # eg: mongodb://127.0.0.1:27017/MusicPlus
```
# Startup
```shell
# Client
cd ./Music Plus/client
npm install 
npm run dev

# Server
cd ./Music Plus/server
npm install
npm server  # localhost:3000 in default
```