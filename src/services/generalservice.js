// import {environmnet} from '../environment/environment';

export const getData = async ( city, language) => {
    // const response = await fetch(`${environmnet.baseurl}city/${city}/${language}`, {
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-host': environmnet.rapidApiHost,
    //         'x-rapidapi-key': environmnet.rapidApiKey
    //     }
    // });
    const response = await fetch('./jsonfiles/weatherSample.json', {
        method: 'GET'});
    return response.json();
}

export const getCityList = async (daata) => {
    const response = await fetch('./jsonfiles/cityname.json', {
    // const response = await fetch(`http://192.168.11.89:3000/cities?search=${daata}`, {
        method: 'GET'});
    return response.json();
}

