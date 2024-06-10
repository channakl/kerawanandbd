
export const setLocalStorage = (key, data) => {
    if (typeof window !== 'undefined') {
        let localData = data;
        if (data && data !== null) {
            localData = JSON.stringify(data);
        }
        localStorage.setItem(key, localData);
    }
    return false;
};

export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key);
        if (data && data !== null) {
            let returnData;
            try {
                returnData = JSON.parse(data);
            } catch {
                return false;
            }

            return returnData;
        }
        return data;
    }
    return false;
};

export default {
    setLocalStorage,
    getLocalStorage,
};