

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.kR9fNyGd.js","_app/immutable/chunks/Dk1VFUiB.js","_app/immutable/chunks/D1WA79gw.js","_app/immutable/chunks/5nkGW71_.js","_app/immutable/chunks/BKM9doyu.js"];
export const stylesheets = ["_app/immutable/assets/0.Dtf7YUsy.css"];
export const fonts = ["_app/immutable/assets/bootstrap-icons.mSm7cUeB.woff2","_app/immutable/assets/bootstrap-icons.BeopsB42.woff"];
