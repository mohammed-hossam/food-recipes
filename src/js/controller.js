import * as model from './model';
import { recipeView } from './views/RecipeView';
import { searchView } from './views/SearchView';
import { resultsView } from './views/ResultsView';
import { paginationView } from './views/PaginationView';
import { bookMarksView } from './views/BookMarksView';
import { addRecipeView } from './views/AddRecipeView';

import View from './views/View';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlsearchResults() {
  try {
    resultsView.renderSpinner();
    //1) get search query
    const query = searchView.getQuery(); //hn5le getQuery taba3 el view 3shan feha dom
    console.log(query);
    if (!query) {
      console.log(query);
      return;
    }

    //2) change state to get data
    await model.loadSearchResults(query); //change the state
    // const queryResluts = model.state.search.results;
    const onlySomeQueryResults = model.getSearchResultsPage();

    //3) render results
    // resultsView.render(queryResluts);
    resultsView.render(onlySomeQueryResults);

    // 4) render pagination View
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
}

function controlPagination(goToPage) {
  const onlySomeQueryResults = model.getSearchResultsPage(goToPage);
  //1) render new results
  resultsView.render(onlySomeQueryResults);
  //2) render new pagination veiw
  paginationView.render(model.state.search);
}

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) {
      return;
    }
    recipeView.renderSpinner();
    //  Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    bookMarksView.update(model.state.bookMarks);

    //change the state
    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    console.log(recipe);
    // render
    recipeView.render(recipe);
  } catch (err) {
    recipeView.errorRender();
    console.error(err);
  }
}

function controlServings(newServings) {
  //1) udpate data
  model.updateServings(newServings);

  //2) update veiw
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookMarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deletBookMark(model.state.recipe.id);
  }

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) render bookmarks
  bookMarksView.render(model.state.bookMarks);
}

function controlBookMarks() {
  bookMarksView.render(model.state.bookMarks);
}

async function controlAddRecipe(newRecipe) {
  try {
    // spinner
    addRecipeView.renderSpinner();

    // upload the newRecipe
    await model.uploadNewRecipe(newRecipe);

    //render the newRecipe
    recipeView.render(model.state.recipe);

    //render sucess msg
    addRecipeView.succesRender();

    //close form window
    setTimeout(() => {
      addRecipeView.toggle();
    }, 2500);

    //bookmarks render
    bookMarksView.render(model.state.bookMarks);

    //change id in the url(will allow us to change the url without reloading the page)(API)
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.errorRender(err.message);
    console.log(err);
  }
}

bookMarksView.addHandelerBookMarks(controlBookMarks);
recipeView.addHandelerRender(controlRecipe);
searchView.addHandelerSearch(controlsearchResults);
paginationView.addHandelerClick(controlPagination);
recipeView.addHandelerUpdateServings(controlServings);
recipeView.addHandlerAddBookmark(controlAddBookmark);
addRecipeView.adHandelerUpload(controlAddRecipe);
