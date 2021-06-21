import React, { ComponentProps, ElementType, forwardRef, ReactElement, useCallback, useEffect, useRef, useState } from "react";


export type TransitionProps<E extends ElementType> = {
    active: boolean;
    entering: string;
    entered?: string;
    exiting: string;
    exited?: string;
    as?: E;
} & Omit<ComponentProps<E>, "as">;

const defaultElement = "div";
function _Transition<E extends ElementType =  typeof defaultElement>({
    children,
    active,
    entering,
    exiting,
    entered,
    exited,
    className,
    as,
    ...rest
}: TransitionProps<E>, ref: typeof rest.ref): ReactElement {
    const [transition, setTransition] = useState(false);
    const [localOpen, setLocalOpen] = useState(active);
    const elementRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    const isInitialMount = useRef(true);
    const close  = useCallback(() => {
        setLocalOpen(false);
    }, []);

    
    useEffect(() => {
        rest;    
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        const element = ref?.current || elementRef?.current;
        element?.removeEventListener("transitionend", close);

        if (isInitialMount.current) isInitialMount.current = false;
        else {
            if (active) {
                setLocalOpen(true);
                // Using two request animations to avoid bugs in some browsers
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setTransition(true);
                    });
                });
            } else {
                setTransition(false);
                element?.addEventListener("transitionend", close);
            }
        }
        return () => {
            element?.removeEventListener("transitionend", close);
        };
    }, [active]);

    const Component = as || defaultElement;

    return <Component {...rest} className={`${className ?? ""} ${transition ? entering : exiting} ${(localOpen ? entered : exited) ?? ""}`} 
        ref={ref ||elementRef} >
        {children}
    </Component>;
}

export const Transition = forwardRef( _Transition);