import { EventEmitter } from "events";

interface DomElement {

    // ====================
    // COMPONENT PROPERTIES
    // ====================

    /**
     * Detaches the component's root element(s) from the DOM by removing the
     * UI component's DOM elements from its parent node.
     */
    detach(): void;
    /**
     * Moves the UI component's DOM elements into the position before the
     * target DOM element.
     *
     * @param {(string | Node)} targetEl
     * @returns {this}
     */
    insertBefore(targetEl: string | Node): this;
    /**
     * Moves the UI component's DOM elements into the position after the
     * target DOM element.
     *
     * @param {(string | Node)} targetEl
     * @returns {this}
     */
    insertAfter(targetEl: string | Node): this;
    /**
     * Moves the UI component's DOM elements into the position after the
     * target element's last child.
     *
     * @param {(string | Node)} targetEl
     * @returns {this}
     */
    appendTo(targetEl: string | Node): this;
    /**
     * Moves the UI component's DOM elements into the position before the
     * target element's first child.
     *
     * @param {(string | Node)} targetEl
     * @returns {this}
     */
    prependTo(targetEl: string | Node): this;
    /**
     * Replaces the target element with the UI component's DOM elements.
     *
     * @param {(string | Node)} targetEl
     * @returns {this}
     */
    replace(targetEl: string | Node): this;
    /**
     * Replaces the target elements children with the UI component's DOM elements.
     *
     * @param {(string | Node)} targetEl
     * @returns {this}
     */
    replaceChildrenOf(targetEl: string | Node): this;
}

/**
 * Represents a marko component
 *
 * @interface IMarkoComponent
 * @extends {EventEmitter}
 * @template S
 * @template I
 */
interface IMarkoComponent<S, I> extends EventEmitter {
    /**
     * The root HTML element that the component is bound to. If there are
     * multiple roots, this is the first.
     *
     * @type {HTMLElement}
     */
    readonly el: HTMLElement;
    /**
     * An array of the root HTML elements that the component is bound to.
     *
     * @type {HTMLElement[]}
     */
    readonly els: HTMLElement[];
    /**
     * The String ID of the root HTML element that the component is bound to.
     *
     * @type {string}
     */
    readonly id: string;
    /**
     * The current state for the component. Changing this.state or any of
     * its direct properties will result in the component being re-rendered.
     *
     * Only properties that exist when this.state is first defined will be
     * watched for changes. If you don't need a property initially, you can
     * set it to null.
     *
     * @type {S}
     */
    state: S;
    /**
     * The current input for the component. Setting this.input will result
     * in the component being re-rendered. If a $global property is set the
     * out.global will also be updated during the re-render, otherwise the
     * existing $global is used.
     *
     * @type {I}
     */
    input: I;

    // ===========================
    // COMPONENT LIFECYCLE METHODS
    // ===========================

    /**
     * The create event is emitted (and onCreate is called) on component
     * creation, tpically used to set initial state for stateful components
     *
     * @param {I} input - data used to render the component for the first time
     */
    onCreate(input: I): void;
    /**
     * The input event is emitted (and onInput is called) when the component
     * receives input: both the initial input and for any subsequent updates
     * to its input.
     *
     * @param {I} input - data used to render the component for the first time
     */
    onInput(input: I): void;
    /**
     * The render event is emitted (and onRender is called) when the component
     * is about to be rendered (or re-rendered).
     */
    onRender(): void;
    /**
     * The mount event is emitted (and onMount is called) when the component
     * is first mounted to the DOM. For a server-rendered component, this is
     * the first event that is emitted in the browser.
     *
     * This is the first point at which this.el and this.els are defined.
     * onMount is commonly used to attach third-party javascript plugins to
     * the newly-mounted DOM element(s).
     */
    onMount(): void;
    /**
     * The update event is emitted (and onUpdate is called) when the component
     * is called after a component has re-rendered and the DOM has been updated.
     * If a re-render does not cause the DOM to be updated (nothing changed),
     * this event will not be fired.
     */
    onUpdate(): void;
    /**
     * The destroy event is emitted (and onDestroy is called) when the component
     * is about to be unmounted from the DOM and cleaned up. onDestroy should
     * be used to do any additional clean up beyond what Marko handles itself.
     */
    onDestroy(): void;

