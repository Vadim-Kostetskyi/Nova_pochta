import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.novaposhta.ua/v2.0/json/';

interface Information{
    "apiKey": number,
    "modelName": string,
    "calledMethod": string,
    "methodProperties": {
    "FindByString" : string,
    "Limit":string
    "Documents" :   [{
                        "DocumentNumber":string,
                    }]
    }
}

export const getInfo: any = createAsyncThunk('get info', async (information: Information) => { 
    try {
        const { data } = await axios.post('/', information);
        return data;
    } catch (error: any) {
        throw new error(error);
    }
})

export const getStreet: any = createAsyncThunk('get street', async (information: Information) => {    
    try {
        const { data } = await axios.post('/', information);
        return data;
    } catch (error: any) {
        throw new error(error);
    }
})