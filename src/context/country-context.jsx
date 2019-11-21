import React, { useState, createContext } from "react";

const defaultCountry = {
    code: null,
    name: null,
};

const CountryContext = createContext({
    country: defaultCountry,
    setCountry: () => {},
});

const CountryProvider = ({ children }) => {

    const [country, setCountry] = useState(defaultCountry);
    const clearCountry = () => setCountry(defaultCountry);

    return (
        <CountryContext.Provider value={{ country, setCountry, clearCountry }}>
            {children}
        </CountryContext.Provider>
    );
}

export default CountryContext;
export { CountryProvider };
