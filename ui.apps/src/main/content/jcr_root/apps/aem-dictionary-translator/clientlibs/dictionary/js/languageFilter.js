(function(document, $) {
    "use strict";

    var LANGUAGE_FILTER = ".dictionary-translator-language-filter";
    var PARAMETER = "languages";

    function getSelectedLanguages() {
        var parameter = new URLSearchParams(window.location.search).get(PARAMETER);
        return parameter ? parameter.split(",") : [];
    }

    $(document).one("foundation-contentloaded", function() {
        var select = document.querySelector(LANGUAGE_FILTER);
        if (!select) {
            return;
        }
        Coral.commons.ready(select, function() {
            select.labelled = "Shown languages";
            select.values = getSelectedLanguages();
            var labels = select.selectedItems.map(function(item) {
                return item.content.textContent.trim();
            });
            if (labels.length) {
                select.placeholder = labels.join(", ");
            }
        });
    });

    // the table columns depend on the shown languages, so the whole page is reloaded instead of only the table
    $(document).on("change", LANGUAGE_FILTER, function(e) {
        var params = new URLSearchParams(window.location.search);
        var languages = e.target.values.filter(Boolean);
        if (languages.length) {
            params.set(PARAMETER, languages.join(","));
        } else {
            params.delete(PARAMETER);
        }
        var queryString = params.toString();
        window.location.assign(window.location.pathname + (queryString ? "?" + queryString : ""));
    });

})(document, Granite.$);
