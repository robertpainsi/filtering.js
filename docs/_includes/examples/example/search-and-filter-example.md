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

const searchElement = document.querySelector('#search-input');
searchElement.addEventListener('input', (event) => {
    flow.filter();
});

class MyFlow extends FilteringFlow {

    getAllFilterNames(item) {
        // Since we want to filter the entered search text by filftered name,
        // this is the helper method used for the example only.
        const result = [];
        for (const groupName of item.getGroupNames()) {
            for (const filterName of item.getFilterNames(groupName)) {
                result.push(filterName);
            }
        }
        return result;
    }

    get filteringOptions() {
        return {
            // The callback to prefilter items before actually filtering
            filterItem: (item, schema, filterData) => {
                for (const filterName of this.getAllFilterNames(item)) {
                    if (filterName.toLowerCase().includes(searchElement.value.toLowerCase())) {
                        // Return true if the item should be currently considered for filtering
                        return true;
                    }
                }
                return false;
            }
        };
    }
}

const flow = new MyFlow(document.querySelector('#root'));
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
