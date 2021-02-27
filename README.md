# About The Project
![dashboard](https://user-images.githubusercontent.com/31206475/109402223-736f4400-796d-11eb-9faf-d3295fcbcaed.png)
<!-- ![dashboard1](https://user-images.githubusercontent.com/31206475/109402222-6fdbbd00-796d-11eb-8abf-d8d25519f50a.png) -->

**Project Stack**
1. React js
2. React Router
3. Vanilla css
4. Google map
5. Charts

**Description**
* A responsive reactJS application which shows COVID-19 live update.
* User can see number of total cases around the world.
* Google map and charts to display data.
* RapidAPI (free api for COVID-19)

# Getting Started

1. Prerequisites  
* install `Node.js`
* Google map key `(place inside mapContainer.js)`
* RapidAPI token `(create account)`

2. Installation*
* `git clone https://github.com/Tariqnawaz/react-redux-covid-19.git`
* inside root folder `npm install`
* `npm start` runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000)

# Usage

![usage](https://user-images.githubusercontent.com/31206475/109402225-74a07100-796d-11eb-9c8d-0e45b4748c64.png)

1. Using api  `https://rapidapi.com/api-sports/api/covid-193`
2. On app load fetching data from source `https://rapidapi.com/api-sports/api/covid-193` [/statistics, /history, /countries]
3. This free api doesn't provide latitude and longitude for ploting marker on Google map, used external API for that `https://disease.sh/v3/covid-19/countries`
4. Created `axios` instance for authentication af all requests.
5. Response data stored in redux store and then cloned all data to localstorge for caching.
6. Localstorage cache data will expire in every `2 hours`, after that will load fresh data from API.
7. Cached data used for displaying data & avoids multiple request.
8. Google maps displays marker for all affected countries by covid-19 & user can also search `single country` or `ALL` for getting total case count.
9. Charts display different statistics data.
10. Historical chart show number of new daily cases filtered by country. 
