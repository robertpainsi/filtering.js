### Show number of results for each filter

The number of items that would pass filtering is added to each filter.

{% include examples/example/preview-example.html %}

<div class="tabs-start"></div>

<div class="tab-title"></div>

##### HTML

<div class="tab-content"></div>

```html
<div id="root">
    <div>
        <div class="filtering-group" data-group-name="color">
            <div class="filtering-filter" data-filter-name="red">Red <span class="total"></span></div>
            <div class="filtering-filter" data-filter-name="green">Green <span class="total"></span></div>
            <div class="filtering-filter" data-filter-name="blue">Blue <span class="total"></span></div>
        </div>
        <div class="filtering-group" data-group-name="size">
            <div class="filtering-filter" data-filter-name="small">Small <span class="total"></span></div>
            <div class="filtering-filter" data-filter-name="large">Large <span class="total"></span></div>
        </div>
    </div>

    <div>
        <div class="filtering-item" data-filter-color="red" data-filter-size="small"></div>
        <div class="filtering-item" data-filter-color="blue" data-filter-size="large"></div>
        <div class="filtering-item" data-filter-color="red" data-filter-size="large"></div>
        <div class="filtering-item" data-filter-color="red" data-filter-size="small"></div>
        <div class="filtering-item" data-filter-color="green" data-filter-size="small"></div>
    </div>
</div>
```

<div class="tab-title"></div>

##### JavaScript

<div class="tab-content"></div>

```js
const {FilteringFlow} = filteringjs;

class MyFlow extends FilteringFlow {
    handleFilterResult(result) {
        super.handleFilterResult(result);
        for (const group of result.groups) {
            for (const filter of group.filters) {
                const filterElement = filter.schemaFilter.data.element;
                // Update the number next to the filter to indicate how many items are or would be filtered
                filterElement.querySelector('.total').innerText = `(${filter.possibleItems.length})`;
            }
        }
    }
}
new MyFlow(document.querySelector('#root'));

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
