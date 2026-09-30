(function () {
  var dataEl = document.getElementById("yacht-galleries");
  var dialog = document.getElementById("yacht-lightbox");
  if (!dataEl || !dialog || typeof dialog.showModal !== "function") return;

  var galleries;
  try { galleries = JSON.parse(dataEl.textContent); } catch (e) { return; }

  var img = dialog.querySelector(".lightbox-photo");
  var title = dialog.querySelector(".lightbox-title");
  var count = dialog.querySelector(".lightbox-count");
  var prev = dialog.querySelector(".lightbox-prev");
  var next = dialog.querySelector(".lightbox-next");
  var closeBtn = dialog.querySelector(".lightbox-close");
  var list = [];
  var index = 0;
  var opener = null;
  var touchX = null;

  function show(i) {
    if (!list.length) return;
    index = (i + list.length) % list.length;
    var item = list[index];
    img.alt = item.alt;
    if (img.getAttribute("src") !== item.src) img.src = item.src;
    title.textContent = item.name;
    count.textContent = "Photo " + (index + 1) + " of " + list.length;
    dialog.setAttribute("aria-label", "Photos of " + item.name);
  }

  function openGallery(yacht, button) {
    list = galleries[yacht] || [];
    if (!list.length) return;
    opener = button;
    show(0);
    if (!dialog.open) dialog.showModal();
  }

  document.querySelectorAll(".photo-open").forEach(function (button) {
    button.addEventListener("click", function () {
      openGallery(button.getAttribute("data-yacht"), button);
    });
  });

  closeBtn.addEventListener("click", function () { dialog.close(); });
  prev.addEventListener("click", function () { show(index - 1); });
  next.addEventListener("click", function () { show(index + 1); });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.classList.contains("lightbox-frame")) dialog.close();
  });

  dialog.addEventListener("close", function () {
    img.removeAttribute("src");
    if (opener && typeof opener.focus === "function") opener.focus();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    }
  });

  dialog.addEventListener("touchstart", function (event) {
    if (!event.changedTouches || !event.changedTouches.length) return;
    touchX = event.changedTouches[0].clientX;
  }, { passive: true });

  dialog.addEventListener("touchend", function (event) {
    if (touchX == null || !event.changedTouches || !event.changedTouches.length) return;
    var dx = event.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) < 48) return;
    show(dx > 0 ? index - 1 : index + 1);
  }, { passive: true });
})();
