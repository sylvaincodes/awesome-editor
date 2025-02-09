import typescript from "rollup-plugin-typescript2"
import postcss from "rollup-plugin-postcss"
import pkg from "./package.json"

const isDev = process.env.NODE_ENV === "development"

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript({
      typescript: require("typescript"),
      tsconfigOverride: {
        compilerOptions: {
          module: "esnext",
          moduleResolution: "node",
        },
      },
    }),
    postcss({
      extensions: [".css"],
    }),
  ],
}

