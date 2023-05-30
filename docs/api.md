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
