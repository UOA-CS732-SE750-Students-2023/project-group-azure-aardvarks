# Music Plus
A music app which provides personalised recommendations based on a user's listening habits and preferences. It will also offer a social component, allowing users to connect and share music with friends.

## Features
* Personalised Song Recommendations
* Great Streaming Quality
* Add Songs to Favorite
* Post comments of songs
* Share playlist
* Trending music
* Support both mobile and PC users
* No Subscription


## Screenshots
(...)
## Configuration
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
## Startup
```shell
# Server
cd ./NeteaseCloudMusicApi
npm install
cd ../MusicPlus/server
npm install
npm server  # localhost:3000 in default

# Client
cd ./Music Plus/client
npm install 
npm run dev
```
