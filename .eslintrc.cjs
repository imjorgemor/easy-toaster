module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    "indent": "off",
    "@typescript-eslint/indent": [
        "error",
        4
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "space-before-function-paren": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "semi": "off",
    "@typescript-eslint/semi": [
        "error",
        "always",
        {
            "omitLastInOneLineBlock": true
        }
    ]
}

