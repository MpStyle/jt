(function ($) {
    $.fn.jt = function (configuration) {
        var DATA_JT = 'data-jt', DATA_JT_ALT = 'data-jt-alt', DATA_JT_CLASS = 'data-jt-class', DATA_JT_LINK = 'data-jt-link', DATA_JT_SRC = 'data-jt-src', DATA_JT_TITLE = 'data-jt-title', DATA_JT_DATA = 'data-jt-data', ATTRIBUTE_PAIRS = [
            [DATA_JT, undefined],
            [DATA_JT_ALT, 'alt'],
            [DATA_JT_CLASS, undefined],
            [DATA_JT_LINK, 'href'],
            [DATA_JT_SRC, 'src'],
            [DATA_JT_TITLE, 'title'],
            [DATA_JT_DATA, 'data']
        ], DEFAULT_CONFIGURATION = {
            template: undefined,
            destination: undefined,
            data: [],
            subConfiguration: [],
            beforeRender: [],
            afterRender: []
        };
        function selector(attributeName, key) {
            return "[" + attributeName + "='" + key + "']";
        }
        function cleanArray(value) {
            return [].concat(value || []);
        }
        function cleanConfiguration(configuration) {
            var cleanedConfiguration = {};
            cleanedConfiguration.template = configuration.template || DEFAULT_CONFIGURATION.template;
            cleanedConfiguration.destination = configuration.destination || DEFAULT_CONFIGURATION.destination || cleanedConfiguration.template;
            cleanedConfiguration.data = cleanArray(configuration.data || DEFAULT_CONFIGURATION.data);
            cleanedConfiguration.subConfiguration = cleanArray(configuration.subConfiguration || DEFAULT_CONFIGURATION.subConfiguration);
            cleanedConfiguration.beforeRender = cleanArray(configuration.beforeRender || DEFAULT_CONFIGURATION.beforeRender);
            cleanedConfiguration.afterRender = cleanArray(configuration.afterRender || DEFAULT_CONFIGURATION.afterRender);
            return cleanedConfiguration;
        }
        function renderHtmlAttribute($currentTemplate, attributePair, key, value) {
            if (attributePair[1]) {
                $currentTemplate.find(selector(attributePair[0], key)).each(function (index, element) {
                    $(element).attr(attributePair[1], value);
                });
            }
        }
        function render($parent, configuration) {
            var $container = $parent, $template = $container.clone(), $destination = configuration.destination ? $(configuration.destination) : $parent, data = configuration.data;
            $destination.empty();
            var _loop_1 = function(index) {
                var $currentTemplate = $template.clone(), item = data[index];
                var _loop_2 = function(key) {
                    if (item.hasOwnProperty(key)) {
                        $currentTemplate.find(selector(DATA_JT, key)).each(function (index, element) {
                            $(element).text(item[key]);
                        });
                        $currentTemplate.find(selector(DATA_JT_CLASS, key)).each(function (index, element) {
                            $(element).addClass(item[key]);
                        });
                        for (var _i = 0, ATTRIBUTE_PAIRS_1 = ATTRIBUTE_PAIRS; _i < ATTRIBUTE_PAIRS_1.length; _i++) {
                            var pair = ATTRIBUTE_PAIRS_1[_i];
                            renderHtmlAttribute($currentTemplate, pair, key, item[key]);
                        }
                    }
                };
                for (var key in item) {
                    _loop_2(key);
                }
                for (var _a = 0, _b = configuration.beforeRender; _a < _b.length; _a++) {
                    var func = _b[_a];
                    func($currentTemplate, item);
                }
                for (var _c = 0, _d = configuration.subConfiguration; _c < _d.length; _c++) {
                    var subConfiguration = _d[_c];
                    render($currentTemplate, cleanConfiguration(subConfiguration));
                }
                for (var _e = 0, ATTRIBUTE_PAIRS_2 = ATTRIBUTE_PAIRS; _e < ATTRIBUTE_PAIRS_2.length; _e++) {
                    var key = ATTRIBUTE_PAIRS_2[_e];
                    $currentTemplate.find('*[' + key[0] + ']').removeAttr(key[0]);
                }
                $destination.append($currentTemplate.html());
                for (var _f = 0, _g = configuration.afterRender; _f < _g.length; _f++) {
                    var func = _g[_f];
                    func($currentTemplate, item);
                }
            };
            for (var index in data) {
                _loop_1(index);
            }
        }
        $.each($(this), function (index, elem) {
            render($(configuration.template || elem), cleanConfiguration(configuration));
        });
    };
})(jQuery);
//# sourceMappingURL=jt.js.map