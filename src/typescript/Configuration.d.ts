interface Configuration {
    /**
     * The query to select the template
     */
    template: string;

    destination: string;

    /**
     * The data to write in the template
     */
    data: any;

    /**
     * Sub template
     */
    subConfiguration: Configuration[];

    /**
     * Array of key:function($element, currentData)
     */
    beforeRender: { ($item: JQuery, record: any): void }[];

    afterRender: { ($item: JQuery, record: any): void }[];
}