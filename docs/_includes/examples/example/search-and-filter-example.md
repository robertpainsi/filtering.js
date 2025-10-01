### Prefilter items by using a text field

You can totally customize which items to pre-filter. In this example we're just using an text field.

{% include examples/example/search-and-filter-example.html %}

<div class="tabs-start"></div>

<div class="tab-title"></div>

##### HTML

<div class="tab-content"></div>

```html
<div id="root">
    <div>
        <label for="search-input">Search: </label>
        <input type="text" id="search-input">
    </div>
    <div>
        <div class="filtering-group" data-group-name="color">
            <div class="filtering-filter" data-filter-name="red">Red</div>
            <div class="filtering-filter" data-filter-name="blue">Blue</div>
        </div>
        <div class="filtering-group" data-group-name="size">
            <div class="filtering-filter" data-filter-name="small">Small</div>
            <div class="filtering-filter" data-filter-name="large">Large</div>
        </div>
    </div>

    <div>
        <div class="filtering-item" data-filter-color="red" data-filter-size="small"></div>
        <div class="filtering-item" data-filter-color="blue" data-filter-size="large"></div>
    </div>
</div>
```

<div class="tab-title"></div>

##### JavaScript

<div class="tab-content"></div>

```js
const {FilteringFlow} = filteringjs;

const filteringRootElement = document.querySelector('#root');
const searchElement = document.querySelector('#search-input');

const flow = new FilteringFlow(filteringRootElement);

// Register a 'filter-item' listener which works similar to Array.filter
flow.filtering.addEventListener('filter-item', (event) => {
    const item = event.data.item;
    const element = item.data.element;

    for (const [name, value] of Object.entries(element.dataset)) {
        if (name.startsWith('filter')
            && value.toLowerCase().includes(searchElement.value.toLowerCase())) {
            // only check data-filter attributes and return true if any value includes the search query
            return true;
        }
    }

    return false;
});

searchElement.addEventListener('input', (event) => {
    flow.filter();
});

flow.filter(); // Always trigger filter after all plug-ins and listeners have been registered
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
