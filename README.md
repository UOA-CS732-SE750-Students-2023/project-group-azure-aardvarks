# Music Plus
# File structure
xxx
# Configuration
```shell
# backend server
# step 1, create .env environment.  
# if ./MusicPlus/server folder has no .env file
cd ./Music Plus/server
mkdir .env
vi .env # create .env file
DB_URL=${your mongodb URL} # eg: mongodb://127.0.0.1:27017/MusicPlus

# step 2, create log file
cd ./Music Plus/server
mkdir log
vi access.log # create log file
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