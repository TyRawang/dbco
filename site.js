/* Deboski & Co. site helpers.
   Mobile menu accessibility: Webflow IX3 runs the drawer animation; this script adds the
   parts IX3 leaves out — aria-expanded on the menu button, Escape to close, focus moved into
   the drawer and kept there while it is open, focus returned to the button on close — and a
   plain open/close fallback for when IX3 has not loaded, so phones always have navigation. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var button = document.querySelector('.nav_menu-button');
    var drawer = document.querySelector('.nav_drawer');
    var scrim = document.querySelector('.nav_scrim');
    var closeBtn = drawer && drawer.querySelector('.nav_drawer-close');
    if (!button || !drawer) return;

    var html = document.documentElement;
    var isOpen = false;
    var usedFallback = false;

    button.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-modal', 'true');

    function focusables() {
      return Array.prototype.filter.call(
        drawer.querySelectorAll('a[href], button:not([disabled])'),
        function (el) { return el.offsetWidth || el.offsetHeight; }
      );
    }

    function ix3Ready() { return html.classList.contains('w-mod-ix3'); }

    function fallbackShow(show) {
      // IX3 did not load: show or hide the drawer without animation
      html.classList.add('w-mod-ix3'); // lifts the inline rule that hides the drawer until IX3 is ready
      drawer.style.display = show ? 'flex' : 'none';
      drawer.style.transform = show ? 'none' : '';
      if (scrim) {
        scrim.style.display = show ? 'block' : 'none';
        scrim.style.opacity = show ? '1' : '0';
      }
    }

    function open() {
      if (isOpen) return;
      isOpen = true;
      button.setAttribute('aria-expanded', 'true');
      usedFallback = !ix3Ready();
      if (usedFallback) fallbackShow(true);
      // wait a frame so the drawer is displayed before moving focus into it
      requestAnimationFrame(function () {
        var first = drawer.querySelector('.nav_drawer-link') || focusables()[0];
        if (first) first.focus();
      });
    }

    function close(returnFocus) {
      if (!isOpen) return;
      isOpen = false;
      button.setAttribute('aria-expanded', 'false');
      if (usedFallback) fallbackShow(false);
      if (returnFocus !== false) button.focus();
    }

    button.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', function () { close(); });
    if (scrim) scrim.addEventListener('click', function () { close(); });
    // following a link navigates away; no need to pull focus back to the button
    Array.prototype.forEach.call(drawer.querySelectorAll('a[href]'), function (a) {
      a.addEventListener('click', function () { close(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        // clicking the close button lets IX3 play its closing animation
        if (closeBtn && !usedFallback) closeBtn.click(); else close();
        return;
      }
      if (e.key !== 'Tab') return;
      var items = focusables();
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!drawer.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    });

    // if the window grows past the mobile breakpoint while the drawer is open, reset the state
    window.matchMedia('(min-width: 992px)').addEventListener('change', function (m) {
      if (m.matches && isOpen) close(false);
    });
  });
})();
