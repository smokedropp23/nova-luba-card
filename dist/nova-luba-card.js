//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, ee = g ? g.emptyScript : "", te = h.reactiveElementPolyfillSupport, _ = (e, t) => e, v = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, y = (e, t) => !l(e, t), ne = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	useDefault: !1,
	hasChanged: y
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ne) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ne;
	}
	static _$Ei() {
		if (this.hasOwnProperty(_("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(_("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? v : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? v : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? y)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[_("elementProperties")] = /* @__PURE__ */ new Map(), b[_("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: b }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var x = globalThis, S = (e) => e, C = x.trustedTypes, re = C ? C.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ie = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, T = "?" + w, E = `<${T}>`, D = document, O = () => D.createComment(""), k = (e) => e === null || typeof e != "object" && typeof e != "function", A = Array.isArray, j = (e) => A(e) || typeof e?.[Symbol.iterator] == "function", M = "[ 	\n\f\r]", N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, P = /-->/g, F = />/g, I = RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ae = /'/g, L = /"/g, R = /^(?:script|style|textarea|title)$/i, z = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), B = Symbol.for("lit-noChange"), V = Symbol.for("lit-nothing"), H = /* @__PURE__ */ new WeakMap(), U = D.createTreeWalker(D, 129);
function W(e, t) {
	if (!A(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return re === void 0 ? t : re.createHTML(t);
}
var G = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = N;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === N ? c[1] === "!--" ? o = P : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = I) : (R.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = I) : o = F : o === I ? c[0] === ">" ? (o = i ?? N, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? I : c[3] === "\"" ? L : ae) : o === L || o === ae ? o = I : o === P || o === F ? o = N : (o = I, i = void 0);
		let d = o === I && e[t + 1].startsWith("/>") ? " " : "";
		a += o === N ? n + E : l >= 0 ? (r.push(s), n.slice(0, l) + ie + n.slice(l) + w + d) : n + w + (l === -2 ? t : d);
	}
	return [W(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, oe = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = G(t, n);
		if (this.el = e.createElement(l, r), U.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = U.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ie)) {
					let t = u[o++], n = i.getAttribute(e).split(w), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? le : r[1] === "?" ? ue : r[1] === "@" ? de : q
					}), i.removeAttribute(e);
				} else e.startsWith(w) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (R.test(i.tagName)) {
					let e = i.textContent.split(w), t = e.length - 1;
					if (t > 0) {
						i.textContent = C ? C.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], O()), U.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], O());
					}
				}
			} else if (i.nodeType === 8) if (i.data === T) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(w, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += w.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = D.createElement("template");
		return n.innerHTML = e, n;
	}
};
function K(e, t, n = e, r) {
	if (t === B) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = k(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = K(e, i._$AS(e, t.values), i, r)), t;
}
var se = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? D).importNode(t, !0);
		U.currentNode = r;
		let i = U.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new ce(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new fe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = U.nextNode(), a++);
		}
		return U.currentNode = D, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, ce = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = V, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = K(this, e, t), k(e) ? e === V || e == null || e === "" ? (this._$AH !== V && this._$AR(), this._$AH = V) : e !== this._$AH && e !== B && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? j(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== V && k(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = oe.createElement(W(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new se(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = H.get(e.strings);
		return t === void 0 && H.set(e.strings, t = new oe(e)), t;
	}
	k(t) {
		A(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(O()), this.O(O()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = S(e).nextSibling;
			S(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, q = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = V, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = V;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = K(this, e, t, 0), a = !k(e) || e !== this._$AH && e !== B, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = K(this, r[n + o], t, o), s === B && (s = this._$AH[o]), a ||= !k(s) || s !== this._$AH[o], s === V ? e = V : e !== V && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, le = class extends q {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === V ? void 0 : e;
	}
}, ue = class extends q {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== V);
	}
}, de = class extends q {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = K(this, e, t, 0) ?? V) === B) return;
		let n = this._$AH, r = e === V && n !== V || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== V && (n === V || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, fe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		K(this, e);
	}
}, pe = x.litHtmlPolyfillSupport;
pe?.(oe, ce), (x.litHtmlVersions ??= []).push("3.3.3");
var me = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new ce(t.insertBefore(O(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, he = globalThis, J = class extends b {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = me(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return B;
	}
};
J._$litElement$ = !0, J.finalized = !0, he.litElementHydrateSupport?.({ LitElement: J });
var ge = he.litElementPolyfillSupport;
ge?.({ LitElement: J }), (he.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var _e = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, ve = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	hasChanged: y
}, ye = (e = ve, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function be(e) {
	return (t, n) => typeof n == "object" ? ye(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function xe(e) {
	return be({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/lit-html/directive.js
var Se = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Ce = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), we = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, Te = "important", Ee = " !important", Y = Ce(class extends we {
	constructor(e) {
		if (super(e), e.type !== Se.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).reduce((t, n) => {
			let r = e[n];
			return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
		}, "");
	}
	update(e, [t]) {
		let { style: n } = e.element;
		if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
		for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? n.removeProperty(e) : n[e] = null);
		for (let e in t) {
			let r = t[e];
			if (r != null) {
				this.ft.add(e);
				let t = typeof r == "string" && r.endsWith(Ee);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? Te : "") : n[e] = r;
			}
		}
		return B;
	}
});
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/decorate.js
function X(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/components/mower-lighting.ts
var De = class extends J {
	static {
		this.styles = o`
    :host {
      position: absolute;
      inset: 0;
      z-index: 3;
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    .overlay {
      position: absolute;
      z-index: 3;
      display: block;

      width: var(--robot-desktop-max-height);
      height: var(--robot-desktop-max-height);

      max-width: 100%;
      max-height: 100%;

      background-color: var(--light-color);

      -webkit-mask-image: var(--light-asset);
      mask-image: var(--light-asset);

      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;

      -webkit-mask-position: center;
      mask-position: center;

      -webkit-mask-size: contain;
      mask-size: contain;

      opacity: var(--light-brightness);

      transform:
        translateX(var(--robot-desktop-x))
        translateY(var(--robot-desktop-y))
        scale(var(--robot-desktop-scale));

      transform-origin: center center;

      transition:
        opacity 220ms ease,
        filter 220ms ease;
    }

    .overlay.front {
      filter:
        brightness(1.6)
        drop-shadow(
          0 0 7px
          var(--light-color)
        )
        drop-shadow(
          0 0 14px
          var(--light-color)
        );
    }

    .overlay.side {
      filter:
        brightness(1.45)
        drop-shadow(
          0 0 9px
          var(--light-color)
        )
        drop-shadow(
          0 0 18px
          var(--light-color)
        );
    }

    .pulse {
      animation:
        lighting-pulse
        1.5s
        ease-in-out
        infinite;
    }

    .blink {
      animation:
        lighting-blink
        1s
        steps(1, end)
        infinite;
    }

    .breathe {
      animation:
        lighting-breathe
        2.4s
        ease-in-out
        infinite;
    }

    @keyframes lighting-pulse {
      0%,
      100% {
        opacity:
          calc(
            var(--light-brightness)
            * 0.65
          );
      }

      50% {
        opacity: var(--light-brightness);
      }
    }

    @keyframes lighting-blink {
      0%,
      49% {
        opacity: var(--light-brightness);
      }

      50%,
      100% {
        opacity: 0;
      }
    }

    @keyframes lighting-breathe {
      0%,
      100% {
        opacity:
          calc(
            var(--light-brightness)
            * 0.65
          );
      }

      50% {
        opacity: var(--light-brightness);
      }
    }

    @media (max-width: 600px) {
      .overlay {
        width: var(--robot-mobile-max-height);
        height: var(--robot-mobile-max-height);

        transform:
          translateX(var(--robot-mobile-x))
          translateY(var(--robot-mobile-y))
          scale(var(--robot-mobile-scale));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .pulse,
      .blink,
      .breathe {
        animation: none;
      }
    }
  `;
	}
	renderOverlay(e, t) {
		return !e.asset || !e.visible || e.brightness <= 0 ? V : z`
      <div
        class=${[
			"overlay",
			t,
			e.animation === "none" ? "" : e.animation
		].filter(Boolean).join(" ")}
        aria-hidden="true"
        style=${Y({
			"--light-color": e.color,
			"--light-brightness": String(e.brightness),
			"--light-asset": `url("${e.asset}")`
		})}
      ></div>
    `;
	}
	render() {
		return this.lighting ? z`
      ${this.renderOverlay(this.lighting.front, "front")}

      ${this.renderOverlay(this.lighting.side, "side")}
    ` : V;
	}
};
X([be({ attribute: !1 })], De.prototype, "lighting", void 0), De = X([_e("mower-lighting")], De);
//#endregion
//#region src/constants/mower-presentation.ts
var Oe = {
	desktop: {
		scale: 1.35,
		translateX: 0,
		translateY: 28,
		maxWidth: 520,
		maxHeight: 330
	},
	mobile: {
		scale: 1.35,
		translateX: 0,
		translateY: 24,
		maxWidth: 420,
		maxHeight: 285
	}
}, ke = {
	luba1: {
		desktop: {
			scale: 1.38,
			translateX: 0,
			translateY: 30,
			maxWidth: 520,
			maxHeight: 330
		},
		mobile: {
			scale: 1.36,
			translateX: 0,
			translateY: 25,
			maxWidth: 420,
			maxHeight: 285
		}
	},
	luba2: {
		desktop: {
			scale: 1.4,
			translateX: 4,
			translateY: 30,
			maxWidth: 525,
			maxHeight: 335
		},
		mobile: {
			scale: 1.38,
			translateX: 2,
			translateY: 25,
			maxWidth: 425,
			maxHeight: 290
		}
	},
	luba3: {
		desktop: {
			scale: 1.78,
			translateX: 34,
			translateY: 18,
			maxWidth: 610,
			maxHeight: 390
		},
		mobile: {
			scale: 1.4,
			translateX: 6,
			translateY: 48,
			maxWidth: 430,
			maxHeight: 290
		}
	},
	mini1: {
		desktop: {
			scale: 1.5,
			translateX: 0,
			translateY: 28,
			maxWidth: 500,
			maxHeight: 325
		},
		mobile: {
			scale: 1.46,
			translateX: 0,
			translateY: 24,
			maxWidth: 410,
			maxHeight: 280
		}
	},
	mini2: {
		desktop: {
			scale: 1.48,
			translateX: 0,
			translateY: 28,
			maxWidth: 500,
			maxHeight: 325
		},
		mobile: {
			scale: 1.44,
			translateX: 0,
			translateY: 24,
			maxWidth: 410,
			maxHeight: 280
		}
	}
};
function Ae(e) {
	return ke[e] ?? Oe;
}
//#endregion
//#region src/constants/theme.ts
var Z = {
	colors: {
		background: "#111827",
		backgroundDeep: "#090D14",
		surface: "#1F2937",
		surfaceSoft: "#252D3A",
		border: "#374151",
		borderSoft: "rgba(255, 255, 255, 0.08)",
		primary: "#3B82F6",
		secondary: "#60A5FA",
		text: "#FFFFFF",
		textSecondary: "#9CA3AF",
		textMuted: "#6B7280"
	},
	states: {
		mowing: {
			color: "#65D344",
			soft: "rgba(101, 211, 68, 0.12)",
			glow: "rgba(101, 211, 68, 0.42)"
		},
		docked: {
			color: "#F7C843",
			soft: "rgba(247, 200, 67, 0.12)",
			glow: "rgba(247, 200, 67, 0.42)"
		},
		returning: {
			color: "#F7C843",
			soft: "rgba(247, 200, 67, 0.12)",
			glow: "rgba(247, 200, 67, 0.42)"
		},
		error: {
			color: "#EF4444",
			soft: "rgba(239, 68, 68, 0.13)",
			glow: "rgba(239, 68, 68, 0.45)"
		},
		maintenance: {
			color: "#F28C28",
			soft: "rgba(242, 140, 40, 0.13)",
			glow: "rgba(242, 140, 40, 0.45)"
		},
		update: {
			color: "#8B5CF6",
			soft: "rgba(139, 92, 246, 0.13)",
			glow: "rgba(139, 92, 246, 0.45)"
		},
		offline: {
			color: "#9CA3AF",
			soft: "rgba(156, 163, 175, 0.10)",
			glow: "rgba(156, 163, 175, 0.22)"
		},
		unknown: {
			color: "#F7C843",
			soft: "rgba(247, 200, 67, 0.12)",
			glow: "rgba(247, 200, 67, 0.35)"
		}
	},
	radius: {
		small: "10px",
		medium: "18px",
		large: "28px",
		pill: "999px"
	},
	shadow: {
		card: "0 8px 24px rgba(0, 0, 0, 0.35)",
		elevated: "0 18px 48px rgba(0, 0, 0, 0.42)"
	},
	spacing: {
		xs: "4px",
		sm: "8px",
		md: "16px",
		lg: "24px",
		xl: "32px"
	},
	animation: {
		fast: "150ms",
		normal: "300ms",
		slow: "600ms"
	}
}, je = {
	luba1: {
		id: "luba1",
		manufacturer: "Mammotion",
		displayName: "Luba 1",
		assetFolder: "luba1",
		defaultImage: "default.webp"
	},
	luba2: {
		id: "luba2",
		manufacturer: "Mammotion",
		displayName: "Luba 2",
		assetFolder: "luba2",
		defaultImage: "default.webp"
	},
	luba3: {
		id: "luba3",
		manufacturer: "Mammotion",
		displayName: "Luba 3 AWD LiDAR",
		assetFolder: "luba3",
		defaultImage: "default.webp"
	},
	mini1: {
		id: "mini1",
		manufacturer: "Mammotion",
		displayName: "Luba Mini 1",
		assetFolder: "mini",
		defaultImage: "mini1-default.webp"
	},
	mini2: {
		id: "mini2",
		manufacturer: "Mammotion",
		displayName: "Luba Mini 2",
		assetFolder: "mini",
		defaultImage: "mini2-default.webp"
	},
	unknown: {
		id: "unknown",
		manufacturer: "Mammotion",
		displayName: "Mammotion Mower",
		assetFolder: "assets/robot",
		defaultImage: "fallback.webp"
	}
}, Me = "/hacsfiles/nova-luba-card/images";
function Ne(e) {
	let t = je[e];
	return [
		Me,
		t.assetFolder,
		t.defaultImage
	].join("/");
}
//#endregion
//#region src/helpers/get-mower-lighting-assets.ts
var Q = "/hacsfiles/nova-luba-card/images";
function Pe(e) {
	switch (e) {
		case "luba1": return {
			front: null,
			side: `${Q}/luba1/lighting/side-light.png`
		};
		case "luba2": return {
			front: null,
			side: `${Q}/luba2/lighting/side-light.png`
		};
		case "luba3": return {
			front: `${Q}/luba3/lighting/front-light.png`,
			side: `${Q}/luba3/lighting/side-light.png`
		};
		case "mini1": return {
			front: `${Q}/mini/lighting/mini1-front-light.png`,
			side: null
		};
		case "mini2": return {
			front: `${Q}/mini/lighting/mini2-front-light.png`,
			side: `${Q}/mini/lighting/mini2-side-light.png`
		};
		default: return {
			front: null,
			side: null
		};
	}
}
//#endregion
//#region src/constants/mower-lighting-config.ts
var Fe = {
	ring: {
		visible: !1,
		color: "#ffffff",
		brightness: 0,
		animation: "none"
	},
	front: {
		visible: !1,
		color: "#ffffff",
		brightness: 0,
		animation: "none"
	},
	side: {
		visible: !1,
		color: "#ffffff",
		brightness: 0,
		animation: "none"
	}
};
//#endregion
//#region src/helpers/resolve-mower-lighting.ts
function Ie(e) {
	switch (e) {
		case "mowing": return {
			ring: {
				visible: !1,
				color: "#22c55e",
				brightness: 0,
				animation: "none"
			},
			front: {
				visible: !0,
				color: "#ffffff",
				brightness: .9,
				animation: "none"
			},
			side: {
				visible: !0,
				color: "#22c55e",
				brightness: .8,
				animation: "breathe"
			}
		};
		case "returning": return {
			ring: {
				visible: !1,
				color: "#facc15",
				brightness: 0,
				animation: "none"
			},
			front: {
				visible: !0,
				color: "#ffffff",
				brightness: 1,
				animation: "none"
			},
			side: {
				visible: !0,
				color: "#facc15",
				brightness: .85,
				animation: "pulse"
			}
		};
		case "docked": return {
			ring: {
				visible: !1,
				color: "#3b82f6",
				brightness: 0,
				animation: "none"
			},
			front: {
				visible: !1,
				color: "#ffffff",
				brightness: 0,
				animation: "none"
			},
			side: {
				visible: !0,
				color: "#3b82f6",
				brightness: .45,
				animation: "none"
			}
		};
		case "error": return {
			ring: {
				visible: !1,
				color: "#ef4444",
				brightness: 0,
				animation: "none"
			},
			front: {
				visible: !0,
				color: "#ef4444",
				brightness: 1,
				animation: "blink"
			},
			side: {
				visible: !0,
				color: "#ef4444",
				brightness: 1,
				animation: "blink"
			}
		};
		case "maintenance": return {
			ring: {
				visible: !1,
				color: "#f97316",
				brightness: 0,
				animation: "none"
			},
			front: {
				visible: !1,
				color: "#ffffff",
				brightness: 0,
				animation: "none"
			},
			side: {
				visible: !0,
				color: "#f97316",
				brightness: .65,
				animation: "breathe"
			}
		};
		case "update": return {
			ring: {
				visible: !1,
				color: "#8b5cf6",
				brightness: 0,
				animation: "none"
			},
			front: {
				visible: !1,
				color: "#ffffff",
				brightness: 0,
				animation: "none"
			},
			side: {
				visible: !0,
				color: "#8b5cf6",
				brightness: .8,
				animation: "pulse"
			}
		};
		default: return structuredClone(Fe);
	}
}
//#endregion
//#region src/helpers/resolve-mower-model.ts
function Le(e) {
	let t = e?.trim().toLowerCase().replaceAll("-", " ").replaceAll("_", " ");
	return t ? t === "luba3" || t.includes("luba 3") ? "luba3" : t === "luba2" || t.includes("luba 2") ? "luba2" : t === "luba1" || t.includes("luba 1") ? "luba1" : t === "mini2" || t.includes("mini 2") ? "mini2" : t === "mini1" || t.includes("mini 1") ? "mini1" : "unknown" : "unknown";
}
//#endregion
//#region src/helpers/resolve-mower-state.ts
function Re(e) {
	let t = e?.trim().toLowerCase();
	return !t || t === "unknown" ? "unknown" : t === "unavailable" || t === "offline" ? "offline" : t === "mowing" || t === "mähend" || t === "mowing_task" ? "mowing" : t === "paused" || t === "pause" || t === "pausing" ? "paused" : t === "docked" || t === "charging" || t === "idle" ? "docked" : t === "returning" || t === "returning_to_dock" ? "returning" : t === "error" || t === "blocked" ? "error" : t === "maintenance" || t === "maintenance_mode" ? "maintenance" : t === "update" || t === "updating" ? "update" : "unknown";
}
//#endregion
//#region src/index.ts
var ze = "sensor.luba_va8tp48r_batterie", Be = "sensor.luba_va8tp48r_batteriezyklen", Ve = "sensor.luba_va8tp48r_aktueller_standort", He = "sensor.luba_va8tp48r_fortschritt", Ue = "sensor.luba_va8tp48r_verbleibende_zeit", We = "sensor.luba_va8tp48r_gesamtzeit", Ge = "sensor.luba_va8tp48r_letzte_fehlermeldung", Ke = "sensor.luba_va8tp48r_letzter_fehlerzeitpunkt", qe = "sensor.luba_va8tp48r_letzter_fehlercode", Je = "sensor.luba_va8tp48r_aktivitatsmodus", Ye = "sensor.luba_va8tp48r_messerverschleiss_warnzeit", Xe = "sensor.luba_va8tp48r_aufgabendauer", Ze = "sensor.luba_va8tp48r_gesamtkilometerstand", Qe = "update.luba_va8tp48r_firmware", $e = "button.luba_va8tp48r_notfall_schub_links", et = "button.luba_va8tp48r_notfall_schub_rechts", tt = "button.luba_va8tp48r_notfall_schub_ruckwarts", nt = "button.luba_va8tp48r_notfall_schub_vorwarts", rt = "button.luba_va8tp48r_ladestation_umsetzen", it = "button.luba_va8tp48r_restart_mower", at = "button.luba_va8tp48r_aktuelle_aufgabe_abbrechen", ot = "button.luba_va8tp48r_abdocken", st = "sensor.luba_va8tp48r_ble_rssi", ct = "sensor.luba_va8tp48r_mobilfunk_rssi", lt = "sensor.luba_va8tp48r_wi_fi_rssi", ut = "sensor.luba_va8tp48r_verbindungsart", dt = {
	mowing: "Mäht",
	paused: "Pausiert",
	docked: "Im Dock",
	returning: "Rückkehr zur Ladestation",
	error: "Fehler",
	maintenance: "Wartungsmodus",
	update: "Update verfügbar",
	offline: "Offline",
	unknown: "Unbekannt"
}, $ = class extends J {
	constructor(...e) {
		super(...e), this.controlsAvailable = !0;
	}
	static {
		this.styles = o`
    :host {
      display: block;
    }

    ha-card {
      position: relative;
      container-type: inline-size;
      overflow: hidden;
      min-height: 520px;
      padding: ${a(Z.spacing.lg)};
      border: 1px solid var(--nova-state-color);
      border-radius: ${a(Z.radius.large)};
      color: ${a(Z.colors.text)};
      background:
        radial-gradient(
          circle at 78% 20%,
          var(--nova-state-soft),
          transparent 38%
        ),
        linear-gradient(
          145deg,
          ${a(Z.colors.surface)},
          ${a(Z.colors.backgroundDeep)}
        );
      box-shadow:
        ${a(Z.shadow.card)},
        0 0 30px var(--nova-state-glow);
      transition:
        border-color ${a(Z.animation.normal)} ease,
        box-shadow ${a(Z.animation.normal)} ease,
        background ${a(Z.animation.normal)} ease;
    }

    .card-layout {
      position: relative;
      z-index: 1;
      display: grid;
      gap: ${a(Z.spacing.lg)};
      min-height: 520px;
    }

    .header {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
      align-items: start;
      gap: ${a(Z.spacing.md)};
    }

    .connectivity-bar {
      display: grid;
      grid-template-columns: repeat(4, minmax(82px, 1fr));
      gap: 8px;
      align-self: start;
      justify-self: center;
      width: min(100%, 470px);
    }

    .connectivity-item {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      grid-template-areas:
        "icon label"
        "icon value";
      column-gap: 7px;
      align-items: center;
      min-width: 0;
      padding: 8px 10px;
      border: 1px solid ${a(Z.colors.borderSoft)};
      border-radius: 14px;
      color: ${a(Z.colors.textSecondary)};
      background: rgba(255, 255, 255, 0.035);
      backdrop-filter: blur(12px);
      cursor: pointer;
      transition:
        border-color ${a(Z.animation.fast)} ease,
        background ${a(Z.animation.fast)} ease,
        transform ${a(Z.animation.fast)} ease;
    }

    .connectivity-item:hover {
      transform: translateY(-1px);
      border-color: var(--connection-color);
      background: rgba(255, 255, 255, 0.065);
    }

    .connectivity-item.active {
      border-color: var(--connection-color);
      box-shadow: 0 0 14px color-mix(in srgb, var(--connection-color) 35%, transparent);
    }

    .connectivity-icon {
      grid-area: icon;
      color: var(--connection-color);
      --mdc-icon-size: 20px;
    }

    .connectivity-label {
      grid-area: label;
      overflow: hidden;
      color: ${a(Z.colors.textSecondary)};
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.4px;
      line-height: 1.1;
      text-overflow: ellipsis;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .connectivity-value {
      grid-area: value;
      overflow: hidden;
      color: ${a(Z.colors.text)};
      font-size: 12px;
      font-weight: 800;
      line-height: 1.2;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .brand {
      min-width: 0;
    }

    .eyebrow {
      margin-bottom: ${a(Z.spacing.sm)};
      color: var(--nova-state-color);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1.4px;
      text-transform: uppercase;
    }

    h2 {
      margin: 0;
      font-size: clamp(28px, 5vw, 40px);
      line-height: 1.05;
    }

    .model {
      margin-top: ${a(Z.spacing.sm)};
      color: ${a(Z.colors.textSecondary)};
      font-size: 15px;
    }

    .led-placeholder {
      display: grid;
      flex: 0 0 auto;
      width: 54px;
      height: 54px;
      place-items: center;
      border: 1px solid var(--nova-state-color);
      border-radius: 50%;
      background: var(--nova-state-soft);
      box-shadow: 0 0 20px var(--nova-state-glow);
    }

    .led-core {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--nova-state-color);
      box-shadow: 0 0 14px var(--nova-state-glow);
    }

    .content-grid {
      display: grid;
      gap: ${a(Z.spacing.lg)};
      align-items: stretch;
    }

    .hero {
      display: grid;
      min-width: 0;
      align-items: center;
      justify-items: center;
    }

    .robot-stage {
      position: relative;
      display: grid;
      width: 100%;
      min-height: 330px;
      place-items: center;
      overflow: visible;
      border-radius: ${a(Z.radius.large)};
      background:
        radial-gradient(
          ellipse at 50% 65%,
          var(--nova-state-soft),
          transparent 58%
        );
    }

    .robot-stage::after {
      position: absolute;
      z-index: 0;
      right: 15%;
      bottom: 0;
      left: 15%;
      height: 28px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.48);
      filter: blur(20px);
      content: "";
    }

    .robot-image {
      position: relative;
      z-index: 2;
      display: block;
      width: 100%;
      max-width: var(--robot-desktop-max-width);
      max-height: var(--robot-desktop-max-height);
      object-fit: contain;
      transform:
        translateX(var(--robot-desktop-x))
        translateY(var(--robot-desktop-y))
        scale(var(--robot-desktop-scale));
      transform-origin: center center;
      filter:
        drop-shadow(0 18px 20px rgba(0, 0, 0, 0.42))
        drop-shadow(0 0 10px var(--nova-state-glow));
      transition:
        transform ${a(Z.animation.normal)} ease,
        filter ${a(Z.animation.normal)} ease;
    }

    .robot-image:hover {
      transform:
        translateX(var(--robot-desktop-x))
        translateY(calc(var(--robot-desktop-y) - 3px))
        scale(calc(var(--robot-desktop-scale) + 0.03));
    }

    .robot-fallback {
      position: relative;
      z-index: 1;
      display: grid;
      gap: ${a(Z.spacing.sm)};
      justify-items: center;
      color: ${a(Z.colors.textMuted)};
      text-align: center;
    }

    .robot-fallback[hidden] {
      display: none;
    }

    .robot-fallback-symbol {
      color: var(--nova-state-color);
      font-size: 56px;
      line-height: 1;
      text-shadow: 0 0 20px var(--nova-state-glow);
    }

    .robot-fallback-title {
      color: ${a(Z.colors.textSecondary)};
      font-size: 15px;
      font-weight: 600;
    }

    .robot-fallback-path {
      max-width: 320px;
      overflow-wrap: anywhere;
      font-size: 11px;
      line-height: 1.5;
    }

    .overview {
      display: grid;
      min-width: 0;
      gap: ${a(Z.spacing.md)};
      align-content: center;
    }

    .overview-heading {
      display: grid;
      gap: 8px;
      justify-items: center;
      padding:
        ${a(Z.spacing.sm)}
        ${a(Z.spacing.md)};
      text-align: center;
    }

    .overview-icon {
      color: var(--nova-state-color);
      filter: drop-shadow(0 0 10px var(--nova-state-glow));
      --mdc-icon-size: 46px;
    }

    .overview-title {
      margin: 0;
      font-size: clamp(23px, 4vw, 32px);
      line-height: 1.15;
    }

    .overview-description {
      display: grid;
      gap: 3px;
      color: ${a(Z.colors.textSecondary)};
      font-size: 15px;
      line-height: 1.45;
    }

    .glass-panel {
      display: grid;
      gap: ${a(Z.spacing.md)};
      padding: ${a(Z.spacing.md)};
      border: 1px solid ${a(Z.colors.borderSoft)};
      border-radius: ${a(Z.radius.medium)};
      background:
        linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.045),
          rgba(255, 255, 255, 0.015)
        );
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.035),
        0 12px 35px rgba(0, 0, 0, 0.22);
      backdrop-filter: blur(12px);
    }

    .progress-panel {
      grid-template-columns:
        minmax(130px, 0.75fr)
        minmax(0, 1.25fr);
      align-items: center;
    }

    .progress-ring,
    .battery-ring {
      position: relative;
      display: grid;
      width: min(160px, 100%);
      aspect-ratio: 1;
      place-items: center;
      justify-self: center;
      border-radius: 50%;
      box-shadow:
        0 0 18px var(--nova-state-glow),
        inset 0 0 20px rgba(0, 0, 0, 0.25);
    }

    .progress-ring {
      background:
        conic-gradient(
          var(--nova-state-color)
          0deg
          var(--progress-angle),
          rgba(255, 255, 255, 0.09)
          var(--progress-angle)
          360deg
        );
    }

    .battery-ring {
      background:
        conic-gradient(
          var(--nova-state-color)
          0deg
          var(--battery-angle),
          rgba(255, 255, 255, 0.09)
          var(--battery-angle)
          360deg
        );
    }

    .progress-ring::before,
    .battery-ring::before {
      position: absolute;
      inset: 12px;
      border-radius: 50%;
      background:
        radial-gradient(
          circle at 50% 35%,
          rgba(255, 255, 255, 0.06),
          transparent 52%
        ),
        ${a(Z.colors.backgroundDeep)};
      box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.45);
      content: "";
    }

    .ring-content {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 2px;
      justify-items: center;
      text-align: center;
    }

    .ring-value {
      font-size: clamp(30px, 6vw, 46px);
      font-weight: 750;
      line-height: 1;
    }

    .ring-label {
      color: ${a(Z.colors.textSecondary)};
      font-size: 13px;
    }

    .metric-list {
      display: grid;
      min-width: 0;
    }

    .metric-row {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) auto;
      gap: 10px;
      align-items: center;
      min-height: 49px;
      padding: 8px 0;
      border-bottom: 1px solid ${a(Z.colors.borderSoft)};
    }

    .metric-row:last-child {
      border-bottom: 0;
    }

    .metric-row.clickable {
      margin: 0 -8px;
      padding-right: 8px;
      padding-left: 8px;
      border-radius: 10px;
      cursor: pointer;
      transition:
        background ${a(Z.animation.normal)} ease,
        box-shadow ${a(Z.animation.normal)} ease,
        transform ${a(Z.animation.normal)} ease;
    }

    .metric-row.clickable:hover,
    .metric-row.clickable:focus-visible {
      outline: none;
      background: var(--nova-state-soft);
      box-shadow: 0 0 14px var(--nova-state-glow);
      transform: translateX(2px);
    }

    .progress-ring.clickable,
    .battery-ring.clickable {
      cursor: pointer;
      transition:
        box-shadow ${a(Z.animation.normal)} ease,
        transform ${a(Z.animation.normal)} ease;
    }

    .progress-ring.clickable:hover,
    .progress-ring.clickable:focus-visible,
    .battery-ring.clickable:hover,
    .battery-ring.clickable:focus-visible {
      outline: none;
      box-shadow:
        0 0 28px var(--nova-state-glow),
        inset 0 0 20px rgba(0, 0, 0, 0.25);
      transform: scale(1.025);
    }

    .metric-icon {
      color: var(--nova-state-color);
      filter: drop-shadow(0 0 7px var(--nova-state-glow));
      --mdc-icon-size: 24px;
    }

    .metric-label {
      min-width: 0;
      color: ${a(Z.colors.textSecondary)};
      font-size: 13px;
    }

    .metric-value {
      max-width: 180px;
      overflow: hidden;
      color: ${a(Z.colors.text)};
      font-size: 14px;
      font-weight: 650;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .battery-track {
      grid-column: 2 / -1;
      height: 4px;
      margin-top: -4px;
      overflow: hidden;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
    }

    .battery-fill {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--nova-state-color);
      box-shadow: 0 0 8px var(--nova-state-glow);
    }

    .state-panel {
      align-content: center;
      justify-items: center;
      min-height: 280px;
      text-align: center;
    }

    .state-symbol {
      display: grid;
      width: 92px;
      height: 92px;
      place-items: center;
      border: 1px solid var(--nova-state-color);
      border-radius: 50%;
      background: var(--nova-state-soft);
      box-shadow:
        0 0 24px var(--nova-state-glow),
        inset 0 0 18px rgba(255, 255, 255, 0.035);
    }

    .state-symbol ha-icon {
      color: var(--nova-state-color);
      filter: drop-shadow(0 0 10px var(--nova-state-glow));
      --mdc-icon-size: 46px;
    }

    .state-message {
      max-width: 430px;
      color: ${a(Z.colors.textSecondary)};
      font-size: 15px;
      line-height: 1.55;
    }

    .state-detail {
      color: ${a(Z.colors.textMuted)};
      font-size: 12px;
    }

    .action-section {
      display: grid;
      width: 100%;
      gap: 12px;
      margin-top: 4px;
    }

    .action-heading {
      color: ${a(Z.colors.textSecondary)};
      font-size: 12px;
      font-weight: 750;
      letter-spacing: 0.9px;
      text-align: center;
      text-transform: uppercase;
    }

    .action-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      width: 100%;
    }

    .emergency-pad {
      display: grid;
      grid-template-columns: repeat(3, minmax(72px, 1fr));
      grid-template-areas:
        ". forward ."
        "left center right"
        ". backward .";
      gap: 10px;
      width: min(330px, 100%);
      justify-self: center;
    }

    .emergency-center {
      grid-area: center;
      display: grid;
      place-items: center;
      color: var(--nova-state-color);
      opacity: 0.55;
    }

    .action-button {
      display: inline-flex;
      min-height: 46px;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 12px;
      border: 1px solid var(--nova-state-color);
      border-radius: ${a(Z.radius.medium)};
      color: ${a(Z.colors.text)};
      background: var(--nova-state-soft);
      box-shadow: 0 0 12px transparent;
      font: inherit;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition:
        background ${a(Z.animation.normal)} ease,
        box-shadow ${a(Z.animation.normal)} ease,
        opacity ${a(Z.animation.normal)} ease,
        transform ${a(Z.animation.normal)} ease;
    }

    .action-button:hover:not(:disabled),
    .action-button:focus-visible:not(:disabled) {
      outline: none;
      box-shadow: 0 0 18px var(--nova-state-glow);
      transform: translateY(-1px);
    }

    .action-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .action-button:disabled {
      cursor: not-allowed;
      opacity: 0.32;
      filter: grayscale(0.5);
    }

    .action-button ha-icon {
      --mdc-icon-size: 22px;
    }

    .action-button.forward {
      grid-area: forward;
    }

    .action-button.left {
      grid-area: left;
    }

    .action-button.right {
      grid-area: right;
    }

    .action-button.backward {
      grid-area: backward;
    }

    .action-button.danger {
      border-color: ${a(Z.states.error.color)};
      background: ${a(Z.states.error.soft)};
    }


    .stale-warning {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 10px 14px;
      border: 1px solid rgba(242, 201, 76, 0.68);
      border-radius: 14px;
      color: #f2c94c;
      background: rgba(242, 201, 76, 0.09);
      box-shadow: 0 0 16px rgba(242, 201, 76, 0.12);
      font-size: 13px;
      font-weight: 650;
      line-height: 1.35;
      text-align: center;
    }

    .stale-warning.confirmed-stale {
      border-color: rgba(255, 171, 64, 0.78);
      color: #ffab40;
      background: rgba(255, 171, 64, 0.1);
    }

    .stale-warning ha-icon {
      flex: 0 0 auto;
      --mdc-icon-size: 21px;
    }

    .card-layout.stale .content-grid {
      opacity: 0.86;
    }

    .footer {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: ${a(Z.spacing.md)};
      padding-top: ${a(Z.spacing.md)};
      border-top: 1px solid ${a(Z.colors.borderSoft)};
    }

    .status-group {
      display: grid;
      gap: ${a(Z.spacing.sm)};
    }

    .status {
      display: inline-flex;
      width: fit-content;
      align-items: center;
      gap: 9px;
      padding: 10px 15px;
      border: 1px solid var(--nova-state-color);
      border-radius: ${a(Z.radius.pill)};
      background: var(--nova-state-soft);
      font-weight: 600;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--nova-state-color);
      box-shadow: 0 0 12px var(--nova-state-glow);
    }

    .raw-state {
      color: ${a(Z.colors.textMuted)};
      font-size: 12px;
    }

    .layout-note {
      color: ${a(Z.colors.textMuted)};
      font-size: 11px;
      letter-spacing: 0.8px;
      text-align: right;
      text-transform: uppercase;
    }

    .entity-error {
      display: grid;
      min-height: 240px;
      place-items: center;
      padding: ${a(Z.spacing.lg)};
      border: 1px solid ${a(Z.states.error.color)};
      border-radius: ${a(Z.radius.medium)};
      color: ${a(Z.states.error.color)};
      background: ${a(Z.states.error.soft)};
      text-align: center;
    }

    @container (min-width: 760px) {
      .content-grid {
        grid-template-columns:
          minmax(0, 1.15fr)
          minmax(340px, 0.85fr);
      }

      .robot-stage {
        min-height: 390px;
      }
    }

    @container (max-width: 759px) {
      ha-card {
        padding: ${a(Z.spacing.md)};
      }

      .card-layout {
        gap: ${a(Z.spacing.md)};
      }

      .led-placeholder {
        width: 44px;
        height: 44px;
      }

      .robot-stage {
        min-height: 260px;
      }

      .robot-image {
        max-width: var(--robot-mobile-max-width);
        max-height: var(--robot-mobile-max-height);
        transform:
          translateX(var(--robot-mobile-x))
          translateY(var(--robot-mobile-y))
          scale(var(--robot-mobile-scale));
      }

      .robot-image:hover {
        transform:
          translateX(var(--robot-mobile-x))
          translateY(calc(var(--robot-mobile-y) - 3px))
          scale(calc(var(--robot-mobile-scale) + 0.03));
      }

      .progress-panel {
        grid-template-columns:
          minmax(115px, 0.7fr)
          minmax(0, 1.3fr);
        padding: 14px;
      }

      .metric-row {
        grid-template-columns: 29px minmax(0, 1fr) auto;
        gap: 8px;
      }

      .metric-value {
        max-width: 130px;
      }

      .footer {
        align-items: flex-start;
        flex-direction: column;
      }

      .layout-note {
        text-align: left;
      }
    }

    @container (max-width: 430px) {
      .progress-panel {
        grid-template-columns: 1fr;
      }

      .progress-ring,
      .battery-ring {
        width: 145px;
      }

      .metric-value {
        max-width: 160px;
      }

      .header {
        grid-template-columns: minmax(0, 1fr) auto;
      }

      .connectivity-bar {
        grid-column: 1 / -1;
        grid-row: 2;
        width: 100%;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `;
	}
	setConfig(e) {
		if (!e) throw Error("Nova UI: Kartenkonfiguration fehlt.");
		if (!e.entity) throw Error("Nova UI: Bitte eine lawn_mower-Entität unter 'entity' eintragen.");
		this.config = e;
	}
	get mowerState() {
		if (!(!this.hass || !this.config)) return this.hass.states[this.config.entity];
	}
	getState(e) {
		if (!(!this.hass || !e)) return this.hass.states[e];
	}
	getNumericValue(e) {
		let t = this.getState(e);
		if (!t) return null;
		let n = Number.parseFloat(t.state.trim().replace(",", "."));
		return Number.isFinite(n) ? n : null;
	}
	formatEntityValue(e, t = "") {
		let n = this.getState(e);
		if (!n || n.state === "unknown" || n.state === "unavailable") return "—";
		let r = typeof n.attributes.unit_of_measurement == "string" ? n.attributes.unit_of_measurement : t;
		return r ? `${n.state} ${r}` : n.state;
	}
	getAttributeString(e, t, n = "—") {
		let r = this.getState(e)?.attributes[t];
		return r == null || r === "" ? n : String(r);
	}
	getAttributeBoolean(e, t) {
		let n = this.getState(e)?.attributes[t];
		return n === !0 || n === "true" || n === "on";
	}
	getAttributeNumber(e, t) {
		let n = this.getState(e)?.attributes[t];
		if (n == null) return null;
		let r = typeof n == "number" ? n : Number.parseFloat(String(n).replace(",", "."));
		return Number.isFinite(r) ? r : null;
	}
	formatLocationValue(e) {
		let t = e.trim().toLowerCase();
		return t === "path" ? "Auf dem Weg" : t === "not working" || t === "not_working" ? "Ladestation" : e;
	}
	clampPercentage(e) {
		return e === null ? 0 : Math.min(100, Math.max(0, e));
	}
	openMoreInfo(e) {
		e && this.dispatchEvent(new CustomEvent("hass-more-info", {
			detail: { entityId: e },
			bubbles: !0,
			composed: !0
		}));
	}
	handleEntityKeydown(e, t) {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.openMoreInfo(t));
	}
	isButtonAvailable(e) {
		let t = this.getState(e);
		return !!(t && t.state !== "unknown" && t.state !== "unavailable");
	}
	async pressButton(e, t) {
		if (!(!this.hass || !e || !this.isButtonAvailable(e)) && !(t && !window.confirm(t))) try {
			await this.hass.callService("button", "press", { entity_id: e });
		} catch (t) {
			console.error(`Nova UI: Button ${e} konnte nicht ausgelöst werden.`, t);
		}
	}
	async callMowerService(e, t) {
		if (this.hass) try {
			await this.hass.callService("lawn_mower", e, { entity_id: t });
		} catch (t) {
			console.error(`Nova UI: lawn_mower.${e} konnte nicht ausgeführt werden.`, t);
		}
	}
	isValidMainState(e) {
		if (!e) return !1;
		let t = String(e.state ?? "").trim().toLowerCase();
		return ![
			"",
			"unknown",
			"unavailable",
			"none"
		].includes(t) && Re(t) !== "unknown";
	}
	getMowerCacheKey() {
		return this.config?.entity ? `nova-luba-cache-${this.config.entity}` : null;
	}
	saveLastValidMowerState(e) {
		let t = this.getMowerCacheKey();
		if (t) try {
			window.localStorage.setItem(t, JSON.stringify(e));
		} catch (e) {
			console.warn("Nova UI: Der letzte Mäherstatus konnte nicht gespeichert werden.", e);
		}
	}
	loadLastValidMowerState() {
		let e = this.getMowerCacheKey();
		if (!e) return null;
		try {
			let t = window.localStorage.getItem(e);
			if (!t) return null;
			let n = JSON.parse(t);
			return !n.novaState || ![
				"mowing",
				"paused",
				"docked",
				"returning",
				"error",
				"maintenance",
				"update",
				"offline"
			].includes(n.novaState) || typeof n.rawState != "string" || typeof n.cachedAt != "number" || !Number.isFinite(n.cachedAt) ? null : {
				novaState: n.novaState,
				rawState: n.rawState,
				cachedAt: n.cachedAt
			};
		} catch (e) {
			return console.warn("Nova UI: Der gespeicherte Mäherstatus konnte nicht gelesen werden.", e), null;
		}
	}
	resolveDisplayedMowerState(e) {
		let t = String(e.state ?? "unknown");
		if (this.isValidMainState(e)) {
			let e = Re(t);
			return this.saveLastValidMowerState({
				novaState: e,
				rawState: t,
				cachedAt: Date.now()
			}), {
				novaState: e,
				liveRawState: t,
				stale: !1,
				cachedAt: null
			};
		}
		let n = this.config?.retain_last_state ?? !0 ? this.loadLastValidMowerState() : null;
		return {
			novaState: n?.novaState ?? "unknown",
			liveRawState: t,
			stale: !0,
			cachedAt: n?.cachedAt ?? null
		};
	}
	formatRelativeTime(e) {
		if (!e) return "zu einem unbekannten Zeitpunkt";
		let t = Math.max(0, Math.floor((Date.now() - e) / 1e3));
		if (t < 10) return "vor wenigen Sekunden";
		if (t < 60) return `vor ${t} Sekunden`;
		let n = Math.floor(t / 60);
		if (n === 1) return "vor einer Minute";
		if (n < 60) return `vor ${n} Minuten`;
		let r = Math.floor(n / 60);
		if (r === 1) return "vor einer Stunde";
		if (r < 24) return `vor ${r} Stunden`;
		let i = Math.floor(r / 24);
		return i === 1 ? "vor einem Tag" : `vor ${i} Tagen`;
	}
	renderStaleWarning(e) {
		if (!e.stale || !(this.config?.show_stale_warning ?? !0)) return V;
		let t = Math.max(0, Number(this.config?.stale_after ?? 120)), n = (e.cachedAt ? Math.max(0, Math.floor((Date.now() - e.cachedAt) / 1e3)) : Infinity) >= t, r = this.config?.stale_text?.trim() || "Keine aktuellen Mammotion-Daten", i = e.cachedAt ? n ? `${r} · letzter bestätigter Zustand ${this.formatRelativeTime(e.cachedAt)}` : `Status wird aktualisiert · letzter bestätigter Zustand ${this.formatRelativeTime(e.cachedAt)}` : "Keine aktuellen Statusdaten und noch kein letzter gültiger Zustand gespeichert";
		return z`
      <div
        class=${`stale-warning${n ? " confirmed-stale" : ""}`}
        role="status"
      >
        <ha-icon
          icon=${n ? "mdi:cloud-alert-outline" : "mdi:cloud-sync-outline"}
        ></ha-icon>
        <span>${i}</span>
      </div>
    `;
	}
	getRssiPresentation(e) {
		let t = this.getNumericValue(e);
		if (t === null) return {
			value: "—",
			quality: "unknown",
			color: "var(--secondary-text-color, #8b94a7)"
		};
		let n = `${Math.round(t)} dBm`;
		return t >= -60 ? {
			value: n,
			quality: "excellent",
			color: "#42d392"
		} : t >= -70 ? {
			value: n,
			quality: "good",
			color: "#8bd450"
		} : t >= -80 ? {
			value: n,
			quality: "weak",
			color: "#f2c94c"
		} : {
			value: n,
			quality: "poor",
			color: "#ff6b6b"
		};
	}
	getConnectionTypeLabel(e) {
		let t = this.getState(e);
		if (!t || t.state === "unknown" || t.state === "unavailable") return "Unbekannt";
		let n = t.state.trim(), r = n.toLowerCase();
		return r.includes("wifi") || r.includes("wi-fi") || r.includes("wlan") ? "WLAN" : r.includes("ble") || r.includes("bluetooth") ? "Bluetooth" : r.includes("4g") || r.includes("lte") || r.includes("cell") || r.includes("mobil") ? "Mobilfunk" : n;
	}
	isConnectionActive(e, t) {
		let n = e.toLowerCase();
		return t === "wifi" ? n.includes("wifi") || n.includes("wi-fi") || n.includes("wlan") : t === "ble" ? n.includes("ble") || n.includes("bluetooth") : n.includes("4g") || n.includes("lte") || n.includes("cell") || n.includes("mobil");
	}
	renderConnectivityItem(e, t, n, r, i, a = !1) {
		return z`
      <div
        class=${`connectivity-item${a ? " active" : ""}`}
        style=${Y({ "--connection-color": i })}
        role="button"
        tabindex="0"
        title=${`${n}: ${r}`}
        @click=${() => this.openMoreInfo(e)}
        @keydown=${(t) => this.handleEntityKeydown(t, e)}
      >
        <ha-icon
          class="connectivity-icon"
          icon=${t}
        ></ha-icon>
        <span class="connectivity-label">${n}</span>
        <span class="connectivity-value">${r}</span>
      </div>
    `;
	}
	renderConnectivityBar(e) {
		let t = this.getRssiPresentation(e.bleRssiEntity), n = this.getRssiPresentation(e.mobileRssiEntity), r = this.getRssiPresentation(e.wifiRssiEntity), i = this.getConnectionTypeLabel(e.connectionTypeEntity);
		return z`
      <div class="connectivity-bar" aria-label="Verbindungsstatus">
        ${this.renderConnectivityItem(e.bleRssiEntity, "mdi:bluetooth", "Bluetooth", t.value, t.color, this.isConnectionActive(i, "ble"))}
        ${this.renderConnectivityItem(e.mobileRssiEntity, "mdi:signal-cellular-3", "Mobilfunk", n.value, n.color, this.isConnectionActive(i, "mobile"))}
        ${this.renderConnectivityItem(e.wifiRssiEntity, "mdi:wifi", "WLAN", r.value, r.color, this.isConnectionActive(i, "wifi"))}
        ${this.renderConnectivityItem(e.connectionTypeEntity, "mdi:access-point-network", "Verbindung", i, "var(--nova-state-color)", !0)}
      </div>
    `;
	}
	renderMowerServiceButton(e, t, n, r, i = "") {
		let a = this.getState(e), o = !!(a && a.state !== "unknown" && a.state !== "unavailable" && a.state !== "offline" && this.controlsAvailable);
		return z`
      <button
        class=${`action-button ${i}`.trim()}
        type="button"
        ?disabled=${!o}
        title=${o ? r : `${r} ist momentan nicht verfügbar`}
        @click=${() => this.callMowerService(t, e)}
      >
        <ha-icon icon=${n}></ha-icon>
        <span>${r}</span>
      </button>
    `;
	}
	renderActionButton(e, t, n, r = "", i) {
		let a = this.isButtonAvailable(e) && this.controlsAvailable;
		return z`
      <button
        class=${`action-button ${r}`.trim()}
        type="button"
        ?disabled=${!a}
        title=${a ? n : `${n} ist momentan nicht verfügbar`}
        @click=${() => this.pressButton(e, i)}
      >
        <ha-icon icon=${t}></ha-icon>
        <span>${n}</span>
      </button>
    `;
	}
	renderMetricRow(e, t, n, r) {
		let i = !!r;
		return z`
      <div
        class=${i ? "metric-row clickable" : "metric-row"}
        role=${i ? "button" : "presentation"}
        tabindex=${i ? "0" : "-1"}
        title=${i ? `${t} öffnen` : n}
        @click=${i ? () => this.openMoreInfo(r) : V}
        @keydown=${i ? (e) => this.handleEntityKeydown(e, r) : V}
      >
        <ha-icon
          class="metric-icon"
          icon=${e}
        ></ha-icon>

        <span class="metric-label">
          ${t}
        </span>

        <span
          class="metric-value"
          title=${n}
        >
          ${n}
        </span>
      </div>
    `;
	}
	renderMowingView(e) {
		return z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:grass"
          ></ha-icon>

          <h3 class="overview-title">
            ${e.name} mäht
          </h3>

          <div class="overview-description">
            <span>Mähvorgang läuft.</span>
            <span>Der Mäher arbeitet autonom.</span>
          </div>
        </div>

        <div class="glass-panel progress-panel">
          <div
            class="progress-ring clickable"
            role="button"
            tabindex="0"
            title="Fortschritt öffnen"
            style=${Y({ "--progress-angle": `${e.progress * 3.6}deg` })}
            @click=${() => this.openMoreInfo(e.progressEntity)}
            @keydown=${(t) => this.handleEntityKeydown(t, e.progressEntity)}
          >
            <div class="ring-content">
              <span class="ring-value">
                ${e.progressLabel}
              </span>

              <span class="ring-label">
                Fortschritt
              </span>
            </div>
          </div>

          <div class="metric-list">
            ${this.renderMetricRow("mdi:clock-outline", "Verbleibende Zeit", e.remainingTimeLabel, e.remainingTimeEntity)}

            ${this.renderMetricRow("mdi:map-marker-outline", "Aktuelle Zone", e.locationLabel, e.locationEntity)}

            ${this.renderMetricRow("mdi:timer-outline", "Gesamtzeit", e.totalTimeLabel, e.totalTimeEntity)}

            <div
              class="metric-row clickable"
              role="button"
              tabindex="0"
              title="Akkustand öffnen"
              @click=${() => this.openMoreInfo(e.batteryEntity)}
              @keydown=${(t) => this.handleEntityKeydown(t, e.batteryEntity)}
            >
              <ha-icon
                class="metric-icon"
                icon="mdi:battery"
              ></ha-icon>

              <span class="metric-label">
                Akkustand
              </span>

              <span class="metric-value">
                ${e.batteryLabel}
              </span>

              <div class="battery-track">
                <span
                  class="battery-fill"
                  style=${Y({ width: `${e.battery}%` })}
                ></span>
              </div>
            </div>
          </div>

          <div class="action-section">
            <div class="action-heading">
              Steuerung
            </div>

            <div class="action-grid">
              ${this.renderMowerServiceButton(e.mowerEntity, "pause", "mdi:pause", "Pause")}

              ${this.renderMowerServiceButton(e.mowerEntity, "dock", "mdi:home-import-outline", "Zur Ladestation")}

              ${this.renderActionButton(e.cancelCurrentTaskEntity, "mdi:stop-circle-outline", "Aufgabe abbrechen", "danger", "Soll die aktuelle Aufgabe wirklich abgebrochen werden?")}
            </div>
          </div>
        </div>
      </section>
    `;
	}
	renderDockedView(e) {
		return z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:home-battery-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${e.name} ist in der Ladestation
          </h3>

          <div class="overview-description">
            <span>Der Mäher befindet sich sicher in der Basis.</span>
            <span>Er ist bereit für die nächste Aufgabe.</span>
          </div>
        </div>

        <div class="glass-panel progress-panel">
          <div
            class="battery-ring clickable"
            role="button"
            tabindex="0"
            title="Akkustand öffnen"
            style=${Y({ "--battery-angle": `${e.battery * 3.6}deg` })}
            @click=${() => this.openMoreInfo(e.batteryEntity)}
            @keydown=${(t) => this.handleEntityKeydown(t, e.batteryEntity)}
          >
            <div class="ring-content">
              <span class="ring-value">
                ${e.batteryLabel}
              </span>

              <span class="ring-label">
                Akkustand
              </span>
            </div>
          </div>

          <div class="metric-list">
            ${this.renderMetricRow("mdi:map-marker-outline", "Aktueller Standort", e.locationLabel, e.locationEntity)}

            ${this.renderMetricRow("mdi:battery-charging", "Ladezustand", e.battery >= 100 ? "Vollständig geladen" : "Wird geladen")}

            ${this.renderMetricRow("mdi:battery-sync-outline", "Batteriezyklen", e.batteryCyclesLabel, e.batteryCyclesEntity)}

            ${this.renderMetricRow("mdi:check-circle-outline", "Bereitschaft", "Bereit")}
          </div>

          <div class="action-section">
            <div class="action-heading">
              Steuerung
            </div>

            <div class="action-grid">
              ${this.renderMowerServiceButton(e.mowerEntity, "start_mowing", "mdi:play", "Mähen starten")}

              ${this.renderActionButton(e.undockEntity, "mdi:exit-run", "Abdocken")}
            </div>
          </div>
        </div>
      </section>
    `;
	}
	renderReturningView(e) {
		return z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:home-import-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${e.name} fährt zur Ladestation
          </h3>

          <div class="overview-description">
            <span>Die aktuelle Aufgabe wird beendet.</span>
            <span>Der Mäher kehrt selbstständig zur Basis zurück.</span>
          </div>
        </div>

        <div class="glass-panel progress-panel">
          <div
            class="battery-ring clickable"
            role="button"
            tabindex="0"
            title="Akkustand öffnen"
            style=${Y({ "--battery-angle": `${e.battery * 3.6}deg` })}
            @click=${() => this.openMoreInfo(e.batteryEntity)}
            @keydown=${(t) => this.handleEntityKeydown(t, e.batteryEntity)}
          >
            <div class="ring-content">
              <span class="ring-value">
                ${e.batteryLabel}
              </span>

              <span class="ring-label">
                Akkustand
              </span>
            </div>
          </div>

          <div class="metric-list">
            ${this.renderMetricRow("mdi:map-marker-outline", "Aktueller Standort", e.locationLabel, e.locationEntity)}

            ${this.renderMetricRow("mdi:clock-outline", "Verbleibende Zeit", e.remainingTimeLabel, e.remainingTimeEntity)}

            ${this.renderMetricRow("mdi:progress-clock", "Aufgabenfortschritt", e.progressLabel, e.progressEntity)}

            ${this.renderMetricRow("mdi:home-outline", "Ziel", "Ladestation")}
          </div>

          <div class="action-section">
            <div class="action-heading">
              Steuerung
            </div>

            <div class="action-grid">
              ${this.renderMowerServiceButton(e.mowerEntity, "start_mowing", "mdi:play", "Mähen fortsetzen")}

              ${this.renderActionButton(e.cancelCurrentTaskEntity, "mdi:stop-circle-outline", "Aufgabe abbrechen", "danger", "Soll die aktuelle Aufgabe wirklich abgebrochen werden?")}
            </div>
          </div>
        </div>
      </section>
    `;
	}
	renderPausedView(e) {
		return z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:pause-circle-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${e.name} ist pausiert
          </h3>

          <div class="overview-description">
            <span>Die aktuelle Aufgabe wurde angehalten.</span>
            <span>Der Mäher wartet auf einen neuen Befehl.</span>
          </div>
        </div>

        <div class="glass-panel progress-panel">
          <div
            class="progress-ring clickable"
            role="button"
            tabindex="0"
            title="Fortschritt öffnen"
            style=${Y({ "--progress-angle": `${e.progress * 3.6}deg` })}
            @click=${() => this.openMoreInfo(e.progressEntity)}
            @keydown=${(t) => this.handleEntityKeydown(t, e.progressEntity)}
          >
            <div class="ring-content">
              <span class="ring-value">
                ${e.progressLabel}
              </span>

              <span class="ring-label">
                Fortschritt
              </span>
            </div>
          </div>

          <div class="metric-list">
            ${this.renderMetricRow("mdi:map-marker-outline", "Aktueller Standort", e.locationLabel, e.locationEntity)}

            ${this.renderMetricRow("mdi:battery", "Akkustand", e.batteryLabel, e.batteryEntity)}

            ${this.renderMetricRow("mdi:robot-mower-outline", "Aktivitätsmodus", e.activityModeLabel, e.activityModeEntity)}
          </div>

          <div class="action-section">
            <div class="action-heading">
              Steuerung
            </div>

            <div class="action-grid">
              ${this.renderMowerServiceButton(e.mowerEntity, "start_mowing", "mdi:play", "Fortsetzen")}

              ${this.renderMowerServiceButton(e.mowerEntity, "dock", "mdi:home-import-outline", "Zur Ladestation")}

              ${this.renderActionButton(e.cancelCurrentTaskEntity, "mdi:stop-circle-outline", "Aufgabe abbrechen", "danger", "Soll die aktuelle Aufgabe wirklich abgebrochen werden?")}
            </div>
          </div>
        </div>
      </section>
    `;
	}
	renderOfflineView(e) {
		return z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:power-plug-off-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${e.name} ist offline
          </h3>

          <div class="overview-description">
            <span>Der Mäher ist momentan nicht erreichbar.</span>
            <span>Es werden keine aktuellen Daten übertragen.</span>
          </div>
        </div>

        <div class="glass-panel state-panel">
          <div class="state-symbol">
            <ha-icon
              icon="mdi:robot-mower-outline"
            ></ha-icon>
          </div>

          <div class="state-message">
            Bitte schalten Sie den Mäher ein und
            überprüfen Sie anschließend die Verbindung
            zur Mammotion-Integration.
          </div>

          <div class="metric-list">
            ${this.renderMetricRow("mdi:power", "Gerätestatus", "Ausgeschaltet oder nicht erreichbar")}

            ${this.renderMetricRow("mdi:access-point-off", "Verbindung", "Nicht verfügbar")}

            ${this.renderMetricRow("mdi:information-outline", "Empfehlung", "Mäher einschalten")}
          </div>

          <div class="state-detail">
            Gemeldeter Rohstatus: ${e.rawState}
          </div>
        </div>
      </section>
    `;
	}
	renderErrorView(e) {
		return z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:alert-circle-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${e.name} benötigt Aufmerksamkeit
          </h3>

          <div class="overview-description">
            <span>Der Mäher meldet eine Störung.</span>
            <span>
              Die zuletzt gemeldeten Fehlerdaten
              werden angezeigt.
            </span>
          </div>
        </div>

        <div class="glass-panel">
          <div class="metric-list">
            ${this.renderMetricRow("mdi:message-alert-outline", "Fehlermeldung", e.lastErrorMessageLabel, e.lastErrorMessageEntity)}

            ${this.renderMetricRow("mdi:numeric", "Fehlercode", e.lastErrorCodeLabel, e.lastErrorCodeEntity)}

            ${this.renderMetricRow("mdi:clock-alert-outline", "Fehlerzeitpunkt", e.lastErrorTimeLabel, e.lastErrorTimeEntity)}

            ${this.renderMetricRow("mdi:robot-mower-outline", "Aktivitätsmodus", e.activityModeLabel, e.activityModeEntity)}
          </div>

          <div class="action-section">
            <div class="action-heading">
              Notfallschub
            </div>

            <div class="emergency-pad">
              ${this.renderActionButton(e.emergencyPushForwardEntity, "mdi:arrow-up-bold", "Vorwärts", "forward")}

              ${this.renderActionButton(e.emergencyPushLeftEntity, "mdi:arrow-left-bold", "Links", "left")}

              <div class="emergency-center">
                <ha-icon
                  icon="mdi:robot-mower-outline"
                ></ha-icon>
              </div>

              ${this.renderActionButton(e.emergencyPushRightEntity, "mdi:arrow-right-bold", "Rechts", "right")}

              ${this.renderActionButton(e.emergencyPushBackwardEntity, "mdi:arrow-down-bold", "Rückwärts", "backward")}
            </div>
          </div>
        </div>
      </section>
    `;
	}
	renderUpdateView(e) {
		if (e.firmwareUpdateInProgress) {
			let t = e.firmwareUpdatePercentage ?? 0;
			return z`
        <section class="overview">
          <div class="overview-heading">
            <ha-icon
              class="overview-icon"
              icon="mdi:update"
            ></ha-icon>

            <h3 class="overview-title">
              Software-Update wird installiert
            </h3>

            <div class="overview-description">
              <span>
                ${e.name} wird gerade aktualisiert.
              </span>

              <span>
                Bitte den Mäher währenddessen
                nicht ausschalten.
              </span>
            </div>
          </div>

          <div class="glass-panel progress-panel">
            <div
              class="progress-ring clickable"
              role="button"
              tabindex="0"
              title="Firmware-Update öffnen"
              style=${Y({ "--progress-angle": `${t * 3.6}deg` })}
              @click=${() => this.openMoreInfo(e.firmwareUpdateEntity)}
              @keydown=${(t) => this.handleEntityKeydown(t, e.firmwareUpdateEntity)}
            >
              <div class="ring-content">
                <span class="ring-value">
                  ${e.firmwareUpdatePercentageLabel}
                </span>

                <span class="ring-label">
                  Update
                </span>
              </div>
            </div>

            <div class="metric-list">
              ${this.renderMetricRow("mdi:package-down", "Installierte Version", e.firmwareInstalledVersionLabel, e.firmwareUpdateEntity)}

              ${this.renderMetricRow("mdi:package-up", "Neue Version", e.firmwareLatestVersionLabel, e.firmwareUpdateEntity)}

              ${this.renderMetricRow("mdi:progress-clock", "Fortschritt", e.firmwareUpdatePercentageLabel, e.firmwareUpdateEntity)}

              ${this.renderMetricRow("mdi:battery", "Akkustand", e.batteryLabel)}
            </div>
          </div>
        </section>
      `;
		}
		return e.firmwareUpdateAvailable ? z`
        <section class="overview">
          <div class="overview-heading">
            <ha-icon
              class="overview-icon"
              icon="mdi:cloud-download-outline"
            ></ha-icon>

            <h3 class="overview-title">
              Firmware-Update verfügbar
            </h3>

            <div class="overview-description">
              <span>
                Für ${e.name} steht eine neue
                Firmware-Version bereit.
              </span>

              <span>
                Das Update kann über Home Assistant
                gestartet werden.
              </span>
            </div>
          </div>

          <div class="glass-panel state-panel">
            <div class="state-symbol">
              <ha-icon
                icon="mdi:download"
              ></ha-icon>
            </div>

            <div class="metric-list">
              ${this.renderMetricRow("mdi:package-down", "Installierte Version", e.firmwareInstalledVersionLabel, e.firmwareUpdateEntity)}

              ${this.renderMetricRow("mdi:package-up", "Neue Version", e.firmwareLatestVersionLabel, e.firmwareUpdateEntity)}

              ${this.renderMetricRow("mdi:text-box-outline", "Release-Information", e.firmwareReleaseSummaryLabel, e.firmwareUpdateEntity)}

              ${this.renderMetricRow("mdi:update-auto", "Automatische Updates", e.firmwareAutoUpdateLabel, e.firmwareUpdateEntity)}
            </div>
          </div>
        </section>
      ` : z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:check-decagram-outline"
          ></ha-icon>

          <h3 class="overview-title">
            Firmware ist aktuell
          </h3>

          <div class="overview-description">
            <span>
              ${e.name} verwendet bereits
              die neueste Firmware.
            </span>

            <span>
              Es ist momentan kein Update erforderlich.
            </span>
          </div>
        </div>

        <div class="glass-panel state-panel">
          <div class="state-symbol">
            <ha-icon
              icon="mdi:check"
            ></ha-icon>
          </div>

          <div class="metric-list">
            ${this.renderMetricRow("mdi:package-check", "Installierte Version", e.firmwareInstalledVersionLabel, e.firmwareUpdateEntity)}

            ${this.renderMetricRow("mdi:package-variant-closed-check", "Neueste Version", e.firmwareLatestVersionLabel, e.firmwareUpdateEntity)}

            ${this.renderMetricRow("mdi:check-circle-outline", "Firmwarestatus", "Aktuell", e.firmwareUpdateEntity)}

            ${this.renderMetricRow("mdi:update-auto", "Automatische Updates", e.firmwareAutoUpdateLabel, e.firmwareUpdateEntity)}
          </div>
        </div>
      </section>
    `;
	}
	renderMaintenanceView(e) {
		return z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:tools"
          ></ha-icon>

          <h3 class="overview-title">
            Wartungsübersicht
          </h3>

          <div class="overview-description">
            <span>
              Die wichtigsten Wartungs- und
              Laufzeitdaten von ${e.name}.
            </span>

            <span>
              Messer und Mähwerk regelmäßig prüfen.
            </span>
          </div>
        </div>

        <div class="glass-panel">
          <div class="metric-list">
            ${this.renderMetricRow("mdi:blade", "Messerverschleiß-Warnzeit", e.bladeWearWarningTimeLabel, e.bladeWearWarningTimeEntity)}

            ${this.renderMetricRow("mdi:timer-outline", "Aufgabendauer gesamt", e.taskDurationLabel, e.taskDurationEntity)}

            ${this.renderMetricRow("mdi:map-marker-distance", "Gesamtkilometerstand", e.totalMileageLabel, e.totalMileageEntity)}

            ${this.renderMetricRow("mdi:robot-mower-outline", "Aktivitätsmodus", e.activityModeLabel, e.activityModeEntity)}
          </div>

          <div class="action-section">
            <div class="action-heading">
              Erweiterte Wartungsfunktionen
            </div>

            <div class="action-grid">
              ${this.renderActionButton(e.relocateChargingStationEntity, "mdi:map-marker-sync-outline", "Ladestation umsetzen", "", "Soll die Funktion „Ladestation umsetzen“ wirklich ausgelöst werden?")}

              ${this.renderActionButton(e.restartMowerEntity, "mdi:restart", "Mäher neu starten", "danger", "Soll der Mäher wirklich neu gestartet werden?")}
            </div>
          </div>
        </div>
      </section>
    `;
	}
	renderUnknownView(e) {
		return z`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:help-circle-outline"
          ></ha-icon>

          <h3 class="overview-title">
            Status konnte nicht erkannt werden
          </h3>
        </div>

        <div class="glass-panel state-panel">
          <div class="state-symbol">
            <ha-icon
              icon="mdi:help"
            ></ha-icon>
          </div>

          <div class="state-message">
            Der aktuelle Zustand des Mähers kann noch
            keiner bekannten Ansicht zugeordnet werden.
          </div>

          <div class="state-detail">
            Rohstatus: ${e.rawState}
          </div>
        </div>
      </section>
    `;
	}
	renderStateContent(e) {
		switch (e.novaState) {
			case "mowing": return this.renderMowingView(e);
			case "paused": return this.renderPausedView(e);
			case "docked": return this.renderDockedView(e);
			case "returning": return this.renderReturningView(e);
			case "error": return this.renderErrorView(e);
			case "maintenance": return this.renderMaintenanceView(e);
			case "update": return this.renderUpdateView(e);
			case "offline": return this.renderOfflineView(e);
			default: return this.renderUnknownView(e);
		}
	}
	handleImageError(e) {
		let t = e.currentTarget;
		t.style.display = "none";
		let n = t.parentElement?.querySelector(".robot-fallback");
		n && (n.hidden = !1);
	}
	render() {
		if (!this.config) return V;
		let e = this.mowerState, t = this.config.name ?? "Luba", n = this.config.model ?? "Luba 3 AWD LiDAR", r = this.config.battery_entity ?? ze, i = this.config.battery_cycles_entity ?? Be, a = this.config.location_entity ?? Ve, o = this.config.progress_entity ?? He, s = this.config.remaining_time_entity ?? Ue, c = this.config.total_time_entity ?? We, l = this.config.last_error_message_entity ?? Ge, u = this.config.last_error_time_entity ?? Ke, d = this.config.last_error_code_entity ?? qe, f = this.config.activity_mode_entity ?? Je, p = this.config.blade_wear_warning_time_entity ?? Ye, m = this.config.task_duration_entity ?? Xe, h = this.config.total_mileage_entity ?? Ze, g = this.config.firmware_update_entity ?? Qe, ee = this.config.emergency_push_left_entity ?? $e, te = this.config.emergency_push_right_entity ?? et, _ = this.config.emergency_push_backward_entity ?? tt, v = this.config.emergency_push_forward_entity ?? nt, y = this.config.relocate_charging_station_entity ?? rt, ne = this.config.restart_mower_entity ?? it, b = this.config.cancel_current_task_entity ?? at, x = this.config.undock_entity ?? ot, S = this.config.ble_rssi_entity ?? st, C = this.config.mobile_rssi_entity ?? ct, re = this.config.wifi_rssi_entity ?? lt, ie = this.config.connection_type_entity ?? ut, w = Le(n), T = Ne(w), E = Ae(w);
		if (!e) {
			let e = Z.states.error;
			return z`
        <ha-card
          style=${Y({
				"--nova-state-color": e.color,
				"--nova-state-soft": e.soft,
				"--nova-state-glow": e.glow
			})}
        >
          <div class="entity-error">
            <div>
              <strong>Entität nicht gefunden</strong>

              <p>
                „${this.config.entity}“ ist in
                Home Assistant nicht vorhanden.
              </p>
            </div>
          </div>
        </ha-card>
      `;
		}
		let D = this.resolveDisplayedMowerState(e), O = D.novaState, k = this.config.disable_controls_when_stale ?? !0;
		this.controlsAvailable = !D.stale || !k;
		let A = O === "paused" ? Z.states.returning : Z.states[O], j = Ie(O === "paused" ? "returning" : O), M = Pe(w), N = {
			...j,
			front: {
				...j.front,
				asset: M.front
			},
			side: {
				...j.side,
				asset: M.side
			}
		}, P = this.getNumericValue(o), F = this.clampPercentage(P), I = P === null ? "—" : `${Math.round(F)} %`, ae = this.getNumericValue(r), L = this.clampPercentage(ae), R = this.getState(g)?.state === "on", B = this.getAttributeBoolean(g, "in_progress"), H = this.getAttributeNumber(g, "update_percentage"), U = H === null ? null : this.clampPercentage(H), W = this.getAttributeBoolean(g, "auto_update"), G = {
			name: t,
			novaState: O,
			rawState: D.liveRawState,
			stale: D.stale,
			cachedAt: D.cachedAt,
			controlsAvailable: this.controlsAvailable,
			mowerEntity: this.config.entity,
			batteryEntity: r,
			batteryCyclesEntity: i,
			locationEntity: a,
			progressEntity: o,
			remainingTimeEntity: s,
			totalTimeEntity: c,
			lastErrorMessageEntity: l,
			lastErrorTimeEntity: u,
			lastErrorCodeEntity: d,
			activityModeEntity: f,
			bladeWearWarningTimeEntity: p,
			taskDurationEntity: m,
			totalMileageEntity: h,
			firmwareUpdateEntity: g,
			emergencyPushLeftEntity: ee,
			emergencyPushRightEntity: te,
			emergencyPushBackwardEntity: _,
			emergencyPushForwardEntity: v,
			relocateChargingStationEntity: y,
			restartMowerEntity: ne,
			cancelCurrentTaskEntity: b,
			undockEntity: x,
			bleRssiEntity: S,
			mobileRssiEntity: C,
			wifiRssiEntity: re,
			connectionTypeEntity: ie,
			progress: F,
			progressLabel: I,
			battery: L,
			batteryLabel: this.formatEntityValue(r, "%"),
			batteryCyclesLabel: this.formatEntityValue(i),
			locationLabel: this.formatLocationValue(this.formatEntityValue(a)),
			remainingTimeLabel: this.formatEntityValue(s),
			totalTimeLabel: this.formatEntityValue(c),
			lastErrorMessageLabel: this.formatEntityValue(l),
			lastErrorTimeLabel: this.formatEntityValue(u),
			lastErrorCodeLabel: this.formatEntityValue(d),
			activityModeLabel: this.formatEntityValue(f),
			bladeWearWarningTimeLabel: this.formatEntityValue(p),
			taskDurationLabel: this.formatEntityValue(m),
			totalMileageLabel: this.formatEntityValue(h),
			firmwareInstalledVersionLabel: this.getAttributeString(g, "installed_version"),
			firmwareLatestVersionLabel: this.getAttributeString(g, "latest_version"),
			firmwareAutoUpdateLabel: W ? "Aktiviert" : "Deaktiviert",
			firmwareReleaseSummaryLabel: this.getAttributeString(g, "release_summary", "Keine Angaben"),
			firmwareUpdateAvailable: R,
			firmwareUpdateInProgress: B,
			firmwareUpdatePercentage: U,
			firmwareUpdatePercentageLabel: U === null ? "—" : `${Math.round(U)} %`
		};
		return z`
      <ha-card style=${Y({
			"--nova-state-color": A.color,
			"--nova-state-soft": A.soft,
			"--nova-state-glow": A.glow,
			"--robot-desktop-scale": String(E.desktop.scale),
			"--robot-desktop-x": `${E.desktop.translateX}px`,
			"--robot-desktop-y": `${E.desktop.translateY}px`,
			"--robot-desktop-max-width": `${E.desktop.maxWidth}px`,
			"--robot-desktop-max-height": `${E.desktop.maxHeight}px`,
			"--robot-mobile-scale": String(E.mobile.scale),
			"--robot-mobile-x": `${E.mobile.translateX}px`,
			"--robot-mobile-y": `${E.mobile.translateY}px`,
			"--robot-mobile-max-width": `${E.mobile.maxWidth}px`,
			"--robot-mobile-max-height": `${E.mobile.maxHeight}px`
		})}>
        <div class=${`card-layout${G.stale ? " stale" : ""}`}>
          <header class="header">
            <div class="brand">
              <div class="eyebrow">
                Nova UI
              </div>

              <h2>${t}</h2>

              <div class="model">
                ${n}
              </div>
            </div>

            ${this.renderConnectivityBar(G)}

            <div
              class="led-placeholder"
              title="Statusanzeige"
            >
              <span class="led-core"></span>
            </div>
          </header>

          ${this.renderStaleWarning(G)}

          <main class="content-grid">
            <section class="hero">
              <div class="robot-stage">
                <img
                  class="robot-image"
                  src=${T}
                  alt=${n}
                  loading="eager"
                  @error=${this.handleImageError}
                />

                <mower-lighting
                  .lighting=${N}
                ></mower-lighting>

                <div
                  class="robot-fallback"
                  hidden
                >
                  <div class="robot-fallback-symbol">
                    ◆
                  </div>

                  <div class="robot-fallback-title">
                    Gerätebild konnte nicht geladen werden
                  </div>

                  <div class="robot-fallback-path">
                    ${T}
                  </div>
                </div>
              </div>
            </section>

            ${this.renderStateContent(G)}
          </main>

          <footer class="footer">
            <div class="status-group">
              <div class="status">
                <span class="dot"></span>

                <span>
                  ${G.stale ? `Letzter Stand: ${dt[O]}` : dt[O]}
                </span>
              </div>

              <div class="raw-state">
                Rohstatus: ${G.rawState}
              </div>
            </div>

            <div class="layout-note">
              ${w}
            </div>
          </footer>
        </div>
      </ha-card>
    `;
	}
	getCardSize() {
		return 10;
	}
	static getStubConfig() {
		return {
			type: "custom:nova-luba-card",
			entity: "lawn_mower.luba_va8tp48r",
			name: "Luba",
			model: "Luba 3 AWD LiDAR",
			battery_entity: ze,
			battery_cycles_entity: Be,
			location_entity: Ve,
			progress_entity: He,
			remaining_time_entity: Ue,
			total_time_entity: We,
			last_error_message_entity: Ge,
			last_error_time_entity: Ke,
			last_error_code_entity: qe,
			activity_mode_entity: Je,
			blade_wear_warning_time_entity: Ye,
			task_duration_entity: Xe,
			total_mileage_entity: Ze,
			firmware_update_entity: Qe,
			emergency_push_left_entity: $e,
			emergency_push_right_entity: et,
			emergency_push_backward_entity: tt,
			emergency_push_forward_entity: nt,
			relocate_charging_station_entity: rt,
			restart_mower_entity: it,
			cancel_current_task_entity: at,
			undock_entity: ot,
			retain_last_state: !0,
			show_stale_warning: !0,
			disable_controls_when_stale: !0,
			stale_after: 120,
			stale_text: "Keine aktuellen Mammotion-Daten"
		};
	}
};
X([be({ attribute: !1 })], $.prototype, "hass", void 0), X([xe()], $.prototype, "config", void 0), $ = X([_e("nova-luba-card")], $), window.customCards = window.customCards || [], window.customCards.push({
	type: "nova-luba-card",
	name: "Nova UI - Luba Card",
	description: "A dynamic Mammotion mower card for Home Assistant.",
	preview: !0
});
//#endregion
export { $ as NovaLubaCard };
