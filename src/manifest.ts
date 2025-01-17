import packageJson from "../package.json";
import { ManifestType } from "@src/manifest-type";

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.displayName,
  version: packageJson.version,
  description: packageJson.description,
  background: { service_worker: "src/pages/background/index.js", type: "module" },
  action: {
    default_title: packageJson.displayName,
    default_popup: "src/pages/popup/index.html",
    default_icon: "near_logo.png",
  },
  icons: {
    "128": "near_logo.png",
  },
  content_scripts: [
    {
      matches: [
        "*://*.wallet.near.org/*"
      ],
      js: ["src/pages/content/index.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "assets/img/memes/*.png",
        "assets/img/protocols/*.png",
        "assets/png/*.png",
        "assets/png/*.chunk.png",
        "assets/img/memes/*.webp",
        "assets/img/protocols/*.webp",
        "assets/webp/*.webp",
        "assets/webp/*.chunk.webp",
        "near_logo.png",
      ],
      matches: ["<all_urls>"],
    },
  ],
  permissions: ["storage", "tabs", "alarms"],
};

export default manifest;
