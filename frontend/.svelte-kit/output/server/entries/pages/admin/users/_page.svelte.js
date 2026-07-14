import { j as head, e as escape_html, c as ensure_array_like, b as attr_class } from "../../../../chunks/renderer.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import "../../../../chunks/client.js";
import { a as auth } from "../../../../chunks/auth.svelte.js";
import "animejs";
import { F as FormError } from "../../../../chunks/FormError.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let items = [];
    const isSelf = (item) => item.username === auth.user?.username;
    head("1p497kv", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Benutzer – Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="flex items-center justify-between mb-6"><div><h1 class="admin-page-title text-2xl">Benutzer</h1> <p class="admin-page-sub mt-1">${escape_html(items.length)} Konten</p></div> <button class="btn-primary"><i class="bi bi-plus-lg mr-1.5"></i> Neuer Benutzer</button></div> `);
    FormError($$renderer2, { message: "" });
    $$renderer2.push(`<!----> <div class="space-y-3 mt-3"><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<div class="admin-card rounded-xl p-4 flex items-center gap-4"><div class="admin-thumb-fallback w-12 h-12 rounded-full shrink-0 flex items-center justify-center"><i${attr_class(`bi ${item.role === "admin" ? "bi-person-gear" : "bi-person"}`)}></i></div> <div class="flex-1 min-w-0"><div class="font-medium flex items-center gap-2" style="color: var(--ink-0)">${escape_html(item.username)} `);
      if (isSelf(item)) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="admin-page-sub" style="letter-spacing: 0.08em;">(du)</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="admin-page-sub mt-0.5 truncate" style="letter-spacing: 0.04em;">${escape_html(item.email || "Keine E-Mail hinterlegt")}</div></div> <span${attr_class(`text-xs px-2.5 py-1 rounded-full shrink-0 ${item.role === "admin" ? "admin-badge-de" : "admin-badge-en"}`)}>${escape_html(item.role === "admin" ? "Admin" : "Editor")}</span> <div class="flex gap-2 shrink-0"><button class="btn-icon admin-icon-btn edit" aria-label="Bearbeiten"><i class="bi bi-pencil"></i></button> `);
      if (!isSelf(item)) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button class="btn-icon admin-icon-btn danger" aria-label="Löschen"><i class="bi bi-trash"></i></button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
