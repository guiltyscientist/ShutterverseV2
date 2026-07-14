const UPLOAD_SEGMENT = "/upload/";
function cldUrl(url, transform) {
  if (!url) return null;
  if (!url.includes("res.cloudinary.com")) return url;
  const idx = url.indexOf(UPLOAD_SEGMENT);
  if (idx === -1) return url;
  const cut = idx + UPLOAD_SEGMENT.length;
  return url.slice(0, cut) + transform + "/" + url.slice(cut);
}
const CLD = {
  thumb: "w_160,h_160,c_fill,q_auto,f_auto",
  card: "w_1000,c_limit,q_auto,f_auto",
  main: "w_1200,c_limit,q_auto,f_auto"
};
export {
  CLD as C,
  cldUrl as c
};
