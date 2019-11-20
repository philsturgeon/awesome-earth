import React, { useState, createContext } from "react";

const defaultCountry = {
    code: null,
    name: null,
}

const CountryContext = createContext({
    country: defaultCountry,
    setCountry: () => {},
});

const CountryProvider = ({ children }) => {

    const [country, _setCountry] = useState(defaultCountry);

    const setCountry = newCountry => {
        _setCountry(newCountry);
    };

    return (
        <CountryContext.Provider value={{ country, setCountry }}>
            {children}
        </CountryContext.Provider>
    );
}

export default CountryContext;
export { CountryProvider };
