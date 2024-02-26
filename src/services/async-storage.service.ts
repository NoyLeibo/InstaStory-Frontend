export const storageService = {
    query,
    // get,
    // post,
    // put,
    // remove,
}

function query(entityType: string, delay: number = 500): Promise<[]> {
    return new Promise((resolve) => {
        const storedData = localStorage.getItem(entityType);
        const entities: [] = storedData ? JSON.parse(storedData) : [];
        setTimeout(() => resolve(entities), delay);
    });
}


// function query(entityType: string, delay: number = 500): Promise<[]> {
//     var entities: [] = JSON.parse(localStorage.getItem(entityType)) || []
//     return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
// }