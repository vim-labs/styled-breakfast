# styled-breakfast

Adds bracketed breakpoints to styled-components.

## Install

```bash
yarn add styled-breakfast

# Or

npm i styled-breakfast
```

## Usage

```javascript
import styled from "styled-components";
import breakpoint from "styled-breakfast";

const Expample = styled.div`
  width: 200px;
  height: 200px;
  background-color: red;

  ${breakpoint("> md")} {
    background-color: blue;
  }
`;

function Home() {
  return (
    <main>
      <Example>Styled-Breakfast</Example>
    </main>
  );
}
```

## Examples

```javascript
/* Theme */
...
breakpoints: {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1600,
}
...
```

**breakpoint('[sm, md]')**
`@media (min-width: 600px) and (max-width: 700px)`

**breakpoint('[sm, md)')**
`@media (min-width: 600px) and (max-width: 699.98px)`

**breakpoint('(sm, md]')**
`@media (min-width: 600.02px) and (max-width: 700px)`

**breakpoint('(sm, md)')**
`@media (min-width: 600.02px) and (max-width: 699.98px)`

**breakpoint('[sm, 100)')**
`@media (min-width: 600px) and (max-width: 99.98px)`

**breakpoint('[100,200]')**
`@media (min-width: 100px) and (max-width: 200px)`

**breakpoint("< sm")**
`@media (max-width: 599.98px)`

**breakpoint("< 100")**
`@media (max-width: 99.98px)`

**breakpoint("<= sm")**
`@media (max-width: 600px)`

**breakpoint("> sm")**
`@media (min-width: 600.02px)`

**breakpoint("> 100")**
`@media (min-width: 100.02px)`

**breakpoint(">= sm");**
`@media (min-width: 600px)`
