const path = require("path");

module.exports = {
  babel: {
    plugins: [
      process.env.NODE_ENV === 'production' && 'transform-remove-console',
    ].filter(Boolean),
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
