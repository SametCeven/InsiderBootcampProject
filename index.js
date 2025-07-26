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
        style: 'custom-style',
        error: "error",
        loading: "loading",
    };

    const selectors = {
        appendLocation: `.product-detail`,
        error: `.${classes.error}`,
        loading: `.${classes.loading}`,
    };

    const self = {
        loading: false,
        error: null,
        productData: [],
    };

    self.init = () => {
        self.reset();
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
        const root = {
            "primary-color": "#112D4E",
            "secondary-color": "#3F72AF",
            "third-color": "#DBE2EF",
            "fourth-color": "#F9F7F7",
            "error-color": "#850505",
            "rounded-sm": "5px",
            "rounded-md": "10px",
            "primary-font": "Arial",
        }

        const css = `
            .container {
                background-color: ${root["primary-color"]};
                height: 100px;
                width: 100px;
            }
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo(selectors.appendLocation);
    };

    self.buildHTML = () => {
        const html = `
            <div class="container">
                <h1> hello </h1>
            </div>
        `;

        $(selectors.appendLocation).append(html);
    };

    self.setEvents = () => {

    };


    self.fetchData = () => {
        const baseUrl = `https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json`;
        self.loading = true;
        self.error = null;
        self.productData = [];

        $.ajax({
            url: baseUrl,
            method: "GET",
        }).done((res) => {
            self.productData = JSON.parse(res);
            console.log(self.productData);
            self.loading = false;
        }).fail((err) => {
            self.error = err;
        }).always(() => {
            self.loading = false;
        })
    }






    $(document).ready(self.init);


};
