import axios from 'axios';

const SEARCH_BASE_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';
const FDCID_BASE_URL = 'https://api.nal.usda.gov/fdc/v1/food/';
const API_KEY = 'xH0WCOswCn6Nlg568W7lMm4LQudhaa5WZX0Yezfi';
const GENERIC_SEARCH_DATA_TYPE = "Foundation,Survey (FNDDS),SR Legacy"

const searchFood = async (query, isGeneric) => {

    try {
        let params = {
            api_key: API_KEY,
            query: query,
        };
        if (isGeneric) {
            params['dataType'] = GENERIC_SEARCH_DATA_TYPE;
        }
        const response = await axios.get(SEARCH_BASE_URL, { params });
        return response.data.foods || [];
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

const getFoodDataFromId = async (fdcId) => {
    try {
        let params = {
            api_key: API_KEY,
        }
        const response = await axios.get(FDCID_BASE_URL + fdcId, { params });
        return response.data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

export { searchFood, getFoodDataFromId };
