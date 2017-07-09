var dialog = {
    //https://nakupanda.github.io/bootstrap3-dialog/
    error: function (content) {
        BootstrapDialog.show({
            title: '错误',
            type: 'type-danger',
            message: content
        });
    },
    show: BootstrapDialog.show
}