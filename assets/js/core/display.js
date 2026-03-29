export function renderSoftkeys(container, keys) {
  container.innerHTML = keys
    .map((label) => `<button class="softkey" type="button">${label}</button>`)
    .join("");
}

export function renderKeypad(container, rows) {
  container.innerHTML = rows
    .map(
      (row) => `
        <div class="key-row">
          ${row
            .map((key) => {
              const classes = ["key"];
              if (key.type === "dark") classes.push("key-dark");
              if (key.type === "accent") classes.push("key-accent");
              if (key.size === "small") classes.push("key--small");
              if (key.width === "wide") classes.push("key--wide");
              return `
                <button
                  class="${classes.join(" ")}"
                  data-action="${key.action}"
                  data-value="${key.value || ""}"
                  type="button"
                >
                  <span class="key__sub">${key.sub || "&nbsp;"}</span>
                  <span class="key__main">${key.main}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      `
    )
    .join("");
}

export function setStatus(modeEl, statusEl, ledEl, mode, status, powered) {
  modeEl.textContent = mode;
  statusEl.textContent = status;
  ledEl.classList.toggle("off", !powered);
}
