
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.47.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.47.0 */

    function create_fragment$d(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.47.0 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$1, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block$2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.47.0 */
    const file$b = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$b(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$b, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(13, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		ariaCurrent,
    		$location,
    		$base
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('to' in $$props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('isCurrent' in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16512) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 8193) {
    			$$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 8193) {
    			$$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 15361) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$location,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const router_names = {
        home: "",
        report: "report",
        FAQs: "faqs",
        email: "email"
    };

    /*
    Seached on these websites.
    https://www.atg.wa.gov/5-common-e-mail-scams
    https://www.securitymetrics.com/blog/top-10-types-phishing-emails
    https://www.consumerfinance.gov/ask-cfpb/what-are-some-common-types-of-scams-en-2092/
    */

    const scam_types = [
        {
            scam_name:  "Urgent Offer", 
            detail: "Email faking an offer trying to get your info.Example: 'Look at this offer for refinancing!'"
        },
        {
            scam_name:  "Lottery", 
            detail: "Foreign lottery scams are rampant. If you did not enter a lottery, you did not win a lottery. If you did enter the lottery, you still are very unlikely to win, and you would not be notified via e-mail. This is a straightforward scam to get your information."
        },
        {
            scam_name:  "Survey", 
            detail: "These scams rely on people’s desire to weigh in on issues and be heard on the issues of the day. In an election year one flavor is the voting survey, but any hot topic will do: global warming, attitudes towards war, the handling of the latest natural disaster, and so on."
        },
        {
            scam_name:  "Fake Billing", 
            detail: "Email containing a fake bill trying to steal your information and money"
        },
        {
            scam_name:  "Debt Settlement/Relief", 
            detail: "Email promising to settle your debt, only to steal from you."
        },
        {
            scam_name:  "Government", 
            detail: "Someone posing as the government trying to steal your info."
        },
        {
            scam_name:  "PayPal", 
            detail: "Email trying to steal your PayPal information or take money from you using PayPal."
        },
        {
            scam_name:  "Tax", 
            detail: "Email promising money from a fake tax return."
        },
        {
            scam_name:  "Property", 
            detail: "Someone trying to steal your property."
        },
        {
            scam_name:  "Charity", 
            detail: "Thief posing as a real charity or makes up a charity name trying to get money from you."
        },
        {
            scam_name:  "Money Transfer", 
            detail: "Email containing a fake digital money transfer."
        },
        {
            scam_name:  "Expiration Date", 
            detail: "Email saying that something needs to be done before an expiration date."
        },
        {
            scam_name:  "Imposter", 
            detail: "Person claiming to be your friend or relative trying to take your assets."
        },
        {
            scam_name:  "Grandparent Scam", 
            detail: "Person sounding like a relative trying to get money from you."
        },
        {
            scam_name:  "Romance", 
            detail: "Someone faking to be your partner trying to get your assets."
        },
        {
            scam_name:  "Friendly Bank", 
            detail: "Email posing as a legitimate bank trying to steal your info."
        },
        {
            scam_name:  "The 'Official Notice'", 
            detail: "These scams attempt to fool consumers into believing they’ve received an e-mail that requires them to take some action. Often purporting to be from government agencies, these e-mails notify you of a problem. This example was sent in May, a time when people are more likely to believe an announcement is from the IRS.  Here you’re supposed to be relieved that the IRS is acknowledging they received your payment, and then be anxious that there is a problem, and click without thinking."
        },
        {
            scam_name:  "Compromised Account", 
            detail: "Email saying that one of your accounts are vulnerable or compromised."
        },
        {
            scam_name:  "Hidden Url", 
            detail: "Email with a fake or hidden link trying to get your information."
        },
        {
            scam_name:  "Fake Virus", 
            detail: "Email telling you that your computer has a virus when it may not."
        },
        {
            scam_name:  "Other", 
            detail: ""
        },
    ];

    /* src/components/Toast.svelte generated by Svelte v3.47.0 */

    const file$a = "src/components/Toast.svelte";

    // (11:6) {:else}
    function create_else_block$1(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fa-solid fa-circle-exclamation px-2 text-danger");
    			add_location(i, file$a, 11, 8, 406);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(11:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (9:6) {#if success}
    function create_if_block$1(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fa-solid fa-circle-check px-2 text-success");
    			add_location(i, file$a, 9, 6, 325);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(9:6) {#if success}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let strong;
    	let t1;
    	let t2;
    	let button;
    	let div1_id_value;

    	function select_block_type(ctx, dirty) {
    		if (/*success*/ ctx[1]) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			if_block.c();
    			t0 = space();
    			strong = element("strong");
    			t1 = text(/*title*/ ctx[0]);
    			t2 = space();
    			button = element("button");
    			attr_dev(strong, "class", "me-auto");
    			add_location(strong, file$a, 14, 6, 495);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn-close");
    			attr_dev(button, "data-bs-dismiss", "toast");
    			attr_dev(button, "aria-label", "Close");
    			add_location(button, file$a, 16, 6, 584);
    			attr_dev(div0, "class", "toast-header p-3");
    			add_location(div0, file$a, 7, 4, 268);
    			attr_dev(div1, "id", div1_id_value = /*success*/ ctx[1] ? 'liveToastSuccess' : 'liveToast');
    			attr_dev(div1, "class", "toast");
    			attr_dev(div1, "role", "alert");
    			attr_dev(div1, "aria-live", "assertive");
    			attr_dev(div1, "aria-atomic", "true");
    			add_location(div1, file$a, 6, 2, 140);
    			attr_dev(div2, "class", "position-fixed bottom-0 end-0 p-3");
    			set_style(div2, "z-index", "11");
    			add_location(div2, file$a, 5, 0, 70);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			if_block.m(div0, null);
    			append_dev(div0, t0);
    			append_dev(div0, strong);
    			append_dev(strong, t1);
    			append_dev(div0, t2);
    			append_dev(div0, button);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, t0);
    				}
    			}

    			if (dirty & /*title*/ 1) set_data_dev(t1, /*title*/ ctx[0]);

    			if (dirty & /*success*/ 2 && div1_id_value !== (div1_id_value = /*success*/ ctx[1] ? 'liveToastSuccess' : 'liveToast')) {
    				attr_dev(div1, "id", div1_id_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Toast', slots, []);
    	let { title } = $$props;
    	let { success = false } = $$props;
    	const writable_props = ['title', 'success'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Toast> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('success' in $$props) $$invalidate(1, success = $$props.success);
    	};

    	$$self.$capture_state = () => ({ title, success });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('success' in $$props) $$invalidate(1, success = $$props.success);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, success];
    }

    class Toast extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { title: 0, success: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Toast",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<Toast> was created without expected prop 'title'");
    		}
    	}

    	get title() {
    		throw new Error("<Toast>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Toast>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get success() {
    		throw new Error("<Toast>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set success(value) {
    		throw new Error("<Toast>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Header.svelte generated by Svelte v3.47.0 */
    const file$9 = "src/components/Header.svelte";

    // (27:4) <Link class="navbar-brand fs-1 text-decoration-none" to="{router_names.home}" on:click={() => current = router_names.home}>
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Scam Email Finder");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(27:4) <Link class=\\\"navbar-brand fs-1 text-decoration-none\\\" to=\\\"{router_names.home}\\\" on:click={() => current = router_names.home}>",
    		ctx
    	});

    	return block;
    }

    // (37:5) <Link class="nav-link {current === router_names.home ? 'active' : ''}"       to="{router_names.home}" replace="{true}"  state={{search: ''}} on:click={() => current = router_names.home}>
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Home");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(37:5) <Link class=\\\"nav-link {current === router_names.home ? 'active' : ''}\\\"       to=\\\"{router_names.home}\\\" replace=\\\"{true}\\\"  state={{search: ''}} on:click={() => current = router_names.home}>",
    		ctx
    	});

    	return block;
    }

    // (44:6) <Link class="nav-link {current === router_names.report ? 'active' : ''}"        to="{router_names.report}" on:click={() => current = router_names.report}>
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Report");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(44:6) <Link class=\\\"nav-link {current === router_names.report ? 'active' : ''}\\\"        to=\\\"{router_names.report}\\\" on:click={() => current = router_names.report}>",
    		ctx
    	});

    	return block;
    }

    // (49:6) <Link class="nav-link {current === router_names.FAQs ? 'active' : ''}"        to="{router_names.FAQs}" on:click={() => current = router_names.FAQs}>
    function create_default_slot$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("FAQs");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(49:6) <Link class=\\\"nav-link {current === router_names.FAQs ? 'active' : ''}\\\"        to=\\\"{router_names.FAQs}\\\" on:click={() => current = router_names.FAQs}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div3;
    	let nav;
    	let div1;
    	let link0;
    	let t0;
    	let button0;
    	let span;
    	let t1;
    	let div0;
    	let ul;
    	let li0;
    	let link1;
    	let t2;
    	let li1;
    	let link2;
    	let t3;
    	let li2;
    	let link3;
    	let t4;
    	let div2;
    	let form;
    	let input;
    	let t5;
    	let button1;
    	let t7;
    	let toast;
    	let t8;
    	let br;
    	let current;
    	let mounted;
    	let dispose;

    	link0 = new Link({
    			props: {
    				class: "navbar-brand fs-1 text-decoration-none",
    				to: router_names.home,
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link0.$on("click", /*click_handler*/ ctx[3]);

    	link1 = new Link({
    			props: {
    				class: "nav-link " + (/*current*/ ctx[1] === router_names.home ? 'active' : ''),
    				to: router_names.home,
    				replace: true,
    				state: { search: '' },
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1.$on("click", /*click_handler_1*/ ctx[4]);

    	link2 = new Link({
    			props: {
    				class: "nav-link " + (/*current*/ ctx[1] === router_names.report
    				? 'active'
    				: ''),
    				to: router_names.report,
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link2.$on("click", /*click_handler_2*/ ctx[5]);

    	link3 = new Link({
    			props: {
    				class: "nav-link " + (/*current*/ ctx[1] === router_names.FAQs ? 'active' : ''),
    				to: router_names.FAQs,
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link3.$on("click", /*click_handler_3*/ ctx[6]);

    	toast = new Toast({
    			props: {
    				title: "Seach Field Empty",
    				success: false
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			nav = element("nav");
    			div1 = element("div");
    			create_component(link0.$$.fragment);
    			t0 = space();
    			button0 = element("button");
    			span = element("span");
    			t1 = space();
    			div0 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			create_component(link1.$$.fragment);
    			t2 = space();
    			li1 = element("li");
    			create_component(link2.$$.fragment);
    			t3 = space();
    			li2 = element("li");
    			create_component(link3.$$.fragment);
    			t4 = space();
    			div2 = element("div");
    			form = element("form");
    			input = element("input");
    			t5 = space();
    			button1 = element("button");
    			button1.textContent = "Search";
    			t7 = space();
    			create_component(toast.$$.fragment);
    			t8 = space();
    			br = element("br");
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$9, 29, 3, 1010);
    			attr_dev(button0, "class", "navbar-toggler");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "data-bs-toggle", "collapse");
    			attr_dev(button0, "data-bs-target", "#navbarNav");
    			attr_dev(button0, "aria-controls", "navbarNav");
    			attr_dev(button0, "aria-expanded", "false");
    			attr_dev(button0, "aria-label", "Toggle navigation");
    			add_location(button0, file$9, 28, 10, 828);
    			attr_dev(li0, "class", "nav-item");
    			add_location(li0, file$9, 35, 4, 1186);
    			attr_dev(li1, "class", "nav-item");
    			add_location(li1, file$9, 42, 4, 1600);
    			attr_dev(li2, "class", "nav-item d-flex");
    			add_location(li2, file$9, 47, 4, 1817);
    			attr_dev(ul, "class", "navbar-nav mb-2 mb-lg-0");
    			add_location(ul, file$9, 33, 3, 1140);
    			attr_dev(div0, "class", "end-lined collapse navbar-collapse svelte-w7208t");
    			attr_dev(div0, "id", "navbarNav");
    			add_location(div0, file$9, 32, 4, 1073);
    			attr_dev(div1, "class", "container-fluid");
    			add_location(div1, file$9, 25, 2, 634);
    			attr_dev(nav, "class", "navbar navbar-expand-lg navbar-light ");
    			add_location(nav, file$9, 24, 1, 580);
    			attr_dev(input, "class", "form-control me-2");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Search Email");
    			attr_dev(input, "aria-label", "Search");
    			add_location(input, file$9, 59, 4, 2125);
    			attr_dev(button1, "class", "btn btn-outline-success");
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "id", "liveToastBtn");
    			add_location(button1, file$9, 60, 4, 2250);
    			attr_dev(form, "class", "d-flex");
    			add_location(form, file$9, 58, 2, 2099);
    			attr_dev(div2, "class", "container-fluid");
    			add_location(div2, file$9, 57, 3, 2067);
    			add_location(br, file$9, 67, 3, 2471);
    			attr_dev(div3, "class", "header bg-light svelte-w7208t");
    			add_location(div3, file$9, 23, 0, 549);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, nav);
    			append_dev(nav, div1);
    			mount_component(link0, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, button0);
    			append_dev(button0, span);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, ul);
    			append_dev(ul, li0);
    			mount_component(link1, li0, null);
    			append_dev(ul, t2);
    			append_dev(ul, li1);
    			mount_component(link2, li1, null);
    			append_dev(ul, t3);
    			append_dev(ul, li2);
    			mount_component(link3, li2, null);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, form);
    			append_dev(form, input);
    			set_input_value(input, /*search_email*/ ctx[0]);
    			append_dev(form, t5);
    			append_dev(form, button1);
    			append_dev(div3, t7);
    			mount_component(toast, div3, null);
    			append_dev(div3, t8);
    			append_dev(div3, br);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[7]),
    					listen_dev(button1, "click", prevent_default(/*onClick*/ ctx[2]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};
    			if (dirty & /*current*/ 2) link1_changes.class = "nav-link " + (/*current*/ ctx[1] === router_names.home ? 'active' : '');

    			if (dirty & /*$$scope*/ 256) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			const link2_changes = {};

    			if (dirty & /*current*/ 2) link2_changes.class = "nav-link " + (/*current*/ ctx[1] === router_names.report
    			? 'active'
    			: '');

    			if (dirty & /*$$scope*/ 256) {
    				link2_changes.$$scope = { dirty, ctx };
    			}

    			link2.$set(link2_changes);
    			const link3_changes = {};
    			if (dirty & /*current*/ 2) link3_changes.class = "nav-link " + (/*current*/ ctx[1] === router_names.FAQs ? 'active' : '');

    			if (dirty & /*$$scope*/ 256) {
    				link3_changes.$$scope = { dirty, ctx };
    			}

    			link3.$set(link3_changes);

    			if (dirty & /*search_email*/ 1) {
    				set_input_value(input, /*search_email*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(link2.$$.fragment, local);
    			transition_in(link3.$$.fragment, local);
    			transition_in(toast.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(link2.$$.fragment, local);
    			transition_out(link3.$$.fragment, local);
    			transition_out(toast.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(link0);
    			destroy_component(link1);
    			destroy_component(link2);
    			destroy_component(link3);
    			destroy_component(toast);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let { search_email = '' } = $$props;
    	let { current = "" } = $$props;

    	let onClick = () => {
    		if (search_email.trim() === "") {
    			var toastLiveExample = document.getElementById('liveToast');
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
    			return;
    		}

    		if (current !== router_names.home) {
    			navigate("/" + router_names.home, {
    				replace: true,
    				state: { search: search_email }
    			});
    		}
    	};

    	const writable_props = ['search_email', 'current'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(1, current = router_names.home);
    	const click_handler_1 = () => $$invalidate(1, current = router_names.home);
    	const click_handler_2 = () => $$invalidate(1, current = router_names.report);
    	const click_handler_3 = () => $$invalidate(1, current = router_names.FAQs);

    	function input_input_handler() {
    		search_email = this.value;
    		$$invalidate(0, search_email);
    	}

    	$$self.$$set = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    		if ('current' in $$props) $$invalidate(1, current = $$props.current);
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		Link,
    		router_names,
    		Toast,
    		search_email,
    		current,
    		onClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    		if ('current' in $$props) $$invalidate(1, current = $$props.current);
    		if ('onClick' in $$props) $$invalidate(2, onClick = $$props.onClick);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		search_email,
    		current,
    		onClick,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		input_input_handler
    	];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { search_email: 0, current: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get search_email() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set search_email(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get current() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set current(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const data = [
        { id: 1, email: 'fofis15650@arpizol.com', type_of_scam: "Urgent Offer", report_count: "100", first: "2000", comments: "100", commentLog: [{ username: "bob", email: "bobby@gmail.com", date_created: "5/24/2022", comment: "Had similar scam experience" }, { username: "rosa", email: "rosa@gmail.com", date_created: "5/24/2022", comment: "Almost took the offer" }] },
        { id: 2, email: 'Beemsee28@jourrapide.com', type_of_scam: "PayPal", report_count: "30", first: "2010", comments: "100",commentLog: [{ username: "anonymous", email: "unknown", date_created: "5/24/2022", comment: "Hate these kinds of scam" }, { username: "jake", email: "jakey@gmail.com", date_created: "5/24/2022", comment: "Always get scammed in this manner" }]},
        { id: 3, email: 'rnewman@yahoo.ca', type_of_scam: "Fake Billing", report_count: "23", first: "2020", comments: "100",commentLog: [{ username: "Boyle", email: "unknown", date_created: "5/24/2022", comment: "Hate these kinds of scam" }, { username: "holt", email: "captHolt@gmail.com", date_created: "5/24/2022", comment: "Always get scammed in this manner, iykyk" }]},
        { id: 4, email: 'hermanab@outlook.com', type_of_scam: "Fake Virus", report_count: "65", first: "2021", comments: "100",commentLog: [{ username: "Gina", email: "gina@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scam" }, { username: "Terry", email: "terry@gmail.com", date_created: "5/24/2022", comment: "LOL, was about to click on the link" }] },
        { id: 5, email: 'stewwy@gmail.com', type_of_scam: "Romance", report_count: "43", first: "2000", comments: "100",commentLog: [{ username: "Gina", email: "gina@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scam" }, { username: "Terry", email: "terry@gmail.com", date_created: "5/24/2022", comment: "Almost was about to click on the link" }] },
        { id: 6, email: 'cderoove@verizon.net', type_of_scam: "Government", report_count: "1111", first: "2001", comments: "100",commentLog: [{ username: "Croode", email: "croode@yahoo.com", date_created: "5/24/2022", comment: "Always get me with taxes fraud" }, { username: "Terry", email: "terry@gmail.com", date_created: "5/24/2022", comment: "LOL, was about to click on the link" }] },
        { id: 7, email: 'uncled@gmail.com', type_of_scam: "Romance", report_count: "221", first: "2003", comments: "100",commentLog: [{ username: "Hitchcock", email: "scully@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scams" }, { username: "Scully", email: "hitchcock@gmail.com", date_created: "5/24/2022", comment: "My fingers slipped on the  link." }] },
        { id: 8, email: 'trygstad@mac.com', type_of_scam: "Fake Virus", report_count: "1233", first: "2003", comments: "100" ,commentLog: [{ username: "Ross", email: "rrachel@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scams" }, { username: "Rachel", email: "rachel@gmail.com", date_created: "5/24/2022", comment: "I just want a break from these scams" }]},
        { id: 9, email: 'fake@gmail.com', type_of_scam: "Romance", report_count: "23", first: "2012", comments: "100",commentLog: [{ username: "Anonymouse", email: "gina@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scam" }, { username: "Anonymous", email: "terry@gmail.com", date_created: "5/24/2022", comment: "Thank god i saw this" }] },
        { id: 10, email: 'mastinfo@me.com', type_of_scam: "Mystery Shopper", report_count: "1", first: "2015", comments: "100",commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }]},

        { id: 11, email: 'privcan@mac.com', type_of_scam: "Tax", report_count: "432", first: "2012", comments: "100", commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 12, email: 'seurat@sbcglobal.net', type_of_scam: "Hidden URL", report_count: "7777", first: "2017", comments: "100",commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }]},
        { id: 13, email: 'cderoove@verizon.net', type_of_scam: "PayPal", report_count: "67", first: "2021", comments: "100",commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 14, email: 'campbell@me.com', type_of_scam: "Romance", report_count: "865", first: "2020", comments: "100",commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 15, email: 'barjam@aol.com', type_of_scam: "Property", report_count: "55", first: "2010", comments: "100",commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 16, email: 'itstatus@gmail.com', type_of_scam: "Romance", report_count: "5", first: "2006", comments: "100",commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 17, email: 'padme@icloud.com', type_of_scam: "Charity", report_count: "1", first: "2009", comments: "100",commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 18, email: 'intlprog@gmail.com', type_of_scam: "Money Transfer", report_count: "1231", first: "2005", comments: "100",commentLog: [{ username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, { username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
    ];

    /* src/components/TableDatabase.svelte generated by Svelte v3.47.0 */

    const { console: console_1$1 } = globals;
    const file$8 = "src/components/TableDatabase.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	child_ctx[24] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[25] = list[i];
    	child_ctx[24] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[27] = list[i];
    	child_ctx[24] = i;
    	return child_ctx;
    }

    // (66:20) {#if i == sortVal}
    function create_if_block_1(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*sortAsc*/ ctx[2]) return create_if_block_2;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(66:20) {#if i == sortVal}",
    		ctx
    	});

    	return block;
    }

    // (69:24) {:else}
    function create_else_block(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fa-solid fa-arrow-up");
    			add_location(i, file$8, 69, 28, 2585);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(69:24) {:else}",
    		ctx
    	});

    	return block;
    }

    // (67:24) {#if sortAsc}
    function create_if_block_2(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fa-solid fa-arrow-down");
    			add_location(i, file$8, 67, 28, 2486);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(67:24) {#if sortAsc}",
    		ctx
    	});

    	return block;
    }

    // (64:14) {#each column_names as column, i}
    function create_each_block_2(ctx) {
    	let th;
    	let t0_value = /*column*/ ctx[27] + "";
    	let t0;
    	let t1;
    	let t2;
    	let mounted;
    	let dispose;
    	let if_block = /*i*/ ctx[24] == /*sortVal*/ ctx[3] && create_if_block_1(ctx);

    	function click_handler() {
    		return /*click_handler*/ ctx[14](/*i*/ ctx[24]);
    	}

    	const block = {
    		c: function create() {
    			th = element("th");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			attr_dev(th, "class", "" + (null_to_empty(isClickable(/*i*/ ctx[24]) ? "clickable" : "") + " svelte-1uu1v0t"));
    			attr_dev(th, "scope", "col");
    			add_location(th, file$8, 64, 18, 2273);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t0);
    			append_dev(th, t1);
    			if (if_block) if_block.m(th, null);
    			append_dev(th, t2);

    			if (!mounted) {
    				dispose = listen_dev(th, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (/*i*/ ctx[24] == /*sortVal*/ ctx[3]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(th, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(64:14) {#each column_names as column, i}",
    		ctx
    	});

    	return block;
    }

    // (79:12) {#each results as result, i}
    function create_each_block_1$1(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*i*/ ctx[24] + 1 + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*result*/ ctx[25].email + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*result*/ ctx[25].type_of_scam + "";
    	let t4;
    	let t5;
    	let td3;
    	let t6_value = /*result*/ ctx[25].report_count + "";
    	let t6;
    	let t7;
    	let td4;
    	let t8_value = /*result*/ ctx[25].first + "";
    	let t8;
    	let t9;
    	let td5;
    	let t10_value = /*result*/ ctx[25].comments + "";
    	let t10;
    	let t11;
    	let td6;
    	let i_1;
    	let t12;
    	let mounted;
    	let dispose;

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[15](/*result*/ ctx[25]);
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			td4 = element("td");
    			t8 = text(t8_value);
    			t9 = space();
    			td5 = element("td");
    			t10 = text(t10_value);
    			t11 = space();
    			td6 = element("td");
    			i_1 = element("i");
    			t12 = space();
    			add_location(td0, file$8, 80, 20, 2914);
    			add_location(td1, file$8, 81, 20, 2949);
    			add_location(td2, file$8, 82, 20, 2993);
    			add_location(td3, file$8, 83, 20, 3044);
    			add_location(td4, file$8, 84, 20, 3095);
    			add_location(td5, file$8, 85, 20, 3139);
    			attr_dev(i_1, "class", "fa-solid fa-angle-right");
    			add_location(i_1, file$8, 86, 25, 3191);
    			add_location(td6, file$8, 86, 20, 3186);
    			attr_dev(tr, "class", "clickable svelte-1uu1v0t");
    			add_location(tr, file$8, 79, 16, 2830);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, t6);
    			append_dev(tr, t7);
    			append_dev(tr, td4);
    			append_dev(td4, t8);
    			append_dev(tr, t9);
    			append_dev(tr, td5);
    			append_dev(td5, t10);
    			append_dev(tr, t11);
    			append_dev(tr, td6);
    			append_dev(td6, i_1);
    			append_dev(tr, t12);

    			if (!mounted) {
    				dispose = listen_dev(tr, "click", click_handler_1, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*results*/ 32 && t2_value !== (t2_value = /*result*/ ctx[25].email + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*results*/ 32 && t4_value !== (t4_value = /*result*/ ctx[25].type_of_scam + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*results*/ 32 && t6_value !== (t6_value = /*result*/ ctx[25].report_count + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*results*/ 32 && t8_value !== (t8_value = /*result*/ ctx[25].first + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*results*/ 32 && t10_value !== (t10_value = /*result*/ ctx[25].comments + "")) set_data_dev(t10, t10_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(79:12) {#each results as result, i}",
    		ctx
    	});

    	return block;
    }

    // (93:6) {#if results.length === 0}
    function create_if_block(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "No Email Found";
    			attr_dev(h1, "class", "text-center");
    			add_location(h1, file$8, 93, 10, 3355);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(93:6) {#if results.length === 0}",
    		ctx
    	});

    	return block;
    }

    // (103:16) {#each Array((max_page_count)) as _, i}
    function create_each_block$2(ctx) {
    	let li;
    	let span;
    	let t_value = /*i*/ ctx[24] + 1 + "";
    	let t;
    	let li_class_value;
    	let mounted;
    	let dispose;

    	function click_handler_3() {
    		return /*click_handler_3*/ ctx[17](/*i*/ ctx[24]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "page-link svelte-1uu1v0t");
    			add_location(span, file$8, 103, 80, 3895);

    			attr_dev(li, "class", li_class_value = "page-item " + (/*i*/ ctx[24] + 1 == /*current_page*/ ctx[1]
    			? 'active'
    			: ''));

    			add_location(li, file$8, 103, 20, 3835);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, span);
    			append_dev(span, t);

    			if (!mounted) {
    				dispose = listen_dev(span, "click", click_handler_3, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*current_page*/ 2 && li_class_value !== (li_class_value = "page-item " + (/*i*/ ctx[24] + 1 == /*current_page*/ ctx[1]
    			? 'active'
    			: ''))) {
    				attr_dev(li, "class", li_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(103:16) {#each Array((max_page_count)) as _, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div1;
    	let table;
    	let thead;
    	let tr;
    	let t0;
    	let tbody;
    	let t1;
    	let t2;
    	let div0;
    	let nav;
    	let ul;
    	let li0;
    	let span0;
    	let li0_class_value;
    	let t4;
    	let t5;
    	let li1;
    	let span1;
    	let li1_class_value;
    	let t7;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let mounted;
    	let dispose;
    	let each_value_2 = /*column_names*/ ctx[6];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*results*/ ctx[5];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let if_block = /*results*/ ctx[5].length === 0 && create_if_block(ctx);
    	let each_value = Array(/*max_page_count*/ ctx[4]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t0 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			div0 = element("div");
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			span0 = element("span");
    			span0.textContent = "Previous";
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			li1 = element("li");
    			span1 = element("span");
    			span1.textContent = "Next";
    			t7 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "5";
    			option1 = element("option");
    			option1.textContent = "10";
    			option2 = element("option");
    			option2.textContent = "20";
    			add_location(tr, file$8, 62, 10, 2202);
    			add_location(thead, file$8, 61, 8, 2184);
    			add_location(tbody, file$8, 77, 8, 2765);
    			attr_dev(table, "class", "table table-bordered table-hover table-striped");
    			add_location(table, file$8, 60, 4, 2113);
    			attr_dev(span0, "class", "page-link svelte-1uu1v0t");
    			add_location(span0, file$8, 99, 76, 3642);
    			attr_dev(li0, "class", li0_class_value = "page-item " + (/*current_page*/ ctx[1] <= 1 ? 'disabled' : ''));
    			add_location(li0, file$8, 99, 16, 3582);
    			attr_dev(span1, "class", "page-link svelte-1uu1v0t");
    			add_location(span1, file$8, 107, 85, 4108);

    			attr_dev(li1, "class", li1_class_value = "page-item " + (/*current_page*/ ctx[1] >= /*max_page_count*/ ctx[4]
    			? 'disabled'
    			: ''));

    			add_location(li1, file$8, 107, 12, 4035);
    			attr_dev(ul, "class", "pagination pagination-sm");
    			add_location(ul, file$8, 98, 12, 3528);
    			attr_dev(nav, "aria-label", "Page navigation example");
    			add_location(nav, file$8, 97, 8, 3473);
    			option0.selected = true;
    			option0.__value = 5;
    			option0.value = option0.__value;
    			add_location(option0, file$8, 113, 12, 4380);
    			option1.__value = 10;
    			option1.value = option1.__value;
    			add_location(option1, file$8, 114, 12, 4430);
    			option2.__value = 20;
    			option2.value = option2.__value;
    			add_location(option2, file$8, 115, 12, 4473);
    			attr_dev(select, "class", "form-select svelte-1uu1v0t");
    			attr_dev(select, "aria-label", "Default select example");
    			if (/*shown_rows*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[19].call(select));
    			add_location(select, file$8, 112, 8, 4239);
    			attr_dev(div0, "class", "d-flex justify-content-between");
    			add_location(div0, file$8, 96, 6, 3420);
    			attr_dev(div1, "class", "body svelte-1uu1v0t");
    			add_location(div1, file$8, 59, 0, 2090);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(tr, null);
    			}

    			append_dev(table, t0);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tbody, null);
    			}

    			append_dev(div1, t1);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, nav);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, span0);
    			append_dev(ul, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(li1, span1);
    			append_dev(div0, t7);
    			append_dev(div0, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			select_option(select, /*shown_rows*/ ctx[0]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span0, "click", /*click_handler_2*/ ctx[16], false, false, false),
    					listen_dev(span1, "click", /*click_handler_4*/ ctx[18], false, false, false),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[19]),
    					listen_dev(select, "change", /*change_handler*/ ctx[20], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*isClickable, onClickColumNames, sortAsc, sortVal, column_names*/ 204) {
    				each_value_2 = /*column_names*/ ctx[6];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty & /*onClickEmail, results*/ 2080) {
    				each_value_1 = /*results*/ ctx[5];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tbody, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (/*results*/ ctx[5].length === 0) {
    				if (if_block) ; else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div1, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*current_page*/ 2 && li0_class_value !== (li0_class_value = "page-item " + (/*current_page*/ ctx[1] <= 1 ? 'disabled' : ''))) {
    				attr_dev(li0, "class", li0_class_value);
    			}

    			if (dirty & /*current_page, clickedOnPage, max_page_count*/ 1042) {
    				each_value = Array(/*max_page_count*/ ctx[4]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, t5);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*current_page, max_page_count*/ 18 && li1_class_value !== (li1_class_value = "page-item " + (/*current_page*/ ctx[1] >= /*max_page_count*/ ctx[4]
    			? 'disabled'
    			: ''))) {
    				attr_dev(li1, "class", li1_class_value);
    			}

    			if (dirty & /*shown_rows*/ 1) {
    				select_option(select, /*shown_rows*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const reportsIndex = 3;
    const firstIndex = 4;
    const commentsIndex = 5;

    function isClickable(i) {
    	return i >= reportsIndex && i <= commentsIndex;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let current_page;
    	let max_page_count;
    	let filtered_data;
    	let results;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableDatabase', slots, []);
    	let shown_rows = 10;
    	let { search_email = '' } = $$props;

    	const column_names = [
    		"#",
    		"Email",
    		"Type of Scam",
    		"Number of Reports",
    		"First Occurance",
    		"Comments",
    		""
    	];

    	let sortAsc = false;
    	let sortVal = reportsIndex;

    	function sort(a, b) {
    		if (sortVal == reportsIndex) {
    			// report_count
    			return sortAsc
    			? a.report_count - b.report_count
    			: b.report_count - a.report_count;
    		} else if (sortVal == firstIndex) {
    			// first
    			return sortAsc ? a.first - b.first : b.first - a.first;
    		} else {
    			// comments
    			return sortAsc
    			? a.comments - b.comments
    			: b.comments - a.comments;
    		}
    	}

    	function onClickColumNames(index) {
    		if (index < reportsIndex || index > commentsIndex) return;
    		if (index == sortVal) $$invalidate(2, sortAsc = !sortAsc);
    		$$invalidate(3, sortVal = index);
    		$$invalidate(13, filtered_data = filtered_data.sort(sort));
    	}

    	function clickedPrevious() {
    		if (current_page == 1) return;
    		$$invalidate(1, current_page -= 1);
    	}

    	function clickedNext() {
    		if (current_page == max_page_count) return;
    		$$invalidate(1, current_page += 1);
    	}

    	function clickedOnPage(page_number) {
    		if (page_number < 1 || page_number > max_page_count) return;
    		$$invalidate(1, current_page = page_number);
    	}

    	function onClickEmail(id) {
    		console.log(id);
    		navigate("/" + router_names.email + "/" + id, { replace: false, state: { id } });
    	}

    	const writable_props = ['search_email'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<TableDatabase> was created with unknown prop '${key}'`);
    	});

    	const click_handler = i => onClickColumNames(i);
    	const click_handler_1 = result => onClickEmail(result.id);
    	const click_handler_2 = () => clickedPrevious();
    	const click_handler_3 = i => clickedOnPage(i + 1);
    	const click_handler_4 = () => clickedNext();

    	function select_change_handler() {
    		shown_rows = select_value(this);
    		$$invalidate(0, shown_rows);
    	}

    	const change_handler = () => {
    		$$invalidate(1, current_page = 1);
    	};

    	$$self.$$set = $$props => {
    		if ('search_email' in $$props) $$invalidate(12, search_email = $$props.search_email);
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		Link,
    		data,
    		router_names,
    		shown_rows,
    		search_email,
    		column_names,
    		reportsIndex,
    		firstIndex,
    		commentsIndex,
    		sortAsc,
    		sortVal,
    		sort,
    		onClickColumNames,
    		clickedPrevious,
    		clickedNext,
    		clickedOnPage,
    		onClickEmail,
    		isClickable,
    		current_page,
    		max_page_count,
    		filtered_data,
    		results
    	});

    	$$self.$inject_state = $$props => {
    		if ('shown_rows' in $$props) $$invalidate(0, shown_rows = $$props.shown_rows);
    		if ('search_email' in $$props) $$invalidate(12, search_email = $$props.search_email);
    		if ('sortAsc' in $$props) $$invalidate(2, sortAsc = $$props.sortAsc);
    		if ('sortVal' in $$props) $$invalidate(3, sortVal = $$props.sortVal);
    		if ('current_page' in $$props) $$invalidate(1, current_page = $$props.current_page);
    		if ('max_page_count' in $$props) $$invalidate(4, max_page_count = $$props.max_page_count);
    		if ('filtered_data' in $$props) $$invalidate(13, filtered_data = $$props.filtered_data);
    		if ('results' in $$props) $$invalidate(5, results = $$props.results);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*search_email*/ 4096) {
    			$$invalidate(1, current_page = search_email.trim() === '' ? 1 : 1);
    		}

    		if ($$self.$$.dirty & /*search_email*/ 4096) {
    			$$invalidate(13, filtered_data = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase())).sort(sort));
    		}

    		if ($$self.$$.dirty & /*filtered_data, shown_rows*/ 8193) {
    			$$invalidate(4, max_page_count = Math.ceil(filtered_data.length / shown_rows));
    		}

    		if ($$self.$$.dirty & /*filtered_data, current_page, shown_rows*/ 8195) {
    			$$invalidate(5, results = filtered_data.slice((current_page - 1) * shown_rows, current_page * shown_rows));
    		}
    	};

    	return [
    		shown_rows,
    		current_page,
    		sortAsc,
    		sortVal,
    		max_page_count,
    		results,
    		column_names,
    		onClickColumNames,
    		clickedPrevious,
    		clickedNext,
    		clickedOnPage,
    		onClickEmail,
    		search_email,
    		filtered_data,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		select_change_handler,
    		change_handler
    	];
    }

    class TableDatabase extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { search_email: 12 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableDatabase",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get search_email() {
    		throw new Error("<TableDatabase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set search_email(value) {
    		throw new Error("<TableDatabase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Home.svelte generated by Svelte v3.47.0 */
    const file$7 = "src/Home.svelte";

    function create_fragment$7(ctx) {
    	let main;
    	let header;
    	let updating_search_email;
    	let t;
    	let tabledatabase;
    	let updating_search_email_1;
    	let current;

    	function header_search_email_binding(value) {
    		/*header_search_email_binding*/ ctx[1](value);
    	}

    	let header_props = {};

    	if (/*search_email*/ ctx[0] !== void 0) {
    		header_props.search_email = /*search_email*/ ctx[0];
    	}

    	header = new Header({ props: header_props, $$inline: true });
    	binding_callbacks.push(() => bind(header, 'search_email', header_search_email_binding));

    	function tabledatabase_search_email_binding(value) {
    		/*tabledatabase_search_email_binding*/ ctx[2](value);
    	}

    	let tabledatabase_props = {};

    	if (/*search_email*/ ctx[0] !== void 0) {
    		tabledatabase_props.search_email = /*search_email*/ ctx[0];
    	}

    	tabledatabase = new TableDatabase({
    			props: tabledatabase_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(tabledatabase, 'search_email', tabledatabase_search_email_binding));

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t = space();
    			create_component(tabledatabase.$$.fragment);
    			attr_dev(main, "class", "");
    			add_location(main, file$7, 14, 0, 324);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t);
    			mount_component(tabledatabase, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const header_changes = {};

    			if (!updating_search_email && dirty & /*search_email*/ 1) {
    				updating_search_email = true;
    				header_changes.search_email = /*search_email*/ ctx[0];
    				add_flush_callback(() => updating_search_email = false);
    			}

    			header.$set(header_changes);
    			const tabledatabase_changes = {};

    			if (!updating_search_email_1 && dirty & /*search_email*/ 1) {
    				updating_search_email_1 = true;
    				tabledatabase_changes.search_email = /*search_email*/ ctx[0];
    				add_flush_callback(() => updating_search_email_1 = false);
    			}

    			tabledatabase.$set(tabledatabase_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(tabledatabase.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(tabledatabase.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_component(tabledatabase);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let { search_email = '' } = $$props;

    	onMount(async () => {
    		if (history.state) {
    			$$invalidate(0, search_email = history.state.search ? history.state.search : '');
    		}
    	});

    	const writable_props = ['search_email'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	function header_search_email_binding(value) {
    		search_email = value;
    		$$invalidate(0, search_email);
    	}

    	function tabledatabase_search_email_binding(value) {
    		search_email = value;
    		$$invalidate(0, search_email);
    	}

    	$$self.$$set = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		Header,
    		TableDataBase: TableDatabase,
    		search_email
    	});

    	$$self.$inject_state = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [search_email, header_search_email_binding, tabledatabase_search_email_binding];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { search_email: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get search_email() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set search_email(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Ticket.svelte generated by Svelte v3.47.0 */
    const file$6 = "src/components/Ticket.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i].scam_name;
    	child_ctx[12] = i;
    	return child_ctx;
    }

    // (95:20) {#each scam_types as { scam_name }
    function create_each_block$1(ctx) {
    	let option;
    	let t_value = /*scam_name*/ ctx[10] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*i*/ ctx[12];
    			option.value = option.__value;
    			add_location(option, file$6, 95, 24, 3387);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(95:20) {#each scam_types as { scam_name }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div9;
    	let h1;
    	let t1;
    	let form;
    	let p0;
    	let t3;
    	let div0;
    	let t4;
    	let input0;
    	let t5;
    	let div1;
    	let t6_value = /*errors*/ ctx[1].nameVar + "";
    	let t6;
    	let t7;
    	let div2;
    	let t8;
    	let input1;
    	let t9;
    	let div3;
    	let t10_value = /*errors*/ ctx[1].email + "";
    	let t10;
    	let t11;
    	let p1;
    	let t13;
    	let div4;
    	let t14;
    	let input2;
    	let t15;
    	let div5;
    	let t16_value = /*errors*/ ctx[1].scam_email + "";
    	let t16;
    	let t17;
    	let div7;
    	let t18;
    	let div6;
    	let select;
    	let option;
    	let t20;
    	let div8;
    	let t21_value = /*errors*/ ctx[1].type_of_scam + "";
    	let t21;
    	let t22;
    	let button;
    	let t24;
    	let toast;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = scam_types;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	toast = new Toast({
    			props: {
    				title: "Scam Email Submitted",
    				success: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div9 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Scam Email Ticket";
    			t1 = space();
    			form = element("form");
    			p0 = element("p");
    			p0.textContent = "Your Information";
    			t3 = space();
    			div0 = element("div");
    			t4 = text("Name:\n            ");
    			input0 = element("input");
    			t5 = space();
    			div1 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div2 = element("div");
    			t8 = text("Email:\n            ");
    			input1 = element("input");
    			t9 = space();
    			div3 = element("div");
    			t10 = text(t10_value);
    			t11 = space();
    			p1 = element("p");
    			p1.textContent = "Scam Information:";
    			t13 = space();
    			div4 = element("div");
    			t14 = text("Scam Email:\n            ");
    			input2 = element("input");
    			t15 = space();
    			div5 = element("div");
    			t16 = text(t16_value);
    			t17 = space();
    			div7 = element("div");
    			t18 = text("Scam type:\n            ");
    			div6 = element("div");
    			select = element("select");
    			option = element("option");
    			option.textContent = "Pick the type of scam";

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t20 = space();
    			div8 = element("div");
    			t21 = text(t21_value);
    			t22 = space();
    			button = element("button");
    			button.textContent = "Send";
    			t24 = space();
    			create_component(toast.$$.fragment);
    			attr_dev(h1, "id", "header");
    			attr_dev(h1, "class", "svelte-u6k1wt");
    			add_location(h1, file$6, 74, 4, 2306);
    			attr_dev(p0, "id", "info");
    			attr_dev(p0, "class", "svelte-u6k1wt");
    			add_location(p0, file$6, 76, 8, 2421);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", "name-input");
    			attr_dev(input0, "class", "svelte-u6k1wt");
    			add_location(input0, file$6, 78, 12, 2496);
    			attr_dev(div0, "id", "name");
    			attr_dev(div0, "class", "svelte-u6k1wt");
    			add_location(div0, file$6, 77, 8, 2463);
    			attr_dev(div1, "class", "error svelte-u6k1wt");
    			add_location(div1, file$6, 80, 8, 2583);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "id", "email-input");
    			attr_dev(input1, "class", "svelte-u6k1wt");
    			add_location(input1, file$6, 82, 12, 2670);
    			attr_dev(div2, "id", "email");
    			attr_dev(div2, "class", "svelte-u6k1wt");
    			add_location(div2, file$6, 81, 8, 2635);
    			attr_dev(div3, "class", "error svelte-u6k1wt");
    			add_location(div3, file$6, 84, 8, 2756);
    			attr_dev(p1, "id", "scam-info");
    			attr_dev(p1, "class", "svelte-u6k1wt");
    			add_location(p1, file$6, 85, 8, 2806);
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "id", "scam-email-input");
    			attr_dev(input2, "class", "svelte-u6k1wt");
    			add_location(input2, file$6, 87, 12, 2899);
    			attr_dev(div4, "id", "scam-email");
    			attr_dev(div4, "class", "svelte-u6k1wt");
    			add_location(div4, file$6, 86, 8, 2854);
    			attr_dev(div5, "class", "error svelte-u6k1wt");
    			add_location(div5, file$6, 89, 8, 2995);
    			option.selected = true;
    			option.__value = "Pick the type of scam";
    			option.value = option.__value;
    			add_location(option, file$6, 93, 20, 3256);
    			attr_dev(select, "class", "select-picker svelte-u6k1wt");
    			attr_dev(select, "aria-label", "Default select example");
    			if (/*fields*/ ctx[0].type_of_scam === void 0) add_render_callback(() => /*select_change_handler*/ ctx[6].call(select));
    			add_location(select, file$6, 92, 16, 3136);
    			attr_dev(div6, "id", "type-container");
    			attr_dev(div6, "class", "svelte-u6k1wt");
    			add_location(div6, file$6, 91, 12, 3094);
    			attr_dev(div7, "id", "scam-type");
    			attr_dev(div7, "class", "svelte-u6k1wt");
    			add_location(div7, file$6, 90, 8, 3050);
    			attr_dev(div8, "class", "error svelte-u6k1wt");
    			add_location(div8, file$6, 100, 8, 3524);
    			attr_dev(button, "class", "btn btn-success svelte-u6k1wt");
    			attr_dev(button, "type", "submit");
    			add_location(button, file$6, 101, 8, 3581);
    			attr_dev(form, "id", "input-area");
    			attr_dev(form, "class", "svelte-u6k1wt");
    			add_location(form, file$6, 75, 4, 2349);
    			attr_dev(div9, "class", "body svelte-u6k1wt");
    			add_location(div9, file$6, 73, 0, 2283);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div9, anchor);
    			append_dev(div9, h1);
    			append_dev(div9, t1);
    			append_dev(div9, form);
    			append_dev(form, p0);
    			append_dev(form, t3);
    			append_dev(form, div0);
    			append_dev(div0, t4);
    			append_dev(div0, input0);
    			set_input_value(input0, /*fields*/ ctx[0].nameVar);
    			append_dev(form, t5);
    			append_dev(form, div1);
    			append_dev(div1, t6);
    			append_dev(form, t7);
    			append_dev(form, div2);
    			append_dev(div2, t8);
    			append_dev(div2, input1);
    			set_input_value(input1, /*fields*/ ctx[0].email);
    			append_dev(form, t9);
    			append_dev(form, div3);
    			append_dev(div3, t10);
    			append_dev(form, t11);
    			append_dev(form, p1);
    			append_dev(form, t13);
    			append_dev(form, div4);
    			append_dev(div4, t14);
    			append_dev(div4, input2);
    			set_input_value(input2, /*fields*/ ctx[0].scam_email);
    			append_dev(form, t15);
    			append_dev(form, div5);
    			append_dev(div5, t16);
    			append_dev(form, t17);
    			append_dev(form, div7);
    			append_dev(div7, t18);
    			append_dev(div7, div6);
    			append_dev(div6, select);
    			append_dev(select, option);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*fields*/ ctx[0].type_of_scam);
    			append_dev(form, t20);
    			append_dev(form, div8);
    			append_dev(div8, t21);
    			append_dev(form, t22);
    			append_dev(form, button);
    			append_dev(div9, t24);
    			mount_component(toast, div9, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[3]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[4]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[5]),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[6]),
    					listen_dev(form, "submit", prevent_default(/*submitHandler*/ ctx[2]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*fields*/ 1 && input0.value !== /*fields*/ ctx[0].nameVar) {
    				set_input_value(input0, /*fields*/ ctx[0].nameVar);
    			}

    			if ((!current || dirty & /*errors*/ 2) && t6_value !== (t6_value = /*errors*/ ctx[1].nameVar + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*fields*/ 1 && input1.value !== /*fields*/ ctx[0].email) {
    				set_input_value(input1, /*fields*/ ctx[0].email);
    			}

    			if ((!current || dirty & /*errors*/ 2) && t10_value !== (t10_value = /*errors*/ ctx[1].email + "")) set_data_dev(t10, t10_value);

    			if (dirty & /*fields*/ 1 && input2.value !== /*fields*/ ctx[0].scam_email) {
    				set_input_value(input2, /*fields*/ ctx[0].scam_email);
    			}

    			if ((!current || dirty & /*errors*/ 2) && t16_value !== (t16_value = /*errors*/ ctx[1].scam_email + "")) set_data_dev(t16, t16_value);

    			if (dirty & /*scam_types*/ 0) {
    				each_value = scam_types;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*fields*/ 1) {
    				select_option(select, /*fields*/ ctx[0].type_of_scam);
    			}

    			if ((!current || dirty & /*errors*/ 2) && t21_value !== (t21_value = /*errors*/ ctx[1].type_of_scam + "")) set_data_dev(t21, t21_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(toast.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(toast.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div9);
    			destroy_each(each_blocks, detaching);
    			destroy_component(toast);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Ticket', slots, []);

    	let fields = {
    		nameVar: '',
    		email: '',
    		scam_email: '',
    		type_of_scam: '',
    		info: ''
    	};

    	let errors = {
    		nameVar: '',
    		email: '',
    		scam_email: '',
    		type_of_scam: '',
    		info: ''
    	};

    	let valid = false;

    	//Reminder to edit button
    	const submitHandler = () => {
    		valid = true;

    		//Name field
    		if (fields.nameVar.trim().length == 0) {
    			valid = false;
    			$$invalidate(1, errors.nameVar = 'Name cannot be empty!', errors);
    		} else {
    			$$invalidate(1, errors.nameVar = '', errors);
    		}

    		//Email field
    		if (fields.email.trim().length < 4) {
    			valid = false;
    			$$invalidate(1, errors.email = 'Email must be at least 4 characters long!', errors);
    		} else {
    			$$invalidate(1, errors.email = '', errors);
    		}

    		//Scam email field
    		if (fields.scam_email.trim().length < 4) {
    			valid = false;
    			$$invalidate(1, errors.scam_email = 'Scam email must be at least 4 characters long!', errors);
    		} else {
    			$$invalidate(1, errors.scam_email = '', errors);
    		}

    		//Type of scam field
    		if (fields.type_of_scam.length == 0) {
    			valid = false;
    			$$invalidate(1, errors.type_of_scam = 'You must select a type of scam!', errors);
    		} else {
    			$$invalidate(1, errors.type_of_scam = '', errors);
    		}

    		if (valid) {
    			submitFields();
    		}
    	};

    	function submitFields() {
    		for (let i = 0; i < data.length; i++) {
    			//If the scam email is already reported
    			if (fields.scam_email == data[i].email && scam_types[fields.type_of_scam].scam_name == data[i].type_of_scam) {
    				data[i].report_count++;
    				return;
    			}
    		}

    		//If the scam email is not reported
    		const newData = {
    			id: data.length + 1,
    			email: fields.scam_email,
    			type_of_scam: scam_types[fields.type_of_scam].scam_name,
    			report_count: "1",
    			first: "2022",
    			comments: "0"
    		};

    		data.push(newData);
    		var toastLiveExample = document.getElementById('liveToastSuccess');
    		var toast = new bootstrap.Toast(toastLiveExample);
    		toast.show();

    		$$invalidate(0, fields = {
    			nameVar: '',
    			email: '',
    			scam_email: '',
    			type_of_scam: '',
    			info: ''
    		});
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Ticket> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		fields.nameVar = this.value;
    		$$invalidate(0, fields);
    	}

    	function input1_input_handler() {
    		fields.email = this.value;
    		$$invalidate(0, fields);
    	}

    	function input2_input_handler() {
    		fields.scam_email = this.value;
    		$$invalidate(0, fields);
    	}

    	function select_change_handler() {
    		fields.type_of_scam = select_value(this);
    		$$invalidate(0, fields);
    	}

    	$$self.$capture_state = () => ({
    		data,
    		scam_types,
    		Toast,
    		fields,
    		errors,
    		valid,
    		submitHandler,
    		submitFields
    	});

    	$$self.$inject_state = $$props => {
    		if ('fields' in $$props) $$invalidate(0, fields = $$props.fields);
    		if ('errors' in $$props) $$invalidate(1, errors = $$props.errors);
    		if ('valid' in $$props) valid = $$props.valid;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		fields,
    		errors,
    		submitHandler,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		select_change_handler
    	];
    }

    class Ticket extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ticket",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Report.svelte generated by Svelte v3.47.0 */
    const file$5 = "src/Report.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let header;
    	let t;
    	let ticket;
    	let current;

    	header = new Header({
    			props: { current: router_names.report },
    			$$inline: true
    		});

    	ticket = new Ticket({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(header.$$.fragment);
    			t = space();
    			create_component(ticket.$$.fragment);
    			add_location(div, file$5, 6, 0, 163);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(header, div, null);
    			append_dev(div, t);
    			mount_component(ticket, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(ticket.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(ticket.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(header);
    			destroy_component(ticket);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Report', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Report> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ router_names, Header, Ticket });
    	return [];
    }

    class Report extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Report",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/FAQs.svelte generated by Svelte v3.47.0 */
    const file$4 = "src/FAQs.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let header;
    	let t0;
    	let h1;
    	let current;

    	header = new Header({
    			props: { current: router_names.FAQs },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(header.$$.fragment);
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "FAQs";
    			add_location(h1, file$4, 7, 1, 163);
    			add_location(div, file$4, 5, 0, 113);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(header, div, null);
    			append_dev(div, t0);
    			append_dev(div, h1);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FAQs', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FAQs> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ router_names, Header });
    	return [];
    }

    class FAQs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FAQs",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/Emails.svelte generated by Svelte v3.47.0 */
    const file$3 = "src/components/Emails.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (67:8) {#each column_names as column}
    function create_each_block_1(ctx) {
    	let td;
    	let t0_value = /*column*/ ctx[14] + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			td = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(td, "class", "svelte-1y1ssr2");
    			add_location(td, file$3, 67, 10, 1623);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);
    			append_dev(td, t0);
    			append_dev(td, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(67:8) {#each column_names as column}",
    		ctx
    	});

    	return block;
    }

    // (78:8) <Link           class="navbar-brand fs-1 text-decoration-none"           to={router_names.report}         >
    function create_default_slot$2(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "+ Report";
    			attr_dev(button, "class", "btn btn-success svelte-1y1ssr2");
    			attr_dev(button, "type", "submit");
    			add_location(button, file$3, 81, 10, 1987);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(78:8) <Link           class=\\\"navbar-brand fs-1 text-decoration-none\\\"           to={router_names.report}         >",
    		ctx
    	});

    	return block;
    }

    // (90:2) {#each commentData as comment}
    function create_each_block(ctx) {
    	let span;
    	let t0_value = /*comment*/ ctx[11].username + "";
    	let t0;
    	let t1;
    	let div;
    	let t2_value = /*comment*/ ctx[11].comment + "";
    	let t2;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			div = element("div");
    			t2 = text(t2_value);
    			attr_dev(span, "class", "username");
    			add_location(span, file$3, 90, 4, 2184);
    			attr_dev(div, "class", "comments");
    			add_location(div, file$3, 91, 4, 2237);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*commentData*/ 2 && t0_value !== (t0_value = /*comment*/ ctx[11].username + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*commentData*/ 2 && t2_value !== (t2_value = /*comment*/ ctx[11].comment + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(90:2) {#each commentData as comment}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div6;
    	let table;
    	let thead;
    	let tr0;
    	let t0;
    	let tbody;
    	let tr1;
    	let th0;
    	let t1_value = /*emailData*/ ctx[0].email + "";
    	let t1;
    	let t2;
    	let th1;
    	let t3_value = /*emailData*/ ctx[0].type_of_scam + "";
    	let t3;
    	let t4;
    	let th2;
    	let t5_value = /*emailData*/ ctx[0].report_count + "";
    	let t5;
    	let t6;
    	let th3;
    	let t7_value = /*emailData*/ ctx[0].first + "";
    	let t7;
    	let t8;
    	let link;
    	let t9;
    	let h1;
    	let t11;
    	let t12;
    	let div5;
    	let form;
    	let button;
    	let t14;
    	let div0;
    	let t15;
    	let input0;
    	let t16;
    	let div1;
    	let t17_value = /*errors*/ ctx[3].email + "";
    	let t17;
    	let t18;
    	let div2;
    	let t19;
    	let input1;
    	let t20;
    	let div3;
    	let t21_value = /*errors*/ ctx[3].username + "";
    	let t21;
    	let t22;
    	let input2;
    	let t23;
    	let div4;
    	let t24_value = /*errors*/ ctx[3].comment + "";
    	let t24;
    	let t25;
    	let toast;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*column_names*/ ctx[4];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	link = new Link({
    			props: {
    				class: "navbar-brand fs-1 text-decoration-none",
    				to: router_names.report,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*commentData*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	toast = new Toast({
    			props: { title: "Comment Added", success: true },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr0 = element("tr");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t0 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			th0 = element("th");
    			t1 = text(t1_value);
    			t2 = space();
    			th1 = element("th");
    			t3 = text(t3_value);
    			t4 = space();
    			th2 = element("th");
    			t5 = text(t5_value);
    			t6 = space();
    			th3 = element("th");
    			t7 = text(t7_value);
    			t8 = space();
    			create_component(link.$$.fragment);
    			t9 = space();
    			h1 = element("h1");
    			h1.textContent = "Comments";
    			t11 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t12 = space();
    			div5 = element("div");
    			form = element("form");
    			button = element("button");
    			button.textContent = "Add a comment";
    			t14 = space();
    			div0 = element("div");
    			t15 = text("Email:\n        ");
    			input0 = element("input");
    			t16 = space();
    			div1 = element("div");
    			t17 = text(t17_value);
    			t18 = space();
    			div2 = element("div");
    			t19 = text("Username:\n        ");
    			input1 = element("input");
    			t20 = space();
    			div3 = element("div");
    			t21 = text(t21_value);
    			t22 = space();
    			input2 = element("input");
    			t23 = space();
    			div4 = element("div");
    			t24 = text(t24_value);
    			t25 = space();
    			create_component(toast.$$.fragment);
    			add_location(tr0, file$3, 65, 6, 1569);
    			add_location(thead, file$3, 64, 4, 1555);
    			attr_dev(th0, "class", "svelte-1y1ssr2");
    			add_location(th0, file$3, 73, 8, 1715);
    			attr_dev(th1, "class", "svelte-1y1ssr2");
    			add_location(th1, file$3, 74, 8, 1750);
    			attr_dev(th2, "class", "svelte-1y1ssr2");
    			add_location(th2, file$3, 75, 8, 1792);
    			attr_dev(th3, "class", "svelte-1y1ssr2");
    			add_location(th3, file$3, 76, 8, 1834);
    			add_location(tr1, file$3, 72, 6, 1702);
    			add_location(tbody, file$3, 71, 4, 1688);
    			attr_dev(table, "class", "table table-borderless svelte-1y1ssr2");
    			add_location(table, file$3, 63, 2, 1512);
    			attr_dev(h1, "class", "svelte-1y1ssr2");
    			add_location(h1, file$3, 88, 2, 2129);
    			attr_dev(button, "class", "btn btn-success svelte-1y1ssr2");
    			attr_dev(button, "type", "submit");
    			add_location(button, file$3, 95, 6, 2390);
    			attr_dev(input0, "class", "input");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", "email-input");
    			add_location(input0, file$3, 98, 8, 2505);
    			attr_dev(div0, "id", "email");
    			add_location(div0, file$3, 96, 6, 2465);
    			attr_dev(div1, "class", "error");
    			add_location(div1, file$3, 105, 6, 2651);
    			attr_dev(input1, "class", "input");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "id", "username-input");
    			add_location(input1, file$3, 108, 8, 2743);
    			attr_dev(div2, "id", "username");
    			add_location(div2, file$3, 106, 6, 2697);
    			attr_dev(div3, "class", "error");
    			add_location(div3, file$3, 115, 6, 2895);
    			attr_dev(input2, "class", "comment-input");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "id", "comment-input");
    			add_location(input2, file$3, 116, 6, 2944);
    			attr_dev(div4, "class", "error");
    			add_location(div4, file$3, 122, 6, 3079);
    			attr_dev(form, "id", "input-area");
    			add_location(form, file$3, 94, 4, 2320);
    			attr_dev(div5, "class", "form");
    			add_location(div5, file$3, 93, 2, 2297);
    			attr_dev(div6, "class", "body svelte-1y1ssr2");
    			add_location(div6, file$3, 62, 0, 1491);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, table);
    			append_dev(table, thead);
    			append_dev(thead, tr0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tr0, null);
    			}

    			append_dev(table, t0);
    			append_dev(table, tbody);
    			append_dev(tbody, tr1);
    			append_dev(tr1, th0);
    			append_dev(th0, t1);
    			append_dev(tr1, t2);
    			append_dev(tr1, th1);
    			append_dev(th1, t3);
    			append_dev(tr1, t4);
    			append_dev(tr1, th2);
    			append_dev(th2, t5);
    			append_dev(tr1, t6);
    			append_dev(tr1, th3);
    			append_dev(th3, t7);
    			append_dev(tr1, t8);
    			mount_component(link, tr1, null);
    			append_dev(div6, t9);
    			append_dev(div6, h1);
    			append_dev(div6, t11);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div6, null);
    			}

    			append_dev(div6, t12);
    			append_dev(div6, div5);
    			append_dev(div5, form);
    			append_dev(form, button);
    			append_dev(form, t14);
    			append_dev(form, div0);
    			append_dev(div0, t15);
    			append_dev(div0, input0);
    			set_input_value(input0, /*fields*/ ctx[2].email);
    			append_dev(form, t16);
    			append_dev(form, div1);
    			append_dev(div1, t17);
    			append_dev(form, t18);
    			append_dev(form, div2);
    			append_dev(div2, t19);
    			append_dev(div2, input1);
    			set_input_value(input1, /*fields*/ ctx[2].username);
    			append_dev(form, t20);
    			append_dev(form, div3);
    			append_dev(div3, t21);
    			append_dev(form, t22);
    			append_dev(form, input2);
    			set_input_value(input2, /*fields*/ ctx[2].comment);
    			append_dev(form, t23);
    			append_dev(form, div4);
    			append_dev(div4, t24);
    			append_dev(div6, t25);
    			mount_component(toast, div6, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[6]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[7]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[8]),
    					listen_dev(form, "submit", prevent_default(/*submitHandler*/ ctx[5]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*column_names*/ 16) {
    				each_value_1 = /*column_names*/ ctx[4];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tr0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if ((!current || dirty & /*emailData*/ 1) && t1_value !== (t1_value = /*emailData*/ ctx[0].email + "")) set_data_dev(t1, t1_value);
    			if ((!current || dirty & /*emailData*/ 1) && t3_value !== (t3_value = /*emailData*/ ctx[0].type_of_scam + "")) set_data_dev(t3, t3_value);
    			if ((!current || dirty & /*emailData*/ 1) && t5_value !== (t5_value = /*emailData*/ ctx[0].report_count + "")) set_data_dev(t5, t5_value);
    			if ((!current || dirty & /*emailData*/ 1) && t7_value !== (t7_value = /*emailData*/ ctx[0].first + "")) set_data_dev(t7, t7_value);
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 131072) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (dirty & /*commentData*/ 2) {
    				each_value = /*commentData*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div6, t12);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*fields*/ 4 && input0.value !== /*fields*/ ctx[2].email) {
    				set_input_value(input0, /*fields*/ ctx[2].email);
    			}

    			if ((!current || dirty & /*errors*/ 8) && t17_value !== (t17_value = /*errors*/ ctx[3].email + "")) set_data_dev(t17, t17_value);

    			if (dirty & /*fields*/ 4 && input1.value !== /*fields*/ ctx[2].username) {
    				set_input_value(input1, /*fields*/ ctx[2].username);
    			}

    			if ((!current || dirty & /*errors*/ 8) && t21_value !== (t21_value = /*errors*/ ctx[3].username + "")) set_data_dev(t21, t21_value);

    			if (dirty & /*fields*/ 4 && input2.value !== /*fields*/ ctx[2].comment) {
    				set_input_value(input2, /*fields*/ ctx[2].comment);
    			}

    			if ((!current || dirty & /*errors*/ 8) && t24_value !== (t24_value = /*errors*/ ctx[3].comment + "")) set_data_dev(t24, t24_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			transition_in(toast.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			transition_out(toast.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_each(each_blocks_1, detaching);
    			destroy_component(link);
    			destroy_each(each_blocks, detaching);
    			destroy_component(toast);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Emails', slots, []);
    	let { emailData = "" } = $$props;
    	let { commentData = "" } = $$props;
    	const column_names = ["Email", "Type of Scam", "Number of Reports", "First Occurance"];
    	let fields = { email: "", username: "", comment: "" };
    	let errors = { email: "", username: "", comment: "" };
    	let valid = false;

    	const submitHandler = () => {
    		valid = true;

    		//Email field
    		if (fields.email.trim().length == 0) {
    			$$invalidate(2, fields.email = "Anonymous", fields);
    		}

    		//username field
    		if (fields.username.trim().length == 0) {
    			$$invalidate(2, fields.username = "Anonymous", fields);
    		}

    		//Comments field
    		if (fields.comment.length == 0) {
    			valid = false;
    			$$invalidate(3, errors.comment = "Comment can not be left empty", errors);
    		} else {
    			$$invalidate(3, errors.comment = "", errors);
    		}

    		if (valid) {
    			submitFields();
    		}
    	};

    	function submitFields() {
    		for (let i = 0; i < commentData.length; i++) {
    			//If the scam email is not reported
    			const newData = {
    				username: fields.username,
    				email: fields.email,
    				comment: fields.comment
    			};

    			commentData.push(newData);
    			var toastLiveExample = document.getElementById("liveToastSuccess");
    			var toast = new bootstrap.Toast(toastLiveExample);
    			toast.show();
    			$$invalidate(2, fields = { email: "", username: "", comment: "" });
    		}
    	}

    	const writable_props = ['emailData', 'commentData'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Emails> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		fields.email = this.value;
    		$$invalidate(2, fields);
    	}

    	function input1_input_handler() {
    		fields.username = this.value;
    		$$invalidate(2, fields);
    	}

    	function input2_input_handler() {
    		fields.comment = this.value;
    		$$invalidate(2, fields);
    	}

    	$$self.$$set = $$props => {
    		if ('emailData' in $$props) $$invalidate(0, emailData = $$props.emailData);
    		if ('commentData' in $$props) $$invalidate(1, commentData = $$props.commentData);
    	};

    	$$self.$capture_state = () => ({
    		router_names,
    		navigate,
    		Link,
    		Toast,
    		emailData,
    		commentData,
    		column_names,
    		fields,
    		errors,
    		valid,
    		submitHandler,
    		submitFields
    	});

    	$$self.$inject_state = $$props => {
    		if ('emailData' in $$props) $$invalidate(0, emailData = $$props.emailData);
    		if ('commentData' in $$props) $$invalidate(1, commentData = $$props.commentData);
    		if ('fields' in $$props) $$invalidate(2, fields = $$props.fields);
    		if ('errors' in $$props) $$invalidate(3, errors = $$props.errors);
    		if ('valid' in $$props) valid = $$props.valid;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		emailData,
    		commentData,
    		fields,
    		errors,
    		column_names,
    		submitHandler,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler
    	];
    }

    class Emails extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { emailData: 0, commentData: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Emails",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get emailData() {
    		throw new Error("<Emails>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set emailData(value) {
    		throw new Error("<Emails>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get commentData() {
    		throw new Error("<Emails>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set commentData(value) {
    		throw new Error("<Emails>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Email.svelte generated by Svelte v3.47.0 */
    const file$2 = "src/Email.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let header;
    	let t;
    	let emails;
    	let updating_emailData;
    	let updating_commentData;
    	let current;

    	header = new Header({
    			props: {
    				current: "" + (router_names.email + "/" + /*id*/ ctx[2])
    			},
    			$$inline: true
    		});

    	function emails_emailData_binding(value) {
    		/*emails_emailData_binding*/ ctx[3](value);
    	}

    	function emails_commentData_binding(value) {
    		/*emails_commentData_binding*/ ctx[4](value);
    	}

    	let emails_props = {};

    	if (/*emailData*/ ctx[0] !== void 0) {
    		emails_props.emailData = /*emailData*/ ctx[0];
    	}

    	if (/*commentData*/ ctx[1] !== void 0) {
    		emails_props.commentData = /*commentData*/ ctx[1];
    	}

    	emails = new Emails({ props: emails_props, $$inline: true });
    	binding_callbacks.push(() => bind(emails, 'emailData', emails_emailData_binding));
    	binding_callbacks.push(() => bind(emails, 'commentData', emails_commentData_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(header.$$.fragment);
    			t = space();
    			create_component(emails.$$.fragment);
    			add_location(div, file$2, 12, 0, 386);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(header, div, null);
    			append_dev(div, t);
    			mount_component(emails, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const header_changes = {};
    			if (dirty & /*id*/ 4) header_changes.current = "" + (router_names.email + "/" + /*id*/ ctx[2]);
    			header.$set(header_changes);
    			const emails_changes = {};

    			if (!updating_emailData && dirty & /*emailData*/ 1) {
    				updating_emailData = true;
    				emails_changes.emailData = /*emailData*/ ctx[0];
    				add_flush_callback(() => updating_emailData = false);
    			}

    			if (!updating_commentData && dirty & /*commentData*/ 2) {
    				updating_commentData = true;
    				emails_changes.commentData = /*commentData*/ ctx[1];
    				add_flush_callback(() => updating_commentData = false);
    			}

    			emails.$set(emails_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(emails.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(emails.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(header);
    			destroy_component(emails);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Email', slots, []);
    	let { id = "" } = $$props;
    	let { emailData = data.find(d => d.id == id) } = $$props;
    	let { commentData = emailData.commentLog } = $$props;
    	const writable_props = ['id', 'emailData', 'commentData'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Email> was created with unknown prop '${key}'`);
    	});

    	function emails_emailData_binding(value) {
    		emailData = value;
    		$$invalidate(0, emailData);
    	}

    	function emails_commentData_binding(value) {
    		commentData = value;
    		$$invalidate(1, commentData);
    	}

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(2, id = $$props.id);
    		if ('emailData' in $$props) $$invalidate(0, emailData = $$props.emailData);
    		if ('commentData' in $$props) $$invalidate(1, commentData = $$props.commentData);
    	};

    	$$self.$capture_state = () => ({
    		router_names,
    		data,
    		Header,
    		Emails,
    		id,
    		emailData,
    		commentData
    	});

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(2, id = $$props.id);
    		if ('emailData' in $$props) $$invalidate(0, emailData = $$props.emailData);
    		if ('commentData' in $$props) $$invalidate(1, commentData = $$props.commentData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		emailData,
    		commentData,
    		id,
    		emails_emailData_binding,
    		emails_commentData_binding
    	];
    }

    class Email extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { id: 2, emailData: 0, commentData: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Email",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get id() {
    		throw new Error("<Email>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Email>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get emailData() {
    		throw new Error("<Email>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set emailData(value) {
    		throw new Error("<Email>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get commentData() {
    		throw new Error("<Email>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set commentData(value) {
    		throw new Error("<Email>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/NotFound.svelte generated by Svelte v3.47.0 */
    const file$1 = "src/NotFound.svelte";

    // (17:8) <Link to="{router_names.home}" >
    function create_default_slot$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Go Home";
    			attr_dev(div, "class", "svelte-vlaq4o");
    			add_location(div, file$1, 16, 40, 554);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(17:8) <Link to=\\\"{router_names.home}\\\" >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let h1;
    	let t1;
    	let div1;
    	let div0;
    	let iframe;
    	let iframe_src_value;
    	let t2;
    	let div2;
    	let button;
    	let link;
    	let current;

    	link = new Link({
    			props: {
    				to: router_names.home,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Page Not Found";
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			iframe = element("iframe");
    			t2 = space();
    			div2 = element("div");
    			button = element("button");
    			create_component(link.$$.fragment);
    			attr_dev(h1, "class", "text-center");
    			add_location(h1, file$1, 6, 0, 106);
    			attr_dev(iframe, "title", "404");
    			if (!src_url_equal(iframe.src, iframe_src_value = "https://giphy.com/embed/H54feNXf6i4eAQubud")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "width", "100%");
    			attr_dev(iframe, "height", "100%");
    			set_style(iframe, "position", "absolute");
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "class", "giphy-embed");
    			iframe.allowFullscreen = true;
    			add_location(iframe, file$1, 10, 8, 258);
    			set_style(div0, "width", "100%");
    			set_style(div0, "height", "0");
    			set_style(div0, "padding-bottom", "84%");
    			set_style(div0, "position", "relative");
    			attr_dev(div0, "class", "svelte-vlaq4o");
    			add_location(div0, file$1, 9, 4, 178);
    			attr_dev(div1, "class", "center svelte-vlaq4o");
    			add_location(div1, file$1, 8, 0, 153);
    			attr_dev(button, "class", "a btn btn-success btn-lg svelte-vlaq4o");
    			add_location(button, file$1, 15, 4, 471);
    			attr_dev(div2, "class", "svelte-vlaq4o");
    			add_location(div2, file$1, 14, 0, 461);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, iframe);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, button);
    			mount_component(link, button, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div2);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NotFound', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NotFound> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Link, router_names });
    	return [];
    }

    class NotFound extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NotFound",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.47.0 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    // (18:3) <Route path="{router_names.email}/:id" let:params >
    function create_default_slot_2(ctx) {
    	let email;
    	let current;

    	email = new Email({
    			props: { id: /*params*/ ctx[1].id },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(email.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(email, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const email_changes = {};
    			if (dirty & /*params*/ 2) email_changes.id = /*params*/ ctx[1].id;
    			email.$set(email_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(email.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(email.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(email, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(18:3) <Route path=\\\"{router_names.email}/:id\\\" let:params >",
    		ctx
    	});

    	return block;
    }

    // (23:3) <Route path="/" >
    function create_default_slot_1(ctx) {
    	let home;
    	let current;

    	home = new Home({
    			props: { search_email: "" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(23:3) <Route path=\\\"/\\\" >",
    		ctx
    	});

    	return block;
    }

    // (16:0) <Router url={url}>
    function create_default_slot(ctx) {
    	let div;
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let t2;
    	let route3;
    	let t3;
    	let route4;
    	let current;

    	route0 = new Route({
    			props: {
    				path: "" + (router_names.email + "/:id"),
    				$$slots: {
    					default: [
    						create_default_slot_2,
    						({ params }) => ({ 1: params }),
    						({ params }) => params ? 2 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: { path: router_names.FAQs, component: FAQs },
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: router_names.report,
    				component: Report
    			},
    			$$inline: true
    		});

    	route3 = new Route({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route4 = new Route({
    			props: { component: NotFound },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    			t2 = space();
    			create_component(route3.$$.fragment);
    			t3 = space();
    			create_component(route4.$$.fragment);
    			add_location(div, file, 16, 1, 456);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(route0, div, null);
    			append_dev(div, t0);
    			mount_component(route1, div, null);
    			append_dev(div, t1);
    			mount_component(route2, div, null);
    			append_dev(div, t2);
    			mount_component(route3, div, null);
    			append_dev(div, t3);
    			mount_component(route4, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route0_changes = {};

    			if (dirty & /*$$scope, params*/ 6) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route3_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				route3_changes.$$scope = { dirty, ctx };
    			}

    			route3.$set(route3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			transition_in(route4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(route4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(route0);
    			destroy_component(route1);
    			destroy_component(route2);
    			destroy_component(route3);
    			destroy_component(route4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(16:0) <Router url={url}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 4) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { url = "" } = $$props;
    	console.log(window.location.href);
    	const writable_props = ['url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Router,
    		Link,
    		Route,
    		navigate,
    		router_names,
    		Home,
    		Report,
    		FAQs,
    		Email,
    		NotFound,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get url() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'HCI-Spam Filter'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
