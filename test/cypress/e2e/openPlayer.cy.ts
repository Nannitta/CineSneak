describe('Open and close view trailer', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=es', { fixture: 'movies/upcomingMovies.json'}).as('upcomingMovies');     
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', { fixture: 'movies/moviesNowPlaying.json'}).as('moviesNowPlaying');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'movies/popularMovies.json'}).as('popularMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'movies/popularMovies.json'}).as('popularMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/top_rated?language=es-ES&region=es&page=1', { fixture: 'movies/topRatedMovies.json'}).as('topRatedMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/on_the_air?language=es-ES&timezone=es&page=1', { fixture: 'series/onAirSeries.json'}).as('onAirSeries');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/tv/week?language=es-ES&page=1', { fixture: 'series/popularSeries.json'}).as('popularSeries');
    cy.intercept('GET', 'https://api.themoviedb.org/3/tv/top_rated?language=es-ES&page=1', { fixture: 'series/topRatedSeries.json'}).as('topRatedSeries');
  });

  it('Open player when click on button trailer', () => {   
    cy.visit('http://localhost:3000/');

    cy.wait('@upcomingMovies');
    cy.wait('@moviesNowPlaying');
    cy.wait('@popularMovies');
    cy.wait('@topRatedMovies');
    cy.wait('@onAirSeries');
    cy.wait('@popularSeries');
    cy.wait('@topRatedSeries');

    cy.get('button').contains('Ver tráiler').first().click().wait(500);

    const player = cy.get('aside > div > iframe')
      .should('have.attr', 'src')
      .and('include', 'autoplay=1')
      .and('include', 'youtube.com/embed/');

    const asidePlayer = cy.get('aside');
    asidePlayer.click();

    player.should('have.class', 'flex fixed bottom-0 right-0 z-30 fade-in');
  });

  it('Close player when click on close button' , () => {
    cy.visit('http://localhost:3000/');

    cy.wait('@upcomingMovies');
    cy.wait('@moviesNowPlaying');
    cy.wait('@popularMovies');
    cy.wait('@topRatedMovies');
    cy.wait('@onAirSeries');
    cy.wait('@popularSeries');
    cy.wait('@topRatedSeries');
    
    cy.get('button').contains('Ver tráiler').first().click().wait(500);

    const asidePlayer = cy.get('aside');
    asidePlayer.click();

    const closePlayerButton = cy.get('div[data-test="closePlayer"]');
    closePlayerButton.should('have.class', 'hidden');

    const containerPlayer = cy.get('div[data-test="containerCloseButton"]');
    containerPlayer.trigger('mouseover');
    
    closePlayerButton.click();

    asidePlayer.should('not.exist');
  });
});