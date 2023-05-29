## Enable all filters example

An simple example that demonstrates a button enabling all filter.

{% include examples/example/enable-all-filters-example.html %}

<div class="tabs-start"></div>

<div class="tab-title"></div>

##### HTML

<div class="tab-content"></div>

```html
<div id="filteringjs-enable-all-filters-example">
    <div class="flex gap stretch">
        <div class="filtering-group" data-group-name="color">
            <div class="filtering-filter" data-filter-name="red">Red</div>
            <div class="filtering-filter" data-filter-name="green">Green</div>
            <div class="filtering-filter" data-filter-name="blue">Blue</div>
            <div class="filtering-filter" data-filter-type="all">All</div>
        </div>
    </div>

    <div class="flex">
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

class MyFlow extends FilteringFlow {
    initializeFilterListener() {
        for (const filterElement of this.root.getElementsByClassName('filtering-filter')) {
            filterElement.addEventListener('click', (event) => {
                event.preventDefault();
                if (filterElement.classList.contains('disabled')) {
                    // Ignore click if the filter would give 0 results
                    return;
                }
                if (filterElement.dataset.filterType === 'all') {
                    // Remove all checked classes in group if all is clicked
                    if (!filterElement.classList.contains('checked')) {
                        for (const fe of filterElement.closest('.filtering-group').getElementsByClassName('filtering-filter')) {
                            fe.classList.remove('checked');
                        }
                    }
                } else {
                    filterElement.classList.toggle('checked'); // Check or uncheck filter
                }
                this.filter();
            });
        }
    }
}

new MyFlow(document.querySelector('#filteringjs-enable-all-filters-example'));
```

<div class="tab-title"></div>

##### CSS

<div class="tab-content"></div>

>

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
