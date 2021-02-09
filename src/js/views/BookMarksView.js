import View from './View';
import { previewView } from './PreviewView';
import icons from 'url:../../img/icons.svg';

class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No bookmarks yest find a recipe and bookmark it ;)';
  _succesMsg = 'smile';

  _generateHtml() {
    // const id = window.location.hash.slice(1);
    return this._data
      .map(el => {
        return previewView._generateHtmlPreview(el);
      })
      .join('');
  }

  addHandelerBookMarks(handeler) {
    window.addEventListener('load', handeler);
  }
}

export const bookMarksView = new BookMarksView();
