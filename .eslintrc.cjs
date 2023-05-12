module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-explicit-any": "off", //关闭any警告提示
    "react-hooks/exhaustive-deps": "warn", //用于验证 useEffect 等 Hooks 的依赖项列表，防止陈旧的闭包陷阱
    "@typescript-eslint/no-non-null-assertion": "off" //允许使用非空断言
  }
};
