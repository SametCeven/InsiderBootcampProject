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
    };

    const self = {
        loading: false,
        error: null,
    };

    self.init = () => {
        self.reset();
        self.buildCSS();
        self.buildHTML();
        self.setEvents();
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








    $(document).ready(self.init);


};
