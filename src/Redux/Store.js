import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from "./Reducers/rootReducer";

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
)

export default store;

// store.js
// import { configureStore } from '@reduxjs/toolkit';
// import reducer from "./Reducers/rootReducer";
// import {thunk} from "redux-thunk"; // Redux Toolkit includes thunk by default, but we'll add it explicitly if needed

// const store = configureStore({
//     reducer, // Same combined reducer with classic and toolkit slices
//     middleware: (getDefaultMiddleware) => 
//         getDefaultMiddleware().concat(thunk), // Add thunk if needed
//     devTools: process.env.NODE_ENV !== 'production', // DevTools only in development
//     preloadedState: {}, // initial state if needed
// });

// export default store;
