# [Guide]({{site.baseurl}}{{page.url}})

This guide helps you get used to the library, especially so the parser and filtering-flow logic can lift all the heavy thinking from you. It will show you how to structure your HTML and how to enable some of the awesome features it comes out of the box with. It aims for beginners and may be a little long for many developers out there. If you're an experienced developer and just want to see examples you just can copy and paste, check out the [examples]({{site.baseurl}}/examples.html).

### First example

Let's get started by structuring the HTML.

{% include guides/guide-step-01.html %}

Nothing fancy yet! Everything is wrapped into an element with an id so we can easily query the root element. Filters and items are also placed nicely into a container element. Filtering.js doesn't force you to structure your HTML in that way though. More on this when we start to add the required classes.

{% include guides/guide-step-02.html %}

By adding the classes `filtering-group` for a group of filter, `filtering-filter` for filters and `filtering-item` for items, we tell the parser which items to look for. These class names are the default ones and can be changed by adapting the [parser options]({{site.baseurl}}/api.html#parseroptions).

{% include guides/guide-step-03.html %}

You can think of the attribute `data-group-name` value as the equivalent to HTML's input attribute `name` and the attribute value `data-filter-name` value as the equivalent to HTML's input attribute `value`. Or in short

| HTML           | filtering.js         |
|----------------|----------------------|
| `input[name]`  | `[data-group-name]`  |
| `input[value]` | `[data-filter-name]` |

<div class="info-box">
<p>
Try to limit the used characters for <code>data-group-name</code> and <code>data-filter-name</code> to <code>A-Z a-z 0-9 - _</code> or you may get into problems when linking <code>filtering-items</code> to their corresponding groups and filters.
</p>
</div>

Now that we've set up a group with filters, we just need to link the items to their corresponding filters. Nothing easier than this!

{% include guides/guide-step-04.html %}

Note how the `data-group-name` value is used in the attribute name <code>data-filter-<strong>color</strong></code> and the `data-filter-name` value is used as `data-filter-color` value.

Just one line of JavaScript code and _"It's Alive!"_. Here is the final code:

{% include guides/guide-step-06.html %}
```javascript
new filteringjs.FilteringFlow(document.querySelector('#root')).filter();
```
<br>

Done! Hop to the [examples]({{site.baseurl}}/examples.html) to check out what features the library supports out-of-the-box, like

- Only a single filter should be selected per group.
- Add a select all filters filter.
- Add a search input to prefilter items.
- Add items into multiple filters of the same group.
- Show number of results for each filter if it would be selected in advance.

### Events and Listeners

If you implement the code only using event listeners, you will be able to reuse the logic in other projects too. See the [hash plugin](https://gist.github.com/robertpainsi/2fa433d90ae0136573f155af705f4ee7#file-index-html-L50-L100) that uses the browser's hash to store the active filters in the current url. Mainly you'll need following events, for others you can check out the [API]({{site.baseurl}}/api.html).

- `filter`
    - Usage ```filteringFlow.addEventListener('filter', (event) => {/* your code here */})```
    - Called after filtering. This will be the most registered event because here you can react right after the filtering happened, check the filter result and filter states.
- `filter-item`
    - Usage ```filteringFlow.filtering.addEventListener('filter-item', (event) => {/* your code here */})```
    - Called before `Filtering.filter` for each item. Returning `true` will consider the item for filtering, similar to JavaScript's
      `Array.filter`. If you register multiple event listeners, every one has to return `true`.
- `should-filter`
    - Usage: ```filteringFlow.addEventListener('should-filter', (event) => {/* your code here */})```
    - Called when a filter element is clicked. If any listener returns `false`, the filtering magic will be aborted.
