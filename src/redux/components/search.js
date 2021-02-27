import React, { useEffect, useState, useRef } from "react";
import './search.css';

const Search = ({updateMap, classVal, countriesNames}) => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState(countriesNames);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    useEffect(() =>{
      setOptions(countriesNames);
    },[countriesNames])

    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });
  
    const handleClickOutside = event => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };
  
    const updateCountryList = country => {
      setDisplay(false);
      setSearch('');
    };

    return (
      <div ref={wrapperRef} className={classVal !== undefined && 
         classVal === 'chart' ? 'search-container-chart' : 'search-container'}>
        <input
            ref={inputRef}
            id="auto"
            onClick={() => setDisplay(true)}
            placeholder="Type to search"
            value={search}
            onChange={event => setSearch(event.target.value)}
        />
        {(display && search !== undefined && search !== '') && (
            <div  className={classVal !== undefined && 
              classVal === 'chart' ? 'auto-container-chart' : 'auto-container'}>
            {options
            .filter(country => country.toLowerCase().indexOf(search.toLowerCase())>-1)
            .map((countryName, i) =>{
                return (
                  <div onClick={() => {
                      updateCountryList(countryName);
                      updateMap(countryName);
                    }}
                    className="options-container" key={i}>
                    <span>{countryName}</span>
                  </div>)
                })}
          </div>
        )}
        </div>
    );
  };


export default Search;