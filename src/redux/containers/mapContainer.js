import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useMediaPredicate } from "react-media-hook";
import Search from '../components/search';
import TotalCases from '../components/totalCases';
import ChartsComponent from '../components/chartsComponent';
import {getCovidContriesCases} from '../actions/action'
import {getWithExpiry, KEY} from '../../util/util';
import './map.css';

const mapStyles = {
    width: '100%',
    height: '100%'
};

/**
 * MapContainer is a container component which maps store data to local state
 * Connecting redux store & storing data to localstorage
 * ChartsComponent & TotalCases is a dumb component which gets data from container for displaying data  
 * getWithExpiry() checks for cache expiry & return data from localstorage.
 * Search component is autocomple search box for searching countries.
 */
const MapContainer = (props) => {
    const breakPoint = useMediaPredicate("(min-width: 768px)");
    const {mapData} = props;
    const [mapDetails, setMapDetails] = useState({
        affectedCountries: [],
        totalaffectedCountries : [],
        countriesNamesList: [],
        totalCaseStatsList: []
    });
    const [chartData, setChartData] = useState({
        contriesStats: [],
        countryHistroy: [],
        countriesNamesList: []
    })
    
    useEffect(() => {
        const serialisedState = getWithExpiry(KEY);
        if (!serialisedState) return undefined;
        const data = JSON.parse(serialisedState);
        const {list} = data;
        const affectedCountries = list?.countriesList;
        const totalCaseStats = list?.totalCaseStats;
        const countriesNames = affectedCountries.map(element => {return element.country});
        countriesNames.unshift('ALL');
        setMapDetails({
            affectedCountries: affectedCountries,
            totalaffectedCountries: affectedCountries,
            countriesNamesList: countriesNames,
            totalCaseStatsList: totalCaseStats
        })
        setChartData({
            contriesStats: list?.contriesStats,
            countryHistroy: list?.countryHistroy,
            countriesNamesList: countriesNames
        })
    },[mapData]);

    const updateMap = (countryName) =>{
        if(countryName === 'ALL'){
            setMapDetails({...mapDetails,affectedCountries: mapDetails.totalaffectedCountries})
            return;
        }
        const res =  mapDetails?.totalaffectedCountries.filter(d=> d.country === countryName);
        setMapDetails({...mapDetails,affectedCountries: res})
    }
   
    const {affectedCountries, countriesNamesList, totalCaseStatsList} = mapDetails;  
    
    return (
        <>
        <div className='google-map-container'>
            <Search 
                updateMap={updateMap} 
                classVal='googleMap' 
                countriesNames={countriesNamesList}
            />
            <Map
                google={props.google}
                zoom={!breakPoint?1.3:2.1}
                style={mapStyles}
                initialCenter={{ lat: 12.8628, lng: 30.2176}}
                disableDoubleClickZoom = {true}
                keyboardShortcuts = {true}
                //mapType="hybrid"
                disableDefaultUI = {true}
                scrollwheel= {false}
            >   
                {affectedCountries && affectedCountries.map((e,i) => {
                    const cases = `${e.country} \n cases: ${e.cases}`
                    return <Marker key={i} className="marker-container"
                        title={cases}
                        name={e.country} 
                        lat={e.countryInfo.lat}
                        lng={e.countryInfo.long}
                        position={{lat: e.countryInfo.lat, lng: e.countryInfo.long}}
                        icon={{
                            url: e.countryInfo.flag,
                            anchor: new window.google.maps.Point(0,0),
                            scaledSize: new window.google.maps.Size(15,15),
                            origin: new window.google.maps.Point(0,0),
                        }}
                    />
                })}
            </Map>
        </div>
        <TotalCases totalCaseStats={totalCaseStatsList}/>
        <ChartsComponent chartData={chartData}/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
      mapData: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    const serialisedState = getWithExpiry(KEY);
    if (serialisedState===null || serialisedState === undefined){
        return {
            search: dispatch(getCovidContriesCases()),
        };
    } 
    return {}
};

const connector = connect(mapStateToProps, mapDispatchToProps)(MapContainer);
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCMYP0EoOfr2N_dSmYn-Olz47JYEB4MRH8'
})(connector);

  