import { g as getContext, a as store_get, b as attr_class, c as ensure_array_like, d as attr, f as stringify, e as escape_html, u as unsubscribe_stores, h as derived } from "../../../chunks/renderer.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import "clsx";
import { a as auth } from "../../../chunks/auth.svelte.js";
import "animejs";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    let sidebarOpen = false;
    const navItems = derived(() => [
      { to: "/admin", label: "Dashboard", icon: "bi-grid" },
      { to: "/admin/hero", label: "Hero", icon: "bi-film" },
      { to: "/admin/studios", label: "Studios", icon: "bi-camera" },
      { to: "/admin/news", label: "News", icon: "bi-newspaper" },
      { to: "/admin/team", label: "Team", icon: "bi-people" },
      ...auth.user?.role === "admin" ? [
        {
          to: "/admin/users",
          label: "Benutzer",
          icon: "bi-person-gear"
        }
      ] : []
    ]);
    function isActive(path) {
      if (path === "/admin") return store_get($$store_subs ??= {}, "$page", page).url.pathname === "/admin";
      return store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith(path);
    }
    if (store_get($$store_subs ??= {}, "$page", page).url.pathname === "/admin/login") {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="admin-shell flex"><aside${attr_class("admin-sidebar fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 md:translate-x-0", void 0, {
        "-translate-x-full": !sidebarOpen,
        "translate-x-0": sidebarOpen
      })}><div class="flex items-center gap-3 px-6 py-5" style="border-bottom: 1px solid rgba(255,255,255,0.08)"><span class="admin-sidebar-brand text-xl">Shutterverse</span> <span class="admin-sidebar-tag">Admin</span></div> <nav class="flex-1 py-6 px-3 space-y-1"><!--[-->`);
      const each_array = ensure_array_like(navItems());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<a${attr("href", item.to)}${attr_class("admin-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors", void 0, { "active": isActive(item.to) })}><i${attr_class(`bi ${stringify(item.icon)} text-base w-5 text-center`)}></i> ${escape_html(item.label)}</a>`);
      }
      $$renderer2.push(`<!--]--></nav> <div class="px-3 pb-6"><button class="admin-logout-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg"><i class="bi bi-box-arrow-left text-base w-5 text-center"></i> Abmelden</button></div></aside> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex-1 md:ml-64 flex flex-col min-h-screen"><header class="admin-topbar px-6 py-4 flex items-center gap-4 md:hidden"><button class="admin-icon-btn" aria-label="Menü umschalten"><i class="bi bi-list text-2xl"></i></button> <span class="admin-sidebar-brand">Admin Panel</span></header> <main class="flex-1 p-6"><!---->`);
      {
        $$renderer2.push(`<div>`);
        children($$renderer2);
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!----></main></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
