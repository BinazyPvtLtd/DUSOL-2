import DOMPurify from "isomorphic-dompurify";

// Embeds are only ever legitimate video players in this app's CMS content
// (course/blog rich text). Restricting iframe src to these hosts stops a
// compromised/malicious CMS edit from injecting an arbitrary phishing or
// clickjacking iframe via sanitizeCmsHtml.
const ALLOWED_IFRAME_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "player.vimeo.com",
];

const isAllowedIframeSrc = (src) => {
  try {
    const url = new URL(src, "https://invalid.example");
    return url.protocol === "https:" && ALLOWED_IFRAME_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
};

DOMPurify.addHook("uponSanitizeElement", (node, data) => {
  if (data.tagName === "iframe") {
    const src = node.getAttribute && node.getAttribute("src");
    if (!src || !isAllowedIframeSrc(src)) {
      node.remove();
    }
  }
});

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    "p", "br", "span", "div",
    "strong", "b", "em", "i", "u", "s", "strike",
    "h1", "h2", "h3", "h4",
    "ul", "ol", "li",
    "blockquote", "pre", "code",
    "a",
    "table", "thead", "tbody", "tr", "th", "td",
    "img",
    "iframe",
  ],
  ALLOWED_ATTR: [
    "href", "target", "rel",
    "src", "alt", "width", "height",
    "scope", "class",
    "allow", "allowfullscreen", "frameborder", "title",
  ],
};

// Sanitizes CMS/RichEditor-authored HTML (course, blog, specialization,
// homepage, student-zone, FAQ fields, ...) before it is ever passed to
// dangerouslySetInnerHTML. Allowlist-based: only tags/attributes this app's
// rich-text CSS (globals.css .rich-content/.admission-content/etc.) and
// table-styling actually render are permitted — strips <script>, on*
// handlers, javascript:/data: URLs, and any tag outside that list.
// SSR-safe: isomorphic-dompurify runs on both server and client.
export const sanitizeCmsHtml = (html) => {
  if (!html) return "";
  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
};

//this funtion will return the youtube thumbnail from the youtube url
export const getYoutubeThumbnail = (url) => {
  if (!url) return "";

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);

  return match
    ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
    : "";
};

// Normalizes any <table> inside CMS-authored HTML (rich text fields) so it
// renders with the same look everywhere in the app: applies the shared
// `.info-table` class (see globals.css), guarantees semantic thead/tbody/
// th[scope=col] markup, and wraps the table in a `.table-scroll` container
// so it scrolls horizontally instead of overflowing on small screens.
// Browser-only (DOMParser); returns the input unchanged during SSR.
export const applyInfoTableStyling = (html) => {
  if (!html || typeof document === "undefined") return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.querySelectorAll("table").forEach((table) => {
    table.classList.add("info-table");

    if (!table.querySelector("thead")) {
      const firstRow = table.querySelector("tr");

      if (firstRow) {
        const thead = doc.createElement("thead");
        const headRow = doc.createElement("tr");

        firstRow.querySelectorAll("td, th").forEach((cell) => {
          const th = doc.createElement("th");
          th.setAttribute("scope", "col");
          th.innerHTML = cell.innerHTML;
          headRow.appendChild(th);
        });

        thead.appendChild(headRow);
        table.insertBefore(thead, table.firstChild);
        firstRow.remove();
      }
    }

    if (!table.querySelector("tbody")) {
      const tbody = doc.createElement("tbody");
      table.querySelectorAll(":scope > tr").forEach((row) => tbody.appendChild(row));
      table.appendChild(tbody);
    }

    if (!table.parentElement?.classList.contains("table-scroll")) {
      const wrapper = doc.createElement("div");
      wrapper.className = "table-scroll";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

  return doc.body.innerHTML;
};

// Unwraps <a> tags in CMS-authored HTML, keeping their text/inner markup but
// dropping the href/link behavior — so the content renders as plain text
// instead of a clickable link. All other formatting (p, strong, em, br, ...)
// is preserved. Browser-only (DOMParser); returns the input unchanged during SSR.
export const stripLinks = (html) => {
  if (!html || typeof document === "undefined") return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.querySelectorAll("a").forEach((anchor) => {
    const parent = anchor.parentNode;
    while (anchor.firstChild) {
      parent.insertBefore(anchor.firstChild, anchor);
    }
    parent.removeChild(anchor);
  });

  return doc.body.innerHTML;
};