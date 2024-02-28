export const storageService = {
    query,
    post,
    // Implement and uncomment these as needed:
    // get,
    // put,
    // remove,
};

interface Entity {
    _id: string;
    [key: string]: any; // Allows any other property in addition to _id.
}

function query<T extends Entity>(entityType: string, delay: number = 500): Promise<T[]> {
    return new Promise((resolve) => {
        const storedData = localStorage.getItem(entityType);
        const entities: T[] = storedData ? JSON.parse(storedData) : [];
        setTimeout(() => resolve(entities), delay);
    });
}

function post<T extends Entity>(entityType: string, newEntity: Omit<T, '_id'>): Promise<T> {
    const entityWithId: T = { ...JSON.parse(JSON.stringify(newEntity)), _id: _makeId() } as T
    return query<T>(entityType).then((entities) => {
        entities.push(entityWithId);
        _save(entityType, entities);
        return entityWithId;
    });
}

function _save<T extends Entity>(entityType: string, entities: T[]): void {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

// Optional: Remove if not used elsewhere.
// function randomId(): string {
//     return _makeId();
// }

function _makeId(length: number = 5): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
