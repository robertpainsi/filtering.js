# [API]({{site.baseurl}}{{page.url}})

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

| Name                                       | Return type | Description                                                                                     |
|--------------------------------------------|-------------|-------------------------------------------------------------------------------------------------|
| `constructor(name: string, data?: object)` |             | - name, name of the group.<br>- data, a usable plain old JavaScript object defined by the user. |
| `addFilter(filter: Filter)`                |             | Adds a new Filter to the Group.                                                                 |

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
| `constructor(data?: object)`                       |               | - data, a usable plain old JavaScript object defined by the user.      |
| `addFilter(groupName: string, filterName: string)` |               | Specifies the                                                          |
| `getGroupNames()`                                  | `Set<string>` | Returns a set of all Group names the Item is in.                       |
| `getFilterNames(groupName: string)`                | `Set<string>` | Returns a set of all Filter names for a specific Group the Item is in. |

<br>

#### Filtering

###### Properties

| Name      | Type               | Description |
|-----------|--------------------|-------------|
| `schema`  | `Schema`           |             |

###### Functions

| Name                                                                              | Return type  | Description                                                                                                                                                                                                                                                                                                                                                    |
|-----------------------------------------------------------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `constructor(schema: Schema)`                                                     |              |                                                                                                                                                                                                                                                                                                                                                                |
| `addEventListener(eventName: string, callback: EventCallback, priority?: number)` | `() => void` | Check out the [`Filtering Events`]({{site.baseurl}}/api.html#events) list below. Also the [`EventEmitter`]({{site.baseurl}}/api.html#eventemitter) and [`EventCallback`]({{site.baseurl}}/api.html#eventcallback) section at the end for more information on the `addEventListener()` method and parameters.<br>Returns a function to unregister the listener. |

###### Events

| Name          | Return type | Event                                              | Description                                                                                                                                                                                                             |
|---------------|-------------|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `filter-item` | `boolean`   | `{source: this, data: {item, filterData, schema}}` | Called before `Filtering.filter` for each item. Returning `true` will consider the item for filtering, similar to JavaScript's `Array.filter`. If you register multiple event listeners, every one has to return `true`. |

<br>

#### FilterData

###### Properties

| Name             | Type                       | Description                                                                                         |
|------------------|----------------------------|-----------------------------------------------------------------------------------------------------|
| `checkedFilters` | `Map<string, Set<string>>` | A map representing the checked Data (key: Group names; values: Filter names in the specific group). |

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

| Name                                                                              | Return type  | Description                                                                                                                                                                                                                                                                                                                                                      |
|-----------------------------------------------------------------------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `constructor(root: HTMLElement, options: FilteringFlowOptions})`                  |              | - root, a HTML element containing all group, filter and item elements.<br>- [FilteringFlowOptions]({{site.baseurl}}/api.html#filteringflowoptions)                                                                                                                                                                                                               |
| `initializeParser()`                                                              | `Parser`     | Initializes a `Parser` with default parserOptions. Overrider to return a custom `Parser`.                                                                                                                                                                                                                                                                        |
| `initializeSchema()`                                                              | `Schema`     | Initializes a `Schema` parsed from the `Parser`. Override to return a custom `Schema`.                                                                                                                                                                                                                                                                           |
| `initializeFiltering()`                                                           | `Filtering`  | Initializes a `Filtering` by using the parsed Schema. Override to return a custom `Filtering`.                                                                                                                                                                                                                                                                   |
| `initializeFilterListener()`                                                      |              | Adds a click listener to each filter element. Override to handle initializing listeners by yourself.                                                                                                                                                                                                                                                             |
| `filter(filterData?: FilterData)`                                                 |              | If no `filterData` is passed, it parses the checked Filters from HTML first. Then emits and returns the `Result`                                                                                                                                                                                                                                                 |
| `destroy()`                                                                       |              | Removes all element event listeners and stored variables.                                                                                                                                                                                                                                                                                                        |
| `addEventListener(eventName: string, callback: EventCallback, priority?: number)` | `() => void` | Check out the [`Filtering Events`]({{site.baseurl}}/api.html#events-1) list below. Also the [`EventEmitter`]({{site.baseurl}}/api.html#eventemitter) and [`EventCallback`]({{site.baseurl}}/api.html#eventcallback) section at the end for more information on the `addEventListener()` method and parameters.<br>Returns a function to unregister the listener. |

###### Events

| Name            | Return type | Event                                      | Description                                                                                                                                                              |
|-----------------|-------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `should-filter` | `boolean`   | `{source: this, data: {filter}}`           | Called when a filter element is clicked. If any listener returns `false`, the filtering magic will be aborted.                                                           |
| `before-filter` |             | `{source: this, data: {filterData}}`       | Called right before `filter()`. TODO: why is it useful?                                                                                                                  |
| `filter`        |             | `source: this, data: {result, filterData}` | Called after filtering. This will be the most registered event because here you can react right after the filtering happened, check the filter result and filter states. |
| `destroy`       |             | ` {source: this}`                          | Called right before unregister listeners and removing references. Here you can do your custom clean up.                                                                  |

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
| `constructor(options?: ParserOptions)`                             |              | - [options]({{site.baseurl}}/api.html#parseroptions)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
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
| `itemClass`               | `string` | CSS class used to query for Item Elements.<br>Defaults to `filtering-item`.                   |
| `itemFilterDataAttribute` | `string` | Data attribute that is used to store the FilterData of an Item.<br>Defaults to `data-filter`. |
| `itemCheckedClass`        | `string` | CSS class that is added to an Item Element when it is checked.<br>Defaults to `checked`.      |

#### EventEmitter

###### Functions

| Name                                                                              | Return type  | Description                                                                                                                                                                                       |
|-----------------------------------------------------------------------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `emit(eventName: string, event: Event)`                                           | `any[]`      | The emitted `event` should have a `source` property, normally `this`, and an optional `data` property for any additional data.<br>The returned array stores the return values from each callback. |
| `addEventListener(eventName: string, callback: EventCallback, priority?: number)` | `() => void` | If for some reason the callback order matters, you can set a custom priority, defaults to `0`. Higher values are called first.<br>Returns a function to unregister the listener.                  |

#### EventCallback

`(event) => {}` where `event` is a plain old JavaScript object with the properties `source` and an optional `data`.