import axios from 'axios';
import axiosInstance from '../../config/axios';
import {
    FETCH_REQUEST,
    FETCH_ERROR,
    COUNTRIES_HISTORY,
    DASHBOARD_ONLOAD
  } from '../actionType/actionType';

export const fetchRequest = () => {
  return {
    type: FETCH_REQUEST,
  };
};

const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error,
  };
};

const countryHistroy = (countryHistroy, country) => {
  console.log('countryHistroy',countryHistroy)
  return {
    type: COUNTRIES_HISTORY,
    payload: {countryHistroy, country},
  };
};

const getCovidStats = axiosInstance.get('/statistics');
const getTotalCasesStats = axiosInstance.get('/statistics',{params: {country: 'all'}});
const getCountryHistoryMonthly = axiosInstance.get('/history',{params: {country: 'usa', day: '2021-02-01'}});
const getContriesName = axios.get('https://disease.sh/v3/covid-19/countries');

const dashBoardOnLoad = (obj) => {
  return {
    type: DASHBOARD_ONLOAD,
    payload: {
      'contriesStats': obj.contriesStats,
      'totalCaseStats': obj.totalCaseStats, 
      'countryHistroy': obj.countryHistroy, 
      'country': obj.country,
      'countriesList': obj.countriesList,
    },
  };
};

export const getCovidContriesCases = ()=>{
  return (dispatch) => {
    try {
      axios.all([getCovidStats,getTotalCasesStats, getCountryHistoryMonthly, getContriesName])
          .then(axios.spread((...responses) => {
          const contriesStats = responses[0].data
          const totalCaseStats = responses[1].data
          const countryHistroy = responses[2].data;
          const countries = responses[3].data
          const obj = {
            'contriesStats': contriesStats,
            'totalCaseStats': totalCaseStats, 
            'countryHistroy': countryHistroy, 
            'country': 'usa',
            'countriesList': countries,
          }  
          dispatch(dashBoardOnLoad(obj));
      })).catch(err => {
        dispatch(fetchError(err.message));
      })
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  }
}

export const getCountryHistroy = (country)=>{
  return (dispatch) => {
    try {
      dispatch(fetchRequest);
      axiosInstance.get('/history',{params: {country: country, day: '2021-02-01'}})
      .then((response) =>{
        dispatch(countryHistroy(response.data,country));
      })
      .catch(err =>{
        dispatch(fetchError(err.message));
      })
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  }
}

export default fetchRequest;
