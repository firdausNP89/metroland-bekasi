let size = 10
let page = 1
let numOfPages = null
let count = 0
let params = "";
let filter = "";

async function paginationListener() {
  $(".pagination-button").on("click", function (e) {
      e.preventDefault()
      let value = $(this).attr("buttonName")
      page = (+value)
      params = "";
      params += `size=${size}&`
      params += `page=${page}`
      getData();
  })
}

async function resetPagination() {
  let newPagination = /*html*/ `
  <li type="button" class="page-item pagination-button" ${+page === 1 ? "hidden" : ""} buttonName="${1}" ><a class="page-link">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
  </a></li>

  <li type="button" class="page-item pagination-button" ${+page === 1 ? "hidden" : ""} buttonName="${page - 1}" ><a class="page-link">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
  </a></li>
  `;

  const maxButtonsToShow = 5;
  const halfMaxButtons = Math.floor(maxButtonsToShow / 2);

  let startPage = Math.max(page - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxButtonsToShow - 1, numOfPages);

  if (endPage - startPage < maxButtonsToShow - 1) {
      startPage = Math.max(endPage - maxButtonsToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
      newPagination += `
      <li type="button" class="page-item pagination-button ${page === i ? "active" : ""}" buttonName="${i}" ><a class="page-link">
          ${i}
      </a></li>
  `;
  }

  newPagination += `
  <li type="button" class="page-item pagination-button" ${page === numOfPages ? "hidden" : ""} buttonName="${page + 1}" ><a class="page-link">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </a></li>

  <li type="button" class="page-item pagination-button" ${page === numOfPages ? "hidden" : ""} buttonName="${numOfPages}" ><a class="page-link">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
      <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </a></li>
`;

  $("#pagination").html(newPagination);

  paginationListener();
}

async function getData() {
  try {
      let url = `${ORIGIN}?${params}${filter}`;

      let response = await $.ajax({
          method: "GET",
          url: url,
          headers: {
              'CSRF-Token': token
          }
      })
  
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('size', size);
      newUrl.searchParams.set('page', page);
      history.replaceState(null, '', newUrl);
  
      numOfPages = Math.ceil(response.count / size)
      count = response.count
  
      $("#data-count").text(`Total ${response.count}`)
      refreshTable(response.data)
      resetPagination();
      
  } catch (err) {
      console.log(err);
  }
}
