This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Starting with development

## Requirements

- Backend: API services should be running, you can clone backend part [here](https://github.com/JuanKaSantana/theam-backend.git)
- Node Package Manager: npm should be installed, you can download it [here](https://www.npmjs.com/)

## Starting the App

### You have to do this steps on a bash terminal.

- Step 1: `git clone https://github.com/JuanKaSantana/theam-frontend.git`
- Step 2: `cd theam-frontend`
- Step 3: `npm install` - It probably takes some minutes
- Step 5: `npm start` - You can open your app in your browser [here](https://localhost:3000)

**Congrats!** Now you should have your App running. You can open it [here](https://localhost:3000)

**Note:** You will have to login into the app using admin@admin.com as email and admin as password

# Production deployment

## Requirements

- Docker: Docker have to be installed to deploy the app. You can download it [here](https://www.docker.com/)
- Docker Compose: docker-compose have to be installed to deploy the frontend and backend part together. You can download it [here](https://docs.docker.com/compose/install/)

### You have to do this steps on a bash terminal.

- Step 1: `git clone https://github.com/JuanKaSantana/theam-frontend.git`
- Step 2: `cd theam-frontend`
- Step 3: `docker-compose up` - It probably takes some minutes.

**Congrats!** Now you should have your App deployed. You can open it [here](https://localhost:3000)

**Note:** You will have to login into the app using admin@admin.com as email and admin as password
