import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

const resolve = (dir) =>  require('path').join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': resolve('src'), 
    },
  },

});
