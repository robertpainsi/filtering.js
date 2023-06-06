!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("filteringjs",[],e):"object"==typeof exports?exports.filteringjs=e():t.filteringjs=e()}(this,(()=>(()=>{"use strict";var t={d:(e,s)=>{for(var r in s)t.o(s,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:s[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Filter:()=>c,FilterData:()=>l,Filtering:()=>a,FilteringFlow:()=>f,Group:()=>h,Item:()=>d,Parser:()=>m,Schema:()=>n});class s{#t;#e=new Map;constructor(t){this.#t=t,this.#s()}#s(){for(const t of this.schema.groups){const e=new r(t);for(const s of t.filters){const t=new i(s);e.addFilter(t)}this.#r(e)}}get schema(){return this.#t}get groups(){return[...this.#e.values()]}get groupNames(){return[...this.#e.keys()]}#r(t){this.#e.set(t.schemaGroup.name,t)}getGroup(t){return this.#e.get(t)}get filteredItems(){const t=new Set;for(const e of this.groups)for(const s of e.filteredItems)t.add(s);return[...t]}addFilteredItem(t){for(const e of t.getGroupNames())this.#e.get(e).addFilteredItem(t)}get allItems(){const t=new Set;for(const e of this.groups)for(const s of e.allItems)t.add(s);return[...t]}addAllItem(t){for(const e of t.getGroupNames())this.#e.get(e).addAllItem(t)}}class r{#i;#o=new Map;constructor(t){this.#i=t}get schemaGroup(){return this.#i}get filters(){return[...this.#o.values()]}addFilter(t){this.#o.set(t.schemaFilter.name,t)}getFilter(t){return this.#o.get(t)}get filteredItems(){const t=new Set;for(const e of this.filters)for(const s of e.filteredItems)t.add(s);return[...t]}addFilteredItem(t){for(const e of t.getFilterNames(this.schemaGroup.name))this.#o.get(e).addFilteredItem(t)}get allItems(){const t=new Set;for(const e of this.filters)for(const s of e.allItems)t.add(s);return[...t]}addAllItem(t){for(const e of t.getFilterNames(this.schemaGroup.name))this.#o.get(e).addAllItem(t)}}class i{#a;#l=new Set;#n=new Set;#h=new Set;constructor(t){this.#a=t}get schemaFilter(){return this.#a}get filteredItems(){return[...this.#l]}addFilteredItem(t){this.#l.add(t),this.addPossibleItem(t),this.addAllItem(t)}get possibleItems(){return[...this.#n]}addPossibleItem(t){this.#n.add(t),this.addAllItem(t)}get allItems(){return[...this.#h]}addAllItem(t){this.#h.add(t)}}function o(t,e){for(const s of e)if(t.has(s))return!0;return!1}class a{#t;#c;constructor(t,e={}){this.#t=t,this.#c=e}get schema(){return this.#t}get options(){return this.#c}filter(t){const e=new s(this.#t);let r=[];if(this.#c.filterItem)for(const e of this.#t.items)this.#c.filterItem(e,this.#t,t)&&r.push(e);else r=[...this.#t.items];for(const t of r)e.addAllItem(t);for(const s of this.#d(r,t))e.addFilteredItem(s);return this.#m(e,r,t),e}#m(t,e,s){for(const r of t.groupNames){const i=s.clone();i.disableGroup(r);const o=this.#d(e,i);for(const e of o)for(const s of e.getFilterNames(r))t.getGroup(r).getFilter(s).addPossibleItem(e)}}#d(t,e){const s=new Set;for(const r of t){let t=!0;for(const[s,i]of e.checkedFilters)if(i.size>0&&!o(r.getFilterNames(s),i)){t=!1;break}t&&s.add(r)}return s}}class l{#f=new Map;#u=new Set;get checkedFilters(){return this.#f}checkFilter(t,e){this.#u.has(t)||this.#p(t).add(e)}#p(t){return this.#f.has(t)||this.#f.set(t,new Set),this.#f.get(t)}disableGroup(t){this.#u.add(t),this.#f.delete(t)}clone(){const t=new l;for(const[e,s]of this.#f.entries())for(const r of s)t.checkFilter(e,r);for(const e of this.#u)t.disableGroup(e);return t}}class n{#e=new Map;#g=[];#F;constructor(t){this.#F=t}get groups(){return[...this.#e.values()]}get items(){return this.#g}addGroup(t){if(this.#e.has(t.name))throw new Error(`Group with name ${t.name} already added to schema. Group names have to be unique.`);this.#e.set(t.name,t)}addItem(t){this.#g.push(t)}addItems(t){for(const e of t)this.addItem(e)}get data(){return this.#F}}class h{#I;#o=new Map;#F;constructor(t,e){this.#I=t,this.#F=e}get name(){return this.#I}get filters(){return[...this.#o.values()]}addFilter(t){if(this.#o.has(t.name))throw new Error(`Filter with name ${t.name} already in group ${this.name}. Filter names have to be unique in a Group.`);this.#o.set(t.name,t)}getFilterNames(){return[...this.#o.keys()]}get data(){return this.#F}}class c{#I;#F;constructor(t,e){this.#I=t,this.#F=e}get name(){return this.#I}get data(){return this.#F}}class d{#F;#e=new Map;constructor(t){this.#F=t}get data(){return this.#F}getGroupNames(){return new Set(this.#e.keys())}addFilter(t,e){this.#p(t).add(e)}#p(t){return this.#e.has(t)||this.#e.set(t,new Set),this.#e.get(t)}getFilterNames(t){return this.#e.has(t)?new Set(this.#e.get(t)):new Set}}class m{static#b={groupClass:"filtering-group",filterClass:"filtering-filter",itemClass:"filtering-item",itemFilterNameAttributePrefix:"data-filter",filterCheckedClass:"checked"};#c;constructor(t={}){this.#c={...m.#b,...t}}get options(){return this.#c}parseSchemaFromHtml(t,e=new n){for(const s of this.parseGroupsAndFiltersFromHtml(t))e.addGroup(s);for(const s of this.parseItemsFromHtml(t))e.addItem(s);return e}parseGroupsAndFiltersFromHtml(t,e=null){const s=[];for(const e of t.getElementsByClassName(this.#c.groupClass)){const t=e.dataset.groupName;if(void 0===t)continue;const r=new h(t,{element:e,label:e.dataset.groupLabel});for(const t of e.getElementsByClassName(this.#c.filterClass)){const e=t.dataset.filterName;if(void 0===e)continue;const s=new c(e,{element:t,label:t.dataset.filterLabel});r.addFilter(s)}s.push(r)}if(null!==e)for(const t of s)e.addGroup(t);return s}parseItemsFromHtml(t,e=null){const s=[],r=new RegExp(`${this.#c.itemFilterNameAttributePrefix}-(?<groupName>.+)`,"i");for(const e of t.getElementsByClassName(this.#c.itemClass)){const t=new d({element:e});for(const{name:s,value:i}of e.attributes){const e=s.match(r);if(e){const{groupName:s}=e.groups;for(const e of i.split(/\s*,\s*/))t.addFilter(s,e)}}s.push(t)}return null!==e&&e.addItems(s),s}parseCheckedFilterDataFromHtml(t){const e=new l;for(const s of t.getElementsByClassName(this.#c.groupClass)){const t=s.dataset.groupName;for(const r of s.getElementsByClassName(this.#c.filterClass)){const s=r.dataset.filterName;r.classList.contains(this.#c.filterCheckedClass)&&e.checkFilter(t,s)}}return e}}class f{#c;static defaultOptions={triggerFilterAfterInitializing:!0,disabledFilterClass:"disabled",filteredItemClass:"filtered"};#w;#t;#G;#C;constructor(t,e={}){this.#w=t,this.#c={...f.defaultOptions,...e},this.#G=this.initializeParser(),this.#t=this.initializeSchema(),this.#C=this.initializeFiltering(),this.initializeFilterListener(),this.options.triggerFilterAfterInitializing&&this.filter()}get options(){return this.#c}get root(){return this.#w}get schema(){return this.#t}get parser(){return this.#G}get filtering(){return this.#C}initializeParser(t){return new m(t)}initializeSchema(){return this.parser.parseSchemaFromHtml(this.root)}initializeFiltering(){return new a(this.schema)}initializeFilterListener(){for(const t of this.schema.groups)for(const e of t.filters){const t=e.data.element;t.addEventListener("click",(e=>{e.preventDefault(),t.classList.contains(this.options.disabledFilterClass)||this.beforeFilter(t)&&(t.classList.toggle(this.parser.options.filterCheckedClass),this.filter())}))}}beforeFilter(t){return!0}filter(){const t=this.parser.parseCheckedFilterDataFromHtml(this.root),e=this.filtering.filter(t);this.handleFilterResult(e)}handleFilterResult(t){for(const e of t.groups)for(const t of e.filters)t.schemaFilter.data.element.classList.toggle(this.options.disabledFilterClass,0===t.possibleItems.length);for(const e of t.allItems)e.data.element.classList.toggle(this.options.filteredItemClass,!t.filteredItems.includes(e));for(const e of this.schema.items)e.data.element.classList.toggle(this.options.filteredItemClass,!t.filteredItems.includes(e)||!t.allItems.includes(e))}}return e})()));
//# sourceMappingURL=index.ui.js.map