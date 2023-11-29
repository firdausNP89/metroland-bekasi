$(document).ready(function () {
    console.log("start get promo")
    getPromo();
});

const BERANDA_URL = '/metroland/beranda/api/v1/promo'

function getPromo() {
    $.ajax({
        method: "GET",
        url: `${BERANDA_URL}`,
    })
        .done((response) => {
            if (response.code == 200) {
                $("#mdl_promosi").modal("show");
            }

        }).fail((error) => {
            console.log("ini error : " + error)
        });
}