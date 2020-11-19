const breakpoint = require("../");

const props = {
  theme: {
    breakpoints: {
      xs: 500,
      sm: 600,
      md: 700,
      lg: 800,
      xl: 900,
    },
  },
};

test("it should require a query", () => {
  // @ts-ignore
  const t = () => breakpoint();
  expect(t).toThrowError("Missing breakpoint query.");
});

test("it should require at least one break", () => {
  // @ts-ignore
  const t = () => breakpoint("(");
  expect(t).toThrowError("Invalid breaks.");
});

test("it should limit breaks to no more than 2 breakpoints", () => {
  // @ts-ignore
  const t = () => breakpoint("(sm,md,lg");
  expect(t).toThrowError("Invalid breaks.");
});

test("it should require at least one bracket", () => {
  // @ts-ignore
  const t = () => breakpoint("md");
  expect(t).toThrowError("Missing range.");
});

test("it should require 1-2 brackets", () => {
  // @ts-ignore
  const t = () => breakpoint("(md),lg]");
  expect(t).toThrowError("Invalid bracket.");
});

test("it should use default breakpoints if no theme", () => {
  const result = breakpoint("(sm, md)")(undefined);
  expect(result).toBe("@media (min-width: 768.02px) and (max-width: 991.98px)");
});

test("it should use theme if available", () => {
  const result = breakpoint("(sm, md)")(props);
  expect(result).toBe("@media (min-width: 600.02px) and (max-width: 699.98px)");
});

test("it should use an inclusive starting bracket", () => {
  const result = breakpoint("[sm, md)")(props);
  expect(result).toBe("@media (min-width: 600px) and (max-width: 699.98px)");
});

test("it should use an inclusive ending bracket", () => {
  const result = breakpoint("(sm, md]")(props);
  expect(result).toBe("@media (min-width: 600.02px) and (max-width: 700px)");
});

test("it should use an inclusive brackets", () => {
  const result = breakpoint("[sm, md]")(props);
  expect(result).toBe("@media (min-width: 600px) and (max-width: 700px)");
});

test("it should use a non breakpoint bracket value", () => {
  const result = breakpoint("[sm, 100)")(props);
  expect(result).toBe("@media (min-width: 600px) and (max-width: 99.98px)");
});

test("it should use non breakpoint bracket values", () => {
  const result = breakpoint("[100,200]")(props);
  expect(result).toBe("@media (min-width: 100px) and (max-width: 200px)");
});

test("it should use an exclusive max range query with a breakpoint name", () => {
  const result = breakpoint("< sm")(props);
  expect(result).toBe("@media (max-width: 599.98px)");
});

test("it should use an exclusive max range query", () => {
  const result = breakpoint("< 100")(props);
  expect(result).toBe("@media (max-width: 99.98px)");
});

test("it should use an inclusive max range query with a breakpoint name", () => {
  const result = breakpoint("<= sm")(props);
  expect(result).toBe("@media (max-width: 600px)");
});

test("it should use an exclusive min range query with a breakpoint name", () => {
  const result = breakpoint("> sm")(props);
  expect(result).toBe("@media (min-width: 600.02px)");
});

test("it should use an exclusive min range query", () => {
  const result = breakpoint("> 100")(props);
  expect(result).toBe("@media (min-width: 100.02px)");
});

test("it should use an inclusive min range query with a breakpoint name", () => {
  const result = breakpoint(">= sm")(props);
  expect(result).toBe("@media (min-width: 600px)");
});
