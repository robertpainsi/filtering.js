### Single select filter example

A simple example that demonstrates single-select for filters. Add `data-select-type="single"` to the `filtering-group` element.

{% include examples/example/single-select-filter-example.html %}

<div class="tabs-start"></div>

<div class="tab-title"></div>

##### HTML

<div class="tab-content"></div>

```html
<div id="root">
    <div>
        <div class="filtering-group" data-group-name="color" data-select-type="single">
            <div class="filtering-filter" data-filter-name="red">Red</div>
            <div class="filtering-filter" data-filter-name="green">Green</div>
            <div class="filtering-filter" data-filter-name="blue">Blue</div>
        </div>
    </div>

    <div>
        <div class="filtering-item" data-filter-color="red"></div>
        <div class="filtering-item" data-filter-color="green"></div>
        <div class="filtering-item" data-filter-color="blue"></div>
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
