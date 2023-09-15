class Router {
    constructor(routes) {
      this.routes = routes;
      this.root = document.getElementById("root");
    }
  
    navigate(path) {
      window.history.pushState(null, null, path);
      this.render();
    }
  
    render() {
      const currentPath = window.location.pathname;
      const route = this.routes.find((r) => r.path === currentPath);
      if (route) {
        this.root.innerHTML = "";
        const page = new route.page();
        this.root.appendChild(page);
      }
    }
  
    init() {
      window.addEventListener("popstate", () => {
        this.render();
      });
      this.render();
    }
  }
  
  export default Router;
  