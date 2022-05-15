module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/lib/", "/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleNameMapper: {
    ".+\\.(scss|css)$": "<rootDir>/jest-addons/file-mock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest-addons/file-mock.js",
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["tsx"],
  resolver: "<rootDir>/jest-addons/resolver.js",
  roots: ["<rootDir>/src"],
};
