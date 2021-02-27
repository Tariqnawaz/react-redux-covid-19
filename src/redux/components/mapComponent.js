import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Search from './search';
import {getWithExpiry, KEY} from '../../util/util';
import './map.css';


const mapStyles = {
    width: '100%',
    height: '100%'
};

class MapComponent extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            affectedCountries: [],
            totalaffectedCountries: []
        }
    }
    
    componentDidMount() {
        const serialisedState = getWithExpiry(KEY);
        if (!serialisedState) return undefined;
        const data = JSON.parse(serialisedState);
        const {list} = data;
        console.log('inside 1 ', JSON.stringify(list));
        const affectedCountries = list?.countriesList;
        this.setState({affectedCountries: affectedCountries, totalaffectedCountries: affectedCountries});
    }

    updateMap = (countryName) =>{
        if(countryName === 'ALL'){
            this.setState({affectedCountries: this.state.totalaffectedCountries});
            return;
        }
        const res =  this.state.totalaffectedCountries.filter(d=> d.country === countryName);
        this.setState({affectedCountries: res});
    }

    render(){
      const {affectedCountries} = this.state;
    return (
        <>
        <div className='google-map-container'>
            <Search parentCallback={this.callback} updateMap={this.updateMap}/>
            <Map
                google={this.props.google}
                zoom={1.8}
                style={mapStyles}
                initialCenter={{ lat: 12.8628, lng: 30.2176}}
                disableDoubleClickZoom = {true}
                keyboardShortcuts = {true}
                disableDefaultUI = {true}
                scrollwheel= {false}
            >   
                {affectedCountries && affectedCountries.map((e,i) => {
                    const cases = `${e.country} \n cases: ${e.cases}`
                    return <Marker key={i} className="marker-container"
                        title={cases}
                        name={e.country} 
                        position={{lat: e.countryInfo.lat, lng: e.countryInfo.long}}
                    />
                })}
            </Map>
        </div>
        </>
    );
}
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCMYP0EoOfr2N_dSmYn-Olz47JYEB4MRH8'
})(MapComponent);
  