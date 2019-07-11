export const responseToJson = async (response) => {
    try {
        const text = await response.text();
        // console.log('response:', text);
        const object = JSON.parse(text);
        if(response.status >=300 || response.status <200) {
            throw new Error(object.message);
        }
        if(object.error) {
            throw new Error(object.error);
        }
        return JSON.parse(text);
    } catch(error) {
        throw error;
    }
}