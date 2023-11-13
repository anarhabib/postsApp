import PostsPage from "./pages/posts/posts";
import PostDetails from "./pages/postDetail/postDetails";
import CreatePost from "./pages/newPost/createPost";

window.customElements.define("posts-page", PostsPage);
window.customElements.define("post-details", PostDetails);
window.customElements.define("create-post", CreatePost);

window.addEventListener("load", handleRouteChange);
window.addEventListener("popstate", handleRouteChange);

const appContainer = document.getElementById("root");

const routes = {
  "/": PostsPage,
  "/details": PostDetails,
  "/create": CreatePost,
};

function renderComponent(routePath) {
  const Component = routes[routePath];
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
} else if (initialRoute === "/create") {
  renderComponent(CreatePost);
}

route("/", () => renderComponent(PostsPage));
route("/details", () => renderComponent(PostDetails));
