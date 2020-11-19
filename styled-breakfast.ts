type Theme = Record<string, unknown>;
type Props = { theme: Theme };

const epsilon = 0.02; // Used for exclusive bracketing.

/* Default breakpoints if not available from the theme provider. */
const defaultBreakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1600,
};

/* Validate brackets include one or two references. */
const isValidBracket = (...arrs) =>
  arrs.every(
    (arr) => arr.length && arr.length < 3 && arr.length == arrs[0].length
  );

const getIsExclusive = (b) => b === "(" || b === ")"; // Bracket excludes value.
const getIsMin = (b) => b === "[" || b === "("; // Min-width query.
const getIsGreater = (s) => s === ">";

const getBracket = (query: string): string[] =>
  query.replace(/[^\[\]()]/g, "").split(""); // Only {[,],(,)}

const getGtLt = (query: string): string[] =>
  query.replace(/[^><=]/g, "").split(""); // Only {<,>,=}

const getBreaks = (query: string): (string | number)[] =>
  query
    .replace(/[^0-9a-zA-Z ,]+/g, "") // Only breakpoint names.
    .split(/[ ,]/)
    .filter(Boolean)
    .map((name) => {
      const numericValue = Number(name);
      return isNaN(numericValue) ? name : numericValue;
    });

const getBreakpointValue = (name: string | number, theme: Theme): number => {
  const breakpoints = theme.breakpoints || defaultBreakpoints;
  const breakpointValue = breakpoints[name];
  if (!breakpointValue) throw new Error(`Breakpoint: "${name}" not found.`);

  return breakpointValue;
};

function breakpoint(query: string) {
  if (!query) throw new Error("Missing breakpoint query.");

  const breaks = getBreaks(query);
  if (!breaks.length || breaks.length > 2) throw new Error("Invalid breaks.");

  const bracket = getBracket(query);
  if (bracket.length) {
    if (!isValidBracket(bracket, breaks)) throw new Error("Invalid bracket.");

    return (props: Props): string => {
      const theme = props?.theme ?? {};
      const vals = breaks.map((name, idx) => {
        const val =
          typeof name === "number" ? name : getBreakpointValue(name, theme);
        if (!getIsExclusive(bracket[idx])) return val;

        return getIsMin(bracket[idx]) ? val + epsilon : val - epsilon;
      });

      return `@media (min-width: ${vals[0]}px) and (max-width: ${vals[1]}px)`;
    };
  }

  const gtlt = getGtLt(query);
  if (!gtlt.length) throw new Error("Missing range.");

  return (props: Props): string => {
    const theme = props?.theme ?? {};
    const isGt = getIsGreater(gtlt[0]);
    const vals = breaks.map((name) => {
      const val =
        typeof name === "number" ? name : getBreakpointValue(name, theme);
      if (gtlt.length === 2) return val;

      return isGt ? val + epsilon : val - epsilon;
    });

    return `@media (${isGt ? "min" : "max"}-width: ${vals[0]}px)`;
  };
}

export default breakpoint;
