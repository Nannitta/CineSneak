describe('Check the search bar by keyword, with type and category and errors', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=es', { fixture: 'movies/upcomingMovies.json'}).as('upcomingMovies');     
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=ES', { fixture: 'movies/moviesNowPlaying.json'}).as('moviesNowPlaying');
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
  });

  it('Open search menu when click on search button', () => {
    cy.get('header button[data-test="searchButton"]').click();

    cy.get('div[data-test="containerSearchMenu"]').should('be.visible');
  });

  it('Check that an error occurs when sending the empty input', () => {
    cy.get('header button[data-test="searchButton"]').click();

    cy.get('div[data-test="containerSearchMenu"]').should('be.visible');

    cy.get('input[data-test="searchInput"]').should('be.empty').focus().type('{enter}');

    cy.get('div[data-test="errorMessage"]').contains('Por favor')
      .should('have.css', 'color', 'rgb(239, 83, 80)');
  });

  it('Check that the search bar works only with keyword', () => {
    cy.get('header button[data-test="searchButton"]').click();
    
    cy.get('div[data-test="containerSearchMenu"]').should('be.visible');
    
    cy.get('input[data-test="searchInput"]').should('be.empty').focus().type('shrek').type('{enter}');

    cy.intercept('GET', 'https://api.themoviedb.org/3/search/multi?query=shrek&include_adult=false&language=es-ES&page=1', { fixture: 'search/byKeyword.json' }).as('keyword1');
    cy.intercept('GET', 'https://api.themoviedb.org/3/search/multi?query=shrek&include_adult=false&language=es-ES&page=2', { fixture: 'search/byKeyword2.json' }).as('keyword2');

    cy.url().should('eq', 'http://localhost:3000/search/shrek');

    cy.wait('@keyword1');
    cy.wait('@keyword2');

    cy.get('h1').contains('Resultados');
    cy.get('ul > li > a > article > div > p').contains('Shrek');
  });

  it('Check that the search bar works with keyword and category and genre', () => {
    cy.get('header button[data-test="searchButton"]').click();
    
    cy.get('div[data-test="containerSearchMenu"]').should('be.visible');

    cy.get('input[data-test="searchInput"]').should('be.empty').focus().type('anillos');

    cy.get('div[data-test="catContainer"] > span').contains('Películas').click()
      .should('have.class', 'tag');
    
    cy.get('div[data-test="genresListButtons"] > span').eq(2).contains('Animación').click()
      .should('have.class', 'tag');
    
    cy.get('div[data-test="searchButton"] > button').contains('Buscar').click();

    cy.intercept('GET', 'https://api.themoviedb.org/3/search/multi?query=anillos&include_adult=false&language=es-ES&page=1', { fixture: 'search/keywordAndCat.json' }).as('keywordAndCat');

    cy.url().should('eq', 'http://localhost:3000/search/advanced?query=anillos&category=peliculas&genre=16');

    cy.wait('@keywordAndCat');

    cy.get('h1').contains('Resultados');
    cy.get('ul > li > a > article > div > p').contains('Rohirrim');
  });
});