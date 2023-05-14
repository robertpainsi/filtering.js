!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var s=t();for(var r in s)("object"==typeof exports?exports:e)[r]=s[r]}}(this,(()=>(()=>{"use strict";var e,t,s={d:(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},r={};s.r(r),s.d(r,{ENABLE_ALL_FILTER:()=>d,Filter:()=>i,FilterData:()=>n,Filtering:()=>h,Group:()=>a,Item:()=>o,Schema:()=>l,parseEnabledFilterDataFromHtml:()=>g,parseSchemaFromHtml:()=>p});class l{#e=new Map;#t=[];#s;constructor(e){this.#s=e}get groups(){return[...this.#e.values()]}get items(){return this.#t}addGroup(e){this.#e.set(e.name,e)}addItem(e){this.#t.push(e)}addItems(e){for(const t of e)this.addItem(t)}get data(){return this.#s}}class a{#r;#l;#a;#i=new Map;#s;constructor(t,s,r=e.singleSelect,l){this.#r=t,this.#l=s,this.#a=r,this.#s=l}get name(){return this.#r}get label(){return this.#l}get type(){return this.#a}get filters(){return[...this.#i.values()]}addFilter(e){this.#i.set(e.name,e)}getFilterNames(){return new Set(this.#i.keys())}get data(){return this.#s}}!function(e){e.singleSelect="",e.multiSelect="multiSelect"}(e||(e={}));class i{#r;#l;#a;#s;constructor(e,s,r=t.single,l){this.#r=e,this.#l=s,this.#a=r,this.#s=l}get name(){return this.#r}get label(){return this.#l}get type(){return this.#a}get data(){return this.#s}}!function(e){e.single="",e.all="all"}(t||(t={}));class o{#s;#e=new Map;constructor(e){this.#s=e}get data(){return this.#s}getGroupNames(){return new Set(this.#e.keys())}addFilter(e,t){this.#o(e).add(t)}#o(e){return this.#e.has(e)||this.#e.set(e,new Set),this.#e.get(e)}getFilterNames(e){return this.#e.has(e)?new Set(this.#e.get(e)):new Set}}class n{#n=new Map;get enabledGroups(){return this.#n.keys()}get enabledFilters(){return this.#n}enableFilter(e,t){const s=this.#o(e);s.has(d)||(t===d?this.enableAllFilter(e):s.add(t))}enableAllFilter(e){const t=this.#o(e);t.clear(),t.add(d)}#o(e){return this.#n.has(e)||this.#n.set(e,new Set),this.#n.get(e)}enableGroup(e){this.#n.delete(e),this.enableAllFilter(e)}disableGroup(e){this.#n.delete(e)}clone(){const e=new n;for(const[t,s]of this.#n.entries())for(const r of s)e.enableFilter(t,r);return e}}const d=Symbol("Enable all filter");class u{#e=new Map;#d=new Set;#u=new Set;get groups(){return[...this.#e.values()]}get groupNames(){return[...this.#e.keys()]}addGroup(e){this.#e.set(e.name,e)}getGroup(e){return this.#e.get(e)}get filteredItems(){return[...this.#d]}addFilteredItem(e){this.#d.add(e);for(const t of e.getGroupNames())this.#e.get(t).addFilteredItem(e)}get allItems(){return[...this.#u]}addAllItem(e){this.#u.add(e);for(const t of e.getGroupNames())this.#e.get(t).addAllItem(e)}}class m{#r;#a;#i=new Map;#d=new Set;#u=new Set;constructor(e,t){this.#r=e,this.#a=t}get name(){return this.#r}get type(){return this.#a}get filters(){return[...this.#i.values()]}addFilter(e){this.#i.set(e.name,e)}getFilter(e){return this.#i.get(e)}addFilteredItem(e){this.#d.add(e);for(const t of e.getFilterNames(this.#r))this.#i.get(t).addFilteredItem(e)}addAllItem(e){this.#u.add(e);for(const t of e.getFilterNames(this.#r))this.#i.get(t).addAllItem(e)}}class f{#r;#a;#d=new Set;#m=new Set;#u=new Set;constructor(e,t){this.#r=e,this.#a=t}get name(){return this.#r}get type(){return this.#a}get filteredItems(){return[...this.#d]}addFilteredItem(e){this.#d.add(e)}get possibleItems(){return[...this.#m]}addPossibleItem(e){this.#m.add(e)}get allItems(){return[...this.#u]}addAllItem(e){this.#u.add(e)}}function c(e,t){for(const s of t)if(e.has(s))return!0;return!1}class h{schema;options;constructor(e,t={}){this.schema=e,this.options=t}filter(e){return new Promise(((t,s)=>{const r=this.createEmptyResult(this.schema);for(const e of this.schema.items)r.addAllItem(e);for(const t of this.getFilterItems(this.schema.items,e))r.addFilteredItem(t);this.calculatePossibleItems(r,this.schema.items,e),t(r)}))}createEmptyResult(e){const t=new u;for(const s of e.groups){const e=new m(s.name,s.type);for(const t of s.filters){const s=new f(t.name,t.type);e.addFilter(s)}t.addGroup(e)}return t}calculatePossibleItems(e,t,s){for(const r of e.groupNames){const l=s.clone();l.disableGroup(r);const a=this.getFilterItems(t,l);for(const t of a)for(const s of t.getFilterNames(r))e.getGroup(r).getFilter(s).addPossibleItem(t)}}getFilterItems(e,t){const s=new Set;for(const r of e){let e=!0;for(const[s,l]of t.enabledFilters)if(!l.has(d)&&l.size>0&&!c(r.getFilterNames(s),l)){e=!1;break}e&&s.add(r)}return s}}function p(e){const t=new l,s=[...e.querySelectorAll(".filtering-group")];for(const e of s){const s=e.dataset.groupName,r=e.dataset.groupLabel||s,l=e.dataset.groupType,o=new a(s,r,l,{element:e}),n=[...e.querySelectorAll(".filtering-filter")];for(const e of n){const t=e.dataset.filterName,s=e.dataset.filterLabel||t,r=e.dataset.filterType,l=new i(t,s,r,{element:e});o.addFilter(l)}t.addGroup(o)}for(const s of function(e){const t=[],s=[...e.querySelectorAll(".filtering-item")];for(const e of s){const s=new o({element:e});for(const{name:t,value:r}of e.attributes){const e=t.match(/data-filter-(?<groupName>.+)/i);if(e){const{groupName:t}=e.groups;for(const e of r.split(/\s*,\s*/))s.addFilter(t,e)}}t.push(s)}return t}(e))t.addItem(s);return t}function g(e){const s=new n,r=[...e.querySelectorAll(".filtering-group")];for(const e of r){const r=e.dataset.groupName,l=[...e.querySelectorAll(".filtering-filter")];for(const e of l){const l=e.dataset.filterName,a=e.dataset.filterType;if(e.classList.contains("enabled")){if(a===t.all){s.enableAllFilter(r);break}s.enableFilter(r,l)}}}return s}return r})()));