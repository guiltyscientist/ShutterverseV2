import { j as head, d as attr } from "../../../../chunks/renderer.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import "animejs";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let username = "";
    let password = "";
    let loading = false;
    head("18c6u1m", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Admin Login – Shutterverse</title>`);
      });
    });
    $$renderer2.push(`<div class="admin-shell flex items-center justify-center p-4"><div class="w-full max-w-sm"><div class="text-center mb-8"><div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style="background: rgba(0,240,255,0.12)"><i class="bi bi-camera text-2xl" style="color: var(--neon-cyan)"></i></div> <h1 class="admin-page-title text-2xl">Admin Login</h1> <p class="admin-page-sub mt-1">Shutterverse Backend</p></div> <form class="admin-card rounded-2xl p-6 space-y-4"><div><label class="admin-label block mb-1.5">Benutzername</label> <input${attr("value", username)} type="text" class="input" placeholder="admin" autocomplete="username" required=""/></div> <div><label class="admin-label block mb-1.5">Passwort</label> <input${attr("value", password)} type="password" class="input" placeholder="••••••••" autocomplete="current-password" required=""/></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="btn-primary w-full justify-center py-2.5">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> Anmelden</button></form></div></div>`);
  });
}
export {
  _page as default
};
