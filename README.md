# Album-Multitrack-Player

## Code Organization

All project code is in the `src`. The project only has one page at this point, the `homepage`. Everything related to the view of this page can be found in `features/homepage`. This includes both Desktop and Mobile version where applicable.

Shared Modules/Business Logic is found in the `libs` directory. There should be no view components in the `libs` directory. These shared modules can depend on other shared modules, however they should not depend on any feature modules. In other words, feature modules can import shared modules inside `libs` but not the other way around.

## Philosophy

Although this app is quite simple, there is are some strict rules that apply to data-flow. There is one store for all the data in this application. View components should not contain there own state, rather they should purely render the data received from the store.

Data in the store can be updated via actions that the store provides. These actions can be called directly from view components if they are synchronous and pure. The View can also call actions imported from a shared library which may handle any necessary business logic and in turn call Store Actions if necessary.

Ideally it looks something like this:

1. App loads data and enters an initial state of Store
2. App Store passes data to View and renders data to screen
3. View receives input from user
4. View takes input data and calls an action with input data
5. Action updates App Store
6. Back to step 2

---

## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

If you'd like to site to compile with Typescript Errors:

### `TSC_COMPILE_ON_ERROR=true npm start`

---

## Testing

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

---

## Production

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

### More Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
