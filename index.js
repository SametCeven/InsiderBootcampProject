// eslint-disable

(() => {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";

    jqueryScript.onload = () => {
        main(jQuery);
    }

    document.head.appendChild(jqueryScript);
})();


main = ($) => {
    'use strict';

    const classes = {
        error: "error",
        loading: "loading",
        recommendationCarousel: "recommendation-carousel",
        carouselContainer: "carousel-container",
        similarProductTitle: "similar-product-title",
        carousel: "carousel",
        carouselBtn: "carousel-btn",
        buttonBack: "button-back",
        buttonNext: "button-next",
        slider: "slider",
        sliderWrapper: "slider-wrapper",
        sliderTray: "slider-tray",
        productContainer: "product-container",
        productInnerContainer: "product-inner-container",
        productCard: "product-card",
        productCardImgWrapper: "product-card-img-wrapper",
        productCardInfo: "product-card-info",
        favoriteOption: "favorite-option",
        productCardInfoTitle: "product-card-info-title",
        productCardName: "product-card-name",
        productCardInfoPrice: "product-card-info-price",
        productCardInfoCurrentPrice: "product-card-info-current-price",
        favLiked: "fav-liked",
        addToCart: "add-to-cart",
        addToCartBtn: "add-to-cart-btn",
    };

    const selectors = {
        appendLocation: `.product-detail`,
        error: `.${classes.error}`,
        loading: `.${classes.loading}`,
        body: "body",
        recommendationCarousel: `.${classes.recommendationCarousel}`,
        carouselContainer: `.${classes.carouselContainer}`,
        similarProductTitle: `.${classes.similarProductTitle}`,
        carousel: `.${classes.carousel}`,
        carouselBtn: `.${classes.carouselBtn}`,
        buttonBack: `.${classes.buttonBack}`,
        buttonNext: `.${classes.buttonNext}`,
        slider: `.${classes.slider}`,
        sliderWrapper: `.${classes.sliderWrapper}`,
        sliderTray: `.${classes.sliderTray}`,
        productContainer: `.${classes.productContainer}`,
        productInnerContainer: `.${classes.productInnerContainer}`,
        productCard: `.${classes.productCard}`,
        productCardImgWrapper: `.${classes.productCardImgWrapper}`,
        productCardInfo: `.${classes.productCardInfo}`,
        favoriteOption: `.${classes.favoriteOption}`,
        productCardInfoTitle: `.${classes.productCardInfoTitle}`,
        productCardName: `.${classes.productCardName}`,
        productCardInfoPrice: `.${classes.productCardInfoPrice}`,
        productCardInfoCurrentPrice: `.${classes.productCardInfoCurrentPrice}`,
        productSpan: `.${classes.productCardImgWrapper} span`,
        productImg: `.${classes.productCardImgWrapper} img`,
        recommendationCarouselA: `.${classes.recommendationCarousel} a`,
        favLiked: `.${classes.favLiked}`,
        favPath: `svg.fav path`,
        addToCart: `.${classes.addToCart}`,
        addToCartBtn: `.${classes.addToCartBtn}`,
    };

    const self = {
        loading: false,
        error: null,
        productData: [],
        currentIndex: 0,
        favData: [],
        isDragging: false,
        startX: 0,
        scrollLeft: 0,
    };

    const icons = {
        chevronButtonLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg>`,
        fav: `<svg class="fav" xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none"><path fill="#fff" fill-rule="evenodd" stroke="#B6B7B9" d="M19.97 6.449c-.277-3.041-2.429-5.247-5.123-5.247-1.794 0-3.437.965-4.362 2.513C9.57 2.147 7.993 1.2 6.228 1.2c-2.694 0-4.846 2.206-5.122 5.247-.022.135-.112.841.16 1.994.393 1.663 1.3 3.175 2.621 4.373l6.594 5.984 6.707-5.984c1.322-1.198 2.228-2.71 2.62-4.373.273-1.152.183-1.86.162-1.993z" clip-rule="evenodd"></path></svg>`,
    }

    self.init = async () => {
        self.reset();
        self.loadFont();
        self.buildCSS();
        self.buildHTML();
        self.setEvents();
        await self.initialDataFetch();
        self.renderProducts();
        self.getFavStorage();
        self.applyInitialFavStorage();
    };

    self.reset = () => {
        $(selectors.style).remove();
        $(document).off('.eventListener');
        $(selectors.wrapper).empty();
    };

    self.buildCSS = () => {
        const css = `
            ${selectors.body}{
                padding:0;
                margin:0;
                box-sizing: border-box;
            }
            ${selectors.recommendationCarousel}{
                background-color: #f4f5f7;
                color: rgb(85, 85, 85);
                display: flex;
                justify-content: center;
                font-size: 15px;
                font-family: "Open Sans", sans-serif;
                line-height: 21.4286px;
                padding: 0 15px;
                margin-left: 0px;
            }
            ${selectors.recommendationCarouselA}{
                text-decoration: none;
                color: rgb(48, 46, 43);
            }
            ${selectors.carouselContainer}{
                width: 100%;
            }
            ${selectors.similarProductTitle}{
                font-size: 24px;
                line-height: 33px;
                color: rgb(41, 50, 59);
                font-weight: 100;
                padding: 15px 0;
                margin: 0;
            }
            ${selectors.carousel}{
                display: flex;
                padding-bottom: 32px;
                position: relative;
            }
            ${selectors.carouselBtn}{
                display: none;
                position: absolute;
                top: 50%;
                background: none;
                border: none;
                cursor: pointer;
                text-transformation: none;
            }
            ${selectors.buttonBack}{
                left: -35px;
            }
            ${selectors.buttonNext}{
                right: -35px;
                transform: rotate(180deg);
            }
            ${selectors.slider}{
                position: relative;
                overflow: hidden;
                height: 540px;
                cursor: pointer;
            }
            ${selectors.sliderTray}{
                display: flex;
                flex-direction: row;
                align-items: stretch;
                padding: 0;
                margin: 0;
                transition: transform 500ms;
                transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
                will-change: auto;
                gap: 30px;
                overflow-x: hidden;
                scroll-behavior: smooth;
            }
            ${selectors.productContainer}{
                padding-bottom: unset;
                height: unset;
                float: left;
                position: relative;
            }
            ${selectors.productInnerContainer}{
                position: unset;
                width: calc(100% - 10px);
                height: calc(100% - 10px);
                left: 5px;
                top: 5px;
            }
            ${selectors.productCard}{
                width: 280px;
                height: 511px;
                color: rgb(85, 85, 85);
                position: relative;
                background-color: rgb(255, 255, 255);
            }
            ${selectors.productCardImgWrapper}{
                position: relative;
            }
            ${selectors.favoriteOption}{
                position: absolute;
                top: 6%;
                right: 10%;
                cursor: default;
            }
            ${selectors.productCardInfo}{
                display: flex;
                flex-direction: column;
                padding: 0 10px;
            }
            ${selectors.productSpan}{
                color: transparent;
                display: inline-block;
            }
            ${selectors.productImg}{
                width: 100%;
                height: 100%;
                vertical-align: middle;
                border: 0;
            }
            ${selectors.productCardInfoTitle}{
                overflow: hidden;
                font-size: 14px;
                height: 40px;
                margin-top: 5px;
                @supports (-webkit-line-clamp: 2){
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: initial;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            ${selectors.productCardName}{
                margin: 0 0 10px;
            }
            ${selectors.productCardInfoPrice}{
                display: flex;
                align-items: flex-start;
                height: 50px;
                flex-direction: column;
                margin-top: 8px;
            }
            ${selectors.productCardInfoCurrentPrice}{
                color: #193db0;
                font-size: 18px;
                display: flex;
                height: 44px;
                align-items: flex-end;
                line-height: 22px;
                font-weight: bold;
            }
            ${selectors.favLiked}{
                fill: #193DB0;
            }
            ${selectors.addToCart}{
                display: flex;
                gap: 5px;
            }
            ${selectors.addToCartBtn}{
                height: 35px;
                display: block;
                background-color: #193db0;
                color: #fff;
                width: 100%;
                border-radius: 5px;
                border: none;
                line-height: 19px;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                cursor: pointer;
                font-family: "Open Sans", sans-serif;
            }
            
            @media (min-width: 992px){
                ${selectors.recommendationCarousel}{
                    display: flex;
                    justify-content: center;
                    padding: 0px !important;
                }
                ${selectors.carouselContainer}{
                    display: block;
                    width: 80%;
                    position: relative;
                }
                ${selectors.similarProductTitle}{
                    font-size: 32px;
                    line-height: 43px;
                }
                ${selectors.productCard}{
                    width: 220px;
                    height: auto;
                }
                ${selectors.carouselBtn}{
                    display: block;
                }
                ${selectors.slider}{
                    height: 396.23px;
                }
                ${selectors.sliderTray}{
                    gap: 10px;
                }
                ${selectors.addToCart}{
                    display: none;
                }
            }

        `;

        $('<style>').addClass('carousel-style').html(css).appendTo(selectors.appendLocation);
    };

    self.buildHTML = () => {
        const html = `
            <div class=${classes.recommendationCarousel}>
                <div class=${classes.carouselContainer}>
                    <p class=${classes.similarProductTitle}> You Might Also Like </p>
                    <div class=${classes.carousel}>
                        <button type="button" aria-label="previous" class="${classes.carouselBtn} ${classes.buttonBack}">
                            ${icons.chevronButtonLeft}
                        </button>
                        <div class=${classes.slider} aria-live="polite" aria-label="slider">
                            <div class=${classes.sliderWrapper}>
                                <div class=${classes.sliderTray}></div>
                            </div>
                        </div>
                        <button type="button" aria-label="next" class="${classes.carouselBtn} ${classes.buttonNext}">
                            ${icons.chevronButtonLeft}
                        </button>
                    </div>
                </div>
            </div>
        `;

        $(selectors.appendLocation).append(html);
    };

    self.setEvents = () => {
        $(document).on("click.eventListener", selectors.buttonNext, (e) => {
            const productWidth = $(selectors.productContainer).outerWidth(true);
            const sliderTrayWidth = $(selectors.sliderTray).outerWidth(true);

            const visibleProductCount = Math.floor(sliderTrayWidth / productWidth);
            const totalProductsCount = self.productData.length;
            const maxIndex = totalProductsCount - visibleProductCount;

            if (self.currentIndex < maxIndex) {
                self.currentIndex++;
                self.updateSliderPosition();
            }
        });

        $(document).on("click.eventListener", selectors.buttonBack, (e) => {
            if (self.currentIndex > 0) {
                self.currentIndex--;
                self.updateSliderPosition();
            }
        });

        $(window).on("resize", self.debounce(() => {
            self.updateSliderPosition();
        }, 200))

        $(document).on("click.eventListener", selectors.favoriteOption, (e) => {
            const $target = $(e.currentTarget).find(selectors.favPath);
            $target.toggleClass(classes.favLiked);
            const id = $target.closest(selectors.productContainer).data("id");
            self.toggleFavStorage(id);
        })

        $(document).on("mousedown.eventListener", selectors.sliderTray, (e) => {
            self.isDragging = true;
            self.startX = e.pageX;
            self.scrollLeft = e.currentTarget.scrollLeft;
            $(selectors.sliderTray).find("img").on("dragstart", (e) => e.preventDefault());
            $(selectors.body).css({
                "user-select": "none",
            })
        })

        $(document).on("mouseleave.eventListener mouseup.eventListener", selectors.sliderTray, (e) => {
            self.isDragging = false;
            const scrollLeft = e.currentTarget.scrollLeft;
            const productWidth = $(selectors.productContainer).outerWidth(true);
            self.currentIndex = Math.round(scrollLeft / productWidth);
        })

        $(document).on("mousemove.eventListener", selectors.sliderTray, (e) => {
            if (!self.isDragging) return;
            e.preventDefault();
            const x = e.pageX;
            const walk = (x - self.startX) * 1.5;
            e.currentTarget.scrollLeft = self.scrollLeft - walk;
        })

        $(document).on("touchstart.eventListener", selectors.sliderTray, (e) => {
            self.isDragging = true;
            self.startX = e.originalEvent.touches[0].pageX;
            self.scrollLeft = e.currentTarget.scrollLeft;

            $(selectors.sliderTray).find("img").on("dragstart", (e) => e.preventDefault());

            $(selectors.body).css({
                "user-select": "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none",
                "-moz-user-select": "none",
                "touch-action": "pan-y",
            })
        })

        $(document).on("touchmove.eventListener", selectors.sliderTray, (e) => {
            if (!self.isDragging) return;

            const x = e.originalEvent.touches[0].pageX;
            const walk = (x - self.startX) * 1.5;
            e.currentTarget.scrollLeft = self.scrollLeft - walk;

            e.preventDefault();
        })

        $(document).on("touchend.eventListener touchcancel.eventListener", selectors.sliderTray, (e) => {
            self.isDragging = false;

            const scrollLeft = e.currentTarget.scrollLeft;
            const productWidth = $(selectors.productContainer).outerWidth(true);

            self.currentIndex = Math.round(scrollLeft / productWidth);

            $(selectors.body).css({
                "user-select": "",
                "-webkit-user-select": "",
                "-ms-user-select": "",
                "-moz-user-select": "",
                "touch-action": "",
            })
        })
    };


    self.fetchData = async () => {
        const baseUrl = `https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json`;
        self.loading = true;
        self.error = null;
        self.productData = [];

        try {
            const res = await fetch(baseUrl);
            if (!res.ok) throw new Error(`Error : ${res.status}`);
            const data = await res.json();
            self.productData = data;
            self.setProductStorage();
        } catch (err) {
            self.error = err;
            self.renderError();
        } finally {
            self.loading = false;
        }
    }


    self.renderProducts = () => {
        if (!self.loading && !self.error) {
            self.productData.forEach((product) => {
                const $productItem = $(`
                    <div class=${classes.productContainer} data-id=${product.id}>
                        <div class=${classes.productInnerContainer}>
                            <div class=${classes.productCard}>
                                <div class=${classes.productCardImgWrapper}>
                                    <a href=${product.url} target="__blank"> 
                                        <span>
                                            <img src="${product.img}"></img>
                                        </span>
                                    </a>
                                    <div class=${classes.favoriteOption}>
                                        ${icons.fav}
                                    </div>
                                </div>
                                <div class=${classes.productCardInfo}>
                                    <div class=${classes.productCardInfoTitle}>
                                        <a href=${product.url} target="__blank">
                                            <p class=${classes.productCardName}> ${product.name} </p>
                                        </a>
                                    </div>
                                    <div class=${classes.productCardInfoPrice}>
                                        <div class=${classes.productCardInfoCurrentPrice}>
                                            ${product.price} TL
                                        </div>
                                    </div>
                                    <div class=${classes.addToCart}>
                                        <button class=${classes.addToCartBtn}> Add To Cart </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `)

                $(selectors.sliderTray).append($productItem)
            })
        }
    }

    self.renderError = () => {
        const $errNotification = $(`<div> ${self.error} </div>`);
        $(selectors.recommendationCarousel).remove();
        $(selectors.appendLocation).append($errNotification);
    }

    self.loadFont = () => {
        const fontLink = document.createElement("link");
        fontLink.href = "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
    };

    self.updateSliderPosition = () => {
        const $sliderTray = $(selectors.sliderTray);
        const productWidth = $(selectors.productContainer).outerWidth(true) + 10;
        const scrollLeft = self.currentIndex * productWidth;
        $sliderTray.scrollLeft(scrollLeft);
    }

    self.toggleFavStorage = (id) => {
        if (self.favData.includes(id)) {
            self.favData = self.favData.filter((f) => f !== id);
        } else {
            self.favData.push(id);
        }
        localStorage.setItem("fav", JSON.stringify(self.favData));
    }

    self.getFavStorage = () => {
        if (localStorage.getItem("fav")) {
            self.favData = JSON.parse(localStorage.getItem("fav"));
        } else {
            localStorage.setItem("fav", self.favData);
        }
    }

    self.applyInitialFavStorage = () => {
        const $productContainer = $(selectors.productContainer);
        $productContainer.each((index, product) => {
            const id = $(product).data("id");
            if (self.favData.includes(id)) {
                $(product).find(selectors.favPath).toggleClass(classes.favLiked);
            }
        })
    }

    self.setProductStorage = () => {
        localStorage.setItem("product", JSON.stringify(self.productData));
    }

    self.getProductStorage = () => {
        self.productData = JSON.parse(localStorage.getItem("product"));
    }

    self.initialDataFetch = async () => {
        self.getProductStorage();
        if (!self.productData) {
            await self.fetchData();
        }
    }

    self.debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
    }

    $(document).ready(self.init);


};
