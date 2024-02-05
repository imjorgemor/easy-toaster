import { ToastModel, Toast } from "./state";

type Props = {
    toast: ToastModel;
    onDismiss: () => void; // Callback to dismiss the toast
};

export const ToastComponent = ({ toast, onDismiss }: Props) => {
    return (
        <div style={{ margin: '10px', padding: '10px', backgroundColor: 'lightgray', borderRadius: '5px' }}>
            <div>{toast.message}</div>
            <button onClick={onDismiss} style={{ marginTop: '10px' }}>
                Close
            </button>
        </div>
    );
};

import { useEffect, useState } from 'react';
import { toastState as observer } from './state'; // Import the Observer instance and types

export const Toaster = () => {
    const [toasts, setToasts] = useState<ToastModel[]>([]);

    useEffect(() => {
        // Subscribe to the Observer on mount
        const subscribe = observer.subscribe((toast: Toast) => {
            setToasts((prev) => {
                if ('dismiss' in toast) {
                    return prev.filter((toastToDismiss) => toastToDismiss.id !== toast.id);
                } else {
                    const existingIndex = prev.findIndex((t) => t.id === toast.id);
                    if (existingIndex !== -1) {
                        const updatedToasts = [...prev];
                        updatedToasts[existingIndex] = toast;
                        return updatedToasts;
                    }
                    return [...prev, toast];
                }
            });
        });

        return subscribe;
    }, []);

    const handleDismiss = (id: string) => {
        observer.dismiss(id);
    };

    return (
        <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 1000 }}>
            {toasts.map((toast) => (
                <ToastComponent
                    key={toast.id}
                    toast={toast}
                    onDismiss={() => handleDismiss(toast.id)}
                />
            ))}
        </div>
    );
};

