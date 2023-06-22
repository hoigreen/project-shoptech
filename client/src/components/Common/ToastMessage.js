import React from 'react'

const Toast = ({ title = "", message = "", type = "info", duration = 3000 }) => {
    const main = document.getElementById("toast") || document.getElementById("toast-with-navbar");
    if (main) {
        const toast = document.createElement("div");

        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "ti-check-box",
            info: "ti-info",
            warning: "ti-close",
            error: "ti-close"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                  <div class="toast__icon">
                      <i class="${icon}"></i>
                  </div>
                  <div class="toast__body">
                      <h3 class="toast__title">${title}</h3>
                      <p class="toast__msg">${message}</p>
                  </div>
                  <div class="toast__close">
                      <i class="ti-close"></i>
                  </div>
              `;
        main.appendChild(toast);
    }
}


const ToastMessage = () => {
    return (
        <div id="toast"></div>
    )
}

export { Toast }
export default ToastMessage