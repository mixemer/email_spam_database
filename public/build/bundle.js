
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
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
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
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
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
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

    /* src\Header.svelte generated by Svelte v3.47.0 */

    const file$2 = "src\\Header.svelte";

    function create_fragment$2(ctx) {
    	let div3;
    	let nav;
    	let div1;
    	let a0;
    	let t1;
    	let button0;
    	let span;
    	let t2;
    	let div0;
    	let ul;
    	let li0;
    	let a1;
    	let t4;
    	let li1;
    	let a2;
    	let t6;
    	let li2;
    	let a3;
    	let t8;
    	let div2;
    	let form;
    	let input;
    	let t9;
    	let button1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			nav = element("nav");
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "Scam Email Finder";
    			t1 = space();
    			button0 = element("button");
    			span = element("span");
    			t2 = space();
    			div0 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			a1.textContent = "Home";
    			t4 = space();
    			li1 = element("li");
    			a2 = element("a");
    			a2.textContent = "Report";
    			t6 = space();
    			li2 = element("li");
    			a3 = element("a");
    			a3.textContent = "FAQs";
    			t8 = space();
    			div2 = element("div");
    			form = element("form");
    			input = element("input");
    			t9 = space();
    			button1 = element("button");
    			button1.textContent = "Search";
    			attr_dev(a0, "class", "navbar-brand");
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$2, 7, 4, 180);
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$2, 10, 3, 432);
    			attr_dev(button0, "class", "navbar-toggler");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "data-bs-toggle", "collapse");
    			attr_dev(button0, "data-bs-target", "#navbarNav");
    			attr_dev(button0, "aria-controls", "navbarNav");
    			attr_dev(button0, "aria-expanded", "false");
    			attr_dev(button0, "aria-label", "Toggle navigation");
    			add_location(button0, file$2, 9, 10, 249);
    			attr_dev(a1, "class", "nav-link active");
    			attr_dev(a1, "href", "/");
    			add_location(a1, file$2, 17, 6, 641);
    			attr_dev(li0, "class", "nav-item");
    			add_location(li0, file$2, 16, 4, 612);
    			attr_dev(a2, "class", "nav-link");
    			attr_dev(a2, "href", "#");
    			add_location(a2, file$2, 21, 6, 735);
    			attr_dev(li1, "class", "nav-item");
    			add_location(li1, file$2, 20, 4, 706);
    			attr_dev(a3, "class", "nav-link");
    			attr_dev(a3, "href", "#");
    			add_location(a3, file$2, 25, 6, 835);
    			attr_dev(li2, "class", "nav-item d-flex");
    			add_location(li2, file$2, 24, 4, 799);
    			attr_dev(ul, "class", "navbar-nav mb-2 mb-lg-0");
    			add_location(ul, file$2, 14, 3, 564);
    			attr_dev(div0, "class", "end-lined collapse navbar-collapse svelte-w7208t");
    			attr_dev(div0, "id", "navbarNav");
    			add_location(div0, file$2, 13, 4, 496);
    			attr_dev(div1, "class", "container-fluid");
    			add_location(div1, file$2, 6, 2, 145);
    			attr_dev(nav, "class", "navbar navbar-expand-lg navbar-light ");
    			add_location(nav, file$2, 5, 1, 90);
    			attr_dev(input, "class", "form-control me-2");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Search Email");
    			input.autofocus = true;
    			attr_dev(input, "aria-label", "Search");
    			add_location(input, file$2, 34, 4, 994);
    			attr_dev(button1, "class", "btn btn-outline-success");
    			attr_dev(button1, "type", "submit");
    			add_location(button1, file$2, 35, 4, 1130);
    			attr_dev(form, "class", "d-flex");
    			add_location(form, file$2, 33, 2, 967);
    			attr_dev(div2, "class", "container-fluid");
    			add_location(div2, file$2, 32, 3, 934);
    			attr_dev(div3, "class", "header bg-light svelte-w7208t");
    			add_location(div3, file$2, 4, 0, 58);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, nav);
    			append_dev(nav, div1);
    			append_dev(div1, a0);
    			append_dev(div1, t1);
    			append_dev(div1, button0);
    			append_dev(button0, span);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a1);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(li1, a2);
    			append_dev(ul, t6);
    			append_dev(ul, li2);
    			append_dev(li2, a3);
    			append_dev(div3, t8);
    			append_dev(div3, div2);
    			append_dev(div2, form);
    			append_dev(form, input);
    			set_input_value(input, /*search_email*/ ctx[0]);
    			append_dev(form, t9);
    			append_dev(form, button1);
    			input.focus();

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*search_email*/ 1) {
    				set_input_value(input, /*search_email*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			dispose();
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
    	validate_slots('Header', slots, []);
    	let { search_email = '' } = $$props;
    	const writable_props = ['search_email'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		search_email = this.value;
    		$$invalidate(0, search_email);
    	}

    	$$self.$$set = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    	};

    	$$self.$capture_state = () => ({ search_email });

    	$$self.$inject_state = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [search_email, input_input_handler];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { search_email: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get search_email() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set search_email(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const data = [
        { id: 1, email: 'fofis15650@arpizol.com', type_of_scam: "Survey", report_count: "100", first: "2005", comments: "100" },
        { id: 2, email: 'Beemsee28@jourrapide.com', type_of_scam: "PayPal", report_count: "100", first: "2005", comments: "100" },
        { id: 3, email: 'rnewman@yahoo.ca', type_of_scam: "Mystery Shopper", report_count: "100", first: "2005", comments: "100" },
        { id: 4, email: 'hermanab@outlook.com', type_of_scam: "Quiz", report_count: "100", first: "2005", comments: "100" },
        { id: 5, email: 'stewwy@gmail.com', type_of_scam: "Hidden URL", report_count: "100", first: "2005", comments: "100" },
        { id: 6, email: 'cderoove@verizon.net', type_of_scam: "PayPal", report_count: "100", first: "2005", comments: "100" },
        { id: 7, email: 'uncled@gmail.com', type_of_scam: "Mystery Shopper", report_count: "100", first: "2005", comments: "100" },
        { id: 8, email: 'trygstad@mac.com', type_of_scam: "Quiz", report_count: "100", first: "2005", comments: "100" },
        { id: 9, email: 'fake@gmail.com', type_of_scam: "Hidden URL", report_count: "100", first: "2005", comments: "100" },
        { id: 10, email: 'mastinfo@me.com', type_of_scam: "Mystery Shopper", report_count: "100", first: "2005", comments: "100" },

        { id: 11, email: 'privcan@mac.com', type_of_scam: "Quiz", report_count: "100", first: "2005", comments: "100" },
        { id: 12, email: 'seurat@sbcglobal.net', type_of_scam: "Hidden URL", report_count: "100", first: "2005", comments: "100" },
        { id: 13, email: 'cderoove@verizon.net', type_of_scam: "PayPal", report_count: "100", first: "2005", comments: "100" },
        { id: 14, email: 'campbell@me.com', type_of_scam: "Mystery Shopper", report_count: "100", first: "2005", comments: "100" },
        { id: 15, email: 'barjam@aol.com', type_of_scam: "Quiz", report_count: "100", first: "2005", comments: "100" },
        { id: 16, email: 'itstatus@gmail.com', type_of_scam: "Hidden URL", report_count: "100", first: "2005", comments: "100" },
        { id: 17, email: 'padme@icloud.com', type_of_scam: "PayPal", report_count: "100", first: "2005", comments: "100" },
        { id: 18, email: 'intlprog@gmail.com', type_of_scam: "Mystery Shopper", report_count: "100", first: "2005", comments: "100" }
    ];

    /* src\TableDatabase.svelte generated by Svelte v3.47.0 */
    const file$1 = "src\\TableDatabase.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[14] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    // (33:14) {#each column_names as column}
    function create_each_block_2(ctx) {
    	let th;
    	let t_value = /*column*/ ctx[18] + "";
    	let t;

    	const block = {
    		c: function create() {
    			th = element("th");
    			t = text(t_value);
    			attr_dev(th, "scope", "col");
    			add_location(th, file$1, 33, 18, 1157);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(33:14) {#each column_names as column}",
    		ctx
    	});

    	return block;
    }

    // (41:12) {#each results as result (result.id)}
    function create_each_block_1(key_1, ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*result*/ ctx[15].id + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*result*/ ctx[15].email + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*result*/ ctx[15].type_of_scam + "";
    	let t4;
    	let t5;
    	let td3;
    	let t6_value = /*result*/ ctx[15].report_count + "";
    	let t6;
    	let t7;
    	let td4;
    	let t8_value = /*result*/ ctx[15].first + "";
    	let t8;
    	let t9;
    	let td5;
    	let t10_value = /*result*/ ctx[15].comments + "";
    	let t10;
    	let t11;

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
    			add_location(td0, file$1, 42, 20, 1372);
    			add_location(td1, file$1, 43, 20, 1414);
    			add_location(td2, file$1, 44, 20, 1459);
    			add_location(td3, file$1, 45, 20, 1511);
    			add_location(td4, file$1, 46, 20, 1563);
    			add_location(td5, file$1, 47, 20, 1608);
    			add_location(tr, file$1, 41, 16, 1346);
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
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*results*/ 4 && t0_value !== (t0_value = /*result*/ ctx[15].id + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*results*/ 4 && t2_value !== (t2_value = /*result*/ ctx[15].email + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*results*/ 4 && t4_value !== (t4_value = /*result*/ ctx[15].type_of_scam + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*results*/ 4 && t6_value !== (t6_value = /*result*/ ctx[15].report_count + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*results*/ 4 && t8_value !== (t8_value = /*result*/ ctx[15].first + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*results*/ 4 && t10_value !== (t10_value = /*result*/ ctx[15].comments + "")) set_data_dev(t10, t10_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(41:12) {#each results as result (result.id)}",
    		ctx
    	});

    	return block;
    }

    // (59:12) {#each Array((max_page_count)) as _, i}
    function create_each_block(ctx) {
    	let li;
    	let a;
    	let t_value = /*i*/ ctx[14] + 1 + "";
    	let t;
    	let li_class_value;
    	let mounted;
    	let dispose;

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[10](/*i*/ ctx[14]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "class", "page-link");
    			attr_dev(a, "href", "#");
    			add_location(a, file$1, 59, 76, 2130);

    			attr_dev(li, "class", li_class_value = "page-item " + (/*i*/ ctx[14] + 1 == /*current_page*/ ctx[0]
    			? 'active'
    			: ''));

    			add_location(li, file$1, 59, 16, 2070);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, t);

    			if (!mounted) {
    				dispose = listen_dev(a, "click", click_handler_1, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*current_page*/ 1 && li_class_value !== (li_class_value = "page-item " + (/*i*/ ctx[14] + 1 == /*current_page*/ ctx[0]
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
    		id: create_each_block.name,
    		type: "each",
    		source: "(59:12) {#each Array((max_page_count)) as _, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let table;
    	let thead;
    	let tr;
    	let t0;
    	let tbody;
    	let each_blocks_1 = [];
    	let each1_lookup = new Map();
    	let t1;
    	let nav;
    	let ul;
    	let li0;
    	let a0;
    	let li0_class_value;
    	let t3;
    	let t4;
    	let li1;
    	let a1;
    	let li1_class_value;
    	let mounted;
    	let dispose;
    	let each_value_2 = /*column_names*/ ctx[3];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*results*/ ctx[2];
    	validate_each_argument(each_value_1);
    	const get_key = ctx => /*result*/ ctx[15].id;
    	validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each1_lookup.set(key, each_blocks_1[i] = create_each_block_1(key, child_ctx));
    	}

    	let each_value = Array(/*max_page_count*/ ctx[1]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
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
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Previous";
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Next";
    			add_location(tr, file$1, 31, 10, 1087);
    			add_location(thead, file$1, 30, 8, 1068);
    			add_location(tbody, file$1, 39, 8, 1270);
    			attr_dev(table, "class", "table table-bordered table-hover table-striped");
    			add_location(table, file$1, 29, 4, 996);
    			attr_dev(a0, "class", "page-link");
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$1, 55, 72, 1885);
    			attr_dev(li0, "class", li0_class_value = "page-item " + (/*current_page*/ ctx[0] == 1 ? 'disabled' : ''));
    			add_location(li0, file$1, 55, 12, 1825);
    			attr_dev(a1, "class", "page-link");
    			attr_dev(a1, "href", "#");
    			add_location(a1, file$1, 63, 83, 2340);

    			attr_dev(li1, "class", li1_class_value = "page-item " + (/*current_page*/ ctx[0] == /*max_page_count*/ ctx[1]
    			? 'disabled'
    			: ''));

    			add_location(li1, file$1, 63, 10, 2267);
    			attr_dev(ul, "class", "pagination pagination-sm");
    			add_location(ul, file$1, 54, 8, 1774);
    			attr_dev(nav, "aria-label", "Page navigation example");
    			add_location(nav, file$1, 53, 6, 1722);
    			attr_dev(div, "class", "body svelte-cqtc97");
    			add_location(div, file$1, 28, 0, 972);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, table);
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

    			append_dev(div, t1);
    			append_dev(div, nav);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(li1, a1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(a0, "click", /*click_handler*/ ctx[9], false, false, false),
    					listen_dev(a1, "click", /*click_handler_2*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*column_names*/ 8) {
    				each_value_2 = /*column_names*/ ctx[3];
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

    			if (dirty & /*results*/ 4) {
    				each_value_1 = /*results*/ ctx[2];
    				validate_each_argument(each_value_1);
    				validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);
    				each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, each_value_1, each1_lookup, tbody, destroy_block, create_each_block_1, null, get_each_context_1);
    			}

    			if (dirty & /*current_page*/ 1 && li0_class_value !== (li0_class_value = "page-item " + (/*current_page*/ ctx[0] == 1 ? 'disabled' : ''))) {
    				attr_dev(li0, "class", li0_class_value);
    			}

    			if (dirty & /*current_page, clickedOnPage, max_page_count*/ 67) {
    				each_value = Array(/*max_page_count*/ ctx[1]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, t4);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*current_page, max_page_count*/ 3 && li1_class_value !== (li1_class_value = "page-item " + (/*current_page*/ ctx[0] == /*max_page_count*/ ctx[1]
    			? 'disabled'
    			: ''))) {
    				attr_dev(li1, "class", li1_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks_2, detaching);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].d();
    			}

    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
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

    const shown_rows = 10;

    function instance$1($$self, $$props, $$invalidate) {
    	let current_page;
    	let max_page_count;
    	let filtered_data;
    	let results;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableDatabase', slots, []);
    	let { search_email = '' } = $$props;

    	const column_names = [
    		"#",
    		"Email",
    		"Type of Scam",
    		"Number of Reports",
    		"First Occurance",
    		"Comments"
    	];

    	function clickedPrevious() {
    		if (current_page == 1) return;
    		$$invalidate(0, current_page -= 1);
    	}

    	function clickedNext() {
    		if (current_page == max_page_count) return;
    		$$invalidate(0, current_page += 1);
    	}

    	function clickedOnPage(page_number) {
    		if (page_number < 1 || page_number > max_page_count) return;
    		$$invalidate(0, current_page = page_number);
    	}

    	const writable_props = ['search_email'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableDatabase> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => clickedPrevious();
    	const click_handler_1 = i => clickedOnPage(i + 1);
    	const click_handler_2 = () => clickedNext();

    	$$self.$$set = $$props => {
    		if ('search_email' in $$props) $$invalidate(7, search_email = $$props.search_email);
    	};

    	$$self.$capture_state = () => ({
    		data,
    		shown_rows,
    		search_email,
    		column_names,
    		clickedPrevious,
    		clickedNext,
    		clickedOnPage,
    		current_page,
    		max_page_count,
    		filtered_data,
    		results
    	});

    	$$self.$inject_state = $$props => {
    		if ('search_email' in $$props) $$invalidate(7, search_email = $$props.search_email);
    		if ('current_page' in $$props) $$invalidate(0, current_page = $$props.current_page);
    		if ('max_page_count' in $$props) $$invalidate(1, max_page_count = $$props.max_page_count);
    		if ('filtered_data' in $$props) $$invalidate(8, filtered_data = $$props.filtered_data);
    		if ('results' in $$props) $$invalidate(2, results = $$props.results);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*search_email*/ 128) {
    			$$invalidate(0, current_page = search_email.trim() === '' ? 1 : 1);
    		}

    		if ($$self.$$.dirty & /*search_email*/ 128) {
    			$$invalidate(8, filtered_data = data.filter(thing => thing.email.toLowerCase().startsWith(search_email.trim().toLowerCase())));
    		}

    		if ($$self.$$.dirty & /*filtered_data*/ 256) {
    			$$invalidate(1, max_page_count = Math.round(filtered_data.length / shown_rows));
    		}

    		if ($$self.$$.dirty & /*filtered_data, current_page*/ 257) {
    			$$invalidate(2, results = filtered_data.slice((current_page - 1) * shown_rows, current_page * shown_rows));
    		}
    	};

    	return [
    		current_page,
    		max_page_count,
    		results,
    		column_names,
    		clickedPrevious,
    		clickedNext,
    		clickedOnPage,
    		search_email,
    		filtered_data,
    		click_handler,
    		click_handler_1,
    		click_handler_2
    	];
    }

    class TableDatabase extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { search_email: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableDatabase",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get search_email() {
    		throw new Error("<TableDatabase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set search_email(value) {
    		throw new Error("<TableDatabase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.47.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let header;
    	let updating_search_email;
    	let t0;
    	let br;
    	let t1;
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
    			t0 = space();
    			br = element("br");
    			t1 = space();
    			create_component(tabledatabase.$$.fragment);
    			add_location(br, file, 10, 1, 210);
    			attr_dev(main, "class", "");
    			add_location(main, file, 7, 0, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t0);
    			append_dev(main, br);
    			append_dev(main, t1);
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
    	let search_email = '';
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function header_search_email_binding(value) {
    		search_email = value;
    		$$invalidate(0, search_email);
    	}

    	function tabledatabase_search_email_binding(value) {
    		search_email = value;
    		$$invalidate(0, search_email);
    	}

    	$$self.$capture_state = () => ({ Header, TableDataBase: TableDatabase, search_email });

    	$$self.$inject_state = $$props => {
    		if ('search_email' in $$props) $$invalidate(0, search_email = $$props.search_email);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [search_email, header_search_email_binding, tabledatabase_search_email_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
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
