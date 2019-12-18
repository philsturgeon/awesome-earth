import React from "react";
import { CountryProvider } from "./src/context/country-context";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.css"
import "./src/styles/global.scss";

const wrapRootElement = ({ element }) => (
    <CountryProvider>{element}</CountryProvider>
);

export {
    wrapRootElement
};
