export const storageService = {
    query,
    post,
    // Implement and uncomment these as needed:
    get,
    makeId,
    put,
    // remove,
};

interface Entity {
    _id: string;
    [key: string]: any;
}

function query<T extends Entity>(entityType: string, delay: number = 0, sortNewestFirst: boolean = false): Promise<T[]> {
    return new Promise((resolve) => {
        const storedData = localStorage.getItem(entityType);
        let entities: T[] = storedData ? JSON.parse(storedData) : [];

        // Sort entities by createdAt date if sortNewestFirst is true
        if (sortNewestFirst && entities.length > 0 && 'createdAt' in entities[0]) {
            entities = entities.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }

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


function get(entityType: string, entityId: string): Promise<Entity> {
    return query(entityType).then((entities: Entity[]) => {
        const entity = entities.find((entity) => entity._id === entityId);
        if (!entity)
            throw new Error(
                `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
            );
        return entity;
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
