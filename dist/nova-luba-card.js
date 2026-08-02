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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, p = f.trustedTypes, re = p ? p.emptyScript : "", ie = f.reactiveElementPolyfillSupport, m = (e, t) => e, h = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? re : null;
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
}, g = (e, t) => !l(e, t), _ = {
	attribute: !0,
	type: String,
	converter: h,
	reflect: !1,
	useDefault: !1,
	hasChanged: g
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var v = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = _) {
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
		return this.elementProperties.get(e) ?? _;
	}
	static _$Ei() {
		if (this.hasOwnProperty(m("elementProperties"))) return;
		let e = ne(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(m("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(m("properties"))) {
			let e = this.properties, t = [...ee(e), ...te(e)];
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
			let i = (n.converter?.toAttribute === void 0 ? h : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? h : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? g)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[m("elementProperties")] = /* @__PURE__ */ new Map(), v[m("finalized")] = /* @__PURE__ */ new Map(), ie?.({ ReactiveElement: v }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var y = globalThis, ae = (e) => e, b = y.trustedTypes, x = b ? b.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, S = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, w = "?" + C, oe = `<${w}>`, T = document, E = () => T.createComment(""), D = (e) => e === null || typeof e != "object" && typeof e != "function", O = Array.isArray, se = (e) => O(e) || typeof e?.[Symbol.iterator] == "function", k = "[ 	\n\f\r]", A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, j = /-->/g, M = />/g, N = RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), P = /'/g, F = /"/g, I = /^(?:script|style|textarea|title)$/i, L = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), R = Symbol.for("lit-noChange"), z = Symbol.for("lit-nothing"), B = /* @__PURE__ */ new WeakMap(), V = T.createTreeWalker(T, 129);
function H(e, t) {
	if (!O(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return x === void 0 ? t : x.createHTML(t);
}
var ce = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = A;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === A ? c[1] === "!--" ? o = j : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = N) : (I.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = N) : o = M : o === N ? c[0] === ">" ? (o = i ?? A, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? N : c[3] === "\"" ? F : P) : o === F || o === P ? o = N : o === j || o === M ? o = A : (o = N, i = void 0);
		let d = o === N && e[t + 1].startsWith("/>") ? " " : "";
		a += o === A ? n + oe : l >= 0 ? (r.push(s), n.slice(0, l) + S + n.slice(l) + C + d) : n + C + (l === -2 ? t : d);
	}
	return [H(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, U = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ce(t, n);
		if (this.el = e.createElement(l, r), V.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = V.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(S)) {
					let t = u[o++], n = i.getAttribute(e).split(C), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? ue : r[1] === "?" ? de : r[1] === "@" ? fe : K
					}), i.removeAttribute(e);
				} else e.startsWith(C) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (I.test(i.tagName)) {
					let e = i.textContent.split(C), t = e.length - 1;
					if (t > 0) {
						i.textContent = b ? b.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], E()), V.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], E());
					}
				}
			} else if (i.nodeType === 8) if (i.data === w) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(C, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += C.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = T.createElement("template");
		return n.innerHTML = e, n;
	}
};
function W(e, t, n = e, r) {
	if (t === R) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = D(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = W(e, i._$AS(e, t.values), i, r)), t;
}
var le = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? T).importNode(t, !0);
		V.currentNode = r;
		let i = V.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new G(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new pe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = V.nextNode(), a++);
		}
		return V.currentNode = T, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, G = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = z, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = W(this, e, t), D(e) ? e === z || e == null || e === "" ? (this._$AH !== z && this._$AR(), this._$AH = z) : e !== this._$AH && e !== R && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? se(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== z && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = U.createElement(H(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new le(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = B.get(e.strings);
		return t === void 0 && B.set(e.strings, t = new U(e)), t;
	}
	k(t) {
		O(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(E()), this.O(E()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ae(e).nextSibling;
			ae(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, K = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = z, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = z;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = W(this, e, t, 0), a = !D(e) || e !== this._$AH && e !== R, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = W(this, r[n + o], t, o), s === R && (s = this._$AH[o]), a ||= !D(s) || s !== this._$AH[o], s === z ? e = z : e !== z && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, ue = class extends K {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === z ? void 0 : e;
	}
}, de = class extends K {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== z);
	}
}, fe = class extends K {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = W(this, e, t, 0) ?? z) === R) return;
		let n = this._$AH, r = e === z && n !== z || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== z && (n === z || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, pe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		W(this, e);
	}
}, me = y.litHtmlPolyfillSupport;
me?.(U, G), (y.litHtmlVersions ??= []).push("3.3.3");
var he = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new G(t.insertBefore(E(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, q = globalThis, J = class extends v {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = he(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return R;
	}
};
J._$litElement$ = !0, J.finalized = !0, q.litElementHydrateSupport?.({ LitElement: J });
var ge = q.litElementPolyfillSupport;
ge?.({ LitElement: J }), (q.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var _e = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, ve = {
	attribute: !0,
	type: String,
	converter: h,
	reflect: !1,
	hasChanged: g
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
function Y(e) {
	return (t, n) => typeof n == "object" ? ye(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function be(e) {
	return Y({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/lit-html/directive.js
var xe = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Se = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ce = class {
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
}, we = "important", Te = " !important", X = Se(class extends Ce {
	constructor(e) {
		if (super(e), e.type !== xe.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
				let t = typeof r == "string" && r.endsWith(Te);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? we : "") : n[e] = r;
			}
		}
		return R;
	}
}), Z = {
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
}, Ee = {
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
}, De = "/hacsfiles/nova-luba-card/images";
function Oe(e) {
	let t = Ee[e];
	return [
		De,
		t.assetFolder,
		t.defaultImage
	].join("/");
}
//#endregion
//#region src/helpers/resolve-mower-model.ts
function ke(e) {
	let t = e?.trim().toLowerCase().replaceAll("-", " ").replaceAll("_", " ");
	return t ? t === "luba3" || t.includes("luba 3") ? "luba3" : t === "luba2" || t.includes("luba 2") ? "luba2" : t === "luba1" || t.includes("luba 1") ? "luba1" : t === "mini2" || t.includes("mini 2") ? "mini2" : t === "mini1" || t.includes("mini 1") ? "mini1" : "unknown" : "unknown";
}
//#endregion
//#region src/helpers/resolve-mower-state.ts
function Ae(e) {
	let t = e?.trim().toLowerCase();
	return !t || t === "unknown" ? "unknown" : t === "unavailable" || t === "offline" ? "offline" : t === "mowing" || t === "mähend" || t === "mowing_task" ? "mowing" : t === "docked" || t === "charging" || t === "idle" ? "docked" : t === "returning" || t === "returning_to_dock" ? "returning" : t === "error" || t === "blocked" ? "error" : "unknown";
}
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/decorate.js
function Q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/index.ts
var je = {
	mowing: "Mäht",
	docked: "Im Dock",
	returning: "Rückkehr zur Ladestation",
	error: "Fehler",
	maintenance: "Wartungsmodus",
	update: "Update verfügbar",
	offline: "Offline",
	unknown: "Unbekannt"
}, $ = class extends J {
	static {
		this.styles = o`
    :host {
      display: block;
    }

    ha-card {
      position: relative;
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
      grid-template-rows: auto 1fr auto;
      min-height: 520px;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: ${a(Z.spacing.md)};
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

    .hero {
      display: grid;
      align-items: center;
      justify-items: center;
      padding:
        ${a(Z.spacing.lg)}
        0;
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
          ellipse at 50% 62%,
          var(--nova-state-soft),
          transparent 58%
        );
    }

    .robot-stage::after {
      position: absolute;
      z-index: 0;
      right: 15%;
      bottom: 0%;
      left: 15%;
      height: 28px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.48);
      filter: blur(28px);
      content: "";
    }

    .robot-image {
      position: relative;
      z-index: 2;
      display: block;
      width: 100%;
      max-width: 520px;
      max-height: 330px;
      object-fit: contain;
      transform: translateY(58px) scale(1.43);
      transform-origin: center center;
      filter:
        drop-shadow(0 20px 22px rgba(0, 0, 0, 0.38))
        drop-shadow(0 0 12px var(--nova-state-glow));
      transition:
        transform ${a(Z.animation.normal)} ease,
        filter ${a(Z.animation.normal)} ease;
    }

    .robot-image:hover {
      transform: translateY(54px) scale(1.46);
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
      transition: all ${a(Z.animation.normal)} ease;
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

    /*
     * Home Assistant kann Karten auch auf einem Desktop schmaler
     * als 600 Pixel darstellen. Deshalb erhält auch dieser Bereich
     * die vergrößerten Bildwerte.
     */
    @media (max-width: 600px) {
      ha-card {
        min-height: 440px;
        padding: ${a(Z.spacing.md)};
      }

      .card-layout {
        min-height: 440px;
      }

      .led-placeholder {
        width: 44px;
        height: 44px;
      }

      .robot-stage {
        min-height: 260px;
      }

      .robot-image {
        width: 100%;
        max-width: 430px;
        max-height: 285px;
        transform: translateY(34px) scale(1.38);
      }

      .robot-image:hover {
        transform: translateY(38px) scale(1.41);
      }

      .footer {
        align-items: flex-start;
        flex-direction: column;
      }

      .layout-note {
        text-align: left;
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
	handleImageError(e) {
		let t = e.currentTarget;
		t.style.display = "none";
		let n = t.nextElementSibling;
		n && (n.hidden = !1);
	}
	render() {
		if (!this.config) return z;
		let e = this.mowerState, t = this.config.name ?? "Luba", n = this.config.model ?? "Luba 3 AWD LiDAR", r = ke(n), i = Oe(r);
		if (!e) {
			let e = Z.states.error;
			return L`
        <ha-card
          style=${X({
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
		let a = Ae(e.state), o = Z.states[a];
		return L`
      <ha-card style=${X({
			"--nova-state-color": o.color,
			"--nova-state-soft": o.soft,
			"--nova-state-glow": o.glow
		})}>
        <div class="card-layout">
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

            <div
              class="led-placeholder"
              title="LED-Platzhalter"
            >
              <span class="led-core"></span>
            </div>
          </header>

          <main class="hero">
            <div class="robot-stage">
              <img
                class="robot-image"
                src=${i}
                alt=${n}
                loading="eager"
                @error=${this.handleImageError}
              />

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
                  ${i}
                </div>
              </div>
            </div>
          </main>

          <footer class="footer">
            <div class="status-group">
              <div class="status">
                <span class="dot"></span>

                <span>
                  ${je[a]}
                </span>
              </div>

              <div class="raw-state">
                Rohstatus: ${e.state}
              </div>
            </div>

            <div class="layout-note">
              ${r}
            </div>
          </footer>
        </div>
      </ha-card>
    `;
	}
	getCardSize() {
		return 7;
	}
	static getStubConfig() {
		return {
			type: "custom:nova-luba-card",
			entity: "lawn_mower.luba_va8tp48r",
			name: "Luba",
			model: "Luba 3 AWD LiDAR"
		};
	}
};
Q([Y({ attribute: !1 })], $.prototype, "hass", void 0), Q([be()], $.prototype, "config", void 0), $ = Q([_e("nova-luba-card")], $), window.customCards = window.customCards || [], window.customCards.push({
	type: "nova-luba-card",
	name: "Nova UI - Luba Card",
	description: "A dynamic Mammotion mower card for Home Assistant.",
	preview: !0
});
//#endregion
export { $ as NovaLubaCard };
