/**
 *
 *  fly web app
 *  web starter kit using fly.js
 */

import browserSync from 'browser-sync'
const reload = browserSync.reload

/* ***************************************************
 * task sequence
 * **************************************************/

// Build all staff
export default function* () {
  yield this.start(["clean", "copy"])
}

// Watch files for changes & reload
export function* serve() {
  yield this.start(["default", "_serve", "_watch"])
}

/* ***************************************************
 * tasks
 * **************************************************/

// Copy all files at the root level (app)
export function* copy() {
  yield this.
    source([
      "app/**/*.html",
      "app/scripts/**/*.js"
    ])
    .target("dist/")
}

// Clean output directory
export function* clean() {
  yield this.clear(["dist/{*, !^\.*}"]);
}

// Reload browser
export function* refresh() {
  reload()
}

// Launch loacl serve at develop directory
export function* _serve() {
  browserSync({
    notify: false,
    logPrefix: ' ✈ ',
    server: ['app']
  });
}

// Watch files for changes
export function* _watch() {
  yield this.watch(["app/**/*.html", "app/scripts/**/*.js"], "refresh")
}
