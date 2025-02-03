describe('Navigation between the different pages of the site', () => {
  it('HomePage', () => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=es', { fixture: 'movies/upcomingMovies.json'}).as('upcomingMovies');     
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', { fixture: 'movies/moviesNowPlaying.json'}).as('moviesNowPlaying');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'movies/popularMovies.json'}).as('popularMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'movies/popularMovies.json'}).as('popularMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/top_rated?language=es-ES&region=es&page=1', { fixture: 'movies/topRatedMovies.json'}).as('topRatedMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/on_the_air?language=es-ES&timezone=es&page=1', { fixture: 'series/onAirSeries.json'}).as('onAirSeries');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/tv/week?language=es-ES&page=1', { fixture: 'series/popularSeries.json'}).as('popularSeries');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=1', { fixture: 'series/topRatedSeries.json'}).as('topRatedSeries');
    
    cy.visit('http://localhost:3000/');

    cy.wait('@upcomingMovies');
    cy.wait('@moviesNowPlaying');
    cy.wait('@popularMovies');
    cy.wait('@topRatedMovies');
    cy.wait('@onAirSeries');
    cy.wait('@popularSeries');
    cy.wait('@topRatedSeries');

    cy.get('header > nav > a').contains('Home')
      .should('have.class', 'text-white')
      .should('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('MoviesPage', () => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', { fixture: 'movies/moviesNowPlaying.json'}).as('moviesNowPlaying');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'movies/popularMovies.json'}).as('popularMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&region=es&sort_by=popularity.desc&with_genres=28', { fixture: 'movies/moviesByGenre.json'}).as('moviesByGenre');     
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/748?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');

    cy.visit('http://localhost:3000/');

    cy.get('header > nav > a').contains('Películas').click();
    
    cy.wait('@moviesNowPlaying');
    cy.wait('@popularMovies');
    cy.wait('@moviesByGenre');
    cy.wait('@collectionsMovies');

    cy.get('header > nav > a').contains('Películas')
      .should('have.class', 'text-white')
      .should('have.css', 'color', 'rgb(255, 255, 255)');

    cy.url().should('eq', 'http://localhost:3000/peliculas');
  });
 
  it.only('SeriesPage', () => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/tv/day?language=es-ES', { fixture: 'series/seriesOfTheDay.json'}).as('seriesOfTheDay');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/airing_today?language=es-ES&page=1', { fixture: 'series/airingToday.json'}).as('airingToday');
    cy.intercept('GET', 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-ES&page=1&sort_by=popularity.desc&with_genres=10759', { fixture: 'series/seriesByGenre.json'}).as('seriesByGenre');     

    cy.visit('http://localhost:3000/');

    cy.get('header > nav > a').contains('Series').click();

    cy.wait('@seriesOfTheDay');
    cy.wait('@airingToday');
    cy.wait('@seriesByGenre');

    cy.get('header > nav > a').contains('Series')
      .should('have.class', 'text-white')
      .should('have.css', 'color', 'rgb(255, 255, 255)');

    cy.url().should('eq', 'http://localhost:3000/series');
  });
});