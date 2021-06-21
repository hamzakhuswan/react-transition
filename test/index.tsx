import { Transition } from "@linears/react-transition";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Example1() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <h1>Example 1</h1>
            <button onClick={() => setOpen(!open)}>Toggle Transition</button>
            <Transition
                active={open}
                entering="transform-100 transition-fast"
                exiting="transform-0 transition-slow"
            >
                <div
                    style={{
                        backgroundColor: "#00ff00",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                    }}
                ></div>
            </Transition>
        </div>
    );
}

function Example2() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <h1>Example 2</h1>
            <button onClick={() => setOpen(!open)}>Toggle Transition</button>
            <Transition
                active={open}
                entering="opacity-1 transition-slow"
                entered="block"
                exiting="opacity-0 transition-slow"
                exited="hidden"
                style={{ background: "#f00" }}
            >Transition</Transition>
        </div>
    );
}
function Example3() {
    const uListRef = useRef<HTMLUListElement>(null);
    const [open, setOpen] = useState(false);
    useEffect(()=> {
        if (open) uListRef.current.focus();
    }, [open]);

    return (
        <div>
            <h1>Example 3</h1>
            <button onClick={() => setOpen(!open)}>Toggle Transition</button>
            <Transition
                as="ul"
                tabIndex={-1}
                active={open}
                entering="opacity-1 transition-slow"
                entered="block"
                exiting="opacity-0 transition-slow"
                exited="hidden"
                ref={uListRef}
            >
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
            </Transition>
        </div>
    );
}

function App() {
    return (
        <div>
            <Example1 />
            <Example2 />
            <Example3 />
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
