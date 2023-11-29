var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

KTUtil.onDOMContentLoaded(function () {
    $("#menu_cluster").addClass("active");
});
const CLUSTER_URL = '/metroland/auth/clusters'
const btnEditCluster = document.getElementsByClassName("btn-edit-cluster");
const formMdlEditCluster = document.getElementById("mdl-form-edit-cluster");
const mdlBtnEditCluster = document.getElementById("mdl-btn-edit-cluster");

var validator = FormValidation.formValidation(
    formMdlEditCluster,
    {
        fields: {
            cluster_name: {
                validators: {
                    notEmpty: {
                        message: 'parameters are required'
                    }
                }
            },
            mdl_edit_description_cluster: {
                validators: {
                    notEmpty: {
                        message: 'parameters are required'
                    }
                }
            },
            total_bedrooms: {
                validators: {
                    notEmpty: {
                        message: 'parameters are required'
                    },
                    numeric: {
                        message: 'number only'
                    },
                    between: {
                        max: 5,
                        min: 1,
                        message: 'value between 1 to 5'
                    }
                }
            },
            total_bathroom: {
                validators: {
                    notEmpty: {
                        message: 'parameters are required'
                    },
                    numeric: {
                        message: 'number only'
                    },
                    between: {
                        max: 5,
                        min: 1,
                        message: 'value between 1 to 5'
                    }
                }
            },
            total_garage: {
                validators: {
                    notEmpty: {
                        message: 'parameters are required'
                    },
                    numeric: {
                        message: 'number only'
                    },
                    between: {
                        max: 3,
                        min: 1,
                        message: 'value between 1 to 3'
                    }
                }
            },
            total_area: {
                validators: {
                    notEmpty: {
                        message: 'parameters are required'
                    },
                    numeric: {
                        message: 'number only'
                    },
                    between: {
                        max: 300,
                        min: 1,
                        message: 'value between 1 to 300'
                    }
                }
            },
            total_home: {
                validators: {
                    notEmpty: {
                        message: 'parameters are required'
                    },
                    numeric: {
                        message: 'number only'
                    },
                    between: {
                        max: 300,
                        min: 1,
                        message: 'value between 1 to 300'
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

function formEditCluster() {
    const id = $(this).data("cluster_id");
    const name = $(this).data("cluster_name");
    const description = $(this).data("cluster_description");
    const total_badroom = $(this).data("total_badroom");
    const total_bathroom = $(this).data("total_bathroom");
    const total_garage = $(this).data("total_garage");
    const area = $(this).data("total_area");
    const building_area = $(this).data("total_building_area");

    console.log("id : " + id);
    console.log("name : " + name);
    console.log("description : " + description);
    console.log("total_badroom : " + total_badroom);
    console.log("total_bathroom : " + total_bathroom);
    console.log("total_garage : " + total_garage);
    console.log("area : " + area);
    console.log("building_area : " + building_area);


    $('#mdl-edit-cluster-id').val(id);
    $('#mdl-edit-cluster-name').val(name);
    $('#mdl_edit_description_cluster').val(description);
    $('#mdl-edit-cluster-bedrooms').val(total_badroom);
    $('#mdl-edit-cluster-bathroom').val(total_bathroom);
    $('#mdl-edit-cluster-garage').val(total_garage);
    $('#mdl-edit-cluster-area').val(area);
    $('#mdl-edit-cluster-home').val(building_area);

    $('#mdl-edit-cluster').modal('show');

};

for (const element of btnEditCluster) {
    element.addEventListener("click", formEditCluster);
}

mdlBtnEditCluster.addEventListener("click", function (e) {
    e.preventDefault();
    if (validator) {
        validator.validate().then(function (status) {
            console.log(status)
            if (status == 'Valid') {
                doEdit();
            }
        })
    }
})

$('#q').maxlength({
    warningClass: "badge badge-warning",
    limitReachedClass: "badge badge-success"
});

function doEdit() {

    const id = $('#mdl-edit-cluster-id').val();
    const name = $('#mdl-edit-cluster-name').val();
    const description = $('#mdl_edit_description_cluster').val();
    const total_badroom = $('#mdl-edit-cluster-bedrooms').val();
    const total_bathroom = $('#mdl-edit-cluster-bathroom').val();
    const total_garage = $('#mdl-edit-cluster-garage').val();
    const area = $('#mdl-edit-cluster-area').val();
    const building_area = $('#mdl-edit-cluster-home').val();

    $.ajax({
        method: "PUT",
        url: `${CLUSTER_URL}/${id}`,
        data: {
            name, description, total_badroom, total_bathroom, total_garage, area, building_area
        },
        headers: {
            'CSRF-Token': token
        }
    })
        .done((response) => {
            if (response.code == 200) {
                $('#mdl-edit-cluster').modal('toggle');

                //replace with new data
                const id = response.data.id;
                $('#cluster_name_' + id).text(response.data.name)
                $('#cluster_description_' + id).text(response.data.description)
                $('#cluster_badroom_' + id).text(response.data.total_badroom)
                $('#cluster_bathroom_' + id).text(response.data.total_bathroom)
                $('#cluster_garage_' + id).text(response.data.total_garage)
                $('#cluster_area_' + id).text(response.data.area)
                $('#cluster_building_' + id).text(response.data.building_area)

                showSuccessAlert(`Data berhasil diubah`);
            } else {
                showErrorAlert(response.message);
            }
        }).fail((error) => {
            showErrorAlert(error);
        });

}