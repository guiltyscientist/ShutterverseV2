import { b as attr_class, d as ensure_array_like, f as attr, e as escape_html, h as stringify, c as attr_style, i as head } from "../../chunks/renderer.js";
import "clsx";
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
    transitU: "Praterstern · 4 min Fußweg",
    transitS: "S Praterstern · 5 min",
    transitP: "Garage Lassallestraße · 50 m",
    overlay: "Studio · 48.218° N · 16.392° E"
  },
  aboutDesign: {
    eyebrow: "// ÜBER UNS",
    h1: "Österreichs erstes",
    h2: "Cosplay",
    h3: "Studio.",
    meta: "Cosplayer · Fotografen · Set-Builder"
  },
  bookingSection: {
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
    transitU: "Praterstern · 4 min walk",
    transitS: "S Praterstern · 5 min",
    transitP: "Lassallestraße garage · 50 m",
    overlay: "Studio · 48.218° N · 16.392° E"
  },
  aboutDesign: {
    eyebrow: "// ABOUT",
    h1: "Austria's first",
    h2: "Cosplay",
    h3: "Studio.",
    meta: "Cosplayers · Photographers · Set Builders"
  },
  bookingSection: {
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
    $$renderer2.push(`<header${attr_class("sv-nav", void 0, { "scrolled": scrolled })}><a href="#top" aria-label="ShutterVerse Home"><img src="/logos/BIG.png" alt="ShutterVerse Studio" class="sv-logo"/></a> <nav class="sv-nav-links"><!--[-->`);
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
    $$renderer2.push(`<!--]--></nav> <button class="sv-burger" aria-label="Menu"><span></span><span></span><span></span></button> <div class="sv-nav-right"><div class="lang-toggle" role="group" aria-label="Language"><button${attr_class("", void 0, { "active": loc.locale === "de" })}>DE</button> <button${attr_class("", void 0, { "active": loc.locale === "en" })}>EN</button></div></div></header>`);
  });
}
function Home($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { t } = useLocale();
    $$renderer2.push(`<section class="sv-hero" id="top"><div class="hero-media"><div class="hero-fallback"></div> <div class="hero-grid"></div> <div class="hero-overlay"></div></div> <div class="hero-corners"></div> <div class="hero-readout"><span>REC</span> <span class="rec-dot"></span> <span>48.218° N · 16.392° E</span></div> <div class="hero-bottom-left"><a href="#booking" class="sv-btn"><span>${escape_html(t.hero.cta)}</span> <span class="arrow"></span></a> <div class="hero-eyebrow"><span class="dot"></span> <span>${escape_html(t.hero.tag)}</span></div></div> <div class="scroll-cue"><span>Scroll</span> <span class="bar"></span></div></section>`);
  });
}
function News($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const loc = useLocale();
    const { t, lt } = loc;
    let newsData = [];
    let expandedId = null;
    const tagTypes = ["event", "set", "workshop", ""];
    function formatDate(d) {
      return new Date(d).toLocaleDateString(loc.locale === "de" ? "de-DE" : "en-US", { day: "numeric", month: "long", year: "numeric" });
    }
    $$renderer2.push(`<section class="sv-news vh" id="news"><div class="vh-inner"><div class="section-head"><div><div class="eyebrow">${escape_html(t.newsDesign.eyebrow)}</div> <h2>${escape_html(t.newsDesign.h)}</h2></div> <div class="s-meta">${escape_html(t.newsDesign.meta)}</div></div> `);
    if (newsData.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class("news-row", void 0, { "has-expanded": expandedId !== null })}><!--[-->`);
      const each_array = ensure_array_like(newsData);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let item = each_array[i];
        const tagClass = tagTypes[i % tagTypes.length];
        $$renderer2.push(`<article${attr_class("news-card", void 0, { "expanded": expandedId === item.id })}><button class="news-toggle"${attr("aria-expanded", expandedId === item.id)}><span${attr_class(`news-tag ${stringify(tagClass)}`)}>${escape_html(tagClass || "News")}</span> <span class="news-date">${escape_html(formatDate(item.created))}</span> <h3>${escape_html(lt(item.title))}</h3> <span class="news-plus" aria-hidden="true"></span></button> <div class="news-body"><p>${escape_html(lt(item.description))}</p></div></article>`);
      }
      $$renderer2.push(`<!--]--></div>`);
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
    const THEMES = ["theme-cyberpunk", "theme-japanese", "theme-hospital"];
    const INSPIRED = {
      0: ["Edgerunners", "Ghost in the Shell", "Akira", "Blade Runner"],
      1: ["Demon Slayer", "Genshin Impact", "Inuyasha", "Mononoke"],
      2: ["Silent Hill", "Resident Evil", "SCP", "Junji Ito"]
    };
    const ANNOTATIONS = [
      { tl: "ISO 800 · 24mm · f/1.8", br: "1/60s · WB 3200K" },
      { tl: "ISO 200 · 50mm · f/2.0", br: "1/125s · WB 5600K" },
      { tl: "ISO 1600 · 35mm · f/1.4", br: "1/40s · WB 4200K" }
    ];
    function theme(i) {
      return THEMES[i % THEMES.length];
    }
    function inspired(i) {
      return INSPIRED[i % 3];
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
        const img = getImg(studio);
        $$renderer2.push(`<article${attr_class(`set-card ${stringify(theme(i))}`)}><a${attr("href", `#set-${stringify(studio.id)}`)} class="set-card-link"${attr("aria-label", lt(studio.title))}></a> <div class="sc-frame"><div class="sc-img-clip"><div class="sc-img"${attr_style(img ? `background-image: url(${img})` : "")}></div> <div class="sc-scrim"></div></div> <div class="sc-title-overlay"><h3>${escape_html(lt(studio.title))}</h3></div> <div class="annot-corner tl"></div> <div class="annot-corner tr"></div> <div class="annot-corner bl"></div> <div class="annot-corner br"></div></div> <div class="sc-label"><div class="sc-num">SET / ${escape_html(padNum(i + 1))}${escape_html(i === studios.length - 1 && studios.length > 1 ? " · NEW" : "")}</div></div></article>`);
      }
      $$renderer2.push(`<!--]--></div></div></section> <!--[-->`);
      const each_array_1 = ensure_array_like(studios);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let studio = each_array_1[i];
        const img = getImg(studio);
        const a = annot(i);
        const equipment = getEquipmentItems(studio);
        const isReverse = i % 2 === 1;
        const isNew = i === studios.length - 1 && studios.length > 1;
        $$renderer2.push(`<section class="sv-set-detail vh"${attr("id", `set-${stringify(studio.id)}`)}><div class="vh-inner"><article${attr_class(`set-detail ${isReverse ? "reverse" : ""}`)}><div${attr_class(`sdm ${stringify(theme(i))}`)}><div class="sdm-img"${attr_style(img ? `background-image: url(${img})` : "")}></div> <div class="annot annot-tl">${escape_html(a.tl)}</div> <div class="annot annot-tr"><span class="dot-mag"></span> REC · 24P</div> <div class="annot annot-bl">// SET ${escape_html(padNum(i + 1))} · ${escape_html(lt(studio.title).toUpperCase())}</div> <div class="annot annot-br">⟶ ${escape_html(a.br)}</div> <div class="annot-corner tl"></div> <div class="annot-corner tr"></div> <div class="annot-corner bl"></div> <div class="annot-corner br"></div> `);
        if (isNew) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="badge-new">NEW</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="sdc"><div class="set-num-bg" aria-hidden="true">${escape_html(padNum(i + 1))}</div> <div class="set-num-glow" aria-hidden="true">${escape_html(padNum(i + 1))}</div> <a href="#sets" class="set-back"><span class="set-back-arrow"></span> <span>${escape_html(t.setsDesign.back)}</span></a> <div class="sdh"><div class="sd-num">SET / ${escape_html(padNum(i + 1))} · ${escape_html(isNew ? "NEW" : "ACTIVE")}</div> <h3>${escape_html(lt(studio.title))}</h3> <p class="sd-lead">${escape_html(lt(studio.description))}</p></div> `);
        if (equipment.length > 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="sd-grid"><!--[-->`);
          const each_array_2 = ensure_array_like(equipment);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let item = each_array_2[$$index_1];
            $$renderer2.push(`<div class="sd-kv"><span class="k">Equipment</span> <span class="v">${escape_html(item)}</span></div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="inspired-by"><div class="ib-label">${escape_html(t.setsDesign.ib)}</div> <div class="ib-chips"><!--[-->`);
        const each_array_3 = ensure_array_like(inspired(i));
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let chip = each_array_3[$$index_2];
          $$renderer2.push(`<span>${escape_html(chip)}</span>`);
        }
        $$renderer2.push(`<!--]--></div></div> <div class="sd-cta-row"><a href="#booking" class="sv-btn"><span>${escape_html(t.setsDesign.cta)}</span> <span class="arrow"></span></a></div></div></article></div></section>`);
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
    const { t } = useLocale();
    const OSM_URL = "https://www.openstreetmap.org/export/embed.html?bbox=16.196%2C47.913%2C16.218%2C47.933&layer=mapnik&marker=47.923%2C16.207";
    $$renderer2.push(`<section class="sv-location vh" id="location"><div class="vh-inner"><div class="section-head"><div><div class="eyebrow">${escape_html(t.locationDesign.eyebrow)}</div> <h2>${escape_html(t.locationDesign.h)}</h2></div></div> <div class="location-grid"><div class="location-info"><div class="address-block"><div class="addr-label">${escape_html(t.locationDesign.label)}</div> <p>Mühlgasse 8<br/>2544 Leobersdorf<br/>Austria</p></div> <ul class="transit-list"><li><span class="pill u">U</span>${escape_html(t.locationDesign.transitU)}</li> <li><span class="pill s">S</span>${escape_html(t.locationDesign.transitS)}</li> <li><span class="pill p">P</span>${escape_html(t.locationDesign.transitP)}</li></ul></div> <div class="map-wrap"><div class="map-overlay"><span class="dot"></span> ${escape_html(t.locationDesign.overlay)}</div> <iframe${attr("src", OSM_URL)} title="ShutterVerse Studio Location" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen=""></iframe></div></div></div></section>`);
  });
}
function Team($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { t, lt, ltArr } = useLocale();
    let members = [];
    const safeUrl = (url) => /^https?:\/\//i.test(url) ? url : "";
    $$renderer2.push(`<section class="sv-about vh" id="about"><div class="vh-inner"><div class="about-layout"><div class="about-left"><div class="eyebrow">${escape_html(t.aboutDesign.eyebrow)}</div> <h2 class="about-h">${escape_html(t.aboutDesign.h1)}<br/> <span class="stroke">${escape_html(t.aboutDesign.h2)}</span><br/> ${escape_html(t.aboutDesign.h3)}</h2> <div class="about-meta">${escape_html(t.aboutDesign.meta)}</div></div> <div class="about-team">`);
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
    const { t } = useLocale();
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
    $$renderer2.push(`<!----> <section class="sv-booking" id="booking"><div class="booking-inner"><h2>${escape_html(t.bookingSection.h)}</h2> <p>${escape_html(t.bookingSection.p)}</p> <a href="https://booking.shutterverse.at" target="_blank" rel="noopener noreferrer" class="sv-btn"><span>${escape_html(t.bookingSection.cta)}</span> <span class="arrow"></span></a></div></section> `);
    Impressum($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
