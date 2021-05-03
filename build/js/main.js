// Рендеринг карточек + фильтрация по названию
// goodsRender

if (document.querySelector('.latest-developments')) {
    class Api {
        constructor () {
            this.url = 'https://603e38c548171b0017b2ecf7.mockapi.io/homes'
        }

        fetch(error, success) {
            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { 
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        success(JSON.parse(xhr.responseText));
                    } else if (xhr.status > 400) {
                        error();
                    }
                }
            }

            xhr.open('GET', this.url, true);
            xhr.send();
        }
    }

    class GoodsItem {
        constructor (title, address, type, id, price) {
            this.title = title;
            this.address = address;
            this.type = type;
            this.id = id;
            this.price = price;
        }
        getHtmlItem() {
            return `<a href="/details/${this.id}" class="latest-developments__card card"><div class="card__top"><img class="card__img" src="../src/static/img/jpg/1.jpg"><div class="card__type ${this.type === "SupportAvailable" ? 'orange-label' : 'blue-label'}">${this.type}</div></div><div class="card__info"><p class="card__title">${this.title}</p><p class="card__address">${this.address}</p><p class="card__price-tag">New Properties for Sale from <span>£<span class="card__price-value">${this.price}</span></span></p><p class="card__additional-info">Shared Ownership Available</p></div></a>`;
        }
    }

    class GoodsList {
        constructor () {
            this.api = new Api();
            this.$goodsList = document.querySelector('.latest-developments__content');
            this.goods = [];
            
            this.api.fetch(this.onFetchError.bind(this), this.onFetchSuccess.bind(this));
        }

        onFetchSuccess(data) {
            this.goods = data.map(({title, address, type, id, price}) => new GoodsItem(title, address, type, id, price));
            this.listFilter();
            this.render();
        }

        onFetchError() {
            this.$goodsList.insertAdjacentHTML('beforeend', '<h3>Что-то пошло не так</h3>');
        }

        render() {
            this.$goodsList.textContent = '';
            this.goods.forEach((good) => {
                this.$goodsList.insertAdjacentHTML('beforeend', good.getHtmlItem());
            })
            
        }

        listFilter() {
            var field = document.querySelector('.latest-developments__search-field input');
            
            field.addEventListener('input', () => {
                if (field.value.length >= 3) {
                    var searchThisTitle = field.value;
                    this.goods.forEach(card => {
                        if (card.title.indexOf(searchThisTitle) >= 0) {
                            this.$goodsList.textContent = '';
                            this.$goodsList.insertAdjacentHTML('beforeend', card.getHtmlItem())
                        } 
                    });
                } else {
                    this.render();
                };
            })
        }
    }

    const goodsList = new GoodsList();
}



