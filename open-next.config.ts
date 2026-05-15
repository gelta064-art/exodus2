import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// On Windows, OpenNext may incorrectly detect bun.lock and try to run 'bun run build'
// which fails if bun is not installed globally. Force it to use npm.
config.buildCommand = "npm run build";

export default config;

