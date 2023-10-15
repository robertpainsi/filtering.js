# [filtering.js](https://github.com/robertpainsi/filtering.js)

### What is filtering.js

With filtering.js you can easily add filtering functionality to your project. It is a small, fast, and modern library without dependencies that can be used in node and browser environments.

![Preview](https://github.com/robertpainsi/filtering.js/raw/main/assets/preview.gif?raw=true)<br>
<sup>*([Live-demo and source](https://robertpainsi.github.io/filtering.js/examples.html#number-of-results-for-each-filter))*</sup>

Also check out a [large demo](https://robertpainsi.github.io/filtering.js/demo.html) and [other examples](https://robertpainsi.github.io/filtering.js/examples.html).

### Table of contents

- [Difference to other libraries?](#difference-to-other-libraries)
- [Performance](#performance)
- [How to use?](#how-to-use)
- [Parser](#parser)
- [API](#api)

---

### Difference to other libraries?

- :zap: fast
- :ant: [6.4kB (core)](https://github.com/robertpainsi/filtering.js/blob/main/dist/umd/index.core.js) or [11.7kB (with UI helpers)](https://github.com/robertpainsi/filtering.js/blob/main/dist/umd/index.ui.js)
- :trophy: Supported by modern browsers using ES6 features.
  <sup>[1](https://caniuse.com/mdn-javascript_builtins_set),[2](https://caniuse.com/mdn-javascript_builtins_map),[3](https://caniuse.com/mdn-api_htmlelement_dataset),[4](https://caniuse.com/mdn-api_domtokenlist_contains)</sup>
- :weight_lifting_man: Lifting complex logic from the developer.
- :battery: Parse filter structure and items directly from HTML.
- :crystal_ball: Info about how many items would be filtered. No more 0 results.
- :family: Works in Node and Browser environment.

---

### How to use?

```
npm i @filtering.js/filtering.js
```

Depending on the environment, there are builds for CommonJS, ESM and UMD located in the `dist` folder.

- Browser

```html
<script src="/dist/umd/index.ui.js"></script>
<script>
    const {Filtering} = filteringjs;
</script>
```

- Webpack

```js
import {Filtering} from "@filtering.js/filtering.js/ui";
```

- Node (module)

```js
import filteringjs from "@filtering.js/filtering.js/core";

const {Filtering} = filteringjs;
```

If you don't need UI helpers like `Parser` or `FilteringFlow`, you can use the smaller core builds located at `"/dist/umd/index.core.js"` or `"@filtering.js/filtering.js/core"`.

The preferred way to add filtering functionality to your project is by using the [`FilteringFlow`](https://github.com/robertpainsi/filtering.js/blob/main/src/filteringflow.ts) helper class. It handles adding and removing of `checked`/`disabled` classes for filters and `filtered` classes for items. All classes can be adapted to easily suite existing projects too.

#### A simple, out of the box example:

```html
<div id="root">
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

Check out more [examples](https://robertpainsi.github.io/filtering.js/examples).

---

### Parser

The Schema can be directly parsed from HTML. For this, the structure has to be built according to following rules. All class names can be adapted to suite existing projects. See above example or other [examples](https://robertpainsi.github.io/filtering.js/examples).

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

### Performance

Following tables illustrate the performance of the library measured on Desktop. The runtime is calculated by averaging 1.000 scenarios with various number of items, groups, and filters and also various number of checked filters.

#### 100 items

| <sub>filters per group</sub> \ <sup>groups</sup> | **2** | **4** | **8** |
|-------------------------------------------------:|:-----:|:-----:|:-----:|
|                                            **8** | <1 ms | <1 ms | <1 ms |
|                                           **24** | <1 ms | <1 ms | <1 ms |
|                                           **64** | <1 ms | <1 ms | <1 ms |

#### 1.000 items

| <sub>filters per group</sub> \ <sup>groups</sup> | **2** | **4** | **8** |
|-------------------------------------------------:|:-----:|:-----:|:-----:|
|                                            **8** | <1 ms | 2 ms  | 5 ms  |
|                                           **24** | <1 ms | 2 ms  | 3 ms  |
|                                           **64** | <1 ms | 2 ms  | 3 ms  |

---

### API, Documentation and Examples

https://robertpainsi.github.io/filtering.js

- [API](https://robertpainsi.github.io/filtering.js/api)
- [Documentation](https://robertpainsi.github.io/filtering.js/documentation)
- [Examples](https://robertpainsi.github.io/filtering.js/examples)
