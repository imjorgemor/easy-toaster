export type ToastBase = {
    id: string;
    message?: string | React.ReactNode;
    dismiss?: boolean
};

export type Toast = ToastBase;

const generateId = ()=> `id_${Date.now()}_${Math.random().toString(36).slice(2,11)}`;

class Observer {
    private subscribers: Array<(toast: Toast) => void> = []; // general accepted
    private toasts: Array<Toast> = [];

    subscribe(subscriber: (toast: Toast) => void) { //setState
        console.log(subscriber)
        this.subscribers.push(subscriber);
    }

    private publish(toast: Toast): void {
        this.toasts.push(toast);
        // Schedule dismissal
        setTimeout(() => {
            this.dismiss(toast.id);
        }, 3000);

        this.subscribers.forEach(subscriber => subscriber(toast));
    }

    private dismiss(id: string): void {
        this.publish({ id, dismiss: true });
    }

    notify(message: string | React.ReactNode) {
        this.publish({ id: generateId(), message });
    };
}

export const toast = new Observer();

