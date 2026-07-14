import { j as head, e as escape_html, b as attr_class, d as attr, c as ensure_array_like, h as derived } from "../../../../chunks/renderer.js";
import "../../../../chunks/client.js";
import "animejs";
import { F as FormError } from "../../../../chunks/FormError.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let items = [];
    let uploading = false;
    let error = "";
    const hasVideo = derived(() => items.some((i) => i.type === "video"));
    head("1wsd539", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Hero – Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="flex items-center justify-between mb-6 flex-wrap gap-3"><div><h1 class="admin-page-title text-2xl">Hero-Medien</h1> <p class="admin-page-sub mt-1">${escape_html(items.length)} Medien</p></div> <label${attr_class("btn-primary cursor-pointer", void 0, { "opacity-55": uploading })}>`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<i class="bi bi-plus-lg mr-1.5"></i> Bild / Video hinzufügen`);
    }
    $$renderer2.push(`<!--]--> <input type="file" class="hidden" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"${attr("disabled", uploading, true)}/></label></div> <div class="admin-card rounded-xl p-4 mb-6"><p class="admin-page-sub" style="letter-spacing: 0.06em; line-height: 1.8; text-transform: none; font-size: 12px;"><i class="bi bi-info-circle mr-1.5" style="color: var(--neon-cyan)"></i> Gibt es ein <strong>Video</strong>, läuft das neueste als Hero-Hintergrund (stumm, als Loop).
    Ohne Video zeigen die <strong>Bilder</strong> eine langsame Überblend-Slideshow.
    Ohne Medien bleibt der animierte Verlauf.
    Empfehlung für Videos: 5–10 Sekunden Loop, 1080p, ohne Ton — Cloudinary komprimiert automatisch, sodass kaum mehr Traffic entsteht als bei einem großen Foto.</p></div> `);
    FormError($$renderer2, { message: error });
    $$renderer2.push(`<!----> <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-3"><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<div class="admin-card rounded-xl overflow-hidden group relative">`);
      if (item.type === "video") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<video${attr("src", item.url)} class="w-full h-36 object-cover" muted="" loop="" playsinline=""></video>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<img${attr("src", item.url)} class="w-full h-36 object-cover" alt="Hero Medium"/>`);
      }
      $$renderer2.push(`<!--]--> <div class="p-3 flex items-center justify-between"><span${attr_class(`text-xs px-2.5 py-1 rounded-full ${item.type === "video" ? "admin-badge-de" : "admin-badge-en"}`)}>`);
      if (item.type === "video") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<i class="bi bi-play-fill mr-1"></i>Video`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<i class="bi bi-image mr-1"></i>Bild`);
      }
      $$renderer2.push(`<!--]--></span> <button class="btn-icon admin-icon-btn danger" aria-label="Löschen"><i class="bi bi-trash"></i></button></div> `);
      if (item.type === "video" && hasVideo() && items.find((i) => i.type === "video")?.id === item.id) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full admin-badge-de">Aktiv im Hero</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
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
