/* =====================================================================
   CONFIGURATION — edit values here. Everything marked REPLACE needs your info.
   Paths are relative so they work on GitHub Pages. To use hosted videos,
   put a full https:// URL in any `src` field.
   ===================================================================== */
/* ---------- GOOGLE DRIVE VIDEO LINKS — PASTE YOUR 10 LINKS HERE ----------
   In Google Drive: right-click the video > Share > General access > "Anyone with the link" (Viewer)
   > Copy link. Paste it between the quotes. Any Drive link format works, e.g.
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   Leave "" to fall back to the local file in assets/videos/. */
const DRIVE_SHORT = [
  "https://drive.google.com/file/d/10a3i5dqpLWuTYMVDpkDJalhBAktJGQvz/view?usp=sharing",  // 01
  "https://drive.google.com/file/d/13QdxNxRv6ukZcpczsaQYfiSTlibQtUwZ/view?usp=sharing",  // 02
  "https://drive.google.com/file/d/1oY0S-VB1AfjoRMkU4tTgwNN0C1iURuT1/view?usp=sharing",  // 03
  "https://drive.google.com/file/d/1Aes6UJCvuGjQfvn1LqXYEM6OCytF5aWx/view?usp=sharing",  // 04
  "https://drive.google.com/file/d/1TPiFDvoeD_40df2WV23dXLfE_44ZJBFa/view?usp=sharing",  // 05
  "https://drive.google.com/file/d/12LcFQB5W2IdBEH_Nkmi0etBTfRYuIAYN/view?usp=sharing",  // 06
  "https://drive.google.com/file/d/1IFQTQIh0_G_y_6c2zqh4rBkor6F5JfCW/view?usp=sharing",  // 07
  "https://drive.google.com/file/d/1JEEJGjIHnsXKDD8bUNC2bUmlWtUED_93/view?usp=sharing",  // 08
  "https://drive.google.com/file/d/1fzmGS4Kb2FAy8DFNJxiaJy7WKoxAFEYG/view?usp=sharing",  // 09
];
const DRIVE_LONG = "https://drive.google.com/file/d/1idsPCONjycyHBnvFfqWhMj70ScvYMS8a/view?usp=sharing";   // long-form video

const CONFIG = {
  name: "Charlie Locep",
  profession: "Video Editor",

  hero: {
    label: "VIDEO EDITOR · CREATIVE STORYTELLER",
    title: "Turning Raw Footage Into Stories Worth Watching",
    text: "I'm Charlie Locep, a video editor passionate about creating engaging visual stories through thoughtful editing, compelling pacing, and impactful details.",
    image: "assets/images/hero-visual 3.png",
    imageAlt: "Featured frame from Charlie Locep's video editing work",
  },

  // 9 short-form videos (9:16). Each card shows its poster image (upload to assets/images/).
  shortForm: Array.from({ length: 9 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      title: `Project ${n}`,                       // REPLACE with your own titles if you like
      src: DRIVE_SHORT[i] || `assets/videos/shortform/shortform-${n}.mp4`,
      poster: `assets/images/shortform-${n}.png`,   // 9:16 thumbnail you upload
    };
  }),

  longForm: {
    src: DRIVE_LONG || "assets/videos/longform/longform-01.mp4",
    poster: "assets/images/longform-poster.png",
  },

  youtube: {
    image: "assets/images/youtube-channel.png",
    url: "https://www.youtube.com/@wildline_YT",       // REPLACE e.g. https://www.youtube.com/@channelname
    channelName: "Wild Line",                                // optional
  },

  // 3 software images (PNG, transparent OK). REPLACE the names with the software you use.
  software: [
    { image: "assets/images/software-01.webp", name: "Premiere Pro" },
    { image: "assets/images/software-02.webp", name: "CapCut" },
    { image: "assets/images/software-03.webp", name: "After Effects" },
  ],

  workspace: {
    image: "assets/images/workspace.jpg",
    alt: "Charlie Locep's video editing workspace",
    
    // REPLACE the placeholder descriptions with your real details.
    features: [
      { icon: "monitor",  title: "Monitor",            text: "MSI MAG 255F E20" },
      { icon: "cpu",      title: "CPU and GPU",    text: "i5 14400F Geforce Rtx 5060" },
      { icon: "home",     title: "RAM and SSD", text: "16Gb 1TB Nvme M.2"},
      { icon: "layers",   title: "Wifi Speed",text: "100mbps download and upload"}
    ],
  },

  timeline: {
    image: "assets/images/premiere-timeline.png",
    alt: "Screenshot of Charlie Locep's Adobe Premiere Pro editing timeline",
    caption: "A look inside my editing process.",
  },

  // ---------- CONTACT — REPLACE all three ----------
  contact: {
    discordUrl: "https://discord.com/users/1324736638399811614",
    email: "charlielocep@gmail.com",
    emailSubject: "Video Editing Project Inquiry",
    whatsappNumber: "https://wa.me/639954016613",   // international format, digits only, e.g. 639171234567
    whatsappMessage: "Hi Charlie! I'm interested in your video editing services.",
    // Optional: paths to official logo files (SVG/PNG). Leave "" to use the built-in icons.
    logos: { discord: "", gmail: "", whatsapp: "" },
  },
};

