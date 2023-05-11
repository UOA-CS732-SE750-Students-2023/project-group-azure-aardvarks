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
# backend
cd ./MusicPlus/server
vi .env

# copy and paste
DB_URL=mongodb://127.0.0.1:27017/MusicPlus # database 
NeteaseCloudMusicApi = http://127.0.0.1:4000  # Netease
BackendApi=http://127.0.0.1:3000 # For test module, not require
```
```shell
# frontend
```
## Startup
```shell
# Server
cd ./NeteaseCloudMusicApi
npm install
node app.js
cd ./MusicPlus/server
npm install
npm server  # localhost:3000 in default

# Client
cd ./Music Plus/client
npm install 
npm run dev
```
