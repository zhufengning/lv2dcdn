!
function(t) {
    function i(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i),
        o.l = !0,
        o.exports
    }
    var e = {};
    i.m = t,
    i.c = e,
    i.d = function(t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    },
    i.n = function(t) {
        var e = t && t.__esModule ?
        function() {
            return t.
        default
        }:
        function() {
            return t
        };
        return i.d(e, "a", e),
        e
    },
    i.o = function(t, i) {
        return Object.prototype.hasOwnProperty.call(t, i)
    },
    i.p = "",
    i(i.s = 4)
} ([function(t, i, e) {
    "use strict";
    function r() {
        this.live2DModel = null,
        this.modelMatrix = null,
        this.eyeBlink = null,
        this.physics = null,
        this.pose = null,
        this.debugMode = !1,
        this.initialized = !1,
        this.updating = !1,
        this.alpha = 1,
        this.accAlpha = 0,
        this.lipSync = !1,
        this.lipSyncValue = 0,
        this.accelX = 0,
        this.accelY = 0,
        this.accelZ = 0,
        this.dragX = 0,
        this.dragY = 0,
        this.startTimeMSec = null,
        this.mainMotionManager = new h,
        this.expressionManager = new h,
        this.motions = {},
        this.expressions = {},
        this.isTexLoaded = !1
    }
    function o() {
        AMotion.prototype.constructor.call(this),
        this.paramList = new Array
    }
    function n() {
        this.id = "",
        this.type = -1,
        this.value = null
    }
    function s() {
        this.nextBlinkTime = null,
        this.stateStartTime = null,
        this.blinkIntervalMsec = null,
        this.eyeState = g.STATE_FIRST,
        this.blinkIntervalMsec = 4e3,
        this.closingMotionMsec = 100,
        this.closedMotionMsec = 50,
        this.openingMotionMsec = 150,
        this.closeIfZero = !0,
        this.eyeID_L = "PARAM_EYE_L_OPEN",
        this.eyeID_R = "PARAM_EYE_R_OPEN"
    }
    function _() {
        this.tr = new Float32Array(16),
        this.identity()
    }
    function a(t, i) {
        _.prototype.constructor.call(this),
        this.width = t,
        this.height = i
    }
    function h() {
        MotionQueueManager.prototype.constructor.call(this),
        this.currentPriority = null,
        this.reservePriority = null,
        this.super = MotionQueueManager.prototype
    }
    function l() {
        this.physicsList = new Array,
        this.startTimeMSec = UtSystem.getUserTimeMSec()
    }
    function $() {
        this.lastTime = 0,
        this.lastModel = null,
        this.partsGroups = new Array
    }
    function u(t) {
        this.paramIndex = -1,
        this.partsIndex = -1,
        this.link = null,
        this.id = t
    }
    function p() {
        this.EPSILON = .01,
        this.faceTargetX = 0,
        this.faceTargetY = 0,
        this.faceX = 0,
        this.faceY = 0,
        this.faceVX = 0,
        this.faceVY = 0,
        this.lastTimeSec = 0
    }
    function f() {
        _.prototype.constructor.call(this),
        this.screenLeft = null,
        this.screenRight = null,
        this.screenTop = null,
        this.screenBottom = null,
        this.maxLeft = null,
        this.maxRight = null,
        this.maxTop = null,
        this.maxBottom = null,
        this.max = Number.MAX_VALUE,
        this.min = 0
    }
    function c() {}
    var d = 0;
    r.prototype.getModelMatrix = function() {
        return this.modelMatrix
    },
    r.prototype.setAlpha = function(t) {
        t > .999 && (t = 1),
        t < .001 && (t = 0),
        this.alpha = t
    },
    r.prototype.getAlpha = function() {
        return this.alpha
    },
    r.prototype.isInitialized = function() {
        return this.initialized
    },
    r.prototype.setInitialized = function(t) {
        this.initialized = t
    },
    r.prototype.isUpdating = function() {
        return this.updating
    },
    r.prototype.setUpdating = function(t) {
        this.updating = t
    },
    r.prototype.getLive2DModel = function() {
        return this.live2DModel
    },
    r.prototype.setLipSync = function(t) {
        this.lipSync = t
    },
    r.prototype.setLipSyncValue = function(t) {
        this.lipSyncValue = t
    },
    r.prototype.setAccel = function(t, i, e) {
        this.accelX = t,
        this.accelY = i,
        this.accelZ = e
    },
    r.prototype.setDrag = function(t, i) {
        this.dragX = t,
        this.dragY = i
    },
    r.prototype.getMainMotionManager = function() {
        return this.mainMotionManager
    },
    r.prototype.getExpressionManager = function() {
        return this.expressionManager
    },
    r.prototype.loadModelData = function(t, i) {
        var e = c.getPlatformManager();
        this.debugMode && e.log("Load model : " + t);
        var r = this;
        e.loadLive2DModel(t,
        function(t) {
            if (r.live2DModel = t, r.live2DModel.saveParam(), 0 != Live2D.getError()) return void console.error("Error : Failed to loadModelData().");
            r.modelMatrix = new a(r.live2DModel.getCanvasWidth(), r.live2DModel.getCanvasHeight()),
            r.modelMatrix.setWidth(2),
            r.modelMatrix.setCenterPosition(0, 0),
            i(r.live2DModel)
        })
    },
    r.prototype.loadTexture = function(t, i, e) {
        d++;
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Texture : " + i);
        var o = this;
        r.loadTexture(this.live2DModel, t, i,
        function() {
            d--,
            0 == d && (o.isTexLoaded = !0),
            "function" == typeof e && e()
        })
    },
    r.prototype.loadMotion = function(t, i, e) {
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Motion : " + i);
        var o = null,
        n = this;
        r.loadBytes(i,
        function(i) {
            o = Live2DMotion.loadMotion(i),
            null != t && (n.motions[t] = o),
            e(o)
        })
    },
    r.prototype.loadExpression = function(t, i, e) {
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Expression : " + i);
        var n = this;
        r.loadBytes(i,
        function(i) {
            null != t && (n.expressions[t] = o.loadJson(i)),
            "function" == typeof e && e()
        })
    },
    r.prototype.loadPose = function(t, i) {
        var e = c.getPlatformManager();
        this.debugMode && e.log("Load Pose : " + t);
        var r = this;
        try {
            e.loadBytes(t,
            function(t) {
                r.pose = $.load(t),
                "function" == typeof i && i()
            })
        } catch(t) {
            console.warn(t)
        }
    },
    r.prototype.loadPhysics = function(t) {
        var i = c.getPlatformManager();
        this.debugMode && i.log("Load Physics : " + t);
        var e = this;
        try {
            i.loadBytes(t,
            function(t) {
                e.physics = l.load(t)
            })
        } catch(t) {
            console.warn(t)
        }
    },
    r.prototype.hitTestSimple = function(t, i, e) {
        if (null === this.live2DModel) return ! 1;
        var r = this.live2DModel.getDrawDataIndex(t);
        if (r < 0) return ! 1;
        for (var o = this.live2DModel.getTransformedPoints(r), n = this.live2DModel.getCanvasWidth(), s = 0, _ = this.live2DModel.getCanvasHeight(), a = 0, h = 0; h < o.length; h += 2) {
            var l = o[h],
            $ = o[h + 1];
            l < n && (n = l),
            l > s && (s = l),
            $ < _ && (_ = $),
            $ > a && (a = $)
        }
        var u = this.modelMatrix.invertTransformX(i),
        p = this.modelMatrix.invertTransformY(e);
        return n <= u && u <= s && _ <= p && p <= a
    },
    r.prototype.hitTestSimpleCustom = function(t, i, e, r) {},
    o.prototype = new AMotion,
    o.EXPRESSION_DEFAULT = "DEFAULT",
    o.TYPE_SET = 0,
    o.TYPE_ADD = 1,
    o.TYPE_MULT = 2,
    o.loadJson = function(t) {
        var i = new o,
        e = c.getPlatformManager(),
        r = e.jsonParseFromBytes(t);
        if (i.setFadeIn(parseInt(r.fade_in) > 0 ? parseInt(r.fade_in) : 1e3), i.setFadeOut(parseInt(r.fade_out) > 0 ? parseInt(r.fade_out) : 1e3), null == r.params) return i;
        var s = r.params,
        _ = s.length;
        i.paramList = [];
        for (var a = 0; a < _; a++) {
            var h = s[a],
            l = h.id.toString(),
            $ = parseFloat(h.val),
            u = o.TYPE_ADD,
            p = null != h.calc ? h.calc.toString() : "add";
            if ((u = "add" === p ? o.TYPE_ADD: "mult" === p ? o.TYPE_MULT: "set" === p ? o.TYPE_SET: o.TYPE_ADD) == o.TYPE_ADD) {
                var f = null == h.def ? 0 : parseFloat(h.def);
                $ -= f
            } else if (u == o.TYPE_MULT) {
                var f = null == h.def ? 1 : parseFloat(h.def);
                0 == f && (f = 1),
                $ /= f
            }
            var d = new n;
            d.id = l,
            d.type = u,
            d.value = $,
            i.paramList.push(d)
        }
        return i
    },
    o.prototype.updateParamExe = function(t, i, e, r) {
        for (var n = this.paramList.length - 1; n >= 0; --n) {
            var s = this.paramList[n];
            s.type == o.TYPE_ADD ? t.addToParamFloat(s.id, s.value, e) : s.type == o.TYPE_MULT ? t.multParamFloat(s.id, s.value, e) : s.type == o.TYPE_SET && t.setParamFloat(s.id, s.value, e)
        }
    },
    s.prototype.calcNextBlink = function() {
        return UtSystem.getUserTimeMSec() + Math.random() * (2 * this.blinkIntervalMsec - 1)
    },
    s.prototype.setInterval = function(t) {
        this.blinkIntervalMsec = t
    },
    s.prototype.setEyeMotion = function(t, i, e) {
        this.closingMotionMsec = t,
        this.closedMotionMsec = i,
        this.openingMotionMsec = e
    },
    s.prototype.updateParam = function(t) {
        var i, e = UtSystem.getUserTimeMSec(),
        r = 0;
        switch (this.eyeState) {
        case g.STATE_CLOSING:
            r = (e - this.stateStartTime) / this.closingMotionMsec,
            r >= 1 && (r = 1, this.eyeState = g.STATE_CLOSED, this.stateStartTime = e),
            i = 1 - r;
            break;
        case g.STATE_CLOSED:
            r = (e - this.stateStartTime) / this.closedMotionMsec,
            r >= 1 && (this.eyeState = g.STATE_OPENING, this.stateStartTime = e),
            i = 0;
            break;
        case g.STATE_OPENING:
            r = (e - this.stateStartTime) / this.openingMotionMsec,
            r >= 1 && (r = 1, this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink()),
            i = r;
            break;
        case g.STATE_INTERVAL:
            this.nextBlinkTime < e && (this.eyeState = g.STATE_CLOSING, this.stateStartTime = e),
            i = 1;
            break;
        case g.STATE_FIRST:
        default:
            this.eyeState = g.STATE_INTERVAL,
            this.nextBlinkTime = this.calcNextBlink(),
            i = 1
        }
        this.closeIfZero || (i = -i),
        t.setParamFloat(this.eyeID_L, i),
        t.setParamFloat(this.eyeID_R, i)
    };
    var g = function() {};
    g.STATE_FIRST = "STATE_FIRST",
    g.STATE_INTERVAL = "STATE_INTERVAL",
    g.STATE_CLOSING = "STATE_CLOSING",
    g.STATE_CLOSED = "STATE_CLOSED",
    g.STATE_OPENING = "STATE_OPENING",
    _.mul = function(t, i, e) {
        var r, o, n, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (r = 0; r < 4; r++) for (o = 0; o < 4; o++) for (n = 0; n < 4; n++) s[r + 4 * o] += t[r + 4 * n] * i[n + 4 * o];
        for (r = 0; r < 16; r++) e[r] = s[r]
    },
    _.prototype.identity = function() {
        for (var t = 0; t < 16; t++) this.tr[t] = t % 5 == 0 ? 1 : 0
    },
    _.prototype.getArray = function() {
        return this.tr
    },
    _.prototype.getCopyMatrix = function() {
        return new Float32Array(this.tr)
    },
    _.prototype.setMatrix = function(t) {
        if (null != this.tr && this.tr.length == this.tr.length) for (var i = 0; i < 16; i++) this.tr[i] = t[i]
    },
    _.prototype.getScaleX = function() {
        return this.tr[0]
    },
    _.prototype.getScaleY = function() {
        return this.tr[5]
    },
    _.prototype.transformX = function(t) {
        return this.tr[0] * t + this.tr[12]
    },
    _.prototype.transformY = function(t) {
        return this.tr[5] * t + this.tr[13]
    },
    _.prototype.invertTransformX = function(t) {
        return (t - this.tr[12]) / this.tr[0]
    },
    _.prototype.invertTransformY = function(t) {
        return (t - this.tr[13]) / this.tr[5]
    },
    _.prototype.multTranslate = function(t, i) {
        var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
        _.mul(e, this.tr, this.tr)
    },
    _.prototype.translate = function(t, i) {
        this.tr[12] = t,
        this.tr[13] = i
    },
    _.prototype.translateX = function(t) {
        this.tr[12] = t
    },
    _.prototype.translateY = function(t) {
        this.tr[13] = t
    },
    _.prototype.multScale = function(t, i) {
        var e = [t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        _.mul(e, this.tr, this.tr)
    },
    _.prototype.scale = function(t, i) {
        this.tr[0] = t,
        this.tr[5] = i
    },
    a.prototype = new _,
    a.prototype.setPosition = function(t, i) {
        this.translate(t, i)
    },
    a.prototype.setCenterPosition = function(t, i) {
        var e = this.width * this.getScaleX(),
        r = this.height * this.getScaleY();
        this.translate(t - e / 2, i - r / 2)
    },
    a.prototype.top = function(t) {
        this.setY(t)
    },
    a.prototype.bottom = function(t) {
        var i = this.height * this.getScaleY();
        this.translateY(t - i)
    },
    a.prototype.left = function(t) {
        this.setX(t)
    },
    a.prototype.right = function(t) {
        var i = this.width * this.getScaleX();
        this.translateX(t - i)
    },
    a.prototype.centerX = function(t) {
        var i = this.width * this.getScaleX();
        this.translateX(t - i / 2)
    },
    a.prototype.centerY = function(t) {
        var i = this.height * this.getScaleY();
        this.translateY(t - i / 2)
    },
    a.prototype.setX = function(t) {
        this.translateX(t)
    },
    a.prototype.setY = function(t) {
        this.translateY(t)
    },
    a.prototype.setHeight = function(t) {
        var i = t / this.height,
        e = -i;
        this.scale(i, e)
    },
    a.prototype.setWidth = function(t) {
        var i = t / this.width,
        e = -i;
        this.scale(i, e)
    },
    h.prototype = new MotionQueueManager,
    h.prototype.getCurrentPriority = function() {
        return this.currentPriority
    },
    h.prototype.getReservePriority = function() {
        return this.reservePriority
    },
    h.prototype.reserveMotion = function(t) {
        return ! (this.reservePriority >= t) && (!(this.currentPriority >= t) && (this.reservePriority = t, !0))
    },
    h.prototype.setReservePriority = function(t) {
        this.reservePriority = t
    },
    h.prototype.updateParam = function(t) {
        var i = MotionQueueManager.prototype.updateParam.call(this, t);
        return this.isFinished() && (this.currentPriority = 0),
        i
    },
    h.prototype.startMotionPrio = function(t, i) {
        return i == this.reservePriority && (this.reservePriority = 0),
        this.currentPriority = i,
        this.startMotion(t, !1)
    },
    l.load = function(t) {
        for (var i = new l,
        e = c.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.physics_hair, n = o.length, s = 0; s < n; s++) {
            var _ = o[s],
            a = new PhysicsHair,
            h = _.setup,
            $ = parseFloat(h.length),
            u = parseFloat(h.regist),
            p = parseFloat(h.mass);
            a.setup($, u, p);
            for (var f = _.src,
            d = f.length,
            g = 0; g < d; g++) {
                var y = f[g],
                m = y.id,
                T = PhysicsHair.Src.SRC_TO_X,
                P = y.ptype;
                "x" === P ? T = PhysicsHair.Src.SRC_TO_X: "y" === P ? T = PhysicsHair.Src.SRC_TO_Y: "angle" === P ? T = PhysicsHair.Src.SRC_TO_G_ANGLE: UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Src");
                var S = parseFloat(y.scale),
                v = parseFloat(y.weight);
                a.addSrcParam(T, m, S, v)
            }
            for (var L = _.targets,
            M = L.length,
            g = 0; g < M; g++) {
                var E = L[g],
                m = E.id,
                T = PhysicsHair.Target.TARGET_FROM_ANGLE,
                P = E.ptype;
                "angle" === P ? T = PhysicsHair.Target.TARGET_FROM_ANGLE: "angle_v" === P ? T = PhysicsHair.Target.TARGET_FROM_ANGLE_V: UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Target");
                var S = parseFloat(E.scale),
                v = parseFloat(E.weight);
                a.addTargetParam(T, m, S, v)
            }
            i.physicsList.push(a)
        }
        return i
    },
    l.prototype.updateParam = function(t) {
        for (var i = UtSystem.getUserTimeMSec() - this.startTimeMSec, e = 0; e < this.physicsList.length; e++) this.physicsList[e].update(t, i)
    },
    $.load = function(t) {
        for (var i = new $,
        e = c.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.parts_visible, n = o.length, s = 0; s < n; s++) {
            for (var _ = o[s], a = _.group, h = a.length, l = new Array, p = 0; p < h; p++) {
                var f = a[p],
                d = new u(f.id);
                if (l[p] = d, null != f.link) {
                    var g = f.link,
                    y = g.length;
                    d.link = new Array;
                    for (var m = 0; m < y; m++) {
                        var T = new u(g[m]);
                        d.link.push(T)
                    }
                }
            }
            i.partsGroups.push(l)
        }
        return i
    },
    $.prototype.updateParam = function(t) {
        if (null != t) {
            t != this.lastModel && this.initParam(t),
            this.lastModel = t;
            var i = UtSystem.getUserTimeMSec(),
            e = 0 == this.lastTime ? 0 : (i - this.lastTime) / 1e3;
            this.lastTime = i,
            e < 0 && (e = 0);
            for (var r = 0; r < this.partsGroups.length; r++) this.normalizePartsOpacityGroup(t, this.partsGroups[r], e),
            this.copyOpacityOtherParts(t, this.partsGroups[r])
        }
    },
    $.prototype.initParam = function(t) {
        if (null != t) for (var i = 0; i < this.partsGroups.length; i++) for (var e = this.partsGroups[i], r = 0; r < e.length; r++) {
            e[r].initIndex(t);
            var o = e[r].partsIndex,
            n = e[r].paramIndex;
            if (! (o < 0)) {
                var s = 0 != t.getParamFloat(n);
                if (t.setPartsOpacity(o, s ? 1 : 0), t.setParamFloat(n, s ? 1 : 0), null != e[r].link) for (var _ = 0; _ < e[r].link.length; _++) e[r].link[_].initIndex(t)
            }
        }
    },
    $.prototype.normalizePartsOpacityGroup = function(t, i, e) {
        for (var r = -1,
        o = 1,
        n = 0; n < i.length; n++) {
            var s = i[n].partsIndex,
            _ = i[n].paramIndex;
            if (! (s < 0) && 0 != t.getParamFloat(_)) {
                if (r >= 0) break;
                r = n,
                o = t.getPartsOpacity(s),
                o += e / .5,
                o > 1 && (o = 1)
            }
        }
        r < 0 && (r = 0, o = 1);
        for (var n = 0; n < i.length; n++) {
            var s = i[n].partsIndex;
            if (! (s < 0)) if (r == n) t.setPartsOpacity(s, o);
            else {
                var a, h = t.getPartsOpacity(s);
                a = o < .5 ? -.5 * o / .5 + 1 : .5 * (1 - o) / .5;
                var l = (1 - a) * (1 - o);
                l > .15 && (a = 1 - .15 / (1 - o)),
                h > a && (h = a),
                t.setPartsOpacity(s, h)
            }
        }
    },
    $.prototype.copyOpacityOtherParts = function(t, i) {
        for (var e = 0; e < i.length; e++) {
            var r = i[e];
            if (null != r.link && !(r.partsIndex < 0)) for (var o = t.getPartsOpacity(r.partsIndex), n = 0; n < r.link.length; n++) {
                var s = r.link[n];
                s.partsIndex < 0 || t.setPartsOpacity(s.partsIndex, o)
            }
        }
    },
    u.prototype.initIndex = function(t) {
        this.paramIndex = t.getParamIndex("VISIBLE:" + this.id),
        this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)),
        t.setParamFloat(this.paramIndex, 1)
    },
    p.FRAME_RATE = 30,
    p.prototype.setPoint = function(t, i) {
        this.faceTargetX = t,
        this.faceTargetY = i
    },
    p.prototype.getX = function() {
        return this.faceX
    },
    p.prototype.getY = function() {
        return this.faceY
    },
    p.prototype.update = function() {
        var t = 40 / 7.5 / p.FRAME_RATE;
        if (0 == this.lastTimeSec) return void(this.lastTimeSec = UtSystem.getUserTimeMSec());
        var i = UtSystem.getUserTimeMSec(),
        e = (i - this.lastTimeSec) * p.FRAME_RATE / 1e3;
        this.lastTimeSec = i;
        var r = .15 * p.FRAME_RATE,
        o = e * t / r,
        n = this.faceTargetX - this.faceX,
        s = this.faceTargetY - this.faceY;
        if (! (Math.abs(n) <= this.EPSILON && Math.abs(s) <= this.EPSILON)) {
            var _ = Math.sqrt(n * n + s * s),
            a = t * n / _,
            h = t * s / _,
            l = a - this.faceVX,
            $ = h - this.faceVY,
            u = Math.sqrt(l * l + $ * $); (u < -o || u > o) && (l *= o / u, $ *= o / u, u = o),
            this.faceVX += l,
            this.faceVY += $;
            var f = .5 * (Math.sqrt(o * o + 16 * o * _ - 8 * o * _) - o),
            c = Math.sqrt(this.faceVX * this.faceVX + this.faceVY * this.faceVY);
            c > f && (this.faceVX *= f / c, this.faceVY *= f / c),
            this.faceX += this.faceVX,
            this.faceY += this.faceVY
        }
    },
    f.prototype = new _,
    f.prototype.getMaxScale = function() {
        return this.max
    },
    f.prototype.getMinScale = function() {
        return this.min
    },
    f.prototype.setMaxScale = function(t) {
        this.max = t
    },
    f.prototype.setMinScale = function(t) {
        this.min = t
    },
    f.prototype.isMaxScale = function() {
        return this.getScaleX() == this.max
    },
    f.prototype.isMinScale = function() {
        return this.getScaleX() == this.min
    },
    f.prototype.adjustTranslate = function(t, i) {
        this.tr[0] * this.maxLeft + (this.tr[12] + t) > this.screenLeft && (t = this.screenLeft - this.tr[0] * this.maxLeft - this.tr[12]),
        this.tr[0] * this.maxRight + (this.tr[12] + t) < this.screenRight && (t = this.screenRight - this.tr[0] * this.maxRight - this.tr[12]),
        this.tr[5] * this.maxTop + (this.tr[13] + i) < this.screenTop && (i = this.screenTop - this.tr[5] * this.maxTop - this.tr[13]),
        this.tr[5] * this.maxBottom + (this.tr[13] + i) > this.screenBottom && (i = this.screenBottom - this.tr[5] * this.maxBottom - this.tr[13]);
        var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
        _.mul(e, this.tr, this.tr)
    },
    f.prototype.adjustScale = function(t, i, e) {
        var r = e * this.tr[0];
        r < this.min ? this.tr[0] > 0 && (e = this.min / this.tr[0]) : r > this.max && this.tr[0] > 0 && (e = this.max / this.tr[0]);
        var o = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1],
        n = [e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        s = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -i, 0, 1];
        _.mul(s, this.tr, this.tr),
        _.mul(n, this.tr, this.tr),
        _.mul(o, this.tr, this.tr)
    },
    f.prototype.setScreenRect = function(t, i, e, r) {
        this.screenLeft = t,
        this.screenRight = i,
        this.screenTop = r,
        this.screenBottom = e
    },
    f.prototype.setMaxScreenRect = function(t, i, e, r) {
        this.maxLeft = t,
        this.maxRight = i,
        this.maxTop = r,
        this.maxBottom = e
    },
    f.prototype.getScreenLeft = function() {
        return this.screenLeft
    },
    f.prototype.getScreenRight = function() {
        return this.screenRight
    },
    f.prototype.getScreenBottom = function() {
        return this.screenBottom
    },
    f.prototype.getScreenTop = function() {
        return this.screenTop
    },
    f.prototype.getMaxLeft = function() {
        return this.maxLeft
    },
    f.prototype.getMaxRight = function() {
        return this.maxRight
    },
    f.prototype.getMaxBottom = function() {
        return this.maxBottom
    },
    f.prototype.getMaxTop = function() {
        return this.maxTop
    },
    c.platformManager = null,
    c.getPlatformManager = function() {
        return c.platformManager
    },
    c.setPlatformManager = function(t) {
        c.platformManager = t
    },
    t.exports = {
        L2DTargetPoint: p,
        Live2DFramework: c,
        L2DViewMatrix: f,
        L2DPose: $,
        L2DPartsParam: u,
        L2DPhysics: l,
        L2DMotionManager: h,
        L2DModelMatrix: a,
        L2DMatrix44: _,
        EYE_STATE: g,
        L2DEyeBlink: s,
        L2DExpressionParam: n,
        L2DExpressionMotion: o,
        L2DBaseModel: r
    }
},
function(t, i, e) {
    "use strict";
    var r = {
        DEBUG_LOG: !1,
        DEBUG_MOUSE_LOG: !1,
        DEBUG_DRAW_HIT_AREA: !1,
        DEBUG_DRAW_ALPHA_MODEL: !1,
        VIEW_MAX_SCALE: 2,
        VIEW_MIN_SCALE: .8,
        VIEW_LOGICAL_LEFT: -1,
        VIEW_LOGICAL_RIGHT: 1,
        VIEW_LOGICAL_MAX_LEFT: -2,
        VIEW_LOGICAL_MAX_RIGHT: 2,
        VIEW_LOGICAL_MAX_BOTTOM: -2,
        VIEW_LOGICAL_MAX_TOP: 2,
        PRIORITY_NONE: 0,
        PRIORITY_IDLE: 1,
        PRIORITY_SLEEPY: 2,
        PRIORITY_NORMAL: 3,
        PRIORITY_FORCE: 4,
        MOTION_GROUP_IDLE: "idle",
        MOTION_GROUP_SLEEPY: "sleepy",
        MOTION_GROUP_TAP_BODY: "tap_body",
        MOTION_GROUP_FLICK_HEAD: "flick_head",
        MOTION_GROUP_PINCH_IN: "pinch_in",
        MOTION_GROUP_PINCH_OUT: "pinch_out",
        MOTION_GROUP_SHAKE: "shake",
        HIT_AREA_HEAD: "head",
        HIT_AREA_BODY: "body"
    };
    t.exports = r
},
function(t, i, e) {
    "use strict";
    function r(t) {
        n = t
    }
    function o() {
        return n
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.setContext = r,
    i.getContext = o;
    var n = void 0
},
function(t, i, e) {
    "use strict";
    function r() {}
    r.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    r.depth = 0,
    r.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    r.tmp = new Array(16),
    r.reset = function() {
        this.depth = 0
    },
    r.loadIdentity = function() {
        for (var t = 0; t < 16; t++) this.currentMatrix[t] = t % 5 == 0 ? 1 : 0
    },
    r.push = function() {
        var t = (this.depth, 16 * (this.depth + 1));
        this.matrixStack.length < t + 16 && (this.matrixStack.length = t + 16);
        for (var i = 0; i < 16; i++) this.matrixStack[t + i] = this.currentMatrix[i];
        this.depth++
    },
    r.pop = function() {--this.depth < 0 && (myError("Invalid matrix stack."), this.depth = 0);
        for (var t = 16 * this.depth,
        i = 0; i < 16; i++) this.currentMatrix[i] = this.matrixStack[t + i]
    },
    r.getMatrix = function() {
        return this.currentMatrix
    },
    r.multMatrix = function(t) {
        var i, e, r;
        for (i = 0; i < 16; i++) this.tmp[i] = 0;
        for (i = 0; i < 4; i++) for (e = 0; e < 4; e++) for (r = 0; r < 4; r++) this.tmp[i + 4 * e] += this.currentMatrix[i + 4 * r] * t[r + 4 * e];
        for (i = 0; i < 16; i++) this.currentMatrix[i] = this.tmp[i]
    },
    t.exports = r
},
function(t, i, e) {
    t.exports = e(5)
},
function(t, i, e) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t: {
        default:
            t
        }
    }
    function o(t) {
        C = document.getElementById(t),
        C.addEventListener && (window.addEventListener("click", g), window.addEventListener("mousedown", g), window.addEventListener("mousemove", g), window.addEventListener("mouseup", g), document.addEventListener("mouseout", g), window.addEventListener("touchstart", y), window.addEventListener("touchend", y), window.addEventListener("touchmove", y))
    }
    function n(t) {
        var i = C.width,
        e = C.height;
        N = new M.L2DTargetPoint;
        var r = e / i,
        o = x.
    default.VIEW_LOGICAL_LEFT,
        n = x.
    default.VIEW_LOGICAL_RIGHT,
        _ = -r,
        h = r;
        if (B = new M.L2DViewMatrix, B.setScreenRect(o, n, _, h), B.setMaxScreenRect(x.
    default.VIEW_LOGICAL_MAX_LEFT, x.
    default.VIEW_LOGICAL_MAX_RIGHT, x.
    default.VIEW_LOGICAL_MAX_BOTTOM, x.
    default.VIEW_LOGICAL_MAX_TOP), B.setMaxScale(x.
    default.VIEW_MAX_SCALE), B.setMinScale(x.
    default.VIEW_MIN_SCALE), U = new M.L2DMatrix44, U.multScale(1, i / e), G = new M.L2DMatrix44, G.multTranslate( - i / 2, -e / 2), G.multScale(2 / i, -2 / i), F = v(), (0, D.setContext)(F), !F) return console.error("Failed to create WebGL context."),
        void(window.WebGLRenderingContext && console.error("Your browser don't support WebGL, check https://get.webgl.org/ for futher information."));
        window.Live2D.setGL(F),
        F.clearColor(0, 0, 0, 0),
        a(t),
        s()
    }
    function s() {
        b || (b = !0,
        function t() {
            _(),
            (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame)(t, C)
        } ())
    }
    function _() {
        O.
    default.reset(),
        O.
    default.loadIdentity(),
        N.update(),
        R.setDrag(N.getX(), N.getY()),
        F.clear(F.COLOR_BUFFER_BIT),
        O.
    default.multMatrix(U.getArray()),
        O.
    default.multMatrix(B.getArray()),
        O.
    default.push();
        for (var t = 0; t < R.numModels(); t++) {
            var i = R.getModel(t);
            if (null == i) return;
            i.initialized && !i.updating && (i.update(), i.draw(F))
        }
        O.
    default.pop()
    }
    function a(t) {
        R.reloadFlg = !0,
        R.count++,
        R.changeModel(F, t)
    }
    function h(t, i) {
        return t.x * i.x + t.y * i.y
    }
    function l(t, i) {
        var e = Math.sqrt(t * t + i * i);
        return {
            x: t / e,
            y: i / e
        }
    }
    function $(t, i, e) {
        function r(t, i) {
            return 180 * Math.acos(h({
                x: 0,
                y: 1
            },
            l(t, i))) / Math.PI
        }
        if (i.x < e.left + e.width && i.y < e.top + e.height && i.x > e.left && i.y > e.top) return i;
        var o = t.x - i.x,
        n = t.y - i.y,
        s = r(o, n);
        i.x < t.x && (s = 360 - s);
        var _ = 360 - r(e.left - t.x, -1 * (e.top - t.y)),
        a = 360 - r(e.left - t.x, -1 * (e.top + e.height - t.y)),
        $ = r(e.left + e.width - t.x, -1 * (e.top - t.y)),
        u = r(e.left + e.width - t.x, -1 * (e.top + e.height - t.y)),
        p = n / o,
        f = {};
        if (s < $) {
            var c = e.top - t.y,
            d = c / p;
            f = {
                y: t.y + c,
                x: t.x + d
            }
        } else if (s < u) {
            var g = e.left + e.width - t.x,
            y = g * p;
            f = {
                y: t.y + y,
                x: t.x + g
            }
        } else if (s < a) {
            var m = e.top + e.height - t.y,
            T = m / p;
            f = {
                y: t.y + m,
                x: t.x + T
            }
        } else if (s < _) {
            var P = t.x - e.left,
            S = P * p;
            f = {
                y: t.y - S,
                x: t.x - P
            }
        } else {
            var v = e.top - t.y,
            L = v / p;
            f = {
                y: t.y + v,
                x: t.x + L
            }
        }
        return f
    }
    function u(t) {
        Y = !0;
        var i = C.getBoundingClientRect(),
        e = P(t.clientX - i.left),
        r = S(t.clientY - i.top),
        o = $({
            x: i.left + i.width / 2,
            y: i.top + i.height * X
        },
        {
            x: t.clientX,
            y: t.clientY
        },
        i),
        n = m(o.x - i.left),
        s = T(o.y - i.top);
        x.
    default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"),
        k = e,
        V = r,
        N.setPoint(n, s)
    }
    function p(t) {
        Y = !0;
        var i = C.getBoundingClientRect(),
        e = P(t.clientX - i.left),
        r = S(t.clientY - i.top),
        o = $({
            x: i.left + i.width / 2,
            y: i.top + i.height * X
        },
        {
            x: t.clientX,
            y: t.clientY
        },
        i),
        n = m(o.x - i.left),
        s = T(o.y - i.top);
        x.
    default.DEBUG_MOUSE_LOG && console.log("onMouseDown device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"),
        k = e,
        V = r,
        R.tapEvent(n, s)
    }
    function f(t) {
        var i = C.getBoundingClientRect(),
        e = P(t.clientX - i.left),
        r = S(t.clientY - i.top),
        o = $({
            x: i.left + i.width / 2,
            y: i.top + i.height * X
        },
        {
            x: t.clientX,
            y: t.clientY
        },
        i),
        n = m(o.x - i.left),
        s = T(o.y - i.top);
        x.
    default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"),
        Y && (k = e, V = r, N.setPoint(n, s))
    }
    function c() {
        Y && (Y = !1),
        N.setPoint(0, 0)
    }
    function d() {
        x.
    default.DEBUG_LOG && console.log("Set Session Storage."),
        sessionStorage.setItem("Sleepy", "1")
    }
    function g(t) {
        if ("mousewheel" == t.type);
        else if ("mousedown" == t.type) p(t);
        else if ("mousemove" == t.type) {
            var i = sessionStorage.getItem("Sleepy");
            "1" === i && sessionStorage.setItem("Sleepy", "0"),
            u(t)
        } else if ("mouseup" == t.type) {
            if ("button" in t && 0 != t.button) return
        } else if ("mouseout" == t.type) {
            x.
        default.DEBUG_LOG && console.log("Mouse out Window."),
            c();
            var e = sessionStorage.getItem("SleepyTimer");
            window.clearTimeout(e),
            e = window.setTimeout(d, 5e4),
            sessionStorage.setItem("SleepyTimer", e)
        }
    }
    function y(t) {
        var i = t.touches[0];
        "touchstart" == t.type ? 1 == t.touches.length && u(i) : "touchmove" == t.type ? f(i) : "touchend" == t.type && c()
    }
    function m(t) {
        var i = G.transformX(t);
        return B.invertTransformX(i)
    }
    function T(t) {
        var i = G.transformY(t);
        return B.invertTransformY(i)
    }
    function P(t) {
        return G.transformX(t)
    }
    function S(t) {
        return G.transformY(t)
    }
    function v() {
        for (var t = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], i = 0; i < t.length; i++) try {
            var e = C.getContext(t[i], {
                premultipliedAlpha: !0
            });
            if (e) return e
        } catch(t) {}
        return null
    }
    function L(t, i, e) {
        X = void 0 === e ? .5 : e,
        o(t),
        n(i)
    }
    e(6);
    var M = e(0),
    E = e(8),
    A = r(E),
    I = e(1),
    x = r(I),
    w = e(3),
    O = r(w),
    D = e(2),
    R = (window.navigator.platform.toLowerCase(), new A.
default),
    b = !1,
    F = null,
    C = null,
    N = null,
    B = null,
    U = null,
    G = null,
    Y = !1,
    k = 0,
    V = 0,
    X = .5;
    window.loadlive2d = L
},
function(t, i, e) {
    "use strict"; (function(t) { !
        function() {
            function i() {
                At || (this._$MT = null, this._$5S = null, this._$NP = 0, i._$42++, this._$5S = new Y(this))
            }
            function e(t) {
                if (!At) {
                    this.clipContextList = new Array,
                    this.glcontext = t.gl,
                    this.dp_webgl = t,
                    this.curFrameNo = 0,
                    this.firstError_clipInNotUpdate = !0,
                    this.colorBuffer = 0,
                    this.isInitGLFBFunc = !1,
                    this.tmpBoundsOnModel = new S,
                    at.glContext.length > at.frameBuffers.length && (this.curFrameNo = this.getMaskRenderTexture()),
                    this.tmpModelToViewMatrix = new R,
                    this.tmpMatrix2 = new R,
                    this.tmpMatrixForMask = new R,
                    this.tmpMatrixForDraw = new R,
                    this.CHANNEL_COLORS = new Array;
                    var i = new A;
                    i = new A,
                    i.r = 0,
                    i.g = 0,
                    i.b = 0,
                    i.a = 1,
                    this.CHANNEL_COLORS.push(i),
                    i = new A,
                    i.r = 1,
                    i.g = 0,
                    i.b = 0,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i),
                    i = new A,
                    i.r = 0,
                    i.g = 1,
                    i.b = 0,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i),
                    i = new A,
                    i.r = 0,
                    i.g = 0,
                    i.b = 1,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i);
                    for (var e = 0; e < this.CHANNEL_COLORS.length; e++) this.dp_webgl.setChannelFlagAsColor(e, this.CHANNEL_COLORS[e])
                }
            }
            function r(t, i, e) {
                this.clipIDList = new Array,
                this.clipIDList = e,
                this.clippingMaskDrawIndexList = new Array;
                for (var r = 0; r < e.length; r++) this.clippingMaskDrawIndexList.push(i.getDrawDataIndex(e[r]));
                this.clippedDrawContextList = new Array,
                this.isUsing = !0,
                this.layoutChannelNo = 0,
                this.layoutBounds = new S,
                this.allClippedDrawRect = new S,
                this.matrixForMask = new Float32Array(16),
                this.matrixForDraw = new Float32Array(16),
                this.owner = t
            }
            function o(t, i) {
                this._$gP = t,
                this.drawDataIndex = i
            }
            function n() {
                At || (this.color = null)
            }
            function s() {
                At || (this._$dP = null, this._$eo = null, this._$V0 = null, this._$dP = 1e3, this._$eo = 1e3, this._$V0 = 1, this._$a0())
            }
            function _() {}
            function a() {
                this._$r = null,
                this._$0S = null
            }
            function h() {
                At || (this.x = null, this.y = null, this.width = null, this.height = null)
            }
            function l(t) {
                At || et.prototype.constructor.call(this, t)
            }
            function $() {}
            function u(t) {
                At || et.prototype.constructor.call(this, t)
            }
            function p() {
                At || (this._$vo = null, this._$F2 = null, this._$ao = 400, this._$1S = 400, p._$42++)
            }
            function f() {
                At || (this.p1 = new c, this.p2 = new c, this._$Fo = 0, this._$Db = 0, this._$L2 = 0, this._$M2 = 0, this._$ks = 0, this._$9b = 0, this._$iP = 0, this._$iT = 0, this._$lL = new Array, this._$qP = new Array, this.setup(.3, .5, .1))
            }
            function c() {
                this._$p = 1,
                this.x = 0,
                this.y = 0,
                this.vx = 0,
                this.vy = 0,
                this.ax = 0,
                this.ay = 0,
                this.fx = 0,
                this.fy = 0,
                this._$s0 = 0,
                this._$70 = 0,
                this._$7L = 0,
                this._$HL = 0
            }
            function d(t, i, e) {
                this._$wL = null,
                this.scale = null,
                this._$V0 = null,
                this._$wL = t,
                this.scale = i,
                this._$V0 = e
            }
            function g(t, i, e, r) {
                d.prototype.constructor.call(this, i, e, r),
                this._$tL = null,
                this._$tL = t
            }
            function y(t, i, e) {
                this._$wL = null,
                this.scale = null,
                this._$V0 = null,
                this._$wL = t,
                this.scale = i,
                this._$V0 = e
            }
            function T(t, i, e, r) {
                y.prototype.constructor.call(this, i, e, r),
                this._$YP = null,
                this._$YP = t
            }
            function P() {
                At || (this._$fL = 0, this._$gL = 0, this._$B0 = 1, this._$z0 = 1, this._$qT = 0, this.reflectX = !1, this.reflectY = !1)
            }
            function S() {
                At || (this.x = null, this.y = null, this.width = null, this.height = null)
            }
            function v() {}
            function L() {
                At || (this.x = null, this.y = null)
            }
            function M() {
                At || (this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null, this.clipID = null, this.clipIDList = new Array)
            }
            function E() {
                At || (this._$Eb = E._$ps, this._$lT = 1, this._$C0 = 1, this._$tT = 1, this._$WL = 1, this.culling = !1, this.matrix4x4 = new Float32Array(16), this.premultipliedAlpha = !1, this.anisotropy = 0, this.clippingProcess = E.CLIPPING_PROCESS_NONE, this.clipBufPre_clipContextMask = null, this.clipBufPre_clipContextDraw = null, this.CHANNEL_COLORS = new Array)
            }
            function A() {
                At || (this.a = 1, this.r = 1, this.g = 1, this.b = 1, this.scale = 1, this._$ho = 1, this.blendMode = at.L2D_COLOR_BLEND_MODE_MULT)
            }
            function I() {
                At || (this._$kP = null, this._$dr = null, this._$Ai = !0, this._$mS = null)
            }
            function x() {}
            function w() {
                At || (this._$VP = 0, this._$wL = null, this._$GP = null, this._$8o = w._$ds, this._$2r = -1, this._$O2 = 0, this._$ri = 0)
            }
            function O() {}
            function D() {
                At || (this._$Ob = null)
            }
            function R() {
                this.m = new Float32Array(16),
                this.identity()
            }
            function b(t) {
                At || et.prototype.constructor.call(this, t)
            }
            function F() {
                At || (this._$7 = 1, this._$f = 0, this._$H = 0, this._$g = 1, this._$k = 0, this._$w = 0, this._$hi = STATE_IDENTITY, this._$Z = _$pS)
            }
            function C() {
                At || (s.prototype.constructor.call(this), this.motions = new Array, this._$7r = null, this._$7r = C._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !0, this.loopFadeIn = !0, this._$AS = -1, _$a0())
            }
            function N() {
                this._$P = new Float32Array(100),
                this.size = 0
            }
            function B() {
                this._$4P = null,
                this._$I0 = null,
                this._$RP = null
            }
            function U() {}
            function G() {}
            function Y(t) {
                At || (this._$QT = !0, this._$co = -1, this._$qo = 0, this._$pb = new Array(Y._$is), this._$_2 = new Float32Array(Y._$is), this._$vr = new Float32Array(Y._$is), this._$Rr = new Float32Array(Y._$is), this._$Or = new Float32Array(Y._$is), this._$fs = new Float32Array(Y._$is), this._$Js = new Array(Y._$is), this._$3S = new Array, this._$aS = new Array, this._$Bo = null, this._$F2 = new Array, this._$db = new Array, this._$8b = new Array, this._$Hr = new Array, this._$Ws = null, this._$Vs = null, this._$Er = null, this._$Es = new Int16Array(U._$Qb), this._$ZP = new Float32Array(2 * U._$1r), this._$Ri = t, this._$b0 = Y._$HP++, this.clipManager = null, this.dp_webgl = null)
            }
            function k() {}
            function V() {
                At || (this._$12 = null, this._$bb = null, this._$_L = null, this._$jo = null, this._$iL = null, this._$0L = null, this._$Br = null, this._$Dr = null, this._$Cb = null, this._$mr = null, this._$_L = xt.STATE_FIRST, this._$Br = 4e3, this._$Dr = 100, this._$Cb = 50, this._$mr = 150, this._$jo = !0, this._$iL = "PARAM_EYE_L_OPEN", this._$0L = "PARAM_EYE_R_OPEN")
            }
            function X() {
                At || (E.prototype.constructor.call(this), this._$sb = new Int32Array(X._$As), this._$U2 = new Array, this.transform = null, this.gl = null, null == X._$NT && (X._$NT = X._$9r(256), X._$vS = X._$9r(256), X._$no = X._$vb(256)))
            }
            function z() {
                At || (I.prototype.constructor.call(this), this._$GS = null, this._$Y0 = null)
            }
            function H(t) {
                _t.prototype.constructor.call(this, t),
                this._$8r = I._$ur,
                this._$Yr = null,
                this._$Wr = null
            }
            function W() {
                At || (M.prototype.constructor.call(this), this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null)
            }
            function j() {
                At || (this._$NL = null, this._$3S = null, this._$aS = null, j._$42++)
            }
            function q() {
                At || (i.prototype.constructor.call(this), this._$zo = new X)
            }
            function J() {
                At || (s.prototype.constructor.call(this), this.motions = new Array, this._$o2 = null, this._$7r = J._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !1, this.loopFadeIn = !0, this._$rr = -1, this._$eP = 0)
            }
            function Q(t, i) {
                return String.fromCharCode(t.getUint8(i))
            }
            function N() {
                this._$P = new Float32Array(100),
                this.size = 0
            }
            function B() {
                this._$4P = null,
                this._$I0 = null,
                this._$RP = null
            }
            function Z() {
                At || (I.prototype.constructor.call(this), this._$o = 0, this._$A = 0, this._$GS = null, this._$Eo = null)
            }
            function K(t) {
                _t.prototype.constructor.call(this, t),
                this._$8r = I._$ur,
                this._$Cr = null,
                this._$hr = null
            }
            function tt() {
                At || (this.visible = !0, this._$g0 = !1, this._$NL = null, this._$3S = null, this._$aS = null, tt._$42++)
            }
            function it(t) {
                this._$VS = null,
                this._$e0 = null,
                this._$e0 = t
            }
            function et(t) {
                At || (this.id = t)
            }
            function rt() {}
            function ot() {
                At || (this._$4S = null)
            }
            function nt(t, i) {
                this.canvas = t,
                this.context = i,
                this.viewport = new Array(0, 0, t.width, t.height),
                this._$6r = 1,
                this._$xP = 0,
                this._$3r = 1,
                this._$uP = 0,
                this._$Qo = -1,
                this.cacheImages = {}
            }
            function st() {
                At || (this._$TT = null, this._$LT = null, this._$FS = null, this._$wL = null)
            }
            function _t(t) {
                At || (this._$e0 = null, this._$IP = null, this._$JS = !1, this._$AT = !0, this._$e0 = t, this.totalScale = 1, this._$7s = 1, this.totalOpacity = 1)
            }
            function at() {}
            function ht() {}
            function lt(t) {
                At || (this._$ib = t)
            }
            function $t() {
                At || (W.prototype.constructor.call(this), this._$LP = -1, this._$d0 = 0, this._$Yo = 0, this._$JP = null, this._$5P = null, this._$BP = null, this._$Eo = null, this._$Qi = null, this._$6s = $t._$ms, this.culling = !0, this.gl_cacheImage = null, this.instanceNo = $t._$42++)
            }
            function ut(t) {
                Mt.prototype.constructor.call(this, t),
                this._$8r = W._$ur,
                this._$Cr = null,
                this._$hr = null
            }
            function pt() {
                At || (this.x = null, this.y = null)
            }
            function ft(t) {
                At || (i.prototype.constructor.call(this), this.drawParamWebGL = new mt(t), this.drawParamWebGL.setGL(at.getGL(t)))
            }
            function ct() {
                At || (this.motions = null, this._$eb = !1, this.motions = new Array)
            }
            function dt() {
                this._$w0 = null,
                this._$AT = !0,
                this._$9L = !1,
                this._$z2 = -1,
                this._$bs = -1,
                this._$Do = -1,
                this._$sr = null,
                this._$sr = dt._$Gs++
            }
            function gt() {
                this.m = new Array(1, 0, 0, 0, 1, 0, 0, 0, 1)
            }
            function yt(t) {
                At || et.prototype.constructor.call(this, t)
            }
            function mt(t) {
                At || (E.prototype.constructor.call(this), this.textures = new Array, this.transform = null, this.gl = null, this.glno = t, this.firstDraw = !0, this.anisotropyExt = null, this.maxAnisotropy = 0, this._$As = 32, this._$Gr = !1, this._$NT = null, this._$vS = null, this._$no = null, this.vertShader = null, this.fragShader = null, this.vertShaderOff = null, this.fragShaderOff = null)
            }
            function Tt(t, i, e) {
                return null == i && (i = t.createBuffer()),
                t.bindBuffer(t.ARRAY_BUFFER, i),
                t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW),
                i
            }
            function Pt(t, i, e) {
                return null == i && (i = t.createBuffer()),
                t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, i),
                t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.DYNAMIC_DRAW),
                i
            }
            function St(t) {
                At || (this._$P = new Int8Array(8), this._$R0 = new DataView(this._$P.buffer), this._$3i = new Int8Array(1e3), this._$hL = 0, this._$v0 = 0, this._$S2 = 0, this._$Ko = new Array, this._$T = t, this._$F = 0)
            }
            function vt() {}
            function Lt() {}
            function Mt(t) {
                At || (this._$e0 = null, this._$IP = null, this._$Us = null, this._$7s = null, this._$IS = [!1], this._$VS = null, this._$AT = !0, this.baseOpacity = 1, this.clipBufPre_clipContext = null, this._$e0 = t)
            }
            function Et() {}
            var At = !0;
            i._$0s = 1,
            i._$4s = 2,
            i._$42 = 0,
            i._$62 = function(t, e) {
                try {
                    if (e instanceof ArrayBuffer && (e = new DataView(e)), !(e instanceof DataView)) throw new lt("_$SS#loadModel(b) / b _$x be DataView or ArrayBuffer");
                    var r, o = new St(e),
                    n = o._$ST(),
                    s = o._$ST(),
                    a = o._$ST();
                    if (109 != n || 111 != s || 99 != a) throw new lt("_$gi _$C _$li , _$Q0 _$P0.");
                    if (r = o._$ST(), o._$gr(r), r > G._$T7) {
                        t._$NP |= i._$4s;
                        throw new lt("_$gi _$C _$li , _$n0 _$_ version _$li ( SDK : " + G._$T7 + " < _$f0 : " + r + " )@_$SS#loadModel()\n")
                    }
                    var h = o._$nP();
                    if (r >= G._$s7) {
                        var l = o._$9T(),
                        $ = o._$9T();
                        if ( - 30584 != l || -30584 != $) throw t._$NP |= i._$0s,
                        new lt("_$gi _$C _$li , _$0 _$6 _$Ui.")
                    }
                    t._$KS(h);
                    var u = t.getModelContext();
                    u.setDrawParam(t.getDrawParam()),
                    u.init()
                } catch(t) {
                    _._$Rb(t)
                }
            },
            i.prototype._$KS = function(t) {
                this._$MT = t
            },
            i.prototype.getModelImpl = function() {
                return null == this._$MT && (this._$MT = new p, this._$MT._$zP()),
                this._$MT
            },
            i.prototype.getCanvasWidth = function() {
                return null == this._$MT ? 0 : this._$MT.getCanvasWidth()
            },
            i.prototype.getCanvasHeight = function() {
                return null == this._$MT ? 0 : this._$MT.getCanvasHeight()
            },
            i.prototype.getParamFloat = function(t) {
                return "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))),
                this._$5S.getParamFloat(t)
            },
            i.prototype.setParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 - e) + i * e)
            },
            i.prototype.addToParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) + i * e)
            },
            i.prototype.multParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 + (i - 1) * e))
            },
            i.prototype.getParamIndex = function(t) {
                return this._$5S.getParamIndex(u.getID(t))
            },
            i.prototype.loadParam = function() {
                this._$5S.loadParam()
            },
            i.prototype.saveParam = function() {
                this._$5S.saveParam()
            },
            i.prototype.init = function() {
                this._$5S.init()
            },
            i.prototype.update = function() {
                this._$5S.update()
            },
            i.prototype._$Rs = function() {
                return _._$li("_$60 _$PT _$Rs()"),
                -1
            },
            i.prototype._$Ds = function(t) {
                _._$li("_$60 _$PT _$SS#_$Ds() \n")
            },
            i.prototype._$K2 = function() {},
            i.prototype.draw = function() {},
            i.prototype.getModelContext = function() {
                return this._$5S
            },
            i.prototype._$s2 = function() {
                return this._$NP
            },
            i.prototype._$P7 = function(t, i, e, r) {
                var o = -1,
                n = 0,
                s = this;
                if (0 != e) if (1 == t.length) {
                    var _ = t[0],
                    a = 0 != s.getParamFloat(_),
                    h = i[0],
                    l = s.getPartsOpacity(h),
                    $ = e / r;
                    a ? (l += $) > 1 && (l = 1) : (l -= $) < 0 && (l = 0),
                    s.setPartsOpacity(h, l)
                } else {
                    for (var u = 0; u < t.length; u++) {
                        var _ = t[u],
                        p = 0 != s.getParamFloat(_);
                        if (p) {
                            if (o >= 0) break;
                            o = u;
                            var h = i[u];
                            n = s.getPartsOpacity(h),
                            n += e / r,
                            n > 1 && (n = 1)
                        }
                    }
                    o < 0 && (console.log("No _$wi _$q0/ _$U default[%s]", t[0]), o = 0, n = 1, s.loadParam(), s.setParamFloat(t[o], n), s.saveParam());
                    for (var u = 0; u < t.length; u++) {
                        var h = i[u];
                        if (o == u) s.setPartsOpacity(h, n);
                        else {
                            var f, c = s.getPartsOpacity(h);
                            f = n < .5 ? -.5 * n / .5 + 1 : .5 * (1 - n) / .5;
                            var d = (1 - f) * (1 - n);
                            d > .15 && (f = 1 - .15 / (1 - n)),
                            c > f && (c = f),
                            s.setPartsOpacity(h, c)
                        }
                    }
                } else for (var u = 0; u < t.length; u++) {
                    var _ = t[u],
                    h = i[u],
                    p = 0 != s.getParamFloat(_);
                    s.setPartsOpacity(h, p ? 1 : 0)
                }
            },
            i.prototype.setPartsOpacity = function(t, i) {
                "number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))),
                this._$5S.setPartsOpacity(t, i)
            },
            i.prototype.getPartsDataIndex = function(t) {
                return t instanceof l || (t = l.getID(t)),
                this._$5S.getPartsDataIndex(t)
            },
            i.prototype.getPartsOpacity = function(t) {
                return "number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))),
                t < 0 ? 0 : this._$5S.getPartsOpacity(t)
            },
            i.prototype.getDrawParam = function() {},
            i.prototype.getDrawDataIndex = function(t) {
                return this._$5S.getDrawDataIndex(b.getID(t))
            },
            i.prototype.getDrawData = function(t) {
                return this._$5S.getDrawData(t)
            },
            i.prototype.getTransformedPoints = function(t) {
                var i = this._$5S._$C2(t);
                return i instanceof ut ? i.getTransformedPoints() : null
            },
            i.prototype.getIndexArray = function(t) {
                if (t < 0 || t >= this._$5S._$aS.length) return null;
                var i = this._$5S._$aS[t];
                return null != i && i.getType() == W._$wb && i instanceof $t ? i.getIndexArray() : null
            },
            e.CHANNEL_COUNT = 4,
            e.RENDER_TEXTURE_USE_MIPMAP = !1,
            e.NOT_USED_FRAME = -100,
            e.prototype._$L7 = function() {
                if (this.tmpModelToViewMatrix && (this.tmpModelToViewMatrix = null), this.tmpMatrix2 && (this.tmpMatrix2 = null), this.tmpMatrixForMask && (this.tmpMatrixForMask = null), this.tmpMatrixForDraw && (this.tmpMatrixForDraw = null), this.tmpBoundsOnModel && (this.tmpBoundsOnModel = null), this.CHANNEL_COLORS) {
                    for (var t = this.CHANNEL_COLORS.length - 1; t >= 0; --t) this.CHANNEL_COLORS.splice(t, 1);
                    this.CHANNEL_COLORS = []
                }
                this.releaseShader()
            },
            e.prototype.releaseShader = function() {
                for (var t = at.frameBuffers.length,
                i = 0; i < t; i++) this.gl.deleteFramebuffer(at.frameBuffers[i].framebuffer);
                at.frameBuffers = [],
                at.glContext = []
            },
            e.prototype.init = function(t, i, e) {
                for (var o = 0; o < i.length; o++) {
                    var n = i[o].getClipIDList();
                    if (null != n) {
                        var s = this.findSameClip(n);
                        null == s && (s = new r(this, t, n), this.clipContextList.push(s));
                        var _ = i[o].getDrawDataID(),
                        a = t.getDrawDataIndex(_);
                        s.addClippedDrawData(_, a);
                        e[o].clipBufPre_clipContext = s
                    }
                }
            },
            e.prototype.getMaskRenderTexture = function() {
                var t = null;
                return t = this.dp_webgl.createFramebuffer(),
                at.frameBuffers[this.dp_webgl.glno] = t,
                this.dp_webgl.glno
            },
            e.prototype.setupClip = function(t, i) {
                for (var e = 0,
                r = 0; r < this.clipContextList.length; r++) {
                    var o = this.clipContextList[r];
                    this.calcClippedDrawTotalBounds(t, o),
                    o.isUsing && e++
                }
                if (e > 0) {
                    var n = i.gl.getParameter(i.gl.FRAMEBUFFER_BINDING),
                    s = new Array(4);
                    s[0] = 0,
                    s[1] = 0,
                    s[2] = i.gl.canvas.width,
                    s[3] = i.gl.canvas.height,
                    i.gl.viewport(0, 0, at.clippingMaskBufferSize, at.clippingMaskBufferSize),
                    this.setupLayoutBounds(e),
                    i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, at.frameBuffers[this.curFrameNo].framebuffer),
                    i.gl.clearColor(0, 0, 0, 0),
                    i.gl.clear(i.gl.COLOR_BUFFER_BIT);
                    for (var r = 0; r < this.clipContextList.length; r++) {
                        var o = this.clipContextList[r],
                        _ = o.allClippedDrawRect,
                        a = (o.layoutChannelNo, o.layoutBounds);
                        this.tmpBoundsOnModel._$jL(_),
                        this.tmpBoundsOnModel.expand(.05 * _.width, .05 * _.height);
                        var h = a.width / this.tmpBoundsOnModel.width,
                        l = a.height / this.tmpBoundsOnModel.height;
                        this.tmpMatrix2.identity(),
                        this.tmpMatrix2.translate( - 1, -1, 0),
                        this.tmpMatrix2.scale(2, 2, 1),
                        this.tmpMatrix2.translate(a.x, a.y, 0),
                        this.tmpMatrix2.scale(h, l, 1),
                        this.tmpMatrix2.translate( - this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0),
                        this.tmpMatrixForMask.setMatrix(this.tmpMatrix2.m),
                        this.tmpMatrix2.identity(),
                        this.tmpMatrix2.translate(a.x, a.y, 0),
                        this.tmpMatrix2.scale(h, l, 1),
                        this.tmpMatrix2.translate( - this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0),
                        this.tmpMatrixForDraw.setMatrix(this.tmpMatrix2.m);
                        for (var $ = this.tmpMatrixForMask.getArray(), u = 0; u < 16; u++) o.matrixForMask[u] = $[u];
                        for (var p = this.tmpMatrixForDraw.getArray(), u = 0; u < 16; u++) o.matrixForDraw[u] = p[u];
                        for (var f = o.clippingMaskDrawIndexList.length,
                        c = 0; c < f; c++) {
                            var d = o.clippingMaskDrawIndexList[c],
                            g = t.getDrawData(d),
                            y = t._$C2(d);
                            i.setClipBufPre_clipContextForMask(o),
                            g.draw(i, t, y)
                        }
                    }
                    i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, n),
                    i.setClipBufPre_clipContextForMask(null),
                    i.gl.viewport(s[0], s[1], s[2], s[3])
                }
            },
            e.prototype.getColorBuffer = function() {
                return this.colorBuffer
            },
            e.prototype.findSameClip = function(t) {
                for (var i = 0; i < this.clipContextList.length; i++) {
                    var e = this.clipContextList[i],
                    r = e.clipIDList.length;
                    if (r == t.length) {
                        for (var o = 0,
                        n = 0; n < r; n++) for (var s = e.clipIDList[n], _ = 0; _ < r; _++) if (t[_] == s) {
                            o++;
                            break
                        }
                        if (o == r) return e
                    }
                }
                return null
            },
            e.prototype.calcClippedDrawTotalBounds = function(t, i) {
                for (var e = t._$Ri.getModelImpl().getCanvasWidth(), r = t._$Ri.getModelImpl().getCanvasHeight(), o = e > r ? e: r, n = o, s = o, _ = 0, a = 0, h = i.clippedDrawContextList.length, l = 0; l < h; l++) {
                    var $ = i.clippedDrawContextList[l],
                    u = $.drawDataIndex,
                    p = t._$C2(u);
                    if (p._$yo()) {
                        for (var f = p.getTransformedPoints(), c = f.length, d = [], g = [], y = 0, m = U._$i2; m < c; m += U._$No) d[y] = f[m],
                        g[y] = f[m + 1],
                        y++;
                        var T = Math.min.apply(null, d),
                        P = Math.min.apply(null, g),
                        S = Math.max.apply(null, d),
                        v = Math.max.apply(null, g);
                        T < n && (n = T),
                        P < s && (s = P),
                        S > _ && (_ = S),
                        v > a && (a = v)
                    }
                }
                if (n == o) i.allClippedDrawRect.x = 0,
                i.allClippedDrawRect.y = 0,
                i.allClippedDrawRect.width = 0,
                i.allClippedDrawRect.height = 0,
                i.isUsing = !1;
                else {
                    var L = _ - n,
                    M = a - s;
                    i.allClippedDrawRect.x = n,
                    i.allClippedDrawRect.y = s,
                    i.allClippedDrawRect.width = L,
                    i.allClippedDrawRect.height = M,
                    i.isUsing = !0
                }
            },
            e.prototype.setupLayoutBounds = function(t) {
                var i = t / e.CHANNEL_COUNT,
                r = t % e.CHANNEL_COUNT;
                i = ~~i,
                r = ~~r;
                for (var o = 0,
                n = 0; n < e.CHANNEL_COUNT; n++) {
                    var s = i + (n < r ? 1 : 0);
                    if (0 == s);
                    else if (1 == s) {
                        var a = this.clipContextList[o++];
                        a.layoutChannelNo = n,
                        a.layoutBounds.x = 0,
                        a.layoutBounds.y = 0,
                        a.layoutBounds.width = 1,
                        a.layoutBounds.height = 1
                    } else if (2 == s) for (var h = 0; h < s; h++) {
                        var l = h % 2,
                        $ = 0;
                        l = ~~l;
                        var a = this.clipContextList[o++];
                        a.layoutChannelNo = n,
                        a.layoutBounds.x = .5 * l,
                        a.layoutBounds.y = 0,
                        a.layoutBounds.width = .5,
                        a.layoutBounds.height = 1
                    } else if (s <= 4) for (var h = 0; h < s; h++) {
                        var l = h % 2,
                        $ = h / 2;
                        l = ~~l,
                        $ = ~~$;
                        var a = this.clipContextList[o++];
                        a.layoutChannelNo = n,
                        a.layoutBounds.x = .5 * l,
                        a.layoutBounds.y = .5 * $,
                        a.layoutBounds.width = .5,
                        a.layoutBounds.height = .5
                    } else if (s <= 9) for (var h = 0; h < s; h++) {
                        var l = h % 3,
                        $ = h / 3;
                        l = ~~l,
                        $ = ~~$;
                        var a = this.clipContextList[o++];
                        a.layoutChannelNo = n,
                        a.layoutBounds.x = l / 3,
                        a.layoutBounds.y = $ / 3,
                        a.layoutBounds.width = 1 / 3,
                        a.layoutBounds.height = 1 / 3
                    } else _._$li("_$6 _$0P mask count : %d", s)
                }
            },
            r.prototype.addClippedDrawData = function(t, i) {
                var e = new o(t, i);
                this.clippedDrawContextList.push(e)
            },
            s._$JT = function(t, i, e) {
                var r = t / i,
                o = e / i,
                n = o,
                s = 1 - (1 - o) * (1 - o),
                _ = 1 - (1 - n) * (1 - n),
                a = 1 / 3 * (1 - o) * s + (n * (2 / 3) + 1 / 3 * (1 - n)) * (1 - s),
                h = (n + 2 / 3 * (1 - n)) * _ + (o * (1 / 3) + 2 / 3 * (1 - o)) * (1 - _),
                l = 1 - 3 * h + 3 * a - 0,
                $ = 3 * h - 6 * a + 0,
                u = 3 * a - 0;
                if (r <= 0) return 0;
                if (r >= 1) return 1;
                var p = r,
                f = p * p;
                return l * (p * f) + $ * f + u * p + 0
            },
            s.prototype._$a0 = function() {},
            s.prototype.setFadeIn = function(t) {
                this._$dP = t
            },
            s.prototype.setFadeOut = function(t) {
                this._$eo = t
            },
            s.prototype._$pT = function(t) {
                this._$V0 = t
            },
            s.prototype.getFadeOut = function() {
                return this._$eo
            },
            s.prototype._$4T = function() {
                return this._$eo
            },
            s.prototype._$mT = function() {
                return this._$V0
            },
            s.prototype.getDurationMSec = function() {
                return - 1
            },
            s.prototype.getLoopDurationMSec = function() {
                return - 1
            },
            s.prototype.updateParam = function(t, i) {
                if (i._$AT && !i._$9L) {
                    var e = x.getUserTimeMSec();
                    if (i._$z2 < 0) {
                        i._$z2 = e,
                        i._$bs = e;
                        var r = this.getDurationMSec();
                        i._$Do < 0 && (i._$Do = r <= 0 ? -1 : i._$z2 + r)
                    }
                    var o = this._$V0;
                    o = o * (0 == this._$dP ? 1 : ht._$r2((e - i._$bs) / this._$dP)) * (0 == this._$eo || i._$Do < 0 ? 1 : ht._$r2((i._$Do - e) / this._$eo)),
                    0 <= o && o <= 1 || console.log("### assert!! ### "),
                    this.updateParamExe(t, e, o, i),
                    i._$Do > 0 && i._$Do < e && (i._$9L = !0)
                }
            },
            s.prototype.updateParamExe = function(t, i, e, r) {},
            _._$8s = 0,
            _._$fT = new Object,
            _.start = function(t) {
                var i = _._$fT[t];
                null == i && (i = new a, i._$r = t, _._$fT[t] = i),
                i._$0S = x.getSystemTimeMSec()
            },
            _.dump = function(t) {
                var i = _._$fT[t];
                if (null != i) {
                    var e = x.getSystemTimeMSec(),
                    r = e - i._$0S;
                    return console.log(t + " : " + r + "ms"),
                    r
                }
                return - 1
            },
            _.end = function(t) {
                var i = _._$fT[t];
                if (null != i) {
                    return x.getSystemTimeMSec() - i._$0S
                }
                return - 1
            },
            _._$li = function(t, i) {
                console.log("_$li : " + t + "\n", i)
            },
            _._$Ji = function(t, i) {
                console.log(t, i)
            },
            _._$dL = function(t, i) {
                console.log(t, i),
                console.log("\n")
            },
            _._$KL = function(t, i) {
                for (var e = 0; e < i; e++) e % 16 == 0 && e > 0 ? console.log("\n") : e % 8 == 0 && e > 0 && console.log("  "),
                console.log("%02X ", 255 & t[e]);
                console.log("\n")
            },
            _._$nr = function(t, i, e) {
                console.log("%s\n", t);
                for (var r = i.length,
                o = 0; o < r; ++o) console.log("%5d", i[o]),
                console.log("%s\n", e),
                console.log(",");
                console.log("\n")
            },
            _._$Rb = function(t) {
                console.log("dump exception : " + t),
                console.log("stack :: " + t.stack)
            },
            h.prototype._$8P = function() {
                return.5 * (this.x + this.x + this.width)
            },
            h.prototype._$6P = function() {
                return.5 * (this.y + this.y + this.height)
            },
            h.prototype._$EL = function() {
                return this.x + this.width
            },
            h.prototype._$5T = function() {
                return this.y + this.height
            },
            h.prototype._$jL = function(t, i, e, r) {
                this.x = t,
                this.y = i,
                this.width = e,
                this.height = r
            },
            h.prototype._$jL = function(t) {
                this.x = t.x,
                this.y = t.y,
                this.width = t.width,
                this.height = t.height
            },
            l.prototype = new et,
            l._$tP = new Object,
            l._$27 = function() {
                l._$tP.clear()
            },
            l.getID = function(t) {
                var i = l._$tP[t];
                return null == i && (i = new l(t), l._$tP[t] = i),
                i
            },
            l.prototype._$3s = function() {
                return new l
            },
            u.prototype = new et,
            u._$tP = new Object,
            u._$27 = function() {
                u._$tP.clear()
            },
            u.getID = function(t) {
                var i = u._$tP[t];
                return null == i && (i = new u(t), u._$tP[t] = i),
                i
            },
            u.prototype._$3s = function() {
                return new u
            },
            p._$42 = 0,
            p.prototype._$zP = function() {
                null == this._$vo && (this._$vo = new ot),
                null == this._$F2 && (this._$F2 = new Array)
            },
            p.prototype.getCanvasWidth = function() {
                return this._$ao
            },
            p.prototype.getCanvasHeight = function() {
                return this._$1S
            },
            p.prototype._$F0 = function(t) {
                this._$vo = t._$nP(),
                this._$F2 = t._$nP(),
                this._$ao = t._$6L(),
                this._$1S = t._$6L()
            },
            p.prototype._$6S = function(t) {
                this._$F2.push(t)
            },
            p.prototype._$Xr = function() {
                return this._$F2
            },
            p.prototype._$E2 = function() {
                return this._$vo
            },
            f.prototype.setup = function(t, i, e) {
                this._$ks = this._$Yb(),
                this.p2._$xT(),
                3 == arguments.length && (this._$Fo = t, this._$L2 = i, this.p1._$p = e, this.p2._$p = e, this.p2.y = t, this.setup())
            },
            f.prototype.getPhysicsPoint1 = function() {
                return this.p1
            },
            f.prototype.getPhysicsPoint2 = function() {
                return this.p2
            },
            f.prototype._$qr = function() {
                return this._$Db
            },
            f.prototype._$pr = function(t) {
                this._$Db = t
            },
            f.prototype._$5r = function() {
                return this._$M2
            },
            f.prototype._$Cs = function() {
                return this._$9b
            },
            f.prototype._$Yb = function() {
                return - 180 * Math.atan2(this.p1.x - this.p2.x, -(this.p1.y - this.p2.y)) / Math.PI
            },
            f.prototype.addSrcParam = function(t, i, e, r) {
                var o = new g(t, i, e, r);
                this._$lL.push(o)
            },
            f.prototype.addTargetParam = function(t, i, e, r) {
                var o = new T(t, i, e, r);
                this._$qP.push(o)
            },
            f.prototype.update = function(t, i) {
                if (0 == this._$iP) return this._$iP = this._$iT = i,
                void(this._$Fo = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y)));
                var e = (i - this._$iT) / 1e3;
                if (0 != e) {
                    for (var r = this._$lL.length - 1; r >= 0; --r) {
                        this._$lL[r]._$oP(t, this)
                    }
                    this._$oo(t, e),
                    this._$M2 = this._$Yb(),
                    this._$9b = (this._$M2 - this._$ks) / e,
                    this._$ks = this._$M2
                }
                for (var r = this._$qP.length - 1; r >= 0; --r) {
                    this._$qP[r]._$YS(t, this)
                }
                this._$iT = i
            },
            f.prototype._$oo = function(t, i) {
                i < .033 && (i = .033);
                var e = 1 / i;
                this.p1.vx = (this.p1.x - this.p1._$s0) * e,
                this.p1.vy = (this.p1.y - this.p1._$70) * e,
                this.p1.ax = (this.p1.vx - this.p1._$7L) * e,
                this.p1.ay = (this.p1.vy - this.p1._$HL) * e,
                this.p1.fx = this.p1.ax * this.p1._$p,
                this.p1.fy = this.p1.ay * this.p1._$p,
                this.p1._$xT();
                var r, o, n = -Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x),
                s = Math.cos(n),
                _ = Math.sin(n),
                a = 9.8 * this.p2._$p,
                h = this._$Db * Lt._$bS,
                l = a * Math.cos(n - h);
                r = l * _,
                o = l * s;
                var $ = -this.p1.fx * _ * _,
                u = -this.p1.fy * _ * s,
                p = -this.p2.vx * this._$L2,
                f = -this.p2.vy * this._$L2;
                this.p2.fx = r + $ + p,
                this.p2.fy = o + u + f,
                this.p2.ax = this.p2.fx / this.p2._$p,
                this.p2.ay = this.p2.fy / this.p2._$p,
                this.p2.vx += this.p2.ax * i,
                this.p2.vy += this.p2.ay * i,
                this.p2.x += this.p2.vx * i,
                this.p2.y += this.p2.vy * i;
                var c = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
                this.p2.x = this.p1.x + this._$Fo * (this.p2.x - this.p1.x) / c,
                this.p2.y = this.p1.y + this._$Fo * (this.p2.y - this.p1.y) / c,
                this.p2.vx = (this.p2.x - this.p2._$s0) * e,
                this.p2.vy = (this.p2.y - this.p2._$70) * e,
                this.p2._$xT()
            },
            c.prototype._$xT = function() {
                this._$s0 = this.x,
                this._$70 = this.y,
                this._$7L = this.vx,
                this._$HL = this.vy
            },
            d.prototype._$oP = function(t, i) {},
            g.prototype = new d,
            g.prototype._$oP = function(t, i) {
                var e = this.scale * t.getParamFloat(this._$wL),
                r = i.getPhysicsPoint1();
                switch (this._$tL) {
                default:
                case f.Src.SRC_TO_X:
                    r.x = r.x + (e - r.x) * this._$V0;
                    break;
                case f.Src.SRC_TO_Y:
                    r.y = r.y + (e - r.y) * this._$V0;
                    break;
                case f.Src.SRC_TO_G_ANGLE:
                    var o = i._$qr();
                    o += (e - o) * this._$V0,
                    i._$pr(o)
                }
            },
            y.prototype._$YS = function(t, i) {},
            T.prototype = new y,
            T.prototype._$YS = function(t, i) {
                switch (this._$YP) {
                default:
                case f.Target.TARGET_FROM_ANGLE:
                    t.setParamFloat(this._$wL, this.scale * i._$5r(), this._$V0);
                    break;
                case f.Target.TARGET_FROM_ANGLE_V:
                    t.setParamFloat(this._$wL, this.scale * i._$Cs(), this._$V0)
                }
            },
            f.Src = function() {},
            f.Src.SRC_TO_X = "SRC_TO_X",
            f.Src.SRC_TO_Y = "SRC_TO_Y",
            f.Src.SRC_TO_G_ANGLE = "SRC_TO_G_ANGLE",
            f.Target = function() {},
            f.Target.TARGET_FROM_ANGLE = "TARGET_FROM_ANGLE",
            f.Target.TARGET_FROM_ANGLE_V = "TARGET_FROM_ANGLE_V",
            P.prototype.init = function(t) {
                this._$fL = t._$fL,
                this._$gL = t._$gL,
                this._$B0 = t._$B0,
                this._$z0 = t._$z0,
                this._$qT = t._$qT,
                this.reflectX = t.reflectX,
                this.reflectY = t.reflectY
            },
            P.prototype._$F0 = function(t) {
                this._$fL = t._$_T(),
                this._$gL = t._$_T(),
                this._$B0 = t._$_T(),
                this._$z0 = t._$_T(),
                this._$qT = t._$_T(),
                t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this.reflectX = t._$po(), this.reflectY = t._$po())
            },
            P.prototype._$e = function() {};
            var It = function() {};
            It._$ni = function(t, i, e, r, o, n, s, _, a) {
                var h = s * n - _ * o;
                if (0 == h) return null;
                var l, $ = ((t - e) * n - (i - r) * o) / h;
                return l = 0 != o ? (t - e - $ * s) / o: (i - r - $ * _) / n,
                isNaN(l) && (l = (t - e - $ * s) / o, isNaN(l) && (l = (i - r - $ * _) / n), isNaN(l) && (console.log("a is NaN @UtVector#_$ni() "), console.log("v1x : " + o), console.log("v1x != 0 ? " + (0 != o)))),
                null == a ? new Array(l, $) : (a[0] = l, a[1] = $, a)
            },
            S.prototype._$8P = function() {
                return this.x + .5 * this.width
            },
            S.prototype._$6P = function() {
                return this.y + .5 * this.height
            },
            S.prototype._$EL = function() {
                return this.x + this.width
            },
            S.prototype._$5T = function() {
                return this.y + this.height
            },
            S.prototype._$jL = function(t, i, e, r) {
                this.x = t,
                this.y = i,
                this.width = e,
                this.height = r
            },
            S.prototype._$jL = function(t) {
                this.x = t.x,
                this.y = t.y,
                this.width = t.width,
                this.height = t.height
            },
            S.prototype.contains = function(t, i) {
                return this.x <= this.x && this.y <= this.y && this.x <= this.x + this.width && this.y <= this.y + this.height
            },
            S.prototype.expand = function(t, i) {
                this.x -= t,
                this.y -= i,
                this.width += 2 * t,
                this.height += 2 * i
            },
            v._$Z2 = function(t, i, e, r) {
                var o = i._$Q2(t, e),
                n = t._$vs(),
                s = t._$Tr();
                if (i._$zr(n, s, o), o <= 0) return r[n[0]];
                if (1 == o) {
                    var _ = r[n[0]],
                    a = r[n[1]],
                    h = s[0];
                    return _ + (a - _) * h | 0
                }
                if (2 == o) {
                    var _ = r[n[0]],
                    a = r[n[1]],
                    l = r[n[2]],
                    $ = r[n[3]],
                    h = s[0],
                    u = s[1],
                    p = _ + (a - _) * h | 0,
                    f = l + ($ - l) * h | 0;
                    return p + (f - p) * u | 0
                }
                if (3 == o) {
                    var c = r[n[0]],
                    d = r[n[1]],
                    g = r[n[2]],
                    y = r[n[3]],
                    m = r[n[4]],
                    T = r[n[5]],
                    P = r[n[6]],
                    S = r[n[7]],
                    h = s[0],
                    u = s[1],
                    v = s[2],
                    _ = c + (d - c) * h | 0,
                    a = g + (y - g) * h | 0,
                    l = m + (T - m) * h | 0,
                    $ = P + (S - P) * h | 0,
                    p = _ + (a - _) * u | 0,
                    f = l + ($ - l) * u | 0;
                    return p + (f - p) * v | 0
                }
                if (4 == o) {
                    var L = r[n[0]],
                    M = r[n[1]],
                    E = r[n[2]],
                    A = r[n[3]],
                    I = r[n[4]],
                    x = r[n[5]],
                    w = r[n[6]],
                    O = r[n[7]],
                    D = r[n[8]],
                    R = r[n[9]],
                    b = r[n[10]],
                    F = r[n[11]],
                    C = r[n[12]],
                    N = r[n[13]],
                    B = r[n[14]],
                    U = r[n[15]],
                    h = s[0],
                    u = s[1],
                    v = s[2],
                    G = s[3],
                    c = L + (M - L) * h | 0,
                    d = E + (A - E) * h | 0,
                    g = I + (x - I) * h | 0,
                    y = w + (O - w) * h | 0,
                    m = D + (R - D) * h | 0,
                    T = b + (F - b) * h | 0,
                    P = C + (N - C) * h | 0,
                    S = B + (U - B) * h | 0,
                    _ = c + (d - c) * u | 0,
                    a = g + (y - g) * u | 0,
                    l = m + (T - m) * u | 0,
                    $ = P + (S - P) * u | 0,
                    p = _ + (a - _) * v | 0,
                    f = l + ($ - l) * v | 0;
                    return p + (f - p) * G | 0
                }
                for (var Y = 1 << o,
                k = new Float32Array(Y), V = 0; V < Y; V++) {
                    for (var X = V,
                    z = 1,
                    H = 0; H < o; H++) z *= X % 2 == 0 ? 1 - s[H] : s[H],
                    X /= 2;
                    k[V] = z
                }
                for (var W = new Float32Array(Y), j = 0; j < Y; j++) W[j] = r[n[j]];
                for (var q = 0,
                j = 0; j < Y; j++) q += k[j] * W[j];
                return q + .5 | 0
            },
            v._$br = function(t, i, e, r) {
                var o = i._$Q2(t, e),
                n = t._$vs(),
                s = t._$Tr();
                if (i._$zr(n, s, o), o <= 0) return r[n[0]];
                if (1 == o) {
                    var _ = r[n[0]],
                    a = r[n[1]],
                    h = s[0];
                    return _ + (a - _) * h
                }
                if (2 == o) {
                    var _ = r[n[0]],
                    a = r[n[1]],
                    l = r[n[2]],
                    $ = r[n[3]],
                    h = s[0],
                    u = s[1];
                    return (1 - u) * (_ + (a - _) * h) + u * (l + ($ - l) * h)
                }
                if (3 == o) {
                    var p = r[n[0]],
                    f = r[n[1]],
                    c = r[n[2]],
                    d = r[n[3]],
                    g = r[n[4]],
                    y = r[n[5]],
                    m = r[n[6]],
                    T = r[n[7]],
                    h = s[0],
                    u = s[1],
                    P = s[2];
                    return (1 - P) * ((1 - u) * (p + (f - p) * h) + u * (c + (d - c) * h)) + P * ((1 - u) * (g + (y - g) * h) + u * (m + (T - m) * h))
                }
                if (4 == o) {
                    var S = r[n[0]],
                    v = r[n[1]],
                    L = r[n[2]],
                    M = r[n[3]],
                    E = r[n[4]],
                    A = r[n[5]],
                    I = r[n[6]],
                    x = r[n[7]],
                    w = r[n[8]],
                    O = r[n[9]],
                    D = r[n[10]],
                    R = r[n[11]],
                    b = r[n[12]],
                    F = r[n[13]],
                    C = r[n[14]],
                    N = r[n[15]],
                    h = s[0],
                    u = s[1],
                    P = s[2],
                    B = s[3];
                    return (1 - B) * ((1 - P) * ((1 - u) * (S + (v - S) * h) + u * (L + (M - L) * h)) + P * ((1 - u) * (E + (A - E) * h) + u * (I + (x - I) * h))) + B * ((1 - P) * ((1 - u) * (w + (O - w) * h) + u * (D + (R - D) * h)) + P * ((1 - u) * (b + (F - b) * h) + u * (C + (N - C) * h)))
                }
                for (var U = 1 << o,
                G = new Float32Array(U), Y = 0; Y < U; Y++) {
                    for (var k = Y,
                    V = 1,
                    X = 0; X < o; X++) V *= k % 2 == 0 ? 1 - s[X] : s[X],
                    k /= 2;
                    G[Y] = V
                }
                for (var z = new Float32Array(U), H = 0; H < U; H++) z[H] = r[n[H]];
                for (var W = 0,
                H = 0; H < U; H++) W += G[H] * z[H];
                return W
            },
            v._$Vr = function(t, i, e, r, o, n, s, _) {
                var a = i._$Q2(t, e),
                h = t._$vs(),
                l = t._$Tr();
                i._$zr(h, l, a);
                var $ = 2 * r,
                u = s;
                if (a <= 0) {
                    var p = h[0],
                    f = o[p];
                    if (2 == _ && 0 == s) x._$jT(f, 0, n, 0, $);
                    else for (var c = 0; c < $;) n[u] = f[c++],
                    n[u + 1] = f[c++],
                    u += _
                } else if (1 == a) for (var f = o[h[0]], d = o[h[1]], g = l[0], y = 1 - g, c = 0; c < $;) n[u] = f[c] * y + d[c] * g,
                ++c,
                n[u + 1] = f[c] * y + d[c] * g,
                ++c,
                u += _;
                else if (2 == a) for (var f = o[h[0]], d = o[h[1]], m = o[h[2]], T = o[h[3]], g = l[0], P = l[1], y = 1 - g, S = 1 - P, v = S * y, L = S * g, M = P * y, E = P * g, c = 0; c < $;) n[u] = v * f[c] + L * d[c] + M * m[c] + E * T[c],
                ++c,
                n[u + 1] = v * f[c] + L * d[c] + M * m[c] + E * T[c],
                ++c,
                u += _;
                else if (3 == a) for (var A = o[h[0]], I = o[h[1]], w = o[h[2]], O = o[h[3]], D = o[h[4]], R = o[h[5]], b = o[h[6]], F = o[h[7]], g = l[0], P = l[1], C = l[2], y = 1 - g, S = 1 - P, N = 1 - C, B = N * S * y, U = N * S * g, G = N * P * y, Y = N * P * g, k = C * S * y, V = C * S * g, X = C * P * y, z = C * P * g, c = 0; c < $;) n[u] = B * A[c] + U * I[c] + G * w[c] + Y * O[c] + k * D[c] + V * R[c] + X * b[c] + z * F[c],
                ++c,
                n[u + 1] = B * A[c] + U * I[c] + G * w[c] + Y * O[c] + k * D[c] + V * R[c] + X * b[c] + z * F[c],
                ++c,
                u += _;
                else if (4 == a) for (var H = o[h[0]], W = o[h[1]], j = o[h[2]], q = o[h[3]], J = o[h[4]], Q = o[h[5]], Z = o[h[6]], K = o[h[7]], tt = o[h[8]], it = o[h[9]], et = o[h[10]], rt = o[h[11]], ot = o[h[12]], nt = o[h[13]], st = o[h[14]], _t = o[h[15]], g = l[0], P = l[1], C = l[2], at = l[3], y = 1 - g, S = 1 - P, N = 1 - C, ht = 1 - at, lt = ht * N * S * y, $t = ht * N * S * g, ut = ht * N * P * y, pt = ht * N * P * g, ft = ht * C * S * y, ct = ht * C * S * g, dt = ht * C * P * y, gt = ht * C * P * g, yt = at * N * S * y, mt = at * N * S * g, Tt = at * N * P * y, Pt = at * N * P * g, St = at * C * S * y, vt = at * C * S * g, Lt = at * C * P * y, Mt = at * C * P * g, c = 0; c < $;) n[u] = lt * H[c] + $t * W[c] + ut * j[c] + pt * q[c] + ft * J[c] + ct * Q[c] + dt * Z[c] + gt * K[c] + yt * tt[c] + mt * it[c] + Tt * et[c] + Pt * rt[c] + St * ot[c] + vt * nt[c] + Lt * st[c] + Mt * _t[c],
                ++c,
                n[u + 1] = lt * H[c] + $t * W[c] + ut * j[c] + pt * q[c] + ft * J[c] + ct * Q[c] + dt * Z[c] + gt * K[c] + yt * tt[c] + mt * it[c] + Tt * et[c] + Pt * rt[c] + St * ot[c] + vt * nt[c] + Lt * st[c] + Mt * _t[c],
                ++c,
                u += _;
                else {
                    for (var Et = 1 << a,
                    At = new Float32Array(Et), It = 0; It < Et; It++) {
                        for (var xt = It,
                        wt = 1,
                        Ot = 0; Ot < a; Ot++) wt *= xt % 2 == 0 ? 1 - l[Ot] : l[Ot],
                        xt /= 2;
                        At[It] = wt
                    }
                    for (var Dt = new Float32Array(Et), Rt = 0; Rt < Et; Rt++) Dt[Rt] = o[h[Rt]];
                    for (var c = 0; c < $;) {
                        for (var bt = 0,
                        Ft = 0,
                        Ct = c + 1,
                        Rt = 0; Rt < Et; Rt++) bt += At[Rt] * Dt[Rt][c],
                        Ft += At[Rt] * Dt[Rt][Ct];
                        c += 2,
                        n[u] = bt,
                        n[u + 1] = Ft,
                        u += _
                    }
                }
            },
            L.prototype._$HT = function(t, i) {
                this.x = t,
                this.y = i
            },
            L.prototype._$HT = function(t) {
                this.x = t.x,
                this.y = t.y
            },
            M._$ur = -2,
            M._$ES = 500,
            M._$wb = 2,
            M._$8S = 3,
            M._$52 = M._$ES,
            M._$R2 = M._$ES,
            M._$or = function() {
                return M._$52
            },
            M._$Pr = function() {
                return M._$R2
            },
            M.prototype.convertClipIDForV2_11 = function(t) {
                var i = [];
                return null == t ? null: 0 == t.length ? null: /,/.test(t) ? i = t.id.split(",") : (i.push(t.id), i)
            },
            M.prototype._$F0 = function(t) {
                this._$gP = t._$nP(),
                this._$dr = t._$nP(),
                this._$GS = t._$nP(),
                this._$qb = t._$6L(),
                this._$Lb = t._$cS(),
                this._$mS = t._$Tb(),
                t.getFormatVersion() >= G._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = [],
                this._$MS(this._$Lb)
            },
            M.prototype.getClipIDList = function() {
                return this.clipIDList
            },
            M.prototype.init = function(t) {},
            M.prototype._$Nr = function(t, i) {
                if (i._$IS[0] = !1, i._$Us = v._$Z2(t, this._$GS, i._$IS, this._$Lb), at._$Zs);
                else if (i._$IS[0]) return;
                i._$7s = v._$br(t, this._$GS, i._$IS, this._$mS)
            },
            M.prototype._$2b = function(t, i) {},
            M.prototype.getDrawDataID = function() {
                return this._$gP
            },
            M.prototype._$j2 = function(t) {
                this._$gP = t
            },
            M.prototype.getOpacity = function(t, i) {
                return i._$7s
            },
            M.prototype._$zS = function(t, i) {
                return i._$Us
            },
            M.prototype._$MS = function(t) {
                for (var i = t.length - 1; i >= 0; --i) {
                    var e = t[i];
                    e < M._$52 ? M._$52 = e: e > M._$R2 && (M._$R2 = e)
                }
            },
            M.prototype.getTargetBaseDataID = function() {
                return this._$dr
            },
            M.prototype._$gs = function(t) {
                this._$dr = t
            },
            M.prototype._$32 = function() {
                return null != this._$dr && this._$dr != yt._$2o()
            },
            M.prototype.preDraw = function(t, i, e) {},
            M.prototype.draw = function(t, i, e) {},
            M.prototype.getType = function() {},
            M.prototype._$B2 = function(t, i, e) {},
            E._$ps = 32,
            E.CLIPPING_PROCESS_NONE = 0,
            E.CLIPPING_PROCESS_OVERWRITE_ALPHA = 1,
            E.CLIPPING_PROCESS_MULTIPLY_ALPHA = 2,
            E.CLIPPING_PROCESS_DRAW = 3,
            E.CLIPPING_PROCESS_CLEAR_ALPHA = 4,
            E.prototype.setChannelFlagAsColor = function(t, i) {
                this.CHANNEL_COLORS[t] = i
            },
            E.prototype.getChannelFlagAsColor = function(t) {
                return this.CHANNEL_COLORS[t]
            },
            E.prototype._$ZT = function() {},
            E.prototype._$Uo = function(t, i, e, r, o, n, s) {},
            E.prototype._$Rs = function() {
                return - 1
            },
            E.prototype._$Ds = function(t) {},
            E.prototype.setBaseColor = function(t, i, e, r) {
                t < 0 ? t = 0 : t > 1 && (t = 1),
                i < 0 ? i = 0 : i > 1 && (i = 1),
                e < 0 ? e = 0 : e > 1 && (e = 1),
                r < 0 ? r = 0 : r > 1 && (r = 1),
                this._$lT = t,
                this._$C0 = i,
                this._$tT = e,
                this._$WL = r
            },
            E.prototype._$WP = function(t) {
                this.culling = t
            },
            E.prototype.setMatrix = function(t) {
                for (var i = 0; i < 16; i++) this.matrix4x4[i] = t[i]
            },
            E.prototype._$IT = function() {
                return this.matrix4x4
            },
            E.prototype.setPremultipliedAlpha = function(t) {
                this.premultipliedAlpha = t
            },
            E.prototype.isPremultipliedAlpha = function() {
                return this.premultipliedAlpha
            },
            E.prototype.setAnisotropy = function(t) {
                this.anisotropy = t
            },
            E.prototype.getAnisotropy = function() {
                return this.anisotropy
            },
            E.prototype.getClippingProcess = function() {
                return this.clippingProcess
            },
            E.prototype.setClippingProcess = function(t) {
                this.clippingProcess = t
            },
            E.prototype.setClipBufPre_clipContextForMask = function(t) {
                this.clipBufPre_clipContextMask = t
            },
            E.prototype.getClipBufPre_clipContextMask = function() {
                return this.clipBufPre_clipContextMask
            },
            E.prototype.setClipBufPre_clipContextForDraw = function(t) {
                this.clipBufPre_clipContextDraw = t
            },
            E.prototype.getClipBufPre_clipContextDraw = function() {
                return this.clipBufPre_clipContextDraw
            },
            I._$ur = -2,
            I._$c2 = 1,
            I._$_b = 2,
            I.prototype._$F0 = function(t) {
                this._$kP = t._$nP(),
                this._$dr = t._$nP()
            },
            I.prototype.readV2_opacity = function(t) {
                t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this._$mS = t._$Tb())
            },
            I.prototype.init = function(t) {},
            I.prototype._$Nr = function(t, i) {},
            I.prototype.interpolateOpacity = function(t, i, e, r) {
                null == this._$mS ? e.setInterpolatedOpacity(1) : e.setInterpolatedOpacity(v._$br(t, i, r, this._$mS))
            },
            I.prototype._$2b = function(t, i) {},
            I.prototype._$nb = function(t, i, e, r, o, n, s) {},
            I.prototype.getType = function() {},
            I.prototype._$gs = function(t) {
                this._$dr = t
            },
            I.prototype._$a2 = function(t) {
                this._$kP = t
            },
            I.prototype.getTargetBaseDataID = function() {
                return this._$dr
            },
            I.prototype.getBaseDataID = function() {
                return this._$kP
            },
            I.prototype._$32 = function() {
                return null != this._$dr && this._$dr != yt._$2o()
            },
            x._$W2 = 0,
            x._$CS = x._$W2,
            x._$Mo = function() {
                return ! 0
            },
            x._$XP = function(t) {
                try {
                    for (var i = getTimeMSec(); getTimeMSec() - i < t;);
                } catch(t) {
                    t._$Rb()
                }
            },
            x.getUserTimeMSec = function() {
                return x._$CS == x._$W2 ? x.getSystemTimeMSec() : x._$CS
            },
            x.setUserTimeMSec = function(t) {
                x._$CS = t
            },
            x.updateUserTimeMSec = function() {
                return x._$CS = x.getSystemTimeMSec()
            },
            x.getTimeMSec = function() {
                return (new Date).getTime()
            },
            x.getSystemTimeMSec = function() {
                return (new Date).getTime()
            },
            x._$Q = function(t) {},
            x._$jT = function(t, i, e, r, o) {
                for (var n = 0; n < o; n++) e[r + n] = t[i + n]
            },
            w._$ds = -2,
            w.prototype._$F0 = function(t) {
                this._$wL = t._$nP(),
                this._$VP = t._$6L(),
                this._$GP = t._$nP()
            },
            w.prototype.getParamIndex = function(t) {
                return this._$2r != t && (this._$8o = w._$ds),
                this._$8o
            },
            w.prototype._$Pb = function(t, i) {
                this._$8o = t,
                this._$2r = i
            },
            w.prototype.getParamID = function() {
                return this._$wL
            },
            w.prototype._$yP = function(t) {
                this._$wL = t
            },
            w.prototype._$N2 = function() {
                return this._$VP
            },
            w.prototype._$d2 = function() {
                return this._$GP
            },
            w.prototype._$t2 = function(t, i) {
                this._$VP = t,
                this._$GP = i
            },
            w.prototype._$Lr = function() {
                return this._$O2
            },
            w.prototype._$wr = function(t) {
                this._$O2 = t
            },
            w.prototype._$SL = function() {
                return this._$ri
            },
            w.prototype._$AL = function(t) {
                this._$ri = t
            },
            O.startsWith = function(t, i, e) {
                var r = i + e.length;
                if (r >= t.length) return ! 1;
                for (var o = i; o < r; o++) if (O.getChar(t, o) != e.charAt(o - i)) return ! 1;
                return ! 0
            },
            O.getChar = function(t, i) {
                return String.fromCharCode(t.getUint8(i))
            },
            O.createString = function(t, i, e) {
                for (var r = new ArrayBuffer(2 * e), o = new Uint16Array(r), n = 0; n < e; n++) o[n] = t.getUint8(i + n);
                return String.fromCharCode.apply(null, o)
            },
            O._$LS = function(t, i, e, r) {
                t instanceof ArrayBuffer && (t = new DataView(t));
                var o = e,
                n = !1,
                s = !1,
                _ = 0,
                a = O.getChar(t, o);
                "-" == a && (n = !0, o++);
                for (var h = !1; o < i; o++) {
                    switch (a = O.getChar(t, o)) {
                    case "0":
                        _ *= 10;
                        break;
                    case "1":
                        _ = 10 * _ + 1;
                        break;
                    case "2":
                        _ = 10 * _ + 2;
                        break;
                    case "3":
                        _ = 10 * _ + 3;
                        break;
                    case "4":
                        _ = 10 * _ + 4;
                        break;
                    case "5":
                        _ = 10 * _ + 5;
                        break;
                    case "6":
                        _ = 10 * _ + 6;
                        break;
                    case "7":
                        _ = 10 * _ + 7;
                        break;
                    case "8":
                        _ = 10 * _ + 8;
                        break;
                    case "9":
                        _ = 10 * _ + 9;
                        break;
                    case ".":
                        s = !0,
                        o++,
                        h = !0;
                        break;
                    default:
                        h = !0
                    }
                    if (h) break
                }
                if (s) for (var l = .1,
                $ = !1; o < i; o++) {
                    switch (a = O.getChar(t, o)) {
                    case "0":
                        break;
                    case "1":
                        _ += 1 * l;
                        break;
                    case "2":
                        _ += 2 * l;
                        break;
                    case "3":
                        _ += 3 * l;
                        break;
                    case "4":
                        _ += 4 * l;
                        break;
                    case "5":
                        _ += 5 * l;
                        break;
                    case "6":
                        _ += 6 * l;
                        break;
                    case "7":
                        _ += 7 * l;
                        break;
                    case "8":
                        _ += 8 * l;
                        break;
                    case "9":
                        _ += 9 * l;
                        break;
                    default:
                        $ = !0
                    }
                    if (l *= .1, $) break
                }
                return n && (_ = -_),
                r[0] = o,
                _
            },
            D.prototype._$zP = function() {
                this._$Ob = new Array
            },
            D.prototype._$F0 = function(t) {
                this._$Ob = t._$nP()
            },
            D.prototype._$Ur = function(t) {
                if (t._$WS()) return ! 0;
                for (var i = t._$v2(), e = this._$Ob.length - 1; e >= 0; --e) {
                    var r = this._$Ob[e].getParamIndex(i);
                    if (r == w._$ds && (r = t.getParamIndex(this._$Ob[e].getParamID())), t._$Xb(r)) return ! 0
                }
                return ! 1
            },
            D.prototype._$Q2 = function(t, i) {
                for (var e, r, o = this._$Ob.length,
                n = t._$v2(), s = 0, _ = 0; _ < o; _++) {
                    var a = this._$Ob[_];
                    if (e = a.getParamIndex(n), e == w._$ds && (e = t.getParamIndex(a.getParamID()), a._$Pb(e, n)), e < 0) throw new Exception("err 23242 : " + a.getParamID());
                    var h = e < 0 ? 0 : t.getParamFloat(e);
                    r = a._$N2();
                    var l, $, u = a._$d2(),
                    p = -1,
                    f = 0;
                    if (r < 1);
                    else if (1 == r) l = u[0],
                    l - U._$J < h && h < l + U._$J ? (p = 0, f = 0) : (p = 0, i[0] = !0);
                    else if (l = u[0], h < l - U._$J) p = 0,
                    i[0] = !0;
                    else if (h < l + U._$J) p = 0;
                    else {
                        for (var c = !1,
                        d = 1; d < r; ++d) {
                            if ($ = u[d], h < $ + U._$J) {
                                $ - U._$J < h ? p = d: (p = d - 1, f = (h - l) / ($ - l), s++),
                                c = !0;
                                break
                            }
                            l = $
                        }
                        c || (p = r - 1, f = 0, i[0] = !0)
                    }
                    a._$wr(p),
                    a._$AL(f)
                }
                return s
            },
            D.prototype._$zr = function(t, i, e) {
                var r = 1 << e;
                r + 1 > U._$Qb && console.log("err 23245\n");
                for (var o = this._$Ob.length,
                n = 1,
                s = 1,
                _ = 0,
                a = 0; a < r; ++a) t[a] = 0;
                for (var h = 0; h < o; ++h) {
                    var l = this._$Ob[h];
                    if (0 == l._$SL()) {
                        var $ = l._$Lr() * n;
                        if ($ < 0 && at._$3T) throw new Exception("err 23246");
                        for (var a = 0; a < r; ++a) t[a] += $
                    } else {
                        for (var $ = n * l._$Lr(), u = n * (l._$Lr() + 1), a = 0; a < r; ++a) t[a] += (a / s | 0) % 2 == 0 ? $: u;
                        i[_++] = l._$SL(),
                        s *= 2
                    }
                    n *= l._$N2()
                }
                t[r] = 65535,
                i[_] = -1
            },
            D.prototype._$h2 = function(t, i, e) {
                for (var r = new Float32Array(i), o = 0; o < i; ++o) r[o] = e[o];
                var n = new w;
                n._$yP(t),
                n._$t2(i, r),
                this._$Ob.push(n)
            },
            D.prototype._$J2 = function(t) {
                for (var i = t,
                e = this._$Ob.length,
                r = 0; r < e; ++r) {
                    var o = this._$Ob[r],
                    n = o._$N2(),
                    s = i % o._$N2(),
                    _ = o._$d2()[s];
                    console.log("%s[%d]=%7.2f / ", o.getParamID(), s, _),
                    i /= n
                }
                console.log("\n")
            },
            D.prototype.getParamCount = function() {
                return this._$Ob.length
            },
            D.prototype._$zs = function() {
                return this._$Ob
            },
            R.prototype.identity = function() {
                for (var t = 0; t < 16; t++) this.m[t] = t % 5 == 0 ? 1 : 0
            },
            R.prototype.get