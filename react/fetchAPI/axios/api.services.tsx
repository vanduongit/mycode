import axios from "axios";

export const GET_API_CALL = async (url: string, headers: any = {}) => {
    // debugger; // eslint-disable-line
    try {
        const data = await axios.get(url, headers);
        return data;
    } catch (error) {
        return error;
    }
};

export const POST_API_CALL = async (url: string, values: unknown) => {
    debugger; // eslint-disable-line no-debugger
    console.log(values);
    const data = await axios.post(url,values);
    return data;
};

export const PUT_API_CALL = async (url: string) => {
    try {
        const data = await axios.put(url);
        return data;
    } catch (error) {
        return error;
    }
};

export const DELETE_API_CALL = async (url: string) => {
    try {
        const data = await axios.delete(url);
        return data;
    } catch (error) {
        return error;
    }
};