# Multipart Form Data + Cloudinary + React

## Setting up

* clone this repo

### Server

* cd into `server` 
* run `npm i` to get the needed packages
* touch `.env`
* add your `CLOUDINARY_URL` that you can get from the [cloudinary api](https://cloudinary.com/) to the `.env`
* run the server with `node index.js`

### Client

* cd into `client`
* run `npm i`
* touch `.env.local` 
* add `REACT_APP_SERVER_URL='localhost:8000'` to the `.env.local` 
* run `npm run start` to fire up the react app