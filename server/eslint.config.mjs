import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/dist", "**/.eslintrc.cjs"],
  },
  ...compat.extends("eslint:recommended"),
  {
    plugins: {},

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {},

    rules: {
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],

      "arrow-spacing": [
        "error",
        {
          before: true,
          after: true,
        },
      ],

      "no-console": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": 0,
    },
  },
];
