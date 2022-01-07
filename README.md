# Grocer

![Grocer Logo](./docs/media/grocer-light.png)

- [What is Grocer?](#what-is-grocer)
- [Technologies](#technologies)
- [Installing Grocer](#installing-grocer)
  - [Firebase](#firebase)
  - [Other Dependencies](#other-dependencies)
  - [Additional Steps for Local Install](#additional-steps-for-local-install)
- [Running Grocer](#running-grocer)
- [Testing Grocer](#testing-grocer)
  - [Testing the Backend](#testing-the-backend)
  - [Testing the Frontend](#testing-the-frontend)

## What is Grocer?

Organize your recipes and compile shopping lists quickly with Grocer! Save your recipes, quickly find them by searching and filtering, and add all of the required ingredients to your basket with the click of a button. A great way for anyone to keep all of their favorite recipes in one place!

## Technologies

Here are the technologies utilized for Grocer:

- Frontend
  - TypeScript
  - React
  - Redux
  - Jest
- Backend
  - Ruby
  - Rails
  - PostgreSQL
  - Firebase Auth

## Installing Grocer

### Firebase

A Firebase key will need to be provided as an environment variable in order to allow for authentication. This key is found under the Firebase project settings and is called the **Web API Key**

If you are running this app on your local machine, you can do set this variable by creating a `secrets.rb` file and assigning the variable there. Here's what that file looks like:

```rb
# config/secrets.rb
ENV['firebase_key'] = 'YOUR_SECRET_KEY'
```

If you are hosting this on a service, you should be able to set environment variables directly in the service (for example, Heroku has config vars). Create a variable named `firebase_key` and assign your API key there.

[Click here](https://firebase.google.com/) to visit Firebase if you need to create an account.

**Keep your API keys secret!**

### Other Dependencies

This project was built using Ruby version 2.7.4. To install the required gems, navigate to the root directory of this project and run this command:

```bash
bundle install
```

After installing the Ruby dependencies, install the Node modules by running this command in the root directory.

```bash
npm install --prefix client
```

### Additional Steps for Local Install

> To run this app locally, PostgreSQL will need to be installed. Please follow the official instructions on [PostgreSQL's site](https://www.postgresql.org/) to install.

Start your local PostgreSQL server. Once running, navigate to the root directory and run these commands to create the database and run the migrations:

```bash
rails db:create
rails db:migrate
```

## Running Grocer

Once all the dependencies are installed, Grocer can be started. First ensure that your local PostgreSQL server is running. Then start the backend by navigating to the root directory in your terminal and running this command:

```bash
rails s
```

Then the frontend can be started. Navigate to the root directory in another terminal window and run this command:

```bash
npm start --prefix client
```

## Testing Grocer

### Testing the Backend

Backend tests can be run simply with this command:

```bash
rails test
```

### Testing the Frontend

Frontend tests are still in development. There are a few tests in place, which can be executed with this command:

```bash
npm test --prefix client
```
