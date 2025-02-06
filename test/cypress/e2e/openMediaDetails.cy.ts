describe('Navigate to media page and show detailed info', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=es', { fixture: 'movies/upcomingMovies.json'}).as('upcomingMovies');     
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', { fixture: 'movies/moviesNowPlaying.json'}).as('moviesNowPlaying');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'movies/popularMovies.json'}).as('popularMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/top_rated?language=es-ES&region=es&page=1', { fixture: 'movies/topRatedMovies.json'}).as('topRatedMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/on_the_air?language=es-ES&timezone=es&page=1', { fixture: 'series/onAirSeries.json'}).as('onAirSeries');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/tv/week?language=es-ES&page=1', { fixture: 'series/popularSeries.json'}).as('popularSeries');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=1', { fixture: 'series/topRatedSeries.json'}).as('topRatedSeries');

    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/93405?language=es-ES', { fixture: 'mediaDetails/mediaDetails.json'}).as('mediaDetails');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/93405/watch/providers', { fixture: 'mediaDetails/providers.json'}).as('providers');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/93405/credits?language=es-ES', { fixture: 'mediaDetails/credits.json'}).as('credits');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/93405/recommendations?language=en-US&page=1', { fixture: 'mediaDetails/recomendations.json'}).as('recomendations');
  });

  it('Click a serie on popular series carousel then I want to show serie details' , () => {
    cy.visit('http://localhost:3000/');

    cy.wait('@upcomingMovies');
    cy.wait('@moviesNowPlaying');
    cy.wait('@popularMovies');
    cy.wait('@topRatedMovies');
    cy.wait('@onAirSeries');
    cy.wait('@popularSeries');
    cy.wait('@topRatedSeries');

    cy.get('section[data-test="sectionMediaTest"] > section a[data-test="horizontalCard"]').eq(3).click();

    cy.url().should('eq', 'http://localhost:3000/tv/93405');

    cy.wait('@mediaDetails');
    cy.wait('@providers');
    cy.wait('@credits');
    cy.wait('@recomendations');

    cy.get('h1').contains('El juego del calamar');
    
    cy.get('div[data-test="providers"] > img')
      .should('have.length', 2);
    
    cy.get('section[data-test="actors"] > article')
      .should('have.length', 6);

    cy.get('section[data-test="lastEpisode"]')
      .get('h3 > span').contains('Amigos o enemigos')
      .get('p').contains('Los jugadores restantes');
  });
});