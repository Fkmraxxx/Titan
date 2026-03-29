export function renderSoftkeys(container, keys) {
  container.innerHTML = keys
    .map(
      (key) =>
        `<button class="softkey" type="button"
          data-second="${key.second || ""}"
          data-alpha="${key.alpha || ""}"
        >${key.main}</button>`
    )
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
              if (key.type === "light") classes.push("key-light");
              if (key.type === "orange") classes.push("key-orange");
              if (key.size === "small") classes.push("key--small");
              if (key.width === "wide") classes.push("key--wide");
              return `
                <button
                  class="${classes.join(" ")}"
                  data-action="${key.action}"
                  data-value="${key.value || ""}"
                  data-second-action="${key.secondAction || ""}"
                  data-second-value="${key.secondValue || ""}"
                  data-alpha-action="${key.alphaAction || ""}"
                  data-alpha-value="${key.alphaValue || ""}"
                  type="button"
                >
                  <span class="key__second">${key.second || "&nbsp;"}</span>
                  <span class="key__alpha">${key.alpha || ""}</span>
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
