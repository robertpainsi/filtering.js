!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("filteringjs",[],t):"object"==typeof exports?exports.filteringjs=t():e.filteringjs=t()}(this,(()=>(()=>{"use strict";var e={d:(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Filter:()=>h,FilterData:()=>n,Filtering:()=>a,Group:()=>d,Item:()=>c,Schema:()=>l});class s{#e;#t=new Map;constructor(e){this.#e=e,this.#s()}#s(){for(const e of this.schema.groups){const t=new r(e);for(const s of e.filters){const e=new i(s);t.addFilter(e)}this.#r(t)}}get schema(){return this.#e}get groups(){return[...this.#t.values()]}get groupNames(){return[...this.#t.keys()]}#r(e){this.#t.set(e.schemaGroup.name,e)}getGroup(e){return this.#t.get(e)}get filteredItems(){const e=new Set;for(const t of this.groups)for(const s of t.filteredItems)e.add(s);return[...e]}addFilteredItem(e){for(const t of e.getGroupNames())this.#t.get(t).addFilteredItem(e)}get allItems(){const e=new Set;for(const t of this.groups)for(const s of t.allItems)e.add(s);return[...e]}addAllItem(e){for(const t of e.getGroupNames())this.#t.get(t).addAllItem(e)}}class r{#i;#o=new Map;constructor(e){this.#i=e}get schemaGroup(){return this.#i}get filters(){return[...this.#o.values()]}addFilter(e){this.#o.set(e.schemaFilter.name,e)}getFilter(e){return this.#o.get(e)}get filteredItems(){const e=new Set;for(const t of this.filters)for(const s of t.filteredItems)e.add(s);return[...e]}addFilteredItem(e){for(const t of e.getFilterNames(this.schemaGroup.name))this.#o.get(t).addFilteredItem(e)}get allItems(){const e=new Set;for(const t of this.filters)for(const s of t.allItems)e.add(s);return[...e]}addAllItem(e){for(const t of e.getFilterNames(this.schemaGroup.name))this.#o.get(t).addAllItem(e)}}class i{#a;#n=new Set;#l=new Set;#d=new Set;constructor(e){this.#a=e}get schemaFilter(){return this.#a}get filteredItems(){return[...this.#n]}addFilteredItem(e){this.#n.add(e),this.addPossibleItem(e),this.addAllItem(e)}get possibleItems(){return[...this.#l]}addPossibleItem(e){this.#l.add(e),this.addAllItem(e)}get allItems(){return[...this.#d]}addAllItem(e){this.#d.add(e)}}function o(e,t){for(const s of t)if(e.has(s))return!0;return!1}class a{#e;#h;constructor(e,t={}){this.#e=e,this.#h=t}get schema(){return this.#e}get options(){return this.#h}filter(e){const t=new s(this.#e);let r=[];if(this.#h.filterItem)for(const t of this.#e.items)this.#h.filterItem(t,this.#e,e)&&r.push(t);else r=[...this.#e.items];for(const e of r)t.addAllItem(e);for(const s of this.#c(r,e))t.addFilteredItem(s);return this.#m(t,r,e),t}#m(e,t,s){for(const r of e.groupNames){const i=s.clone();i.disableGroup(r);const o=this.#c(t,i);for(const t of o)for(const s of t.getFilterNames(r))e.getGroup(r).getFilter(s).addPossibleItem(t)}}#c(e,t){const s=new Set;for(const r of e){let e=!0;for(const[s,i]of t.checkedFilters)if(i.size>0&&!o(r.getFilterNames(s),i)){e=!1;break}e&&s.add(r)}return s}}class n{#u=new Map;#f=new Set;get checkedFilters(){return this.#u}checkFilter(e,t){this.#f.has(e)||this.#g(e).add(t)}#g(e){return this.#u.has(e)||this.#u.set(e,new Set),this.#u.get(e)}disableGroup(e){this.#f.add(e),this.#u.delete(e)}clone(){const e=new n;for(const[t,s]of this.#u.entries())for(const r of s)e.checkFilter(t,r);for(const t of this.#f)e.disableGroup(t);return e}}class l{#t=new Map;#p=[];#F;constructor(e){this.#F=e}get groups(){return[...this.#t.values()]}get items(){return this.#p}addGroup(e){if(this.#t.has(e.name))throw new Error(`Group with name ${e.name} already added to schema. Group names have to be unique.`);this.#t.set(e.name,e)}addItem(e){this.#p.push(e)}addItems(e){for(const t of e)this.addItem(t)}get data(){return this.#F}}class d{#I;#o=new Map;#F;constructor(e,t){this.#I=e,this.#F=t}get name(){return this.#I}get filters(){return[...this.#o.values()]}addFilter(e){if(this.#o.has(e.name))throw new Error(`Filter with name ${e.name} already in group ${this.name}. Filter names have to be unique in a Group.`);this.#o.set(e.name,e)}getFilterNames(){return[...this.#o.keys()]}get data(){return this.#F}}class h{#I;#F;constructor(e,t){this.#I=e,this.#F=t}get name(){return this.#I}get data(){return this.#F}}class c{#F;#t=new Map;constructor(e){this.#F=e}get data(){return this.#F}getGroupNames(){return new Set(this.#t.keys())}addFilter(e,t){this.#g(e).add(t)}#g(e){return this.#t.has(e)||this.#t.set(e,new Set),this.#t.get(e)}getFilterNames(e){return this.#t.has(e)?new Set(this.#t.get(e)):new Set}}return t})()));
//# sourceMappingURL=index.core.js.map