    // =========================
    // COMPONENT GENERIC METHODS
    // =========================

    /**
     * Returns a nested DOM element by prefixing the provided key with the
     * component's ID. For Marko, nested DOM elements should be assigned an
     * ID using the key custom attribute.
     *
     * @param {string} [key]
     * @param {number} [index]
     * @returns {HTMLElement}
     */
    getEl(key?: string, index?: number): HTMLElement;
    /**
     * Repeated DOM elements must have a value for the key attribute that
     * ends with [] (e.g., key="items[]")
     *
     * @param {string} [key]
     * @returns {HTMLElement[]}
     */
    getEls(key?: string): HTMLElement[];
    /**
     * Similar to getEl, but only returns the String ID of the nested DOM
     * element instead of the actual DOM element.
     *
     * @param {string} key
     * @param {number} [index]
     * @returns {string}
     */
    getElId(key: string, index?: number): string;
    /**
     * Returns a reference to a nested Component for the given key.
     *
     * @param {string} key
     * @param {number} [index]
     * @returns {this}
     */
    getComponent(key: string, index?: number): this;
    /**
     * Returns a reference to an array of repeated Component instances for
     * the given key.
     *
     * @param {string} key
     * @returns {this[]}
     */
    getComponents(key: string): this[];
    /**
     * Immediately, executes any pending updates to the DOM rather than
     * following the normal queued update mechanism for rendering.
     *
     */
    update(): void;
    /**
     * Queue the component to re-render and skip all checks to see if it
     * actually needs it.
     *
     */
    forceUpdate(): void;
    /**
     * Destroys the component by unsubscribing from all listeners made using
     * the subscribeTo method and then detaching the component's root element
     * from the DOM. All nested components (discovered by querying the DOM)
     * are also destroyed.
     *
     * @param {{ removeNode?: boolean; recursive?: boolean }} {}
     */
    destroy({  }: { removeNode?: boolean; recursive?: boolean }): void;
    /**
     * Rerenders the component using its renderer and either supplied input
     * or internal input and state.
     *
     * @param {*} input
     */
    rerender(input: any): void;
    /**
     * Returns true if a component has been destroyed using
     * component.destroy(), otherwise false.
     *
     * @returns {boolean}
     */
    isDestroyed(): boolean;
    /**
     * When a component is destroyed, it is necessary to remove any listeners
     * that were attached by the component in order to prevent a memory leak.
     * By using subscribeTo, Marko will automatically track and remove any
     * listeners you attach when the component is destroyed.
     *
     * @param {(EventEmitter | HTMLElement)} emitter
     */
    subscribeTo(emitter: EventEmitter | HTMLElement): void;
    /**
     * Used to change the value of a single state property. Equivalent to
     * setting this.state[name] = value except it will also work for adding
     * new properties to the component state.
     *
     * @param {string} name
     * @param {*} value
     */
    setState(name: string, value: any): void;
    /**
     * Used to change the value of multiple state properties.
     *
     * @param {object} state
     */
    setState(state: object): void;
    /**
     * Check if state is "dirty"
     */
    isDirty(): void;
    /**
     * Force a state property to be changed even if the value is equal to the
     * old value. This is helpful in cases where a change occurs to a complex
     * object that would not be detected by a shallow compare. Invoking this
     * function completely circumvents all property equality checks (shallow
     * compares) and always rerenders the component.
     *
     * @param {string} name
     * @param {*} [value]
     */
    setStateDirty(name: string, value?: any): void;
    /**
     * Replaces the state with an entirely new state. Equivalent to
     * this.state = newState.
     *
     * @param {*} newState
     */
    replaceState(newState: any): void;
}

// Declaration Merging - Interface
interface MarkoComponent<S, I> extends IMarkoComponent<S, I>, DomElement {}

// Declaration Merging - Class
class MarkoComponent<S = Record<string, any>, I = Record<string, any>> {}

export { MarkoComponent };


