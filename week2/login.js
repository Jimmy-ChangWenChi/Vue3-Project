import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";


createApp({
    data(){
        return {
            user: {
                username:"",
                password:""
            },
            test:"test"
        }
    },
    methods: {
        login(){
            const apiPath = "https://vue3-course-api.hexschool.io/v2/admin/signin";

            axios.post(apiPath,this.user)
            .then((res) => {
                console.log("success");
                const { token,expired } = res.data;
                console.log(token, expired);
                document.cookie = `JimmyToken=${token};expires=${new Date(expired)}; `;
                window.location = `products.html`;
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
    }
}).mount("#app");