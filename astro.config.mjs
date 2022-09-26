import { defineConfig } from 'astro/config';
import rehypeImg from "rehype-figure-for-img";
import remarkUnwrap from "remark-unwrap-images";
import rehypeWrap from "rehype-wrap-all"
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import rehypeRewrite from 'rehype-rewrite';


import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), react(), mdx(
    {remarkPlugins: {extends: [remarkUnwrap]},
      rehypePlugins: [rehypeImg,
      [rehypeWrap, {
        selector: 'table',
        wrapper: 'figure'
      }],
      [rehypeWrap, {
        selector: 'img[src$="#blur"]',
        wrapper: 'picture#blur'
      }],
      [rehypeRewrite, {
          rewrite: (node) => {
            if(node.tagName == 'img'){
              Object.assign(node.properties, {
                hight: '720',
                width: '1280'
              })
            }
          }
        }
      ]]
    }
  )],
  site: "https://www.mushkhbat.com/"
});