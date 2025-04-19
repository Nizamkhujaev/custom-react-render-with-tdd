import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot } from "./lib";


describe('tiny react', () => {
    let root;
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    })

    afterEach(() => {
        root.unmount()
        document.body.removeChild(container)
    })

    it('should render a string', () => {
        root.render('Hello')

        expect(document.body.innerHTML).toBe('<div>Hello</div>')
    });

    it('should render an array of strings', () => {
        root.render(['Hello', 'World'])

        expect(document.body.innerHTML).toBe('<div>HelloWorld</div>')
    });

    it('should render a react element', () => {
        root.render(<h1>Hello</h1>)

        expect(document.body.innerHTML).toBe('<div><h1>Hello</h1></div>')
    });

    it('should render a react element with properties', () => {
        root.render(<label htmlFor="name" className="large">Username</label>)

        expect(document.body.innerHTML).toBe('<div><label for="name" class="large">Username</label></div>')
    });

    it('should render a react element with event handlers', () => {
        const handleClick = vi.fn()
        root.render(<button onClick={handleClick}>Hello</button>)

        document.querySelector('button').click()

        expect(handleClick).toHaveBeenCalled()
    });

    it('should render a react element with multiple children', () => {
        root.render(
            <main>
                <h1 id="hello">Hello</h1>
                <h2>World</h2>
            </main>
        )

        expect(document.body.innerHTML).toBe('<div><main><h1 id="hello">Hello</h1><h2>World</h2></main></div>')
    });

    it('should render an array of react elements', () => {
        root.render([<h1>Hello</h1>, <h2>World</h2>])

        expect(document.body.innerHTML).toBe('<div><h1>Hello</h1><h2>World</h2></div>')
    });

    it('should render a react component', () => {
        const Message = ({ text }) => <h1>{text}</h1>
        root.render(<Message text="Hello" />)

        expect(document.body.innerHTML).toBe('<div><h1>Hello</h1></div>')
    });

    it('should render an array of react components', () => {
        const Message = ({ text }) => <h1>{text}</h1>
        root.render([<Message text="Hello" />, <Message text="World" />])

        expect(document.body.innerHTML).toBe('<div><h1>Hello</h1><h1>World</h1></div>')
    });
})