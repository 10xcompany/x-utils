import typescript from "rollup-plugin-typescript2";
import analyze from "rollup-plugin-analyzer";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    { file: "dist/index.js", format: "cjs" },
    { file: "dist/index.esm.js", format: "esm" },
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.build.json",
    }),
    analyze(),
    terser()
  ],
};
