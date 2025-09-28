import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
  outDir: "../dist",
  rollupOptions: {
    input: {
      main: resolve(__dirname, "src/index.html"),
      cart: resolve(__dirname, "src/cart/index.html"),
      checkout: resolve(__dirname, "src/checkout/index.html"),
      product: resolve(__dirname, "src/product_pages/index.html"),
      product_listing: resolve(__dirname, "src/product_listing/index.html"),

      product_cedar: resolve(__dirname, "src/product_pages/cedar-ridge-rimrock-2.html"),
      product_marmot: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
      product_northface_alpine: resolve(__dirname, "src/product_pages/northface-alpine-3.html"),
      product_northface_talus: resolve(__dirname, "src/product_pages/northface-talus-4.html"),
    },
  },
},
});
