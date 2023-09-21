export function route(path, callback) {
  if (window.location.pathname === path) {
    callback();
  }

  window.addEventListener("popstate", () => {
    if (window.location.pathname === path) {
      callback();
    }
  });
}
