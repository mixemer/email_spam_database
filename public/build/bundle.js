
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
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

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
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

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
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

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
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
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

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

    /* node_modules\svelte-routing\src\Router.svelte generated by Svelte v3.47.0 */

    function create_fragment$e(ctx) {
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
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$e.name
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

    /* node_modules\svelte-routing\src\Route.svelte generated by Svelte v3.47.0 */

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
    	const if_block_creators = [create_if_block_1$1, create_else_block$3];
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
    function create_else_block$3(ctx) {
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
    		id: create_else_block$3.name,
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

    function create_fragment$d(ctx) {
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
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$d.name
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

    /* node_modules\svelte-routing\src\Link.svelte generated by Svelte v3.47.0 */
    const file$c = "node_modules\\svelte-routing\\src\\Link.svelte";

    function create_fragment$c(ctx) {
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
    			add_location(a, file$c, 40, 0, 1249);
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
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
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

    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$c.name
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

    const Anonymous = "Anonymous";

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

    var sounds = {
        info: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233294/info.mp3",
        // path to sound for successfull message:
        success: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233524/success.mp3",
        // path to sound for warn message:
        warning: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233563/warning.mp3",
        // path to sound for error message:
        error: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233574/error.mp3",
    };

    const FAQ = [
        {
            question: "What is a scam email?",
            answer: "A scam email is a deceiving email that tries to steal your information. There are different types of email scams:",
            answer1: "  -Phishing: when attackers send malicious emails designed to trick people into falling for a scam.", 
            answer2: "  -Credential theft: occurs when an unauthorized person (attacker) obtains and uses valid account credentials (username and password) for unauthorized access to a computer.",
            answer3: "  -Malware: an umbrella term for various types of malicious programs that are delivered and installed on end-user systems and servers.",
            answer4: "  -Monetary theft: when attackers still your debit or credit car infomation and are able to use it to drain money from your bank account.",
            answer5: "  -Wire fraud: a type of fraud that involves the use of some form of telecommunications or the internet. These can include a phone call, a fax, an email, a text, or social media messaging, among many other forms.",
            answer6: "  -Supply-chain attacks: Historically the term “supply chain” implied one company providing a good or service to another company who, in turn, provided a value-added good or service to another company and so on until a fully realized product is purchased by the final customer.",
        },
        {
            question: "What is a phishing email and how is it related to scam emails?",
            answer: "A phishing email is a type of scam sent by another person disguising as a legitimate, trustworthy source.",
            answer1: "Phishing is an example of social engineering: a collection of techniques that scam artists use to manipulate human psychology. Social engineering techniques include forgery, misdirection and lying—all of which can play a part in phishing attacks. On a basic level, phishing emails use social engineering to encourage users to act without thinking things through.",
        },
        {
            question: "How do I search for a scam email?",
            answer: "Start typing in the search bar on the home page. It will trim the table and will find your email. If it does not exist, you can report the email (See the next 2 questions).",
        },
        {
            question: "How do I add a report to an existing entry in the table?",
            answer: "Click “Report” at the top right of the page. Insert your name, email, the scam email, and the scam type, then press the “Send” button. The number of reports represent the amount of times people has spoted that scam email. If you find the suspicious email in the list, please report it. That will help other users by letting them know how common is that scam email.",
        },
        {
            question: "The email I searched for does not exist in the table or the scam type is different. How do I add it?",
            answer: "You can contribute to the list of scam emails! First you click on “Report” at the top right of the page. The Scam Email Ticket page will appear. PLease, fill out the form by inserting your name, email, the scam email, and the scam type. You can leave your name and email boxes in “anonymous”, but we encourage users to provide real information, your email will not be display. After filling out the form press the “Send” button. This will create a new table entry with 1 report and 0 comments.",
        },
        {
            question: "Where do I access the comments for a scam email?",
            answer: "First, click on the email that you searched up inside the table on the \"Home\" page. This should bring you to the comments page.",
        },
        {
            question: "How do I add a comment?",
            answer: "Inside the comments page of a particular email, you can add a comment by putting your email, username and your comments. Finally, press the button that says \"Add a comment\".",
        },
        {
            question: "What do I do if I click on a link in a scam email?",
            answer: "If you click any link inside a scam email do not give any personal information like full name, phone number, SSN, credit or debit card numbers, or any other type of sensitive information. If a new tab was opened, close it immediately.",
        },
        {
            question: "How can I identify a scam email?",
            answer: "There are different clues that you can use to identify a scam email. First of all, most of the time scam emails will addressed to you using generic words like \"customer\", \"student\", or \"account owner\". Second, sometimes those emails comes from a addresses that might look similar to a legitimate one, but wiht slightly differences. For example, addresses ending at \"@bcmail.cuny.com\" instead of \"@bcmail.cuny.edu\".",
            answer1: "Another way to spot a scam email is by noticing that most of them want you to \"act quickly\", because supposedly something is going to happend of you do not act soon. For example, they can say that you need to change the password of your account, or that you have re-submit personal information like SSN. NEVER PROVIDE THAT INFORMATION TO A SUSPICIOUS EMAIL."
        },
        {
            question: "What do I do if I already provided some information to a scam email?",
            answer: "If the information you provided includes passwords and accounts related to them, you should immediately go to those accounts and change their passwords. It is a good practice to set \"Two Step Verification\" process for your accounts. If you shared your SSN you should contact the Social Secuirty Administration and let them know about this issue. If you shared your phone number be aware of upcoming scams through text messages and/or phone calls.",
        }
    ];

    const data = [
        { id: 1, email: 'fofis15650@arpizol.com', type_of_scam: "Urgent Offer", report_count: "100", first: "2000",  commentLog: [{ id:1, username: "bob", email: "bobby@gmail.com", date_created: "5/24/2022", comment: "Had similar scam experience" }, { id:2, username: "rosa", email: "rosa@gmail.com", date_created: "5/24/2022", comment: "Almost took the offer" }, { id:3,username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 2, email: 'Beemsee28@jourrapide.com', type_of_scam: "PayPal", report_count: "30", first: "2010", commentLog: [{ id:1, username: "anonymous", email: "unknown", date_created: "5/24/2022", comment: "Hate these kinds of scam" }]},
        { id: 3, email: 'rnewman@yahoo.ca', type_of_scam: "Fake Billing", report_count: "23", first: "2020", commentLog: [{id:1, username: "Boyle", email: "unknown", date_created: "5/24/2022", comment: "Hate these kinds of scam" }]},
        { id: 4, email: 'hermanab@outlook.com', type_of_scam: "Fake Virus", report_count: "65", first: "2021", commentLog: [{id:1, username: "Gina", email: "gina@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scam" }, {id:2, username: "Terry", email: "terry@gmail.com", date_created: "5/24/2022", comment: "LOL, was about to click on the link" }] },
        { id: 5, email: 'stewwy@gmail.com', type_of_scam: "Romance", report_count: "43", first: "2000", commentLog: [{id:1, username: "Gina", email: "gina@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scam" }, {id:2, username: "Terry", email: "terry@gmail.com", date_created: "5/24/2022", comment: "Almost was about to click on the link" }] },
        { id: 6, email: 'cderoove@verizon.net', type_of_scam: "Government", report_count: "1111", first: "2001", commentLog: [{id:1, username: "Croode", email: "croode@yahoo.com", date_created: "5/24/2022", comment: "Always get me with taxes fraud" }, {id:2, username: "Terry", email: "terry@gmail.com", date_created: "5/24/2022", comment: "LOL, was about to click on the link" }] },
        { id: 7, email: 'uncled@gmail.com', type_of_scam: "Romance", report_count: "221", first: "2003", commentLog: [{id:1, username: "Hitchcock", email: "scully@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scams" }] },
        { id: 8, email: 'trygstad@mac.com', type_of_scam: "Fake Virus", report_count: "1233", first: "2003", commentLog: [{id:1, username: "Ross", email: "rrachel@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scams" }, {id:2, username: "Rachel", email: "rachel@gmail.com", date_created: "5/24/2022", comment: "I just want a break from these scams" }]},
        { id: 9, email: 'fake@gmail.com', type_of_scam: "Romance", report_count: "23", first: "2012", commentLog: [{id:1, username: "Anonymouse", email: "gina@yahoo.com", date_created: "5/24/2022", comment: "Hate these kinds of scam" }, { id:2,username: "Anonymous", email: "terry@gmail.com", date_created: "5/24/2022", comment: "Thank god i saw this" }] },
        { id: 10, email: 'mastinfo@me.com', type_of_scam: "Mystery Shopper", report_count: "1", first: "2015", commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, {id:2, username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }]},

        { id: 11, email: 'privcan@mac.com', type_of_scam: "Tax", report_count: "432", first: "2012",  commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }] },
        { id: 12, email: 'seurat@sbcglobal.net', type_of_scam: "Hidden URL", report_count: "7777", first: "2017", commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, {id:2, username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }]},
        { id: 13, email: 'cderoove@verizon.net', type_of_scam: "PayPal", report_count: "67", first: "2021", commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }] },
        { id: 14, email: 'campbell@me.com', type_of_scam: "Romance", report_count: "865", first: "2020", commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }] },
        { id: 15, email: 'barjam@aol.com', type_of_scam: "Property", report_count: "55", first: "2010", commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, {id:2, username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 16, email: 'itstatus@gmail.com', type_of_scam: "Romance", report_count: "5", first: "2006", commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, {id:2, username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 17, email: 'padme@icloud.com', type_of_scam: "Charity", report_count: "1", first: "2009", commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, {id:2, username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
        { id: 18, email: 'intlprog@gmail.com', type_of_scam: "Money Transfer", report_count: "1231", first: "2005", commentLog: [{id:1, username: "Anonymous", email: "unknown@yahoo.com", date_created: "5/24/2022", comment: "Too often I get scam from this one" }, {id:2, username: "Anonymous", email: "unknown@gmail.com", date_created: "5/24/2022", comment: "Almost had me, was about to click on the link" }] },
    ];

    /* src\components\Toast.svelte generated by Svelte v3.47.0 */

    const file$b = "src\\components\\Toast.svelte";

    // (11:6) {:else}
    function create_else_block$2(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fa-solid fa-circle-exclamation px-2 text-danger");
    			add_location(i, file$b, 11, 8, 417);
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
    		id: create_else_block$2.name,
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
    			add_location(i, file$b, 9, 6, 334);
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

    function create_fragment$b(ctx) {
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
    		return create_else_block$2;
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
    			add_location(strong, file$b, 14, 6, 509);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn-close");
    			attr_dev(button, "data-bs-dismiss", "toast");
    			attr_dev(button, "aria-label", "Close");
    			add_location(button, file$b, 16, 6, 600);
    			attr_dev(div0, "class", "toast-header p-3");
    			add_location(div0, file$b, 7, 4, 275);
    			attr_dev(div1, "id", div1_id_value = /*success*/ ctx[1] ? 'liveToastSuccess' : 'liveToast');
    			attr_dev(div1, "class", "toast");
    			attr_dev(div1, "role", "alert");
    			attr_dev(div1, "aria-live", "assertive");
    			attr_dev(div1, "aria-atomic", "true");
    			add_location(div1, file$b, 6, 2, 146);
    			attr_dev(div2, "class", "position-fixed bottom-0 end-0 p-3");
    			set_style(div2, "z-index", "11");
    			add_location(div2, file$b, 5, 0, 75);
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
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { title: 0, success: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Toast",
    			options,
    			id: create_fragment$b.name
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

    /* src\components\Header.svelte generated by Svelte v3.47.0 */

    const { console: console_1$2 } = globals;
    const file$a = "src\\components\\Header.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (36:4) <Link class="navbar-brand fs-1 text-decoration-none" to="{router_names.home}" on:click={() => current = router_names.home}>
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
    		source: "(36:4) <Link class=\\\"navbar-brand fs-1 text-decoration-none\\\" to=\\\"{router_names.home}\\\" on:click={() => current = router_names.home}>",
    		ctx
    	});

    	return block;
    }

    // (46:5) <Link class="nav-link {current === router_names.home ? 'active' : ''}"        to="{router_names.home}" replace="{true}"  state={{search: ''}} on:click={() => current = router_names.home}>
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
    		source: "(46:5) <Link class=\\\"nav-link {current === router_names.home ? 'active' : ''}\\\"        to=\\\"{router_names.home}\\\" replace=\\\"{true}\\\"  state={{search: ''}} on:click={() => current = router_names.home}>",
    		ctx
    	});

    	return block;
    }

    // (53:6) <Link class="nav-link {current === router_names.report ? 'active' : ''}"         to="{router_names.report}" on:click={() => current = router_names.report}>
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
    		source: "(53:6) <Link class=\\\"nav-link {current === router_names.report ? 'active' : ''}\\\"         to=\\\"{router_names.report}\\\" on:click={() => current = router_names.report}>",
    		ctx
    	});

    	return block;
    }

    // (58:6) <Link class="nav-link {current === router_names.FAQs ? 'active' : ''}"         to="{router_names.FAQs}" on:click={() => current = router_names.FAQs}>
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
    		source: "(58:6) <Link class=\\\"nav-link {current === router_names.FAQs ? 'active' : ''}\\\"         to=\\\"{router_names.FAQs}\\\" on:click={() => current = router_names.FAQs}>",
    		ctx
    	});

    	return block;
    }

    // (76:3) {:else}
    function create_else_block$1(ctx) {
    	let li;
    	let p;

    	const block = {
    		c: function create() {
    			li = element("li");
    			p = element("p");
    			p.textContent = "No Match Found";
    			attr_dev(p, "class", "dropdown-item svelte-7a9sjt");
    			add_location(p, file$a, 76, 8, 3112);
    			add_location(li, file$a, 76, 4, 3108);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(76:3) {:else}",
    		ctx
    	});

    	return block;
    }

    // (74:3) {#each shownData as scam}
    function create_each_block$3(ctx) {
    	let li;
    	let p;
    	let t_value = /*scam*/ ctx[13].email + "";
    	let t;
    	let mounted;
    	let dispose;

    	function click_handler_4() {
    		return /*click_handler_4*/ ctx[12](/*scam*/ ctx[13]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "dropdown-item svelte-7a9sjt");
    			add_location(p, file$a, 74, 48, 3043);
    			add_location(li, file$a, 74, 4, 2999);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, p);
    			append_dev(p, t);

    			if (!mounted) {
    				dispose = listen_dev(li, "click", click_handler_4, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*shownData*/ 8 && t_value !== (t_value = /*scam*/ ctx[13].email + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(74:3) {#each shownData as scam}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div3;
    	let nav;
    	let div1;
    	let link0;
    	let t0;
    	let button0;
    	let span;
    	let t1;
    	let div0;
    	let ul0;
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
    	let ul1;
    	let ul1_class_value;
    	let t8;
    	let toast;
    	let t9;
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

    	link0.$on("click", /*click_handler*/ ctx[6]);

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

    	link1.$on("click", /*click_handler_1*/ ctx[7]);

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

    	link2.$on("click", /*click_handler_2*/ ctx[8]);

    	link3 = new Link({
    			props: {
    				class: "nav-link " + (/*current*/ ctx[1] === router_names.FAQs ? 'active' : ''),
    				to: router_names.FAQs,
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link3.$on("click", /*click_handler_3*/ ctx[9]);
    	let each_value = /*shownData*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$1(ctx);
    	}

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
    			ul0 = element("ul");
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
    			ul1 = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			t8 = space();
    			create_component(toast.$$.fragment);
    			t9 = space();
    			br = element("br");
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$a, 38, 3, 1467);
    			attr_dev(button0, "class", "navbar-toggler");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "data-bs-toggle", "collapse");
    			attr_dev(button0, "data-bs-target", "#navbarNav");
    			attr_dev(button0, "aria-controls", "navbarNav");
    			attr_dev(button0, "aria-expanded", "false");
    			attr_dev(button0, "aria-label", "Toggle navigation");
    			add_location(button0, file$a, 37, 10, 1284);
    			attr_dev(li0, "class", "nav-item");
    			add_location(li0, file$a, 44, 4, 1649);
    			attr_dev(li1, "class", "nav-item");
    			add_location(li1, file$a, 51, 4, 2070);
    			attr_dev(li2, "class", "nav-item d-flex");
    			add_location(li2, file$a, 56, 4, 2292);
    			attr_dev(ul0, "class", "navbar-nav mb-2 mb-lg-0");
    			add_location(ul0, file$a, 42, 3, 1601);
    			attr_dev(div0, "class", "end-lined collapse navbar-collapse svelte-7a9sjt");
    			attr_dev(div0, "id", "navbarNav");
    			add_location(div0, file$a, 41, 4, 1533);
    			attr_dev(div1, "class", "container-fluid");
    			add_location(div1, file$a, 34, 2, 1087);
    			attr_dev(nav, "class", "navbar navbar-expand-lg navbar-light ");
    			add_location(nav, file$a, 33, 1, 1032);
    			attr_dev(input, "class", "form-control me-2");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Search Email");
    			attr_dev(input, "aria-label", "Search");
    			add_location(input, file$a, 68, 4, 2612);
    			attr_dev(button1, "class", "btn btn-outline-success");
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "id", "liveToastBtn");
    			add_location(button1, file$a, 69, 4, 2769);
    			attr_dev(form, "class", "d-flex");
    			add_location(form, file$a, 67, 2, 2585);
    			attr_dev(ul1, "class", ul1_class_value = "dropdown-menu " + (/*showDropdown*/ ctx[2] ? "show" : "") + " svelte-7a9sjt");
    			add_location(ul1, file$a, 72, 2, 2907);
    			attr_dev(div2, "class", "container-fluid");
    			add_location(div2, file$a, 66, 3, 2552);
    			add_location(br, file$a, 84, 3, 3277);
    			attr_dev(div3, "class", "header svelte-7a9sjt");
    			add_location(div3, file$a, 32, 0, 1009);
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
    			append_dev(div0, ul0);
    			append_dev(ul0, li0);
    			mount_component(link1, li0, null);
    			append_dev(ul0, t2);
    			append_dev(ul0, li1);
    			mount_component(link2, li1, null);
    			append_dev(ul0, t3);
    			append_dev(ul0, li2);
    			mount_component(link3, li2, null);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, form);
    			append_dev(form, input);
    			set_input_value(input, /*search_email*/ ctx[0]);
    			append_dev(form, t5);
    			append_dev(form, button1);
    			append_dev(div2, t7);
    			append_dev(div2, ul1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul1, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(ul1, null);
    			}

    			append_dev(div3, t8);
    			mount_component(toast, div3, null);
    			append_dev(div3, t9);
    			append_dev(div3, br);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_handler*/ ctx[10], false, false, false),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[11]),
    					listen_dev(button1, "click", prevent_default(/*onClick*/ ctx[4]), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};
    			if (dirty & /*current*/ 2) link1_changes.class = "nav-link " + (/*current*/ ctx[1] === router_names.home ? 'active' : '');

    			if (dirty & /*$$scope*/ 65536) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			const link2_changes = {};

    			if (dirty & /*current*/ 2) link2_changes.class = "nav-link " + (/*current*/ ctx[1] === router_names.report
    			? 'active'
    			: '');

    			if (dirty & /*$$scope*/ 65536) {
    				link2_changes.$$scope = { dirty, ctx };
    			}

    			link2.$set(link2_changes);
    			const link3_changes = {};
    			if (dirty & /*current*/ 2) link3_changes.class = "nav-link " + (/*current*/ ctx[1] === router_names.FAQs ? 'active' : '');

    			if (dirty & /*$$scope*/ 65536) {
    				link3_changes.$$scope = { dirty, ctx };
    			}

    			link3.$set(link3_changes);

    			if (dirty & /*search_email*/ 1) {
    				set_input_value(input, /*search_email*/ ctx[0]);
    			}

    			if (dirty & /*onClickEmail, shownData*/ 40) {
    				each_value = /*shownData*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;

    				if (!each_value.length && each_1_else) {
    					each_1_else.p(ctx, dirty);
    				} else if (!each_value.length) {
    					each_1_else = create_else_block$1(ctx);
    					each_1_else.c();
    					each_1_else.m(ul1, null);
    				} else if (each_1_else) {
    					each_1_else.d(1);
    					each_1_else = null;
    				}
    			}

    			if (!current || dirty & /*showDropdown*/ 4 && ul1_class_value !== (ul1_class_value = "dropdown-menu " + (/*showDropdown*/ ctx[2] ? "show" : "") + " svelte-7a9sjt")) {
    				attr_dev(ul1, "class", ul1_class_value);
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
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    			destroy_component(toast);
    			mounted = false;
    			run_all(dispose);
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

    const shownDataCount = 5;

    function instance$a($$self, $$props, $$invalidate) {
    	let shownData;
    	let showDropdown;
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

    	//TODO: few issues
    	function onClickEmail(id) {
    		navigate("/" + router_names.email + "/" + id, { replace: false, state: { id } });
    	}

    	const writable_props = ['search_email', 'current'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(1, current = router_names.home);
    	const click_handler_1 = () => $$invalidate(1, current = router_names.home);
    	const click_handler_2 = () => $$invalidate(1, current = router_names.report);
    	const click_handler_3 = () => $$invalidate(1, current = router_names.FAQs);
    	const input_handler = () => console.log();

    	function input_input_handler() {
    		search_email = this.value;
    		$$invalidate(0, search_email);
    	}

    	const click_handler_4 = scam => onClickEmail(scam.id);

    	$$self.$$set = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    		if ('current' in $$props) $$invalidate(1, current = $$props.current);
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		Link,
    		router_names,
    		data,
    		Toast,
    		search_email,
    		current,
    		shownDataCount,
    		onClick,
    		onClickEmail,
    		showDropdown,
    		shownData
    	});

    	$$self.$inject_state = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    		if ('current' in $$props) $$invalidate(1, current = $$props.current);
    		if ('onClick' in $$props) $$invalidate(4, onClick = $$props.onClick);
    		if ('showDropdown' in $$props) $$invalidate(2, showDropdown = $$props.showDropdown);
    		if ('shownData' in $$props) $$invalidate(3, shownData = $$props.shownData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*search_email*/ 1) {
    			$$invalidate(3, shownData = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase())).slice(0, shownDataCount));
    		}

    		if ($$self.$$.dirty & /*search_email, current*/ 3) {
    			$$invalidate(2, showDropdown = search_email.trim().length > 0 && current !== router_names.home);
    		}
    	};

    	return [
    		search_email,
    		current,
    		showDropdown,
    		shownData,
    		onClick,
    		onClickEmail,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		input_handler,
    		input_input_handler,
    		click_handler_4
    	];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { search_email: 0, current: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$a.name
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

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src\components\TableDatabase.svelte generated by Svelte v3.47.0 */
    const file$9 = "src\\components\\TableDatabase.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[24] = list[i];
    	child_ctx[26] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[27] = list[i];
    	child_ctx[26] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[29] = list[i];
    	child_ctx[26] = i;
    	return child_ctx;
    }

    // (75:4) {#if loading}
    function create_if_block_4(ctx) {
    	let div1;
    	let div0;
    	let t;
    	let br;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();
    			br = element("br");
    			attr_dev(div0, "class", "progress-bar progress-bar-striped progress-bar-animated");
    			attr_dev(div0, "role", "progressbar");
    			attr_dev(div0, "aria-valuenow", "100");
    			attr_dev(div0, "aria-valuemin", "0");
    			attr_dev(div0, "aria-valuemax", "100");
    			set_style(div0, "width", "100%");
    			add_location(div0, file$9, 76, 12, 2648);
    			attr_dev(div1, "class", "progress");
    			add_location(div1, file$9, 75, 8, 2612);
    			add_location(br, file$9, 78, 8, 2846);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			insert_dev(target, t, anchor);
    			insert_dev(target, br, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(75:4) {#if loading}",
    		ctx
    	});

    	return block;
    }

    // (87:20) {#if i == sortVal}
    function create_if_block_2(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*sortAsc*/ ctx[3]) return create_if_block_3;
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
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(87:20) {#if i == sortVal}",
    		ctx
    	});

    	return block;
    }

    // (90:24) {:else}
    function create_else_block(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fa-solid fa-arrow-up");
    			add_location(i, file$9, 90, 28, 3328);
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
    		source: "(90:24) {:else}",
    		ctx
    	});

    	return block;
    }

    // (88:24) {#if sortAsc}
    function create_if_block_3(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fa-solid fa-arrow-down");
    			add_location(i, file$9, 88, 28, 3227);
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
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(88:24) {#if sortAsc}",
    		ctx
    	});

    	return block;
    }

    // (85:14) {#each column_names as column, i}
    function create_each_block_2(ctx) {
    	let th;
    	let t0_value = /*column*/ ctx[29] + "";
    	let t0;
    	let t1;
    	let t2;
    	let mounted;
    	let dispose;
    	let if_block = /*i*/ ctx[26] == /*sortVal*/ ctx[4] && create_if_block_2(ctx);

    	function click_handler() {
    		return /*click_handler*/ ctx[16](/*i*/ ctx[26]);
    	}

    	const block = {
    		c: function create() {
    			th = element("th");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			attr_dev(th, "class", "" + (null_to_empty(isClickable(/*i*/ ctx[26]) ? "clickable" : "") + " svelte-xwpvo"));
    			attr_dev(th, "scope", "col");
    			add_location(th, file$9, 85, 18, 3011);
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

    			if (/*i*/ ctx[26] == /*sortVal*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
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
    		source: "(85:14) {#each column_names as column, i}",
    		ctx
    	});

    	return block;
    }

    // (100:12) {#if !loading}
    function create_if_block_1(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let each_value_1 = /*results*/ ctx[6];
    	validate_each_argument(each_value_1);
    	const get_key = ctx => /*result*/ ctx[27].id;
    	validate_each_keys(ctx, each_value_1, get_each_context_1$1, get_key);

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1$1(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_1$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*onClickEmail, results*/ 4160) {
    				each_value_1 = /*results*/ ctx[6];
    				validate_each_argument(each_value_1);
    				validate_each_keys(ctx, each_value_1, get_each_context_1$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, each_1_anchor.parentNode, destroy_block, create_each_block_1$1, each_1_anchor, get_each_context_1$1);
    			}
    		},
    		i: function intro(local) {
    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(100:12) {#if !loading}",
    		ctx
    	});

    	return block;
    }

    // (101:16) {#each results as result, i (result.id)}
    function create_each_block_1$1(key_1, ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*i*/ ctx[26] + 1 + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*result*/ ctx[27].email + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*result*/ ctx[27].type_of_scam + "";
    	let t4;
    	let t5;
    	let td3;
    	let t6_value = /*result*/ ctx[27].report_count + "";
    	let t6;
    	let t7;
    	let td4;
    	let t8_value = /*result*/ ctx[27].first + "";
    	let t8;
    	let t9;
    	let td5;
    	let t10_value = /*result*/ ctx[27].commentLog.length + "";
    	let t10;
    	let t11;
    	let td6;
    	let i_1;
    	let t12;
    	let tr_intro;
    	let mounted;
    	let dispose;

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[17](/*result*/ ctx[27]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
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
    			add_location(td0, file$9, 102, 20, 3720);
    			add_location(td1, file$9, 103, 20, 3756);
    			add_location(td2, file$9, 104, 20, 3801);
    			add_location(td3, file$9, 105, 20, 3853);
    			add_location(td4, file$9, 106, 20, 3905);
    			add_location(td5, file$9, 107, 20, 3950);
    			attr_dev(i_1, "class", "fa-solid fa-angle-right");
    			add_location(i_1, file$9, 108, 25, 4012);
    			add_location(td6, file$9, 108, 20, 4007);
    			attr_dev(tr, "class", "clickable svelte-xwpvo");
    			add_location(tr, file$9, 101, 16, 3627);
    			this.first = tr;
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
    			if (dirty & /*results*/ 64 && t0_value !== (t0_value = /*i*/ ctx[26] + 1 + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*results*/ 64 && t2_value !== (t2_value = /*result*/ ctx[27].email + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*results*/ 64 && t4_value !== (t4_value = /*result*/ ctx[27].type_of_scam + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*results*/ 64 && t6_value !== (t6_value = /*result*/ ctx[27].report_count + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*results*/ 64 && t8_value !== (t8_value = /*result*/ ctx[27].first + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*results*/ 64 && t10_value !== (t10_value = /*result*/ ctx[27].commentLog.length + "")) set_data_dev(t10, t10_value);
    		},
    		i: function intro(local) {
    			if (!tr_intro) {
    				add_render_callback(() => {
    					tr_intro = create_in_transition(tr, fade, {});
    					tr_intro.start();
    				});
    			}
    		},
    		o: noop,
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
    		source: "(101:16) {#each results as result, i (result.id)}",
    		ctx
    	});

    	return block;
    }

    // (116:6) {#if results.length === 0}
    function create_if_block(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "No Email Found";
    			attr_dev(h1, "class", "text-center text-white");
    			add_location(h1, file$9, 116, 10, 4206);
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
    		source: "(116:6) {#if results.length === 0}",
    		ctx
    	});

    	return block;
    }

    // (126:16) {#each Array((max_page_count)) as _, i}
    function create_each_block$2(ctx) {
    	let li;
    	let span;
    	let t_value = /*i*/ ctx[26] + 1 + "";
    	let t;
    	let li_class_value;
    	let mounted;
    	let dispose;

    	function click_handler_3() {
    		return /*click_handler_3*/ ctx[19](/*i*/ ctx[26]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			span = element("span");
    			t = text(t_value);
    			attr_dev(span, "class", "page-link svelte-xwpvo");
    			add_location(span, file$9, 126, 80, 4767);

    			attr_dev(li, "class", li_class_value = "page-item " + (/*i*/ ctx[26] + 1 == /*current_page*/ ctx[1]
    			? 'active'
    			: ''));

    			add_location(li, file$9, 126, 20, 4707);
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

    			if (dirty & /*current_page*/ 2 && li_class_value !== (li_class_value = "page-item " + (/*i*/ ctx[26] + 1 == /*current_page*/ ctx[1]
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
    		source: "(126:16) {#each Array((max_page_count)) as _, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div1;
    	let t0;
    	let table;
    	let thead;
    	let tr;
    	let t1;
    	let tbody;
    	let t2;
    	let t3;
    	let div0;
    	let nav;
    	let ul;
    	let li0;
    	let span0;
    	let li0_class_value;
    	let t5;
    	let t6;
    	let li1;
    	let span1;
    	let li1_class_value;
    	let t8;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let mounted;
    	let dispose;
    	let if_block0 = /*loading*/ ctx[2] && create_if_block_4(ctx);
    	let each_value_2 = /*column_names*/ ctx[7];
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let if_block1 = !/*loading*/ ctx[2] && create_if_block_1(ctx);
    	let if_block2 = /*results*/ ctx[6].length === 0 && create_if_block(ctx);
    	let each_value = Array(/*max_page_count*/ ctx[5]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t1 = space();
    			tbody = element("tbody");
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			t3 = space();
    			div0 = element("div");
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			span0 = element("span");
    			span0.textContent = "Previous";
    			t5 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			li1 = element("li");
    			span1 = element("span");
    			span1.textContent = "Next";
    			t8 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "5";
    			option1 = element("option");
    			option1.textContent = "10";
    			option2 = element("option");
    			option2.textContent = "20";
    			attr_dev(tr, "class", "svelte-xwpvo");
    			add_location(tr, file$9, 83, 10, 2938);
    			add_location(thead, file$9, 82, 8, 2919);
    			add_location(tbody, file$9, 98, 8, 3516);
    			attr_dev(table, "class", "table table-bordered svelte-xwpvo");
    			add_location(table, file$9, 81, 4, 2873);
    			attr_dev(span0, "class", "page-link svelte-xwpvo");
    			add_location(span0, file$9, 122, 76, 4510);
    			attr_dev(li0, "class", li0_class_value = "page-item " + (/*current_page*/ ctx[1] <= 1 ? 'disabled' : ''));
    			add_location(li0, file$9, 122, 16, 4450);
    			attr_dev(span1, "class", "page-link svelte-xwpvo");
    			add_location(span1, file$9, 130, 85, 4984);

    			attr_dev(li1, "class", li1_class_value = "page-item " + (/*current_page*/ ctx[1] >= /*max_page_count*/ ctx[5]
    			? 'disabled'
    			: ''));

    			add_location(li1, file$9, 130, 12, 4911);
    			attr_dev(ul, "class", "pagination pagination-sm");
    			add_location(ul, file$9, 121, 12, 4395);
    			attr_dev(nav, "aria-label", "Page navigation example");
    			add_location(nav, file$9, 120, 8, 4339);
    			option0.selected = true;
    			option0.__value = 5;
    			option0.value = option0.__value;
    			add_location(option0, file$9, 136, 12, 5262);
    			option1.__value = 10;
    			option1.value = option1.__value;
    			add_location(option1, file$9, 137, 12, 5313);
    			option2.__value = 20;
    			option2.value = option2.__value;
    			add_location(option2, file$9, 138, 12, 5357);
    			attr_dev(select, "class", "form-select svelte-xwpvo");
    			attr_dev(select, "aria-label", "Default select example");
    			if (/*shown_rows*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[21].call(select));
    			add_location(select, file$9, 135, 8, 5120);
    			attr_dev(div0, "class", "d-flex justify-content-between");
    			add_location(div0, file$9, 119, 6, 4285);
    			attr_dev(div1, "class", "body p-3 rounded svelte-xwpvo");
    			add_location(div1, file$9, 73, 2, 2553);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(tr, null);
    			}

    			append_dev(table, t1);
    			append_dev(table, tbody);
    			if (if_block1) if_block1.m(tbody, null);
    			append_dev(div1, t2);
    			if (if_block2) if_block2.m(div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, nav);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, span0);
    			append_dev(ul, t5);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(ul, t6);
    			append_dev(ul, li1);
    			append_dev(li1, span1);
    			append_dev(div0, t8);
    			append_dev(div0, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			select_option(select, /*shown_rows*/ ctx[0]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span0, "click", /*click_handler_2*/ ctx[18], false, false, false),
    					listen_dev(span1, "click", /*click_handler_4*/ ctx[20], false, false, false),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[21]),
    					listen_dev(select, "change", /*change_handler*/ ctx[22], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*loading*/ ctx[2]) {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					if_block0.m(div1, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*isClickable, onClickColumNames, sortAsc, sortVal, column_names*/ 408) {
    				each_value_2 = /*column_names*/ ctx[7];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(tr, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (!/*loading*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*loading*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(tbody, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*results*/ ctx[6].length === 0) {
    				if (if_block2) ; else {
    					if_block2 = create_if_block(ctx);
    					if_block2.c();
    					if_block2.m(div1, t3);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty & /*current_page*/ 2 && li0_class_value !== (li0_class_value = "page-item " + (/*current_page*/ ctx[1] <= 1 ? 'disabled' : ''))) {
    				attr_dev(li0, "class", li0_class_value);
    			}

    			if (dirty & /*current_page, clickedOnPage, max_page_count*/ 2082) {
    				each_value = Array(/*max_page_count*/ ctx[5]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, t6);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*current_page, max_page_count*/ 34 && li1_class_value !== (li1_class_value = "page-item " + (/*current_page*/ ctx[1] >= /*max_page_count*/ ctx[5]
    			? 'disabled'
    			: ''))) {
    				attr_dev(li1, "class", li1_class_value);
    			}

    			if (dirty & /*shown_rows*/ 1) {
    				select_option(select, /*shown_rows*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block1);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block0) if_block0.d();
    			destroy_each(each_blocks_1, detaching);
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			destroy_each(each_blocks, detaching);
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

    const reportsIndex = 3;
    const firstIndex = 4;
    const commentsIndex = 5;

    function isClickable(i) {
    	return i >= reportsIndex && i <= commentsIndex;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let current_page;
    	let max_page_count;
    	let filtered_data;
    	let results;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableDatabase', slots, []);
    	let { hereFirstTime = false } = $$props;
    	let shown_rows = 10;
    	let { search_email = '' } = $$props;
    	let loading = true;

    	onMount(async () => {
    		let wait = 0;

    		if (hereFirstTime) {
    			wait = 500;
    		} else {
    			$$invalidate(2, loading = false);
    		}

    		setTimeout(
    			function () {
    				$$invalidate(2, loading = false);
    			},
    			wait
    		);
    	});

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
    			? a.commentLog.length - b.commentLog.length
    			: b.commentLog.length - a.commentLog.length;
    		}
    	}

    	function onClickColumNames(index) {
    		if (index < reportsIndex || index > commentsIndex) return;
    		if (index == sortVal) $$invalidate(3, sortAsc = !sortAsc);
    		$$invalidate(4, sortVal = index);
    		$$invalidate(15, filtered_data = filtered_data.sort(sort));
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
    		navigate("/" + router_names.email + "/" + id, { replace: false, state: { id } });
    	}

    	const writable_props = ['hereFirstTime', 'search_email'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableDatabase> was created with unknown prop '${key}'`);
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
    		if ('hereFirstTime' in $$props) $$invalidate(13, hereFirstTime = $$props.hereFirstTime);
    		if ('search_email' in $$props) $$invalidate(14, search_email = $$props.search_email);
    	};

    	$$self.$capture_state = () => ({
    		navigate,
    		Link,
    		data,
    		router_names,
    		fade,
    		onMount,
    		hereFirstTime,
    		shown_rows,
    		search_email,
    		loading,
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
    		if ('hereFirstTime' in $$props) $$invalidate(13, hereFirstTime = $$props.hereFirstTime);
    		if ('shown_rows' in $$props) $$invalidate(0, shown_rows = $$props.shown_rows);
    		if ('search_email' in $$props) $$invalidate(14, search_email = $$props.search_email);
    		if ('loading' in $$props) $$invalidate(2, loading = $$props.loading);
    		if ('sortAsc' in $$props) $$invalidate(3, sortAsc = $$props.sortAsc);
    		if ('sortVal' in $$props) $$invalidate(4, sortVal = $$props.sortVal);
    		if ('current_page' in $$props) $$invalidate(1, current_page = $$props.current_page);
    		if ('max_page_count' in $$props) $$invalidate(5, max_page_count = $$props.max_page_count);
    		if ('filtered_data' in $$props) $$invalidate(15, filtered_data = $$props.filtered_data);
    		if ('results' in $$props) $$invalidate(6, results = $$props.results);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*search_email*/ 16384) {
    			$$invalidate(1, current_page = search_email.trim() === '' ? 1 : 1);
    		}

    		if ($$self.$$.dirty & /*search_email*/ 16384) {
    			$$invalidate(15, filtered_data = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase())).sort(sort));
    		}

    		if ($$self.$$.dirty & /*filtered_data, shown_rows*/ 32769) {
    			$$invalidate(5, max_page_count = Math.ceil(filtered_data.length / shown_rows));
    		}

    		if ($$self.$$.dirty & /*filtered_data, current_page, shown_rows*/ 32771) {
    			$$invalidate(6, results = filtered_data.slice((current_page - 1) * shown_rows, current_page * shown_rows));
    		}
    	};

    	return [
    		shown_rows,
    		current_page,
    		loading,
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
    		hereFirstTime,
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
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { hereFirstTime: 13, search_email: 14 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableDatabase",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get hereFirstTime() {
    		throw new Error("<TableDatabase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hereFirstTime(value) {
    		throw new Error("<TableDatabase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get search_email() {
    		throw new Error("<TableDatabase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set search_email(value) {
    		throw new Error("<TableDatabase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Home.svelte generated by Svelte v3.47.0 */
    const file$8 = "src\\Home.svelte";

    function create_fragment$8(ctx) {
    	let main;
    	let header;
    	let updating_search_email;
    	let t;
    	let tabledatabase;
    	let updating_hereFirstTime;
    	let updating_search_email_1;
    	let current;

    	function header_search_email_binding(value) {
    		/*header_search_email_binding*/ ctx[2](value);
    	}

    	let header_props = {};

    	if (/*search_email*/ ctx[0] !== void 0) {
    		header_props.search_email = /*search_email*/ ctx[0];
    	}

    	header = new Header({ props: header_props, $$inline: true });
    	binding_callbacks.push(() => bind(header, 'search_email', header_search_email_binding));

    	function tabledatabase_hereFirstTime_binding(value) {
    		/*tabledatabase_hereFirstTime_binding*/ ctx[3](value);
    	}

    	function tabledatabase_search_email_binding(value) {
    		/*tabledatabase_search_email_binding*/ ctx[4](value);
    	}

    	let tabledatabase_props = {};

    	if (/*hereFirstTime*/ ctx[1] !== void 0) {
    		tabledatabase_props.hereFirstTime = /*hereFirstTime*/ ctx[1];
    	}

    	if (/*search_email*/ ctx[0] !== void 0) {
    		tabledatabase_props.search_email = /*search_email*/ ctx[0];
    	}

    	tabledatabase = new TableDatabase({
    			props: tabledatabase_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(tabledatabase, 'hereFirstTime', tabledatabase_hereFirstTime_binding));
    	binding_callbacks.push(() => bind(tabledatabase, 'search_email', tabledatabase_search_email_binding));

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t = space();
    			create_component(tabledatabase.$$.fragment);
    			attr_dev(main, "class", "");
    			add_location(main, file$8, 16, 0, 399);
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

    			if (!updating_hereFirstTime && dirty & /*hereFirstTime*/ 2) {
    				updating_hereFirstTime = true;
    				tabledatabase_changes.hereFirstTime = /*hereFirstTime*/ ctx[1];
    				add_flush_callback(() => updating_hereFirstTime = false);
    			}

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
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let { search_email = '' } = $$props;
    	let { hereFirstTime = false } = $$props;

    	onMount(async () => {
    		if (history.state) {
    			$$invalidate(0, search_email = history.state.search ? history.state.search : '');
    		}

    		$$invalidate(1, hereFirstTime = false);
    	});

    	const writable_props = ['search_email', 'hereFirstTime'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	function header_search_email_binding(value) {
    		search_email = value;
    		$$invalidate(0, search_email);
    	}

    	function tabledatabase_hereFirstTime_binding(value) {
    		hereFirstTime = value;
    		$$invalidate(1, hereFirstTime);
    	}

    	function tabledatabase_search_email_binding(value) {
    		search_email = value;
    		$$invalidate(0, search_email);
    	}

    	$$self.$$set = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    		if ('hereFirstTime' in $$props) $$invalidate(1, hereFirstTime = $$props.hereFirstTime);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		Header,
    		TableDataBase: TableDatabase,
    		search_email,
    		hereFirstTime
    	});

    	$$self.$inject_state = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    		if ('hereFirstTime' in $$props) $$invalidate(1, hereFirstTime = $$props.hereFirstTime);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		search_email,
    		hereFirstTime,
    		header_search_email_binding,
    		tabledatabase_hereFirstTime_binding,
    		tabledatabase_search_email_binding
    	];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { search_email: 0, hereFirstTime: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get search_email() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set search_email(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hereFirstTime() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hereFirstTime(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Ticket.svelte generated by Svelte v3.47.0 */
    const file$7 = "src\\components\\Ticket.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i].scam_name;
    	child_ctx[15] = i;
    	return child_ctx;
    }

    // (113:20) {#each scam_types as { scam_name }
    function create_each_block$1(ctx) {
    	let option;
    	let t_value = /*scam_name*/ ctx[13] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*i*/ ctx[15];
    			option.value = option.__value;
    			add_location(option, file$7, 113, 24, 4357);
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
    		source: "(113:20) {#each scam_types as { scam_name }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
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
    			t4 = text("Name:\r\n            ");
    			input0 = element("input");
    			t5 = space();
    			div1 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div2 = element("div");
    			t8 = text("Email:\r\n            ");
    			input1 = element("input");
    			t9 = space();
    			div3 = element("div");
    			t10 = text(t10_value);
    			t11 = space();
    			p1 = element("p");
    			p1.textContent = "Scam Information:";
    			t13 = space();
    			div4 = element("div");
    			t14 = text("Scam Email:\r\n            ");
    			input2 = element("input");
    			t15 = space();
    			div5 = element("div");
    			t16 = text(t16_value);
    			t17 = space();
    			div7 = element("div");
    			t18 = text("Scam type:\r\n            ");
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
    			attr_dev(h1, "class", "svelte-1lk1nze");
    			add_location(h1, file$7, 92, 4, 3255);
    			attr_dev(p0, "id", "info");
    			attr_dev(p0, "class", "svelte-1lk1nze");
    			add_location(p0, file$7, 94, 8, 3372);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", "name-input");
    			attr_dev(input0, "class", "svelte-1lk1nze");
    			add_location(input0, file$7, 96, 12, 3449);
    			attr_dev(div0, "id", "name");
    			attr_dev(div0, "class", "svelte-1lk1nze");
    			add_location(div0, file$7, 95, 8, 3415);
    			attr_dev(div1, "class", "error svelte-1lk1nze");
    			add_location(div1, file$7, 98, 8, 3538);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "id", "email-input");
    			attr_dev(input1, "class", "svelte-1lk1nze");
    			add_location(input1, file$7, 100, 12, 3627);
    			attr_dev(div2, "id", "email");
    			attr_dev(div2, "class", "svelte-1lk1nze");
    			add_location(div2, file$7, 99, 8, 3591);
    			attr_dev(div3, "class", "error svelte-1lk1nze");
    			add_location(div3, file$7, 102, 8, 3715);
    			attr_dev(p1, "id", "scam-info");
    			attr_dev(p1, "class", "svelte-1lk1nze");
    			add_location(p1, file$7, 103, 8, 3766);
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "id", "scam-email-input");
    			attr_dev(input2, "class", "svelte-1lk1nze");
    			add_location(input2, file$7, 105, 12, 3861);
    			attr_dev(div4, "id", "scam-email");
    			attr_dev(div4, "class", "svelte-1lk1nze");
    			add_location(div4, file$7, 104, 8, 3815);
    			attr_dev(div5, "class", "error svelte-1lk1nze");
    			add_location(div5, file$7, 107, 8, 3959);
    			option.selected = true;
    			option.__value = "Pick the type of scam";
    			option.value = option.__value;
    			add_location(option, file$7, 111, 20, 4224);
    			attr_dev(select, "class", "select-picker svelte-1lk1nze");
    			attr_dev(select, "aria-label", "Default select example");
    			if (/*fields*/ ctx[0].type_of_scam === void 0) add_render_callback(() => /*select_change_handler*/ ctx[6].call(select));
    			add_location(select, file$7, 110, 16, 4103);
    			attr_dev(div6, "id", "type-container");
    			attr_dev(div6, "class", "svelte-1lk1nze");
    			add_location(div6, file$7, 109, 12, 4060);
    			attr_dev(div7, "id", "scam-type");
    			attr_dev(div7, "class", "svelte-1lk1nze");
    			add_location(div7, file$7, 108, 8, 4015);
    			attr_dev(div8, "class", "error svelte-1lk1nze");
    			add_location(div8, file$7, 118, 8, 4499);
    			attr_dev(button, "class", "btn btn-success svelte-1lk1nze");
    			attr_dev(button, "type", "submit");
    			add_location(button, file$7, 119, 8, 4557);
    			attr_dev(form, "id", "input-area");
    			attr_dev(form, "class", "svelte-1lk1nze");
    			add_location(form, file$7, 93, 4, 3299);
    			attr_dev(div9, "class", "body svelte-1lk1nze");
    			add_location(div9, file$7, 91, 0, 3231);
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
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Ticket', slots, []);

    	let fields = {
    		nameVar: Anonymous,
    		email: Anonymous,
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
    	var successSound = new Audio(sounds.success);
    	var errorSound = new Audio(sounds.error);

    	const validateEmail = email => {
    		return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    	};

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
    			if (!validateEmail(fields.scam_email.trim())) {
    				$$invalidate(1, errors.scam_email = 'Please put a valid email adress!', errors);
    				valid = false;
    			} else {
    				$$invalidate(1, errors.scam_email = '', errors);
    			}
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
    		} else {
    			errorSound.play();
    		}
    	};

    	function submitFields() {
    		for (let i = 0; i < data.length; i++) {
    			//If the scam email is already reported
    			if (fields.scam_email == data[i].email && scam_types[fields.type_of_scam].scam_name == data[i].type_of_scam) {
    				data[i].report_count++;
    				var toastLiveExample = document.getElementById('liveToastSuccess');
    				var toast = new bootstrap.Toast(toastLiveExample);
    				toast.show();
    				successSound.play();
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
    			commentLog: []
    		};

    		data.push(newData);
    		var toastLiveExample = document.getElementById('liveToastSuccess');
    		var toast = new bootstrap.Toast(toastLiveExample);
    		toast.show();
    		successSound.play();

    		$$invalidate(0, fields = {
    			nameVar: Anonymous,
    			email: Anonymous,
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
    		sounds,
    		Anonymous,
    		Toast,
    		fields,
    		errors,
    		valid,
    		successSound,
    		errorSound,
    		validateEmail,
    		submitHandler,
    		submitFields
    	});

    	$$self.$inject_state = $$props => {
    		if ('fields' in $$props) $$invalidate(0, fields = $$props.fields);
    		if ('errors' in $$props) $$invalidate(1, errors = $$props.errors);
    		if ('valid' in $$props) valid = $$props.valid;
    		if ('successSound' in $$props) successSound = $$props.successSound;
    		if ('errorSound' in $$props) errorSound = $$props.errorSound;
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
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ticket",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\Report.svelte generated by Svelte v3.47.0 */
    const file$6 = "src\\Report.svelte";

    function create_fragment$6(ctx) {
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
    			add_location(div, file$6, 6, 0, 169);
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
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Report",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\components\FAQs.svelte generated by Svelte v3.47.0 */
    const file$5 = "src\\components\\FAQs.svelte";

    function create_fragment$5(ctx) {
    	let div30;
    	let div2;
    	let h20;
    	let audio0;
    	let audio0_src_value;
    	let t0;
    	let button0;
    	let t2;
    	let div1;
    	let div0;
    	let t3_value = FAQ[0].answer + "";
    	let t3;
    	let t4;
    	let br0;
    	let br1;
    	let t5;
    	let t6_value = FAQ[0].answer1 + "";
    	let t6;
    	let t7;
    	let br2;
    	let t8;
    	let t9_value = FAQ[0].answer2 + "";
    	let t9;
    	let t10;
    	let br3;
    	let t11;
    	let t12_value = FAQ[0].answer3 + "";
    	let t12;
    	let t13;
    	let br4;
    	let t14;
    	let t15_value = FAQ[0].answer4 + "";
    	let t15;
    	let t16;
    	let br5;
    	let t17;
    	let t18_value = FAQ[0].answer5 + "";
    	let t18;
    	let t19;
    	let br6;
    	let t20;
    	let t21_value = FAQ[0].answer6 + "";
    	let t21;
    	let t22;
    	let div5;
    	let h21;
    	let audio1;
    	let audio1_src_value;
    	let t23;
    	let button1;
    	let t25;
    	let div4;
    	let div3;
    	let t26_value = FAQ[1].answer + "";
    	let t26;
    	let t27;
    	let br7;
    	let t28;
    	let t29_value = FAQ[1].answer1 + "";
    	let t29;
    	let t30;
    	let div8;
    	let h22;
    	let audio2;
    	let audio2_src_value;
    	let t31;
    	let button2;
    	let t33;
    	let div7;
    	let div6;
    	let t35;
    	let div11;
    	let h23;
    	let audio3;
    	let audio3_src_value;
    	let t36;
    	let button3;
    	let t38;
    	let div10;
    	let div9;
    	let t40;
    	let div14;
    	let h24;
    	let audio4;
    	let audio4_src_value;
    	let t41;
    	let button4;
    	let t43;
    	let div13;
    	let div12;
    	let t45;
    	let div17;
    	let h25;
    	let audio5;
    	let audio5_src_value;
    	let t46;
    	let button5;
    	let t48;
    	let div16;
    	let div15;
    	let t50;
    	let div20;
    	let h26;
    	let audio6;
    	let audio6_src_value;
    	let t51;
    	let button6;
    	let t53;
    	let div19;
    	let div18;
    	let t55;
    	let div23;
    	let h27;
    	let audio7;
    	let audio7_src_value;
    	let t56;
    	let button7;
    	let t58;
    	let div22;
    	let div21;
    	let t60;
    	let div26;
    	let h28;
    	let audio8;
    	let audio8_src_value;
    	let t61;
    	let button8;
    	let t63;
    	let div25;
    	let div24;
    	let t64_value = FAQ[8].answer + "";
    	let t64;
    	let t65;
    	let br8;
    	let t66;
    	let t67_value = FAQ[8].answer1 + "";
    	let t67;
    	let t68;
    	let div29;
    	let h29;
    	let audio9;
    	let audio9_src_value;
    	let t69;
    	let button9;
    	let t71;
    	let div28;
    	let div27;

    	const block = {
    		c: function create() {
    			div30 = element("div");
    			div2 = element("div");
    			h20 = element("h2");
    			audio0 = element("audio");
    			t0 = space();
    			button0 = element("button");
    			button0.textContent = `${FAQ[0].question}`;
    			t2 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			br0 = element("br");
    			br1 = element("br");
    			t5 = space();
    			t6 = text(t6_value);
    			t7 = space();
    			br2 = element("br");
    			t8 = space();
    			t9 = text(t9_value);
    			t10 = space();
    			br3 = element("br");
    			t11 = space();
    			t12 = text(t12_value);
    			t13 = space();
    			br4 = element("br");
    			t14 = space();
    			t15 = text(t15_value);
    			t16 = space();
    			br5 = element("br");
    			t17 = space();
    			t18 = text(t18_value);
    			t19 = space();
    			br6 = element("br");
    			t20 = space();
    			t21 = text(t21_value);
    			t22 = space();
    			div5 = element("div");
    			h21 = element("h2");
    			audio1 = element("audio");
    			t23 = space();
    			button1 = element("button");
    			button1.textContent = `${FAQ[1].question}`;
    			t25 = space();
    			div4 = element("div");
    			div3 = element("div");
    			t26 = text(t26_value);
    			t27 = space();
    			br7 = element("br");
    			t28 = space();
    			t29 = text(t29_value);
    			t30 = space();
    			div8 = element("div");
    			h22 = element("h2");
    			audio2 = element("audio");
    			t31 = space();
    			button2 = element("button");
    			button2.textContent = `${FAQ[2].question}`;
    			t33 = space();
    			div7 = element("div");
    			div6 = element("div");
    			div6.textContent = `${FAQ[2].answer}`;
    			t35 = space();
    			div11 = element("div");
    			h23 = element("h2");
    			audio3 = element("audio");
    			t36 = space();
    			button3 = element("button");
    			button3.textContent = `${FAQ[3].question}`;
    			t38 = space();
    			div10 = element("div");
    			div9 = element("div");
    			div9.textContent = `${FAQ[3].answer}`;
    			t40 = space();
    			div14 = element("div");
    			h24 = element("h2");
    			audio4 = element("audio");
    			t41 = space();
    			button4 = element("button");
    			button4.textContent = `${FAQ[4].question}`;
    			t43 = space();
    			div13 = element("div");
    			div12 = element("div");
    			div12.textContent = `${FAQ[4].answer}`;
    			t45 = space();
    			div17 = element("div");
    			h25 = element("h2");
    			audio5 = element("audio");
    			t46 = space();
    			button5 = element("button");
    			button5.textContent = `${FAQ[5].question}`;
    			t48 = space();
    			div16 = element("div");
    			div15 = element("div");
    			div15.textContent = `${FAQ[5].answer}`;
    			t50 = space();
    			div20 = element("div");
    			h26 = element("h2");
    			audio6 = element("audio");
    			t51 = space();
    			button6 = element("button");
    			button6.textContent = `${FAQ[6].question}`;
    			t53 = space();
    			div19 = element("div");
    			div18 = element("div");
    			div18.textContent = `${FAQ[6].answer}`;
    			t55 = space();
    			div23 = element("div");
    			h27 = element("h2");
    			audio7 = element("audio");
    			t56 = space();
    			button7 = element("button");
    			button7.textContent = `${FAQ[7].question}`;
    			t58 = space();
    			div22 = element("div");
    			div21 = element("div");
    			div21.textContent = `${FAQ[7].answer}`;
    			t60 = space();
    			div26 = element("div");
    			h28 = element("h2");
    			audio8 = element("audio");
    			t61 = space();
    			button8 = element("button");
    			button8.textContent = `${FAQ[8].question}`;
    			t63 = space();
    			div25 = element("div");
    			div24 = element("div");
    			t64 = text(t64_value);
    			t65 = space();
    			br8 = element("br");
    			t66 = space();
    			t67 = text(t67_value);
    			t68 = space();
    			div29 = element("div");
    			h29 = element("h2");
    			audio9 = element("audio");
    			t69 = space();
    			button9 = element("button");
    			button9.textContent = `${FAQ[9].question}`;
    			t71 = space();
    			div28 = element("div");
    			div27 = element("div");
    			div27.textContent = `${FAQ[9].answer}`;
    			attr_dev(audio0, "id", "sound1");
    			if (!src_url_equal(audio0.src, audio0_src_value = sounds.info)) attr_dev(audio0, "src", audio0_src_value);
    			attr_dev(audio0, "preload", "auto");
    			add_location(audio0, file$5, 7, 8, 212);
    			attr_dev(button0, "class", "accordion-button svelte-1hfeqoq");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "data-bs-toggle", "collapse");
    			attr_dev(button0, "data-bs-target", "#collapseOne");
    			attr_dev(button0, "aria-expanded", "true");
    			attr_dev(button0, "aria-controls", "collapseOne");
    			attr_dev(button0, "onclick", "document.getElementById('sound1').play();");
    			add_location(button0, file$5, 8, 8, 284);
    			attr_dev(h20, "class", "accordion-header");
    			attr_dev(h20, "id", "headingOne");
    			add_location(h20, file$5, 6, 6, 157);
    			add_location(br0, file$5, 14, 26, 802);
    			add_location(br1, file$5, 14, 30, 806);
    			add_location(br2, file$5, 15, 27, 839);
    			add_location(br3, file$5, 16, 27, 873);
    			add_location(br4, file$5, 17, 27, 907);
    			add_location(br5, file$5, 18, 27, 941);
    			add_location(br6, file$5, 19, 27, 975);
    			attr_dev(div0, "class", "accordion-body");
    			add_location(div0, file$5, 13, 8, 746);
    			attr_dev(div1, "id", "collapseOne");
    			set_style(div1, "--bs-bg-opacity", ".1");
    			attr_dev(div1, "class", "bg-primary bg-gradient accordion-collapse collapse show");
    			attr_dev(div1, "aria-labelledby", "headingOne");
    			attr_dev(div1, "data-bs-parent", "#accordionExample");
    			add_location(div1, file$5, 12, 6, 557);
    			attr_dev(div2, "class", "accordion-item");
    			add_location(div2, file$5, 5, 4, 121);
    			attr_dev(audio1, "id", "sound1");
    			if (!src_url_equal(audio1.src, audio1_src_value = sounds.info)) attr_dev(audio1, "src", audio1_src_value);
    			attr_dev(audio1, "preload", "auto");
    			add_location(audio1, file$5, 27, 12, 1154);
    			attr_dev(button1, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "data-bs-toggle", "collapse");
    			attr_dev(button1, "data-bs-target", "#collapseTwo");
    			attr_dev(button1, "aria-expanded", "false");
    			attr_dev(button1, "aria-controls", "collapseTwo");
    			attr_dev(button1, "onclick", "document.getElementById('sound1').play();");
    			add_location(button1, file$5, 28, 12, 1230);
    			attr_dev(h21, "class", "accordion-header");
    			attr_dev(h21, "id", "headingTwo");
    			add_location(h21, file$5, 26, 8, 1095);
    			add_location(br7, file$5, 34, 32, 1766);
    			attr_dev(div3, "class", "accordion-body");
    			add_location(div3, file$5, 33, 12, 1704);
    			attr_dev(div4, "id", "collapseTwo");
    			set_style(div4, "--bs-bg-opacity", ".1");
    			attr_dev(div4, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div4, "aria-labelledby", "headingTwo");
    			attr_dev(div4, "data-bs-parent", "#accordionExample");
    			add_location(div4, file$5, 32, 8, 1528);
    			attr_dev(div5, "class", "accordion-item");
    			add_location(div5, file$5, 25, 4, 1057);
    			attr_dev(audio2, "id", "sound1");
    			if (!src_url_equal(audio2.src, audio2_src_value = sounds.info)) attr_dev(audio2, "src", audio2_src_value);
    			attr_dev(audio2, "preload", "auto");
    			add_location(audio2, file$5, 42, 12, 1959);
    			attr_dev(button2, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "data-bs-toggle", "collapse");
    			attr_dev(button2, "data-bs-target", "#collapseThree");
    			attr_dev(button2, "aria-expanded", "false");
    			attr_dev(button2, "aria-controls", "collapseThree");
    			attr_dev(button2, "onclick", "document.getElementById('sound1').play();");
    			add_location(button2, file$5, 43, 12, 2035);
    			attr_dev(h22, "class", "accordion-header");
    			attr_dev(h22, "id", "headingThree");
    			add_location(h22, file$5, 41, 8, 1898);
    			attr_dev(div6, "class", "accordion-body");
    			add_location(div6, file$5, 48, 12, 2517);
    			attr_dev(div7, "id", "collapseThree");
    			set_style(div7, "--bs-bg-opacity", ".1");
    			attr_dev(div7, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div7, "aria-labelledby", "headingThree");
    			attr_dev(div7, "data-bs-parent", "#accordionExample");
    			add_location(div7, file$5, 47, 8, 2337);
    			attr_dev(div8, "class", "accordion-item");
    			add_location(div8, file$5, 40, 4, 1860);
    			attr_dev(audio3, "id", "sound1");
    			if (!src_url_equal(audio3.src, audio3_src_value = sounds.info)) attr_dev(audio3, "src", audio3_src_value);
    			attr_dev(audio3, "preload", "auto");
    			add_location(audio3, file$5, 56, 12, 2732);
    			attr_dev(button3, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button3, "type", "button");
    			attr_dev(button3, "data-bs-toggle", "collapse");
    			attr_dev(button3, "data-bs-target", "#collapseFour");
    			attr_dev(button3, "aria-expanded", "false");
    			attr_dev(button3, "aria-controls", "collapseFour");
    			attr_dev(button3, "onclick", "document.getElementById('sound1').play();");
    			add_location(button3, file$5, 57, 12, 2808);
    			attr_dev(h23, "class", "accordion-header");
    			attr_dev(h23, "id", "headingFour");
    			add_location(h23, file$5, 55, 8, 2672);
    			attr_dev(div9, "class", "accordion-body");
    			add_location(div9, file$5, 62, 12, 3286);
    			attr_dev(div10, "id", "collapseFour");
    			set_style(div10, "--bs-bg-opacity", ".1");
    			attr_dev(div10, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div10, "aria-labelledby", "headingFour");
    			attr_dev(div10, "data-bs-parent", "#accordionExample");
    			add_location(div10, file$5, 61, 8, 3108);
    			attr_dev(div11, "class", "accordion-item");
    			add_location(div11, file$5, 54, 4, 2634);
    			attr_dev(audio4, "id", "sound1");
    			if (!src_url_equal(audio4.src, audio4_src_value = sounds.info)) attr_dev(audio4, "src", audio4_src_value);
    			attr_dev(audio4, "preload", "auto");
    			add_location(audio4, file$5, 70, 12, 3501);
    			attr_dev(button4, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button4, "type", "button");
    			attr_dev(button4, "data-bs-toggle", "collapse");
    			attr_dev(button4, "data-bs-target", "#collapseFive");
    			attr_dev(button4, "aria-expanded", "false");
    			attr_dev(button4, "aria-controls", "collapseFive");
    			attr_dev(button4, "onclick", "document.getElementById('sound1').play();");
    			add_location(button4, file$5, 71, 12, 3577);
    			attr_dev(h24, "class", "accordion-header");
    			attr_dev(h24, "id", "headingFive");
    			add_location(h24, file$5, 69, 8, 3441);
    			attr_dev(div12, "class", "accordion-body");
    			add_location(div12, file$5, 76, 12, 4055);
    			attr_dev(div13, "id", "collapseFive");
    			set_style(div13, "--bs-bg-opacity", ".1");
    			attr_dev(div13, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div13, "aria-labelledby", "headingFive");
    			attr_dev(div13, "data-bs-parent", "#accordionExample");
    			add_location(div13, file$5, 75, 8, 3877);
    			attr_dev(div14, "class", "accordion-item");
    			add_location(div14, file$5, 68, 4, 3403);
    			attr_dev(audio5, "id", "sound1");
    			if (!src_url_equal(audio5.src, audio5_src_value = sounds.info)) attr_dev(audio5, "src", audio5_src_value);
    			attr_dev(audio5, "preload", "auto");
    			add_location(audio5, file$5, 84, 12, 4269);
    			attr_dev(button5, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button5, "type", "button");
    			attr_dev(button5, "data-bs-toggle", "collapse");
    			attr_dev(button5, "data-bs-target", "#collapseSix");
    			attr_dev(button5, "aria-expanded", "false");
    			attr_dev(button5, "aria-controls", "collapseSix");
    			attr_dev(button5, "onclick", "document.getElementById('sound1').play();");
    			add_location(button5, file$5, 85, 12, 4345);
    			attr_dev(h25, "class", "accordion-header");
    			attr_dev(h25, "id", "headingSix");
    			add_location(h25, file$5, 83, 8, 4210);
    			attr_dev(div15, "class", "accordion-body");
    			add_location(div15, file$5, 90, 12, 4819);
    			attr_dev(div16, "id", "collapseSix");
    			set_style(div16, "--bs-bg-opacity", ".1");
    			attr_dev(div16, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div16, "aria-labelledby", "headingSix");
    			attr_dev(div16, "data-bs-parent", "#accordionExample");
    			add_location(div16, file$5, 89, 8, 4643);
    			attr_dev(div17, "class", "accordion-item");
    			add_location(div17, file$5, 82, 4, 4172);
    			attr_dev(audio6, "id", "sound1");
    			if (!src_url_equal(audio6.src, audio6_src_value = sounds.info)) attr_dev(audio6, "src", audio6_src_value);
    			attr_dev(audio6, "preload", "auto");
    			add_location(audio6, file$5, 98, 12, 5035);
    			attr_dev(button6, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button6, "type", "button");
    			attr_dev(button6, "data-bs-toggle", "collapse");
    			attr_dev(button6, "data-bs-target", "#collapseSeven");
    			attr_dev(button6, "aria-expanded", "false");
    			attr_dev(button6, "aria-controls", "collapseSeven");
    			attr_dev(button6, "onclick", "document.getElementById('sound1').play();");
    			add_location(button6, file$5, 99, 12, 5111);
    			attr_dev(h26, "class", "accordion-header");
    			attr_dev(h26, "id", "headingSeven");
    			add_location(h26, file$5, 97, 8, 4974);
    			attr_dev(div18, "class", "accordion-body");
    			add_location(div18, file$5, 104, 12, 5593);
    			attr_dev(div19, "id", "collapseSeven");
    			set_style(div19, "--bs-bg-opacity", ".1");
    			attr_dev(div19, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div19, "aria-labelledby", "headingSeven");
    			attr_dev(div19, "data-bs-parent", "#accordionExample");
    			add_location(div19, file$5, 103, 8, 5413);
    			attr_dev(div20, "class", "accordion-item");
    			add_location(div20, file$5, 96, 4, 4936);
    			attr_dev(audio7, "id", "sound1");
    			if (!src_url_equal(audio7.src, audio7_src_value = sounds.info)) attr_dev(audio7, "src", audio7_src_value);
    			attr_dev(audio7, "preload", "auto");
    			add_location(audio7, file$5, 112, 12, 5809);
    			attr_dev(button7, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button7, "type", "button");
    			attr_dev(button7, "data-bs-toggle", "collapse");
    			attr_dev(button7, "data-bs-target", "#collapseEight");
    			attr_dev(button7, "aria-expanded", "false");
    			attr_dev(button7, "aria-controls", "collapseEight");
    			attr_dev(button7, "onclick", "document.getElementById('sound1').play();");
    			add_location(button7, file$5, 113, 12, 5885);
    			attr_dev(h27, "class", "accordion-header");
    			attr_dev(h27, "id", "headingSeven");
    			add_location(h27, file$5, 111, 8, 5748);
    			attr_dev(div21, "class", "accordion-body");
    			add_location(div21, file$5, 118, 12, 6367);
    			attr_dev(div22, "id", "collapseEight");
    			set_style(div22, "--bs-bg-opacity", ".1");
    			attr_dev(div22, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div22, "aria-labelledby", "headingSeven");
    			attr_dev(div22, "data-bs-parent", "#accordionExample");
    			add_location(div22, file$5, 117, 8, 6187);
    			attr_dev(div23, "class", "accordion-item");
    			add_location(div23, file$5, 110, 4, 5710);
    			attr_dev(audio8, "id", "sound1");
    			if (!src_url_equal(audio8.src, audio8_src_value = sounds.info)) attr_dev(audio8, "src", audio8_src_value);
    			attr_dev(audio8, "preload", "auto");
    			add_location(audio8, file$5, 126, 12, 6583);
    			attr_dev(button8, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button8, "type", "button");
    			attr_dev(button8, "data-bs-toggle", "collapse");
    			attr_dev(button8, "data-bs-target", "#collapseNine");
    			attr_dev(button8, "aria-expanded", "false");
    			attr_dev(button8, "aria-controls", "collapseNine");
    			attr_dev(button8, "onclick", "document.getElementById('sound1').play();");
    			add_location(button8, file$5, 127, 12, 6659);
    			attr_dev(h28, "class", "accordion-header");
    			attr_dev(h28, "id", "headingSeven");
    			add_location(h28, file$5, 125, 8, 6522);
    			add_location(br8, file$5, 133, 32, 7200);
    			attr_dev(div24, "class", "accordion-body");
    			add_location(div24, file$5, 132, 12, 7138);
    			attr_dev(div25, "id", "collapseNine");
    			set_style(div25, "--bs-bg-opacity", ".1");
    			attr_dev(div25, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div25, "aria-labelledby", "headingSeven");
    			attr_dev(div25, "data-bs-parent", "#accordionExample");
    			add_location(div25, file$5, 131, 8, 6959);
    			attr_dev(div26, "class", "accordion-item");
    			add_location(div26, file$5, 124, 4, 6484);
    			attr_dev(audio9, "id", "sound1");
    			if (!src_url_equal(audio9.src, audio9_src_value = sounds.info)) attr_dev(audio9, "src", audio9_src_value);
    			attr_dev(audio9, "preload", "auto");
    			add_location(audio9, file$5, 141, 12, 7393);
    			attr_dev(button9, "class", "accordion-button collapsed svelte-1hfeqoq");
    			attr_dev(button9, "type", "button");
    			attr_dev(button9, "data-bs-toggle", "collapse");
    			attr_dev(button9, "data-bs-target", "#collapseTen");
    			attr_dev(button9, "aria-expanded", "false");
    			attr_dev(button9, "aria-controls", "collapseTen");
    			attr_dev(button9, "onclick", "document.getElementById('sound1').play();");
    			add_location(button9, file$5, 142, 12, 7469);
    			attr_dev(h29, "class", "accordion-header");
    			attr_dev(h29, "id", "headingSeven");
    			add_location(h29, file$5, 140, 8, 7332);
    			attr_dev(div27, "class", "accordion-body");
    			add_location(div27, file$5, 147, 12, 7945);
    			attr_dev(div28, "id", "collapseTen");
    			set_style(div28, "--bs-bg-opacity", ".1");
    			attr_dev(div28, "class", "bg-primary accordion-collapse collapse");
    			attr_dev(div28, "aria-labelledby", "headingSeven");
    			attr_dev(div28, "data-bs-parent", "#accordionExample");
    			add_location(div28, file$5, 146, 8, 7767);
    			attr_dev(div29, "class", "accordion-item");
    			add_location(div29, file$5, 139, 4, 7294);
    			attr_dev(div30, "class", "accordion svelte-1hfeqoq");
    			attr_dev(div30, "id", "accordionExample");
    			add_location(div30, file$5, 4, 0, 70);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div30, anchor);
    			append_dev(div30, div2);
    			append_dev(div2, h20);
    			append_dev(h20, audio0);
    			append_dev(h20, t0);
    			append_dev(h20, button0);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div0, br0);
    			append_dev(div0, br1);
    			append_dev(div0, t5);
    			append_dev(div0, t6);
    			append_dev(div0, t7);
    			append_dev(div0, br2);
    			append_dev(div0, t8);
    			append_dev(div0, t9);
    			append_dev(div0, t10);
    			append_dev(div0, br3);
    			append_dev(div0, t11);
    			append_dev(div0, t12);
    			append_dev(div0, t13);
    			append_dev(div0, br4);
    			append_dev(div0, t14);
    			append_dev(div0, t15);
    			append_dev(div0, t16);
    			append_dev(div0, br5);
    			append_dev(div0, t17);
    			append_dev(div0, t18);
    			append_dev(div0, t19);
    			append_dev(div0, br6);
    			append_dev(div0, t20);
    			append_dev(div0, t21);
    			append_dev(div30, t22);
    			append_dev(div30, div5);
    			append_dev(div5, h21);
    			append_dev(h21, audio1);
    			append_dev(h21, t23);
    			append_dev(h21, button1);
    			append_dev(div5, t25);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, t26);
    			append_dev(div3, t27);
    			append_dev(div3, br7);
    			append_dev(div3, t28);
    			append_dev(div3, t29);
    			append_dev(div30, t30);
    			append_dev(div30, div8);
    			append_dev(div8, h22);
    			append_dev(h22, audio2);
    			append_dev(h22, t31);
    			append_dev(h22, button2);
    			append_dev(div8, t33);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div30, t35);
    			append_dev(div30, div11);
    			append_dev(div11, h23);
    			append_dev(h23, audio3);
    			append_dev(h23, t36);
    			append_dev(h23, button3);
    			append_dev(div11, t38);
    			append_dev(div11, div10);
    			append_dev(div10, div9);
    			append_dev(div30, t40);
    			append_dev(div30, div14);
    			append_dev(div14, h24);
    			append_dev(h24, audio4);
    			append_dev(h24, t41);
    			append_dev(h24, button4);
    			append_dev(div14, t43);
    			append_dev(div14, div13);
    			append_dev(div13, div12);
    			append_dev(div30, t45);
    			append_dev(div30, div17);
    			append_dev(div17, h25);
    			append_dev(h25, audio5);
    			append_dev(h25, t46);
    			append_dev(h25, button5);
    			append_dev(div17, t48);
    			append_dev(div17, div16);
    			append_dev(div16, div15);
    			append_dev(div30, t50);
    			append_dev(div30, div20);
    			append_dev(div20, h26);
    			append_dev(h26, audio6);
    			append_dev(h26, t51);
    			append_dev(h26, button6);
    			append_dev(div20, t53);
    			append_dev(div20, div19);
    			append_dev(div19, div18);
    			append_dev(div30, t55);
    			append_dev(div30, div23);
    			append_dev(div23, h27);
    			append_dev(h27, audio7);
    			append_dev(h27, t56);
    			append_dev(h27, button7);
    			append_dev(div23, t58);
    			append_dev(div23, div22);
    			append_dev(div22, div21);
    			append_dev(div30, t60);
    			append_dev(div30, div26);
    			append_dev(div26, h28);
    			append_dev(h28, audio8);
    			append_dev(h28, t61);
    			append_dev(h28, button8);
    			append_dev(div26, t63);
    			append_dev(div26, div25);
    			append_dev(div25, div24);
    			append_dev(div24, t64);
    			append_dev(div24, t65);
    			append_dev(div24, br8);
    			append_dev(div24, t66);
    			append_dev(div24, t67);
    			append_dev(div30, t68);
    			append_dev(div30, div29);
    			append_dev(div29, h29);
    			append_dev(h29, audio9);
    			append_dev(h29, t69);
    			append_dev(h29, button9);
    			append_dev(div29, t71);
    			append_dev(div29, div28);
    			append_dev(div28, div27);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div30);
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
    	validate_slots('FAQs', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FAQs> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ FAQ, sounds });
    	return [];
    }

    class FAQs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FAQs",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\FAQs.svelte generated by Svelte v3.47.0 */
    const file$4 = "src\\FAQs.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let header;
    	let t0;
    	let h1;
    	let t2;
    	let faqs;
    	let current;

    	header = new Header({
    			props: { current: router_names.FAQs },
    			$$inline: true
    		});

    	faqs = new FAQs({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(header.$$.fragment);
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "Frequently Asked Questions";
    			t2 = space();
    			create_component(faqs.$$.fragment);
    			attr_dev(h1, "id", "FAQHeader");
    			attr_dev(h1, "class", "svelte-ib8yls");
    			add_location(h1, file$4, 8, 1, 216);
    			add_location(div, file$4, 6, 0, 164);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(header, div, null);
    			append_dev(div, t0);
    			append_dev(div, h1);
    			append_dev(div, t2);
    			mount_component(faqs, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(faqs.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(faqs.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(header);
    			destroy_component(faqs);
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

    	$$self.$capture_state = () => ({ router_names, Header, FAQs });
    	return [];
    }

    class FAQs_1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FAQs_1",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\Emails.svelte generated by Svelte v3.47.0 */

    const { console: console_1$1 } = globals;
    const file$3 = "src\\components\\Emails.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    // (88:8) {#each column_names as column}
    function create_each_block_1(ctx) {
    	let td;
    	let t0_value = /*column*/ ctx[18] + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			td = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(td, "class", "svelte-ne7ugy");
    			add_location(td, file$3, 88, 10, 2272);
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
    		source: "(88:8) {#each column_names as column}",
    		ctx
    	});

    	return block;
    }

    // (99:8) <Link            class="navbar-brand fs-1 text-decoration-none"            to={router_names.report}          >
    function create_default_slot$2(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "+ Report";
    			attr_dev(button, "class", "btn btn-success svelte-ne7ugy");
    			attr_dev(button, "type", "submit");
    			add_location(button, file$3, 102, 10, 2650);
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
    		source: "(99:8) <Link            class=\\\"navbar-brand fs-1 text-decoration-none\\\"            to={router_names.report}          >",
    		ctx
    	});

    	return block;
    }

    // (112:4) {#each commentData as comment (comment.id)}
    function create_each_block(key_1, ctx) {
    	let div2;
    	let div0;
    	let span0;
    	let t0_value = /*comment*/ ctx[15].username + "";
    	let t0;
    	let t1;
    	let div1;
    	let span1;
    	let t2_value = /*comment*/ ctx[15].comment + "";
    	let t2;
    	let t3;
    	let div2_intro;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			span1 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(span0, "class", "btn btn-primary svelte-ne7ugy");
    			add_location(span0, file$3, 113, 13, 2970);
    			add_location(div0, file$3, 113, 8, 2965);
    			attr_dev(span1, "id", "comments");
    			attr_dev(span1, "class", "btn btn-primary svelte-ne7ugy");
    			add_location(span1, file$3, 115, 8, 3055);
    			add_location(div1, file$3, 114, 6, 3040);
    			add_location(div2, file$3, 112, 6, 2941);
    			this.first = div2;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, span1);
    			append_dev(span1, t2);
    			append_dev(div2, t3);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*commentData*/ 1 && t0_value !== (t0_value = /*comment*/ ctx[15].username + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*commentData*/ 1 && t2_value !== (t2_value = /*comment*/ ctx[15].comment + "")) set_data_dev(t2, t2_value);
    		},
    		i: function intro(local) {
    			if (!div2_intro) {
    				add_render_callback(() => {
    					div2_intro = create_in_transition(div2, fade, {});
    					div2_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(112:4) {#each commentData as comment (comment.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div8;
    	let table;
    	let thead;
    	let tr0;
    	let t0;
    	let tbody;
    	let tr1;
    	let th0;
    	let t1_value = /*emailData*/ ctx[1].email + "";
    	let t1;
    	let t2;
    	let th1;
    	let t3_value = /*emailData*/ ctx[1].type_of_scam + "";
    	let t3;
    	let t4;
    	let th2;
    	let t5_value = /*emailData*/ ctx[1].report_count + "";
    	let t5;
    	let t6;
    	let th3;
    	let t7_value = /*emailData*/ ctx[1].first + "";
    	let t7;
    	let t8;
    	let link;
    	let t9;
    	let h4;
    	let t11;
    	let div0;
    	let each_blocks = [];
    	let each1_lookup = new Map();
    	let t12;
    	let div7;
    	let form;
    	let button;
    	let t14;
    	let div4;
    	let div1;
    	let t15;
    	let input0;
    	let t16;
    	let div2;
    	let t17_value = /*errors*/ ctx[3].email + "";
    	let t17;
    	let t18;
    	let div3;
    	let t19;
    	let input1;
    	let t20;
    	let div5;
    	let t21_value = /*errors*/ ctx[3].username + "";
    	let t21;
    	let t22;
    	let label;
    	let t24;
    	let textarea;
    	let t25;
    	let div6;
    	let t26_value = /*errors*/ ctx[3].comment + "";
    	let t26;
    	let t27;
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

    	let each_value = /*commentData*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*comment*/ ctx[15].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	toast = new Toast({
    			props: { title: "Comment Added", success: true },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div8 = element("div");
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
    			h4 = element("h4");
    			h4.textContent = "Comments";
    			t11 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t12 = space();
    			div7 = element("div");
    			form = element("form");
    			button = element("button");
    			button.textContent = "Add a comment";
    			t14 = space();
    			div4 = element("div");
    			div1 = element("div");
    			t15 = text("Email:\r\n          ");
    			input0 = element("input");
    			t16 = space();
    			div2 = element("div");
    			t17 = text(t17_value);
    			t18 = space();
    			div3 = element("div");
    			t19 = text("Username:\r\n          ");
    			input1 = element("input");
    			t20 = space();
    			div5 = element("div");
    			t21 = text(t21_value);
    			t22 = space();
    			label = element("label");
    			label.textContent = "Comments: (required)";
    			t24 = space();
    			textarea = element("textarea");
    			t25 = space();
    			div6 = element("div");
    			t26 = text(t26_value);
    			t27 = space();
    			create_component(toast.$$.fragment);
    			add_location(tr0, file$3, 86, 6, 2216);
    			add_location(thead, file$3, 85, 4, 2201);
    			attr_dev(th0, "class", "svelte-ne7ugy");
    			add_location(th0, file$3, 94, 8, 2370);
    			attr_dev(th1, "class", "svelte-ne7ugy");
    			add_location(th1, file$3, 95, 8, 2406);
    			attr_dev(th2, "class", "svelte-ne7ugy");
    			add_location(th2, file$3, 96, 8, 2449);
    			attr_dev(th3, "class", "svelte-ne7ugy");
    			add_location(th3, file$3, 97, 8, 2492);
    			add_location(tr1, file$3, 93, 6, 2356);
    			add_location(tbody, file$3, 92, 4, 2341);
    			attr_dev(table, "class", "table table-borderless svelte-ne7ugy");
    			add_location(table, file$3, 84, 2, 2157);
    			attr_dev(h4, "class", "svelte-ne7ugy");
    			add_location(h4, file$3, 109, 2, 2799);
    			attr_dev(div0, "id", "com_container");
    			attr_dev(div0, "class", "overflow-scroll card sticky-top svelte-ne7ugy");
    			add_location(div0, file$3, 110, 2, 2820);
    			attr_dev(button, "class", "btn btn-success comment_button svelte-ne7ugy");
    			attr_dev(button, "type", "submit");
    			add_location(button, file$3, 122, 6, 3282);
    			attr_dev(input0, "class", "input text-white svelte-ne7ugy");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", "email-input");
    			add_location(input0, file$3, 128, 10, 3470);
    			attr_dev(div1, "id", "email");
    			add_location(div1, file$3, 126, 8, 3424);
    			attr_dev(div2, "class", "error svelte-ne7ugy");
    			add_location(div2, file$3, 135, 8, 3648);
    			attr_dev(input1, "class", "input text-white svelte-ne7ugy");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "id", "username-input");
    			add_location(input1, file$3, 138, 10, 3749);
    			attr_dev(div3, "id", "username");
    			attr_dev(div3, "class", "svelte-ne7ugy");
    			add_location(div3, file$3, 136, 8, 3697);
    			attr_dev(div4, "class", "container svelte-ne7ugy");
    			add_location(div4, file$3, 125, 6, 3391);
    			attr_dev(div5, "class", "error svelte-ne7ugy");
    			add_location(div5, file$3, 146, 6, 3945);
    			attr_dev(label, "for", "comment-input");
    			attr_dev(label, "class", "svelte-ne7ugy");
    			add_location(label, file$3, 147, 6, 3995);
    			attr_dev(textarea, "class", "comment-input text-white svelte-ne7ugy");
    			attr_dev(textarea, "type", "text");
    			attr_dev(textarea, "id", "comment-input");
    			add_location(textarea, file$3, 148, 6, 4060);
    			attr_dev(div6, "class", "error svelte-ne7ugy");
    			add_location(div6, file$3, 154, 6, 4215);
    			attr_dev(form, "id", "input-area");
    			add_location(form, file$3, 121, 4, 3211);
    			attr_dev(div7, "class", "formContainer svelte-ne7ugy");
    			add_location(div7, file$3, 120, 2, 3178);
    			attr_dev(div8, "class", "body svelte-ne7ugy");
    			add_location(div8, file$3, 83, 0, 2135);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, table);
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
    			append_dev(div8, t9);
    			append_dev(div8, h4);
    			append_dev(div8, t11);
    			append_dev(div8, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div8, t12);
    			append_dev(div8, div7);
    			append_dev(div7, form);
    			append_dev(form, button);
    			append_dev(form, t14);
    			append_dev(form, div4);
    			append_dev(div4, div1);
    			append_dev(div1, t15);
    			append_dev(div1, input0);
    			set_input_value(input0, /*fields*/ ctx[2].email);
    			append_dev(div4, t16);
    			append_dev(div4, div2);
    			append_dev(div2, t17);
    			append_dev(div4, t18);
    			append_dev(div4, div3);
    			append_dev(div3, t19);
    			append_dev(div3, input1);
    			set_input_value(input1, /*fields*/ ctx[2].username);
    			append_dev(form, t20);
    			append_dev(form, div5);
    			append_dev(div5, t21);
    			append_dev(form, t22);
    			append_dev(form, label);
    			append_dev(form, t24);
    			append_dev(form, textarea);
    			set_input_value(textarea, /*fields*/ ctx[2].comment);
    			append_dev(form, t25);
    			append_dev(form, div6);
    			append_dev(div6, t26);
    			append_dev(div8, t27);
    			mount_component(toast, div8, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[7]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[8]),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[9]),
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

    			if ((!current || dirty & /*emailData*/ 2) && t1_value !== (t1_value = /*emailData*/ ctx[1].email + "")) set_data_dev(t1, t1_value);
    			if ((!current || dirty & /*emailData*/ 2) && t3_value !== (t3_value = /*emailData*/ ctx[1].type_of_scam + "")) set_data_dev(t3, t3_value);
    			if ((!current || dirty & /*emailData*/ 2) && t5_value !== (t5_value = /*emailData*/ ctx[1].report_count + "")) set_data_dev(t5, t5_value);
    			if ((!current || dirty & /*emailData*/ 2) && t7_value !== (t7_value = /*emailData*/ ctx[1].first + "")) set_data_dev(t7, t7_value);
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 2097152) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (dirty & /*commentData*/ 1) {
    				each_value = /*commentData*/ ctx[0];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each1_lookup, div0, destroy_block, create_each_block, null, get_each_context);
    			}

    			if (dirty & /*fields*/ 4 && input0.value !== /*fields*/ ctx[2].email) {
    				set_input_value(input0, /*fields*/ ctx[2].email);
    			}

    			if ((!current || dirty & /*errors*/ 8) && t17_value !== (t17_value = /*errors*/ ctx[3].email + "")) set_data_dev(t17, t17_value);

    			if (dirty & /*fields*/ 4 && input1.value !== /*fields*/ ctx[2].username) {
    				set_input_value(input1, /*fields*/ ctx[2].username);
    			}

    			if ((!current || dirty & /*errors*/ 8) && t21_value !== (t21_value = /*errors*/ ctx[3].username + "")) set_data_dev(t21, t21_value);

    			if (dirty & /*fields*/ 4) {
    				set_input_value(textarea, /*fields*/ ctx[2].comment);
    			}

    			if ((!current || dirty & /*errors*/ 8) && t26_value !== (t26_value = /*errors*/ ctx[3].comment + "")) set_data_dev(t26, t26_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(toast.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			transition_out(toast.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    			destroy_each(each_blocks_1, detaching);
    			destroy_component(link);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

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
    	let { id } = $$props;
    	let { emailData } = $$props;
    	let { commentData } = $$props;
    	var successSound = new Audio(sounds.success);
    	var warningSound = new Audio(sounds.warning);
    	const column_names = ["Email", "Type of Scam", "Number of Reports", "First Occurance"];

    	let fields = {
    		email: Anonymous,
    		username: Anonymous,
    		comment: ""
    	};

    	let errors = { email: "", username: "", comment: "" };
    	let valid = false;

    	const submitHandler = () => {
    		valid = true;

    		//Email field
    		if (fields.email.trim().length == 0) {
    			$$invalidate(2, fields.email = Anonymous, fields);
    		}

    		//username field
    		if (fields.username.trim().length == 0) {
    			$$invalidate(2, fields.username = Anonymous, fields);
    		}

    		//Comments field
    		if (fields.comment.trim().length == 0) {
    			valid = false;
    			$$invalidate(3, errors.comment = "Comment can not be left empty!!", errors);
    		} else {
    			$$invalidate(3, errors.comment = "", errors);
    		}

    		if (valid) {
    			submitFields();
    		} else {
    			warningSound.play();
    		}
    	};

    	function submitFields() {
    		//If the scam email is not reported
    		const newData = {
    			id: Math.random().toString(16).slice(2),
    			username: fields.username,
    			email: fields.email,
    			comment: fields.comment
    		};

    		// commentData.push(newData);
    		$$invalidate(0, commentData = [newData, ...commentData]);

    		const index = data.findIndex(d => d.id === parseInt(id));

    		if (index !== -1) {
    			data[index].commentLog = commentData;
    		}

    		console.log(newData);
    		var toastLiveExample = document.getElementById("liveToastSuccess");
    		var toast = new bootstrap.Toast(toastLiveExample);
    		toast.show();
    		successSound.play();

    		$$invalidate(2, fields = {
    			email: Anonymous,
    			username: Anonymous,
    			comment: ""
    		});
    	}

    	const writable_props = ['id', 'emailData', 'commentData'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Emails> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		fields.email = this.value;
    		$$invalidate(2, fields);
    	}

    	function input1_input_handler() {
    		fields.username = this.value;
    		$$invalidate(2, fields);
    	}

    	function textarea_input_handler() {
    		fields.comment = this.value;
    		$$invalidate(2, fields);
    	}

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(6, id = $$props.id);
    		if ('emailData' in $$props) $$invalidate(1, emailData = $$props.emailData);
    		if ('commentData' in $$props) $$invalidate(0, commentData = $$props.commentData);
    	};

    	$$self.$capture_state = () => ({
    		router_names,
    		sounds,
    		navigate,
    		Link,
    		Anonymous,
    		data,
    		fade,
    		Toast,
    		id,
    		emailData,
    		commentData,
    		successSound,
    		warningSound,
    		column_names,
    		fields,
    		errors,
    		valid,
    		submitHandler,
    		submitFields
    	});

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(6, id = $$props.id);
    		if ('emailData' in $$props) $$invalidate(1, emailData = $$props.emailData);
    		if ('commentData' in $$props) $$invalidate(0, commentData = $$props.commentData);
    		if ('successSound' in $$props) successSound = $$props.successSound;
    		if ('warningSound' in $$props) warningSound = $$props.warningSound;
    		if ('fields' in $$props) $$invalidate(2, fields = $$props.fields);
    		if ('errors' in $$props) $$invalidate(3, errors = $$props.errors);
    		if ('valid' in $$props) valid = $$props.valid;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		commentData,
    		emailData,
    		fields,
    		errors,
    		column_names,
    		submitHandler,
    		id,
    		input0_input_handler,
    		input1_input_handler,
    		textarea_input_handler
    	];
    }

    class Emails extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { id: 6, emailData: 1, commentData: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Emails",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[6] === undefined && !('id' in props)) {
    			console_1$1.warn("<Emails> was created without expected prop 'id'");
    		}

    		if (/*emailData*/ ctx[1] === undefined && !('emailData' in props)) {
    			console_1$1.warn("<Emails> was created without expected prop 'emailData'");
    		}

    		if (/*commentData*/ ctx[0] === undefined && !('commentData' in props)) {
    			console_1$1.warn("<Emails> was created without expected prop 'commentData'");
    		}
    	}

    	get id() {
    		throw new Error("<Emails>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Emails>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
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

    /* src\Email.svelte generated by Svelte v3.47.0 */
    const file$2 = "src\\Email.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let header;
    	let t;
    	let emails;
    	let updating_id;
    	let updating_emailData;
    	let updating_commentData;
    	let current;

    	header = new Header({
    			props: {
    				current: "" + (router_names.email + "/" + /*id*/ ctx[0])
    			},
    			$$inline: true
    		});

    	function emails_id_binding(value) {
    		/*emails_id_binding*/ ctx[3](value);
    	}

    	function emails_emailData_binding(value) {
    		/*emails_emailData_binding*/ ctx[4](value);
    	}

    	function emails_commentData_binding(value) {
    		/*emails_commentData_binding*/ ctx[5](value);
    	}

    	let emails_props = {};

    	if (/*id*/ ctx[0] !== void 0) {
    		emails_props.id = /*id*/ ctx[0];
    	}

    	if (/*emailData*/ ctx[1] !== void 0) {
    		emails_props.emailData = /*emailData*/ ctx[1];
    	}

    	if (/*commentData*/ ctx[2] !== void 0) {
    		emails_props.commentData = /*commentData*/ ctx[2];
    	}

    	emails = new Emails({ props: emails_props, $$inline: true });
    	binding_callbacks.push(() => bind(emails, 'id', emails_id_binding));
    	binding_callbacks.push(() => bind(emails, 'emailData', emails_emailData_binding));
    	binding_callbacks.push(() => bind(emails, 'commentData', emails_commentData_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(header.$$.fragment);
    			t = space();
    			create_component(emails.$$.fragment);
    			add_location(div, file$2, 12, 0, 393);
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
    			if (dirty & /*id*/ 1) header_changes.current = "" + (router_names.email + "/" + /*id*/ ctx[0]);
    			header.$set(header_changes);
    			const emails_changes = {};

    			if (!updating_id && dirty & /*id*/ 1) {
    				updating_id = true;
    				emails_changes.id = /*id*/ ctx[0];
    				add_flush_callback(() => updating_id = false);
    			}

    			if (!updating_emailData && dirty & /*emailData*/ 2) {
    				updating_emailData = true;
    				emails_changes.emailData = /*emailData*/ ctx[1];
    				add_flush_callback(() => updating_emailData = false);
    			}

    			if (!updating_commentData && dirty & /*commentData*/ 4) {
    				updating_commentData = true;
    				emails_changes.commentData = /*commentData*/ ctx[2];
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
    	let { id } = $$props;
    	let { emailData = data.find(d => d.id == id) } = $$props;
    	let { commentData = emailData.commentLog } = $$props;
    	const writable_props = ['id', 'emailData', 'commentData'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Email> was created with unknown prop '${key}'`);
    	});

    	function emails_id_binding(value) {
    		id = value;
    		$$invalidate(0, id);
    	}

    	function emails_emailData_binding(value) {
    		emailData = value;
    		$$invalidate(1, emailData);
    	}

    	function emails_commentData_binding(value) {
    		commentData = value;
    		$$invalidate(2, commentData);
    	}

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('emailData' in $$props) $$invalidate(1, emailData = $$props.emailData);
    		if ('commentData' in $$props) $$invalidate(2, commentData = $$props.commentData);
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
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('emailData' in $$props) $$invalidate(1, emailData = $$props.emailData);
    		if ('commentData' in $$props) $$invalidate(2, commentData = $$props.commentData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		id,
    		emailData,
    		commentData,
    		emails_id_binding,
    		emails_emailData_binding,
    		emails_commentData_binding
    	];
    }

    class Email extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { id: 0, emailData: 1, commentData: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Email",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[0] === undefined && !('id' in props)) {
    			console.warn("<Email> was created without expected prop 'id'");
    		}
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

    /* src\NotFound.svelte generated by Svelte v3.47.0 */
    const file$1 = "src\\NotFound.svelte";

    // (17:8) <Link to="{router_names.home}" >
    function create_default_slot$1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Go Home";
    			attr_dev(div, "class", "svelte-vlaq4o");
    			add_location(div, file$1, 16, 40, 570);
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
    			add_location(h1, file$1, 6, 0, 112);
    			attr_dev(iframe, "title", "404");
    			if (!src_url_equal(iframe.src, iframe_src_value = "https://giphy.com/embed/H54feNXf6i4eAQubud")) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "width", "100%");
    			attr_dev(iframe, "height", "100%");
    			set_style(iframe, "position", "absolute");
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "class", "giphy-embed");
    			iframe.allowFullscreen = true;
    			add_location(iframe, file$1, 10, 8, 268);
    			set_style(div0, "width", "100%");
    			set_style(div0, "height", "0");
    			set_style(div0, "padding-bottom", "84%");
    			set_style(div0, "position", "relative");
    			attr_dev(div0, "class", "svelte-vlaq4o");
    			add_location(div0, file$1, 9, 4, 187);
    			attr_dev(div1, "class", "center svelte-vlaq4o");
    			add_location(div1, file$1, 8, 0, 161);
    			attr_dev(button, "class", "a btn btn-success btn-lg svelte-vlaq4o");
    			add_location(button, file$1, 15, 4, 486);
    			attr_dev(div2, "class", "svelte-vlaq4o");
    			add_location(div2, file$1, 14, 0, 475);
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

    /* src\App.svelte generated by Svelte v3.47.0 */

    const { console: console_1 } = globals;
    const file = "src\\App.svelte";

    // (20:3) <Route path="{router_names.email}/:id" let:params >
    function create_default_slot_2(ctx) {
    	let email;
    	let current;

    	email = new Email({
    			props: { id: /*params*/ ctx[3].id },
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
    			if (dirty & /*params*/ 8) email_changes.id = /*params*/ ctx[3].id;
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
    		source: "(20:3) <Route path=\\\"{router_names.email}/:id\\\" let:params >",
    		ctx
    	});

    	return block;
    }

    // (25:3) <Route path="/" >
    function create_default_slot_1(ctx) {
    	let home;
    	let updating_hereFirstTime;
    	let current;

    	function home_hereFirstTime_binding(value) {
    		/*home_hereFirstTime_binding*/ ctx[2](value);
    	}

    	let home_props = { search_email: "" };

    	if (/*hereFirstTime*/ ctx[1] !== void 0) {
    		home_props.hereFirstTime = /*hereFirstTime*/ ctx[1];
    	}

    	home = new Home({ props: home_props, $$inline: true });
    	binding_callbacks.push(() => bind(home, 'hereFirstTime', home_hereFirstTime_binding));

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const home_changes = {};

    			if (!updating_hereFirstTime && dirty & /*hereFirstTime*/ 2) {
    				updating_hereFirstTime = true;
    				home_changes.hereFirstTime = /*hereFirstTime*/ ctx[1];
    				add_flush_callback(() => updating_hereFirstTime = false);
    			}

    			home.$set(home_changes);
    		},
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
    		source: "(25:3) <Route path=\\\"/\\\" >",
    		ctx
    	});

    	return block;
    }

    // (18:0) <Router url={url}>
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
    						({ params }) => ({ 3: params }),
    						({ params }) => params ? 8 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: { path: router_names.FAQs, component: FAQs_1 },
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
    			add_location(div, file, 18, 1, 502);
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

    			if (dirty & /*$$scope, params*/ 24) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route3_changes = {};

    			if (dirty & /*$$scope, hereFirstTime*/ 18) {
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
    		source: "(18:0) <Router url={url}>",
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

    			if (dirty & /*$$scope, hereFirstTime*/ 18) {
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
    	let hereFirstTime = true;
    	let { url = "/" } = $$props;
    	console.log(window.location.href);
    	const writable_props = ['url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function home_hereFirstTime_binding(value) {
    		hereFirstTime = value;
    		$$invalidate(1, hereFirstTime);
    	}

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
    		FAQs: FAQs_1,
    		Email,
    		NotFound,
    		hereFirstTime,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ('hereFirstTime' in $$props) $$invalidate(1, hereFirstTime = $$props.hereFirstTime);
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url, hereFirstTime, home_hereFirstTime_binding];
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
