import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
import pagination from "./components/pagination.js"
import productsModal from "./components/productsModal.js"

let productModal = null;
let delProductModal = null;
const app = {
    data(){
        return {
            apiUrl:"https://vue3-course-api.hexschool.io/v2",
            path:"jimmychang",
            products:[],
            tempProduct:{},
            isNew:true,
            value:"有顯示",
            page: {}
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
        getData(page=1){
            //const url = `${this.apiUrl}/api/${this.path}/products/all`;
            
            const url = `${this.apiUrl}/api/${this.path}/admin/products/?page=${page}`
            axios.get(url)
            .then((res) =>{
                //console.log(res.data)
                this.page = res.data.pagination;
                this.products = res.data.products;
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
        addModal(){
            this.isNew = true;
            this.tempProduct = {
                imageUrl:[]
            }
            productModal.show();
        },
        delModal(item){
            this.tempProduct = {...item};
            delProductModal.show();
        },
        editModal(item){
            this.tempProduct = {...item};
            this.isNew = false;
            productModal.show();
        },
        createImage(){
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
        updateProduct(){
            let url ="";
            let way ="";
            if(!this.isNew){
                url = `${this.apiUrl}/api/${this.path}/admin/product/${this.tempProduct.id}`;
                way = "put";
            }else{
                url = `${this.apiUrl}/api/${this.path}/admin/product`;
                way = "post";
            }
            axios[way](url, {data: this.tempProduct})
            .then((res) =>{
                alert("Success");
                productModal.hide();
                this.getData();
            })
            .catch((err) =>{
                alert(err.response.data.message);
            })
        },
        deleteProduct(){
            const url = `${this.apiUrl}/api/${this.path}/admin/product/${this.tempProduct.id}`;

            axios.delete(url,this.tempProduct.id)
            .then((res) =>{
                alert("Delete Success");
                delProductModal.hide();
                this.getData();
            })
            .catch((err) =>{
                alert(err.response.data.message);
            })
        }
        
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)JimmyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        //productModal = document.getElementById("#productModal");
        
        productModal = new bootstrap.Modal(document.getElementById("productModal"),{
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.getElementById("delProductModal",{
            keyboard:false
        }))
        
        this.checkAdmin();
        
    },
    //區域註冊寫法, 只能綁定一個實體
    components:{
        pagination,
        productsModal

    }
}

createApp(app).mount("#app");