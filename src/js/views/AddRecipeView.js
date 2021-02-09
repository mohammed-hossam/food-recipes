import View from './View';
import { previewView } from './PreviewView';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _windowElement = document.querySelector('.add-recipe-window');
  _overlayElement = document.querySelector('.overlay');
  _btnOpenElement = document.querySelector('.nav__btn--add-recipe');
  _btnCloseElement = document.querySelector('.btn--close-modal');
  _errorMsg = 'nnnnnnnnnnn';
  _succesMsg = 'reicpe is sent ';

  _generateHtml() {
    // const id = window.location.hash.slice(1);
    return this._data
      .map(el => {
        return previewView._generateHtmlPreview(el);
      })
      .join('');
  }
  constructor() {
    super();
    this._addHandelerOpenWindow();
    this._addHandelerCloseWindow();
  }

  toggle() {
    this._overlayElement.classList.toggle('hidden');
    this._windowElement.classList.toggle('hidden');
  }
  _addHandelerOpenWindow() {
    this._btnOpenElement.addEventListener('click', this.toggle.bind(this));
  }
  _addHandelerCloseWindow() {
    this._btnCloseElement.addEventListener('click', this.toggle.bind(this));
    this._overlayElement.addEventListener('click', this.toggle.bind(this));
  }

  adHandelerUpload(handeler) {
    this._parentElement.addEventListener('submit', function upload(e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)]; //formData btrg3 object fe name w value kol element fl form ele hd5lo ele hwa hena this (btshawr 3ala el parentelement hena) w h3mlo spread gwa array
      const dataObject = Object.fromEntries(dataArray); //fromEntries deh bt7wl array mkwn mn entries l object
      handeler(dataObject);
      console.log(dataArray);
      console.log(dataObject);
    });
  }
}

export const addRecipeView = new AddRecipeView();
