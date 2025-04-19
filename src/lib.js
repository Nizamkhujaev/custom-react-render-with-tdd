export const jsx = (type, props, ...children) => {
    props = props === null ? {children} : { ...props, children }

    return {
        type,
        props,
    }
}

export const createRoot = (target) => {
    return {
        render (source) {
           render(target, source)
        },
        
        unmount () {}
    }
}

const isValidDomProperty = ([key]) => key !== 'children' && !key.startsWith('on')

const isValidDomEvent = ([key]) => key !== 'children' && key.startsWith('on')

function render(target, source) {
    if (typeof source === 'string') {
        const textNode = document.createTextNode(source)
        target.appendChild(textNode)

        return
    }

    if (typeof source.type === 'string') {
        const element = document.createElement(source.type)
        const propEntries = Object.entries(source.props)
        propEntries.filter(isValidDomProperty).forEach(([key, value]) => {
            element[key] = value
        })

        propEntries.filter(isValidDomEvent).forEach(([key, value]) => {
            element.addEventListener(key.slice('2').toLowerCase(), value)
        })

        target.appendChild(element)
        
        if (source.props.children) {
            render(element, source.props.children)
        }

        return
    }

    if (typeof source.type === 'function') {
        render(target, source.type(source.props))
        
        return
    }

    if (Array.isArray(source)) {
        for (const element of source) {
            render(target, element)
        }

        return
    }
}