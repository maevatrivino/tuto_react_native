import {AsyncStorage} from 'react-native';

export const storeData = async (key,data) => {
    try {
        await AsyncStorage.setItem(key, data);
    } catch (error) {
        // Error saving data
    }
};

export const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
};