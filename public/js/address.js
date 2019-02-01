new Vue({
    el:'.container',
    data:{
        limitNum: 3,//限制显示的数量
        addressList: [],//地址列表
        currentIndex:'',//当前项
    },
    mounted: function() {
        this.$nextTick(function() {
          this.getAddressList();
        });
      },
    computed: {//数据过滤
        filterAddress: function () {
            return  this.addressList.slice(0,this.limitNum);//截取0-3个地址显示 返回一个全新数组
        }
    },
    methods: {
        getAddressList: function () {
            this.$http.get("data/address.json").then(response => {//获取后台数据
                let res = response.data;
                if (res.status == '0') {//这里不能写成===
                    this.addressList = res.result;
                }
            })
        },
        loadMore: function () {//显示更多 控制显示的两种状态
            //this.limitNum = this.addressList.length;//展示地址数组全部数据
            let len = this.addressList.length;
            if (this.limitNum === len){
                this.limitNum = 3;
            }else{
                this.limitNum = len;
            }
        },
        setDefault: function (addressId) {
            this.addressList.forEach((address, index) => {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        },
        addAddress: function (item) {
            this.fromStatus = 0;
            var a = this.addressList[this.addressList.length-1];
            // alert(a.addressId++)
           this.addressList.push({
             addressId: a.addressId++,
             userName: this.name,
             streetName: this.streetName,
             tel: this.phone
           });
           this.limitNum = this.addressList.length;
            this.insFlag = false;
        },
        editAddress: function (addressId) {
            this.fromStatus = 1;
            this.insFlag = true;
            var _this = this
            this.addressList.forEach(function (address,index) {
             if (address.addressId == addressId) {
               _this.name = address.userName;
               _this.phone = address.tel;
               _this.streetName = address.streetName;
               _this.checkIndex = index;
              }
            })
        },
    },
});