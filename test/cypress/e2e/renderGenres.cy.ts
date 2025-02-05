describe('Check the rendering of the different genres', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', { fixture: 'movies/moviesNowPlaying.json'}).as('moviesNowPlaying');
    cy.intercept('GET', 'https://api.themoviedb.org/3/trending/movie/week?language=es-ES&page=1', { fixture: 'movies/popularMovies.json'}).as('popularMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&region=es&sort_by=popularity.desc&with_genres=28', { fixture: 'genresList/action.json'}).as('action');     
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/10?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/173710?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/328?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/748?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/9485?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/1241?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/119?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');
    cy.intercept('GET', 'https://api.themoviedb.org/3/collection/86311?language=es-ES', { fixture: 'movies/moviesCollections.json'}).as('collectionsMovies');

    cy.intercept('GET', 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&region=es&sort_by=popularity.desc&with_genres=14', { fixture: 'genresList/fantasy.json'}).as('fantasy');     
    cy.intercept('GET', 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&region=es&sort_by=popularity.desc&with_genres=37', { fixture: 'genresList/western.json'}).as('western');     
  });

  it('Click on genre button then I want to render the carousel of movies of that genre', () => {
    cy.visit('http://localhost:3000/peliculas');

    cy.wait('@moviesNowPlaying');
    cy.wait('@popularMovies');
    cy.wait('@action');

    cy.get('ul[data-test="genresList"]');
    cy.get('ul[data-test="genresList"] > li').first().contains('Acción')
      .should('have.css', 'color', 'rgb(0, 0, 0)')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)');
    
    const fantasyGenre: Cypress.Chainable<JQuery<HTMLElement>> = cy.get('ul[data-test="genresList"] > li').eq(8).contains('Fantasía').click();

    cy.wait('@fantasy');

    fantasyGenre.should('have.css', 'color', 'rgb(0, 0, 0)')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)');

    const westernGenre: Cypress.Chainable<JQuery<HTMLElement>> = cy.get('ul[data-test="genresList"] > li').eq(18).contains('Western').click();

    cy.wait('@western');

    westernGenre.should('have.css', 'color', 'rgb(0, 0, 0)')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)');    
  });
});