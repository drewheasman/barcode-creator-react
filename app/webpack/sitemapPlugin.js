const { create } = require("xmlbuilder2");
const fs = require("fs");

const siteUri = "https://create-barcodes.com/";
const sitePaths = ["", "privacy-policy"];

function addUrl(urlset, loc) {
  urlset.ele("url").ele("loc").txt(`${loc}`);
}

module.exports = class SitemapPlugin {
  apply() {
    const root = create({ version: "1.0", encoding: "UTF-8" });

    const urlSet = root.ele("urlset", {
      xmlns: "https://www.sitemaps.org/schemas/sitemap/0.9",
    });

    for (const p in sitePaths) {
      addUrl(urlSet, `${siteUri}${sitePaths[p]}`);
    }

    const xml = root.end({ prettyPrint: true });

    fs.writeFileSync("./public/sitemap.xml", xml);
  }
};
