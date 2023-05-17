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

Following tables illustrate the performance of the library. The runtime is calculated by averaging 1.000 scenarios with various number of items, groups, and filters and various number of enable filters (no filters, a single filter, a filter in each group, half of the filters in each group).

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

[readme-preview.html](https://github.com/robertpainsi/filtering.js/blob/main/examples/readme-preview.html)

! Initialize
- Parsed from html 
  - [readme-preview.html](https://github.com/robertpainsi/filtering.js/blob/main/examples/readme-preview.html)
- JavaScript object
  - [performance.html](https://github.com/robertpainsi/filtering.js/blob/main/examples/performance.html)

! Filter
- Trigger
- Pre-filter

! API
- Options
- Result
- Functions
- Callbacks
