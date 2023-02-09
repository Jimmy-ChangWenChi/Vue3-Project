export default {
    props:["id","addToCar"],
    data(){
        return {
            tempProduct:{},
            apiUrl:"https://vue3-course-api.hexschool.io/v2",
            path:"jimmychang",
        }
    },
    modal:{},
    template:'#userProductModal',
    mounted(){
        this.modal = new bootstrap.Modal(this.$refs.modal);
        //this.modal.show();
    },
    watch: {
        id(){
            //console.log("id = " + this.id);
            const url = `${this.apiUrl}/api/${this.path}/product/${this.id}`;
            console.log(url);
            axios.get(url)
            .then((res)=>{
                console.log(res.data);
                this.tempProduct = res.data.product;
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
            this.modal.show();
        },
    },
    methods:{
        hide(){
            this.modal.hide();
        }
    }
}