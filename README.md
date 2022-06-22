<p align="center">
  <a href="https://example.com/">
    <img src="https://pbs.twimg.com/profile_images/979714483387092994/PMI-aUXp_400x400.jpg" alt="Logo" width=85 height=85>
  </a>

<h3 align="center">Ynov - M2 Dev Logiciel, Mobile & IoT</h3>
</p>

## Web Service

- [About us](#about-us)
- [About this project](#about-this-project)
- [Prerequisites](#prerequisites)
- [What's included](#whats-included)
- [How its work](#how-its-work)
- [How to install](#how-to-install)
- [Docs](#docs)

## About us

### Kaunogan

- kaunogan.lemoine@ynov.com (mail)
- [Kaunogan](https://github.com/Kaunogan) (github)

### Melanie

- melanie.tripot@ynov.com (mail)
- [MelTripot](https://github.com/MelTripot) (github)


### Elric

- elric.gumbau@ynov.com (mail)
- [GUMBAUElric](https://github.com/GUMBAUElric) (github)

## About this project

Cine-web is an intuitive and elegant web application allowing you to create movie categories, 
search movies, add movies to categories, share categories, add friends and more!

The movies are retrieved by the [TheMovieDataBase](https://www.themoviedb.org/?language=en) API

## Prerequisites

Here are the requirements for this project to be launched with Docker

| Prerequisites | Version  |              
|---------------|----------|
| Docker        | 20.10.16 |

> Ask google how to install if you don't have them 😉

## What's included

Here is the content of the api folder

```text
api/
  ├── app/ (contains Controller, Exceptions, Middleware, Models, Policies and Validators files that define the foundations of the application)
  ├── commands/ (contains all ace command used by Adonisjs framework)
  ├── config/ (contains the files configuration of the application)
  ├── contracts/ (needed for typescript)
  ├── database/ (contains the factories, migrations, seeders for mysql)
  ├── docs/ (folder used by swagger)
  ├── providers/ (bootstrap, or register, something inside of your AdonisJS application)
  ├── services/ (used to call TMDB API)
  ├── start/ (contains the route of api)
  ├── server.ts (entry point of the application)
  ├── env.ts (used to type env with typescript)
  ├── tsconfig.json (typescript configuration)
  ├── ace (used to execute ace command)
  └── package.json (holds metadata relevant to the project and manage the project's dependencies)
  
```

Here is the content of the app folder

```text
app/
  └── src/
       ├── assets/ (contains css and image files)
       ├── components/ (contains all components of the application)
       ├── controllers/ (contains the Http and LocalStorage controllers)
       ├── features/ (contains the composable for Vue.js)
       ├── features/ (contains all pages of the application)
       ├── router/ (contains all routes of the application)
       ├── services/ (contains service to call API)
       ├── stores/ (contains pinia stores)
  ├── tailwind.config.js (tailwindcss configuration file)
  ├── vite.config.ts (vitejs configuration file)
  ├── postcss.config.js (postcss configuration file)
  ├── tsconfig.json (typescript configuration file)
  ├── index.html (entry point of the application)
  └── package.json (holds metadata relevant to the project and manage the project's dependencies)

```

## How its work

The api like the web application is written in Typescript

The api is based on the fully featured [Adonisjs](https://adonisjs.com/) framework

The web app combines [Tailwindcss](https://tailwindcss.com/), [Sass](https://sass-lang.com/) and [Vue.js](https://vuejs.org/) framework
to create the visual design

The project follows this [specifications](https://moodle.ynov.com/pluginfile.php/554817/mod_resource/content/1/Projet%20Web%20Services%20-%20Consignes.pdf)

### API

Below you will find a Figma file containing the Entity Relation Ship and C3 architecture diagram :

[FigJam](https://www.figma.com/file/eu7VK8bDOoIkOdTrZrC72r/Ynov---CineWeb?node-id=0%3A1)

### APP

Below you will find a Figma file containing the Moodboard, Wireframes, Visual Design, Model of web application

[Figma](https://www.figma.com/file/1PNsc7OgLstJWSRTO4OhCL/Ynov---CineWeb?node-id=8%3A55)

### Functionalities

Most of the functionalities are implemented :

- Log in
- Register
- Search for movie using TMDB API
- Add / Delete movies in categories
- Get / Add / Update / Delete categories
- Get / Add / Delete friend
- Get / Update / Delete user account 
- Get user profile

You can share categories via URL according to visibility levels:

- All
- Friends Only
- You Only

> **_NOTE:_** Only friends added by the user will be able to access the 'Friends only' categories

> **_NOTE:_** The 'You only' visibility does not contain a sharing url.

### TODO

Due to lack of time, here are the features that remains to be done :

- Internationalization
- Optimization

## How to install

- Clone project
- Go to root folder (where docker-compose.yml is located)
- Then run

```bash
docker-compose up -d
```

> option '-d' launches container in detach mode

Once the containers are launched, you must launch the database migration by typing the following commands

### Run migration

The migration is executed by the ace command of the adonisjs framework, it must be launched from the cw-api container

```bash
docker exec -it cw-api sh
node ace migration:fresh --seed --force
```
The migration insert two users in the database and a category for each user

| User                | Password | Category  |              
|---------------------|----------|-----------|
| john.doe@cineweb.fr | cineweb  | Action    |
| jane.doe@cineweb.fr | cineweb  | Fantastic |

### phpMyAdmin

A phpMyAdmin is present in the docker-compose to facilitate access to the database

You can access to the phpmyadmin via http://localhost:8080

- leave server field empty
- User is cineweb
- Password is ynov69

You should see the cine-web database with the tables and fields that have been inserted 
by the migration !

### Access to application

You can now access the api and its swagger documentation via http://localhost:3333/api/docs

You can now access the web application via http://localhost:3000

> **_NOTE_** You can use the existing users to login or create your own account !

## Docs

Vue.js : https://vuejs.org

MySQL : https://www.mysql.com

Phpmyadmin: https://www.phpmyadmin.net

Docker : https://www.docker.com

Enjoy ! 😉
