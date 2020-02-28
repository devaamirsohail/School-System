import React from "react";
import { initialState } from "./authReducer";
const authContext = React.createContext(initialState);

export const Provider = authContext.Provider;
export const Consumer = authContext.Consumer;
export default authContext;
