import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.novaposhta.ua/v2.0/json/';

export const getInfo: any = createAsyncThunk('get info', async (information: any) => {
    // console.log(information);
    
    try {
        const { data } = await axios.get('', information);
        return data;
    } catch (error: any) {
        throw new error(error);
    }
})