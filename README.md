# Server Application

You can have un-authorized routes.
```sh
$ git clone git@github.com:ardamutlu/transaction-spa.git

$ npm i
$ npm run start:dev
$ open http://localhost:3001
```

Use the `/auth/login` route to login.
```sh
$ # POST /auth/login
$ curl -X POST http://localhost:3001/auth/login -d '{"username": "maria", "password": "123"}' -H "Content-Type: application/json"
$ # result -> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm... }
```

## Production

```sh
$ cd transaction-spa/server
$ npm run build
$ npm run start:prod
$ open http://localhost:8080
```
