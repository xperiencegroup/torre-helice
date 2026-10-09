document.addEventListener("DOMContentLoaded", function () {
  // No aplicar fullscreen-on-click dentro del panel admin.
  if (window.location.pathname.startsWith("/th-panel")) return;

  document.addEventListener("click", function () {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  });

  const fsElement = document.querySelector(".fs");
  if (fsElement) {
    fsElement.addEventListener("click", function (event) {
      event.stopPropagation();
      const elem = document.documentElement;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    });
  }
});