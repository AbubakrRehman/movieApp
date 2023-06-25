const main = document.getElementById("main");
const notification = document.getElementById("notification");
const movieListURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

let movieListt = [];
let isLoading = false;
let error = null;

async function fetchMovieList(url) {
    isLoading = true;
    updateDOM(isLoading, movieListt, error);

    const moviesRaw = await fetch(url);
    if (!moviesRaw.ok) {
        return Promise.reject("Error hai!!!");
    }
    const moviesJSON = await moviesRaw.json();
    return moviesJSON.results;

}

fetchMovieList(movieListURL).then((movieList) => {
    isLoading = false;
    movieListt = movieList;
    console.log("inside fetchMovieList", movieList);
    updateDOM(isLoading, movieListt, error);
})
    .catch((error) => {
        isLoading = false;
        updateDOM(isLoading, movieListt, error);
    })


function updateDOM(isLoading, movieListt, error) {
    if (error) {
        notification.innerText = error;
        return;
    }

    if (isLoading) {
        notification.innerText = "...Loading!!!!!";
        return;
    }
    // console.log(movieList);
    notification.innerText = "";
    movieListt.forEach((movie, index) => {
        const { original_title, overview, poster_path } = movie;
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `<div class="movie">
        <img src="${IMAGE_PATH + poster_path}"
        alt="">
    <div class="movie__info">
        <h2>${original_title}</h2>
        <span class="green">9.8</span>
    </div>
    <div class="movie__overview">
        <h3>Overview</h3>
        ${overview}
      
    </div>
</div>`;
        main.appendChild(movieElement);
    })


}