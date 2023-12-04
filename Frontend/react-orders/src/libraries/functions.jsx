export 
const getObjects = async (baseUrl, destination) => {
    const options = {
        method: 'GET'
    }

    const result = await fetch(baseUrl + destination, options);
    if (result.ok) {
        return await result.json()
    }
    return []
}
export const apiUrl = "http://localhost:5054/api/";
