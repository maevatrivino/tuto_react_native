import {AsyncStorage} from 'react-native';

export const storeData = async (key,data) => {
    try {
        await AsyncStorage.setItem(key, data.toString());
    } catch (error) {
        console.error("Error Storing",key,data,error);
    }
};

export const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
        // We have data!!
            return value;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const clearData = async() =>
{
    try {
       
        await AsyncStorage.clear();
    } catch (error) {
        console.error(error);
    }
}