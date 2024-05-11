import { combineReducers, configureStore,Middleware } from "@reduxjs/toolkit";
import { DomainReducer } from "../pages/domains/DomainReducer";
import { thunk } from "redux-thunk";
import logger from "redux-logger";

const rootreducer=combineReducers({domain:DomainReducer})

// Configure store
const compstore = configureStore({
    reducer: rootreducer,
    // Properly configure additional middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });

export default compstore; 