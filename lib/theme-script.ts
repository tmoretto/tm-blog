// Inline script injected into <head> to apply dark mode before first paint.
// If you change this string, also update the hash in next.config.mjs.
export const themeScript = `(function(){
  var stored = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})()`
