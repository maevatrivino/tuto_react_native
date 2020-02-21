export const storeData = async (key,data) => {
    var ls = require('local-storage');
    try {
        ls.set(key, data.toString());
    } catch (error) {
        console.error("Error Storing",key,data,error);
    }
};

export const retrieveData = async (key) => {
    var ls = require('local-storage');
    try {
        const value = await ls.get(key);
        if (value !== null) 
        {
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
    var ls = require('local-storage');
    try {
       
        await ls.clear();
    } catch (error) {
        console.error(error);
    }
}