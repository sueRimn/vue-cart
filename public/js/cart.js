const vm = new Vue({
    el:'#app',
    data: {
        totalMoney: 0,//总金额
        productList: [],//商品列表

    },
    filters: {

    },
    mounted: function() {//挂载 钩子 实例插入文档
        this.cartView();
    },
    methods: {
        cartView: function() {
            let _this = this;
            //获取数据，返回结果
            this.$http.get("../data/cartData.json", {"id":123}).then(res => {
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.totalMoney;
            });
        }
    },
})
