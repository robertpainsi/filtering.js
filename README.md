# filtering.js

### What is Filtering.js

With Filtering.js you can easily add filtering functionality to your project. It is a small, fast, and modern library without dependencies that can be used in Node and Browser environments.

![Preview](https://github.com/robertpainsi/filtering.js/raw/main/assets/preview.gif?raw=true)<br>
*(Source: [readme-preview.html](https://github.com/robertpainsi/filtering.js/blob/main/examples/readme-preview.html))*

---

### Difference to other libraries?

- :zap: fast
- :ant: <10kB small
- :trophy: Supported by modern browsers using ES6 features.
  <sup>[1](https://caniuse.com/mdn-javascript_builtins_set),[2](https://caniuse.com/mdn-javascript_builtins_map),[3](https://caniuse.com/mdn-api_htmlelement_dataset),[4](https://caniuse.com/mdn-api_domtokenlist_contains)</sup>
- :weight_lifting: Lifting complex logic from the developer.
- :battery: Parse filter structure and items directly from HTML.
- :crystal_ball: Info about how many items would be filtered. No more 0 results.
- :family: Works in Node and Browser environment.

---

### Performance

Following tables illustrate the performance of the library measured on Desktop. The runtime is calculated by averaging 1.000 scenarios with various number of items, groups, and filters and also various number of checked filters.

<details>
  <summary>100 items</summary>

| <sub>filters</sub> \ <sup>groups</sup> | **2** | **4** | **8** |
|---|:-----:|:---:|:-----:|
| **8** | <1 ms | <1 ms | <1 ms  |
| **24** | <1 ms  | <1 ms | <1 ms  |
| **64** | <1 ms  | <1 ms | <1 ms  |
</details>

<details>
  <summary>1.000 items</summary>

| <sub>filters</sub> \ <sup>groups</sup> | **2** | **4** | **8** |
|---|:-----:|:-----:|:-----:|
| **8** | 2 ms  | 3 ms  | 10 ms |
| **24** | 2 ms  | 3 ms  | 6 ms  |
| **64** | 2 ms  | 3 ms  | 5 ms  |
</details>

---

### How to use?

The preferred way to add filtering functionality to your project is by using the [`FilteringFlow`](https://github.com/robertpainsi/filtering.js/blob/main/src/helper.ts) helper class. It handles adding and removing of `checked`/`disabled` classes for filters and `filtered` classes for items. All classes can be adapted to easily suite existing projects too.

A simple, out of the box example:
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
    const {FilteringFlow} = filteringjs;
    new FilteringFlow(document.querySelector('#root'));
</script>
```

*That's it!*

---

### Parser

The Schema can be directly parsed from HTML. For this, the structure has to be built according to following rules. All class names can be adapted to suite existing projects. See above example, [example.html](https://github.com/robertpainsi/filtering.js/blob/main/examples/example.html), [initialize-from-html.html](https://github.com/robertpainsi/filtering.js/blob/main/examples/initialize-from-html.html) or other [examples](https://github.com/robertpainsi/filtering.js/tree/main/examples).

- Group element
  - `.filtering-group`
  - `data-group-name="color"`
  - Filter element
    - `.filtering-filter`
    - `data-filter-name="red"`
- Item element
  - `.filtering-item`
  - `data-filter-color="red"`<br>(the attribute name ends with the group name and is assigned the filter name)

---

### API
! Filter
- Trigger
- Pre-filter

! API
- Options
- Result
- Functions
- Callbacks
