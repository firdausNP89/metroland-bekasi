function pagination(data) {
  const total_page = Math.ceil(data.count / data.per_page);
  const total_perpage = data.per_page;
  const current_page = data.page;
  const previos_page = current_page == 1 ? null : current_page - 1;
  const next_page = current_page == total_page ? current_page : current_page + 1;

  const result = {
    data: data.data,
    pagination: {
      total_record: data.count,
      total_perpage: total_perpage,
      total_page,
      current_page,
      next_page,
      previos_page,
    },
  };
  return result;
}

function paginationUi(pagination, key) {
  const rowContent = pagination.total_perpage;
  const totRows = pagination.total_record;
  const maxRow = 10;
  const offset = pagination.current_page;
  const firstPage = 1;
  let prev = 1;
  if (offset > 1) {
    prev = offset - 1;
  }
  const next = pagination.next_page;

  const devPage = totRows / maxRow;
  const lastPage = Math.ceil(totRows % maxRow == 0 ? devPage : devPage);
  if (totRows < maxRow) {
    return "<li class='page-item previous disabled'><a href='#'><i class='previous'></i></a></li><li class='page-item active'><a class='page-link'>1</a></li>";
  } else {
    let pagenumber = "";
    const totalPage = pagination.total_page;
    if (totalPage < 5) {
      if (offset > 1) {
        pagenumber +=
          "<li class='page-item'><a href='" +
          key +
          "page=" +
          firstPage + "&size=" + rowContent +
          "' class='page-link'><i class='previous'></i></a></li>";
        pagenumber +=
          "<li class='page-item'><a href='" +
          key +
          "page=" +
          prev + "&size=" + rowContent +
          "' class='page-link'>prev</a></li>";
      }
      for (let p = 0; p < totalPage; p++) {
        let number = p + 1;
        if (p == offset - 1) {
          pagenumber +=
            "<li class='page-item active'><a href='" +
            key +
            "page=" +
            number + "&size=" + rowContent +
            "' class='page-link'>" +
            number +
            "</a></li>";
        } else {
          pagenumber +=
            "<li class='page-item'><a href='" +
            key +
            "page=" +
            number + "&size=" + rowContent +
            "' class='page-link'>" +
            number +
            "</a></li>";
        }
      }
      console.log("rowContent >= maxRow (" + rowContent + " >= " + maxRow + ")")
      if (rowContent >= maxRow) {
        pagenumber +=
          "<li class='page-item'><a href='" +
          key +
          "page=" +
          next + "&size=" + rowContent +
          "' class='page-link'>next</a></li>";
        pagenumber +=
          "<li class='page-item'><a href='" +
          key +
          "page=" +
          lastPage + "&size=" + rowContent +
          "' class='page-link'><i class='next'></i></a></li>";
      }
      return pagenumber;
    } else {
      if (offset > 1) {
        pagenumber +=
          "<li class='page-item previous'><a href='" +
          key +
          "page=" +
          firstPage + "&size=" + rowContent +
          "' class='page-link'>&laquo;</a></li>";
        pagenumber +=
          "<li class='page-item'><a href='" +
          key +
          "page=" +
          prev + "&size=" + rowContent +
          "' class='page-link'>prev</a></li>";
      }

      if (offset < 6) {
        for (let p = 0; p <= 5; p++) {
          let number = p + 1;
          if (p == offset - 1) {
            pagenumber +=
              "<li class='page-item active'><a href='" +
              key +
              "page=" +
              number + "&size=" + rowContent +
              "' class='page-link'>" +
              number +
              "</a></li>";
          } else {
            pagenumber +=
              "<li class='page-item'><a href='" +
              key +
              "page=" +
              number + "&size=" + rowContent +
              "' class='page-link'>" +
              number +
              "</a></li>";
          }
        }
      } else {
        for (let i = 1; i < 6; i++) {
          let numPage = offset - (5 - i);
          if (numPage == offset) {
            pagenumber +=
              "<li class='page-item active'><a href='" +
              key +
              "page=" +
              numPage + "&size=" + rowContent +
              "' class='page-link'>" +
              numPage +
              "</a></li>";
          } else {
            pagenumber +=
              "<li class='page-item'><a href='" +
              key +
              "page=" +
              numPage + "&size=" + rowContent +
              "' class='page-link'>" +
              numPage +
              "</a></li>";
          }
        }
      }
      if (rowContent >= maxRow) {
        pagenumber +=
          "<li class='page-item'><a href='" +
          key +
          "page=" +
          next + "&size=" + rowContent +
          "' class='page-link'>next</a></li>";
        pagenumber +=
          "<li class='page-item'><a href='" +
          key +
          "page=" +
          lastPage + "&size=" + rowContent +
          "' class='page-link'><i class='next'></i></a></li>";
      }
      return pagenumber;
    }
  }
}

const setPagination = (rows, count, page, per_page, pageName, filter) => {
  const p = pagination({
    data: rows,
    count,
    page,
    per_page,
  });
  let number =
    parseInt(p.pagination.current_page - 1) *
    parseInt(p.pagination.total_perpage);
  const q = filter == "" ? pageName + "?" : pageName + "?" + filter + "&";
  const pageNumUi = paginationUi(p.pagination, q);
  return { number, pageNumUi };
};

const setPaginationAudit = (rows, count, page, per_page, key) => {
  const p = pagination({
    data: rows,
    count,
    page,
    per_page,
  });
  let number =
    parseInt(p.pagination.current_page - 1) *
    parseInt(p.pagination.total_perpage);
  const q = key == null ? pageName + "?" : pageName + "?" + key + "&";
  const pageNumUi = paginationUi(p.pagination, q);
  return { number, pageNumUi };
};
