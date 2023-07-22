// ERROR HANDLING PROMISE => .THEN() .CATCH()
// ERROR HANDLING ASYNC AWAIT => TRY{} .CATCH() {}
// ERROR HANDLING FETCH, hasil error fetch akan di lempar ke .catch nya async await untuk menampilkan errornya => throw new Error()
const btnSearch = document.querySelector(".kirim");
btnSearch.addEventListener("click", async function () {
  const inputKey = document.querySelector(".inputKey");
  inputKey.focus();

  try {
    const keySearch = inputKey.value;
    const movies = await getInputKey(keySearch);
    uIMovie(movies);
  } catch (error) {
    // console.log error iki menampilkan error teko try karo nagkep hasil error teko throw new Error / FETCH
    console.log(error);
  }
});

function getInputKey(keySearch) {
  return fetch("http://www.omdbapi.com/?apikey=bba7d0dd&s=" + keySearch)
    .then((movies) => {
      // .ok dan .statusText di dapat dari console.log(movies) metu isine
      if (!movies.ok) {
        // throw new Error iki gawe mendeteksi error URL FETCH tok contoh link kurang lengkap / kurang huruf / salah
        throw new Error(movies.statusText);
      }
      // kudu gawe RETURN nek gak di gawe melbune ning .catch error asynt await
      return movies.json();
    })
    .then((movies) => {
      // REsponse ne R e, Error ne E e, False ne F e gede nek ra percoyo check gawe console.log(movies)
      if (movies.Response === "False") {
        // throw ne Error iki gawe mendeteksi error saat mengisi search ono gak isinine contoh pas search kosong d enter / key kurang huruf
        throw new Error(movies.Error);
      }
      // ojo lali return nek lali ngetik keyword d search e bener isine ra muncul
      return movies.Search;
    });
}

function uIMovie(movies) {
  let card = "";
  movies.forEach((m) => (card += kartu(m)));

  const cards = document.querySelector(".cards");
  cards.innerHTML = card;
}

function kartu(m) {
  return `<div class="col-md-4 mb-3">
            <div class="card">
                <img src="${m.Poster}" class="card-img-top" alt="" />
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary detail" data-bs-toggle="modal" data-bs-target="#detailModal" data-imdbid="${m.imdbID}">Detail</a>
                </div>
            </div>
        </div>`;
}

// event binding Modal Show Detail
document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("detail")) {
    const imdbid = event.target.dataset.imdbid;
    const details = await getShowDetail(imdbid);
    uiDetail(details);
  }
});

function getShowDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=bba7d0dd&i=" + imdbid)
    .then((details) => details.json())
    .then((details) => details);
}

function uiDetail(m) {
  const cardDetails = kartuDetail(m);

  const showDetail = document.querySelector(".showDetail");
  showDetail.innerHTML = cardDetails;
}

function kartuDetail(m) {
  return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <img class="img-fluid" src="${m.Poster}" alt="" />
                    </div>
                    <div class="col-md">
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                                <li class="list-group-item"><strong>Director:</strong> ${m.Director}</li>
                                <li class="list-group-item"><strong>Writer:</strong> ${m.Writer}</li>
                                <li class="list-group-item"><strong>Actors:</strong> ${m.Actors}</li>
                                <li class="list-group-item">
                                <strong>Plot:</strong><br />
                                ${m.Plot}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`;
}
