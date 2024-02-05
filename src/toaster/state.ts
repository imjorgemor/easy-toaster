export type ToastModel = {
    id: string;
    message: string | React.ReactNode;
    type?: 'success' | 'warning' | 'informative' | 'error';
    duration?: number; // Duration in milliseconds
};

export type ToastToDismiss = {
    id: string;
    dismiss: true;
};

export type Toast = ToastModel | ToastToDismiss

const generateId = () => `id_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`

class Observer {
    private subscribers: Array<(toast: Toast) => void> = [];
    private toasts: Array<Toast> = [];

    subscribe(subscriber: (toast: Toast) => void) {
        this.subscribers.push(subscriber);
        this.toasts.forEach(subscriber);
        return () => {
            const index = this.subscribers.indexOf(subscriber);
            if (index > -1) {
                this.subscribers.splice(index, 1);
            }
        };
    }

    private publish(toast: Toast) {
        if ('dismiss' in toast) {
            this.toasts = this.toasts.filter(t => t.id !== toast.id);
        } else {
            this.toasts.push(toast);
            if (!('dismiss' in toast) && toast.duration) {
                setTimeout(() => {
                    this.dismiss(toast.id);
                }, toast.duration);
            }
        }
        this.subscribers.forEach(subscriber => subscriber(toast));
    }

    success(message: string | React.ReactNode, duration = 5000) {
        this.publish({ id: generateId(), message, type: 'success', duration });
    }

    warning(message: string | React.ReactNode, duration = 5000) {
        this.publish({ id: generateId(), message, type: 'warning', duration });
    }

    informative(message: string | React.ReactNode, duration = 5000) {
        this.publish({ id: generateId(), message, type: 'informative', duration });
    }

    error(message: string | React.ReactNode, duration = 5000) {
        this.publish({ id: generateId(), message, type: 'error', duration });
    }

    addToast = (data: ToastModel) => {
        this.publish(data);
        this.toasts = [...this.toasts, data];
    };

    dismiss(id: string): void {
        this.publish({ id, dismiss: true });
    }
}

export const toastState = new Observer();

const basicToast = (message: string | React.ReactNode, type: ToastModel['type'] = "informative", duration: number = 5000) => {
    const id = generateId();
    toastState.addToast({ message, type, duration, id })

    return id;
}

const toast = Object.assign(
    (message: string | React.ReactNode, type: ToastModel['type'] = "informative", duration = 5000) => basicToast(message, type, duration),
    {
        success: toastState.success.bind(toastState),
        informative: toastState.informative.bind(toastState),
        warning: toastState.warning.bind(toastState),
        error: toastState.error.bind(toastState),
    }
);

export { toast };



