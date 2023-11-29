
var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

KTUtil.onDOMContentLoaded(function () {
    $("#menu_product").addClass("active");

    $('#mdl_clusters').select2({
        multiple: true,
        tags: false
    });
});

const PRODUCT_URL = '/metroland/auth/products';
const PRODUCT_API_URL = '/metroland/auth/api/v1/products';
const CLUSTER_API_URL = '/metroland/auth/api/v1/clusters';

const btnEditProduct = document.getElementsByClassName("btn-edit-product");
const formMdlAddProduct = document.getElementById("mdl-form-add-product");
const formMdlEditProduct = document.getElementById("mdl-form-edit-product");
const mdlBtnAddProduct = document.getElementById("mdl-btn-add-product");
const mdlBtnEditProduct = document.getElementById("mdl-btn-edit-product");
const btnAddProduct = document.getElementById("btn-add-product");
const mdlBtnCancleProduct = document.getElementById("mdl-btn-cancle-product")

var myEditorEdit;
var myEditorAdd;

ClassicEditor
    .create(document.querySelector('#mdl-edit-content-product'), {
        toolbar: ['heading', 'bold', 'italic', 'link', 'numberedList', 'bulletedList', 'undo', 'redo']
    })
    .then(editor => {
        myEditorEdit = editor;
    })
    .catch(error => {
        console.error(error);
    });

ClassicEditor
    .create(document.querySelector('#mdl-add-content-product'), {
        toolbar: ['heading', 'bold', 'italic', 'link', 'numberedList', 'bulletedList', 'undo', 'redo']
    })
    .then(editor => {
        myEditorAdd = editor;
    })
    .catch(error => {
        console.error(error);
    });

btnAddProduct.addEventListener("click", function (e) {
    e.preventDefault();
    getClusters();
    $('#mdl-add-product').modal("show");
})

var validator = FormValidation.formValidation(
    formMdlEditProduct,
    {
        fields: {
            product_title: {
                validators: {
                    notEmpty: {
                        message: 'Parameter wajib diisi'
                    }
                }
            },
            mdl_edit_content_product: {
                validators: {
                    notEmpty: {
                        message: 'Parameter wajib diisi'
                    }
                }
            },
        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);

var validatorAddProduct = FormValidation.formValidation(
    formMdlAddProduct,
    {
        fields: {
            product_title: {
                validators: {
                    notEmpty: {
                        message: 'Parameter wajib diisi'
                    }
                }
            },
            mdl_add_content_product: {
                validators: {
                    notEmpty: {
                        message: 'Parameter wajib diisi'
                    }
                }
            },
            mdl_clusters: {
                validators: {
                    notEmpty: {
                        message: 'Parameter wajib diisi'
                    }
                }
            },
        },

        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap: new FormValidation.plugins.Bootstrap5({
                rowSelector: '.fv-row',
                eleInvalidClass: '',
                eleValidClass: ''
            })
        }
    }
);

function formEditProduct() {
    const productId = $(this).data("product_id");
    const title = $(this).data("title");
    const content = $(this).data("content");

    $('#mdl-edit-product-id').val(productId);
    $('#mdl-edit-title-product').val(title);
    myEditorEdit.setData(content);

    $('#mdl-edit-product').modal('show');

};

for (const element of btnEditProduct) {
    element.addEventListener("click", formEditProduct);
}

mdlBtnAddProduct.addEventListener("click", function (e) {
    e.preventDefault();
    if (validatorAddProduct) {
        validatorAddProduct.validate().then(function (status) {

            if (status == 'Valid') {
                doAddProduct();
            }
        })
    }
})

mdlBtnEditProduct.addEventListener("click", function (e) {
    e.preventDefault();
    if (validator) {
        validator.validate().then(function (status) {

            if (status == 'Valid') {
                doEdit();
            }
        })
    }
})

mdlBtnCancleProduct.addEventListener("click", function (e) {
    e.preventDefault();
    $('#mdl-add-product').modal('toggle');
    location.reload();
})

$('#q').maxlength({
    warningClass: "badge badge-warning",
    limitReachedClass: "badge badge-success"
});

function doAddProduct() {

    var title = $('#mdl-add-title-product').val();
    var description = myEditorAdd.getData();
    var logo = $('#logo_produk').prop('files')[0];
    var clusters = $('#mdl_clusters').val();

    var formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', logo);
    formData.append('clusters', clusters);

    $.ajax({
        method: "POST",
        url: `${PRODUCT_API_URL}`,
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        headers: {
            'CSRF-Token': token
        }
    })
        .done((response) => {
            if (response.code == 200) {
                showSuccessAlert(`data berhasil ditambahkan`);
            }
        }).fail((error) => {
            showErrorAlert(error);
        });
}

function doEdit() {

    let id = $('#mdl-edit-product-id').val();
    let title = $('#mdl-edit-title-product').val();
    let content = myEditorEdit.getData();

    $.ajax({
        method: "PUT",
        url: `${PRODUCT_API_URL}/${id}`,
        data: {
            title, content
        },
        headers: {
            'CSRF-Token': token
        }
    })
        .done((response) => {
            if (response.code == 200) {
                $('#mdl-edit-product').modal('toggle');
                showSuccessAlert(`data berhasil diubah`);
            } else {
                showErrorAlert(response.message);
            }
        }).fail((error) => {
            showErrorAlert(error);
        });

}

function getClusters() {
    $.ajax({
        method: "GET",
        url: `${CLUSTER_API_URL}`,
        headers: {
            'CSRF-Token': token
        }
    })
        .done((response) => {
            if (response.code == 200) {

                response.data.forEach(cluster => {
                    $('#mdl_clusters').append($('<option>', {
                        value: cluster.id,
                        text: cluster.name
                    }));
                });
            }
        }).fail((error) => {
            showErrorAlert(error);
        });
}
