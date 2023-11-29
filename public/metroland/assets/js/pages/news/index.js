
KTUtil.onDOMContentLoaded(function () {
    $("#menu_news").addClass("active");
});
var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// var image = document.querySelector('meta[name="image"]').getAttribute('content');

const addNews = document.getElementById('btn-add-news');
const mdlBtnAddNews = document.getElementById('mdl-btn-add-news');
const btnEditNews = document.getElementsByClassName('btn-edit-news')


addNews.addEventListener('click', function (e) {
    e.preventDefault();

    $('#mdl-add-news').modal('show');
});

var myEditor;
ClassicEditor
    .create(document.querySelector('#mdl_add_content_news'), {
        ckfinder: {
            uploadUrl: `/metroland/auth/news/upload`,
        }
    })
    .then(editor => {
        myEditor = editor;
    })
    .catch(error => {
        console.error(error);
    });

var myEditorEdit;
ClassicEditor
    .create(document.querySelector('#mdl_edit_content_news'), {
        ckfinder: {
            uploadUrl: `/metroland/auth/news/upload`,
        }
    })
    .then(editor => {
        myEditorEdit = editor;
    })
    .catch(error => {
        console.error(error);
    });

mdlBtnAddNews.addEventListener("click", function (e) {
    e.preventDefault();

    const x = myEditor.getData();
    console.log(x)
    $('#mdl-form-add-news').submit()
})

function formEditNews() {
    const id = $(this).data("news_id");
    const title = $(this).data("title");
    const description = $(this).data("description");

    $('#news_id').val(id);
    $('#mdl-edit-news-title').val(title);
    myEditorEdit.setData(description);

    $('#mdl-edit-news').modal('show');

};

for (const element of btnEditNews) {
    element.addEventListener("click", formEditNews);
}