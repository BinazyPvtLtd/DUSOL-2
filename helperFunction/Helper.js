
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