import {
    FETCH_REQUEST,
    FETCH_ERROR,
    COUNTRIES_HISTORY,
    DASHBOARD_ONLOAD
  } from '../actionType/actionType';

const initialState = {
    loading: false,
    country:'',
    countriesList: [],
    contriesStats: [],
    totalCaseStats: [],
    countryHistroy:[],
    error: '',
};
const reducer = (state= initialState, action)=>{
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
            };
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case COUNTRIES_HISTORY:
            return {
                ...state,
                loading: false,
                countryHistroy: action.payload.countryHistroy,
                country: action.payload.country
            };
        case DASHBOARD_ONLOAD:
            return {
                ...state,
                loading: false,
                contriesStats: action.payload.contriesStats,
                totalCaseStats: action.payload.totalCaseStats,
                countryHistroy: action.payload.countryHistroy,
                countriesList: action.payload.countriesList,
                country: action.payload.country
            };
        default:
            return state;
    }
}

export default reducer;