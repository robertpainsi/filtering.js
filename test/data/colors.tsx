import {jsxToHtml} from '../test-utils';

export const jsxColors = jsxToHtml(
    <>
        <div className="filtering-group" data-group-name="color">
            <div className="filtering-filter" data-filter-name="red"></div>
            <div className="filtering-filter" data-filter-name="green"></div>
            <div className="filtering-filter" data-filter-name="blue"></div>
        </div>

        <div className="items">
            <div className="filtering-item" data-filter-color="red"></div>
            <div className="filtering-item" data-filter-color="green"></div>
            <div className="filtering-item" data-filter-color="blue"></div>
        </div>
    </>,
);

export const jsxColorsSingleSelect = jsxToHtml(
    <>
        <div className="filtering-group" data-group-name="color" data-select-type="single">
            <div className="filtering-filter" data-filter-name="red"></div>
            <div className="filtering-filter" data-filter-name="green"></div>
            <div className="filtering-filter" data-filter-name="blue"></div>
        </div>

        <div className="items">
            <div className="filtering-item" data-filter-color="red"></div>
            <div className="filtering-item" data-filter-color="green"></div>
            <div className="filtering-item" data-filter-color="blue"></div>
        </div>
    </>,
);

export const jsxColorsSingleSelectInput = jsxToHtml(
    <>
        <div className="filtering-group" data-group-name="color">
            <input type="radio" name="color" className="filtering-filter" data-filter-name="red"></input>
            <input type="radio" name="color" className="filtering-filter" data-filter-name="green"></input>
            <input type="radio" name="color" className="filtering-filter" data-filter-name="blue"></input>
        </div>

        <div className="items">
            <div className="filtering-item" data-filter-color="red"></div>
            <div className="filtering-item" data-filter-color="green"></div>
            <div className="filtering-item" data-filter-color="blue"></div>
        </div>
    </>,
);

export const jsxColorsWithTypeAll = jsxToHtml(
    <>
        <div className="filtering-group" data-group-name="color">
            <div className="filtering-filter" data-filter-name="red"></div>
            <div className="filtering-filter" data-filter-name="green"></div>
            <div className="filtering-filter" data-filter-name="blue"></div>
            <div className="filtering-filter" data-filter-name="all" data-filter-type="all"></div>
        </div>

        <div className="items">
            <div className="filtering-item" data-filter-color="red"></div>
            <div className="filtering-item" data-filter-color="green"></div>
            <div className="filtering-item" data-filter-color="blue"></div>
        </div>
    </>,
);

export const jsxColorsWithTypeAllInput = jsxToHtml(
    <>
        <div className="filtering-group" data-group-name="color">
            <input type="checkbox" className="filtering-filter" data-filter-name="red"></input>
            <input type="checkbox" className="filtering-filter" data-filter-name="green"></input>
            <input type="checkbox" className="filtering-filter" data-filter-name="blue"></input>
            <input type="checkbox" className="filtering-filter" data-filter-name="all" data-filter-type="all"></input>
        </div>

        <div className="items">
            <div className="filtering-item" data-filter-color="red"></div>
            <div className="filtering-item" data-filter-color="green"></div>
            <div className="filtering-item" data-filter-color="blue"></div>
        </div>
    </>,
);
