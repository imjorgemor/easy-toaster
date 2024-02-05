import { ElementRef, useRef } from 'react';
import { counterObserver } from './observer';

export const ButtonComponent = () => {
    const inputRef = useRef<ElementRef<"input">>(null)

    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={() => counterObserver.notify(inputRef.current?.value ?? "")}>send a message</button>
        </div>
    )
}

