$(function () {
    $("#registerForm").validate({
        rules: {
            "telephone": {
                required: true,
                isMobile: true,
                remote: {
                    url: "/Register/CheckTelephone",     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式   
                    data: {                     //要传递的数据
                        username: function () {
                            return $("#telephone").val();
                        }
                    }
                }
            },
            "password": {
                required: true
            }
        },
        messages: {
            "telephone": {
                required: "请填写手机号码",
                remote: "手机号已存在"
            },
            "password": {
                required: "请填写密码",
            }
        },
        submitHandler: function (form) {
            $.ajax({
                "url": "/register/submit",
                "type": "POST",
                "dataType": "json",
                "data": $(form).serialize(),
                "success": function (data) {
                    if (data.flag) {
                        location.href = "/dashboard";
                    }
                    else {
                        dialog.error(data.msg);
                    }
                },
            });
        }
    });
});