/* =====================================================================
   APP CODE — no need to edit below
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const isPlaceholder = (v) => !v || /REPLACE/i.test(v);

/** Google Drive helpers: returns the file ID for any Drive share link, else null. */
const driveId = (u) => { const m = String(u).match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]{10,})/); return m ? m[1] : null; };
const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview`;

/** Image with graceful placeholder if the file is missing. */
function img(src, alt, eager) {
  const i = new Image();
  i.alt = alt; i.src = src; i.decoding = "async";
  if (!eager) i.loading = "lazy";
  i.addEventListener("error", () => { const p = el("div", "ph"); p.setAttribute("role", "img"); p.setAttribute("aria-label", alt + " (image not added yet)"); p.textContent = "Add image: " + src.split("/").pop(); i.replaceWith(p); }, { once: true });
  return i;
}

/* ---------- Scroll lock + dialogs ---------- */
const lock = (on) => document.body.classList.toggle("lock", on);
function wireDialog(d, onClose) {
  d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); });
  d.addEventListener("close", () => { lock(false); onClose && onClose(); if (d._opener) d._opener.focus(); });
}
const vd = $("#vd"), vv = $("#vd-v"), vf = $("#vd-f"), verr = $("#vd-err"), lb = $("#lb");
wireDialog(vd, () => { vv.pause(); vv.removeAttribute("src"); vv.load(); vf.src = "about:blank"; vf.hidden = true; verr.hidden = true; });
wireDialog(lb, () => { $("#lb-i").removeAttribute("src"); });
vv.addEventListener("error", () => { verr.textContent = "This video could not be loaded: " + vv.dataset.src; verr.hidden = false; });

function openVideo(src, opener) {
  const id = driveId(src);
  verr.hidden = true; vd.classList.add("v916"); vd._opener = opener;
  if (id) { vv.hidden = true; vf.hidden = false; vf.src = drivePreview(id); }          // Google Drive player
  else { vf.hidden = true; vv.hidden = false; vv.dataset.src = src; vv.src = src; }     // native MP4
  lock(true); vd.showModal();
  if (!id) { const p = vv.play(); if (p) p.catch(() => {}); }
}
function openImage(src, alt, opener) {
  const i = $("#lb-i"); i.src = src; i.alt = alt; lb._opener = opener; lock(true); lb.showModal();
}

/* ---------- Text content ---------- */
document.title = `${CONFIG.name} — ${CONFIG.profession}`;
document.querySelectorAll("[data-cfg=name]").forEach((n) => (n.textContent = CONFIG.name));
$("#h-label").textContent = CONFIG.hero.label;
$("#h-title").textContent = CONFIG.hero.title;
$("#h-text").textContent = CONFIG.hero.text;
$("#h-main").append(img(CONFIG.hero.image, CONFIG.hero.imageAlt, true));
$("#year").textContent = new Date().getFullYear();

/* ---------- Short-form grid ---------- */
const short = $("#short");
CONFIG.shortForm.forEach((v, i) => {
  const b = el("button", "vcard");
  b.type = "button";
  b.setAttribute("aria-label", `Play ${v.title}`);
  const pi = img(v.poster, v.title + " thumbnail");
  pi.addEventListener("error", () => {}, { once: true });
  b.append(pi);
  b.append(el("span", "play"));
  b.append(el("span", "vcap", `<span>${esc(v.title)}</span><small>Watch Video</small>`));
  b.addEventListener("click", () => openVideo(v.src, b));
  short.append(b);
});

/* ---------- Long-form ---------- */
{
  const box = $("#long"), lf = CONFIG.longForm, id = driveId(lf.src);
  if (id) {
    // Google Drive: show poster + play button, load the Drive player only when clicked
    const play = el("button", "play"); play.type = "button"; play.setAttribute("aria-label", "Play long-form video");
    box.append(img(lf.poster, "Long-form video poster", false), play);
    play.addEventListener("click", () => {
      const f = el("iframe"); f.title = "Long-form video"; f.allow = "autoplay; fullscreen"; f.allowFullscreen = true; f.src = drivePreview(id);
      box.replaceChildren(f);
    });
  } else {
    const v = el("video"); v.controls = true; v.preload = "none"; v.playsInline = true; v.poster = lf.poster; v.src = lf.src;
    v.setAttribute("aria-label", "Long-form video");
    const ph = el("div", "ph", "Add poster: " + esc(lf.poster));
    const probe = new Image(); probe.onload = () => ph.remove(); probe.onerror = () => {}; probe.src = lf.poster;
    const play = el("button", "play"); play.type = "button"; play.setAttribute("aria-label", "Play long-form video");
    const err = el("p", "err"); err.hidden = true;
    play.addEventListener("click", () => v.play().catch(() => {}));
    v.addEventListener("play", () => { play.hidden = true; ph.remove(); });
    v.addEventListener("pause", () => { if (v.currentTime === 0) play.hidden = false; });
    v.addEventListener("error", () => { err.textContent = "Video not found: " + lf.src; err.hidden = false; play.hidden = true; });
    box.append(ph, v, play, err);
  }
}

/* ---------- YouTube ---------- */
{
  const y = CONFIG.youtube, ok = /^https:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)\//i.test(y.url);
  const a = el(ok ? "a" : "div", "ytc");
  const name = y.channelName ? ` — ${esc(y.channelName)}` : "";
  if (ok) { a.href = y.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.setAttribute("aria-label", "View YouTube Channel (opens in a new tab)"); }
  else { a.setAttribute("role", "link"); a.setAttribute("aria-disabled", "true"); }
  a.append(img(y.image, y.channelName ? y.channelName + " YouTube channel" : "YouTube channel I have edited for"));
  a.append(el("div", "bar", `<span>${ok ? "View YouTube Channel" + name : "Channel link not set yet. Add the URL in script.js (CONFIG.youtube.url)."}</span><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`));
  $("#yt").append(a);
}

/* ---------- Software ---------- */
CONFIG.software.forEach((s) => {
  const c = el("div", "tool"), im = el("div", "im");
  im.append(img(s.image, s.name + " logo")); c.append(im, el("h3", "", esc(s.name))); $("#tools").append(c);
});

/* ---------- Workspace ---------- */
{
  const w = CONFIG.workspace;
  if (w.intro) $("#ws-text").textContent = w.intro;
  const b = el("button", "zoom"); b.type = "button"; b.setAttribute("aria-label", "Zoom workspace photo");
  b.append(img(w.image, w.alt));
  b.addEventListener("click", () => { if (b.querySelector("img")) openImage(w.image, w.alt, b); });
  $("#ws-img").append(b);
  const icons = {
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',
  };
  w.features.forEach((f, i) => $("#ws-feat").append(el("div", "fc",
    `<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[f.icon] || icons.layers}</svg><b>${String(i + 1).padStart(2, "0")} — ${esc(f.title)}</b><p>${esc(f.text)}</p>`)));
}

/* ---------- Premiere timeline ---------- */
{
  const t = CONFIG.timeline, b = el("button", "zoom"); b.type = "button"; b.setAttribute("aria-label", "View timeline screenshot larger");
  b.append(img(t.image, t.alt));
  b.addEventListener("click", () => { if (b.querySelector("img")) openImage(t.image, t.alt, b); });
  $("#tlfig").append(b, el("figcaption", "", esc(t.caption)));
}

/* ---------- Contact ---------- */
{
  const c = CONFIG.contact, digits = String(c.whatsappNumber).replace(/\D/g, "");
  const icons = {
    discord: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="12" fill="#5865F2"/><path fill="#fff" d="M32 14a22 22 0 0 0-5-1.5l-.7 1.4a20 20 0 0 0-4.6 0L21 12.500A22 22 0 0 0 16 14c-3.200 4.700-4 9.300-3.600 13.800a22 22 0 0 0 6.100 3l1.300-2.100-2-1 .5-.4a15.500 15.500 0 0 0 13.400 0l.5.400-2 1 1.300 2.100a22 22 0 0 0 6.100-3C36.100 22 34.800 17.500 32 14z"/><circle cx="20" cy="24.500" r="2.200" fill="#5865F2"/><circle cx="28" cy="24.500" r="2.200" fill="#5865F2"/></svg>',
    gmail: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="9" width="40" height="30" rx="4" fill="#fff"/><path d="M4 13l20 15 20-15" fill="none" stroke="#EA4335" stroke-width="5"/><path d="M4 39V13M44 39V13" stroke="#4285F4" stroke-width="5"/></svg>',
    whatsapp: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="#25D366"/><path fill="#fff" d="M16 14c-1 1-2 3-1.500 5.500 1 4 5.500 9 10.500 11 2.200.9 4 .3 5-1l.5-2-4-1.800-1.500 1.500c-2-.8-4-2.800-4.800-4.800l1.400-1.400-1.800-4z"/></svg>',
  };
  const cards = [
    { key: "discord", title: "Discord", text: "Let's connect and discuss your project.", cta: "Open Discord", ok: /^https:\/\//i.test(c.discordUrl) && !isPlaceholder(c.discordUrl), href: c.discordUrl, ext: true, miss: "CONFIG.contact.discordUrl" },
    { key: "gmail", title: "Email Me", text: "Send me the details of your project.", cta: "Send an email", ok: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.email) && !isPlaceholder(c.email), href: `mailto:${c.email}?subject=${encodeURIComponent(c.emailSubject)}`, ext: false, miss: "CONFIG.contact.email" },
    { key: "whatsapp", title: "WhatsApp", text: "Message me directly about your project.", cta: "Start a chat", ok: !isPlaceholder(c.whatsappNumber) && digits.length >= 7 && digits.length <= 15, href: `https://wa.me/${digits}?text=${encodeURIComponent(c.whatsappMessage)}`, ext: true, miss: "CONFIG.contact.whatsappNumber" },
  ];
  const foot = $("#foot-links");
  cards.forEach((k) => {
    const a = el(k.ok ? "a" : "div", "cc");
    const logo = c.logos[k.key] ? `<img src="${esc(c.logos[k.key])}" alt="" width="48" height="48">` : icons[k.key];
    a.innerHTML = `${logo}<h3>${k.title}</h3><p>${k.text}</p><small>${k.ok ? k.cta : "Not set up yet. Add it in script.js (" + k.miss + ")"}</small>`;
    if (k.ok) { a.href = k.href; if (k.ext) { a.target = "_blank"; a.rel = "noopener noreferrer"; } a.setAttribute("aria-label", `${k.title}: ${k.cta}`); const f = el("a", "", k.title); f.href = k.href; if (k.ext) { f.target = "_blank"; f.rel = "noopener noreferrer"; } foot.append(f); }
    else { a.setAttribute("role", "link"); a.setAttribute("aria-disabled", "true"); }
    $("#cards").append(a);
  });
}

/* ---------- Navigation ---------- */
{
  const burger = $("#burger"), menu = $("#menu");
  const setMenu = (o) => { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); } });
  matchMedia("(min-width:901px)").addEventListener("change", () => setMenu(false));

  const links = [...menu.querySelectorAll("a:not(.btn)")];
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((l) => { const s = $(l.getAttribute("href")); if (s) io.observe(s); });
}
