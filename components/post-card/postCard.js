const template = document.createElement("template");
template.innerHTML = `
<style>
  .card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    cursor:pointer;
    transition:.3s;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .card:hover{
    transform:scale(1.05);
    background-color: #f0f0f0;
  }
  #delBtn{
    border:none;
    padding:10px;
    cursor:pointer;
    transition:.3s;
    border-radius:5px;
  }
  #delBtn:hover{
    background-color:red;
  }
</style>
<div class="card">
    <div class="title">
        <h2>Title</h2>
        <h4></h4>
    </div>
    <div class="remove-button">
        <button id="delBtn">X</button>
    </div>
</div>
`;

export default class PostCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.delBtn = this.shadowRoot.querySelector("#delBtn");

    this.addEventListener("click", (e) => {
      if (e.target !== this.delBtn) {
        e.stopPropagation();
        const id = this.getAttribute("data-id");
        const title = this.getAttribute("data-title");
        history.pushState(null, null, `/details?id=${id}&title=${title}`);
        window.dispatchEvent(new Event("popstate"));
      }
    });

    this.delBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = this.getAttribute("data-id");
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          this.remove();
          console.log("Post deleted!");
        } else {
          alert("Something went wrong!");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  setData(data) {
    this.shadowRoot.querySelector("h4").textContent = data.title.toUpperCase();
    this.setAttribute("data-id", data.id);
    this.setAttribute("data-title", data.title);
  }
}

customElements.define("post-card", PostCard);
