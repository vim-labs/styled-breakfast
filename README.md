# styled-breakfast

Adds bracketed breakpoints to styled-components.

```
import breakpoint from 'styled-breakfast'

const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1600,
};

import breakpoint, { getBreaks } from "./styled-breakfast";

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
```

## Examples

breakpoint('[sm, md]')
@media (min-width: 600px) and (max-width: 700px)

breakpoint('[sm, md)')
@media (min-width: 600px) and (max-width: 699.98px)

breakpoint('(sm, md]')
@media (min-width: 600.02px) and (max-width: 700px)

breakpoint('(sm, md)')
@media (min-width: 600.02px) and (max-width: 699.98px)

breakpoint('[sm, 100)')
@media (min-width: 600px) and (max-width: 99.98px)

breakpoint('[100,200]')
@media (min-width: 100px) and (max-width: 200px)

breakpoint("< sm")
@media (max-width: 599.98px)

breakpoint("< 100")
@media (max-width: 99.98px)

breakpoint("<= sm")
@media (max-width: 600px)

breakpoint("> sm")
@media (min-width: 600.02px)

breakpoint("> 100")
@media (min-width: 100.02px)

breakpoint(">= sm");
@media (min-width: 600px)
