!function (e, n) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = n(); else if ("function" == typeof define && define.amd) define([], n); else {
        var t = n();
        for (var o in t) ("object" == typeof exports ? exports : e)[o] = t[o]
    }
}(global, (function () {
    return (() => {
        "use strict";
        var e = {
            127: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.waitUntilFunded = n.mint = n.createAddress = void 0;
                const o = t(34), s = t(176), a = t(145), r = t(731), i = t(163), d = t(848), c = t(661), l = t(568);

                function u() {
                    return (0, a.Some)({mnemonic: s.generateMnemonic(256)}).map((e => [e, s.mnemonicToSeedSync(e.mnemonic)])).map((([e, n]) => [e, (0, r.default)(i).fromSeed(n)])).map((([e, n]) => [e, n.derivePath("m/44'/483'/0'/0/0")])).map((([e, n]) => [e, d.bech32.toWords(n.identifier)])).map((([e, n]) => [e, d.bech32.encode("bluzelle", n)])).map((([e, n]) => Object.assign(Object.assign({}, e), {address: n}))).join()
                }

                function p(e, n) {
                    return (0, l.getAccountBalance)(e, n).then((function t(s) {
                        return (0, l.getAccountBalance)(e, n).then((0, o.passThroughAwait)((e => console.log("waiting for funds...", e)))).then((e => e === s && c(1e3).then((() => t(s)))))
                    }))
                }

                n.createAddress = u, n.mint = function (e, n) {
                    return n ? function (n) {
                        return e.queryClient.faucet.Mint({address: n}).then((() => p(e, n))).then((() => ({
                            mnemonic: "",
                            address: n
                        })))
                    }(n) : Promise.resolve(u()).then((0, o.passThroughAwait)((n => e.queryClient.faucet.Mint({address: n.address})))).then((0, o.passThroughAwait)((n => p(e, n.address))))
                }, n.waitUntilFunded = p
            }, 568: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.getTaxInfo = n.getAccountBalance = n.hasContent = n.waitForContent = void 0;
                const o = t(783);
                n.waitForContent = (e, t, s = 5e3) => (0, o.default)((() => (0, n.hasContent)(e, t)), {timeout: s}), n.hasContent = (e, n) => e.queryClient.storage.HasContent({cid: n}).then((e => e.hasContent)), n.getAccountBalance = (e, n) => e.queryClient.bank.Balance({
                    address: n,
                    denom: "ubnt"
                }).then((e => {
                    var n;
                    return Number(null === (n = e.balance) || void 0 === n ? void 0 : n.amount)
                })), n.getTaxInfo = e => e.queryClient.tax.GetTaxInfo({})
            }, 293: (e, n) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.getValidators = n.getStatus = void 0, n.getStatus = e => e.tmClient.status().then((e => ({
                    nodeId: Buffer.from(e.nodeInfo.id).toString("hex"),
                    chainId: e.nodeInfo.network,
                    moniker: e.nodeInfo.moniker,
                    blockHeight: e.syncInfo.latestBlockHeight,
                    caughtUp: !e.syncInfo.catchingUp
                }))), n.getValidators = e => e.tmClient.validators({}).then((e => e.validators.map((e => ({
                    address: Buffer.from(e.address).toString("hex"),
                    votingPower: e.votingPower
                })))))
            }, 553: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.getRegistry = void 0;
                const o = t(236), s = t(145), a = t(911), r = t(517);
                n.getRegistry = (0, r.memoize)((() => (0, s.Some)(new o.Registry).map(a.registerMessages).join()))
            }, 231: function (e, n, t) {
                var o = this && this.__awaiter || function (e, n, t, o) {
                    return new (t || (t = Promise))((function (s, a) {
                        function r(e) {
                            try {
                                d(o.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function i(e) {
                            try {
                                d(o.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function d(e) {
                            var n;
                            e.done ? s(e.value) : (n = e.value, n instanceof t ? n : new t((function (e) {
                                e(n)
                            }))).then(r, i)
                        }

                        d((o = o.apply(e, n || [])).next())
                    }))
                };
                Object.defineProperty(n, "__esModule", {value: !0}), n.SigningBluzelleClient = n.newBluzelleClient = void 0;
                const s = t(614), a = t(553), r = t(758), i = t(609), d = t(831), c = t(722), l = t(815);
                n.newBluzelleClient = e => e.wallet().then((n => p.connectWithSigner(e.url, n, {
                    prefix: "bluzelle",
                    registry: (0, a.getRegistry)()
                }).then((t => Promise.all([u(e.url), t, n.getAccounts().then((e => e[0].address)), r.Tendermint34Client.connect(e.url)]))))).then((([n, t, o, s]) => ({
                    url: e.url,
                    queryClient: n,
                    sgClient: t,
                    address: o,
                    tmClient: s
                })));
                const u = e => r.Tendermint34Client.connect(e).then((e => new s.QueryClient(e))).then(s.createProtobufRpcClient).then((e => Promise.resolve({
                    storage: new i.QueryClientImpl(e),
                    bank: new d.QueryClientImpl(e),
                    faucet: new c.QueryClientImpl(e),
                    tax: new l.QueryClientImpl(e)
                })));

                class p extends s.SigningStargateClient {
                    constructor(e, n, t) {
                        super(e, n, t), this.wallet = n
                    }

                    getSequenceFromNetwork(e) {
                        return super.getSequence(e)
                    }

                    getSequence(e) {
                        return this.wallet.getSequence(this, e)
                    }

                    static connectWithSigner(e, n, t = {}) {
                        return o(this, void 0, void 0, (function* () {
                            return r.Tendermint34Client.connect(e).then((e => new p(e, n, t)))
                        }))
                    }
                }

                n.SigningBluzelleClient = p
            }, 911: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.setTaxCollector = n.setTransferTaxBp = n.setGasTaxBp = n.send = n.pinCid = n.registerMessages = n.withTransaction = void 0;
                const o = t(697), s = t(339), a = t(145), r = t(34), i = t(517), d = t(196), c = t(86);
                let l;
                n.withTransaction = (e, n) => {
                    u(), n();
                    const t = l || [];
                    return l = void 0, p(t, e).then((0, r.passThrough)((e => t.map(((n, t) => {
                        var o;
                        return n.deferred.resolve(Object.assign(Object.assign({}, e), {rawLog: null === (o = e.rawLog) || void 0 === o ? void 0 : o[t]}))
                    })))))
                };
                const u = () => l = [], p = (e, n) => f(n, (e || []).map((e => e.msg)), function (e) {
                    return (e || []).reduce(((e, n) => Object.assign(Object.assign({}, e), {
                        maxGas: e.maxGas + n.options.maxGas,
                        gasPrice: n.options.gasPrice
                    })), {maxGas: 0})
                }(e));
                n.registerMessages = e => (e.register("/bluzelle.curium.storage.MsgPin", o.MsgPin), e.register("/cosmos.bank.v1beta1.MsgSend", d.MsgSend), e.register("/bluzelle.curium.tax.MsgSetGasTaxBp", c.MsgSetGasTaxBp), e.register("/bluzelle.curium.tax.MsgSetTransferTaxBp", c.MsgSetTransferTaxBp), e.register("/bluzelle.curium.tax.MsgSetTaxCollector", c.MsgSetTaxCollector), e), n.pinCid = (e, n, t) => m(e, "/bluzelle.curium.storage.MsgPin", {
                    cid: n,
                    creator: e.address
                }, t), n.send = (e, n, t, o) => m(e, "/cosmos.bank.v1beta1.MsgSend", {
                    to_address: n,
                    amount: [{denom: "ubnt", amount: t.toString()}],
                    from_address: e.address
                }, o), n.setGasTaxBp = (e, n, t) => m(e, "/bluzelle.curium.tax.MsgSetGasTaxBp", {
                    bp: n,
                    creator: e.address
                }, t), n.setTransferTaxBp = (e, n, t) => m(e, "/bluzelle.curium.tax.MsgSetTransferTaxBp", {
                    bp: n,
                    creator: e.address
                }, t), n.setTaxCollector = (e, n, t) => m(e, "/bluzelle.curium.tax.MsgSetTaxCollector", {
                    taxCollector: n,
                    creator: e.address
                }, t);
                const m = (e, n, t, o) => (0, a.Right)(t).map((e => ({
                        typeUrl: n,
                        value: e
                    }))).bind((e => l ? (0, a.Left)(e) : (0, a.Right)(e))).map((n => f(e, [n], o))).leftMap((e => ((e, n) => (0, a.Some)({
                        msg: e,
                        options: n,
                        deferred: (0, s.newDeferred)()
                    }).map((0, r.passThrough)((e => null == l ? void 0 : l.push(e)))))(e, o))).cata(i.identity, i.identity),
                    f = (e, n, t) => e.sgClient.signAndBroadcast(e.address, n, {
                        gas: t.maxGas.toFixed(0),
                        amount: [{denom: "ubnt", amount: (t.gasPrice * t.maxGas).toFixed(0)}]
                    }, t.memo).then((e => Object.assign(Object.assign({}, e), {rawLog: "string" == typeof e.rawLog ? e.rawLog : JSON.parse(e.rawLog || "[]")})))
            }, 339: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.newDeferred = void 0;
                const o = t(145), s = t(34);
                n.newDeferred = () => (0, o.Some)({}).map((0, s.passThrough)((e => e.promise = new Promise(((n, t) => {
                    e.resolve = n, e.reject = t
                }))))).join()
            }, 766: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.BluzelleKeplrWallet = n.newKeplrWallet = void 0;
                const o = t(231), s = t(34), a = t(293), r = t(845), i = t(176);
                n.newKeplrWallet = e => () => c().then((n => (0, o.newBluzelleClient)({
                    url: `${e}:26657`,
                    wallet: (0, r.newLocalWallet)(n)
                }))).then((e => (0, a.getStatus)(e))).then((0, s.passThroughAwait)((n => {
                    var t;
                    return null === (t = window.keplr) || void 0 === t ? void 0 : t.experimentalSuggestChain({
                        chainId: n.chainId,
                        chainName: "Bluzelle",
                        rpc: `http://${e}:26657`,
                        rest: `http://${e}:1317`,
                        bip44: {coinType: 483},
                        bech32Config: {
                            bech32PrefixAccAddr: "bluzelle",
                            bech32PrefixAccPub: "bluzellepub",
                            bech32PrefixValAddr: "bluzellevaloper",
                            bech32PrefixValPub: "bluzellevaloperpub",
                            bech32PrefixConsAddr: "bluzellevalcons",
                            bech32PrefixConsPub: "bluzellevalconspub"
                        },
                        currencies: [{
                            coinDenom: "BLZ",
                            coinMinimalDenom: "ubnt",
                            coinDecimals: 6,
                            coinGeckoId: "bluzelle"
                        }],
                        feeCurrencies: [{
                            coinDenom: "BLZ",
                            coinMinimalDenom: "ubnt",
                            coinDecimals: 6,
                            coinGeckoId: "bluzelle"
                        }],
                        stakeCurrency: {
                            coinDenom: "BLZ",
                            coinMinimalDenom: "ubnt",
                            coinDecimals: 6,
                            coinGeckoId: "bluzelle"
                        },
                        coinType: 483,
                        gasPriceStep: {low: .01, average: .025, high: .03}
                    })
                }))).then((e => {
                    var n;
                    return null === (n = window.keplr) || void 0 === n ? void 0 : n.getOfflineSigner(e.chainId)
                })).then((e => new d(e)));

                class d {
                    constructor(e) {
                        this.sequenceTable = {}, this.getSequenceQueue = Promise.resolve({}), this.getAccounts = e.getAccounts.bind(e), this.signDirect = e.signDirect.bind(e)
                    }

                    getSequence(e, n) {
                        return this.getSequenceQueue = this.getSequenceQueue.then((() => Promise.resolve(this.sequenceTable[n]).then((t => t || e.getSequenceFromNetwork(n))).then((0, s.passThrough)((e => {
                            this.sequenceTable[n] = Object.assign(Object.assign({}, e), {sequence: e.sequence + 1})
                        })))))
                    }
                }

                n.BluzelleKeplrWallet = d;
                const c = () => Promise.resolve(i.generateMnemonic(256))
            }, 845: function (e, n, t) {
                var o = this && this.__awaiter || function (e, n, t, o) {
                    return new (t || (t = Promise))((function (s, a) {
                        function r(e) {
                            try {
                                d(o.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function i(e) {
                            try {
                                d(o.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function d(e) {
                            var n;
                            e.done ? s(e.value) : (n = e.value, n instanceof t ? n : new t((function (e) {
                                e(n)
                            }))).then(r, i)
                        }

                        d((o = o.apply(e, n || [])).next())
                    }))
                };
                Object.defineProperty(n, "__esModule", {value: !0}), n.BluzelleLocalWallet = n.newLocalWallet = void 0;
                const s = t(236), a = t(387), r = t(34);
                n.newLocalWallet = (e, n = {}) => () => Promise.resolve(i.fromMnemonic(e, {
                    prefix: "bluzelle",
                    hdPaths: [d(n.index, n.coinType)]
                }));

                class i extends s.DirectSecp256k1HdWallet {
                    constructor() {
                        super(...arguments), this.sequenceTable = {}, this.getSequenceQueue = Promise.resolve({})
                    }

                    static fromMnemonic(e, n = {}) {
                        return o(this, void 0, void 0, (function* () {
                            const t = new a.EnglishMnemonic(e), o = yield a.Bip39.mnemonicToSeed(t, n.bip39Password);
                            return new i(t, Object.assign(Object.assign({}, n), {seed: o}))
                        }))
                    }

                    getSequence(e, n) {
                        return this.getSequenceQueue = this.getSequenceQueue.then((() => Promise.resolve(this.sequenceTable[n]).then((t => t || e.getSequenceFromNetwork(n))).then((0, r.passThrough)((e => {
                            this.sequenceTable[n] = Object.assign(Object.assign({}, e), {sequence: e.sequence + 1})
                        })))))
                    }
                }

                function d(e = 0, n = 483) {
                    return [a.Slip10RawIndex.hardened(44), a.Slip10RawIndex.hardened(n), a.Slip10RawIndex.hardened(0), a.Slip10RawIndex.normal(0), a.Slip10RawIndex.normal(e)]
                }

                n.BluzelleLocalWallet = i
            }, 194: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.Params = n.protobufPackage = void 0;
                const o = t(741);
                n.protobufPackage = "bluzelle.curium.faucet";
                const s = {testnet: ""};
                n.Params = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.testnet && n.uint32(10).string(e.testnet), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, s);
                        for (; t.pos < a;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? r.testnet = t.string() : t.skipType(7 & e)
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, s);
                        return void 0 !== e.testnet && null !== e.testnet ? n.testnet = String(e.testnet) : n.testnet = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.testnet && (n.testnet = e.testnet), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, s);
                        return void 0 !== e.testnet && null !== e.testnet ? n.testnet = e.testnet : n.testnet = "", n
                    }
                }
            }, 722: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.QueryClientImpl = n.QueryMintResponse = n.QueryMintRequest = n.QueryParamsResponse = n.QueryParamsRequest = n.protobufPackage = void 0;
                const o = t(741), s = t(194);
                n.protobufPackage = "bluzelle.curium.faucet";
                const a = {};
                n.QueryParamsRequest = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, a);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return r
                    }, fromJSON: e => Object.assign({}, a), toJSON: e => ({}), fromPartial: e => Object.assign({}, a)
                };
                const r = {};
                n.QueryParamsResponse = {
                    encode: (e, n = o.Writer.create()) => (void 0 !== e.params && s.Params.encode(e.params, n.uint32(10).fork()).ldelim(), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const i = Object.assign({}, r);
                        for (; t.pos < a;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? i.params = s.Params.decode(t, t.uint32()) : t.skipType(7 & e)
                        }
                        return i
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.params && null !== e.params ? n.params = s.Params.fromJSON(e.params) : n.params = void 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.params && (n.params = e.params ? s.Params.toJSON(e.params) : void 0), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.params && null !== e.params ? n.params = s.Params.fromPartial(e.params) : n.params = void 0, n
                    }
                };
                const i = {address: ""};
                n.QueryMintRequest = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.address && n.uint32(10).string(e.address), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, i);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? a.address = t.string() : t.skipType(7 & e)
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, i);
                        return void 0 !== e.address && null !== e.address ? n.address = String(e.address) : n.address = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.address && (n.address = e.address), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, i);
                        return void 0 !== e.address && null !== e.address ? n.address = e.address : n.address = "", n
                    }
                };
                const d = {address: "", mnemonic: ""};
                n.QueryMintResponse = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.address && n.uint32(10).string(e.address), "" !== e.mnemonic && n.uint32(18).string(e.mnemonic), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, d);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    a.address = t.string();
                                    break;
                                case 2:
                                    a.mnemonic = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, d);
                        return void 0 !== e.address && null !== e.address ? n.address = String(e.address) : n.address = "", void 0 !== e.mnemonic && null !== e.mnemonic ? n.mnemonic = String(e.mnemonic) : n.mnemonic = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.address && (n.address = e.address), void 0 !== e.mnemonic && (n.mnemonic = e.mnemonic), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, d);
                        return void 0 !== e.address && null !== e.address ? n.address = e.address : n.address = "", void 0 !== e.mnemonic && null !== e.mnemonic ? n.mnemonic = e.mnemonic : n.mnemonic = "", n
                    }
                }, n.QueryClientImpl = class {
                    constructor(e) {
                        this.rpc = e
                    }

                    Params(e) {
                        const t = n.QueryParamsRequest.encode(e).finish();
                        return this.rpc.request("bluzelle.curium.faucet.Query", "Params", t).then((e => n.QueryParamsResponse.decode(new o.Reader(e))))
                    }

                    Mint(e) {
                        const t = n.QueryMintRequest.encode(e).finish();
                        return this.rpc.request("bluzelle.curium.faucet.Query", "Mint", t).then((e => n.QueryMintResponse.decode(new o.Reader(e))))
                    }
                }
            }, 609: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.QueryClientImpl = n.QueryHasContentResponse = n.QueryHasContentRequest = n.protobufPackage = void 0;
                const o = t(741);
                n.protobufPackage = "bluzelle.curium.storage";
                const s = {cid: ""};
                n.QueryHasContentRequest = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.cid && n.uint32(10).string(e.cid), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, s);
                        for (; t.pos < a;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? r.cid = t.string() : t.skipType(7 & e)
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, s);
                        return void 0 !== e.cid && null !== e.cid ? n.cid = String(e.cid) : n.cid = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.cid && (n.cid = e.cid), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, s);
                        return void 0 !== e.cid && null !== e.cid ? n.cid = e.cid : n.cid = "", n
                    }
                };
                const a = {hasContent: !1};
                n.QueryHasContentResponse = {
                    encode: (e, n = o.Writer.create()) => (!0 === e.hasContent && n.uint32(8).bool(e.hasContent), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, a);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? r.hasContent = t.bool() : t.skipType(7 & e)
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, a);
                        return void 0 !== e.hasContent && null !== e.hasContent ? n.hasContent = Boolean(e.hasContent) : n.hasContent = !1, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.hasContent && (n.hasContent = e.hasContent), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, a);
                        return void 0 !== e.hasContent && null !== e.hasContent ? n.hasContent = e.hasContent : n.hasContent = !1, n
                    }
                }, n.QueryClientImpl = class {
                    constructor(e) {
                        this.rpc = e
                    }

                    HasContent(e) {
                        const t = n.QueryHasContentRequest.encode(e).finish();
                        return this.rpc.request("bluzelle.curium.storage.Query", "HasContent", t).then((e => n.QueryHasContentResponse.decode(new o.Reader(e))))
                    }
                }
            }, 697: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.MsgClientImpl = n.MsgPinResponse = n.MsgPin = n.protobufPackage = void 0;
                const o = t(741);
                n.protobufPackage = "bluzelle.curium.storage";
                const s = {creator: "", cid: ""};
                n.MsgPin = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.creator && n.uint32(10).string(e.creator), "" !== e.cid && n.uint32(18).string(e.cid), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, s);
                        for (; t.pos < a;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.creator = t.string();
                                    break;
                                case 2:
                                    r.cid = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, s);
                        return void 0 !== e.creator && null !== e.creator ? n.creator = String(e.creator) : n.creator = "", void 0 !== e.cid && null !== e.cid ? n.cid = String(e.cid) : n.cid = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.creator && (n.creator = e.creator), void 0 !== e.cid && (n.cid = e.cid), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, s);
                        return void 0 !== e.creator && null !== e.creator ? n.creator = e.creator : n.creator = "", void 0 !== e.cid && null !== e.cid ? n.cid = e.cid : n.cid = "", n
                    }
                };
                const a = {};
                n.MsgPinResponse = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, a);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return r
                    }, fromJSON: e => Object.assign({}, a), toJSON: e => ({}), fromPartial: e => Object.assign({}, a)
                }, n.MsgClientImpl = class {
                    constructor(e) {
                        this.rpc = e
                    }

                    Pin(e) {
                        const t = n.MsgPin.encode(e).finish();
                        return this.rpc.request("bluzelle.curium.storage.Msg", "Pin", t).then((e => n.MsgPinResponse.decode(new o.Reader(e))))
                    }
                }
            }, 815: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.QueryClientImpl = n.QueryGetTaxInfoResponse = n.QueryGetTaxInfoRequest = n.protobufPackage = void 0;
                const o = t(741), s = t(400);
                n.protobufPackage = "bluzelle.curium.tax";
                const a = {};
                n.QueryGetTaxInfoRequest = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, a);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return r
                    }, fromJSON: e => Object.assign({}, a), toJSON: e => ({}), fromPartial: e => Object.assign({}, a)
                };
                const r = {gasTaxBp: 0, transferTaxBp: 0, taxCollector: ""};
                n.QueryGetTaxInfoResponse = {
                    encode: (e, n = o.Writer.create()) => (0 !== e.gasTaxBp && n.uint32(8).int64(e.gasTaxBp), 0 !== e.transferTaxBp && n.uint32(16).int64(e.transferTaxBp), "" !== e.taxCollector && n.uint32(26).string(e.taxCollector), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, r);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    a.gasTaxBp = d(t.int64());
                                    break;
                                case 2:
                                    a.transferTaxBp = d(t.int64());
                                    break;
                                case 3:
                                    a.taxCollector = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.gasTaxBp && null !== e.gasTaxBp ? n.gasTaxBp = Number(e.gasTaxBp) : n.gasTaxBp = 0, void 0 !== e.transferTaxBp && null !== e.transferTaxBp ? n.transferTaxBp = Number(e.transferTaxBp) : n.transferTaxBp = 0, void 0 !== e.taxCollector && null !== e.taxCollector ? n.taxCollector = String(e.taxCollector) : n.taxCollector = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.gasTaxBp && (n.gasTaxBp = e.gasTaxBp), void 0 !== e.transferTaxBp && (n.transferTaxBp = e.transferTaxBp), void 0 !== e.taxCollector && (n.taxCollector = e.taxCollector), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.gasTaxBp && null !== e.gasTaxBp ? n.gasTaxBp = e.gasTaxBp : n.gasTaxBp = 0, void 0 !== e.transferTaxBp && null !== e.transferTaxBp ? n.transferTaxBp = e.transferTaxBp : n.transferTaxBp = 0, void 0 !== e.taxCollector && null !== e.taxCollector ? n.taxCollector = e.taxCollector : n.taxCollector = "", n
                    }
                }, n.QueryClientImpl = class {
                    constructor(e) {
                        this.rpc = e
                    }

                    GetTaxInfo(e) {
                        const t = n.QueryGetTaxInfoRequest.encode(e).finish();
                        return this.rpc.request("bluzelle.curium.tax.Query", "GetTaxInfo", t).then((e => n.QueryGetTaxInfoResponse.decode(new o.Reader(e))))
                    }
                };
                var i = (() => {
                    if (void 0 !== i) return i;
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if ("undefined" != typeof global) return global;
                    throw"Unable to locate global object"
                })();

                function d(e) {
                    if (e.gt(Number.MAX_SAFE_INTEGER)) throw new i.Error("Value is larger than Number.MAX_SAFE_INTEGER");
                    return e.toNumber()
                }

                o.util.Long !== s && (o.util.Long = s, (0, o.configure)())
            }, 86: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.MsgClientImpl = n.MsgSetTaxCollectorResponse = n.MsgSetTaxCollector = n.MsgSetTransferTaxBpResponse = n.MsgSetTransferTaxBp = n.MsgSetGasTaxBpResponse = n.MsgSetGasTaxBp = n.protobufPackage = void 0;
                const o = t(741), s = t(400);
                n.protobufPackage = "bluzelle.curium.tax";
                const a = {creator: "", bp: 0};
                n.MsgSetGasTaxBp = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.creator && n.uint32(10).string(e.creator), 0 !== e.bp && n.uint32(16).int64(e.bp), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, a);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.creator = t.string();
                                    break;
                                case 2:
                                    r.bp = p(t.int64());
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, a);
                        return void 0 !== e.creator && null !== e.creator ? n.creator = String(e.creator) : n.creator = "", void 0 !== e.bp && null !== e.bp ? n.bp = Number(e.bp) : n.bp = 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.creator && (n.creator = e.creator), void 0 !== e.bp && (n.bp = e.bp), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, a);
                        return void 0 !== e.creator && null !== e.creator ? n.creator = e.creator : n.creator = "", void 0 !== e.bp && null !== e.bp ? n.bp = e.bp : n.bp = 0, n
                    }
                };
                const r = {};
                n.MsgSetGasTaxBpResponse = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, r);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return a
                    }, fromJSON: e => Object.assign({}, r), toJSON: e => ({}), fromPartial: e => Object.assign({}, r)
                };
                const i = {creator: "", bp: 0};
                n.MsgSetTransferTaxBp = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.creator && n.uint32(10).string(e.creator), 0 !== e.bp && n.uint32(16).int64(e.bp), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, i);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    a.creator = t.string();
                                    break;
                                case 2:
                                    a.bp = p(t.int64());
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, i);
                        return void 0 !== e.creator && null !== e.creator ? n.creator = String(e.creator) : n.creator = "", void 0 !== e.bp && null !== e.bp ? n.bp = Number(e.bp) : n.bp = 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.creator && (n.creator = e.creator), void 0 !== e.bp && (n.bp = e.bp), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, i);
                        return void 0 !== e.creator && null !== e.creator ? n.creator = e.creator : n.creator = "", void 0 !== e.bp && null !== e.bp ? n.bp = e.bp : n.bp = 0, n
                    }
                };
                const d = {};
                n.MsgSetTransferTaxBpResponse = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, d);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return a
                    }, fromJSON: e => Object.assign({}, d), toJSON: e => ({}), fromPartial: e => Object.assign({}, d)
                };
                const c = {creator: "", taxCollector: ""};
                n.MsgSetTaxCollector = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.creator && n.uint32(10).string(e.creator), "" !== e.taxCollector && n.uint32(18).string(e.taxCollector), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, c);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    a.creator = t.string();
                                    break;
                                case 2:
                                    a.taxCollector = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, c);
                        return void 0 !== e.creator && null !== e.creator ? n.creator = String(e.creator) : n.creator = "", void 0 !== e.taxCollector && null !== e.taxCollector ? n.taxCollector = String(e.taxCollector) : n.taxCollector = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.creator && (n.creator = e.creator), void 0 !== e.taxCollector && (n.taxCollector = e.taxCollector), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, c);
                        return void 0 !== e.creator && null !== e.creator ? n.creator = e.creator : n.creator = "", void 0 !== e.taxCollector && null !== e.taxCollector ? n.taxCollector = e.taxCollector : n.taxCollector = "", n
                    }
                };
                const l = {};
                n.MsgSetTaxCollectorResponse = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, l);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return a
                    }, fromJSON: e => Object.assign({}, l), toJSON: e => ({}), fromPartial: e => Object.assign({}, l)
                }, n.MsgClientImpl = class {
                    constructor(e) {
                        this.rpc = e
                    }

                    SetGasTaxBp(e) {
                        const t = n.MsgSetGasTaxBp.encode(e).finish();
                        return this.rpc.request("bluzelle.curium.tax.Msg", "SetGasTaxBp", t).then((e => n.MsgSetGasTaxBpResponse.decode(new o.Reader(e))))
                    }

                    SetTransferTaxBp(e) {
                        const t = n.MsgSetTransferTaxBp.encode(e).finish();
                        return this.rpc.request("bluzelle.curium.tax.Msg", "SetTransferTaxBp", t).then((e => n.MsgSetTransferTaxBpResponse.decode(new o.Reader(e))))
                    }

                    SetTaxCollector(e) {
                        const t = n.MsgSetTaxCollector.encode(e).finish();
                        return this.rpc.request("bluzelle.curium.tax.Msg", "SetTaxCollector", t).then((e => n.MsgSetTaxCollectorResponse.decode(new o.Reader(e))))
                    }
                };
                var u = (() => {
                    if (void 0 !== u) return u;
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if ("undefined" != typeof global) return global;
                    throw"Unable to locate global object"
                })();

                function p(e) {
                    if (e.gt(Number.MAX_SAFE_INTEGER)) throw new u.Error("Value is larger than Number.MAX_SAFE_INTEGER");
                    return e.toNumber()
                }

                o.util.Long !== s && (o.util.Long = s, (0, o.configure)())
            }, 945: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.Metadata = n.DenomUnit = n.Supply = n.Output = n.Input = n.SendEnabled = n.Params = n.protobufPackage = void 0;
                const o = t(211), s = t(741);
                n.protobufPackage = "cosmos.bank.v1beta1";
                const a = {default_send_enabled: !1};
                n.Params = {
                    encode(e, t = s.Writer.create()) {
                        for (const o of e.send_enabled) n.SendEnabled.encode(o, t.uint32(10).fork()).ldelim();
                        return !0 === e.default_send_enabled && t.uint32(16).bool(e.default_send_enabled), t
                    }, decode(e, t) {
                        const o = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let r = void 0 === t ? o.len : o.pos + t;
                        const i = Object.assign({}, a);
                        for (i.send_enabled = []; o.pos < r;) {
                            const e = o.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    i.send_enabled.push(n.SendEnabled.decode(o, o.uint32()));
                                    break;
                                case 2:
                                    i.default_send_enabled = o.bool();
                                    break;
                                default:
                                    o.skipType(7 & e)
                            }
                        }
                        return i
                    }, fromJSON(e) {
                        const t = Object.assign({}, a);
                        if (t.send_enabled = [], void 0 !== e.send_enabled && null !== e.send_enabled) for (const o of e.send_enabled) t.send_enabled.push(n.SendEnabled.fromJSON(o));
                        return void 0 !== e.default_send_enabled && null !== e.default_send_enabled ? t.default_send_enabled = Boolean(e.default_send_enabled) : t.default_send_enabled = !1, t
                    }, toJSON(e) {
                        const t = {};
                        return e.send_enabled ? t.send_enabled = e.send_enabled.map((e => e ? n.SendEnabled.toJSON(e) : void 0)) : t.send_enabled = [], void 0 !== e.default_send_enabled && (t.default_send_enabled = e.default_send_enabled), t
                    }, fromPartial(e) {
                        const t = Object.assign({}, a);
                        if (t.send_enabled = [], void 0 !== e.send_enabled && null !== e.send_enabled) for (const o of e.send_enabled) t.send_enabled.push(n.SendEnabled.fromPartial(o));
                        return void 0 !== e.default_send_enabled && null !== e.default_send_enabled ? t.default_send_enabled = e.default_send_enabled : t.default_send_enabled = !1, t
                    }
                };
                const r = {denom: "", enabled: !1};
                n.SendEnabled = {
                    encode: (e, n = s.Writer.create()) => ("" !== e.denom && n.uint32(10).string(e.denom), !0 === e.enabled && n.uint32(16).bool(e.enabled), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let o = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, r);
                        for (; t.pos < o;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    a.denom = t.string();
                                    break;
                                case 2:
                                    a.enabled = t.bool();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = String(e.denom) : n.denom = "", void 0 !== e.enabled && null !== e.enabled ? n.enabled = Boolean(e.enabled) : n.enabled = !1, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.denom && (n.denom = e.denom), void 0 !== e.enabled && (n.enabled = e.enabled), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = e.denom : n.denom = "", void 0 !== e.enabled && null !== e.enabled ? n.enabled = e.enabled : n.enabled = !1, n
                    }
                };
                const i = {address: ""};
                n.Input = {
                    encode(e, n = s.Writer.create()) {
                        "" !== e.address && n.uint32(10).string(e.address);
                        for (const t of e.coins) o.Coin.encode(t, n.uint32(18).fork()).ldelim();
                        return n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, i);
                        for (r.coins = []; t.pos < a;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.address = t.string();
                                    break;
                                case 2:
                                    r.coins.push(o.Coin.decode(t, t.uint32()));
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    }, fromJSON(e) {
                        const n = Object.assign({}, i);
                        if (n.coins = [], void 0 !== e.address && null !== e.address ? n.address = String(e.address) : n.address = "", void 0 !== e.coins && null !== e.coins) for (const t of e.coins) n.coins.push(o.Coin.fromJSON(t));
                        return n
                    }, toJSON(e) {
                        const n = {};
                        return void 0 !== e.address && (n.address = e.address), e.coins ? n.coins = e.coins.map((e => e ? o.Coin.toJSON(e) : void 0)) : n.coins = [], n
                    }, fromPartial(e) {
                        const n = Object.assign({}, i);
                        if (n.coins = [], void 0 !== e.address && null !== e.address ? n.address = e.address : n.address = "", void 0 !== e.coins && null !== e.coins) for (const t of e.coins) n.coins.push(o.Coin.fromPartial(t));
                        return n
                    }
                };
                const d = {address: ""};
                n.Output = {
                    encode(e, n = s.Writer.create()) {
                        "" !== e.address && n.uint32(10).string(e.address);
                        for (const t of e.coins) o.Coin.encode(t, n.uint32(18).fork()).ldelim();
                        return n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, d);
                        for (r.coins = []; t.pos < a;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.address = t.string();
                                    break;
                                case 2:
                                    r.coins.push(o.Coin.decode(t, t.uint32()));
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    }, fromJSON(e) {
                        const n = Object.assign({}, d);
                        if (n.coins = [], void 0 !== e.address && null !== e.address ? n.address = String(e.address) : n.address = "", void 0 !== e.coins && null !== e.coins) for (const t of e.coins) n.coins.push(o.Coin.fromJSON(t));
                        return n
                    }, toJSON(e) {
                        const n = {};
                        return void 0 !== e.address && (n.address = e.address), e.coins ? n.coins = e.coins.map((e => e ? o.Coin.toJSON(e) : void 0)) : n.coins = [], n
                    }, fromPartial(e) {
                        const n = Object.assign({}, d);
                        if (n.coins = [], void 0 !== e.address && null !== e.address ? n.address = e.address : n.address = "", void 0 !== e.coins && null !== e.coins) for (const t of e.coins) n.coins.push(o.Coin.fromPartial(t));
                        return n
                    }
                };
                const c = {};
                n.Supply = {
                    encode(e, n = s.Writer.create()) {
                        for (const t of e.total) o.Coin.encode(t, n.uint32(10).fork()).ldelim();
                        return n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, c);
                        for (r.total = []; t.pos < a;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? r.total.push(o.Coin.decode(t, t.uint32())) : t.skipType(7 & e)
                        }
                        return r
                    }, fromJSON(e) {
                        const n = Object.assign({}, c);
                        if (n.total = [], void 0 !== e.total && null !== e.total) for (const t of e.total) n.total.push(o.Coin.fromJSON(t));
                        return n
                    }, toJSON(e) {
                        const n = {};
                        return e.total ? n.total = e.total.map((e => e ? o.Coin.toJSON(e) : void 0)) : n.total = [], n
                    }, fromPartial(e) {
                        const n = Object.assign({}, c);
                        if (n.total = [], void 0 !== e.total && null !== e.total) for (const t of e.total) n.total.push(o.Coin.fromPartial(t));
                        return n
                    }
                };
                const l = {denom: "", exponent: 0, aliases: ""};
                n.DenomUnit = {
                    encode(e, n = s.Writer.create()) {
                        "" !== e.denom && n.uint32(10).string(e.denom), 0 !== e.exponent && n.uint32(16).uint32(e.exponent);
                        for (const t of e.aliases) n.uint32(26).string(t);
                        return n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let o = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, l);
                        for (a.aliases = []; t.pos < o;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    a.denom = t.string();
                                    break;
                                case 2:
                                    a.exponent = t.uint32();
                                    break;
                                case 3:
                                    a.aliases.push(t.string());
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return a
                    }, fromJSON(e) {
                        const n = Object.assign({}, l);
                        if (n.aliases = [], void 0 !== e.denom && null !== e.denom ? n.denom = String(e.denom) : n.denom = "", void 0 !== e.exponent && null !== e.exponent ? n.exponent = Number(e.exponent) : n.exponent = 0, void 0 !== e.aliases && null !== e.aliases) for (const t of e.aliases) n.aliases.push(String(t));
                        return n
                    }, toJSON(e) {
                        const n = {};
                        return void 0 !== e.denom && (n.denom = e.denom), void 0 !== e.exponent && (n.exponent = e.exponent), e.aliases ? n.aliases = e.aliases.map((e => e)) : n.aliases = [], n
                    }, fromPartial(e) {
                        const n = Object.assign({}, l);
                        if (n.aliases = [], void 0 !== e.denom && null !== e.denom ? n.denom = e.denom : n.denom = "", void 0 !== e.exponent && null !== e.exponent ? n.exponent = e.exponent : n.exponent = 0, void 0 !== e.aliases && null !== e.aliases) for (const t of e.aliases) n.aliases.push(t);
                        return n
                    }
                };
                const u = {description: "", base: "", display: "", name: "", symbol: ""};
                n.Metadata = {
                    encode(e, t = s.Writer.create()) {
                        "" !== e.description && t.uint32(10).string(e.description);
                        for (const o of e.denom_units) n.DenomUnit.encode(o, t.uint32(18).fork()).ldelim();
                        return "" !== e.base && t.uint32(26).string(e.base), "" !== e.display && t.uint32(34).string(e.display), "" !== e.name && t.uint32(42).string(e.name), "" !== e.symbol && t.uint32(50).string(e.symbol), t
                    }, decode(e, t) {
                        const o = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let a = void 0 === t ? o.len : o.pos + t;
                        const r = Object.assign({}, u);
                        for (r.denom_units = []; o.pos < a;) {
                            const e = o.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.description = o.string();
                                    break;
                                case 2:
                                    r.denom_units.push(n.DenomUnit.decode(o, o.uint32()));
                                    break;
                                case 3:
                                    r.base = o.string();
                                    break;
                                case 4:
                                    r.display = o.string();
                                    break;
                                case 5:
                                    r.name = o.string();
                                    break;
                                case 6:
                                    r.symbol = o.string();
                                    break;
                                default:
                                    o.skipType(7 & e)
                            }
                        }
                        return r
                    }, fromJSON(e) {
                        const t = Object.assign({}, u);
                        if (t.denom_units = [], void 0 !== e.description && null !== e.description ? t.description = String(e.description) : t.description = "", void 0 !== e.denom_units && null !== e.denom_units) for (const o of e.denom_units) t.denom_units.push(n.DenomUnit.fromJSON(o));
                        return void 0 !== e.base && null !== e.base ? t.base = String(e.base) : t.base = "", void 0 !== e.display && null !== e.display ? t.display = String(e.display) : t.display = "", void 0 !== e.name && null !== e.name ? t.name = String(e.name) : t.name = "", void 0 !== e.symbol && null !== e.symbol ? t.symbol = String(e.symbol) : t.symbol = "", t
                    }, toJSON(e) {
                        const t = {};
                        return void 0 !== e.description && (t.description = e.description), e.denom_units ? t.denom_units = e.denom_units.map((e => e ? n.DenomUnit.toJSON(e) : void 0)) : t.denom_units = [], void 0 !== e.base && (t.base = e.base), void 0 !== e.display && (t.display = e.display), void 0 !== e.name && (t.name = e.name), void 0 !== e.symbol && (t.symbol = e.symbol), t
                    }, fromPartial(e) {
                        const t = Object.assign({}, u);
                        if (t.denom_units = [], void 0 !== e.description && null !== e.description ? t.description = e.description : t.description = "", void 0 !== e.denom_units && null !== e.denom_units) for (const o of e.denom_units) t.denom_units.push(n.DenomUnit.fromPartial(o));
                        return void 0 !== e.base && null !== e.base ? t.base = e.base : t.base = "", void 0 !== e.display && null !== e.display ? t.display = e.display : t.display = "", void 0 !== e.name && null !== e.name ? t.name = e.name : t.name = "", void 0 !== e.symbol && null !== e.symbol ? t.symbol = e.symbol : t.symbol = "", t
                    }
                }
            }, 831: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.QueryClientImpl = n.QueryDenomMetadataResponse = n.QueryDenomMetadataRequest = n.QueryDenomsMetadataResponse = n.QueryDenomsMetadataRequest = n.QueryParamsResponse = n.QueryParamsRequest = n.QuerySupplyOfResponse = n.QuerySupplyOfRequest = n.QueryTotalSupplyResponse = n.QueryTotalSupplyRequest = n.QueryAllBalancesResponse = n.QueryAllBalancesRequest = n.QueryBalanceResponse = n.QueryBalanceRequest = n.protobufPackage = void 0;
                const o = t(741), s = t(211), a = t(576), r = t(945);
                n.protobufPackage = "cosmos.bank.v1beta1";
                const i = {address: "", denom: ""};
                n.QueryBalanceRequest = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.address && n.uint32(10).string(e.address), "" !== e.denom && n.uint32(18).string(e.denom), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, i);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    a.address = t.string();
                                    break;
                                case 2:
                                    a.denom = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, i);
                        return void 0 !== e.address && null !== e.address ? n.address = String(e.address) : n.address = "", void 0 !== e.denom && null !== e.denom ? n.denom = String(e.denom) : n.denom = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.address && (n.address = e.address), void 0 !== e.denom && (n.denom = e.denom), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, i);
                        return void 0 !== e.address && null !== e.address ? n.address = e.address : n.address = "", void 0 !== e.denom && null !== e.denom ? n.denom = e.denom : n.denom = "", n
                    }
                };
                const d = {};
                n.QueryBalanceResponse = {
                    encode: (e, n = o.Writer.create()) => (void 0 !== e.balance && s.Coin.encode(e.balance, n.uint32(10).fork()).ldelim(), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, d);
                        for (; t.pos < a;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? r.balance = s.Coin.decode(t, t.uint32()) : t.skipType(7 & e)
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, d);
                        return void 0 !== e.balance && null !== e.balance ? n.balance = s.Coin.fromJSON(e.balance) : n.balance = void 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.balance && (n.balance = e.balance ? s.Coin.toJSON(e.balance) : void 0), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, d);
                        return void 0 !== e.balance && null !== e.balance ? n.balance = s.Coin.fromPartial(e.balance) : n.balance = void 0, n
                    }
                };
                const c = {address: ""};
                n.QueryAllBalancesRequest = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.address && n.uint32(10).string(e.address), void 0 !== e.pagination && a.PageRequest.encode(e.pagination, n.uint32(18).fork()).ldelim(), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, c);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.address = t.string();
                                    break;
                                case 2:
                                    r.pagination = a.PageRequest.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, c);
                        return void 0 !== e.address && null !== e.address ? n.address = String(e.address) : n.address = "", void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageRequest.fromJSON(e.pagination) : n.pagination = void 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.address && (n.address = e.address), void 0 !== e.pagination && (n.pagination = e.pagination ? a.PageRequest.toJSON(e.pagination) : void 0), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, c);
                        return void 0 !== e.address && null !== e.address ? n.address = e.address : n.address = "", void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageRequest.fromPartial(e.pagination) : n.pagination = void 0, n
                    }
                };
                const l = {};
                n.QueryAllBalancesResponse = {
                    encode(e, n = o.Writer.create()) {
                        for (const t of e.balances) s.Coin.encode(t, n.uint32(10).fork()).ldelim();
                        return void 0 !== e.pagination && a.PageResponse.encode(e.pagination, n.uint32(18).fork()).ldelim(), n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let r = void 0 === n ? t.len : t.pos + n;
                        const i = Object.assign({}, l);
                        for (i.balances = []; t.pos < r;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    i.balances.push(s.Coin.decode(t, t.uint32()));
                                    break;
                                case 2:
                                    i.pagination = a.PageResponse.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return i
                    }, fromJSON(e) {
                        const n = Object.assign({}, l);
                        if (n.balances = [], void 0 !== e.balances && null !== e.balances) for (const t of e.balances) n.balances.push(s.Coin.fromJSON(t));
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageResponse.fromJSON(e.pagination) : n.pagination = void 0, n
                    }, toJSON(e) {
                        const n = {};
                        return e.balances ? n.balances = e.balances.map((e => e ? s.Coin.toJSON(e) : void 0)) : n.balances = [], void 0 !== e.pagination && (n.pagination = e.pagination ? a.PageResponse.toJSON(e.pagination) : void 0), n
                    }, fromPartial(e) {
                        const n = Object.assign({}, l);
                        if (n.balances = [], void 0 !== e.balances && null !== e.balances) for (const t of e.balances) n.balances.push(s.Coin.fromPartial(t));
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageResponse.fromPartial(e.pagination) : n.pagination = void 0, n
                    }
                };
                const u = {};
                n.QueryTotalSupplyRequest = {
                    encode: (e, n = o.Writer.create()) => (void 0 !== e.pagination && a.PageRequest.encode(e.pagination, n.uint32(10).fork()).ldelim(), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, u);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? r.pagination = a.PageRequest.decode(t, t.uint32()) : t.skipType(7 & e)
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, u);
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageRequest.fromJSON(e.pagination) : n.pagination = void 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.pagination && (n.pagination = e.pagination ? a.PageRequest.toJSON(e.pagination) : void 0), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, u);
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageRequest.fromPartial(e.pagination) : n.pagination = void 0, n
                    }
                };
                const p = {};
                n.QueryTotalSupplyResponse = {
                    encode(e, n = o.Writer.create()) {
                        for (const t of e.supply) s.Coin.encode(t, n.uint32(10).fork()).ldelim();
                        return void 0 !== e.pagination && a.PageResponse.encode(e.pagination, n.uint32(18).fork()).ldelim(), n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let r = void 0 === n ? t.len : t.pos + n;
                        const i = Object.assign({}, p);
                        for (i.supply = []; t.pos < r;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    i.supply.push(s.Coin.decode(t, t.uint32()));
                                    break;
                                case 2:
                                    i.pagination = a.PageResponse.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return i
                    }, fromJSON(e) {
                        const n = Object.assign({}, p);
                        if (n.supply = [], void 0 !== e.supply && null !== e.supply) for (const t of e.supply) n.supply.push(s.Coin.fromJSON(t));
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageResponse.fromJSON(e.pagination) : n.pagination = void 0, n
                    }, toJSON(e) {
                        const n = {};
                        return e.supply ? n.supply = e.supply.map((e => e ? s.Coin.toJSON(e) : void 0)) : n.supply = [], void 0 !== e.pagination && (n.pagination = e.pagination ? a.PageResponse.toJSON(e.pagination) : void 0), n
                    }, fromPartial(e) {
                        const n = Object.assign({}, p);
                        if (n.supply = [], void 0 !== e.supply && null !== e.supply) for (const t of e.supply) n.supply.push(s.Coin.fromPartial(t));
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageResponse.fromPartial(e.pagination) : n.pagination = void 0, n
                    }
                };
                const m = {denom: ""};
                n.QuerySupplyOfRequest = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.denom && n.uint32(10).string(e.denom), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, m);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? a.denom = t.string() : t.skipType(7 & e)
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, m);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = String(e.denom) : n.denom = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.denom && (n.denom = e.denom), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, m);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = e.denom : n.denom = "", n
                    }
                };
                const f = {};
                n.QuerySupplyOfResponse = {
                    encode: (e, n = o.Writer.create()) => (void 0 !== e.amount && s.Coin.encode(e.amount, n.uint32(10).fork()).ldelim(), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, f);
                        for (; t.pos < a;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? r.amount = s.Coin.decode(t, t.uint32()) : t.skipType(7 & e)
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, f);
                        return void 0 !== e.amount && null !== e.amount ? n.amount = s.Coin.fromJSON(e.amount) : n.amount = void 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.amount && (n.amount = e.amount ? s.Coin.toJSON(e.amount) : void 0), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, f);
                        return void 0 !== e.amount && null !== e.amount ? n.amount = s.Coin.fromPartial(e.amount) : n.amount = void 0, n
                    }
                };
                const g = {};
                n.QueryParamsRequest = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, g);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return a
                    }, fromJSON: e => Object.assign({}, g), toJSON: e => ({}), fromPartial: e => Object.assign({}, g)
                };
                const b = {};
                n.QueryParamsResponse = {
                    encode: (e, n = o.Writer.create()) => (void 0 !== e.params && r.Params.encode(e.params, n.uint32(10).fork()).ldelim(), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, b);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? a.params = r.Params.decode(t, t.uint32()) : t.skipType(7 & e)
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, b);
                        return void 0 !== e.params && null !== e.params ? n.params = r.Params.fromJSON(e.params) : n.params = void 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.params && (n.params = e.params ? r.Params.toJSON(e.params) : void 0), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, b);
                        return void 0 !== e.params && null !== e.params ? n.params = r.Params.fromPartial(e.params) : n.params = void 0, n
                    }
                };
                const v = {};
                n.QueryDenomsMetadataRequest = {
                    encode: (e, n = o.Writer.create()) => (void 0 !== e.pagination && a.PageRequest.encode(e.pagination, n.uint32(10).fork()).ldelim(), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, v);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? r.pagination = a.PageRequest.decode(t, t.uint32()) : t.skipType(7 & e)
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, v);
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageRequest.fromJSON(e.pagination) : n.pagination = void 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.pagination && (n.pagination = e.pagination ? a.PageRequest.toJSON(e.pagination) : void 0), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, v);
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageRequest.fromPartial(e.pagination) : n.pagination = void 0, n
                    }
                };
                const y = {};
                n.QueryDenomsMetadataResponse = {
                    encode(e, n = o.Writer.create()) {
                        for (const t of e.metadatas) r.Metadata.encode(t, n.uint32(10).fork()).ldelim();
                        return void 0 !== e.pagination && a.PageResponse.encode(e.pagination, n.uint32(18).fork()).ldelim(), n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const i = Object.assign({}, y);
                        for (i.metadatas = []; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    i.metadatas.push(r.Metadata.decode(t, t.uint32()));
                                    break;
                                case 2:
                                    i.pagination = a.PageResponse.decode(t, t.uint32());
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return i
                    }, fromJSON(e) {
                        const n = Object.assign({}, y);
                        if (n.metadatas = [], void 0 !== e.metadatas && null !== e.metadatas) for (const t of e.metadatas) n.metadatas.push(r.Metadata.fromJSON(t));
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageResponse.fromJSON(e.pagination) : n.pagination = void 0, n
                    }, toJSON(e) {
                        const n = {};
                        return e.metadatas ? n.metadatas = e.metadatas.map((e => e ? r.Metadata.toJSON(e) : void 0)) : n.metadatas = [], void 0 !== e.pagination && (n.pagination = e.pagination ? a.PageResponse.toJSON(e.pagination) : void 0), n
                    }, fromPartial(e) {
                        const n = Object.assign({}, y);
                        if (n.metadatas = [], void 0 !== e.metadatas && null !== e.metadatas) for (const t of e.metadatas) n.metadatas.push(r.Metadata.fromPartial(t));
                        return void 0 !== e.pagination && null !== e.pagination ? n.pagination = a.PageResponse.fromPartial(e.pagination) : n.pagination = void 0, n
                    }
                };
                const O = {denom: ""};
                n.QueryDenomMetadataRequest = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.denom && n.uint32(10).string(e.denom), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, O);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? a.denom = t.string() : t.skipType(7 & e)
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, O);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = String(e.denom) : n.denom = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.denom && (n.denom = e.denom), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, O);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = e.denom : n.denom = "", n
                    }
                };
                const S = {};
                n.QueryDenomMetadataResponse = {
                    encode: (e, n = o.Writer.create()) => (void 0 !== e.metadata && r.Metadata.encode(e.metadata, n.uint32(10).fork()).ldelim(), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, S);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? a.metadata = r.Metadata.decode(t, t.uint32()) : t.skipType(7 & e)
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, S);
                        return void 0 !== e.metadata && null !== e.metadata ? n.metadata = r.Metadata.fromJSON(e.metadata) : n.metadata = void 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.metadata && (n.metadata = e.metadata ? r.Metadata.toJSON(e.metadata) : void 0), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, S);
                        return void 0 !== e.metadata && null !== e.metadata ? n.metadata = r.Metadata.fromPartial(e.metadata) : n.metadata = void 0, n
                    }
                }, n.QueryClientImpl = class {
                    constructor(e) {
                        this.rpc = e
                    }

                    Balance(e) {
                        const t = n.QueryBalanceRequest.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Query", "Balance", t).then((e => n.QueryBalanceResponse.decode(new o.Reader(e))))
                    }

                    AllBalances(e) {
                        const t = n.QueryAllBalancesRequest.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Query", "AllBalances", t).then((e => n.QueryAllBalancesResponse.decode(new o.Reader(e))))
                    }

                    TotalSupply(e) {
                        const t = n.QueryTotalSupplyRequest.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Query", "TotalSupply", t).then((e => n.QueryTotalSupplyResponse.decode(new o.Reader(e))))
                    }

                    SupplyOf(e) {
                        const t = n.QuerySupplyOfRequest.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Query", "SupplyOf", t).then((e => n.QuerySupplyOfResponse.decode(new o.Reader(e))))
                    }

                    Params(e) {
                        const t = n.QueryParamsRequest.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Query", "Params", t).then((e => n.QueryParamsResponse.decode(new o.Reader(e))))
                    }

                    DenomMetadata(e) {
                        const t = n.QueryDenomMetadataRequest.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Query", "DenomMetadata", t).then((e => n.QueryDenomMetadataResponse.decode(new o.Reader(e))))
                    }

                    DenomsMetadata(e) {
                        const t = n.QueryDenomsMetadataRequest.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Query", "DenomsMetadata", t).then((e => n.QueryDenomsMetadataResponse.decode(new o.Reader(e))))
                    }
                }
            }, 196: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.MsgClientImpl = n.MsgMultiSendResponse = n.MsgMultiSend = n.MsgSendResponse = n.MsgSend = n.protobufPackage = void 0;
                const o = t(741), s = t(211), a = t(945);
                n.protobufPackage = "cosmos.bank.v1beta1";
                const r = {from_address: "", to_address: ""};
                n.MsgSend = {
                    encode(e, n = o.Writer.create()) {
                        "" !== e.from_address && n.uint32(10).string(e.from_address), "" !== e.to_address && n.uint32(18).string(e.to_address);
                        for (const t of e.amount) s.Coin.encode(t, n.uint32(26).fork()).ldelim();
                        return n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const i = Object.assign({}, r);
                        for (i.amount = []; t.pos < a;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    i.from_address = t.string();
                                    break;
                                case 2:
                                    i.to_address = t.string();
                                    break;
                                case 3:
                                    i.amount.push(s.Coin.decode(t, t.uint32()));
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return i
                    }, fromJSON(e) {
                        const n = Object.assign({}, r);
                        if (n.amount = [], void 0 !== e.from_address && null !== e.from_address ? n.from_address = String(e.from_address) : n.from_address = "", void 0 !== e.to_address && null !== e.to_address ? n.to_address = String(e.to_address) : n.to_address = "", void 0 !== e.amount && null !== e.amount) for (const t of e.amount) n.amount.push(s.Coin.fromJSON(t));
                        return n
                    }, toJSON(e) {
                        const n = {};
                        return void 0 !== e.from_address && (n.from_address = e.from_address), void 0 !== e.to_address && (n.to_address = e.to_address), e.amount ? n.amount = e.amount.map((e => e ? s.Coin.toJSON(e) : void 0)) : n.amount = [], n
                    }, fromPartial(e) {
                        const n = Object.assign({}, r);
                        if (n.amount = [], void 0 !== e.from_address && null !== e.from_address ? n.from_address = e.from_address : n.from_address = "", void 0 !== e.to_address && null !== e.to_address ? n.to_address = e.to_address : n.to_address = "", void 0 !== e.amount && null !== e.amount) for (const t of e.amount) n.amount.push(s.Coin.fromPartial(t));
                        return n
                    }
                };
                const i = {};
                n.MsgSendResponse = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, i);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return a
                    }, fromJSON: e => Object.assign({}, i), toJSON: e => ({}), fromPartial: e => Object.assign({}, i)
                };
                const d = {};
                n.MsgMultiSend = {
                    encode(e, n = o.Writer.create()) {
                        for (const t of e.inputs) a.Input.encode(t, n.uint32(10).fork()).ldelim();
                        for (const t of e.outputs) a.Output.encode(t, n.uint32(18).fork()).ldelim();
                        return n
                    }, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, d);
                        for (r.inputs = [], r.outputs = []; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.inputs.push(a.Input.decode(t, t.uint32()));
                                    break;
                                case 2:
                                    r.outputs.push(a.Output.decode(t, t.uint32()));
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    }, fromJSON(e) {
                        const n = Object.assign({}, d);
                        if (n.inputs = [], n.outputs = [], void 0 !== e.inputs && null !== e.inputs) for (const t of e.inputs) n.inputs.push(a.Input.fromJSON(t));
                        if (void 0 !== e.outputs && null !== e.outputs) for (const t of e.outputs) n.outputs.push(a.Output.fromJSON(t));
                        return n
                    }, toJSON(e) {
                        const n = {};
                        return e.inputs ? n.inputs = e.inputs.map((e => e ? a.Input.toJSON(e) : void 0)) : n.inputs = [], e.outputs ? n.outputs = e.outputs.map((e => e ? a.Output.toJSON(e) : void 0)) : n.outputs = [], n
                    }, fromPartial(e) {
                        const n = Object.assign({}, d);
                        if (n.inputs = [], n.outputs = [], void 0 !== e.inputs && null !== e.inputs) for (const t of e.inputs) n.inputs.push(a.Input.fromPartial(t));
                        if (void 0 !== e.outputs && null !== e.outputs) for (const t of e.outputs) n.outputs.push(a.Output.fromPartial(t));
                        return n
                    }
                };
                const c = {};
                n.MsgMultiSendResponse = {
                    encode: (e, n = o.Writer.create()) => n, decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, c);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            t.skipType(7 & e)
                        }
                        return a
                    }, fromJSON: e => Object.assign({}, c), toJSON: e => ({}), fromPartial: e => Object.assign({}, c)
                }, n.MsgClientImpl = class {
                    constructor(e) {
                        this.rpc = e
                    }

                    Send(e) {
                        const t = n.MsgSend.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Msg", "Send", t).then((e => n.MsgSendResponse.decode(new o.Reader(e))))
                    }

                    MultiSend(e) {
                        const t = n.MsgMultiSend.encode(e).finish();
                        return this.rpc.request("cosmos.bank.v1beta1.Msg", "MultiSend", t).then((e => n.MsgMultiSendResponse.decode(new o.Reader(e))))
                    }
                }
            }, 576: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.PageResponse = n.PageRequest = n.protobufPackage = void 0;
                const o = t(400), s = t(741);
                n.protobufPackage = "cosmos.base.query.v1beta1";
                const a = {offset: 0, limit: 0, count_total: !1, reverse: !1};
                n.PageRequest = {
                    encode: (e, n = s.Writer.create()) => (0 !== e.key.length && n.uint32(10).bytes(e.key), 0 !== e.offset && n.uint32(16).uint64(e.offset), 0 !== e.limit && n.uint32(24).uint64(e.limit), !0 === e.count_total && n.uint32(32).bool(e.count_total), !0 === e.reverse && n.uint32(40).bool(e.reverse), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let o = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, a);
                        for (; t.pos < o;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.key = t.bytes();
                                    break;
                                case 2:
                                    r.offset = p(t.uint64());
                                    break;
                                case 3:
                                    r.limit = p(t.uint64());
                                    break;
                                case 4:
                                    r.count_total = t.bool();
                                    break;
                                case 5:
                                    r.reverse = t.bool();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, a);
                        return void 0 !== e.key && null !== e.key && (n.key = c(e.key)), void 0 !== e.offset && null !== e.offset ? n.offset = Number(e.offset) : n.offset = 0, void 0 !== e.limit && null !== e.limit ? n.limit = Number(e.limit) : n.limit = 0, void 0 !== e.count_total && null !== e.count_total ? n.count_total = Boolean(e.count_total) : n.count_total = !1, void 0 !== e.reverse && null !== e.reverse ? n.reverse = Boolean(e.reverse) : n.reverse = !1, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.key && (n.key = u(void 0 !== e.key ? e.key : new Uint8Array)), void 0 !== e.offset && (n.offset = e.offset), void 0 !== e.limit && (n.limit = e.limit), void 0 !== e.count_total && (n.count_total = e.count_total), void 0 !== e.reverse && (n.reverse = e.reverse), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, a);
                        return void 0 !== e.key && null !== e.key ? n.key = e.key : n.key = new Uint8Array, void 0 !== e.offset && null !== e.offset ? n.offset = e.offset : n.offset = 0, void 0 !== e.limit && null !== e.limit ? n.limit = e.limit : n.limit = 0, void 0 !== e.count_total && null !== e.count_total ? n.count_total = e.count_total : n.count_total = !1, void 0 !== e.reverse && null !== e.reverse ? n.reverse = e.reverse : n.reverse = !1, n
                    }
                };
                const r = {total: 0};
                n.PageResponse = {
                    encode: (e, n = s.Writer.create()) => (0 !== e.next_key.length && n.uint32(10).bytes(e.next_key), 0 !== e.total && n.uint32(16).uint64(e.total), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new s.Reader(e) : e;
                        let o = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, r);
                        for (; t.pos < o;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    a.next_key = t.bytes();
                                    break;
                                case 2:
                                    a.total = p(t.uint64());
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.next_key && null !== e.next_key && (n.next_key = c(e.next_key)), void 0 !== e.total && null !== e.total ? n.total = Number(e.total) : n.total = 0, n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.next_key && (n.next_key = u(void 0 !== e.next_key ? e.next_key : new Uint8Array)), void 0 !== e.total && (n.total = e.total), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.next_key && null !== e.next_key ? n.next_key = e.next_key : n.next_key = new Uint8Array, void 0 !== e.total && null !== e.total ? n.total = e.total : n.total = 0, n
                    }
                };
                var i = (() => {
                    if (void 0 !== i) return i;
                    if ("undefined" != typeof self) return self;
                    if ("undefined" != typeof window) return window;
                    if ("undefined" != typeof global) return global;
                    throw"Unable to locate global object"
                })();
                const d = i.atob || (e => i.Buffer.from(e, "base64").toString("binary"));

                function c(e) {
                    const n = d(e), t = new Uint8Array(n.length);
                    for (let e = 0; e < n.length; ++e) t[e] = n.charCodeAt(e);
                    return t
                }

                const l = i.btoa || (e => i.Buffer.from(e, "binary").toString("base64"));

                function u(e) {
                    const n = [];
                    for (let t = 0; t < e.byteLength; ++t) n.push(String.fromCharCode(e[t]));
                    return l(n.join(""))
                }

                function p(e) {
                    if (e.gt(Number.MAX_SAFE_INTEGER)) throw new i.Error("Value is larger than Number.MAX_SAFE_INTEGER");
                    return e.toNumber()
                }

                s.util.Long !== o && (s.util.Long = o, (0, s.configure)())
            }, 211: (e, n, t) => {
                Object.defineProperty(n, "__esModule", {value: !0}), n.DecProto = n.IntProto = n.DecCoin = n.Coin = n.protobufPackage = void 0;
                const o = t(741);
                n.protobufPackage = "cosmos.base.v1beta1";
                const s = {denom: "", amount: ""};
                n.Coin = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.denom && n.uint32(10).string(e.denom), "" !== e.amount && n.uint32(18).string(e.amount), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let a = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, s);
                        for (; t.pos < a;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.denom = t.string();
                                    break;
                                case 2:
                                    r.amount = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, s);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = String(e.denom) : n.denom = "", void 0 !== e.amount && null !== e.amount ? n.amount = String(e.amount) : n.amount = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.denom && (n.denom = e.denom), void 0 !== e.amount && (n.amount = e.amount), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, s);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = e.denom : n.denom = "", void 0 !== e.amount && null !== e.amount ? n.amount = e.amount : n.amount = "", n
                    }
                };
                const a = {denom: "", amount: ""};
                n.DecCoin = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.denom && n.uint32(10).string(e.denom), "" !== e.amount && n.uint32(18).string(e.amount), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const r = Object.assign({}, a);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            switch (e >>> 3) {
                                case 1:
                                    r.denom = t.string();
                                    break;
                                case 2:
                                    r.amount = t.string();
                                    break;
                                default:
                                    t.skipType(7 & e)
                            }
                        }
                        return r
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, a);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = String(e.denom) : n.denom = "", void 0 !== e.amount && null !== e.amount ? n.amount = String(e.amount) : n.amount = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.denom && (n.denom = e.denom), void 0 !== e.amount && (n.amount = e.amount), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, a);
                        return void 0 !== e.denom && null !== e.denom ? n.denom = e.denom : n.denom = "", void 0 !== e.amount && null !== e.amount ? n.amount = e.amount : n.amount = "", n
                    }
                };
                const r = {int: ""};
                n.IntProto = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.int && n.uint32(10).string(e.int), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, r);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? a.int = t.string() : t.skipType(7 & e)
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.int && null !== e.int ? n.int = String(e.int) : n.int = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.int && (n.int = e.int), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, r);
                        return void 0 !== e.int && null !== e.int ? n.int = e.int : n.int = "", n
                    }
                };
                const i = {dec: ""};
                n.DecProto = {
                    encode: (e, n = o.Writer.create()) => ("" !== e.dec && n.uint32(10).string(e.dec), n),
                    decode(e, n) {
                        const t = e instanceof Uint8Array ? new o.Reader(e) : e;
                        let s = void 0 === n ? t.len : t.pos + n;
                        const a = Object.assign({}, i);
                        for (; t.pos < s;) {
                            const e = t.uint32();
                            e >>> 3 == 1 ? a.dec = t.string() : t.skipType(7 & e)
                        }
                        return a
                    },
                    fromJSON(e) {
                        const n = Object.assign({}, i);
                        return void 0 !== e.dec && null !== e.dec ? n.dec = String(e.dec) : n.dec = "", n
                    },
                    toJSON(e) {
                        const n = {};
                        return void 0 !== e.dec && (n.dec = e.dec), n
                    },
                    fromPartial(e) {
                        const n = Object.assign({}, i);
                        return void 0 !== e.dec && null !== e.dec ? n.dec = e.dec : n.dec = "", n
                    }
                }
            }, 387: e => {
                e.exports = require("@cosmjs/crypto")
            }, 236: e => {
                e.exports = require("@cosmjs/proto-signing")
            }, 614: e => {
                e.exports = require("@cosmjs/stargate")
            }, 758: e => {
                e.exports = require("@cosmjs/tendermint-rpc")
            }, 783: e => {
                e.exports = require("async-wait-until")
            }, 848: e => {
                e.exports = require("bech32")
            }, 731: e => {
                e.exports = require("bip32")
            }, 176: e => {
                e.exports = require("bip39")
            }, 661: e => {
                e.exports = require("delay")
            }, 517: e => {
                e.exports = require("lodash")
            }, 400: e => {
                e.exports = require("long")
            }, 145: e => {
                e.exports = require("monet")
            }, 34: e => {
                e.exports = require("promise-passthrough")
            }, 741: e => {
                e.exports = require("protobufjs/minimal")
            }, 163: e => {
                e.exports = require("tiny-secp256k1")
            }
        }, n = {};

        function t(o) {
            var s = n[o];
            if (void 0 !== s) return s.exports;
            var a = n[o] = {exports: {}};
            return e[o].call(a.exports, a, a.exports, t), a.exports
        }

        var o = {};
        return (() => {
            var e = o;
            Object.defineProperty(e, "__esModule", {value: !0}), e.pinCid = e.send = e.getValidators = e.getStatus = e.hasContent = e.getAccountBalance = e.newBluzelleClient = e.mint = e.newKeplrWallet = e.newLocalWallet = void 0;
            var n = t(845);
            Object.defineProperty(e, "newLocalWallet", {
                enumerable: !0, get: function () {
                    return n.newLocalWallet
                }
            });
            var s = t(766);
            Object.defineProperty(e, "newKeplrWallet", {
                enumerable: !0, get: function () {
                    return s.newKeplrWallet
                }
            });
            var a = t(127);
            Object.defineProperty(e, "mint", {
                enumerable: !0, get: function () {
                    return a.mint
                }
            });
            var r = t(231);
            Object.defineProperty(e, "newBluzelleClient", {
                enumerable: !0, get: function () {
                    return r.newBluzelleClient
                }
            });
            var i = t(568);
            Object.defineProperty(e, "getAccountBalance", {
                enumerable: !0, get: function () {
                    return i.getAccountBalance
                }
            }), Object.defineProperty(e, "hasContent", {
                enumerable: !0, get: function () {
                    return i.hasContent
                }
            });
            var d = t(293);
            Object.defineProperty(e, "getStatus", {
                enumerable: !0, get: function () {
                    return d.getStatus
                }
            }), Object.defineProperty(e, "getValidators", {
                enumerable: !0, get: function () {
                    return d.getValidators
                }
            });
            var c = t(911);
            Object.defineProperty(e, "send", {
                enumerable: !0, get: function () {
                    return c.send
                }
            }), Object.defineProperty(e, "pinCid", {
                enumerable: !0, get: function () {
                    return c.pinCid
                }
            })
        })(), o
    })()
}));
//# sourceMappingURL=index.js.map