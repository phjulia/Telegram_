module.exports = (api) => {
  api.cache(false); //what does this do?
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "last 3 Chrome versions",
        },
      ],
      "@babel/preset-react",
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };
};
