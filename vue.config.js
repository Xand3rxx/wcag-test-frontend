// import { defineConfig } from 'vite'
const { defineConfig } = require("@vue/cli-service");
const path = require("path");

// https://vitejs.dev/config/
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve(__dirname, "src"));
  },
  pluginOptions: {
    define: {
      __VARIABLE_NAME__: JSON.stringify(process.env.VUE_APP_VARIABLE_NAME) // Example usage for environment variables
    }
  },
});
