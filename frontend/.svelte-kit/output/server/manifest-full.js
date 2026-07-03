export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","logos/BIG.png","logos/ICON.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.r7dJRgG9.js",app:"_app/immutable/entry/app.CIjdkmIa.js",imports:["_app/immutable/entry/start.r7dJRgG9.js","_app/immutable/chunks/BjY1Yf2p.js","_app/immutable/chunks/D1WA79gw.js","_app/immutable/chunks/BsBa6i9S.js","_app/immutable/chunks/CrDCbs5W.js","_app/immutable/entry/app.CIjdkmIa.js","_app/immutable/chunks/D1WA79gw.js","_app/immutable/chunks/DZ1CTYk6.js","_app/immutable/chunks/Dk1VFUiB.js","_app/immutable/chunks/CrDCbs5W.js","_app/immutable/chunks/_coCN-3T.js","_app/immutable/chunks/BKM9doyu.js","_app/immutable/chunks/DPKqNYV5.js","_app/immutable/chunks/p4SZs2L1.js","_app/immutable/chunks/DRnOUvSm.js","_app/immutable/chunks/BsBa6i9S.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/news",
				pattern: /^\/admin\/news\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/studios",
				pattern: /^\/admin\/studios\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/team",
				pattern: /^\/admin\/team\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
