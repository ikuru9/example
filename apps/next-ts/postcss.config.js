/** @type {import('postcss-load-config').Config} */
const Config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: { preset: "default" } } : {}),
  },
};

module.exports = Config;
