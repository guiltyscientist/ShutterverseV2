

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DbrzUPIo.js","_app/immutable/chunks/B4PP2HJB.js","_app/immutable/chunks/DUa6H-zP.js","_app/immutable/chunks/e5rehb5n.js","_app/immutable/chunks/DGegomHV.js"];
export const stylesheets = ["_app/immutable/assets/0.CcKcl85e.css"];
export const fonts = ["_app/immutable/assets/bootstrap-icons.mSm7cUeB.woff2","_app/immutable/assets/bootstrap-icons.BeopsB42.woff"];
