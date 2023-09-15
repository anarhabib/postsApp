const template = document.createElement("template");
template.innerHTML = `
<style>
</style>

<div class="comment-card>
    <div class="name>
        <h4></h4>
        <p></p>
    </div>
    <div class="comment>
        <h2></h2>
    </div>
</div>
`

export default class CommentCard extends HTMLElement {
    constructor(){
        super();

        this.attachShadow({mode:"open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
    }

    setData(data){
        console.log(data);
        // this.shadowRoot.querySelector("h4").textContent =  data.name.toUpperCase();
        // this.shadowRoot.querySelector("p").textContent = data.email;
        // this.shadowRoot.querySelector("h2").textContent =  data.body;
    }
}

customElements.define("comment-card", CommentCard);

