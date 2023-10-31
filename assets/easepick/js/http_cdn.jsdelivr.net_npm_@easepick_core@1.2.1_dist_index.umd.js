/**
* @license
* Package: @easepick/core
* Version: 1.2.1
* https://easepick.com/
* Copyright 2023 Rinat G.
* 
* Licensed under the terms of GNU General Public License Version 2 or later. (http://www.gnu.org/licenses/gpl.html)
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@easepick/datetime")):"function"==typeof define&&define.amd?define(["exports","@easepick/datetime"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).easepick=e.easepick||{},e.easepick)}(this,(function(e,t){"use strict";class i{picker;constructor(e){this.picker=e}render(e,i){e||(e=new t.DateTime),e.setDate(1),e.setHours(0,0,0,0),"function"==typeof this[`get${i}View`]&&this[`get${i}View`](e)}getContainerView(e){this.picker.ui.container.innerHTML="",this.picker.options.header&&this.picker.trigger("render",{date:e.clone(),view:"Header"}),this.picker.trigger("render",{date:e.clone(),view:"Main"}),this.picker.options.autoApply||this.picker.trigger("render",{date:e.clone(),view:"Footer"})}getHeaderView(e){const t=document.createElement("header");this.picker.options.header instanceof HTMLElement&&t.appendChild(this.picker.options.header),"string"==typeof this.picker.options.header&&(t.innerHTML=this.picker.options.header),this.picker.ui.container.appendChild(t),this.picker.trigger("view",{target:t,date:e.clone(),view:"Header"})}getMainView(e){const t=document.createElement("main");this.picker.ui.container.appendChild(t);const i=document.createElement("div");i.className=`calendars grid-${this.picker.options.grid}`;for(let t=0;t<this.picker.options.calendars;t++){const n=document.createElement("div");n.className="calendar",i.appendChild(n);const s=this.getCalendarHeaderView(e.clone());n.appendChild(s),this.picker.trigger("view",{date:e.clone(),view:"CalendarHeader",index:t,target:s});const a=this.getCalendarDayNamesView();n.appendChild(a),this.picker.trigger("view",{date:e.clone(),view:"CalendarDayNames",index:t,target:a});const o=this.getCalendarDaysView(e.clone());n.appendChild(o),this.picker.trigger("view",{date:e.clone(),view:"CalendarDays",index:t,target:o});const r=this.getCalendarFooterView(this.picker.options.lang,e.clone());n.appendChild(r),this.picker.trigger("view",{date:e.clone(),view:"CalendarFooter",index:t,target:r}),this.picker.trigger("view",{date:e.clone(),view:"CalendarItem",index:t,target:n}),e.add(1,"month")}t.appendChild(i),this.picker.trigger("view",{date:e.clone(),view:"Calendars",target:i}),this.picker.trigger("view",{date:e.clone(),view:"Main",target:t})}getFooterView(e){const t=document.createElement("footer"),i=document.createElement("div");i.className="footer-buttons";const n=document.createElement("button");n.className="cancel-button unit",n.innerHTML=this.picker.options.locale.cancel,i.appendChild(n);const s=document.createElement("button");s.className="apply-button unit",s.innerHTML=this.picker.options.locale.apply,s.disabled=!0,i.appendChild(s),t.appendChild(i),this.picker.ui.container.appendChild(t),this.picker.trigger("view",{date:e,target:t,view:"Footer"})}getCalendarHeaderView(e){const t=document.createElement("div");t.className="header";const i=document.createElement("div");i.className="month-name",i.innerHTML=`<span>${e.toLocaleString(this.picker.options.lang,{month:"long"})}</span> ${e.format("YYYY")}`,t.appendChild(i);const n=document.createElement("button");n.className="previous-button unit",n.innerHTML=this.picker.options.locale.previousMonth,t.appendChild(n);const s=document.createElement("button");return s.className="next-button unit",s.innerHTML=this.picker.options.locale.nextMonth,t.appendChild(s),t}getCalendarDayNamesView(){const e=document.createElement("div");e.className="daynames-row";for(let t=1;t<=7;t++){const i=3+this.picker.options.firstDay+t,n=document.createElement("div");n.className="dayname",n.innerHTML=new Date(1970,0,i,12,0,0,0).toLocaleString(this.picker.options.lang,{weekday:"short"}),n.title=new Date(1970,0,i,12,0,0,0).toLocaleString(this.picker.options.lang,{weekday:"long"}),e.appendChild(n),this.picker.trigger("view",{dayIdx:i,view:"CalendarDayName",target:n})}return e}getCalendarDaysView(e){const t=document.createElement("div");t.className="days-grid";const i=this.calcOffsetDays(e,this.picker.options.firstDay),n=32-new Date(e.getFullYear(),e.getMonth(),32).getDate();for(let e=0;e<i;e++){const e=document.createElement("div");e.className="offset",t.appendChild(e)}for(let i=1;i<=n;i++){e.setDate(i);const n=this.getCalendarDayView(e);t.appendChild(n),this.picker.trigger("view",{date:e,view:"CalendarDay",target:n})}return t}getCalendarDayView(e){const i=this.picker.options.date?new t.DateTime(this.picker.options.date):null,n=new t.DateTime,s=document.createElement("div");return s.className="day unit",s.innerHTML=e.format("D"),s.dataset.time=String(e.getTime()),e.isSame(n,"day")&&s.classList.add("today"),[0,6].includes(e.getDay())&&s.classList.add("weekend"),this.picker.datePicked.length?this.picker.datePicked[0].isSame(e,"day")&&s.classList.add("selected"):i&&e.isSame(i,"day")&&s.classList.add("selected"),this.picker.trigger("view",{date:e,view:"CalendarDay",target:s}),s}getCalendarFooterView(e,t){const i=document.createElement("div");return i.className="footer",i}calcOffsetDays(e,t){let i=e.getDay()-t;return i<0&&(i+=7),i}}class n{picker;instances={};constructor(e){this.picker=e}initialize(){const e=[];this.picker.options.plugins.forEach((t=>{"function"==typeof t?e.push(new t):"string"==typeof t&&"undefined"!=typeof easepick&&Object.prototype.hasOwnProperty.call(easepick,t)?e.push(new easepick[t]):console.warn(`easepick: ${t} not found.`)})),e.sort(((e,t)=>e.priority>t.priority?-1:e.priority<t.priority||e.dependencies.length>t.dependencies.length?1:e.dependencies.length<t.dependencies.length?-1:0)),e.forEach((e=>{e.attach(this.picker),this.instances[e.getName()]=e}))}getInstance(e){return this.instances[e]}addInstance(e){if(Object.prototype.hasOwnProperty.call(this.instances,e))console.warn(`easepick: ${e} already added.`);else{if("undefined"!=typeof easepick&&Object.prototype.hasOwnProperty.call(easepick,e)){const t=new easepick[e];return t.attach(this.picker),this.instances[t.getName()]=t,t}if("undefined"!==this.getPluginFn(e)){const t=new(this.getPluginFn(e));return t.attach(this.picker),this.instances[t.getName()]=t,t}console.warn(`easepick: ${e} not found.`)}return null}removeInstance(e){return e in this.instances&&this.instances[e].detach(),delete this.instances[e]}reloadInstance(e){return this.removeInstance(e),this.addInstance(e)}getPluginFn(e){return[...this.picker.options.plugins].filter((t=>"function"==typeof t&&(new t).getName()===e)).shift()}}class s{Calendar=new i(this);PluginManager=new n(this);calendars=[];datePicked=[];cssLoaded=0;binds={hidePicker:this.hidePicker.bind(this),show:this.show.bind(this)};options={doc:document,css:[],element:null,firstDay:1,grid:1,calendars:1,lang:"en-US",date:null,format:"YYYY-MM-DD",readonly:!0,autoApply:!0,header:!1,inline:!1,scrollToDate:!0,locale:{nextMonth:'<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',previousMonth:'<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',cancel:"Cancel",apply:"Apply"},documentClick:this.binds.hidePicker,plugins:[]};ui={container:null,shadowRoot:null,wrapper:null};version="1.2.1";constructor(e){const t={...this.options.locale,...e.locale};this.options={...this.options,...e},this.options.locale=t,this.handleOptions(),this.ui.wrapper=document.createElement("span"),this.ui.wrapper.style.display="none",this.ui.wrapper.style.position="absolute",this.ui.wrapper.style.pointerEvents="none",this.ui.wrapper.className="easepick-wrapper",this.ui.wrapper.attachShadow({mode:"open"}),this.ui.shadowRoot=this.ui.wrapper.shadowRoot,this.ui.container=document.createElement("div"),this.ui.container.className="container",this.options.zIndex&&(this.ui.container.style.zIndex=String(this.options.zIndex)),this.options.inline&&(this.ui.wrapper.style.position="relative",this.ui.container.classList.add("inline")),this.ui.shadowRoot.appendChild(this.ui.container),this.options.element.after(this.ui.wrapper),this.handleCSS(),this.options.element.addEventListener("click",this.binds.show),this.on("view",this.onView.bind(this)),this.on("render",this.onRender.bind(this)),this.PluginManager.initialize(),this.parseValues(),"function"==typeof this.options.setup&&this.options.setup(this),this.on("click",this.onClick.bind(this));const i=this.options.scrollToDate?this.getDate():null;this.renderAll(i)}on(e,t,i={}){this.ui.container.addEventListener(e,t,i)}off(e,t,i={}){this.ui.container.removeEventListener(e,t,i)}trigger(e,t={}){return this.ui.container.dispatchEvent(new CustomEvent(e,{detail:t}))}destroy(){this.options.element.removeEventListener("click",this.binds.show),"function"==typeof this.options.documentClick&&document.removeEventListener("click",this.options.documentClick,!0),Object.keys(this.PluginManager.instances).forEach((e=>{this.PluginManager.removeInstance(e)})),this.ui.wrapper.remove()}onRender(e){const{view:t,date:i}=e.detail;this.Calendar.render(i,t)}onView(e){const{view:t,target:i}=e.detail;if("Footer"===t&&this.datePicked.length){i.querySelector(".apply-button").disabled=!1}}onClickHeaderButton(e){this.isCalendarHeaderButton(e)&&(e.classList.contains("next-button")?this.calendars[0].add(1,"month"):this.calendars[0].subtract(1,"month"),this.renderAll(this.calendars[0]))}onClickCalendarDay(e){if(this.isCalendarDay(e)){const i=new t.DateTime(e.dataset.time);this.options.autoApply?(this.setDate(i),this.trigger("select",{date:this.getDate()}),this.hide()):(this.datePicked[0]=i,this.trigger("preselect",{date:this.getDate()}),this.renderAll())}}onClickApplyButton(e){if(this.isApplyButton(e)){if(this.datePicked[0]instanceof Date){const e=this.datePicked[0].clone();this.setDate(e)}this.hide(),this.trigger("select",{date:this.getDate()})}}onClickCancelButton(e){this.isCancelButton(e)&&this.hide()}onClick(e){const t=e.target;if(t instanceof HTMLElement){const e=t.closest(".unit");if(!(e instanceof HTMLElement))return;this.onClickHeaderButton(e),this.onClickCalendarDay(e),this.onClickApplyButton(e),this.onClickCancelButton(e)}}isShown(){return this.ui.container.classList.contains("inline")||this.ui.container.classList.contains("show")}show(e){if(this.isShown())return;const t=e&&"target"in e?e.target:this.options.element,{top:i,left:n}=this.adjustPosition(t);this.ui.container.style.top=`${i}px`,this.ui.container.style.left=`${n}px`,this.ui.container.classList.add("show"),this.trigger("show",{target:t})}hide(){this.ui.container.classList.remove("show"),this.datePicked.length=0,this.renderAll(),this.trigger("hide")}setDate(e){const i=new t.DateTime(e,this.options.format);this.options.date=i.clone(),this.updateValues(),this.calendars.length&&this.renderAll()}getDate(){return this.options.date instanceof t.DateTime?this.options.date.clone():null}parseValues(){this.options.date?this.setDate(this.options.date):this.options.element instanceof HTMLInputElement&&this.options.element.value.length&&this.setDate(this.options.element.value),this.options.date instanceof Date||(this.options.date=null)}updateValues(){const e=this.getDate(),t=e instanceof Date?e.format(this.options.format,this.options.lang):"",i=this.options.element;i instanceof HTMLInputElement?i.value=t:i instanceof HTMLElement&&(i.innerText=t)}hidePicker(e){let t=e.target,i=null;t.shadowRoot&&(t=e.composedPath()[0],i=t.getRootNode().host),this.isShown()&&i!==this.ui.wrapper&&t!==this.options.element&&this.hide()}renderAll(e){this.trigger("render",{view:"Container",date:(e||this.calendars[0]).clone()})}isCalendarHeaderButton(e){return["previous-button","next-button"].some((t=>e.classList.contains(t)))}isCalendarDay(e){return e.classList.contains("day")}isApplyButton(e){return e.classList.contains("apply-button")}isCancelButton(e){return e.classList.contains("cancel-button")}gotoDate(e){const i=new t.DateTime(e,this.options.format);i.setDate(1),this.calendars[0]=i.clone(),this.renderAll()}clear(){this.options.date=null,this.datePicked.length=0,this.updateValues(),this.renderAll(),this.trigger("clear")}handleOptions(){this.options.element instanceof HTMLElement||(this.options.element=this.options.doc.querySelector(this.options.element)),"function"==typeof this.options.documentClick&&document.addEventListener("click",this.options.documentClick,!0),this.options.element instanceof HTMLInputElement&&(this.options.element.readOnly=this.options.readonly),this.options.date?this.calendars[0]=new t.DateTime(this.options.date,this.options.format):this.calendars[0]=new t.DateTime}handleCSS(){if(Array.isArray(this.options.css))this.options.css.forEach((e=>{const t=document.createElement("link");t.href=e,t.rel="stylesheet";const i=()=>{this.cssLoaded++,this.cssLoaded===this.options.css.length&&(this.ui.wrapper.style.display="")};t.addEventListener("load",i),t.addEventListener("error",i),this.ui.shadowRoot.append(t)}));else if("string"==typeof this.options.css){const e=document.createElement("style"),t=document.createTextNode(this.options.css);e.appendChild(t),this.ui.shadowRoot.append(e),this.ui.wrapper.style.display=""}else"function"==typeof this.options.css&&(this.options.css.call(this,this),this.ui.wrapper.style.display="")}adjustPosition(e){const t=e.getBoundingClientRect(),i=this.ui.wrapper.getBoundingClientRect();this.ui.container.classList.add("calc");const n=this.ui.container.getBoundingClientRect();this.ui.container.classList.remove("calc");let s=t.bottom-i.bottom,a=t.left-i.left;return"undefined"!=typeof window&&(window.innerHeight<s+n.height&&s-n.height>=0&&(s=t.top-i.top-n.height),window.innerWidth<a+n.width&&t.right-n.width>=0&&(a=t.right-i.right-n.width)),{left:a,top:s}}}var a=Object.freeze({__proto__:null,Core:s,create:s});e.Core=s,e.create=s,e.easepick=a,Object.defineProperty(e,"__esModule",{value:!0})}));
