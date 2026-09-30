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
  var lockedScroll = 0;

  function lockScroll() {
    lockedScroll = window.scrollY || document.documentElement.scrollTop || 0;
    var gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.classList.add("lightbox-open");
    document.body.style.top = "-" + lockedScroll + "px";
    if (gap > 0) document.body.style.paddingRight = gap + "px";
  }

  function unlockScroll() {
    var y = lockedScroll;
    document.body.classList.remove("lightbox-open");
    document.body.style.top = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, y);
    // Dialog focus return can scroll the page after this event. Put the saved position back.
    requestAnimationFrame(function () { window.scrollTo(0, y); });
  }

  function blockBackgroundScroll(event) {
    if (!dialog.open) return;
    event.preventDefault();
  }

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
    if (!dialog.open) {
      lockScroll();
      dialog.showModal();
    }
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
    unlockScroll();
    img.removeAttribute("src");
    if (opener && typeof opener.focus === "function") opener.focus({ preventScroll: true });
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    } else if (event.key === "PageDown" || event.key === "PageUp" || event.key === "Home" || event.key === "End" || event.key === " ") {
      event.preventDefault();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!dialog.open) return;
    if (event.key === "PageDown" || event.key === "PageUp" || event.key === "Home" || event.key === "End" || event.key === " ") {
      event.preventDefault();
    }
  });

  window.addEventListener("wheel", blockBackgroundScroll, { passive: false });
  window.addEventListener("touchmove", blockBackgroundScroll, { passive: false });

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
