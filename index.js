import './styles/main.css'
import Router from "./route";
import PostsPage from "./pages/posts";
import PostDetails from "./pages/postDetail";

const routes = [
  { path: "/", page: PostsPage },
  { path: "/post-details", page: PostDetails },
];

const router = new Router(routes);
router.init();