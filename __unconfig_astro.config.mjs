
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig } from 'astro/config';
import rehypeImg from "rehype-figure-for-img";
import remarkUnwrap from "remark-unwrap-images";
import rehypeWrap from "rehype-wrap-all"
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import rehypeRewrite from 'rehype-rewrite';


import mdx from "@astrojs/mdx";

// https://astro.build/config
const __unconfig_default =  defineConfig({
  
  integrations: [sitemap(), react(), mdx(
    {remarkPlugins: [remarkUnwrap],
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
      ]
    ],
    extendPlugins: 'astroDefaults'
    }
  )],
  site: "https://www.mushkhbat.com/"
});
if (typeof __unconfig_default === "function") __unconfig_default(...[]);export default __unconfig_data;