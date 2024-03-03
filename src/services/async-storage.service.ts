export const storageService = {
    query,
    post,
    // Implement and uncomment these as needed:
    // get,
    makeId,
    put,
    // remove,
};

interface Entity {
    _id: string;
    [key: string]: any;
}

function query<T extends Entity>(entityType: string, delay: number = 500): Promise<T[]> {
    return new Promise((resolve) => {
        const storedData = localStorage.getItem(entityType);
        const entities: T[] = storedData ? JSON.parse(storedData) : [];
        setTimeout(() => resolve(entities), delay);
    });
}

function post<T extends Entity>(entityType: string, newEntity: Omit<T, '_id'>): Promise<T> {
    const entityWithId: T = { ...JSON.parse(JSON.stringify(newEntity)), _id: makeId() } as T
    return query<T>(entityType).then((entities) => {
        entities.push(entityWithId);
        _save(entityType, entities);
        return entityWithId;
    });
}

async function put<T extends Entity>(entityType: string, updatedEntity: T): Promise<T> {
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity));

    return query<T>(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity._id === updatedEntity._id);
        if (idx < 0) {
            throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`);
        }
        entities.splice(idx, 1, updatedEntity);
        _save(entityType, entities);
        return updatedEntity;
    });
}

function _save<T extends Entity>(entityType: string, entities: T[]): void {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

// Remove if not used elsewhere.
// function randomId(): string {
//     return _makeId();
// }

function makeId(length: number = 5): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
