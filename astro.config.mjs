import { defineConfig } from 'astro/config';
import rehypeImg from "rehype-figure-for-img";
import remarkUnwrap from "remark-unwrap-images";
import rehypeWrap from "rehype-wrap-all"
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import rehypeRewrite from 'rehype-rewrite';
import remarkToc from 'remark-toc'

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  
  integrations: [sitemap(), react(), mdx(
    {remarkPlugins: [[remarkUnwrap], 
      [remarkToc, {
        tight: true, 
        ordered: false,
        heading: "محتوى الصفحة",
        parents: ['root', 'listItem'],
      }]],
      rehypePlugins: [rehypeImg,
      [rehypeWrap, {
        selector: 'table',
        wrapper: 'figure.table'
      }],
      [rehypeWrap, {
        selector: 'img[src$="#blur"]',
        wrapper: 'picture#blur'
      }],
      [rehypeRewrite, {
          rewrite: (node) => {
            if(node.tagName == 'img'){
              Object.assign(node.properties, {
                height: '720',
                width: '1280'
              })
            }
          }
        }
      ],
    ],
    extendPlugins: 'astroDefaults'
    }
  )],
  site: "https://www.mushkhbat.com/"
});