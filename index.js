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
    };

    const self = {
        loading: false,
        error: null,
        productData: [],
        currentIndex: 0,
    };

    const icons = {
        chevronButtonLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg>`,
        fav: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none"><path fill="#fff" fill-rule="evenodd" stroke="#B6B7B9" d="M19.97 6.449c-.277-3.041-2.429-5.247-5.123-5.247-1.794 0-3.437.965-4.362 2.513C9.57 2.147 7.993 1.2 6.228 1.2c-2.694 0-4.846 2.206-5.122 5.247-.022.135-.112.841.16 1.994.393 1.663 1.3 3.175 2.621 4.373l6.594 5.984 6.707-5.984c1.322-1.198 2.228-2.71 2.62-4.373.273-1.152.183-1.86.162-1.993z" clip-rule="evenodd"></path></svg>`,
    }

    self.init = () => {
        self.reset();
        self.loadFont();
        self.buildCSS();
        self.buildHTML();
        self.setEvents();
        self.fetchData();
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
                height: 396.328px;
                cursor: pointer;
            }
            ${selectors.sliderWrapper}{
            
            }
            ${selectors.sliderTray}{
                display: flex;
                flex-direction: row;
                align-items: stretch;
                transform: translateX(0%) translateX(0px);
                padding: 0;
                margin: 0;
                transition: transform 500ms;
                transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
                will-change: auto;
                gap: 10px;
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
                height: auto;
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
                color: #007aff;
            }
            
            @media (min-width: 992px){
                ${selectors.recommendationCarousel}{
                    display: flex;
                    justfiy-content: center;
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
            const productWidth = $(selectors.productContainer).width();
            const sliderTrayWidth = $(selectors.sliderTray).width();

            const visibleProductCount = Math.floor(sliderTrayWidth / productWidth);
            const totalProductsCount = self.productData.length;
            const maxIndex = totalProductsCount - visibleProductCount;

            if(self.currentIndex < maxIndex){
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

        $(window).on("resize", () => {
            self.updateSliderPosition();
        })

    };


    self.fetchData = async () => {
        const baseUrl = `https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json`;
        self.loading = true;
        self.error = null;
        self.productData = [];

        $.ajax({
            url: baseUrl,
            method: "GET",
        }).done((res) => {
            self.productData = JSON.parse(res);
            self.loading = false;
            self.renderProducts();
        }).fail((err) => {
            self.error = err;
        }).always(() => {
            self.loading = false;
        })
    }


    self.renderProducts = () => {
        if (!self.loading && !self.error) {
            self.productData.forEach((product) => {
                const $productItem = $(`
                    <div class=${classes.productContainer}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                `)

                $(selectors.sliderTray).append($productItem)
            })
        }
    }

    self.loadFont = () => {
        const fontLink = document.createElement("link");
        fontLink.href = "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
    };

    self.updateSliderPosition = () => {
        const $sliderTray = $(selectors.sliderTray);
        const productWidth = $(selectors.productContainer).width();
        const sliderTrayFullWidth = $sliderTray[0].scrollWidth;
        const sliderTrayWidth = $sliderTray.width();

        let offset = self.currentIndex * productWidth;
        const maxOffset = sliderTrayFullWidth - sliderTrayWidth;

        if(offset > maxOffset){
            offset = maxOffset;
        }

        $sliderTray.css({
            transform: `translateX(-${offset}px)`
        })
    }



    $(document).ready(self.init);


};
