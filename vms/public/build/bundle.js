
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
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
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
        flushing = false;
        seen_callbacks.clear();
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
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.1' }, detail), true));
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

    /* src\style\TailwindCSS.svelte generated by Svelte v3.42.1 */

    function create_fragment$3(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
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

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TailwindCSS', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TailwindCSS> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class TailwindCSS extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TailwindCSS",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\pages\home.svelte generated by Svelte v3.42.1 */

    const file$2 = "src\\pages\\home.svelte";

    function create_fragment$2(ctx) {
    	let main;
    	let div6;
    	let div0;
    	let t0;
    	let nav;
    	let div2;
    	let div1;
    	let t1;
    	let div5;
    	let img0;
    	let img0_src_value;
    	let t2;
    	let div3;
    	let h10;
    	let t4;
    	let h3;
    	let t6;
    	let div4;
    	let button0;
    	let t8;
    	let button1;
    	let t10;
    	let div24;
    	let div23;
    	let div22;
    	let h11;
    	let t12;
    	let h40;
    	let t14;
    	let div15;
    	let div8;
    	let img1;
    	let img1_src_value;
    	let t15;
    	let div7;
    	let t17;
    	let div10;
    	let img2;
    	let img2_src_value;
    	let t18;
    	let div9;
    	let t20;
    	let div12;
    	let img3;
    	let img3_src_value;
    	let t21;
    	let div11;
    	let t23;
    	let div14;
    	let img4;
    	let img4_src_value;
    	let t24;
    	let div13;
    	let t26;
    	let h12;
    	let t28;
    	let h41;
    	let t30;
    	let div17;
    	let img5;
    	let img5_src_value;
    	let t31;
    	let div16;
    	let h13;
    	let t33;
    	let h42;
    	let t35;
    	let div19;
    	let img6;
    	let img6_src_value;
    	let t36;
    	let div18;
    	let h14;
    	let t38;
    	let h43;
    	let t40;
    	let div21;
    	let img7;
    	let img7_src_value;
    	let t41;
    	let div20;
    	let h15;
    	let t43;
    	let h44;
    	let t45;
    	let div29;
    	let div25;
    	let img8;
    	let img8_src_value;
    	let t46;
    	let h45;
    	let t48;
    	let div26;
    	let h16;
    	let t50;
    	let h46;
    	let t52;
    	let div28;
    	let h17;
    	let t54;
    	let div27;
    	let img9;
    	let img9_src_value;
    	let t55;
    	let img10;
    	let img10_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div6 = element("div");
    			div0 = element("div");
    			t0 = space();
    			nav = element("nav");
    			div2 = element("div");
    			div1 = element("div");
    			t1 = space();
    			div5 = element("div");
    			img0 = element("img");
    			t2 = space();
    			div3 = element("div");
    			h10 = element("h1");
    			h10.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing";
    			t4 = space();
    			h3 = element("h3");
    			h3.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing";
    			t6 = space();
    			div4 = element("div");
    			button0 = element("button");
    			button0.textContent = "GO TO SHOP";
    			t8 = space();
    			button1 = element("button");
    			button1.textContent = "Contract";
    			t10 = space();
    			div24 = element("div");
    			div23 = element("div");
    			div22 = element("div");
    			h11 = element("h1");
    			h11.textContent = "Our Product";
    			t12 = space();
    			h40 = element("h4");
    			h40.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    			t14 = space();
    			div15 = element("div");
    			div8 = element("div");
    			img1 = element("img");
    			t15 = space();
    			div7 = element("div");
    			div7.textContent = "birth to 24 months";
    			t17 = space();
    			div10 = element("div");
    			img2 = element("img");
    			t18 = space();
    			div9 = element("div");
    			div9.textContent = "2 to 4 years";
    			t20 = space();
    			div12 = element("div");
    			img3 = element("img");
    			t21 = space();
    			div11 = element("div");
    			div11.textContent = "5 to 7 years";
    			t23 = space();
    			div14 = element("div");
    			img4 = element("img");
    			t24 = space();
    			div13 = element("div");
    			div13.textContent = "8 to 13 years & up";
    			t26 = space();
    			h12 = element("h1");
    			h12.textContent = "Our Service";
    			t28 = space();
    			h41 = element("h4");
    			h41.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
    			t30 = space();
    			div17 = element("div");
    			img5 = element("img");
    			t31 = space();
    			div16 = element("div");
    			h13 = element("h1");
    			h13.textContent = "Free Shipping";
    			t33 = space();
    			h42 = element("h4");
    			h42.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae,";
    			t35 = space();
    			div19 = element("div");
    			img6 = element("img");
    			t36 = space();
    			div18 = element("div");
    			h14 = element("h1");
    			h14.textContent = "High Quality";
    			t38 = space();
    			h43 = element("h4");
    			h43.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae,";
    			t40 = space();
    			div21 = element("div");
    			img7 = element("img");
    			t41 = space();
    			div20 = element("div");
    			h15 = element("h1");
    			h15.textContent = "Refundable";
    			t43 = space();
    			h44 = element("h4");
    			h44.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae,";
    			t45 = space();
    			div29 = element("div");
    			div25 = element("div");
    			img8 = element("img");
    			t46 = space();
    			h45 = element("h4");
    			h45.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae, dignissim gravida risus. Maecenas facilisis, dolor fringilla sagittis commodo,";
    			t48 = space();
    			div26 = element("div");
    			h16 = element("h1");
    			h16.textContent = "Place";
    			t50 = space();
    			h46 = element("h4");
    			h46.textContent = "celerisque quis libero vitae, dignissim gravida risus. Maecenas commodo,";
    			t52 = space();
    			div28 = element("div");
    			h17 = element("h1");
    			h17.textContent = "Contract Us";
    			t54 = space();
    			div27 = element("div");
    			img9 = element("img");
    			t55 = space();
    			img10 = element("img");
    			attr_dev(div0, "class", "sidefade w-[80vw] h-[100vh] bg-gradient-to-r from-[#514647] to-transparent absolute z-0");
    			add_location(div0, file$2, 6, 8, 109);
    			attr_dev(div1, "class", "flex items-center justify-end h-16");
    			add_location(div1, file$2, 10, 16, 354);
    			attr_dev(div2, "class", "px-2 mx-auto sm:px-6 lg:px-24");
    			add_location(div2, file$2, 9, 12, 293);
    			attr_dev(nav, "class", "bg-[#240F0440] absolute w-full");
    			add_location(nav, file$2, 8, 8, 235);
    			if (!src_url_equal(img0.src, img0_src_value = "../img/FirstToy.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$2, 16, 58, 745);
    			attr_dev(h10, "class", "text-4xl text-white pt-[30px]");
    			add_location(h10, file$2, 18, 16, 833);
    			attr_dev(h3, "class", "text-xl text-white pt-[10px]");
    			add_location(h3, file$2, 19, 16, 950);
    			attr_dev(div3, "class", "info");
    			add_location(div3, file$2, 17, 12, 797);
    			attr_dev(button0, "class", "rounded-full\t w-[379px] h-[65px] bg-[#F5B41A60] text-white Kanitfont text-[20px] focus:outline-none hover:bg-[#F5B41A90] svelte-1awy0mi");
    			add_location(button0, file$2, 22, 16, 1141);
    			attr_dev(button1, "class", "ml-[32px] rounded-full\t w-[379px] h-[65px] bg-[#240F0460] text-white Kanitfont text-[20px] hover:bg-[#240F0490] svelte-1awy0mi");
    			add_location(button1, file$2, 23, 16, 1352);
    			attr_dev(div4, "class", "flex actionbutton mt-[50px]");
    			add_location(div4, file$2, 21, 12, 1082);
    			attr_dev(div5, "class", "z-10 px-[301px] pt-[240px] absolute ");
    			add_location(div5, file$2, 16, 8, 695);
    			attr_dev(div6, "class", "bg-baby h-[100vh] relative  svelte-1awy0mi");
    			add_location(div6, file$2, 5, 4, 58);
    			attr_dev(h11, "class", "pt-[100px] Kanitfont text-[36px] svelte-1awy0mi");
    			add_location(h11, file$2, 31, 17, 1780);
    			attr_dev(h40, "class", "Kanitfont text-[18px] svelte-1awy0mi");
    			add_location(h40, file$2, 32, 17, 1860);
    			if (!src_url_equal(img1.src, img1_src_value = "../img/24month.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "class", "w-[272px] h-[272px]");
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$2, 35, 25, 2106);
    			attr_dev(div7, "class", "Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center svelte-1awy0mi");
    			add_location(div7, file$2, 36, 25, 2198);
    			attr_dev(div8, "class", "age1 w-[272px] h-[341px] ");
    			add_location(div8, file$2, 34, 21, 2040);
    			if (!src_url_equal(img2.src, img2_src_value = "../img/2_4year.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "class", "w-[272px] h-[272px]");
    			attr_dev(img2, "alt", "");
    			add_location(img2, file$2, 39, 24, 2433);
    			attr_dev(div9, "class", "Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center svelte-1awy0mi");
    			add_location(div9, file$2, 40, 24, 2524);
    			attr_dev(div10, "class", "age2 w-[272px] h-[341px] ");
    			add_location(div10, file$2, 38, 21, 2368);
    			if (!src_url_equal(img3.src, img3_src_value = "../img/5_7year.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "class", "w-[272px] h-[272px]");
    			attr_dev(img3, "alt", "");
    			add_location(img3, file$2, 43, 24, 2751);
    			attr_dev(div11, "class", "Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center svelte-1awy0mi");
    			add_location(div11, file$2, 44, 24, 2842);
    			attr_dev(div12, "class", "age3 w-[272px] h-[341px] ");
    			add_location(div12, file$2, 42, 20, 2686);
    			if (!src_url_equal(img4.src, img4_src_value = "../img/8_13year.png")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "class", "w-[272px] h-[272px]");
    			attr_dev(img4, "alt", "");
    			add_location(img4, file$2, 47, 24, 3070);
    			attr_dev(div13, "class", "Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center svelte-1awy0mi");
    			add_location(div13, file$2, 48, 24, 3162);
    			attr_dev(div14, "class", "age4 w-[272px] h-[341px] ");
    			add_location(div14, file$2, 46, 20, 3005);
    			attr_dev(div15, "class", "flex ageimgbox pt-[60px] gap-4");
    			add_location(div15, file$2, 33, 17, 1973);
    			attr_dev(h12, "class", "pt-[103px] Kanitfont text-[36px] svelte-1awy0mi");
    			add_location(h12, file$2, 52, 17, 3354);
    			attr_dev(h41, "class", "Kanitfont text-[18px] svelte-1awy0mi");
    			add_location(h41, file$2, 53, 17, 3434);
    			attr_dev(img5, "class", "ml-[169px] w-[144px] h-[144px]");
    			if (!src_url_equal(img5.src, img5_src_value = "../img/icons8_shipped_100px_2.png")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "");
    			add_location(img5, file$2, 56, 21, 3670);
    			attr_dev(h13, "class", "Kanitfont text-white text-[48px] svelte-1awy0mi");
    			add_location(h13, file$2, 58, 25, 3842);
    			attr_dev(h42, "class", "Kanitfont text-[18px] w-[780px] svelte-1awy0mi");
    			add_location(h42, file$2, 59, 25, 3932);
    			attr_dev(div16, "class", "pl-[61px] serinfo");
    			add_location(div16, file$2, 57, 21, 3784);
    			attr_dev(div17, "class", "servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center");
    			add_location(div17, file$2, 55, 17, 3549);
    			attr_dev(img6, "class", "ml-[169px] w-[144px] h-[144px]");
    			if (!src_url_equal(img6.src, img6_src_value = "../img/icons8_data_arrived_filled_100px.png")) attr_dev(img6, "src", img6_src_value);
    			attr_dev(img6, "alt", "");
    			add_location(img6, file$2, 65, 21, 4342);
    			attr_dev(h14, "class", "Kanitfont text-white text-[48px] svelte-1awy0mi");
    			add_location(h14, file$2, 67, 24, 4522);
    			attr_dev(h43, "class", "Kanitfont text-[18px] w-[780px] svelte-1awy0mi");
    			add_location(h43, file$2, 68, 24, 4610);
    			attr_dev(div18, "class", "pl-[61px] serinfo");
    			add_location(div18, file$2, 66, 20, 4465);
    			attr_dev(div19, "class", "servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center");
    			add_location(div19, file$2, 64, 20, 4221);
    			attr_dev(img7, "class", "ml-[169px] w-[144px] h-[144px]");
    			if (!src_url_equal(img7.src, img7_src_value = "../img/icons8_get_cash_filled_100px.png")) attr_dev(img7, "src", img7_src_value);
    			attr_dev(img7, "alt", "");
    			add_location(img7, file$2, 75, 20, 4983);
    			attr_dev(h15, "class", "Kanitfont text-white text-[48px] svelte-1awy0mi");
    			add_location(h15, file$2, 77, 24, 5159);
    			attr_dev(h44, "class", "Kanitfont text-[18px] w-[780px] svelte-1awy0mi");
    			add_location(h44, file$2, 78, 24, 5245);
    			attr_dev(div20, "class", "pl-[61px] serinfo");
    			add_location(div20, file$2, 76, 20, 5102);
    			attr_dev(div21, "class", "servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center");
    			add_location(div21, file$2, 74, 16, 4863);
    			attr_dev(div22, "class", "flex flex-col items-center justify-center text-white align-middle");
    			add_location(div22, file$2, 30, 13, 1682);
    			attr_dev(div23, "class", "container w-[100%] h-[100%] mx-auto ");
    			add_location(div23, file$2, 29, 9, 1617);
    			attr_dev(div24, "class", "info  h-[2000px] bg-[#514647] ");
    			add_location(div24, file$2, 28, 5, 1562);
    			if (!src_url_equal(img8.src, img8_src_value = "../img/FirstToy_minicon.png")) attr_dev(img8, "src", img8_src_value);
    			attr_dev(img8, "alt", "");
    			add_location(img8, file$2, 90, 13, 5679);
    			attr_dev(h45, "class", "Kanitfont text-[24px] w-[780px] mt-[20px] svelte-1awy0mi");
    			add_location(h45, file$2, 91, 13, 5740);
    			attr_dev(div25, "class", "f1 w-[757px] ml-[180px] mt-[37px]");
    			add_location(div25, file$2, 89, 9, 5617);
    			attr_dev(h16, "class", "Kanitfont text-[36px] svelte-1awy0mi");
    			add_location(h16, file$2, 95, 12, 6077);
    			attr_dev(h46, "class", "Kanitfont text-[24px] w-[394px] mt-[10px] svelte-1awy0mi");
    			add_location(h46, file$2, 96, 12, 6135);
    			attr_dev(div26, "class", "f2 w-[372px] mt-[37px] ml-[159px]");
    			add_location(div26, file$2, 94, 9, 6016);
    			attr_dev(h17, "class", "Kanitfont text-[24px] svelte-1awy0mi");
    			add_location(h17, file$2, 100, 12, 6358);
    			if (!src_url_equal(img9.src, img9_src_value = "../img/icons8_instagram_new_100px.png")) attr_dev(img9, "src", img9_src_value);
    			attr_dev(img9, "class", "w-[59px] h-[59px]");
    			attr_dev(img9, "alt", "");
    			add_location(img9, file$2, 102, 16, 6496);
    			if (!src_url_equal(img10.src, img10_src_value = "../img/icons8_facebook_100px.png")) attr_dev(img10, "src", img10_src_value);
    			attr_dev(img10, "class", "w-[59px] h-[59px]");
    			attr_dev(img10, "alt", "");
    			add_location(img10, file$2, 103, 16, 6595);
    			attr_dev(div27, "class", "flex items-center justify-center socialimg");
    			add_location(div27, file$2, 101, 12, 6422);
    			attr_dev(div28, "class", "f3 w-[130px] mt-[137px] ml-[162px]");
    			add_location(div28, file$2, 99, 9, 6296);
    			attr_dev(div29, "class", "footer w-full h-[301px] bg-[#C4C4C4] flex");
    			add_location(div29, file$2, 88, 5, 5551);
    			add_location(main, file$2, 4, 0, 45);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div6);
    			append_dev(div6, div0);
    			append_dev(div6, t0);
    			append_dev(div6, nav);
    			append_dev(nav, div2);
    			append_dev(div2, div1);
    			append_dev(div6, t1);
    			append_dev(div6, div5);
    			append_dev(div5, img0);
    			append_dev(div5, t2);
    			append_dev(div5, div3);
    			append_dev(div3, h10);
    			append_dev(div3, t4);
    			append_dev(div3, h3);
    			append_dev(div5, t6);
    			append_dev(div5, div4);
    			append_dev(div4, button0);
    			append_dev(div4, t8);
    			append_dev(div4, button1);
    			append_dev(main, t10);
    			append_dev(main, div24);
    			append_dev(div24, div23);
    			append_dev(div23, div22);
    			append_dev(div22, h11);
    			append_dev(div22, t12);
    			append_dev(div22, h40);
    			append_dev(div22, t14);
    			append_dev(div22, div15);
    			append_dev(div15, div8);
    			append_dev(div8, img1);
    			append_dev(div8, t15);
    			append_dev(div8, div7);
    			append_dev(div15, t17);
    			append_dev(div15, div10);
    			append_dev(div10, img2);
    			append_dev(div10, t18);
    			append_dev(div10, div9);
    			append_dev(div15, t20);
    			append_dev(div15, div12);
    			append_dev(div12, img3);
    			append_dev(div12, t21);
    			append_dev(div12, div11);
    			append_dev(div15, t23);
    			append_dev(div15, div14);
    			append_dev(div14, img4);
    			append_dev(div14, t24);
    			append_dev(div14, div13);
    			append_dev(div22, t26);
    			append_dev(div22, h12);
    			append_dev(div22, t28);
    			append_dev(div22, h41);
    			append_dev(div22, t30);
    			append_dev(div22, div17);
    			append_dev(div17, img5);
    			append_dev(div17, t31);
    			append_dev(div17, div16);
    			append_dev(div16, h13);
    			append_dev(div16, t33);
    			append_dev(div16, h42);
    			append_dev(div22, t35);
    			append_dev(div22, div19);
    			append_dev(div19, img6);
    			append_dev(div19, t36);
    			append_dev(div19, div18);
    			append_dev(div18, h14);
    			append_dev(div18, t38);
    			append_dev(div18, h43);
    			append_dev(div22, t40);
    			append_dev(div22, div21);
    			append_dev(div21, img7);
    			append_dev(div21, t41);
    			append_dev(div21, div20);
    			append_dev(div20, h15);
    			append_dev(div20, t43);
    			append_dev(div20, h44);
    			append_dev(main, t45);
    			append_dev(main, div29);
    			append_dev(div29, div25);
    			append_dev(div25, img8);
    			append_dev(div25, t46);
    			append_dev(div25, h45);
    			append_dev(div29, t48);
    			append_dev(div29, div26);
    			append_dev(div26, h16);
    			append_dev(div26, t50);
    			append_dev(div26, h46);
    			append_dev(div29, t52);
    			append_dev(div29, div28);
    			append_dev(div28, h17);
    			append_dev(div28, t54);
    			append_dev(div28, div27);
    			append_dev(div27, img9);
    			append_dev(div27, t55);
    			append_dev(div27, img10);

    			if (!mounted) {
    				dispose = listen_dev(button0, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
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
    	validate_slots('Home', slots, []);
    	let { pages } = $$props;
    	const writable_props = ['pages'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(0, pages = 'shop');
    	};

    	$$self.$$set = $$props => {
    		if ('pages' in $$props) $$invalidate(0, pages = $$props.pages);
    	};

    	$$self.$capture_state = () => ({ pages });

    	$$self.$inject_state = $$props => {
    		if ('pages' in $$props) $$invalidate(0, pages = $$props.pages);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pages, click_handler];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { pages: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pages*/ ctx[0] === undefined && !('pages' in props)) {
    			console.warn("<Home> was created without expected prop 'pages'");
    		}
    	}

    	get pages() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pages(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\shop.svelte generated by Svelte v3.42.1 */

    const file$1 = "src\\pages\\shop.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (131:12) {#each toy as v , i}
    function create_each_block(ctx) {
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let h10;
    	let t1_value = /*v*/ ctx[3].name + "";
    	let t1;
    	let t2;
    	let h11;
    	let t3_value = /*v*/ ctx[3].price * 1.30 + "";
    	let t3;
    	let t4;
    	let t5;
    	let h12;
    	let t6_value = /*v*/ ctx[3].price + "";
    	let t6;
    	let t7;
    	let t8;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			h10 = element("h1");
    			t1 = text(t1_value);
    			t2 = space();
    			h11 = element("h1");
    			t3 = text(t3_value);
    			t4 = text(" THB");
    			t5 = space();
    			h12 = element("h1");
    			t6 = text(t6_value);
    			t7 = text(" THB");
    			t8 = space();
    			if (!src_url_equal(img.src, img_src_value = "https://via.placeholder.com/248")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			add_location(img, file$1, 134, 73, 8760);
    			attr_dev(div0, "class", "imgholder h-[248px] border border-[#240F04]");
    			add_location(div0, file$1, 134, 16, 8703);
    			attr_dev(h10, "class", "mt-[2px]");
    			add_location(h10, file$1, 136, 20, 8936);
    			attr_dev(h11, "class", "mt-[2px] line-through text-xs text-[#98817C]");
    			add_location(h11, file$1, 137, 20, 8992);
    			attr_dev(h12, "class", "text-[#3E5A8F] flex text-center justify-center ");
    			add_location(h12, file$1, 138, 20, 9101);
    			attr_dev(div1, "class", "imgholder h-[83px] text-black Kanitfont justify-center text-center svelte-1ou7iqg");
    			add_location(div1, file$1, 135, 16, 8834);
    			attr_dev(div2, "class", "box w-[248px] h-[331px] ");
    			add_location(div2, file$1, 133, 12, 8646);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, h10);
    			append_dev(h10, t1);
    			append_dev(div1, t2);
    			append_dev(div1, h11);
    			append_dev(h11, t3);
    			append_dev(h11, t4);
    			append_dev(div1, t5);
    			append_dev(div1, h12);
    			append_dev(h12, t6);
    			append_dev(h12, t7);
    			append_dev(div2, t8);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(131:12) {#each toy as v , i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let nav;
    	let div9;
    	let div4;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div3;
    	let div1;
    	let span0;
    	let t1;
    	let img1;
    	let img1_src_value;
    	let t2;
    	let div2;
    	let span1;
    	let t3;
    	let img2;
    	let img2_src_value;
    	let t4;
    	let div5;
    	let t5;
    	let div8;
    	let img3;
    	let img3_src_value;
    	let t6;
    	let div7;
    	let button0;
    	let t8;
    	let button1;
    	let t10;
    	let button2;
    	let t12;
    	let button3;
    	let t14;
    	let div6;
    	let button4;
    	let img4;
    	let img4_src_value;
    	let t15;
    	let button5;
    	let img5;
    	let img5_src_value;
    	let t16;
    	let div14;
    	let h1;
    	let t18;
    	let img6;
    	let img6_src_value;
    	let t19;
    	let div12;
    	let div10;
    	let t21;
    	let div11;
    	let p;
    	let t23;
    	let img7;
    	let img7_src_value;
    	let t24;
    	let div13;
    	let mounted;
    	let dispose;
    	let each_value = /*toy*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			nav = element("nav");
    			div9 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			span0 = element("span");
    			t1 = text("Change Language");
    			img1 = element("img");
    			t2 = space();
    			div2 = element("div");
    			span1 = element("span");
    			t3 = text("Login");
    			img2 = element("img");
    			t4 = space();
    			div5 = element("div");
    			t5 = space();
    			div8 = element("div");
    			img3 = element("img");
    			t6 = space();
    			div7 = element("div");
    			button0 = element("button");
    			button0.textContent = "SALES";
    			t8 = space();
    			button1 = element("button");
    			button1.textContent = "NEW ARRIVE";
    			t10 = space();
    			button2 = element("button");
    			button2.textContent = "AGE";
    			t12 = space();
    			button3 = element("button");
    			button3.textContent = "BRAND";
    			t14 = space();
    			div6 = element("div");
    			button4 = element("button");
    			img4 = element("img");
    			t15 = space();
    			button5 = element("button");
    			img5 = element("img");
    			t16 = space();
    			div14 = element("div");
    			h1 = element("h1");
    			h1.textContent = "HOME - PUPPET";
    			t18 = space();
    			img6 = element("img");
    			t19 = space();
    			div12 = element("div");
    			div10 = element("div");
    			div10.textContent = "1-95 of 95 items";
    			t21 = space();
    			div11 = element("div");
    			p = element("p");
    			p.textContent = "New Arrive";
    			t23 = space();
    			img7 = element("img");
    			t24 = space();
    			div13 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (!src_url_equal(img0.src, img0_src_value = "../img/credit.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			add_location(img0, file$1, 97, 36, 5987);
    			attr_dev(div0, "class", "credit");
    			add_location(div0, file$1, 97, 16, 5967);
    			if (!src_url_equal(img1.src, img1_src_value = "../img/icons8_chevron_down_10px.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			attr_dev(img1, "class", "w-[10px] h-[10px] mt-[3px] ml-[1px]");
    			add_location(img1, file$1, 99, 101, 6198);
    			attr_dev(span0, "class", "flex");
    			add_location(span0, file$1, 99, 66, 6163);
    			attr_dev(div1, "class", "text-[11px] text-white Kanitfont svelte-1ou7iqg");
    			add_location(div1, file$1, 99, 20, 6117);
    			if (!src_url_equal(img2.src, img2_src_value = "../img/icons8_chevron_down_10px.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			attr_dev(img2, "class", "w-[10px] h-[10px] mt-[3px] ml-[1px]");
    			add_location(img2, file$1, 100, 101, 6412);
    			attr_dev(span1, "class", "flex");
    			add_location(span1, file$1, 100, 77, 6388);
    			attr_dev(div2, "class", "pl-[21px] text-[11px] text-white Kanitfont svelte-1ou7iqg");
    			add_location(div2, file$1, 100, 20, 6331);
    			attr_dev(div3, "class", "absolute right-0 flex actionside ");
    			add_location(div3, file$1, 98, 16, 6048);
    			attr_dev(div4, "class", "container mx-auto h-[31px] flex items-center relative");
    			add_location(div4, file$1, 96, 12, 5882);
    			attr_dev(div5, "class", "whiteline w-full h-[2px] bg-white");
    			add_location(div5, file$1, 103, 12, 6581);
    			if (!src_url_equal(img3.src, img3_src_value = "../img/FirstToyproductIcon.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "class", "hover:opacity-60");
    			attr_dev(img3, "alt", "");
    			add_location(img3, file$1, 105, 16, 6733);
    			attr_dev(button0, "class", "text-white hover:opacity-60 Kanitfont focus:outline-none svelte-1ou7iqg");
    			add_location(button0, file$1, 107, 20, 6926);
    			attr_dev(button1, "class", "text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px] svelte-1ou7iqg");
    			add_location(button1, file$1, 108, 20, 7035);
    			attr_dev(button2, "class", "text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px] svelte-1ou7iqg");
    			add_location(button2, file$1, 109, 20, 7159);
    			attr_dev(button3, "class", "text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px] svelte-1ou7iqg");
    			add_location(button3, file$1, 110, 20, 7276);
    			if (!src_url_equal(img4.src, img4_src_value = "../img/icons8_search_filled_64px.png")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "");
    			add_location(img4, file$1, 112, 57, 7499);
    			attr_dev(button4, "class", "hover:opacity-60");
    			add_location(button4, file$1, 112, 24, 7466);
    			if (!src_url_equal(img5.src, img5_src_value = "../img/icons8_shopping_bag_filled_100px.png")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "");
    			add_location(img5, file$1, 113, 67, 7632);
    			attr_dev(button5, "class", "ml-[20px] hover:opacity-60");
    			add_location(button5, file$1, 113, 24, 7589);
    			attr_dev(div6, "class", "absolute right-0 flex imgaction");
    			add_location(div6, file$1, 111, 20, 7395);
    			attr_dev(div7, "class", "bar w-[340px] ml-[46px] flex");
    			add_location(div7, file$1, 106, 16, 6862);
    			attr_dev(div8, "class", "container relative flex items-center mx-auto h-[67px]");
    			add_location(div8, file$1, 104, 12, 6648);
    			attr_dev(div9, "class", "h-[100px] w-full");
    			add_location(div9, file$1, 95, 8, 5838);
    			attr_dev(nav, "class", "bg-[#514647]");
    			add_location(nav, file$1, 94, 4, 5802);
    			attr_dev(h1, "class", "text-[#5B5B5B] Kanitfont text-[12px] mt-[20px] svelte-1ou7iqg");
    			add_location(h1, file$1, 121, 8, 7861);
    			attr_dev(img6, "class", "mt-[23px] w-full h-[312px]");
    			if (!src_url_equal(img6.src, img6_src_value = "../img/imagepromotion.png")) attr_dev(img6, "src", img6_src_value);
    			attr_dev(img6, "alt", "");
    			add_location(img6, file$1, 123, 8, 7950);
    			attr_dev(div10, "class", "count Kanitfont text-[12px] svelte-1ou7iqg");
    			add_location(div10, file$1, 126, 12, 8144);
    			attr_dev(p, "class", "pl-[10px]");
    			add_location(p, file$1, 127, 129, 8339);
    			attr_dev(img7, "class", "absolute right-0 mr-[5px]");
    			if (!src_url_equal(img7.src, img7_src_value = "../img/icons8_chevron_down_64pxblack.png")) attr_dev(img7, "src", img7_src_value);
    			attr_dev(img7, "alt", "");
    			add_location(img7, file$1, 127, 166, 8376);
    			attr_dev(div11, "class", "ml-[40px] count Kanitfont text-[12px] border border-black w-[210px] h-full flex items-center relative svelte-1ou7iqg");
    			add_location(div11, file$1, 127, 12, 8222);
    			attr_dev(div12, "class", "itemfilter flex items-center w-[336px] h-[31px] absolute right-0 mt-[16px]");
    			add_location(div12, file$1, 125, 8, 8041);
    			attr_dev(div13, "class", "mt-[75px] w-[100%] h-full justify-start grid grid-cols-6\t");
    			add_location(div13, file$1, 129, 8, 8501);
    			attr_dev(div14, "class", "container relative mx-auto");
    			add_location(div14, file$1, 120, 4, 7811);
    			add_location(main, file$1, 93, 0, 5790);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, nav);
    			append_dev(nav, div9);
    			append_dev(div9, div4);
    			append_dev(div4, div0);
    			append_dev(div0, img0);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, span0);
    			append_dev(span0, t1);
    			append_dev(span0, img1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, span1);
    			append_dev(span1, t3);
    			append_dev(span1, img2);
    			append_dev(div9, t4);
    			append_dev(div9, div5);
    			append_dev(div9, t5);
    			append_dev(div9, div8);
    			append_dev(div8, img3);
    			append_dev(div8, t6);
    			append_dev(div8, div7);
    			append_dev(div7, button0);
    			append_dev(div7, t8);
    			append_dev(div7, button1);
    			append_dev(div7, t10);
    			append_dev(div7, button2);
    			append_dev(div7, t12);
    			append_dev(div7, button3);
    			append_dev(div7, t14);
    			append_dev(div7, div6);
    			append_dev(div6, button4);
    			append_dev(button4, img4);
    			append_dev(div6, t15);
    			append_dev(div6, button5);
    			append_dev(button5, img5);
    			append_dev(main, t16);
    			append_dev(main, div14);
    			append_dev(div14, h1);
    			append_dev(div14, t18);
    			append_dev(div14, img6);
    			append_dev(div14, t19);
    			append_dev(div14, div12);
    			append_dev(div12, div10);
    			append_dev(div12, t21);
    			append_dev(div12, div11);
    			append_dev(div11, p);
    			append_dev(div11, t23);
    			append_dev(div11, img7);
    			append_dev(div14, t24);
    			append_dev(div14, div13);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div13, null);
    			}

    			if (!mounted) {
    				dispose = listen_dev(img3, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*toy*/ 2) {
    				each_value = /*toy*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div13, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
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
    	validate_slots('Shop', slots, []);
    	let { pages } = $$props;

    	let toy = [
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1300
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 1000
    		},
    		{
    			name: 'Toy Name Holder',
    			img: 'toy1',
    			price: 690
    		}
    	];

    	const writable_props = ['pages'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Shop> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(0, pages = 'home');
    	};

    	$$self.$$set = $$props => {
    		if ('pages' in $$props) $$invalidate(0, pages = $$props.pages);
    	};

    	$$self.$capture_state = () => ({ pages, toy });

    	$$self.$inject_state = $$props => {
    		if ('pages' in $$props) $$invalidate(0, pages = $$props.pages);
    		if ('toy' in $$props) $$invalidate(1, toy = $$props.toy);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pages, toy, click_handler];
    }

    class Shop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { pages: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Shop",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pages*/ ctx[0] === undefined && !('pages' in props)) {
    			console.warn("<Shop> was created without expected prop 'pages'");
    		}
    	}

    	get pages() {
    		throw new Error("<Shop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pages(value) {
    		throw new Error("<Shop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.42.1 */
    const file = "src\\App.svelte";

    // (17:2) {:else}
    function create_else_block(ctx) {
    	let shop;
    	let updating_pages;
    	let current;

    	function shop_pages_binding(value) {
    		/*shop_pages_binding*/ ctx[2](value);
    	}

    	let shop_props = {};

    	if (/*pages*/ ctx[0] !== void 0) {
    		shop_props.pages = /*pages*/ ctx[0];
    	}

    	shop = new Shop({ props: shop_props, $$inline: true });
    	binding_callbacks.push(() => bind(shop, 'pages', shop_pages_binding));

    	const block = {
    		c: function create() {
    			create_component(shop.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(shop, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const shop_changes = {};

    			if (!updating_pages && dirty & /*pages*/ 1) {
    				updating_pages = true;
    				shop_changes.pages = /*pages*/ ctx[0];
    				add_flush_callback(() => updating_pages = false);
    			}

    			shop.$set(shop_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(shop.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(shop.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(shop, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(17:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (15:2) {#if (pages == 'home')}
    function create_if_block(ctx) {
    	let home;
    	let updating_pages;
    	let current;

    	function home_pages_binding(value) {
    		/*home_pages_binding*/ ctx[1](value);
    	}

    	let home_props = {};

    	if (/*pages*/ ctx[0] !== void 0) {
    		home_props.pages = /*pages*/ ctx[0];
    	}

    	home = new Home({ props: home_props, $$inline: true });
    	binding_callbacks.push(() => bind(home, 'pages', home_pages_binding));

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

    			if (!updating_pages && dirty & /*pages*/ 1) {
    				updating_pages = true;
    				home_changes.pages = /*pages*/ ctx[0];
    				add_flush_callback(() => updating_pages = false);
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
    		id: create_if_block.name,
    		type: "if",
    		source: "(15:2) {#if (pages == 'home')}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let tailwindcss;
    	let t;
    	let main;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	tailwindcss = new TailwindCSS({ $$inline: true });
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*pages*/ ctx[0] == 'home') return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			create_component(tailwindcss.$$.fragment);
    			t = space();
    			main = element("main");
    			if_block.c();
    			add_location(main, file, 13, 0, 348);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(tailwindcss, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, main, anchor);
    			if_blocks[current_block_type_index].m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
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
    				if_block.m(main, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tailwindcss.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tailwindcss.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tailwindcss, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(main);
    			if_blocks[current_block_type_index].d();
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
    	let pages = 'shop';

    	// onDestroy(() =>  window.removeEventListener('message', window.listener));
    	onMount(() => {
    		
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function home_pages_binding(value) {
    		pages = value;
    		$$invalidate(0, pages);
    	}

    	function shop_pages_binding(value) {
    		pages = value;
    		$$invalidate(0, pages);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		TailwindCSS,
    		Home,
    		Shop,
    		pages
    	});

    	$$self.$inject_state = $$props => {
    		if ('pages' in $$props) $$invalidate(0, pages = $$props.pages);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pages, home_pages_binding, shop_pages_binding];
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
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
