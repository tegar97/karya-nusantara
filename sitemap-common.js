const fs = require('fs');
const globby = require('globby');
const prettier = require("prettier");

const getDate = new Date().toISOString();

const DOMAIN = 'https://www.karyanusantara.co.id'
const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
    const pages = await globby([
      // include
      "./src/pages/*.tsx",
      // exclude
      "!./src/pages/_*.tsx"
    ]);
  
    const pagesSitemap = `
      ${pages
        .map(page => {
          const path = page
            .replace("./src/pages/", "")
            .replace(".tsx", "")
            .replace(/\/index/g, "");
          const routePath = path === "index" ? "" : path;
          return `
            <url>
              <loc>${DOMAIN}/${routePath}</loc>
              <lastmod>${getDate}</lastmod>
            </url>
          `;
        })
        .join("")}
    `;
  
    const generatedSitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      >
        ${pagesSitemap}
      </urlset>
    `;
  
    const formattedSitemap = [formatted(generatedSitemap)];
  
    fs.writeFileSync("./public/sitemap-common.xml", formattedSitemap, "utf8");
  })();