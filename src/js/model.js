import { API_URL, RES_PER_PAGE, KEY } from './config';
import { ajax } from './helpers';
// import { getJson, sendJson } from './helpers';

export const state = {
  recipe: {},
  search: { query: '', results: [], resultsPerPage: RES_PER_PAGE, page: 1 },
  bookMarks: [],
};

export async function loadSearchResults(query) {
  try {
    const data = await ajax(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.query = query;
    console.log(state.search.query);
    state.search.page = 1; //dah t3del mn 3nde 3ala 7ett en lma 28yr el page w3ml search tany byege el search msh mn page1 la2 mn nfs el page ele 8yrtha
    state.search.results = data.data.recipes.map(el => {
      return {
        id: el.id,
        title: el.title,
        publisher: el.publisher,
        imageUrl: el.image_url,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
}

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //10 deh kmyt l ntayg ele 3yzha mn el array
  const end = page * state.search.resultsPerPage; //0-10 kda 11 bs slice l end bt3ha msh by7sb 2a5er wa7da fa 10 deh k2nha 9 fa kda mn 0-9 y3ny 10 ntayg
  // state.search.page = 1;
  return state.search.results.slice(start, end);
};

function createRecipe(data) {
  let { recipe } = data.data;
  console.log(recipe);
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
}
export async function loadRecipe(id) {
  try {
    const data = await ajax(`${API_URL}${id}`);
    console.log(data);
    createRecipe(data);

    if (state.bookMarks.some(bookmark => bookmark.id === id))
      state.recipe.bookMarked = true;
    else state.recipe.bookMarked = false;
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
}

export function updateServings(newNumberOfServings) {
  console.log(newNumberOfServings);
  const newQuantityFactor = newNumberOfServings / state.recipe.servings;
  // console.log(newQuantityFactor);
  state.recipe.ingredients.forEach(obj => {
    obj.quantity = obj.quantity * newQuantityFactor;
  });
  // console.log(state.recipe.ingredients);
  state.recipe.servings = newNumberOfServings;
  console.log(newNumberOfServings);
}

export function addBookmark(recipe) {
  state.bookMarks.push(recipe);

  if (state.recipe.id === recipe.id) {
    state.recipe.bookMarked = true;
  }
  console.log(state.recipe);
  persistBookmark();
}

export function deletBookMark(id) {
  const index = state.bookMarks.findIndex(el => {
    return el.id === id;
  });
  state.bookMarks.splice(index, 1);
  if (state.recipe.id === id) {
    state.recipe.bookMarked = false;
  }

  persistBookmark();
}

function persistBookmark() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
}

function getLocalStorage() {
  const storage = localStorage.getItem('bookmarks');
  if (storage) {
    state.bookMarks = JSON.parse(storage);
  }
  console.log(state.bookMarks);
}

function int() {
  getLocalStorage();
}
int();

export async function uploadNewRecipe(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        console.log(ingArr);
        if (ingArr.length !== 3) {
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );
        }
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    //enties 3ks fromEntires btrg3 array mn object feh form entires
    console.log(ingredients);
    console.log(newRecipe);

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await ajax(`${API_URL}?key=${KEY}`, recipe);
    console.log(data);
    createRecipe(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
}
