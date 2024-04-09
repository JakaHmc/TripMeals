import React, { useRef, useEffect } from 'react';
import { applyActionCode } from 'firebase/auth'; // You might need to import this if it's used elsewhere
import NiceButton from '../components/NiceButton';

export default function Test() {
    const buttonRef = useRef();

    useEffect(() => {
        const applyContainerProperties = () => {
            buttonRef.current.classList.add("effect-container");
        };
        applyContainerProperties();

        const onClick = () => {
            buttonRef.current.classList.remove("active");
            setTimeout(()=>{
                buttonRef.current.classList.add("active");
            },10)
        }

        buttonRef.current.addEventListener("mouseup", onClick);

        const cleanupRef = buttonRef.current;

        return () => {
            cleanupRef.removeEventListener("mouseup", onClick);
        }
    }, []);

    return (
        <div className="nice-button-container" ref={buttonRef}>
            <NiceButton text="Wololo"/>
        </div>
    );
}
