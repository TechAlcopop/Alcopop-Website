/**
 * Controls the splash loader that is inlined in public/index.html.
 *
 * The loader is markup outside #root, so it is on screen from the first paint
 * — before the JS bundle has even been fetched. This module hides it again
 * once the page is genuinely ready to be looked at, which means all of:
 *
 *   - React has mounted and painted a frame
 *   - every render-blocking stylesheet and eagerly-loaded image has finished
 *     (the window "load" event, which also covers CSS background images such
 *     as the hero backdrop)
 *   - the web fonts have loaded, so text does not reflow after the reveal
 *   - the hero bottle artwork has decoded, including the second bottle the
 *     header rotates to a few seconds in
 *
 * Everything is capped by SAFETY_TIMEOUT_MS: on a bad connection a visitor
 * gets the site rather than an indefinite loader.
 */

// Hero artwork. These are the images the header shows straight away, so an
// empty slot here is exactly what the loader exists to prevent.
import zarsHero from "../assets/img/ZarsReserve.png";
import pipeHero from "../assets/img/pipemajor_headerimage.png";
import headerBackdrop from "../assets/img/header_background.jpg";
import logo from "../assets/images/Alcopop-logo.png";

const SAFETY_TIMEOUT_MS = 8000;
// Below this the loader reads as a flicker rather than a deliberate splash.
const MIN_VISIBLE_MS = 450;
const FADE_MS = 450;

const CRITICAL_IMAGES = [zarsHero, pipeHero, headerBackdrop, logo];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Resolves (never rejects) once an image has loaded or failed. */
const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // a broken asset must not hold the site hostage
    img.src = src;
    if (img.decode) {
      // Decoding up front means the reveal shows a painted image, not a blank
      // box that fills in a frame later.
      img.decode().then(resolve, resolve);
    }
  });

const windowLoaded = () =>
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((resolve) =>
        window.addEventListener("load", resolve, { once: true })
      );

const fontsLoaded = () =>
  document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();

/** Fades the splash out, then removes it and unlocks scrolling. */
const hideLoader = () => {
  document.documentElement.classList.remove("app-loading");

  const loader = document.getElementById("app-loader");
  if (!loader) return;

  loader.setAttribute("data-hidden", "true");
  setTimeout(() => loader.remove(), FADE_MS);
};

/**
 * Call once, right after the initial React render.
 * Safe to call when the loader markup is absent — it simply does nothing.
 */
export const revealWhenReady = () => {
  const shownAt = Date.now();

  const everythingReady = Promise.all([
    windowLoaded(),
    fontsLoaded(),
    ...CRITICAL_IMAGES.map(loadImage),
  ]);

  Promise.race([everythingReady, wait(SAFETY_TIMEOUT_MS)])
    .then(() => wait(Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt))))
    .then(hideLoader)
    .catch(hideLoader);
};

export default revealWhenReady;
