import React from "react";
import { CountryProvider } from "./src/context/country-context";

const wrapRootElement = ({ element }) => (
    <CountryProvider>{element}</CountryProvider>
);

export {
    wrapRootElement
};
