/* useState allows for adding React state to function components
    useState hook accepts init state and return array containing 
    current state (eq to this.state) and a funct to update it
    (eq to this.setState) */
import React, { useState } from "react";
/* Passing current state as value for search input field */ 
const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");
/* calling handleSearchInputChanges calls setSearchValue */
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const resetInputField = () => {
        /*gives an empty string to clear input field */
        setSearchValue("")
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input 
            value={searchValue}
            /*onChange will cal handleSearchInputChanges */
            onChange={handleSearchInputChanges}
            type="text"
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    );
}
export default Search;