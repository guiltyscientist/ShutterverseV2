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
		client: {start:"_app/immutable/entry/start.bjzKcWZn.js",app:"_app/immutable/entry/app.ZknFFxXe.js",imports:["_app/immutable/entry/start.bjzKcWZn.js","_app/immutable/chunks/BTgqm2qW.js","_app/immutable/chunks/DUa6H-zP.js","_app/immutable/chunks/Bl45AmXA.js","_app/immutable/chunks/ByFOxMH2.js","_app/immutable/entry/app.ZknFFxXe.js","_app/immutable/chunks/DUa6H-zP.js","_app/immutable/chunks/hwibb_Gj.js","_app/immutable/chunks/B4PP2HJB.js","_app/immutable/chunks/ByFOxMH2.js","_app/immutable/chunks/CPaM4Qjx.js","_app/immutable/chunks/DGegomHV.js","_app/immutable/chunks/Dmqvd42r.js","_app/immutable/chunks/Cpvm5ccL.js","_app/immutable/chunks/C0NAFWf6.js","_app/immutable/chunks/Bl45AmXA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js'))
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
				id: "/admin/hero",
				pattern: /^\/admin\/hero\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/news",
				pattern: /^\/admin\/news\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/studios",
				pattern: /^\/admin\/studios\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/team",
				pattern: /^\/admin\/team\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/users",
				pattern: /^\/admin\/users\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
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
