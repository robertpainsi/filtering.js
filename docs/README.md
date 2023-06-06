# [filtering.js](https://github.com/filteringjs/filtering.js)

### What is filtering.js

With filtering.js you can easily add filtering functionality to your project. It is a small, fast, and modern library without dependencies that can be used in node and browser environments.

![Preview](https://github.com/filteringjs/filtering.js/raw/main/assets/preview.gif?raw=true)<br>
<sup>*([Live-demo and source](https://filteringjs.github.io/filtering.js/examples.html#number-of-results-for-each-filter))*</sup>

Also check out a [large demo](https://filteringjs.github.io/filtering.js/demo.html) and [other examples](https://filteringjs.github.io/filtering.js/examples.html).

### Table of contents

- [Difference to other libraries?](#difference-to-other-libraries)
- [Performance](#performance)
- [How to use?](#how-to-use)
- [Parser](#parser)
- [API](#api)

---

### Difference to other libraries?

- :zap: fast
- :ant: [4.8kB (core)](https://github.com/filteringjs/filtering.js/blob/main/dist/index.core.js) or [7.9kB (with UI helpers)](https://github.com/filteringjs/filtering.js/blob/main/dist/index.ui.js)
- :trophy: Supported by modern browsers using ES6 features.
  <sup>[1](https://caniuse.com/mdn-javascript_builtins_set),[2](https://caniuse.com/mdn-javascript_builtins_map),[3](https://caniuse.com/mdn-api_htmlelement_dataset),[4](https://caniuse.com/mdn-api_domtokenlist_contains)</sup>
- :weight_lifting_man: Lifting complex logic from the developer.
- :battery: Parse filter structure and items directly from HTML.
- :crystal_ball: Info about how many items would be filtered. No more 0 results.
- :family: Works in Node and Browser environment.

---

### How to use?

The preferred way to add filtering functionality to your project is by using the [`FilteringFlow`](https://github.com/filteringjs/filtering.js/blob/main/src/helper.ts) helper class. It handles adding and removing of `checked`/`disabled` classes for filters and `filtered` classes for items. All classes can be adapted to easily suite existing projects too.

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

Check out more [examples](https://github.com/filteringjs/filtering.js/blob/main/examples/).

---

### Parser

The Schema can be directly parsed from HTML. For this, the structure has to be built according to following rules. All class names can be adapted to suite existing projects. See above example, [example.html](https://github.com/filteringjs/filtering.js/blob/main/examples/example.html), [initialize-from-html.html](https://github.com/filteringjs/filtering.js/blob/main/examples/initialize-from-html.html) or other [examples](https://github.com/filteringjs/filtering.js/tree/main/examples).

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

<details>
  <summary>100 items</summary>

| <sub>filters</sub> \ <sup>groups</sup> | **2** | **4** | **8** |
|---------------------------------------:|:-----:|:-----:|:-----:|
|                                  **8** | <1 ms | <1 ms | <1 ms |
|                                 **24** | <1 ms | <1 ms | <1 ms |
|                                 **64** | <1 ms | <1 ms | <1 ms |

</details>

<details>
  <summary>1.000 items</summary>

| <sub>filters</sub> \ <sup>groups</sup> | **2** | **4** | **8** |
|---------------------------------------:|:-----:|:-----:|:-----:|
|                                  **8** | 2 ms  | 3 ms  | 10 ms |
|                                 **24** | 2 ms  | 3 ms  | 6 ms  |
|                                 **64** | 2 ms  | 3 ms  | 5 ms  |

</details>

---

### API, Documentation and Examples

[API](https://filteringjs.github.io/filtering.js/api), [documentation](https://filteringjs.github.io/filtering.js/documentation) and [examples](https://filteringjs.github.io/filtering.js/examples) can be found [here](https://filteringjs.github.io/filtering.js/).

<details class="hidden">
  <summary>API</summary>

#### Schema

###### Properties

| Name     | Type      | Description     |
|----------|-----------|-----------------|
| `groups` | `Group[]` | List of groups. |
| `items`  | `Item[]`  | List of items.  |
| `data`   | `object`  | User data.      |

###### Functions

| Name                         | Return type | Description                                                       |
|------------------------------|-------------|-------------------------------------------------------------------|
| `constructor(data?: object)` |             | - data, a usable plain old JavaScript object defined by the user. |
| `addGroup(group: Group)`     |             | Adds a new Group to the Schema.                                   |
| `addItem(item: Item)`        |             | Adds a new Item to the Schema.                                    |
| `addItems(items: Item[])`    |             | Adds multiple items to the Schema.                                |

<br>

#### Group

###### Properties

| Name      | Type       | Description        |
|-----------|------------|--------------------|
| `name`    | `string`   | Name of the group. |
| `filters` | `Filter[]` | List of filters.   |
| `data`    | `object`   | User data.         |

###### Functions

| Name                                     | Return type | Description                                                                                     |
|------------------------------------------|-------------|-------------------------------------------------------------------------------------------------|
| `constructor(name: string, data?: Pojo)` |             | - name, name of the group.<br>- data, a usable plain old JavaScript object defined by the user. |
| `addFilter(filter: Filter)`              |             | Adds a new Filter to the Group.                                                                 |
| `getFilterNames() `                      | `string[]`  | Returns a list of all filter names.                                                             |

<br>

#### Filter

###### Properties

| Name   | Type     | Description     |
|--------|----------|-----------------|
| `name` | `string` | Name of filter. |
| `data` | `object` | User data.      |

<br>

#### Item

###### Properties

| Name   | Type     | Description |
|--------|----------|-------------|
| `data` | `object` | User data.  |

###### Functions

| Name                                               | Return type   | Description                                                            |
|----------------------------------------------------|---------------|------------------------------------------------------------------------|
| `constructor(data?: Pojo)`                         |               | - data, a usable plain old JavaScript object defined by the user.      |
| `addFilter(groupName: string, filterName: string)` |               | Specifies the                                                          |
| `getGroupNames()`                                  | `Set<string>` | Returns a set of all Group names the Item is in.                       |
| `getFilterNames(groupName: string)`                | `Set<string>` | Returns a set of all Filter names for a specific Group the Item is in. |

<br>

#### Filtering

###### Properties

| Name      | Type               | Description |
|-----------|--------------------|-------------|
| `schema`  | `Schema`           |             |
| `options` | `FilteringOptions` |             |

###### Functions

| Name                                                      | Return type | Description       |
|-----------------------------------------------------------|-------------|-------------------|
| `constructor(schema: Schema, options?: FilteringOptions)` |             | - [options](TODO) |

<br>

#### FilteringOptions

###### Functions

| Name                                                              | Return type | Description                                                                                                                    |
|-------------------------------------------------------------------|-------------|--------------------------------------------------------------------------------------------------------------------------------|
| `filterItem?(item: Item, schema: Schema, filterData: FilterData)` | `boolean`   | Called before `Filtering.filter` for each item. Returning true will consider the item for filtering and in the [Result](TODO). |

<br>

#### FilterData

###### Properties

| Name             | Type                      | Description                                                                                         |
|------------------|---------------------------|-----------------------------------------------------------------------------------------------------|
| `checkedFilters` | Map<string, Set\<string>> | A map representing the checked Data (key: Group names; values: Filter names in the specific group). |

###### Functions

| Name                                                 | Return type | Description                                                                                                         |
|------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------|
| `checkFilter(groupName: string, filterName: string)` |             | Checks a Filter in a Group.                                                                                         |
| `disableGroup(groupName: string)`                    |             | Unchecks all Filters in a Group. Also disables the Group, further checking Filter will have no effect on the Group. |

<br>

#### Result

###### Properties

| Name            | Type            | Description                                  |
|-----------------|-----------------|----------------------------------------------|
| `schema`        | `Schema`        | The Schema used for filtering.               |
| `groups`        | `GroupResult[]` | List of GroupResult.                         |
| `groupNames`    | `string[]`      | List of Group names.                         |
| `filteredItems` | `Item[]`        | List of all items that passed the filtering. |
| `allItems`      | `Item[]`        | List of all items considered for filtering.  |

###### Functions

| Name                          | Return type | Description              |
|-------------------------------|-------------|--------------------------|
| `getGroup(groupName: string)` | `Group`     | Returns a Group by name. |

> Note: Other functions are mainly relevant for the filtering algorithm to generate the result and shouldn't be used by the user.

<br>

#### GroupResult

###### Properties

| Name            | Type             | Description                                               |
|-----------------|------------------|-----------------------------------------------------------|
| `schemaGroup`   | `Group`          | The corresponding Group of the GroupResult.               |
| `filters`       | `FilterResult[]` | List of all FilterResults.                                |
| `filteredItems` | `Item[]`         | List of all items in the Group that passed the filtering. |
| `allItems`      | `Item[]`         | List of all items in the Group considered for filtering.  |

###### Functions

| Name                            | Return type | Description               |
|---------------------------------|-------------|---------------------------|
| `getFilter(filterName: string)` | `Filter`    | Returns a Filter by name. |

> Note: Other functions are mainly relevant for the filtering algorithm to generate the result and shouldn't be used by the user.

<br>

#### FilterResult

###### Properties

| Name            | Type     | Description                                                    |
|-----------------|----------|----------------------------------------------------------------|
| `schemaFilter`  | `Filter` | The corresponding Filter of the FilterResult.                  |
| `filteredItems` | `Item[]` | List of all items in the Filter that passed the filtering.     |
| `possibleItems` | `Item[]` | List of all items in the Filter that could pass the filtering. |
| `allItems`      | `Item[]` | List of all items in the Filter considered for filtering.      |

###### Functions

| Name | Return type | Description |

> Note: Other functions are mainly relevant for the filtering algorithm to generate the result and shouldn't be used by the user.

<br>

#### FilteringFlow

###### Properties

| Name        | Type               | Description |
|-------------|--------------------|-------------|
| `root`      | `HTMLElement`      |             |
| `options`   | `FilteringOptions` |             |
| `parser`    | `Parser`           |             |
| `schema`    | `Schema`           |             |
| `filtering` | `Filtering`        |             |

###### Functions

| Name                                                             | Return type | Description                                                                                                                                                                 |
|------------------------------------------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `constructor(root: HTMLElement, options: FilteringFlowOptions})` |             | - root, a HTML element containing all group, filter and item Elements.<br>- [FilteringFlowOptions](TODO)                                                                    |
| `initializeParser(parserOptions?: ParserOptions)`                | Parser      | Defaults to initialize a Parser with default parserOptions. Subclass FilteringFlow and override to return custom Parser.                                                    |
| `initializeSchema()`                                             | Schema      | Defaults to initialize a Schema parsed by the Parser returned by `FilteringFlow.initializeParser`. Subclass `FilteringFlow` and override to return custom Schema.           |
| `initializeFiltering(filteringOptions?: FilteringOptions)`       | Filtering   | Defaults to initialize Filtering by using the parsed Schema and default FilteringOptions. Subclass FilteringFlow and override to return custom Filtering.                   |
| `initializeFilterListener()`                                     |             | Adds a click listener to each Filter Element and triggers `beforeFilter()` and `filter()`. Subclass FilteringFlow and override to handle initializing listener by yourself. |
| `beforeFilter(filterElement: HTMLElement)`                       | boolean     | Return true to trigger `filter()`.                                                                                                                                          |
| `filter()`                                                       |             | Defaults to parse the checked Filters from HTML, generates the Result and calls `handleFilterResult(Result)`.                                                               |
| `handleFilterResult(result: Result)`                             |             | Defaults to add or remove the disabled filter class to every Filter Element and add or remove the filtered item class to every Item Element.                                |

> Note: Since the default behavior of `FilteringFlow` is to initialize a default `Parser` and `Filtering`, also check out the documentation
> of these classes. e.g.

<br>

#### FilteringFlowOptions

###### Properties

| Name                             | Type      | Description                                                                                           |
|----------------------------------|-----------|-------------------------------------------------------------------------------------------------------|
| `disabledFilterClass`            | `string`  | CSS class that is added to a Filter when it is disabled.<br>Defaults to `disabled`.                   |
| `filteredItemClass`              | `string`  | CSS class that is added to an Item when it's filtered.<br>Defaults to `filtered`.                     |
| `triggerFilterAfterInitializing` | `boolean` | If true, the filtering will be triggered after initializing the FilteringFlow.<br>Defaults to `true`. |

<br>

#### Parser

###### Properties

| Name      | Type            | Description |
|-----------|-----------------|-------------|
| `options` | `ParserOptions` |             |

###### Functions

| Name                                                               | Return type  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|--------------------------------------------------------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `constructor(options?: ParserOptions)`                             |              | - [options](TODO:ParserOptions)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `parseSchemaFromHtml(root: HTMLElement, schema?: Schema)`          | `Schema`     | Queries and parses `Schema` from a HTML Element. The parser queries for elements, which have to be descendants of the root, having the classes specified in `ParserOptions`. If a `Schema` is passed, the parsed `Groups`, `Filters` and `Itesm` will be added to this `Schema`, otherwise a new default `Schema` will be created.<br>- root, the HTML Element having `Groups`, `Filters` and `Items` as descendants.<br>-schema, optional `Schema` to use and add parsed `Groups`, `Filters` and `Items`. If no schema is passed, a new, default one will be created. |
| `parseGroupsAndFiltersFromHtml(root: HTMLElement, schema: Schema)` |              | Queries and parses `Groups` and `Filters` from a HTML Element. The parser queries for elements, which have to be descendants of the root, having the classes specified in `ParserOptions`. Parsed `Groups` and `Filters` will be added to the `Schema`.<br>- root, the HTML Element having `Groups` and `Filters` as descendants.                                                                                                                                                                                                                                      |
| `parseItemsFromHtml(root: HTMLElement)`                            | `Item[]`     | Queries and parses `Items` from a HTML Element. The parser queries for elements, which have to be descendants of the root, having the classes specified in `ParserOptions`. Parsed `Groups` and `Filters` will be added to the `Schema`.<br>- root, the HTML Element having `Groups` and `Filters` as descendants.                                                                                                                                                                                                                                                     |
| `parseCheckedFilterDataFromHtml(root: HTMLElement)`                | `FilterData` | - root, parse Schema from a HTML Element. The parser queries for elements having the classes specified in `ParserOptions`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |

#### ParserOptions

###### Properties

| Name                      | Type     | Description                                                                                   |
|---------------------------|----------|-----------------------------------------------------------------------------------------------|
| `groupClass`              | `string` | CSS class that is added to a Group Element.<br>Defaults to `filtering-group`.                 |
| `filterClass`             | `string` | CSS class that is added to a Filter Element.<br>Defaults to `filtering-filter`.               |
| `itemClass`               | `string` | CSS class that is added to an Item Element.<br>Defaults to `filtering-item`.                  |
| `itemFilterDataAttribute` | `string` | Data attribute that is used to store the FilterData of an Item.<br>Defaults to `data-filter`. |
| `itemCheckedClass`        | `string` | CSS class that is added to an Item Element when it is checked.<br>Defaults to `checked`.      |

</details>
