import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import PChart from './pChart';
import MixedChart from './mixedChart';
import HistoricalCharts from './historicalCharts';
import AreaStackCharts from './areaStackCharts';
import Search from './search';
import '../components/charts.css'

const ChartsComponent = (props) => {
    const {chartData} = props;
    const [chartDetails, setChartDetails] = useState({
        coustryWiseCaseCount: [],
        activeCount: [],
        continentCount: [],
        montlyCaseHistory: [],
        countriesNamesList: []
    })

    useEffect(() =>{
        if(!chartData.contriesStats.length && !chartData.countryHistroy.length
            && !chartData.countriesNamesList.length) return;
        setChartDetails({
            coustryWiseCaseCount: filterCountryWiseCount(chartData?.contriesStats?.response),
            activeCount: countryWiseActiveCase(chartData?.contriesStats?.response),
            continentCount: contientWiseTotalCases(chartData?.contriesStats?.response),
            montlyCaseHistory: montlyCasesHistory(chartData?.countryHistroy?.response),
            countriesNamesList: chartData?.countriesNamesList
        })
    },[chartData]);

    
    const filterCountryWiseCount = (dataList) =>{
        let obj = [];
        dataList.forEach((e) => {
			if(e.population !== null && e.country.toLocaleLowerCase()!=='all'){
				obj.push({
					time: e.country,
					call: e.cases.active, // active
					total: e.cases.total, // total cases
					death: e.deaths.total, // died
				})
            }
		});
        obj.sort((a, b) => a.time.localeCompare(b.time));
        
        return obj;
    }

    const countryWiseActiveCase = (dataList) =>{
        let activeObj = [];
        dataList.forEach((e) => {
			if(e.population !== null && e.country.toLocaleLowerCase()!=='all'){
				activeObj.push({type: e.country, value: e.cases.active})
			}
		});
        return activeObj;
    }

    const contientWiseTotalCases = (dataList) =>{
        let obj = [];
        dataList.forEach((e,i) => {
			if(e.population === null && e.country.toLocaleLowerCase()!=='all'){
				obj.push({country: e.continent, cases: e.cases.total})
            }
		});
        obj.sort((a, b) => a.cases - b.cases)
        return obj;
    }

    const montlyCasesHistory = (dataList) =>{
        if(dataList===undefined)return;
        let obj = [];
        dataList.forEach((e,i) =>{
            const val = e.cases.new === null ? 0 : parseInt(e.cases.new.substr(1,e.cases.new));
            obj.push({
                month: `Jan ${i+1} new case:`,
                value: val
            })
        })
        return obj.slice(0,30);
    }
    
    const updateMap = useCallback(
        (countryName) => {
            axiosInstance.get('/history',{params: {country: countryName, day: '2021-02-01'}})
            .then((response) => {
                setChartDetails({
                    ...chartDetails,
                    montlyCaseHistory: montlyCasesHistory(response?.data?.response)})
            }).catch(error => {
                console.log(error);
            });;
        },
        [chartDetails],
      );
    
    const {coustryWiseCaseCount, activeCount, 
        continentCount, montlyCaseHistory, countriesNamesList} = chartDetails;
    return (
        <div className="charts-container">
            <div className="chart">
                <div className="chart-header">Country wise cases count</div>
                <MixedChart coustryWiseCaseCount = {coustryWiseCaseCount}/>
            </div>
            <div className="chart">
                <PChart activeCount={activeCount}/>
            </div>
            <div className="chart">
                <div className="chart-header">Continent total cases count</div>
                <AreaStackCharts continentCount={continentCount}/>
            </div>
            <div className="chart">
                <div>
                    <div className="chart-header">Country wise montly new cases count</div>
                    <Search classVal='chart' updateMap={updateMap} countriesNames={countriesNamesList}/>    
                    <HistoricalCharts montlyCaseHistory={montlyCaseHistory}/>
                </div>
                
            </div>
        </div>
    );
};

export default ChartsComponent;
