### Item in multiple filters

To add an item to multiple filters, just separate the filter names in the `filtering-item`'s data attribute value by comma. e.g. the color purple is a mix of red and blue. To put it into both filters, use `data-filter-color="red,blue"`.

{% include examples/example/item-in-multiple-filters.html %}

<div class="tabs-start"></div>

<div class="tab-title"></div>

##### HTML

<div class="tab-content"></div>

```html
<div id="root">
    <div>
        <div class="filtering-group" data-group-name="color">
            <div class="filtering-filter" data-filter-name="red">Red</div>
            <div class="filtering-filter" data-filter-name="blue">Blue</div>
        </div>
    </div>

    <div>
        <div class="filtering-item" data-filter-color="red"></div>
        <div class="filtering-item" data-filter-color="blue"></div>
        <div class="filtering-item" data-filter-color="red,blue"></div>
    </div>
</div>
```

<div class="tab-title"></div>

##### JavaScript

<div class="tab-content"></div>

```js
const {FilteringFlow} = filteringjs;
new FilteringFlow(document.querySelector('#root'));
```

<div class="tab-title"></div>

##### CSS

<div class="tab-content"></div>

```css
/* Note: CSS is simplified and only shows
styles that are relevant to the example. */

/* Filters */
.filtering-filter.checked {
    background-color: lightblue;
}

.filtering-filter.disabled {
    color: lightgrey;
}

/* Items */
.filtering-item.filtered {
    display: none;
}
```

<div class="tabs-end"></div>
