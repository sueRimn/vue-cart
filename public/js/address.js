new Vue({
    el:'.container',
    data:{
        addressList: [],//地址列表
    },
    mounted: function() {
        this.$nextTick(function() {
          this.getAddressList();
        });
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