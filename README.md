# Music Plus


A music app which provides personalised recommendations based on a user's listening habits and preferences. It will also offer a social component, allowing users to connect and share music with friends.

## Music APIs source
Our music APIs source base on an open source [NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi).


## Features
* Personalised Song Recommendations
* Great Streaming Quality
* Add Songs to Favorite
* Post comments of songs
* Share playlist
* Trending music
* Support both mobile and PC users
* No Subscription

## Functions
- [x] Login
    - [x] Login
    - [x] Logout
    - [x] Register
- [] Home
    - [x] Poster
    - [x] Random Recommendation (Base on your )
    - [x] Random Playlist

## Screenshots
(...)


## Technique stacks
- React.js (Frontend framework)
- React-Bootstrap (Frontend ui-framework)
- React-paginate (Paginator)
- React-router (Router)
- axios (Http request)
- js-cookie (Sending cookie)
- Javascript (Programming language)
- Express.js (Backend framework)
- nanoid (Generate ids)
- mongoose (ODM)
- morgan (Test tools)
- supertest (Test tools)
- chai  (Test tools)
- chai-http (Test tools)
- assert (Test tools)
- mochawesome (Generate report html document)
- nodemon (Hot reload)
- babel (convert commonjs std to es6 std)

---

## Configuration
```shell
# backend
cd ./MusicPlus/server
vi .env

# copy and paste
DB_URL=mongodb://127.0.0.1:27017/MusicPlus # database, required
NeteaseCloudMusicApi=http://127.0.0.1:4000  # Accessing NeteaseCloud APIs, required
BackendApi=http://127.0.0.1:3000 # For test module, Optional
```
```shell
# frontend
cd ./MusicPlus/client
vi .env

# copy and paste
VITE_BACKEND_BASE_URL=http://127.0.0.1:3000 # Backend API, required
VITE_NETEASY_URL=http://localhost:4000 # # Accessing NeteaseCloud APIs, required
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
## Build
```shell
cd ./MusicPlus/client
npm build
```