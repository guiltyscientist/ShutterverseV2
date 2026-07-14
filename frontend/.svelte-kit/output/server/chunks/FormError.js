import { e as escape_html } from "./renderer.js";
import "clsx";
function FormError($$renderer, $$props) {
  let { message } = $$props;
  if (message) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="admin-error flex items-start gap-2 text-sm rounded-lg px-3 py-2.5"><i class="bi bi-exclamation-triangle-fill mt-0.5 shrink-0"></i> <span>${escape_html(message)}</span></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
}
export {
  FormError as F
};
