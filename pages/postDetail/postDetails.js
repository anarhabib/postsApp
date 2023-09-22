import CommentCard from "../../components/comments/comments";

const template = document.createElement("template");
template.innerHTML = `
<style>
.post-detail header{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
#createNew ,#allPosts{
  padding:10px 20px;
  border:none;
  cursor:pointer;
  border-radius:5px;
  transition:.3s;
}
#createNew:hover {
  background-color: #33b864;
}

#allPosts:hover {
  background-color: yellow;
}
.post-detail {
  width: 70%;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

h4 {
  font-size: 18px;
  margin: 5px 0;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

.comments-container {
  margin-top: 20px;
}
</style>
<div class="post-detail">
<header>
    <div class="text">
        <h2>Posts</h2>
    </div>
    <div class="create">
    <button id="allPosts">All Posts</button>
        <button id="createNew">Create</button>
    </div>
</header>
<hr>
    <h2>Title:</h2>
    <h4></h4>
    </br>
    <p></p>
    <h2>Comments</h2>
    <div class="comments-container">
    </div>
</div>
`;

export default class PostDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.commentContainer = this.shadowRoot.querySelector(
      ".comments-container"
    );
    this.createBtn = this.shadowRoot.querySelector("#createNew");
    this.allPostBtn = this.shadowRoot.querySelector("#allPosts");

    const { id, title } = this.getIdFromQueryString();
    this.shadowRoot.querySelector("h4").textContent = title.toUpperCase();
    this.fetchComments(id);

    this.createBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      history.pushState(null, null, "/create");
      window.dispatchEvent(new Event("popstate"));
    });

    this.allPostBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      history.pushState(null, null, "/");
      window.dispatchEvent(new Event("popstate"));
    });
  }
  getIdFromQueryString() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const title = queryParams.get("title");
    return { id, title };
  }

  async fetchComments(id) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const comments = await response.json();
      comments.forEach((comment) => {
        const commentCard = new CommentCard();
        commentCard.setData(comment);
        this.commentContainer.appendChild(commentCard);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
