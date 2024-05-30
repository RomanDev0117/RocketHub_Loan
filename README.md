# Project setup

1. Add `.npmrc` file to install font awesome correctly
2. Run `npm i`
3. Create `.env.development.local` file and copy values from `.env.example` -> this will provide endpoints and correct access to dev server
4. Run `npm run dev`
5. Open `http://localhost:3001`
6. Provide login/password to dev enviroinment

# Build Prod

1. Prepare `.env.production` file for prod build
2. Run `npm run build:prod`
3. Copy `dist` folder and upload

# Build Dev

1. Prepare `.env.production` file for prod build
2. Run `npm run build:dev`
3. Copy `dist` folder and upload

# Login

If login functionality doesn't work on localhost here is a workaround:

1. Click on login button in the top right corner
2. Login in steam (if after login in steam page keeps loading -> just open dev/prod server url manually you should be logged in there already - there is some issue with redirect)
3. Open `http://localhost:3001`
4. Copy `token` cookie from dev/prod environment to the new tab with an app

# Known issues

- sockets which require authentication doesn't work correctly on localhost (currently it's possible to test those only on dev or prod environment after deployment)
#   R o c k e t H u b _ L o a n  
 #   R o c k e t H u b _ L o a n  
 #   R o c k e t H u b _ L o a n  
 