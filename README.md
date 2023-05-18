# filtering.js

### \> Under construction \<

This library is currently usable but still under construction. The filtering algorithm is fully implemented but design and tests need improvement, and options and callbacks need to be added.

### What is Filtering.js

![Preview](https://github.com/robertpainsi/filtering.js/raw/main/assets/preview.gif?raw=true)<br>
*(Source: [readme-preview.html](https://github.com/robertpainsi/filtering.js/blob/main/examples/readme-preview.html))*

### Difference to other libraries?

- :zap: fast
- :ant: 6.1kB small
- :trophy: Supported by modern browsers using ES6 features.
  <sup>[1](https://caniuse.com/mdn-javascript_builtins_set),[2](https://caniuse.com/mdn-javascript_builtins_map),[3](https://caniuse.com/mdn-api_htmlelement_dataset),[4](https://caniuse.com/mdn-api_domtokenlist_contains)</sup>
- :weight_lifting: Lifting complex logic from the developer.
- :battery: Parse filter structure and items directly from HTML.
- :crystal_ball: Info about how many items would be filtered. No more 0 results.

### Performance

Following tables illustrate the performance of the library. The runtime is calculated by averaging 1.000 scenarios with various number of items, groups, and filters and various number of checked filters.

<details>
  <summary>100 items</summary>

| <sub>filters</sub> \ <sup>groups</sup> | **2** | **4** | **8** |
|---|:---:|:---:|:-----:|
| **8** | 1 ms | 1 ms | 1 ms  |
| **24** | 1 ms | 1 ms | 1 ms  |
| **64** | 1 ms | 1 ms | 1 ms  |
</details>

<details>
  <summary>1.000 items</summary>

| <sub>filters</sub> \ <sup>groups</sup> | **2** | **4** | **8** |
|---|:-----:|:-----:|:-----:|
| **8** | 2 ms  | 4 ms  | 12 ms |
| **24** | 2 ms  | 3 ms  | 6 ms  |
| **64** | 2 ms  | 3 ms  | 6 ms  |
</details>

### How to use?

#### Initializing

The preferred way to initialize the Schema is automatically from HTML by using the [`Parser.parseSchemaFromHtml`](https://github.com/robertpainsi/filtering.js/blob/main/src/parser.ts#L27) method. However, you can also build a Schema from plain JavaScript.

<details>
<summary>From HTML</summary>

```html
<div id="root">
  <div id="filtering">
    <div class="filtering-group" data-group-name="color">
      <div class="filtering-filter" data-filter-name="red">Red</div>
      <div class="filtering-filter" data-filter-name="blue">Blue</div>
    </div>
    <div class="filtering-group" data-group-name="size">
      <div class="filtering-filter" data-filter-name="small">Small</div>
      <div class="filtering-filter" data-filter-name="large">Large</div>
    </div>
  </div>

  <div id="items">
    <div id="item-1" class="filtering-item" data-filter-color="red" data-filter-size="small"></div>
    <div id="item-2" class="filtering-item" data-filter-color="blue" data-filter-size="large"></div>
  </div>
</div>

<script>
  // Initializing and parsing filters, groups and items from HTML
  const {Filtering, Parser} = filteringjs;
  const parser = new Parser();
  const schema = parser.parseSchemaFromHtml(document.querySelector('#root'));
  const filtering = new Filtering(schema);

  // See example.html or other examples on how to handle filtering
</script>
```

- Note the structure, classes and attributes.
  - Group element
    - `.filtering-group`
    - `data-group-name="color"`
  - Filter element
    - `.filtering-filter`
    - `data-filter-name="red"`
  - Item element
    - `.filtering-item`
    - `data-filter-color="red"`<br>(Note that the attribute name ends with the group name and is assigned the filter name)
</details>

<details>
<summary>From JavaScript</summary>

```javascript
// Initializing filters, groups and items from JavaScript
const {Filtering, Group, Filter, Item} = filteringjs;

const schema = new Schema();

// Create a new group `color` with colors `red` and `blue`
const colorGroup = new Group('color');
colorGroup.addFilter(new Filter('red'));
colorGroup.addFilter(new Filter('blue'));
schema.addGroup(colorGroup);

// Create a new group `size` with sizes `small` and `large`
const sizeGroup = new Group('size');
sizeGroup.addFilter(new Filter('small'));
sizeGroup.addFilter(new Filter('large'));
schema.addGroup(sizeGroup);

// Add a small, red item
const item1 = new Item();
item1.addFilter('color', 'red');
item1.addFilter('size', 'small');
schema.addItem(item1);

// Add a large, blue item
const item2 = new Item();
item2.addFilter('color', 'blue');
item2.addFilter('size', 'large');
schema.addItem(item2);

const filtering = new Filtering(schema);

// See example.html or other examples on how to handle filtering
```

`Schema`, `Group`, `Filter` and `Item` have an optional parameter data which you could use to store a reference to the according HTML element.
</details>

Once initialized, you can fully customize how to handle filtering. Check out a working [example](https://github.com/robertpainsi/filtering.js/blob/main/examples/example.html), especially the [`updateFilter` method](https://github.com/robertpainsi/filtering.js/blob/main/examples/example.html#L38-L53) and the [`click` listener](https://github.com/robertpainsi/filtering.js/blob/main/examples/example.html#L56-L64).

#### Filtering

The complexity of filtering is completely handled by the library. For most flexibility, handling the filtering result though is up to the developer.

The following code snippet
1. parses the checked filters from HTML,
2. calculates the filtering result to enable/disable filters,
3. and show/hide items accordingly.

```javascript
function updateFilter() {
  // Parse checked filter from HTML
  const filterData = parser.parseCheckedFilterDataFromHtml(document.querySelector('#filtering'));
  const result = filtering.filter(filterData);
  for (const group of result.groups) {
    for (const filter of group.filters) {
      const filterElement = filter.schemaFilter.data.element;
      // Disable filter if it would give 0 results
      filterElement.classList.toggle('disabled', filter.possibleItems.length === 0);
    }
  }
  for (const item of result.allItems) {
    // Show or hide items
    item.data.element.classList.toggle('filtered', !result.filteredItems.includes(item));
  }
}
```

For completeness, following code shows a simple implementation for listening to checking and unchecking filters.

```javascript
filterElement.addEventListener('click', (event) => {
  event.preventDefault();
  if (filterElement.classList.contains('disabled')) {
    // Ignore if the filter would give 0 results
    return;
  }
  filterElement.classList.toggle('checked'); // Check or uncheck filter
  updateFilter();
});
```

! Filter
- Trigger
- Pre-filter

! API
- Options
- Result
- Functions
- Callbacks
