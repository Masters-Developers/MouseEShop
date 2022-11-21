import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Search = ()=> {
    const [keyword,setKeyword] = useState("")
    const navigate = useNavigate();
    const searchHandler = (e) =>{
        e.preventDefault();
        if (keyword.trim()){
            navigate(`/search/${keyword}`)
        }
        else{
            navigate("/")
        }
    }
    return(
        <form onSubmit={searchHandler}>
            
                <div className="input-group">
                    <input
                        type="text"
                        id="search_field"
                        className="form-control"
                        placeholder='What kind of product are you looking for?'
                        onChange={(e) => setKeyword(e.target.value)}
                        />
 
                        
                    <div className="input-group-append">
                        <button id="search-btn" className="btn">
                            <i className="fa fa-search text-white" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                
        </form>
    );
};

export default Search;