(function ($) {
    $.fn.loadWithAjax = function (options) {
        // Déclarations de valeurs par défaut
        let settings = $.extend({
            output: 'output',
            dataDiv: 'data',
            removeExtension: false,
            baseFile: "index.html",
            loader: {
                source: 'https://bit.ly/2Jmnf3u',
                css: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "none",
                }
            },
            baseUrl: window.location.origin + window.location.pathname
        }, options);

        Loader.createLoader(settings.loader);
        this.click(function (event) {
            let link = $(this).attr("href").substring($(this).attr("href").lastIndexOf('/') + 1);
            Page.getPage(settings, link, event);
            ManageBrowser.updateHistory(link, settings)
        });

        window.onpopstate = function (event) {
            let link = event.state ? event.state.pathFile : "/";
            Page.getPage(settings, link, event);
        };
        return this;
    };

    $(document).ajaxSuccess(() => {
        Loader.hideLoader();
    });

})(jQuery);




// Gestion du navigateur (url + historique)
let ManageBrowser = {
    updateHistory: function (data, settings) {
        let filename = (data === "") ? settings.baseFile : data.substring(data.lastIndexOf('/') + 1);
        let pathFile = (filename === "") ? settings.baseUrl : (settings.removeExtension) ? ManageBrowser.formatUrlWithoutExtension(filename) : filename
        
        
        history.pushState({
            title: filename,
            href: pathFile,
            pathFile: filename
        }, filename, pathFile);

        ManageBrowser.updateTitle(filename);
    },

    updateTitle: function (filename) {
        const title = ManageBrowser.formatUrlWithoutExtension(filename);
        document.title = title.toUpperCase();
    },

    formatUrlWithoutExtension: function (link) {
        return link.split('.').slice(0, -1).join('.')
    },
}


// Gestion du chargement de la page
let Page = {
    getPage: function (settings, link, event) {
        event.preventDefault();
        url = settings.baseUrl.substr(0, settings.baseUrl.lastIndexOf("/"));
        link = (link === "") ? settings.baseFile : link;
        $(`.${settings.output}`).load(`${url}/${link} #${settings.dataDiv}`, () => {
            Loader.showLoader();
        });
    }
}


// Gestion du loader
let Loader = {
    createLoader: function (loader) {
        $('body').append(`<div class="loader"><img src="${loader.source}" /></div>`);
        $('.loader').css(loader.css);
    },
    showLoader: function () {
        $('.loader').show();
    },
    hideLoader: function () {
        $('.loader').fadeOut();
    }
}