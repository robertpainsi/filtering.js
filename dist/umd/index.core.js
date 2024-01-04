!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.filteringjs=t():e.filteringjs=t()}(this,(()=>(()=>{"use strict";var e={798:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FilterData=t.Filtering=void 0;const r=s(664),i=s(196),o=s(867);t.Filtering=class{#e;#t;constructor(e,t={}){this.#e=e,this.#t=t}get schema(){return this.#e}get options(){return this.#t}filter(e){const t=new i.Result(this.#e);let s=[];if(this.#t.filterItem)for(const t of this.#e.items)this.#t.filterItem(t,this.#e,e)&&s.push(t);else s=[...this.#e.items];for(const e of s)t.addAllItem(e);for(const r of this.#s(s,e))t.addFilteredItem(r);return this.#r(t,s,e),t}#r(e,t,s){for(const r of e.groupNames){const i=s.clone();i.disableGroup(r);const o=this.#s(t,i);for(const t of o)for(const s of t.getFilterNames(r))e.getGroup(r)?.getFilter(s)?.addPossibleItem(t)}}#s(e,t){const s=new Set;for(const r of e){let e=!0;for(const[s,i]of t.checkedFilters)if(i.size>0&&!(0,o.findOne)(r.getFilterNames(s),i)){e=!1;break}e&&s.add(r)}return s}};class a{#i=new Map;#o=new Set;get checkedFilters(){return this.#i}checkFilter(e,t){if(e instanceof r.Filter){if(this.#o.has(e.group.name))return;this.#a(e.group.name).add(e.name)}else if("string"==typeof e&&"string"==typeof t){if(this.#o.has(e))return;this.#a(e).add(t)}}#a(e){return this.#i.has(e)||this.#i.set(e,new Set),this.#i.get(e)}disableGroup(e){this.#o.add(e),this.#i.delete(e)}clone(){const e=new a;for(const[t,s]of this.#i.entries())for(const r of s)e.checkFilter(t,r);for(const t of this.#o)e.disableGroup(t);return e}}t.FilterData=a},196:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FilterResult=t.GroupResult=t.Result=void 0;const r=s(867);t.Result=class{#e;#n=new Map;#l=new Set;#d=new Set;constructor(e){this.#e=e,this.#u()}#u(){for(const e of this.schema.groups){const t=new i(e);for(const s of e.filters){const e=new o(s);t.addFilter(e)}this.#h(t)}}get schema(){return this.#e}get groups(){return[...this.#n.values()]}get groupNames(){return[...this.#n.keys()]}#h(e){this.#n.set(e.schemaGroup.name,e)}getGroup(e){return this.#n.get(e)}get filteredItems(){const e=new Set;for(const t of this.groups)for(const s of t.filteredItems)e.add(s);for(const t of this.#l)e.add(t);return(0,r.reorder)(e,this.schema.items)}addFilteredItem(e){this.#l.add(e);for(const t of e.getGroupNames()){const s=this.#n.get(t);s?.addFilteredItem(e)}}get allItems(){const e=new Set;for(const t of this.groups)for(const s of t.allItems)e.add(s);for(const t of this.#d)e.add(t);return(0,r.reorder)(e,this.schema.items)}addAllItem(e){this.#d.add(e);for(const t of e.getGroupNames()){const s=this.#n.get(t);s?.addAllItem(e)}}};class i{#m;#l=new Set;#d=new Set;#c=new Map;constructor(e){this.#m=e}get schemaGroup(){return this.#m}get filters(){return[...this.#c.values()]}addFilter(e){this.#c.set(e.schemaFilter.name,e)}getFilter(e){return this.#c.get(e)}get filteredItems(){const e=new Set;for(const t of this.filters)for(const s of t.filteredItems)e.add(s);for(const t of this.#l)e.add(t);return(0,r.reorder)(e,this.schemaGroup.schema.items)}addFilteredItem(e){this.#l.add(e);for(const t of e.getFilterNames(this.schemaGroup.name))this.#c.get(t)?.addFilteredItem(e)}get allItems(){const e=new Set;for(const t of this.filters)for(const s of t.allItems)e.add(s);for(const t of this.#d)e.add(t);return(0,r.reorder)(e,this.schemaGroup.schema.items)}addAllItem(e){this.#d.add(e);for(const t of e.getFilterNames(this.schemaGroup.name))this.#c.get(t)?.addAllItem(e)}}t.GroupResult=i;class o{#f;#l=new Set;#p=new Set;#d=new Set;constructor(e){this.#f=e}get schemaFilter(){return this.#f}get filteredItems(){return[...this.#l]}addFilteredItem(e){this.#l.add(e),this.addPossibleItem(e),this.addAllItem(e)}get possibleItems(){return[...this.#p]}addPossibleItem(e){this.#p.add(e),this.addAllItem(e)}get allItems(){return[...this.#d]}addAllItem(e){this.#d.add(e)}}t.FilterResult=o},664:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Item=t.Filter=t.Group=t.Schema=void 0,t.Schema=class{#n=new Map;#g=[];#F;constructor(e){this.#F=e}get groups(){return[...this.#n.values()]}getGroup(e){return this.#n.get(e)}addGroup(e){if(this.#n.has(e.name))throw new Error(`Group with name ${e.name} already added to schema. Group names have to be unique.`);this.#n.set(e.name,e),e.schema=this}get items(){return this.#g}addItem(e){this.#g.push(e)}addItems(e){for(const t of e)this.addItem(t)}get data(){return this.#F}},t.Group=class{#I;#e;#c=new Map;#F;constructor(e,t){this.#I=e,this.#F=t}get name(){return this.#I}get schema(){return this.#e}set schema(e){this.#e=e}get filters(){return[...this.#c.values()]}getFilter(e){return this.#c.get(e)}addFilter(e){if(this.#c.has(e.name))throw new Error(`Filter with name ${e.name} already in group ${this.name}. Filter names have to be unique in a Group.`);this.#c.set(e.name,e),e.group=this}getFilterNames(){return[...this.#c.keys()]}get data(){return this.#F}};class s{#I;#G;#F;constructor(e,t){this.#I=e,this.#F=t}get name(){return this.#I}get group(){return this.#G}set group(e){this.#G=e}get data(){return this.#F}}t.Filter=s,t.Item=class{#F;#n=new Map;constructor(e){this.#F=e}get data(){return this.#F}getGroupNames(){return new Set(this.#n.keys())}addFilter(e,t){e instanceof s?this.#a(e.group.name).add(e.name):"string"==typeof e&&"string"==typeof t&&this.#a(e).add(t)}#a(e){return this.#n.has(e)||this.#n.set(e,new Set),this.#n.get(e)}getFilterNames(e){return this.#n.has(e)?this.#n.get(e):new Set}}},867:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reorder=t.getTagName=t.findOne=void 0,t.findOne=function(e,t){const[s,r]=e.size<=t.size?[e,t]:[t,e];for(const e of s)if(r.has(e))return!0;return!1},t.getTagName=function(e){return e.tagName.toLowerCase()},t.reorder=function(e,t){return t.filter((t=>e.has(t)))}}},t={};function s(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,s),o.exports}var r={};return(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.FilterData=e.Schema=e.Item=e.Group=e.Filter=e.Filtering=void 0;var t=s(798);Object.defineProperty(e,"Filtering",{enumerable:!0,get:function(){return t.Filtering}});var i=s(664);Object.defineProperty(e,"Filter",{enumerable:!0,get:function(){return i.Filter}}),Object.defineProperty(e,"Group",{enumerable:!0,get:function(){return i.Group}}),Object.defineProperty(e,"Item",{enumerable:!0,get:function(){return i.Item}}),Object.defineProperty(e,"Schema",{enumerable:!0,get:function(){return i.Schema}});var o=s(798);Object.defineProperty(e,"FilterData",{enumerable:!0,get:function(){return o.FilterData}})})(),r})()));