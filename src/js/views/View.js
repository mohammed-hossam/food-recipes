import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    console.log(data);
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.errorRender();
    }
    //lma 2gy 23ml search 3ala 7aga msh mwgoda bydene en el status succes 3shan byrg3 arrat fadya fa 3ayz lma y7sl kda 2a2lo y3mml render l error mo3yn(w kaman bl mara h2olo en lw el data msh mwgoda bshkl 3am)
    this._data = data;
    const html = this._generateHtml();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0)) {
    //   return this.errorRender();
    // }

    this._data = data;
    const Newhtml = this._generateHtml();
    const newDom = document.createRange().createContextualFragment(Newhtml);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(newDom);
    // console.log(newElements);
    // console.log(currElements);

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      // console.log(currEl.firstChild);
      // update text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }
      // update attribute
      if (!newEl.isEqualNode(currEl)) {
        // console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    // console.log('sekoekoseko');
    const spinnerHtml = `<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerHtml);
  }

  errorRender(msg = this._errorMsg) {
    // console.log(' errorRender');
    const errorHtml = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${msg}</p>
  </div>
  `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', errorHtml);
  }

  succesRender(msg = this._succesMsg) {
    console.log('mamamam');
    const succesHtml = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${msg}</p>
  </div>
  `;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', succesHtml);
  }
}
