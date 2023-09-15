import PostCard from "../../components/post-card";
import Router from '../../route';

const template = document.createElement("template");
template.innerHTML = `
<style>
.post-page{
    width:50%;
    margin:auto;
    margin-top:50px;
}
.post-page header{
    display:flex;
    justify-content:space-between;
    align-items:center;
}
#createNew{
    padding:10px 20px;
    border:none;
    cursor:pointer;
    border-radius:5px;
    transition:.3s;
}
#createNew:hover {
    background-color: #33b864;
}
</style>
<div class="post-page">
<header>
    <div class="text">
        <h2>Posts</h2>
    </div>
    <div class="create">
        <button id="createNew">Create</button>
    </div>
</header>
<hr>   
<div class="card-container"></div> 
</div>
`;


class PostsPage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));    
        this.cardContainer = this.shadowRoot.querySelector(".card-container");
        
        this.fetchData();

    }

    async fetchData(){
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            data.forEach(item => {
                const card= new PostCard();
                card.setData(item);
                this.cardContainer.appendChild(card);
            });
        }catch(err){
            console.log(err);
        }
    }

   
    
}

Router.init();
export default PostsPage;