import View from './View';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _generateHtmlPreview(el) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
    <a class="preview__link ${
      id === el.id ? 'preview__link--active' : ''
    } " href="#${el.id}">
      <figure class="preview__fig">
        <img src="${el.imageUrl}" alt="${el.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${el.title}</h4>
        <p class="preview__publisher">${el.publisher}</p>
      </div>
    </a>
  </li>;`;
  }
}

export const previewView = new PreviewView();
