export const SHOW_MSG = 'show-msg';

type Listener<T = any> = (data: T) => void;
type ListenersMap = {
    [key: string]: Listener[];
};

function createEventEmitter(): {
    on<T = any>(evName: string, listener: Listener<T>): () => void;
    emit<T = any>(evName: string, data: T): void;
} {
    const listenersMap: ListenersMap = {};

    return {
        on<T = any>(evName: string, listener: Listener<T>) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener];
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener);
            };
        },
        emit<T = any>(evName: string, data: T) {
            if (!listenersMap[evName]) return;
            listenersMap[evName].forEach(listener => listener(data));
        }
    };
}

export const eventBus = createEventEmitter();

interface UserMsg {
    txt: string;
    type: 'success' | 'error';
}

export function showUserMsg(msg: UserMsg) {
    eventBus.emit(SHOW_MSG, msg);
}

export function showSuccessMsg(txt: string) {
    showUserMsg({ txt, type: 'success' });
}
export function showErrorMsg(txt: string) {
    showUserMsg({ txt, type: 'error' });
}

// Extending the Window interface to avoid TypeScript errors
declare global {
    interface Window {
        showUserMsg: typeof showUserMsg;
    }
}

window.showUserMsg = showUserMsg;
