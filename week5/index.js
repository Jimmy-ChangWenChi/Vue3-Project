//import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";
import productsModal from "./components/productsModal.js";
const {defineRule, Form, Field, ErrorMessage,configure } = VeeValidate;
const {required,email } = VeeValidateRules;
const { localize, loadLocaleFromURL} = VeeValidateI18n;


defineRule('required',required);
defineRule('email',email);

// 讀取外部的資源
loadLocaleFromURL("./zh_TW.json");

// Activate the locale
configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});


Vue.createApp({
    data(){
        return {
            products:[],
            apiUrl:"https://vue3-course-api.hexschool.io/v2",
            path:"jimmychang",
            productId:"",
            cart:{},
            order:{
                user:{
                email:"",
                name:"",
                tel:"",
                address:"",
                },
                message:""
            },
            resetData:{
                user:{
                email:"",
                name:"",
                tel:"",
                address:"",
                },
                message:""
            },
            
        }
    },
    methods:{
        getProducts() {
            const url = `${this.apiUrl}/api/${this.path}/products/all`;
            axios.get(url)
            .then((res)=>{
                //console.log(res.data);
                this.products = res.data.products;
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
        openModal(id){
            this.productId = id;
            
        },
        addToCar(product_id,qty = 1){
            const data = {
                product_id,
                qty
            }
            
            const url = `${this.apiUrl}/api/${this.path}/cart`;
            axios.post(url,{data})
            .then((res) =>{
                alert("產品加入成功");
                this.$refs.productModal.hide();
                this.getCar();
            })
            .catch((err) => {
                alert("產品加入失敗");
            })
        },
        getCar(){
            const url = `${this.apiUrl}/api/${this.path}/cart`;
            axios.get(url)
            .then((res)=>{
                this.cart = res.data.data;
                //console.log(this.cart)
            })
            .catch((err)=>{
                alert("購物車失敗");
            })
        },
        updateCarItem(item){
            
            const data = {
                product_id:item.product.id,
                qty:item.qty
            }
            const url = `${this.apiUrl}/api/${this.path}/cart/${item.id}`; 
            axios.put(url,{data})
            .then((res) =>{
                alert("更新成功");
                this.getCar();
            })
            .catch((err)=>{
                alert("更新失敗");
            })
        },
        deleteCarItem(item){
            let url="";
            if (item.id){
                url = `${this.apiUrl}/api/${this.path}/cart/${item.id}`; 
            } else{
                url = `${this.apiUrl}/api/${this.path}/carts`; 
            }
            axios.delete(url)
            .then((res)=> {
                alert("刪除成功");
                this.getCar();
            })
            .catch((err)=> {
                alert("刪除失敗");
            })
        },
        onSubmit(){
            const url = `${this.apiUrl}/api/${this.path}/order`;
            axios.post(url,{ data: this.order})
            .then((res) =>{
                alert("結帳成功");
                this.getCar();
                //this.$refs.form.resetForm();
                this.order = this.resetData;
            })
            .catch((err) =>{
                alert("結帳失敗");
            })
        },
    },
    mounted(){
        this.getProducts();
        this.getCar();
    },
    components:{
        productsModal,
        VForm:Form,
        VField:Field,
        ErrorMessage: ErrorMessage,
    },
}).mount("#app");