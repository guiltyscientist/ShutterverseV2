import { i as head, e as escape_html, d as ensure_array_like, f as attr } from "../../../../chunks/renderer.js";
import "../../../../chunks/client.js";
import "animejs";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let items = [];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("hqhi34", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Studios – Admin</title>`);
        });
      });
      $$renderer3.push(`<div class="flex items-center justify-between mb-6"><div><h1 class="admin-page-title text-2xl">Studios</h1> <p class="admin-page-sub mt-1">${escape_html(items.length)} Studios</p></div> <button class="btn-primary"><i class="bi bi-plus-lg mr-1.5"></i> Neues Studio</button></div> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(items);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer3.push(`<div class="admin-card rounded-xl p-4 flex items-center gap-4">`);
        if (item.titleImg?.url) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<img${attr("src", item.titleImg.url)} class="w-16 h-16 object-cover rounded-lg shrink-0"${attr("alt", item.title?.de)}/>`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<div class="admin-thumb-fallback w-16 h-16 rounded-lg shrink-0 flex items-center justify-center"><i class="bi bi-camera text-xl"></i></div>`);
        }
        $$renderer3.push(`<!--]--> <div class="flex-1 min-w-0"><div class="font-medium truncate" style="color: var(--ink-0)">${escape_html(item.title?.de || item.title?.en)}</div> <div class="admin-page-sub mt-0.5" style="letter-spacing: 0.04em;">ID: ${escape_html(item.id)} · ${escape_html(item.images?.length || 0)} Bilder</div></div> <div class="flex gap-2 shrink-0"><button class="btn-icon admin-icon-btn edit"><i class="bi bi-pencil"></i></button> <button class="btn-icon admin-icon-btn danger"><i class="bi bi-trash"></i></button></div></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
