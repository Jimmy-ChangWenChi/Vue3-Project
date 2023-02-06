export default {
    data(){
        return {
            tempProduct:{}
        }
    },
    modal:{},
    template:'#userProductModal',
    mounted(){
        this.modal = new bootstrap.Modal(this.$refs.modal);
        //this.modal.show();
    },
}