import { j as head, b as attr_class, c as ensure_array_like, d as attr, e as escape_html, f as stringify } from "../../../chunks/renderer.js";
import "../../../chunks/client.js";
import { a as auth } from "../../../chunks/auth.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const statCards = [
      {
        label: "Hero",
        to: "/admin/hero",
        icon: "bi-film",
        count: 0,
        loading: true
      },
      {
        label: "Studios",
        to: "/admin/studios",
        icon: "bi-camera",
        count: 0,
        loading: true
      },
      {
        label: "News",
        to: "/admin/news",
        icon: "bi-newspaper",
        count: 0,
        loading: true
      },
      {
        label: "Team",
        to: "/admin/team",
        icon: "bi-people",
        count: 0,
        loading: true
      }
    ];
    head("1jef3w8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dashboard – Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="mb-8"><h1 class="admin-page-title text-2xl">Dashboard</h1> <p class="admin-page-sub mt-1">Übersicht über alle Inhalte</p></div> <div${attr_class("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", void 0, { "xl:grid-cols-5": auth.user?.role === "admin" })}><!--[-->`);
    const each_array = ensure_array_like(statCards);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let card = each_array[$$index];
      $$renderer2.push(`<a${attr("href", card.to)} class="admin-card admin-stat-card rounded-xl p-6 transition-colors group block"><div class="flex items-center justify-between mb-3"><span class="admin-page-sub" style="font-size: 13px; letter-spacing: 0.04em;">${escape_html(card.label)}</span> <i${attr_class(`bi ${stringify(card.icon)} text-lg`)} style="color: var(--neon-cyan)"></i></div> <div class="admin-page-title text-3xl">`);
      if (card.loading) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span style="color: var(--ink-2)" class="text-xl">…</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`${escape_html(card.count)}`);
      }
      $$renderer2.push(`<!--]--></div> <div class="admin-empty mt-2 group-hover:transition-colors" style="font-size: 11px;"><span class="group-hover:opacity-80" style="color: var(--neon-cyan)">Verwalten →</span></div></a>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (auth.user?.role === "admin") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a href="/admin/users" class="admin-card admin-stat-card rounded-xl p-6 transition-colors group block"><div class="flex items-center justify-between mb-3"><span class="admin-page-sub" style="font-size: 13px; letter-spacing: 0.04em;">Benutzer</span> <i class="bi bi-person-gear text-lg" style="color: var(--neon-cyan)"></i></div> <div class="admin-page-title text-3xl">`);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span style="color: var(--ink-2)" class="text-xl">…</span>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="admin-empty mt-2 group-hover:transition-colors" style="font-size: 11px;"><span class="group-hover:opacity-80" style="color: var(--neon-cyan)">Verwalten →</span></div></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
