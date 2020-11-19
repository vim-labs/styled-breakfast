"use strict";
exports.__esModule = true;
var epsilon = 0.02; // Used for exclusive bracketing.
/* Default breakpoints if not available from the theme provider. */
var defaultBreakpoints = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1600
};
/* Validate brackets include one or two references. */
var isValidBracket = function () {
    var arrs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrs[_i] = arguments[_i];
    }
    return arrs.every(function (arr) { return arr.length && arr.length < 3 && arr.length == arrs[0].length; });
};
var getIsExclusive = function (b) { return b === "(" || b === ")"; }; // Bracket excludes value.
var getIsMin = function (b) { return b === "[" || b === "("; }; // Min-width query.
var getIsGreater = function (s) { return s === ">"; };
var getBracket = function (query) {
    return query.replace(/[^\[\]()]/g, "").split("");
}; // Only {[,],(,)}
var getGtLt = function (query) {
    return query.replace(/[^><=]/g, "").split("");
}; // Only {<,>,=}
var getBreaks = function (query) {
    return query
        .replace(/[^0-9a-zA-Z ,]+/g, "") // Only breakpoint names.
        .split(/[ ,]/)
        .filter(Boolean)
        .map(function (name) {
        var numericValue = Number(name);
        return isNaN(numericValue) ? name : numericValue;
    });
};
var getBreakpointValue = function (name, theme) {
    var breakpoints = theme.breakpoints || defaultBreakpoints;
    var breakpointValue = breakpoints[name];
    if (!breakpointValue)
        throw new Error("Breakpoint: \"" + name + "\" not found.");
    return breakpointValue;
};
function breakpoint(query) {
    if (!query)
        throw new Error("Missing breakpoint query.");
    var breaks = getBreaks(query);
    if (!breaks.length || breaks.length > 2)
        throw new Error("Invalid breaks.");
    var bracket = getBracket(query);
    if (bracket.length) {
        if (!isValidBracket(bracket, breaks))
            throw new Error("Invalid bracket.");
        return function (props) {
            var _a;
            var theme = (_a = props === null || props === void 0 ? void 0 : props.theme) !== null && _a !== void 0 ? _a : {};
            var vals = breaks.map(function (name, idx) {
                var val = typeof name === "number" ? name : getBreakpointValue(name, theme);
                if (!getIsExclusive(bracket[idx]))
                    return val;
                return getIsMin(bracket[idx]) ? val + epsilon : val - epsilon;
            });
            return "@media (min-width: " + vals[0] + "px) and (max-width: " + vals[1] + "px)";
        };
    }
    var gtlt = getGtLt(query);
    if (!gtlt.length)
        throw new Error("Missing range.");
    return function (props) {
        var _a;
        var theme = (_a = props === null || props === void 0 ? void 0 : props.theme) !== null && _a !== void 0 ? _a : {};
        var isGt = getIsGreater(gtlt[0]);
        var vals = breaks.map(function (name) {
            var val = typeof name === "number" ? name : getBreakpointValue(name, theme);
            if (gtlt.length === 2)
                return val;
            return isGt ? val + epsilon : val - epsilon;
        });
        return "@media (" + (isGt ? "min" : "max") + "-width: " + vals[0] + "px)";
    };
}
exports["default"] = breakpoint;
//# sourceMappingURL=styled-breakfast.js.map