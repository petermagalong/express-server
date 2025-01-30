import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {languageOptions: { globals: globals.node},
        rules:{
            "indent": [
                "error",
                4
            ],
            "linebreak-style": [
                "error",
                "windows"
            ],
            "quotes": [
                "error",
                "double"
            ],
            "semi": [
                "error",
                "always"
            ],
            "no-multiple-empty-lines": [
                "off"
            ],
            "no-param-reassign": [
                "off"
            ],
            "default-param-last": [
                "off"
            ],
            "radix": [
                "off"
            ],
            "prefer-regex-literals": [
                "off"
            ]
        }},
    pluginJs.configs.recommended,
];