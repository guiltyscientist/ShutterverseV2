
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/admin/hero" | "/admin/login" | "/admin/news" | "/admin/studios" | "/admin/team" | "/admin/users";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/admin": Record<string, never>;
			"/admin/hero": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/admin/news": Record<string, never>;
			"/admin/studios": Record<string, never>;
			"/admin/team": Record<string, never>;
			"/admin/users": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/hero" | "/admin/login" | "/admin/news" | "/admin/studios" | "/admin/team" | "/admin/users";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/logos/BIG.png" | "/logos/ICON.png" | string & {};
	}
}