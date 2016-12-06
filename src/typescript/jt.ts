///<reference path="Configuration.d.ts"/>

(function ($) {
    $.fn.jt = function (configuration: Configuration) {
        let DATA_JT = 'data-jt',
            DATA_JT_ALT = 'data-jt-alt',
            DATA_JT_CLASS = 'data-jt-class',
            DATA_JT_LINK = 'data-jt-link',
            DATA_JT_SRC = 'data-jt-src',
            DATA_JT_TITLE = 'data-jt-title',
            DATA_JT_DATA = 'data-jt-data',
            ATTRIBUTE_PAIRS = [
                [DATA_JT, undefined],
                [DATA_JT_ALT, 'alt'],
                [DATA_JT_CLASS, undefined],
                [DATA_JT_LINK, 'href'],
                [DATA_JT_SRC, 'src'],
                [DATA_JT_TITLE, 'title'],
                [DATA_JT_DATA, 'data']
            ],
            DEFAULT_CONFIGURATION: Configuration = <Configuration>{
                template: undefined,
                destination: undefined,
                data: [],
                subConfiguration: [],
                beforeRender: [],
                afterRender: []
            };

        /**
         * Returns the selector for the jT attribute.
         *
         * @param attributeName jT attribute
         * @param key The key of the data
         * @returns {string}
         */
        function selector(attributeName: string, key: string): string {
            return "[" + attributeName + "='" + key + "']";
        }

        /**
         * Clean an array.
         *
         * @param value
         * @returns {any[]}
         */
        function cleanArray<T>(value: any): Array<T> {
            return [].concat(value || []);
        }

        /**
         * Clean the configuration using correct values (coming from DEFAULT_CONFIGURATION) for the invalid user configuration values.
         *
         * @param configuration
         * @returns {Configuration}
         */
        function cleanConfiguration(configuration: Configuration): Configuration {
            let cleanedConfiguration: Configuration = <Configuration>{};
            cleanedConfiguration.template = configuration.template || DEFAULT_CONFIGURATION.template;
            cleanedConfiguration.destination = configuration.destination || DEFAULT_CONFIGURATION.destination || cleanedConfiguration.template;
            cleanedConfiguration.data = cleanArray(configuration.data || DEFAULT_CONFIGURATION.data);
            cleanedConfiguration.subConfiguration = cleanArray<Configuration>(configuration.subConfiguration || DEFAULT_CONFIGURATION.subConfiguration);
            cleanedConfiguration.beforeRender = cleanArray<{ ($item: JQuery, record: any): void }>(configuration.beforeRender || DEFAULT_CONFIGURATION.beforeRender);
            cleanedConfiguration.afterRender = cleanArray<{ ($item: JQuery, record: any): void }>(configuration.afterRender || DEFAULT_CONFIGURATION.afterRender);

            return cleanedConfiguration;
        }

        /**
         * Render the jT attribute adding its paired HTML attribute.
         *
         * @param $currentTemplate
         * @param attributePair
         * @param key
         * @param value
         */
        function renderHtmlAttribute($currentTemplate: JQuery, attributePair: Array<string>, key: string, value: string) {
            if (attributePair[1]) {
                $currentTemplate.find(selector(attributePair[0], key)).each(function (index, element) {
                    $(element).attr(attributePair[1], value);
                });
            }
        }

        function render($parent: JQuery, configuration: Configuration) {
            let $container: JQuery = $parent,
                $template: JQuery = $container.clone(),
                $destination: JQuery = configuration.destination ? $(configuration.destination) : $parent,
                data: any[] = configuration.data;

            $destination.empty();

            for (let index in data) {
                let $currentTemplate = $template.clone(),
                    item = data[index];

                for (let key in item) {
                    if (item.hasOwnProperty(key)) {
                        // Render text
                        $currentTemplate.find(selector(DATA_JT, key)).each(function (index, element) {
                            $(element).text(item[key]);
                        });

                        // Render class
                        $currentTemplate.find(selector(DATA_JT_CLASS, key)).each(function (index, element) {
                            $(element).addClass(item[key]);
                        });

                        for (let pair of ATTRIBUTE_PAIRS) {
                            renderHtmlAttribute($currentTemplate, pair, key, item[key]);
                        }
                    }
                }

                // Runs all beforeRender functions
                for (let func of configuration.beforeRender) {
                    func($currentTemplate, item);
                }

                // Apply sub templates
                for (let subConfiguration of configuration.subConfiguration) {
                    render($currentTemplate, cleanConfiguration(subConfiguration));
                }

                for (let key of ATTRIBUTE_PAIRS) {
                    $currentTemplate.find('*[' + key[0] + ']').removeAttr(key[0]);
                }

                $destination.append($currentTemplate.html());

                // Runs all afterRender functions
                for (let func of configuration.afterRender) {
                    func($currentTemplate, item);
                }
            }
        }

        $.each($(this), function (index: number, elem: Element) {
            render($(configuration.template || elem), cleanConfiguration(configuration));
        });
    };

})(jQuery);