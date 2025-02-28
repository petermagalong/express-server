# Node.js with ServerRepository by Peter

## Getting Started:

Use `git clone` to clone this repo:

```console
$ git clone https://github.com/petermagalong/express-server.git

or

Click `Clone or download` and `Download ZIP` to get this repo.

## Install the packages

1. Open a terminal

```console
$ npm install
```

## To Start the project

Make sure you setup your `DATABASE` already before starting and using `REST API`

```console
$ npm start
```
## Folder Structure 
```
└── 📁src
    └── 📁config
        └── dbConnect.js
    └── 📁controllers
        └── authController.js
        └── dentistController.js
    └── 📁middlewares
        └── authMiddleware.js
        └── errorHandler.js
        └── roleMiddleware.js
    └── 📁models
        └── bookingModel.js
        └── dentistModel.js
        └── parmacyModel.js
        └── userModel.js
    └── 📁routes
        └── authRoutes.js
        └── dentistRoutes.js
        └── userRoutes.js
    └── 📁utils
        └── appError.js
        └── constants.js
        └── paginatedData.js
        └── tryCatch.js
    └── 📁validations
        └── authValidation.js
    └── index.js
    └── .env
    └── .gitignore
    └── eslint.config.mjs
    └── package-lock.json
    └── package.json
    └── README.md
    └── request.http
```
## References
-Error handling 
  - https://expressjs.com/en/guide/error-handling.html
-JWT 
  - https://www.npmjs.com/package/jsonwebtoken
