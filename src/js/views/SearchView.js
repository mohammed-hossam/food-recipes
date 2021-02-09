import View from './View';
class SearchView extends View {
  _parentElement = document.querySelector('.search');
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    // console.log(query);
    // this.clearInput();
    return query;
  }
  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addHandelerSearch(handeler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handeler();
    });
  }
}
export const searchView = new SearchView();
