$(function () {
    $("#loginForm").validate({
        rules: {
            "telephone": {
                required: true
            },
            "password": {
                required: true
            }
        },
        messages: {
            "telephone": {
                required: "请填写手机号码"
            },
            "password": {
                required: "请填写密码",
            }
        },
        debug: true,
        submitHandler: function (form) {
            $.ajax({
                "url": "/login/submit",
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