import './styles/main.css'
import PostsPage from './pages/posts/index.js'
import PostDetails from './pages/postDetail/index.js';
import Router from './route'

Router.init();

window.customElements.define("posts-page" , PostsPage);
window.customElements.define("post-details" , PostDetails);