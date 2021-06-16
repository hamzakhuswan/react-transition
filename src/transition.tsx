import React, { useCallback, useEffect, useRef, useState } from "react";
export interface TransitionProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactElement | string;
  active: boolean;
  className?: string;
  entering: string;
  entered?: string;
  exiting: string;
  exited?: string;
}

export function Transition({
    children,
    active,
    entering,
    exiting,
    entered,
    exited,
    className,
    ...rest
}: TransitionProps): React.ReactElement {
    const [transition, setTransition] = useState(false);
    const [localOpen, setLocalOpen] = useState(active);
    const elementRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    const isInitialMount = useRef(true);
    const close  = useCallback(() => {
        setLocalOpen(false);
    }, []);
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
        elementRef.current?.removeEventListener("transitionend", close);

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
                elementRef.current?.addEventListener("transitionend", close);
            }
        }
        return () => {
            elementRef.current?.removeEventListener("transitionend", close);
        };
    }, [active]);

    return( <div {...rest} className={`${className ?? ""} ${transition ? entering : exiting} ${(localOpen ? entered : exited) ?? ""}`} 
        ref={elementRef}>
        {children}
    </div>);
}
