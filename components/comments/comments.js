const template = document.createElement("template");
template.innerHTML = `
<style>
  .comment-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

 
  .name {
    flex: 1;
    padding-right: 10px;
  }

  .name h4 {
    margin: 0;
    font-weight: bold;
  }

  .name p {
    margin: 0;
    font-size: 12px;
    color: #888;
  }

  .comment h2 {
    margin: 0;
    font-size: 14px;
  }
</style>

<div class="comment-card">
    <div class="name">
        <h4></h4>
        <p></p>
    </div>
    <div class="comment">
        <h2></h2>
    </div>
</div>
`;

export default class CommentCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  setData(data) {
    this.shadowRoot.querySelector("h4").textContent = data.name.toUpperCase();
    this.shadowRoot.querySelector("p").textContent = data.email;
    this.shadowRoot.querySelector("h2").textContent = data.body;
  }
}

customElements.define("comment-card", CommentCard);
