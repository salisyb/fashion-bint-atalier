import store from "store";

// store.js will help us with browser local storage access so that we
// don't have to implement them ourself, also i haven't use redux-persist
// because of time it require for setup. but this will do for now.
// visit here to know more: https://github.com/marcuswestin/store.js
const storage = store;

// i change the name to storage so that it will not collide with
// redux store just for safety also can add any customization here
export default storage;
