import { b as attr_class, c as ensure_array_like, d as attr, e as escape_html, i as attr_style, f as stringify, h as derived, j as head } from "../../chunks/renderer.js";
import "clsx";
import { c as cldUrl, C as CLD } from "../../chunks/cloudinary.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const de = {
  nav: {
    home: "Home",
    news: "News",
    studios: "Studios",
    sets: "Sets",
    location: "Location",
    team: "Team",
    about: "Über uns",
    booking: "Booking",
    impressum: "Impressum"
  },
  hero: {
    tag: "Cosplay & Fantasy Photo Studio — Wien · Österreich",
    cta: "Buche jetzt ein Studio"
  },
  newsDesign: {
    eyebrow: "// AKTUELLES",
    h: "News & nächste Termine",
    meta: "Updated wöchentlich"
  },
  setsDesign: {
    eyebrow: "// SETS",
    h: "Sofort buchbare Sets",
    meta: "aktive Sets",
    back: "Zurück zur Übersicht",
    ib: "// Inspired by",
    cta: "Dieses Set buchen",
    from: "ab"
  },
  locationDesign: {
    eyebrow: "// STANDORT",
    h: "So findest du uns",
    label: "Adresse",
    carTitle: "Mit dem Auto",
    carLines: [
      "A2 Südautobahn · Abfahrt Leobersdorf",
      "Richtung Ortszentrum, dann in die Mühlgasse",
      "Parkplätze direkt beim Studio"
    ],
    transitTitle: "Öffentliche Verkehrsmittel",
    transitLines: [
      "Südbahn bis Bahnhof Leobersdorf",
      "Ab Wien Meidling ca. 30 Minuten",
      "Vom Bahnhof ca. 10 Minuten zu Fuß"
    ],
    overlay: "Studio · 47.9232° N · 16.2119° E",
    mapNotice: "Beim Laden der Karte werden Daten (z.B. deine IP-Adresse) an Google übertragen. Mit dem Klick auf „Karte laden“ stimmst du der Datenübertragung zu.",
    mapLoad: "Karte laden",
    mapHint: "Deine Auswahl wird auf diesem Gerät gespeichert."
  },
  aboutDesign: {
    eyebrow: "// ÜBER UNS",
    h1: "Österreichs erstes",
    h2: "Cosplay",
    h3: "Studio.",
    meta: "Cosplayer · Fotografen · Set-Builder"
  },
  bookingSection: {
    eyebrow: "// BOOKING",
    h: "Bereit zum Shoot?",
    p: "Buche dein Studio direkt online. Verfügbarkeit in Echtzeit, sofortige Bestätigung.",
    cta: "Termin reservieren"
  },
  footerDesign: {
    brandP: "ShutterVerse Studio — Österreichs erstes Fotostudio für Cosplay-Shootings.",
    contactH: "Kontakt",
    contactP: "hello@shutterverse.at<br>Mo–So nach Vereinbarung",
    legalH: "Rechtliches",
    legal1: "Impressum",
    legal2: "Datenschutz",
    legal3: "AGB",
    legal4: "Studio-Regeln",
    socialH: "Social",
    footL: "© ShutterVerse Studio · UID ATU00000000",
    footR: "Made in Wien · Open / now"
  },
  loading: "Laden...",
  news: {
    empty: "Aktuell keine Neuigkeiten",
    emptyDesc: "Schau bald wieder vorbei – wir halten dich auf dem Laufenden.",
    backToLatest: "Zu den neuesten News"
  },
  studios: {
    empty: "Keine Studios vorhanden.",
    viewDetails: "Studio Details anzeigen",
    viewAll: "Alle Studios anzeigen",
    about: "Über dieses Studio",
    equipment: "Enthaltene Ausrüstung",
    book: "Studio buchen",
    prev: "Zurück",
    next: "Weiter",
    header: "Studios"
  },
  team: {
    title: "Unser Team",
    growing: "Unser Team wächst",
    checkBack: "Schau bald wieder vorbei!",
    socialSoon: "Soziale Links folgen bald"
  },
  location: {
    title: "Unser Standort",
    gettingHere: "Anreise",
    byCar: "Mit dem Auto",
    byTransport: "Mit öffentlichen Verkehrsmitteln",
    getDirections: "Wegbeschreibung",
    getDirectionsMaps: "Route auf Google Maps",
    mapConsent: "Diese Karte wird von Google Maps bereitgestellt. Durch das Laden werden Cookies von Google gesetzt.",
    mapConsentBtn: "Karte anzeigen",
    noLocations: "Keine Standorte verfügbar",
    noLocationsDesc: "Schau bald für unsere Studiostandorte vorbei.",
    scrollMore: "Nach unten scrollen für weitere Standorte ↓",
    studio: {
      title: "Unser Shutterverse Studio",
      byCar: "Ab Wien: Nehmen Sie die A2 Richtung Graz, Ausfahrt Leobersdorf. Folgen Sie den Schildern Richtung Leobersdorf Zentrum. Nach der Ortseinfahrt biegen Sie rechts in die Mühlgasse ab. Wir befinden uns auf der rechten Seite, Nummer 8. Kostenlose Parkplätze stehen vor dem Studio zur Verfügung.",
      byTransport: 'Ab Wien Hauptbahnhof: Nehmen Sie die S-Bahn S60 Richtung Wiener Neustadt. Steigen Sie am Bahnhof Leobersdorf aus. Vom Bahnhof sind es ca. 10 Gehminuten. Verlassen Sie den Bahnhof und gehen Sie südöstlich auf der Hauptstraße. Biegen Sie links in die Mühlgasse ab. Das Studio ist auf Ihrer linken Seite bei Nummer 8. Die Buslinie 266 hält ebenfalls in der Nähe bei „Leobersdorf Ort".'
    }
  },
  impressum: {
    title: "Impressum & Kontakt",
    sections: {
      company: "Unternehmensdaten",
      contact: "Kontakt",
      legal: "Rechtliche Informationen",
      authority: "Aufsichtsbehörde"
    },
    labels: {
      phone: "Telefon:",
      email: "E-Mail:",
      web: "Web:",
      uid: "UID-Nummer:",
      register: "Firmenbuchnummer:",
      court: "Firmenbuchgericht:",
      directors: "Geschäftsführer:",
      law: "Berufsrecht:",
      chamber: "Kammerzugehörigkeit:",
      appLaw: "Anwendbares Recht:",
      dispute: "Streitschlichtung:",
      liability: "Haftungshinweis:"
    },
    form: {
      title: "Kontaktformular",
      name: "Name *",
      email: "E-Mail Adresse *",
      message: "Nachricht *",
      namePlaceholder: "Ihr Vor- und Nachname",
      emailPlaceholder: "ihre.email@beispiel.com",
      messagePlaceholder: "Ihre Nachricht an uns...",
      sendCopy: "Kopie der Nachricht an meine E-Mail Adresse senden",
      submit: "Nachricht senden",
      submitting: "Wird gesendet...",
      reset: "Zurücksetzen",
      required: "* Pflichtfelder. Ihre Daten werden nur zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.",
      successTitle: "Nachricht gesendet!",
      successText: "Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.",
      successCopy: " Eine Kopie wurde an Ihre E-Mail-Adresse gesendet.",
      errorGeneral: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      emailSubject: "Kontaktanfrage von {name}",
      emailBody: "Name: {name}%0AEmail: {email}%0A%0ANachricht:%0A{message}",
      copySubject: "Kopie Ihrer Nachricht an ShutterVision Studios",
      copyBody: "Hallo {name},%0A%0AHier ist eine Kopie Ihrer Nachricht:%0A%0A%22{message}%22%0A%0AWir werden uns in Kürze bei Ihnen melden.%0A%0AMit freundlichen Grüßen,%0ADas Team von ShutterVision Studios"
    },
    validation: {
      nameRequired: "Bitte geben Sie Ihren Namen ein.",
      emailRequired: "Bitte geben Sie Ihre E-Mail Adresse ein.",
      emailInvalid: "Bitte geben Sie eine gültige E-Mail Adresse ein.",
      messageRequired: "Bitte geben Sie eine Nachricht ein."
    },
    alternatives: {
      title: "Alternative Kontaktmöglichkeiten",
      email: "E-Mail",
      phone: "Telefon"
    }
  }
};
const en = {
  nav: {
    home: "Home",
    news: "News",
    studios: "Studios",
    sets: "Sets",
    location: "Location",
    team: "Team",
    about: "About",
    booking: "Booking",
    impressum: "Legal"
  },
  hero: {
    tag: "Cosplay & Fantasy Photo Studio — Vienna · Austria",
    cta: "Book your studio"
  },
  newsDesign: {
    eyebrow: "// LATEST",
    h: "News & upcoming dates",
    meta: "Updated weekly"
  },
  setsDesign: {
    eyebrow: "// SETS",
    h: "Sets you can book",
    meta: "active sets",
    back: "Back to overview",
    ib: "// Inspired by",
    cta: "Book this set",
    from: "from"
  },
  locationDesign: {
    eyebrow: "// LOCATION",
    h: "How to find us",
    label: "Address",
    carTitle: "By car",
    carLines: [
      "A2 Süd motorway · exit Leobersdorf",
      "Head for the town centre, then turn into Mühlgasse",
      "Parking right next to the studio"
    ],
    transitTitle: "Public transport",
    transitLines: [
      "Südbahn line to Leobersdorf station",
      "Approx. 30 minutes from Wien Meidling",
      "Approx. 10 minutes on foot from the station"
    ],
    overlay: "Studio · 47.9232° N · 16.2119° E",
    mapNotice: "Loading the map transfers data (e.g. your IP address) to Google. By clicking “Load map” you consent to this transfer.",
    mapLoad: "Load map",
    mapHint: "Your choice is saved on this device."
  },
  aboutDesign: {
    eyebrow: "// ABOUT",
    h1: "Austria's first",
    h2: "Cosplay",
    h3: "Studio.",
    meta: "Cosplayers · Photographers · Set Builders"
  },
  bookingSection: {
    eyebrow: "// BOOKING",
    h: "Ready to shoot?",
    p: "Book your studio online. Real-time availability, instant confirmation.",
    cta: "Reserve a slot"
  },
  footerDesign: {
    brandP: "ShutterVerse Studio — Austria's first photo studio for cosplay shoots.",
    contactH: "Contact",
    contactP: "hello@shutterverse.at<br>Mon–Sun by appointment",
    legalH: "Legal",
    legal1: "Imprint",
    legal2: "Privacy",
    legal3: "Terms",
    legal4: "Studio rules",
    socialH: "Social",
    footL: "© ShutterVerse Studio · VAT ATU00000000",
    footR: "Made in Vienna · Open / now"
  },
  loading: "Loading...",
  news: {
    empty: "No news at the moment",
    emptyDesc: "Check back soon – we'll keep you in the loop.",
    backToLatest: "Back to Latest News"
  },
  studios: {
    empty: "No studios available.",
    viewDetails: "View Studio Details",
    viewAll: "View All Studios",
    about: "About This Studio",
    equipment: "Equipment Included",
    book: "Book This Studio",
    prev: "Previous",
    next: "Next",
    header: "Studios"
  },
  team: {
    title: "Meet Our Team",
    growing: "Our team is growing",
    checkBack: "Check back soon!",
    socialSoon: "Social links coming soon"
  },
  location: {
    title: "Our Location",
    gettingHere: "Getting Here",
    byCar: "By Car",
    byTransport: "By Public Transportation",
    getDirections: "Get Directions",
    getDirectionsMaps: "Get Directions on Google Maps",
    mapConsent: "This map is provided by Google Maps. Loading it will allow Google to set cookies.",
    mapConsentBtn: "Show Map",
    noLocations: "No Locations Available",
    noLocationsDesc: "Check back soon for our studio locations.",
    scrollMore: "Scroll down to view more locations ↓",
    studio: {
      title: "Our Shutterverse Studio",
      byCar: "From Vienna: Take the A2 motorway towards Graz, exit at Leobersdorf. Follow the signs to Leobersdorf center. After entering Leobersdorf, turn right onto Mühlgasse. We are located on the right side, number 8. Free parking is available in front of the studio.",
      byTransport: "From Vienna Hauptbahnhof: Take the S-Bahn S60 line towards Wiener Neustadt. Get off at Leobersdorf station. From the station, it's a 10-minute walk. Exit the station and head southeast on Hauptstraße. Turn left onto Mühlgasse. The studio is on your left at number 8. Bus line 266 also stops nearby at 'Leobersdorf Ort'."
    }
  },
  impressum: {
    title: "Legal Notice & Contact",
    sections: {
      company: "Company Information",
      contact: "Contact",
      legal: "Legal Information",
      authority: "Supervisory Authority"
    },
    labels: {
      phone: "Phone:",
      email: "E-Mail:",
      web: "Web:",
      uid: "VAT number:",
      register: "Company register:",
      court: "Register court:",
      directors: "Managing directors:",
      law: "Professional regulations:",
      chamber: "Chamber membership:",
      appLaw: "Applicable law:",
      dispute: "Dispute resolution:",
      liability: "Liability notice:"
    },
    form: {
      title: "Contact Form",
      name: "Name *",
      email: "Email Address *",
      message: "Message *",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your.email@example.com",
      messagePlaceholder: "Your message to us...",
      sendCopy: "Send a copy of the message to my email address",
      submit: "Send message",
      submitting: "Sending...",
      reset: "Reset",
      required: "* Required fields. Your data will only be used to process your request and will not be shared with third parties.",
      successTitle: "Message sent!",
      successText: "Thank you for your message. We will get back to you shortly.",
      successCopy: " A copy has been sent to your email address.",
      errorGeneral: "An error occurred. Please try again later.",
      emailSubject: "Contact request from {name}",
      emailBody: "Name: {name}%0AEmail: {email}%0A%0AMessage:%0A{message}",
      copySubject: "Copy of your message to ShutterVision Studios",
      copyBody: "Hello {name},%0A%0AHere is a copy of your message:%0A%0A%22{message}%22%0A%0AWe will get back to you shortly.%0A%0ABest regards,%0AThe ShutterVision Studios Team"
    },
    validation: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      messageRequired: "Please enter a message."
    },
    alternatives: {
      title: "Alternative Contact Options",
      email: "Email",
      phone: "Phone"
    }
  }
};
const translations = { de, en };
const STORAGE_KEY = "shutterverse_locale";
function detect() {
  if (typeof localStorage === "undefined") return "de";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "de" || saved === "en") return saved;
  return (navigator?.language ?? "").startsWith("de") ? "de" : "en";
}
let locale = detect();
const tProxy = new Proxy({}, {
  get(_, section) {
    if (typeof section !== "string") return void 0;
    const trans = translations[locale][section];
    if (trans === null || trans === void 0 || typeof trans !== "object") return trans;
    return new Proxy(trans, {
      get(_2, key) {
        if (typeof key !== "string") return void 0;
        return translations[locale][section][key];
      }
    });
  }
});
function useLocale() {
  function setLocale(l) {
    locale = l;
    if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  }
  function lt(field) {
    if (!field) return "";
    return field[locale] || field.de || field.en || "";
  }
  function ltArr(field) {
    if (!field) return [];
    return field[locale] || field.de || [];
  }
  return {
    // Getter — must be accessed as `loc.locale`, NOT destructured, to stay reactive
    get locale() {
      return locale;
    },
    t: tProxy,
    setLocale,
    lt,
    ltArr
  };
}
function NavBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const loc = useLocale();
    const { t } = loc;
    let scrolled = false;
    let activeHref = "#top";
    $$renderer2.push(`<header${attr_class("sv-nav", void 0, { "scrolled": scrolled })}><a href="#top" aria-label="ShutterVerse Home"><img src="/logos/BIG.png" alt="ShutterVerse Studio" class="sv-logo"/></a> <button class="sv-menu-overlay" aria-label="Menü schließen" tabindex="-1"></button> <nav class="sv-nav-links"><!--[-->`);
    const each_array = ensure_array_like([
      { href: "#top", label: t.nav.home },
      { href: "#news", label: t.nav.news },
      { href: "#sets", label: t.nav.sets },
      { href: "#location", label: t.nav.location },
      { href: "#about", label: t.nav.about },
      { href: "#booking", label: t.nav.booking }
    ]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr("href", item.href)}${attr_class("", void 0, { "active": activeHref === item.href })}>${escape_html(item.label)}</a>`);
    }
    $$renderer2.push(`<!--]--> <div class="lang-toggle menu-lang" role="group" aria-label="Language"><button${attr_class("", void 0, { "active": loc.locale === "de" })}>DE</button> <button${attr_class("", void 0, { "active": loc.locale === "en" })}>EN</button></div></nav> <button class="sv-burger" aria-label="Menu"><span></span><span></span><span></span></button> <div class="sv-nav-right"><div class="lang-toggle" role="group" aria-label="Language"><button${attr_class("", void 0, { "active": loc.locale === "de" })}>DE</button> <button${attr_class("", void 0, { "active": loc.locale === "en" })}>EN</button></div></div></header>`);
  });
}
function Home($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { t } = useLocale();
    let media = [];
    let slide = 0;
    const video = derived(() => media.find((m) => m.type === "video") ?? null);
    const images = derived(() => media.filter((m) => m.type === "image"));
    $$renderer2.push(`<section class="sv-hero" id="top"><div class="hero-media"><div class="hero-fallback"></div> `);
    if (video()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<video class="hero-video"${attr("src", video().url)} autoplay="" muted="" loop="" playsinline=""${attr("poster", images()[0]?.url)}></video>`);
    } else if (images().length > 0) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(images());
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let img = each_array[i];
        $$renderer2.push(`<div${attr_class("hero-slide", void 0, { "active": i === slide })}${attr_style(`background-image: url('${stringify(img.url)}')`)}></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="hero-grid"></div> <div class="hero-overlay"></div></div> <div class="hero-corners"></div> <div class="hero-readout"><span>REC</span> <span class="rec-dot"></span> <span>48.218° N · 16.392° E</span></div> <div class="hero-bottom-left"><a href="#booking" class="sv-btn"><span>${escape_html(t.hero.cta)}</span> <span class="arrow"></span></a> <div class="hero-eyebrow"><span class="dot"></span> <span>${escape_html(t.hero.tag)}</span></div></div> <div class="scroll-cue"><span>Scroll</span> <span class="bar"></span></div></section>`);
  });
}
function News($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const loc = useLocale();
    const { t, lt } = loc;
    const DESKTOP_PAGE_SIZE = 4;
    let newsData = [];
    let expandedId = null;
    let page = 0;
    let pageSize = DESKTOP_PAGE_SIZE;
    const pageCount = derived(() => Math.ceil(newsData.length / pageSize));
    const visibleNews = derived(() => newsData.slice(page * pageSize, (page + 1) * pageSize));
    function formatDate(d) {
      return new Date(d).toLocaleDateString(loc.locale === "de" ? "de-DE" : "en-US", { day: "numeric", month: "long", year: "numeric" });
    }
    $$renderer2.push(`<section class="sv-news vh" id="news"><div class="vh-inner"><div class="section-head"><div><div class="eyebrow">${escape_html(t.newsDesign.eyebrow)}</div> <h2>${escape_html(t.newsDesign.h)}</h2></div> <div class="s-meta">${escape_html(t.newsDesign.meta)}</div></div> `);
    if (newsData.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class("news-row", void 0, { "has-expanded": expandedId !== null })}><!--[-->`);
      const each_array = ensure_array_like(visibleNews());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        const tag = item.tag && item.tag !== "news" ? item.tag : "";
        $$renderer2.push(`<article${attr_class("news-card", void 0, { "expanded": expandedId === item.id })}>`);
        if (item.titleImg?.url) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="news-media"${attr_style(`background-image: url('${stringify(item.titleImg.url)}')`)}></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <button class="news-toggle"${attr("aria-expanded", expandedId === item.id)}><span${attr_class(`news-tag ${stringify(tag)}`)}>${escape_html(tag || "News")}</span> <span class="news-date">${escape_html(formatDate(item.created))}</span> <h3>${escape_html(lt(item.title))}</h3> <span class="news-preview">${escape_html(lt(item.description))}</span> <span class="news-plus" aria-hidden="true"></span></button> <div class="news-body"><p>${escape_html(lt(item.description))}</p></div></article>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (pageCount() > 1) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="news-pager"><button class="news-pager-arrow"${attr("disabled", page === 0, true)} aria-label="Neuere News"><span class="pager-arrow left" aria-hidden="true"></span></button> <div class="news-pager-dots"><!--[-->`);
        const each_array_1 = ensure_array_like(Array(pageCount()));
        for (let p = 0, $$length = each_array_1.length; p < $$length; p++) {
          each_array_1[p];
          $$renderer2.push(`<button${attr_class("news-pager-dot", void 0, { "active": p === page })}${attr("aria-label", `Seite ${p + 1}`)}></button>`);
        }
        $$renderer2.push(`<!--]--></div> <span class="news-pager-count">${escape_html(String(page + 1).padStart(2, "0"))} / ${escape_html(String(pageCount()).padStart(2, "0"))}</span> <button class="news-pager-arrow"${attr("disabled", page === pageCount() - 1, true)} aria-label="Ältere News"><span class="pager-arrow right" aria-hidden="true"></span></button></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="news-empty"><p class="news-empty-title">${escape_html(t.news.empty)}</p> <p class="news-empty-desc">${escape_html(t.news.emptyDesc)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
function Studios($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { t, lt } = useLocale();
    let studios = [];
    let activeImg = {};
    let shown = {};
    const THEMES = ["theme-cyberpunk", "theme-japanese", "theme-hospital"];
    const ANNOTATIONS = [
      { tl: "ISO 800 · 24mm · f/1.8", br: "1/60s · WB 3200K" },
      { tl: "ISO 200 · 50mm · f/2.0", br: "1/125s · WB 5600K" },
      { tl: "ISO 1600 · 35mm · f/1.4", br: "1/40s · WB 4200K" }
    ];
    function theme(i) {
      return THEMES[i % THEMES.length];
    }
    function annot(i) {
      return ANNOTATIONS[i % ANNOTATIONS.length];
    }
    function padNum(n) {
      return n < 10 ? `0${n}` : `${n}`;
    }
    function getImg(studio) {
      return studio.titleImg?.url ?? studio.images?.[0]?.url ?? null;
    }
    function galleryOf(studio) {
      const urls = [
        studio.titleImg?.url,
        ...(studio.images ?? []).map((img) => img.url)
      ];
      return [...new Set(urls.filter((u) => Boolean(u)))];
    }
    function getEquipmentItems(studio) {
      const eq = lt(studio.equipment);
      if (!eq) return [];
      return eq.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4);
    }
    if (studios.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="sv-sets vh" id="sets"><div class="vh-inner"><div class="section-head"><div><div class="eyebrow">${escape_html(t.setsDesign.eyebrow)}</div> <h2>${escape_html(t.setsDesign.h)}</h2></div> <div class="s-meta">${escape_html(studios.length)} ${escape_html(t.setsDesign.meta)}</div></div> <div class="sets-grid"><!--[-->`);
      const each_array = ensure_array_like(studios);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let studio = each_array[i];
        const img = shown[`card-${studio.id}`] ? cldUrl(getImg(studio), CLD.card) : null;
        $$renderer2.push(`<article${attr_class(`set-card ${stringify(theme(i))}`)}><a${attr("href", `#set-${stringify(studio.id)}`)} class="set-card-link"${attr("aria-label", lt(studio.title))}></a> <div class="sc-frame"><div class="sc-img-clip"><div class="sc-img"${attr_style(img ? `background-image: url(${img})` : "")}></div> <div class="sc-scrim"></div></div> <div class="sc-title-overlay"><h3>${escape_html(lt(studio.title))}</h3></div> <div class="annot-corner tl"></div> <div class="annot-corner tr"></div> <div class="annot-corner bl"></div> <div class="annot-corner br"></div></div> <div class="sc-label"><div class="sc-num">SET / ${escape_html(padNum(i + 1))}${escape_html(studio.showNewBadge ? " · NEW" : "")}</div></div></article>`);
      }
      $$renderer2.push(`<!--]--></div></div></section> <!--[-->`);
      const each_array_1 = ensure_array_like(studios);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let studio = each_array_1[i];
        const gallery = galleryOf(studio);
        const rawImg = activeImg[studio.id] ?? getImg(studio);
        const idx = Math.max(0, gallery.indexOf(rawImg));
        const img = shown[`det-${studio.id}`] && rawImg ? cldUrl(rawImg, CLD.main) : null;
        const a = annot(i);
        const equipment = getEquipmentItems(studio);
        const isReverse = i % 2 === 1;
        const isNew = !!studio.showNewBadge;
        $$renderer2.push(`<section class="sv-set-detail vh"${attr("id", `set-${stringify(studio.id)}`)}><div class="vh-inner"><article${attr_class(`set-detail ${isReverse ? "reverse" : ""}`)}><div class="sdm-wrap"><div${attr_class(`sdm ${stringify(theme(i))}`)}><div class="sdm-img"${attr_style(img ? `background-image: url(${img})` : "")}></div> <div class="annot annot-tl">${escape_html(a.tl)}</div> <div class="annot annot-tr"><span class="dot-mag"></span> REC · 24P</div> <div class="annot annot-bl">// SET ${escape_html(padNum(i + 1))} · ${escape_html(lt(studio.title).toUpperCase())}</div> <div class="annot annot-br">⟶ ${escape_html(a.br)}</div> <div class="annot-corner tl"></div> <div class="annot-corner tr"></div> <div class="annot-corner bl"></div> <div class="annot-corner br"></div> `);
        if (isNew) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="badge-new">NEW</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (gallery.length > 1) {
          $$renderer2.push("<!--[0-->");
          if (idx > 0) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<button type="button" class="sdm-nav left" aria-label="Vorheriges Bild"><span class="sdm-nav-icon"></span></button>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (idx < gallery.length - 1) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<button type="button" class="sdm-nav right" aria-label="Nächstes Bild"><span class="sdm-nav-icon"></span></button>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        if (gallery.length > 1) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="sdm-thumbs"><!--[-->`);
          const each_array_2 = ensure_array_like(gallery);
          for (let gi = 0, $$length2 = each_array_2.length; gi < $$length2; gi++) {
            let url = each_array_2[gi];
            $$renderer2.push(`<button type="button"${attr_class("sdm-thumb", void 0, { "active": url === rawImg })}${attr_style(shown[`det-${studio.id}`] ? `background-image: url(${cldUrl(url, CLD.thumb)})` : "")}${attr("aria-label", `Bild ${stringify(gi + 1)} anzeigen`)}></button>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="sdc"><div class="set-num-bg" aria-hidden="true">${escape_html(padNum(i + 1))}</div> <div class="set-num-glow" aria-hidden="true">${escape_html(padNum(i + 1))}</div> <a href="#sets" class="set-back"><span class="set-back-arrow"></span> <span>${escape_html(t.setsDesign.back)}</span></a> <div class="sdh"><div class="sd-num">SET / ${escape_html(padNum(i + 1))} · ${escape_html(isNew ? "NEW" : "ACTIVE")}</div> <h3>${escape_html(lt(studio.title))}</h3> <p class="sd-lead">${escape_html(lt(studio.description))}</p></div> `);
        if (equipment.length > 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="sd-grid"><!--[-->`);
          const each_array_3 = ensure_array_like(equipment);
          for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
            let item = each_array_3[$$index_2];
            $$renderer2.push(`<div class="sd-kv"><span class="k">Equipment</span> <span class="v">${escape_html(item)}</span></div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (studio.inspiredBy?.length) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="inspired-by"><div class="ib-label">${escape_html(t.setsDesign.ib)}</div> <div class="ib-chips"><!--[-->`);
          const each_array_4 = ensure_array_like(studio.inspiredBy);
          for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
            let chip = each_array_4[$$index_3];
            $$renderer2.push(`<span>${escape_html(chip)}</span>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="sd-cta-row"><a${attr("href", studio.bookingUrl || "#booking")}${attr("target", studio.bookingUrl ? "_blank" : void 0)}${attr("rel", studio.bookingUrl ? "noopener noreferrer" : void 0)} class="sv-btn"><span>${escape_html(t.setsDesign.cta)}</span> <span class="arrow"></span></a></div></div></article></div></section>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Location($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const loc = useLocale();
    const { t } = loc;
    $$renderer2.push(`<section class="sv-location vh" id="location"><div class="vh-inner"><div class="section-head"><div><div class="eyebrow">${escape_html(t.locationDesign.eyebrow)}</div> <h2>${escape_html(t.locationDesign.h)}</h2></div></div> <div class="location-grid"><div class="location-info"><div class="address-block"><div class="addr-label">${escape_html(t.locationDesign.label)}</div> <p>Mühlgasse 8<br/>2544 Leobersdorf<br/>Austria</p></div> <div class="dir-block"><div class="dir-title"><span class="pill u">A2</span>${escape_html(t.locationDesign.carTitle)}</div> <ul class="dir-list"><!--[-->`);
    const each_array = ensure_array_like(t.locationDesign.carLines);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let line = each_array[$$index];
      $$renderer2.push(`<li>${escape_html(line)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div class="dir-block"><div class="dir-title"><span class="pill s">S</span>${escape_html(t.locationDesign.transitTitle)}</div> <ul class="dir-list"><!--[-->`);
    const each_array_1 = ensure_array_like(t.locationDesign.transitLines);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let line = each_array_1[$$index_1];
      $$renderer2.push(`<li>${escape_html(line)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> <div class="map-wrap"><div class="map-overlay"><span class="dot"></span> ${escape_html(t.locationDesign.overlay)}</div> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="map-placeholder" aria-hidden="true"></div> <div class="map-consent"><p>${escape_html(t.locationDesign.mapNotice)}</p> <button type="button" class="sv-btn"><span>${escape_html(t.locationDesign.mapLoad)}</span> <span class="arrow"></span></button> <span class="map-consent-hint">${escape_html(t.locationDesign.mapHint)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></section>`);
  });
}
function Team($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { t, lt, ltArr } = useLocale();
    let members = [];
    const safeUrl = (url) => /^https?:\/\//i.test(url) ? url : "";
    $$renderer2.push(`<section class="sv-about vh" id="about"><div class="vh-inner"><div class="about-layout"><div class="about-left"><div class="eyebrow">${escape_html(t.aboutDesign.eyebrow)}</div> <div class="about-rule" aria-hidden="true">${escape_html(t.aboutDesign.meta)}</div> <h2 class="about-h">${escape_html(t.aboutDesign.h1)}<br/> <span class="stroke">${escape_html(t.aboutDesign.h2)}</span><br/> ${escape_html(t.aboutDesign.h3)}</h2> <div class="about-meta">${escape_html(t.aboutDesign.meta)}</div></div> <div class="about-team">`);
    if (members.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="team-row"><div class="team-photo"><div class="tp-frame"></div> <div class="tp-label">MEMBER</div></div> <div class="team-info"><div class="t-role">Photographer · Set Builder</div> <div class="t-name">${escape_html(t.team.growing)}</div> <div class="t-bio">${escape_html(t.team.checkBack)}</div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(members);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let member = each_array[$$index_1];
        $$renderer2.push(`<div class="team-row"><div class="team-photo">`);
        if (member.profilImg?.url) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<img${attr("src", member.profilImg.url)}${attr("alt", `${stringify(member.firstName)} ${stringify(member.lastName)}`)}/>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="tp-frame"></div> <div class="tp-label">${escape_html(ltArr(member.roles)?.[0] ?? "Member")}</div></div> <div class="team-info"><div class="t-role">${escape_html(ltArr(member.roles).join(" · "))}</div> <div class="t-name">${escape_html(member.firstName)}<br/>${escape_html(member.lastName)}</div> `);
        if (member.description) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="t-bio">${escape_html(lt(member.description))}</div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (member.socialMedia?.filter((s) => safeUrl(s.url)).length > 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="t-links"><!--[-->`);
          const each_array_1 = ensure_array_like(member.socialMedia.filter((s) => safeUrl(s.url)));
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let social = each_array_1[$$index];
            $$renderer2.push(`<a${attr("href", safeUrl(social.url))} target="_blank" rel="noopener noreferrer">${escape_html(social.platform)}</a>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div></section>`);
  });
}
function Impressum($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { t } = useLocale();
    const socials = [
      {
        label: "Instagram",
        href: "https://instagram.com/shutterverse.at"
      },
      { label: "TikTok", href: "https://tiktok.com/@shutterverse" }
    ];
    $$renderer2.push(`<footer class="sv-footer" id="impressum"><div class="impressum-grid"><div class="imp-brand"><img src="/logos/BIG.png" alt="ShutterVerse Studio" class="sv-logo"/> <p>${escape_html(t.footerDesign.brandP)}</p></div> <div><h4>${escape_html(t.footerDesign.contactH)}</h4> <p>${html(t.footerDesign.contactP)}</p></div> <div><h4>${escape_html(t.footerDesign.legalH)}</h4> <ul><li><a href="/impressum">${escape_html(t.footerDesign.legal1)}</a></li> <li><a href="/privacy">${escape_html(t.footerDesign.legal2)}</a></li> <li><a href="/terms">${escape_html(t.footerDesign.legal3)}</a></li> <li><a href="/rules">${escape_html(t.footerDesign.legal4)}</a></li></ul></div> <div><h4>${escape_html(t.footerDesign.socialH)}</h4> <ul><!--[-->`);
    const each_array = ensure_array_like(socials);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let s = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", s.href)} target="_blank" rel="noopener noreferrer">${escape_html(s.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> <div class="foot-line"><span>${escape_html(t.footerDesign.footL)}</span> <span class="marker"><span class="d"></span>${escape_html(t.footerDesign.footR)}</span></div></footer>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { t, lt } = useLocale();
    const BOOKING_URL = "https://booking.shutterverse.at";
    let teaserSets = [];
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>ShutterVerse Studio</title>`);
      });
    });
    $$renderer2.push(`<div id="app">`);
    NavBar($$renderer2);
    $$renderer2.push(`<!----> `);
    Home($$renderer2);
    $$renderer2.push(`<!----> `);
    News($$renderer2);
    $$renderer2.push(`<!----> `);
    Studios($$renderer2);
    $$renderer2.push(`<!----> `);
    Location($$renderer2);
    $$renderer2.push(`<!----> `);
    Team($$renderer2);
    $$renderer2.push(`<!----> <section class="sv-booking" id="booking"><div class="booking-inner"><div class="section-head"><div><div class="eyebrow">${escape_html(t.bookingSection.eyebrow)}</div> <h2>${escape_html(t.bookingSection.h)}</h2></div></div> `);
    if (teaserSets.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="bk-sets"><!--[-->`);
      const each_array = ensure_array_like(teaserSets);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let s = each_array[$$index];
        $$renderer2.push(`<a class="bk-set"${attr("href", s.bookingUrl || BOOKING_URL)} target="_blank" rel="noopener noreferrer"${attr("aria-label", `${stringify(lt(s.title))} – ${stringify(t.bookingSection.cta)}`)}><div class="bk-set-media">`);
        if (s.titleImg) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="bk-set-img"${attr_style(`background-image: url(${stringify(cldUrl(s.titleImg, "w_720,h_960,c_fill,q_auto,f_auto"))})`)}></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="bk-set-scrim"></div> <span class="bk-set-title">${escape_html(lt(s.title))}</span></div> <span class="bk-set-cta"><span>${escape_html(t.bookingSection.cta)}</span> <span class="arrow"></span></span></a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<a${attr("href", BOOKING_URL)} target="_blank" rel="noopener noreferrer" class="sv-btn"><span>${escape_html(t.bookingSection.cta)}</span> <span class="arrow"></span></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> `);
    Impressum($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
