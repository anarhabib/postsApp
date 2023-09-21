const template = document.createElement("template");
template.innerHTML = `
<style>
  .new-container {
    width: 50%;
    margin: auto;
    margin-top: 50px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }

  input[type="text"] {
    width: 98%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  #buttonContainer {
    display: flex;
    justify-content: space-between;
  }

  button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;
  }

  #createNew:hover {
    background-color: #33b864;
    color: white;
  }
  #cancel:hover {
    background-color: red;
    color: white;
  }
</style>
<div class="new-container">
  <label for="title">Title</label>
  <input type="text" id="title" />

  <label for="body">Body</label>
  <input type="text" id="body" />

  <div id="buttonContainer">
    <button id="createNew">Create</button>
    <button id="cancel">Cancel</button>
  </div>
</div>
`;

export default class CreatePost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.titleInput = this.shadowRoot.querySelector("#title");
    this.bodyInput = this.shadowRoot.querySelector("#body");
    this.createBtn = this.shadowRoot.querySelector("#createNew");
    this.cancelBtn = this.shadowRoot.querySelector("#cancel");

    this.createBtn.addEventListener("click", async () => {
      let data = {
        title: this.titleInput.value,
        body: this.bodyInput.value,
      };

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        if (response.ok) {
          console.log("Successuful!");
          this.titleInput.value = "";
          this.bodyInput.value = "";
        } else {
          console.log("Can not posted!");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
}
