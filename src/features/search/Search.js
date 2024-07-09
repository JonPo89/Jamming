import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../authorisation/authorisationSlice";
import { getTracks, clearSearch } from "../tracklist/trackSlice";

export function Search (){
    const [ searchTerm, setSearchTerm ] = useState("");
    
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    const onChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (searchTerm.length > 1) {
            dispatch(getTracks({accessToken: accessToken, searchTerm: value}));
        } else {
            dispatch(clearSearch());
        }
        
    }

    return (
        <div className="search">
            <input type="text" id="searchBar" placeholder="Search for songs..." onChange={onChange} value={searchTerm} />
        </div>
     )
    
}