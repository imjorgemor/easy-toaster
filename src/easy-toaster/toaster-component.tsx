import { type ToastBase } from "./observer";

type ToastProps = {
    toast: ToastBase;
};

export const ToastComponent = ({ toast }: ToastProps) => {
    return (
        <div style={{ margin: '10px', padding: '10px', backgroundColor: 'lightgray', borderRadius: '5px' }}>
            <div>{toast.message}</div>
        </div>
    );
};

import { useEffect, useState } from 'react';
import { toast as observer, type Toast } from './observer';
export const Toaster = () => {
    const [toasts, setToasts] = useState<ToastBase[]>([]);

    useEffect(() => {
        const subscribe = observer.subscribe((toast: Toast) => {
            setToasts((prev) => {
                if ('dismiss' in toast) {
                    // If toast should be dismissed, filter it out
                    return prev.filter((t) => t.id !== toast.id);
                } 
                return [...prev, toast]; 
            });
        });

        return subscribe;
    }, []);

    return (
        <div style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 999 }}>
            {toasts.map((toast) => (
                <ToastComponent
                    key={toast.id}
                    toast={toast}
                />
            ))}
        </div>
    );
};

