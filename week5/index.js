import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
import productsModal from "./components/productsModal.js"

createApp({
    data(){
        return {
            products:[],
            apiUrl:"https://vue3-course-api.hexschool.io/v2",
            path:"jimmychang",

        }
    },
    methods:{
        getProducts() {
            const url = `${this.apiUrl}/api/${this.path}/products/all`;
            axios.get(url)
            .then((res)=>{
                console.log(res.data);
                this.products = res.data.products;
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        }

    },
    mounted(){
        this.getProducts();
    },
    components:{
        productsModal,
    }
}).mount("#app");