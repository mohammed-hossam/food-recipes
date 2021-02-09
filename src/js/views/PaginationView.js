import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandelerClick(handeler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      // console.log(btn);
      if (!btn) {
        return;
      }
      const goToPage = parseInt(btn.dataset.goto);
      handeler(goToPage);
    });
  }

  _generateHtml() {
    const currPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numberOfPages);

    //1) page 1 and there are no more pages
    if (currPage === 1 && numberOfPages === 1) {
      return ``;
    }

    //1) page 1 and there are more pages
    if (currPage === 1 && numberOfPages > 1) {
      return `
    <button data-goto='${
      currPage + 1
    }' class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //3) not page1 and there are more pages
    if (currPage < numberOfPages) {
      return `<button data-goto='${
        currPage - 1
      }' class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage - 1}</span>
    </button>
    <button data-goto=' ${
      currPage + 1
    }' class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //1) last page
    if (currPage === numberOfPages) {
      return `<button data-goto='${
        currPage - 1
      }' class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currPage - 1}</span>
  </button>`;
    }
  }
}

export const paginationView = new PaginationView();
