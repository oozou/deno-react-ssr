// Unused code - try postcss and autoprefixer with no-check flag
// deno run css.ts

import postcss from "https://esm.sh/postcss";
import autoprefixer from "https://esm.sh/autoprefixer?no-check";
// import unescape from "https://esm.sh/lodash/unescape?no-check"

const css = (
  await postcss([autoprefixer])
    .process(
      `
    backdrop-filter: blur(5px);
    user-select: none;
`
    )
    .async()
).content;

console.log(css);
