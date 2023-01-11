import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = {
    data(){
        return {
            apiUrl:"https://vue3-course-api.hexschool.io/v2",
            path:"jimmychang",
            products:[],
            tempProduct:{}
        }
    },
    methods:{
        checkAdmin(){
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
            .then(() =>{
                this.getData();
            })
            .catch((err)=>{
                alert(err.response.data.message);
                window.location = 'login.html';
            })
        },
        getData(){
            const url = `${this.apiUrl}/api/${this.path}/products/all`;
            axios.get(url)
            .then((res) =>{
                this.products = res.data.products;
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        }

    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)JimmyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        const productModal = document.getElementById("#productModal");
        

    }
}

createApp(app).mount("#app");