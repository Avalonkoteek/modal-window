Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};
function noop() {}
function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement("div");
  }
  const wrap = document.createElement("div");
  wrap.classList.add("d-modal__footer");

  buttons.forEach((item) => {
    const $btn = document.createElement("button");
    $btn.textContent = item.text;
    $btn.classList.add("btn");
    $btn.classList.add(`btn-${item.type || "secondary"}`);
    $btn.onclick = item.handler || noop;

    wrap.appendChild($btn);
  });
  return wrap;
}

function _createModal(options) {
  const modal = document.createElement("div");
  modal.classList.add("d-modal");

  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="d-modal__overlay" data-close="true">
    <div class="d-modal__window" style="width:${options.width}">
      <div class="d-modal__header">
        <span class="d-modal__title">${options.title || "title"}</span>
        ${
          options.closable &&
          '<span data-close="true" class="d-modal__close">&times;</span>'
        }
      </div>
      <div class="d-modal__body" data-content>
    
        ${options.content || "<p>content</p>"}
       
      </div>
  
    </div>
  </div>
`
  );
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector("[data-content]"));
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return;
      }
      !closing && $modal.classList.add("open");
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = false;
      }, 400);
    },
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };
  $modal.addEventListener("click", listener);
  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector("[data-content]").innerHTML = html;
    },
  });
};
