export const KEY = 'persistantState';
export const getWithExpiry = (key) => {
    if(localStorage.getItem(key) === null) return undefined;
    const itemStr = localStorage.getItem(key)
    if (!itemStr && itemStr === undefined && itemStr == null ) {
        console.log('localstorage invalid ==========');
        return undefined
    }
    const item = JSON.parse(itemStr)
    if(item!==null && item?.key === undefined && item?.value===undefined){
        localStorage.removeItem(key);
        return undefined;
    }
    const {list} = item.value;
    const ttl = Math.round(new Date() / 1000);
    if (ttl > item.expiry && !list?.countriesList.length && !list?.contriesStats.length
        && !list?.totalCaseStats.length && !list?.countriesNames.length && !list?.countryHistroy.length ) {
        console.log('localstorage expires ==========');
        localStorage.removeItem(key);
        return undefined;
    }
    return item.value
}