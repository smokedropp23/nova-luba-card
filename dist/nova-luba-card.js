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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", ee = h.reactiveElementPolyfillSupport, v = (e, t) => e, y = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? _ : null;
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
}, b = (e, t) => !l(e, t), x = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	useDefault: !1,
	hasChanged: b
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var S = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = x) {
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
		return this.elementProperties.get(e) ?? x;
	}
	static _$Ei() {
		if (this.hasOwnProperty(v("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(v("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) {
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
			let i = (n.converter?.toAttribute === void 0 ? y : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? y : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? b)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[v("elementProperties")] = /* @__PURE__ */ new Map(), S[v("finalized")] = /* @__PURE__ */ new Map(), ee?.({ ReactiveElement: S }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var C = globalThis, w = (e) => e, T = C.trustedTypes, E = T ? T.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, D = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, te = "?" + O, ne = `<${te}>`, k = document, A = () => k.createComment(""), j = (e) => e === null || typeof e != "object" && typeof e != "function", M = Array.isArray, re = (e) => M(e) || typeof e?.[Symbol.iterator] == "function", N = "[ 	\n\f\r]", P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ie = /-->/g, ae = />/g, F = RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, I = /"/g, se = /^(?:script|style|textarea|title)$/i, L = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), R = Symbol.for("lit-noChange"), z = Symbol.for("lit-nothing"), ce = /* @__PURE__ */ new WeakMap(), B = k.createTreeWalker(k, 129);
function le(e, t) {
	if (!M(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return E === void 0 ? t : E.createHTML(t);
}
var ue = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = P;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === P ? c[1] === "!--" ? o = ie : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = F) : (se.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = F) : o = ae : o === F ? c[0] === ">" ? (o = i ?? P, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? F : c[3] === "\"" ? I : oe) : o === I || o === oe ? o = F : o === ie || o === ae ? o = P : (o = F, i = void 0);
		let d = o === F && e[t + 1].startsWith("/>") ? " " : "";
		a += o === P ? n + ne : l >= 0 ? (r.push(s), n.slice(0, l) + D + n.slice(l) + O + d) : n + O + (l === -2 ? t : d);
	}
	return [le(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, V = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ue(t, n);
		if (this.el = e.createElement(l, r), B.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = B.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(D)) {
					let t = u[o++], n = i.getAttribute(e).split(O), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? fe : r[1] === "?" ? pe : r[1] === "@" ? me : W
					}), i.removeAttribute(e);
				} else e.startsWith(O) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (se.test(i.tagName)) {
					let e = i.textContent.split(O), t = e.length - 1;
					if (t > 0) {
						i.textContent = T ? T.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], A()), B.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], A());
					}
				}
			} else if (i.nodeType === 8) if (i.data === te) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(O, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += O.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = k.createElement("template");
		return n.innerHTML = e, n;
	}
};
function H(e, t, n = e, r) {
	if (t === R) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = j(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = H(e, i._$AS(e, t.values), i, r)), t;
}
var de = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? k).importNode(t, !0);
		B.currentNode = r;
		let i = B.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new U(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new he(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = B.nextNode(), a++);
		}
		return B.currentNode = k, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, U = class e {
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
		e = H(this, e, t), j(e) ? e === z || e == null || e === "" ? (this._$AH !== z && this._$AR(), this._$AH = z) : e !== this._$AH && e !== R && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? re(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== z && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = V.createElement(le(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new de(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ce.get(e.strings);
		return t === void 0 && ce.set(e.strings, t = new V(e)), t;
	}
	k(t) {
		M(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(A()), this.O(A()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = w(e).nextSibling;
			w(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, W = class {
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
		if (i === void 0) e = H(this, e, t, 0), a = !j(e) || e !== this._$AH && e !== R, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = H(this, r[n + o], t, o), s === R && (s = this._$AH[o]), a ||= !j(s) || s !== this._$AH[o], s === z ? e = z : e !== z && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, fe = class extends W {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === z ? void 0 : e;
	}
}, pe = class extends W {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== z);
	}
}, me = class extends W {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = H(this, e, t, 0) ?? z) === R) return;
		let n = this._$AH, r = e === z && n !== z || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== z && (n === z || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, he = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		H(this, e);
	}
}, ge = C.litHtmlPolyfillSupport;
ge?.(V, U), (C.litHtmlVersions ??= []).push("3.3.3");
var _e = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new U(t.insertBefore(A(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, G = globalThis, K = class extends S {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = _e(t, this.renderRoot, this.renderOptions);
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
K._$litElement$ = !0, K.finalized = !0, G.litElementHydrateSupport?.({ LitElement: K });
var ve = G.litElementPolyfillSupport;
ve?.({ LitElement: K }), (G.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var ye = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, be = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	hasChanged: b
}, xe = (e = be, t, n) => {
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
function q(e) {
	return (t, n) => typeof n == "object" ? xe(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function Se(e) {
	return q({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/lit-html/directive.js
var Ce = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, we = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Te = class {
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
}, Ee = "important", De = " !important", J = we(class extends Te {
	constructor(e) {
		if (super(e), e.type !== Ce.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
				let t = typeof r == "string" && r.endsWith(De);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? Ee : "") : n[e] = r;
			}
		}
		return R;
	}
});
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/decorate.js
function Y(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/components/mower-lighting.ts
var X = class extends K {
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
		return !e.asset || !e.visible || e.brightness <= 0 ? z : L`
      <div
        class=${[
			"overlay",
			t,
			e.animation === "none" ? "" : e.animation
		].filter(Boolean).join(" ")}
        aria-hidden="true"
        style=${J({
			"--light-color": e.color,
			"--light-brightness": String(e.brightness),
			"--light-asset": `url("${e.asset}")`
		})}
      ></div>
    `;
	}
	render() {
		return this.lighting ? L`
      ${this.renderOverlay(this.lighting.front, "front")}

      ${this.renderOverlay(this.lighting.side, "side")}
    ` : z;
	}
};
Y([q({ attribute: !1 })], X.prototype, "lighting", void 0), X = Y([ye("mower-lighting")], X);
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
	return !t || t === "unknown" ? "unknown" : t === "unavailable" || t === "offline" ? "offline" : t === "mowing" || t === "mähend" || t === "mowing_task" ? "mowing" : t === "docked" || t === "charging" || t === "idle" ? "docked" : t === "returning" || t === "returning_to_dock" ? "returning" : t === "error" || t === "blocked" ? "error" : "unknown";
}
//#endregion
//#region src/index.ts
var ze = "sensor.luba_va8tp48r_batterie", Be = "sensor.luba_va8tp48r_aktueller_standort", Ve = "sensor.luba_va8tp48r_fortschritt", He = "sensor.luba_va8tp48r_verbleibende_zeit", Ue = "sensor.luba_va8tp48r_gesamtzeit", We = {
	mowing: "Mäht",
	docked: "Im Dock",
	returning: "Rückkehr zur Ladestation",
	error: "Fehler",
	maintenance: "Wartungsmodus",
	update: "Update verfügbar",
	offline: "Offline",
	unknown: "Unbekannt"
}, $ = class extends K {
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
      filter: drop-shadow(
        0 0 10px
        var(--nova-state-glow)
      );
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
      box-shadow:
        inset 0 0 18px rgba(0, 0, 0, 0.45);
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

    .metric-icon {
      color: var(--nova-state-color);
      filter: drop-shadow(
        0 0 7px
        var(--nova-state-glow)
      );
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
      transition:
        width ${a(Z.animation.normal)} ease;
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
      filter: drop-shadow(
        0 0 10px
        var(--nova-state-glow)
      );
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
        grid-template-columns:
          29px
          minmax(0, 1fr)
          auto;
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
		let n = t.state.trim().replace(",", "."), r = Number.parseFloat(n);
		return Number.isFinite(r) ? r : null;
	}
	formatEntityValue(e, t = "") {
		let n = this.getState(e);
		if (!n || n.state === "unknown" || n.state === "unavailable") return "—";
		let r = typeof n.attributes.unit_of_measurement == "string" ? n.attributes.unit_of_measurement : t;
		return r ? `${n.state} ${r}` : n.state;
	}
	clampPercentage(e) {
		return e === null ? 0 : Math.min(100, Math.max(0, e));
	}
	renderMetricRow(e, t, n) {
		return L`
      <div class="metric-row">
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
		return L`
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
            class="progress-ring"
            style=${J({ "--progress-angle": `${e.progress * 3.6}deg` })}
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
            ${this.renderMetricRow("mdi:clock-outline", "Verbleibende Zeit", e.remainingTimeLabel)}

            ${this.renderMetricRow("mdi:map-marker-outline", "Aktuelle Zone", e.locationLabel)}

            ${this.renderMetricRow("mdi:timer-outline", "Gesamtzeit", e.totalTimeLabel)}

            <div class="metric-row">
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
                  style=${J({ width: `${e.battery}%` })}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
	}
	renderDockedView(e) {
		return L`
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
            class="battery-ring"
            style=${J({ "--battery-angle": `${e.battery * 3.6}deg` })}
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
            ${this.renderMetricRow("mdi:map-marker-outline", "Aktueller Standort", e.locationLabel)}

            ${this.renderMetricRow("mdi:battery-charging", "Ladezustand", e.battery >= 100 ? "Vollständig geladen" : "Wird geladen")}

            ${this.renderMetricRow("mdi:timer-outline", "Letzte Gesamtzeit", e.totalTimeLabel)}

            ${this.renderMetricRow("mdi:check-circle-outline", "Bereitschaft", "Bereit")}
          </div>
        </div>
      </section>
    `;
	}
	renderReturningView(e) {
		return L`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:home-import-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${e.name} fährt zur Basis
          </h3>

          <div class="overview-description">
            <span>Die aktuelle Aufgabe wird beendet.</span>
            <span>Der Mäher kehrt zur Ladestation zurück.</span>
          </div>
        </div>

        <div class="glass-panel">
          <div class="metric-list">
            ${this.renderMetricRow("mdi:map-marker-outline", "Aktueller Standort", e.locationLabel)}

            ${this.renderMetricRow("mdi:clock-outline", "Verbleibende Zeit", e.remainingTimeLabel)}

            ${this.renderMetricRow("mdi:battery", "Akkustand", e.batteryLabel)}

            ${this.renderMetricRow("mdi:home-outline", "Ziel", "Ladestation")}
          </div>
        </div>
      </section>
    `;
	}
	renderOfflineView(e) {
		return L`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:power-plug-off-outline"
          ></ha-icon>

          <h3 class="overview-title">
            ${e.name} ist offline
          </h3>
        </div>

        <div class="glass-panel state-panel">
          <div class="state-symbol">
            <ha-icon
              icon="mdi:robot-mower-outline"
            ></ha-icon>
          </div>

          <div class="state-message">
            Bitte schalten Sie den Mäher ein und prüfen
            Sie die WLAN- oder Bluetooth-Verbindung.
            Momentan werden keine aktuellen Daten übertragen.
          </div>

          <div class="state-detail">
            Letzter Rohstatus: ${e.rawState}
          </div>
        </div>
      </section>
    `;
	}
	renderErrorView(e) {
		return L`
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
            <span>Bitte Gerät und Umgebung überprüfen.</span>
          </div>
        </div>

        <div class="glass-panel">
          <div class="metric-list">
            ${this.renderMetricRow("mdi:alert-outline", "Fehlerstatus", e.rawState)}

            ${this.renderMetricRow("mdi:map-marker-outline", "Aktueller Standort", e.locationLabel)}

            ${this.renderMetricRow("mdi:battery", "Akkustand", e.batteryLabel)}

            ${this.renderMetricRow("mdi:information-outline", "Empfehlung", "Gerät prüfen")}
          </div>
        </div>
      </section>
    `;
	}
	renderUpdateView(e) {
		return L`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:update"
          ></ha-icon>

          <h3 class="overview-title">
            Software-Update wird verarbeitet
          </h3>

          <div class="overview-description">
            <span>${e.name} wird aktualisiert.</span>
            <span>Bitte Gerät währenddessen nicht ausschalten.</span>
          </div>
        </div>

        <div class="glass-panel state-panel">
          <div class="state-symbol">
            <ha-icon icon="mdi:download"></ha-icon>
          </div>

          <div class="state-message">
            Der Mäher ist während des Updates
            vorübergehend nicht einsatzbereit.
          </div>

          <div class="state-detail">
            Akkustand: ${e.batteryLabel}
          </div>
        </div>
      </section>
    `;
	}
	renderMaintenanceView(e) {
		return L`
      <section class="overview">
        <div class="overview-heading">
          <ha-icon
            class="overview-icon"
            icon="mdi:tools"
          ></ha-icon>

          <h3 class="overview-title">
            Wartungsmodus ist aktiv
          </h3>

          <div class="overview-description">
            <span>Automatische Aufgaben sind pausiert.</span>
            <span>${e.name} kann sicher gewartet werden.</span>
          </div>
        </div>

        <div class="glass-panel">
          <div class="metric-list">
            ${this.renderMetricRow("mdi:map-marker-outline", "Aktueller Standort", e.locationLabel)}

            ${this.renderMetricRow("mdi:battery", "Akkustand", e.batteryLabel)}

            ${this.renderMetricRow("mdi:timer-outline", "Gesamtzeit", e.totalTimeLabel)}

            ${this.renderMetricRow("mdi:pause-circle-outline", "Automatik", "Pausiert")}
          </div>
        </div>
      </section>
    `;
	}
	renderUnknownView(e) {
		return L`
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
            Der aktuelle Zustand des Mähers kann
            noch keiner bekannten Ansicht zugeordnet werden.
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
		if (!this.config) return z;
		let e = this.mowerState, t = this.config.name ?? "Luba", n = this.config.model ?? "Luba 3 AWD LiDAR", r = this.config.battery_entity ?? ze, i = this.config.location_entity ?? Be, a = this.config.progress_entity ?? Ve, o = this.config.remaining_time_entity ?? He, s = this.config.total_time_entity ?? Ue, c = Le(n), l = Ne(c), u = Ae(c);
		if (!e) {
			let e = Z.states.error;
			return L`
        <ha-card
          style=${J({
				"--nova-state-color": e.color,
				"--nova-state-soft": e.soft,
				"--nova-state-glow": e.glow
			})}
        >
          <div class="entity-error">
            <div>
              <strong>
                Entität nicht gefunden
              </strong>

              <p>
                „${this.config.entity}“ ist in
                Home Assistant nicht vorhanden.
              </p>
            </div>
          </div>
        </ha-card>
      `;
		}
		let d = Re(e.state), f = Z.states[d], p = Ie(d), m = Pe(c), h = {
			...p,
			front: {
				...p.front,
				asset: m.front
			},
			side: {
				...p.side,
				asset: m.side
			}
		}, g = this.getNumericValue(a), _ = this.clampPercentage(g), ee = g === null ? "—" : `${Math.round(_)} %`, v = this.getNumericValue(r), y = this.clampPercentage(v), b = this.formatEntityValue(r, "%"), x = this.formatEntityValue(i), S = this.formatEntityValue(o), C = this.formatEntityValue(s), w = {
			name: t,
			novaState: d,
			rawState: e.state,
			progress: _,
			progressLabel: ee,
			battery: y,
			batteryLabel: b,
			locationLabel: x,
			remainingTimeLabel: S,
			totalTimeLabel: C
		};
		return L`
      <ha-card style=${J({
			"--nova-state-color": f.color,
			"--nova-state-soft": f.soft,
			"--nova-state-glow": f.glow,
			"--robot-desktop-scale": String(u.desktop.scale),
			"--robot-desktop-x": `${u.desktop.translateX}px`,
			"--robot-desktop-y": `${u.desktop.translateY}px`,
			"--robot-desktop-max-width": `${u.desktop.maxWidth}px`,
			"--robot-desktop-max-height": `${u.desktop.maxHeight}px`,
			"--robot-mobile-scale": String(u.mobile.scale),
			"--robot-mobile-x": `${u.mobile.translateX}px`,
			"--robot-mobile-y": `${u.mobile.translateY}px`,
			"--robot-mobile-max-width": `${u.mobile.maxWidth}px`,
			"--robot-mobile-max-height": `${u.mobile.maxHeight}px`
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
              title="Statusanzeige"
            >
              <span class="led-core"></span>
            </div>
          </header>

          <main class="content-grid">
            <section class="hero">
              <div class="robot-stage">
                <img
                  class="robot-image"
                  src=${l}
                  alt=${n}
                  loading="eager"
                  @error=${this.handleImageError}
                />

                <mower-lighting
                  .lighting=${h}
                ></mower-lighting>

                <div
                  class="robot-fallback"
                  hidden
                >
                  <div
                    class="robot-fallback-symbol"
                  >
                    ◆
                  </div>

                  <div
                    class="robot-fallback-title"
                  >
                    Gerätebild konnte nicht
                    geladen werden
                  </div>

                  <div
                    class="robot-fallback-path"
                  >
                    ${l}
                  </div>
                </div>
              </div>
            </section>

            ${this.renderStateContent(w)}
          </main>

          <footer class="footer">
            <div class="status-group">
              <div class="status">
                <span class="dot"></span>

                <span>
                  ${We[d]}
                </span>
              </div>

              <div class="raw-state">
                Rohstatus: ${e.state}
              </div>
            </div>

            <div class="layout-note">
              ${c}
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
			location_entity: Be,
			progress_entity: Ve,
			remaining_time_entity: He,
			total_time_entity: Ue
		};
	}
};
Y([q({ attribute: !1 })], $.prototype, "hass", void 0), Y([Se()], $.prototype, "config", void 0), $ = Y([ye("nova-luba-card")], $), window.customCards = window.customCards || [], window.customCards.push({
	type: "nova-luba-card",
	name: "Nova UI - Luba Card",
	description: "A dynamic Mammotion mower card for Home Assistant.",
	preview: !0
});
//#endregion
export { $ as NovaLubaCard };
