import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "public/_next/**",
    "public/_not-found/**",
    "public/*.html",
    "public/*.txt",
    "public/icon.svg",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
