import View from './View';
import { previewView } from './PreviewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes found for your query! Please try again ;)';
  _succesMsg = 'smile';

  _generateHtml() {
    // const id = window.location.hash.slice(1);
    return this._data
      .map(el => {
        return previewView._generateHtmlPreview(el);
      })
      .join('');
  }
  // _generateHtml() {
  //   const id = window.location.hash.slice(1);
  //   return `${this._data
  //     .map(el => {
  //       return `<li class="preview">
  //   <a class="preview__link ${
  //     id === el.id ? 'preview__link--active' : ''
  //   } " href="#${el.id}">
  //     <figure class="preview__fig">
  //       <img src="${el.imageUrl}" alt="${el.title}" />
  //     </figure>
  //     <div class="preview__data">
  //       <h4 class="preview__title">${el.title}</h4>
  //       <p class="preview__publisher">${el.publisher}</p>
  //     </div>
  //   </a>
  // </li>;`;
  //     })
  //     .join('')}`;
  // }
}
export const resultsView = new ResultsView();
