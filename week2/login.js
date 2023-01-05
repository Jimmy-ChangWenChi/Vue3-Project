import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const user = {
    username:"",
    password:""
}

createApp({
    data(){
        return {
            user
        }
    },
    methods: {
        login(){
            const apiPath = "https://vue3-course-api.hexschool.io/v2/admin/signin";

            axios.post(apiPath,this.user)
            .then((res) => {
                console.log(this.user);
                const {token,expired} = res.data;
                document.cookie = `hexToken${token};expires=${new Date(expired)}; path=/`;
                window.location = `products.html`;
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
    }
}).mount("#app");