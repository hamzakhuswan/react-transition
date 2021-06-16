# Linears React Router
React transition component, that can be used easily with [Tailwindcss](https://tailwindcss.com/) 

# Getting Started

## Install

You can install the package using:

```
npm i @linears/react-transition

# Or using yarn

yarn add @linears/react-transition

```

## API

`Transition` takes 3 required props `entering`, `exiting` and `active` and 2 optional props `exited` and `entered`:
- `entering` includes the CSS classes you require the `children` component to transition **from**.
- `exiting` includes the CSS classes you require the `children` component to transition **to**.
- `active` is boolean (false or true value) for initiating the transition.
- `exited` is CSS classes that will be applied when the transition has eneded.
- `entered` is CSS classes that will be applied when the transition has began.

Here is an example:
```jsx
// main.jsx
import "./main.css"

function Example() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <h1>Example 2</h1>
            <button onClick={() => setOpen(!open)}>Toggle Transition</button>
            <Transition
                active={open}
                entering="opacity-1 transition-fast"
                entered="block"
                exiting="opacity-0 transition-slow"
                exited="hidden"
            >
                <div style={{ background: "#f00" }}>Transition</div>
            </Transition>
        </div>
    );
}
```

```css
// main.css

.opacity-0 {
    opacity: 0;
}
.opacity-1 {
    opacity: 1;
}
.transition-slow {
    transition: transform 2s linear, opacity 2s linear;
}
.transition-fast {
    transition: transform 0.5s linear, opacity 0.5s linear;
}
.block {
    display: block;
}
.hidden {
    display: none;
}
```