function showSuccessAlert(msg) {
    const toastElement = document.getElementById('toast-suc');
    $("#suc-alert-msg").html(msg);
    const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
    toast.show();
}

function showErrorAlert(msg) {
    const toastElement = document.getElementById('toast-err');
    $("#err-alert-msg").html(msg);
    const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
    toast.show();
}