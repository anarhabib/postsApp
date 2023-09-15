const Router = {
    routes: [],

    addRoute(path , page){
        this.routes.push({path , page});
    },

    init(){
        const onRouteChange = () => {
            const currentPath = window.location.pathname;
            const route = this.routes.find((r)=> r.path === currentPath);
            if(route){
                const page = new route.page();
                const root = document.getElementById("root");
                root.innerHTML = "";
                root.appendChild(page);
            }
        }
        const handlePopstate = () => {
            onRouteChange();
          };
        window.addEventListener("load" , handlePopstate);
        window.addEventListener("popstate" , handlePopstate);

        onRouteChange();
    },

    navigate(path){
        window.history.pushState(null,null,path)
        this.init();
    }

}

export default Router;