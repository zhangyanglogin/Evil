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
            title: name + '—编辑',
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
            title: name + '—删除',
            message: '是否删除模型：' + name,
            buttons: [{
                label: '确定',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    var $button = this;
                    $button.spin();
                    dialogRef.enableButtons(false);
                    dialogRef.setClosable(false);
                    $.ajax({
                        "url": "/model/postdelete",
                        "type": "POST",
                        "dataType": "json",
                        "data": { "id": id },
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
        var html = $(".model-property-add-template").html();
        BootstrapDialog.show({
            title: name + '—添加属性',
            message: html,
            onshow: function (dialogRef) {
                var $form = dialogRef.getModalBody().find('form')
                $form.validate({
                    rules: {
                        "name": {
                            required: true
                        },
                        "type": {
                            required: true
                        }
                    },
                    messages: {
                        "name": {
                            required: "请填写属性名称"
                        },
                        "type": {
                            required: "请选择属性类型",
                        }
                    }
                });
            },
            buttons: [{
                label: '确定',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    var $form = dialogRef.getModalBody().find('form')
                    if ($form.valid()) {
                        var $button = this;
                        $button.spin();
                        dialogRef.enableButtons(false);
                        dialogRef.setClosable(false);
                        $.ajax({
                            "url": "/model/addproperty",
                            "type": "POST",
                            "dataType": "json",
                            "data": $form.serialize() + "&id=" + id,
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

    $(".model-property-edit").on("click", function () {
        var modelId = $(this).attr("data-id");
        var propertyId = $(this).attr("data-property-id");
        var name = $(this).closest("tr").children("td").eq(1).text();
        var type = $(this).closest("tr").children("td").eq(2).text();
        var html = $(".model-property-add-template").html();
        BootstrapDialog.show({
            title: '编辑属性',
            message: html,
            onshow: function (dialogRef) {
                var $form = dialogRef.getModalBody().find('form');
                $form.find("input[name='name']").val(name);
                $form.find("select[name='type']").val(type);
                $form.validate({
                    rules: {
                        "name": {
                            required: true
                        },
                        "type": {
                            required: true
                        }
                    },
                    messages: {
                        "name": {
                            required: "请填写属性名称"
                        },
                        "type": {
                            required: "请选择属性类型",
                        }
                    }
                });
            },
            buttons: [{
                label: '确定',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    var $form = dialogRef.getModalBody().find('form')
                    if ($form.valid()) {
                        var $button = this;
                        $button.spin();
                        dialogRef.enableButtons(false);
                        dialogRef.setClosable(false);
                        debugger;
                        $.ajax({
                            "url": "/model/editproperty",
                            "type": "POST",
                            "dataType": "json",
                            "data": $form.serialize() + "&modelId=" + modelId+ "&propertyId=" + propertyId,
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

    $(".model-property-delete").on("click", function () {
        var modelId = $(this).attr("data-id");
        var propertyId = $(this).attr("data-property-id");
        var name = $(this).closest("tr").children("td").eq(1).text();
        BootstrapDialog.show({
            title: '删除',
            message: '是否删除属性：' + name,
            buttons: [{
                label: '确定',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    var $button = this;
                    $button.spin();
                    dialogRef.enableButtons(false);
                    dialogRef.setClosable(false);
                    $.ajax({
                        "url": "/model/delproperty",
                        "type": "POST",
                        "dataType": "json",
                        "data": { "modelId": modelId, "propertyId": propertyId },
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
});