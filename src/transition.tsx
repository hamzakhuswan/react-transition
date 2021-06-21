/* eslint-disable react/display-name */
import React, { ComponentProps, ElementType, forwardRef, useCallback, useEffect, useRef, useState } from "react";

const defaultElement = "div";

export type TransitionProps<E extends ElementType> = {
    active: boolean;
    entering: string;
    entered?: string;
    exiting: string;
    exited?: string;
    as?: E | "div";
} & Omit<ComponentProps<E>, "as">;

export const Transition: <E extends React.ElementType = typeof defaultElement>(
    props: TransitionProps<E>
) => React.ReactElement | null = forwardRef(<E extends React.ElementType = typeof defaultElement>({
    children,
    active,
    entering,
    exiting,
    entered,
    exited,
    className,
    as: Component = "div",
    ...rest
}: TransitionProps<E>, ref: typeof rest.ref) => {
    const [transition, setTransition] = useState(false);
    const [localOpen, setLocalOpen] = useState(active);
    const elementRef = useRef(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    const isInitialMount = useRef(true);
    const close = useCallback(() => {
        setLocalOpen(false);
    }, []);
    
    useEffect(() => {
        
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

    return <Component {...rest} className={`${className ?? ""} ${transition ? entering : exiting} ${(localOpen ? entered : exited) ?? ""}`}
        ref={ref || elementRef} >
        {children}
    </Component>;
});
