import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar(props){
    

    return(

            <input type="text" name="search-bar" id="search-bar" placeholder="Search for a song" onChange={props.onChange} />

    );
};

export default SearchBar;