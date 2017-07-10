$(function () {
    $("#createModelBtn").click(function () {
        BootstrapDialog.show({
            title: '创建模型',
            message: '<input type="text" class="form-control" placeholder="请输入模型名称" />',
            buttons: [{
                label: '确定',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    var name = dialogRef.getModalBody().find('input').val();
                    if (!name) {
                        dialog.error("模型名称不能为空");
                    }
                    else {
                        var $button = this;
                        $button.spin();
                        dialogRef.enableButtons(false);
                        dialogRef.setClosable(false);
                        $.ajax({
                            "url": "/model/postsave",
                            "type": "POST",
                            "dataType": "json",
                            "data": { 'name': name },
                            "success": function (data) {
                                if (data.flag) {
                                    location.href = location.href;
                                }
                                else {
                                    dialog.error(data.msg);
                                }
                            },
                            "error": function () {
                                $button.stopSpin();
                                dialogRef.enableButtons(true);
                                dialogRef.setClosable(true);
                            }
                        });
                    }
                }
            }, {
                label: '取消',
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }]
        });
    });

    $(".model-edit").on("click", function () {
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        BootstrapDialog.show({
            title: name+'——编辑',
            message: '<input type="text" class="form-control" placeholder="请输入模型名称" value="' + name + '"/>',
            buttons: [{
                label: '确定',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    var name = dialogRef.getModalBody().find('input').val();
                    if (!name) {
                        dialog.error("模型名称不能为空");
                    }
                    else {
                        var $button = this;
                        $button.spin();
                        dialogRef.enableButtons(false);
                        dialogRef.setClosable(false);
                        $.ajax({
                            "url": "/model/postedit",
                            "type": "POST",
                            "dataType": "json",
                            "data": { "id": id, "name": name },
                            "success": function (data) {
                                if (data.flag) {
                                    location.href = location.href;
                                }
                                else {
                                    dialog.error(data.msg);
                                }
                            },
                            "error": function () {
                                $button.stopSpin();
                                dialogRef.enableButtons(true);
                                dialogRef.setClosable(true);
                            }
                        });
                    }
                }
            }, {
                label: '取消',
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }]
        });
    });

    $(".model-del").on("click", function () {
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        BootstrapDialog.show({
            title: name+'——删除',
            message: '是否删除模型：'+name,
            buttons: [{
                label: '确定',
                cssClass: 'btn-warning',
                action: function (dialogRef) {
                    var $button = this;
                    $button.spin();
                    dialogRef.enableButtons(false);
                    dialogRef.setClosable(false);
                    $.ajax({
                        "url": "/model/postdelete",
                        "type": "POST",
                        "dataType": "json",
                        "data": { "id": id},
                        "success": function (data) {
                            if (data.flag) {
                                location.href = location.href;
                            }
                            else {
                                dialog.error(data.msg);
                            }
                        },
                        "error": function () {
                            $button.stopSpin();
                            dialogRef.enableButtons(true);
                            dialogRef.setClosable(true);
                        }
                    });
                }
            }, {
                label: '取消',
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }]
        });
    });

    $(".model-property-add").on("click", function () {
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        var html=$(".model-property-add-template").html();
        BootstrapDialog.show({
            title: name+'——添加属性',
            message: html,
            buttons: [{
                label: '确定',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    var $button = this;
                    $button.spin();
                    dialogRef.enableButtons(false);
                    dialogRef.setClosable(false);
                }
            }, {
                label: '取消',
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }]
        });
    });
});