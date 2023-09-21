import PostsPage from "./pages/posts/posts";
import PostDetails from "./pages/postDetail/postDetails";
import { route } from "./route";

window.customElements.define("posts-page", PostsPage);
window.customElements.define("post-details", PostDetails);

window.addEventListener("load", handleRouteChange);
window.addEventListener("popstate", handleRouteChange);

const appContainer = document.getElementById("root");

const routes = {
  "/": PostsPage,
  "/details": PostDetails,
};

function renderComponent(routePath) {
  const Component = routes[routePath];
  console.log(Component);

  if (Component) {
    appContainer.innerHTML = "";
    const componentInstance = new Component();
    appContainer.appendChild(componentInstance);
  } else {
    appContainer.innerHTML = "<p>Not found</p>";
  }
}

function handleRouteChange() {
  const currentPath = window.location.pathname;
  renderComponent(currentPath);
}

const initialRoute = window.location.pathname;
if (initialRoute === "/") {
  renderComponent(PostsPage);
} else if (initialRoute === "/details") {
  renderComponent(PostDetails);
}

route("/", () => renderComponent(PostsPage));
route("/details", () => renderComponent(PostDetails));
