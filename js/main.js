$(document).ready(() => {
  //event for form submission
  $('#searchForm').on('submit', e => {
    //The search Text
    let searchText = $('#searchText').val();
    getMovies(searchText);

    e.preventDefault();
  });
});
//the movie handler section
const getMovies = searchText => {
  axios
    .get('http://www.omdbapi.com?s=' + searchText + '&apikey=8d604ca7')
    .then(response => {
      //console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-4">
        <div class="card" style="width:20rem; height:550px;">
  <img src="${movie.Poster}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${movie.Title}</h5>
    <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-primary">Movie Details</a>
  </div>
</div>
</div>
       
        `;
      });
      $('#movies').html(output);
    })
    .catch(err => {
      console.log(err);
    });
};

//Movie select function

const movieSelected = id => {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
};

//GET MOVIE FUNCTION
function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  axios;

  axios
    .get(
      'https://api.themoviedb.org/3/movie/' +
        movieId +
        '?api_key=98325a9d3ed3ec225e41ccc4d360c817'
    )
    .then(response => {
      console.log(response);
      let movie = response.data;
      let output = `
      <div class="row">
      <div class="col-md-4" >
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail" style="width:100%;">
      </div>
      <div class="col-md-8">
      <h2>${movie.title}</h2>
      <ul class="list-group">
      <li class="list-group-item"><strong>Genre</strong>: ${movie.genres[0].name}</li>
      <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
      <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
      <li class="list-group-item"><strong>Production Companies:</strong>${movie.production_companies[0].name} min.</li> 
      </ul>
      </div>
      </div>
      <hr>
      <div class="card" style="width:100%; margin-top:20px;border-top:0px;padding:5px;">
      <h3>Plot</h3>
      ${movie.overview};
      <hr>
      <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
      </div>

      `;
      $('#movie').html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
