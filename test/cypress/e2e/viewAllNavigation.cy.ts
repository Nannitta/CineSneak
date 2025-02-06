describe('Navigation when click on view all button' , () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=es', { fixture: 'movies/upcomingMovies.json'}).as('upcomingMovies');     
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', { fixture: 'movies/moviesNowPlaying.json'}).as('moviesNowPlaying');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'movies/popularMovies.json'}).as('popularMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/top_rated?language=es-ES&region=es&page=1', { fixture: 'movies/topRatedMovies.json'}).as('topRatedMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/on_the_air?language=es-ES&timezone=es&page=1', { fixture: 'series/onAirSeries.json'}).as('onAirSeries');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/tv/week?language=es-ES&page=1', { fixture: 'series/popularSeries.json'}).as('popularSeries');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=1', { fixture: 'series/topRatedSeries.json'}).as('topRatedSeries');

    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/tv/day?language=es-ES', { fixture: 'series/seriesOfTheDay.json'}).as('seriesOfTheDay');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/airing_today?language=es-ES&page=1', { fixture: 'series/airingToday.json'}).as('airingToday');
    cy.intercept('GET', 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=es-ES&page=1&sort_by=popularity.desc&with_genres=10759', { fixture: 'series/seriesByGenre.json'}).as('seriesByGenre');     
  });

  it('See all the results when I click the view all button in the blockbusters section on the home page', () => {
    cy.visit('http://localhost:3000/');

    cy.wait('@upcomingMovies');
    cy.wait('@moviesNowPlaying');
    cy.wait('@popularMovies');
    cy.wait('@topRatedMovies');
    cy.wait('@onAirSeries');
    cy.wait('@popularSeries');
    cy.wait('@topRatedSeries');

    cy.get('div[data-test="hits"] > a').contains('Ver todo').click();

    cy.url().should('eq', 'http://localhost:3000/exitos-taquilla');

    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', { fixture: 'viewAll/hits/hits1.json' }).as('hits1');
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=2&region=ES', { fixture: 'viewAll/hits/hits2.json' }).as('hits2');
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=3&region=ES', { fixture: 'viewAll/hits/hits3.json' }).as('hits3');

    cy.wait('@hits1');
    cy.wait('@hits2');

    cy.scrollTo('bottom');

    cy.get('button').contains('Volver al inicio')
      .should('be.visible');
  });

  it('See all the results when I click the view all button in the trending movies section on the home page', () => {
    cy.visit('http://localhost:3000/');

    cy.wait('@upcomingMovies');
    cy.wait('@moviesNowPlaying');
    cy.wait('@popularMovies');
    cy.wait('@topRatedMovies');
    cy.wait('@onAirSeries');
    cy.wait('@popularSeries');
    cy.wait('@topRatedSeries');

    cy.get('div[data-test="trendingMovies"] > a').contains('Ver todo').click();

    cy.url().should('eq', 'http://localhost:3000/peliculas-en-tendencia');

    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'viewAll/trending/trending1.json' }).as('trending1');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=2', { fixture: 'viewAll/trending/trending2.json' }).as('trending2');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=3', { fixture: 'viewAll/trending/trending3.json' }).as('trending3');

    cy.wait('@trending1');
    cy.wait('@trending2');

    cy.get('footer').scrollIntoView();
    cy.wait(500);
    cy.get('footer').scrollIntoView();

    cy.get('button').contains('Volver al inicio')
      .should('be.visible');
  });

  it('See all the results when I click the view all button in the releases today section on the series page', () => {
    cy.visit('http://localhost:3000/series');

    cy.wait('@seriesOfTheDay');
    cy.wait('@airingToday');
    cy.wait('@seriesByGenre');

    cy.get('div[data-test="releasesToday"] > a').contains('Ver todo').click();

    cy.url().should('eq', 'http://localhost:3000/estrenos-series');

    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/airing_today?language=es-ES&page=1', { fixture: 'viewAll/releases/releases1.json' }).as('releases1');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/airing_today?language=es-ES&page=2', { fixture: 'viewAll/releases/releases2.json' }).as('releases2');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/airing_today?language=es-ES&page=3', { fixture: 'viewAll/releases/releases3.json' }).as('releases3');

    cy.wait('@releases1');
    cy.wait('@releases2');

    cy.get('footer').scrollIntoView();
    cy.wait(500);
    cy.get('footer').scrollIntoView();

    cy.get('button').contains('Volver al inicio')
      .should('be.visible');
  });
});
