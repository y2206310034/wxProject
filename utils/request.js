

var baseUrl = "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine"
function request(parmas){
    wx.request({
        url:baseUrl + parmas.url,
        success:function(res){
            console.log(res);
            var code = res.data.code;
            if(code === 0){
                parmas.success(res.data);
            }else{
                showFail()
            }
        },
        fail:function(){
            showFail()
        }
    })
}

function showFail(){
    wx.showToast({
        title:"请求错误",
        icon:"none"
    })
}

module.exports = request;