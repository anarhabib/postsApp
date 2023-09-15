import CommentCard from "../../components/comments";

const template = document.createElement("template");
template.innerHTML = `
<style>
</style>
<div class="post-detail">
    <h2>Title:</h2>
    <h4></h4>
    </br>
    <p></p>
    <h2>Comments</h2>
    <div class="comments-container">
    </div>
</div>
`;


class PostDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.commentContainer = this.shadowRoot.querySelector(
      ".comments-container"
    );

    this.addEventListener("card-clicked", (e) => {
        const postId = e.detail.postId;
        console.log(postId);
        this.fetchComments(postId);
        this.fetchData(postId); 
      });
  }
  async fetchData(id) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  async fetchComments(id) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const comments = await response.json();
      console.log(comments);
      comments.forEach((comment) => {
        const card = new CommentCard();
        card.setData(comment);
        this.commentContainer.appendChild(card);
      });
    } catch (error) {
      console.log(error);
    }
  }
 }

export default PostDetails;
