Vue.filter('money',(value,type) => {//全局过滤器 总价
    return "￥ " + value.toFixed(2) + type;//保留两位小数
});
new Vue({
    el:'#app',
    data: {
        totalMoney: 0,//总金额
        productList: [],//商品列表
        checkAllFlag: false,//选中全部
        delFlag:false,//删除
        curProduct: ''
    },
    filters: {//局部过滤器 单价
        formatMoney: function (value) {
            return "￥ " + value.toFixed(2);//保留两位小数
        }
    },
    mounted: function() {//挂载 钩子 实例插入文档
        this.cartView();
    },
    methods: {
        cartView: function () {
            let _this = this;
            //获取数据，返回结果
            this.$http.get("../data/cartData.json", {"id":123}).then(res => {//不必在外部声明 this
                this.productList = res.data.result.list;
                this.totalMoney = res.data.totalMoney;
            });
        },
        changeMoney: function (product,way) {
            if (way > 0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if (product.productQuantity < 1) {//限制数量最少为1
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();//每次改变商品数量就调用计算总金额函数
        },
        selectedProduct: function (item) {//选中商品
            if(typeof item.checked == 'undefined') {//检测属性是否存在
                //Vue.set(item, "checked", true);
                this.$set(item, "checked", true);//局部注册
            }else{
                item.checked = !item.checked;//状态取反
            }
            //如果取消一个商品的选中，全选也取消
            var itemisChecked = [];
            this.productList.forEach(function (item, index){
                if (item.checked === true ) {
                    itemisChecked.push(item);
                }
            })
            if (itemisChecked.length === this.productList.length ) {
                this.checkAllFlag = true;
            }else{
                this.checkAllFlag = false;
            }
            this.calcTotalPrice();//选中商品后调用计算总金额函数
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            this.productList.forEach((item, index) => {
                if(typeof item.checked == 'undefined') {//检测属性是否存在
                    this.$set(item, "checked", this.checkAllFlag);//局部注册
                }else{
                    item.checked = this.checkAllFlag;//状态取反
                }
            });
            this.calcTotalPrice();//全选时调用计算总金额函数
        },
        calcTotalPrice: function () {
            this.totalMoney = 0;//每次遍历商品之前对总金额进行清零
            this.productList.forEach((item, index) => {//遍历商品，如果选中就进行加个计算，然后累加
                if (item.checked){
                    this.totalMoney += item.productPrice*item.productQuantity;//累加的
                }
            });
        },
        delConfirm: function (item) {
            this.delFlag = true;//打开删除当前订单的模态框
            this.curProduct = item;//确认点击的当前商品待删除
        },
        delProduct: function () {//这里只是模拟删除数据，真实的需要传递选中的商品元素的id传给后台，从后台删除
            index = this.productList.indexOf(this.curProduct);//从当前商品列表找到要删除的商品元素
            this.productList.splice(index, 1);//然后从列表里删除当前要删除的商品元素，数量为1
            this.delFlag = false;//关闭模态框
        }
    },
});
