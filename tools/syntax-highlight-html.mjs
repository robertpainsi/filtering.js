import path from 'path'
import url from 'url'
import fs from "fs"

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

function createSyntaxHighlightedHtml(fileName, html) {
    let result = html
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(!)?([^ ]*?=)(!)?(".*?")/g, '<span class="attribute $1">$2<span class="attribute-value $3">$4</span></span>')
        .replace(/(!)?(&lt;!--.*?--&gt;)/g, '<span class="comment $1">$2</span>')
        .replace(/(!)?(&lt;[^\/])/g, '<span class="element $1">$2')
        .replace(/(&lt;\/.*?&gt;)/g, '$1</span>')
        .replace(/&gt;(!)?(.*?)&lt/g, '&gt;<span class="text $1">$2</span>&lt')
        .replace(/\*(.*)?\*/g, '<b>$1</b>')
    fs.writeFileSync(path.join(__dirname, `../docs/_includes/guides/`, fileName), `<pre class="guide"><code>${result.trim()}</code></pre>`)
}

createSyntaxHighlightedHtml('guide-step-01.html', `
!<div id="root">      <!-- query the element by id in JavaScript -->
  <div>                <!-- group container with all the filters -->
    <div>Red</div>       <!-- filter -->
    <div>Blue</div>      <!-- filter -->
  </div>
  <div>                <!-- container with all items -->
    <div>Red item</div>  <!-- item -->
    <div>Blue item</div> <!-- item -->
  </div>
</div>
`)

createSyntaxHighlightedHtml('guide-step-02.html', `
<div id="root">
  <div !class="filtering-group">
    <div !class="filtering-filter">Red</div>
    <div !class="filtering-filter">Blue</div>
  </div>
  <div>
    <div !class="filtering-item">Red item</div>
    <div !class="filtering-item">Blue item</div>
  </div>
</div>
`)

createSyntaxHighlightedHtml('guide-step-03.html', `
…
<div class="filtering-group" !data-group-name="color">
  <div class="filtering-filter" !data-filter-name="red">Red</div>
  <div class="filtering-filter" !data-filter-name="blue">Blue</div>
</div>
…
`)

createSyntaxHighlightedHtml('guide-step-04.html', `
…
<div !class="filtering-item">Red item</div>
<div !class="filtering-item">Blue item</div>
…
`)

createSyntaxHighlightedHtml('guide-step-05.html', `
…
<div class="filtering-item" !data-filter-color="red">Red item</div>
<div class="filtering-item" !data-filter-color="blue">Blue item</div>
…
`)

createSyntaxHighlightedHtml('guide-step-05.html', `
…
<div class="filtering-group" data-group-name=!"color">
  <div class="filtering-filter" data-filter-name=!"red">Red</div>
…
<div class="filtering-item" data-filter-*color*=!"red">Red item</div>
…
`)

createSyntaxHighlightedHtml('guide-step-06.html', `
!<div id="root">
  <div class="filtering-group" data-group-name="color">
    <div class="filtering-filter" data-filter-name="red">Red</div>
    <div class="filtering-filter" data-filter-name="blue">Blue</div>
  </div>
  <div>
    <div class="filtering-item" data-filter-color="red">Red item</div>
    <div class="filtering-item" data-filter-color="blue">Blue item</div>
  </div>
</div>
`)

const final = `
<div id="root">
  <div>
    <div class="filtering-group" data-group-name="color" data-select-type="single">
      <div class="filtering-filter" data-filter-name="red">Red</div>
      <div class="filtering-filter" data-filter-name="blue">Blue</div>
      <div class="filtering-filter" data-filter-type="all">All</div>
    </div>
  </div>
  <div>
    <div class="filtering-item" data-filter-color="red">Red item</div>
    <div class="filtering-item" data-filter-color="blue">Blue item</div>
  </div>
</div>
`