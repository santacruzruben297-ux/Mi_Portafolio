/* Utilidades propias de las demos. No hay librerías ni servicios externos. */
(function () {
  "use strict";
  function read(key,fallback) { try { const s=localStorage.getItem(key);return s===null?fallback:JSON.parse(s); } catch(e){return fallback;} }
  function write(key,value) { try { localStorage.setItem(key,JSON.stringify(value));return true; } catch(e){return false;} }
  function node(tag,cls,text) {const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text);return n;}
  function money(cents) {return new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN",minimumFractionDigits:2}).format(cents/100);}
  function normalize(s) {return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();}
  function dateKey(date) {return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0");}
  function parseDate(key) {
    if(typeof key!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(key))return null;
    const parts=key.split("-").map(Number);const d=new Date(0);d.setHours(0,0,0,0);d.setFullYear(parts[0],parts[1]-1,parts[2]);
    return dateKey(d)===key?d:null;
  }
  function uid(prefix) {return prefix+"-"+Date.now().toString(36).toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase();}
  class Cart {
    constructor(key,products) {
      this.key=key;this.products=products.filter(function(p){return p&&typeof p.id==="string"&&Number.isFinite(p.precio)&&p.precio>=0;});
      this.quantities=Object.create(null);const data=read(key,{});
      if(data&&typeof data==="object"&&!Array.isArray(data))this.products.forEach((p)=>{if(Object.prototype.hasOwnProperty.call(data,p.id))this.set(p.id,data[p.id],false);});
    }
    set(id,quantity,persist=true) {
      if(!this.products.some(function(p){return p.id===id;}))return false;
      const q=typeof quantity==="number"&&Number.isFinite(quantity)?Math.max(0,Math.min(20,Math.trunc(quantity))):0;
      if(q)this.quantities[id]=q;else delete this.quantities[id];
      return persist?write(this.key,this.quantities):true;
    }
    add(id) {return this.set(id,(this.quantities[id]||0)+1);}
    remove(id) {return this.set(id,0);}
    clear() {this.quantities=Object.create(null);return write(this.key,this.quantities);}
    lines() {return this.products.filter((p)=>this.quantities[p.id]>0).map((p)=>({product:p,quantity:this.quantities[p.id],cents:Math.round(p.precio*100)*this.quantities[p.id]}));}
    count() {return this.lines().reduce(function(n,l){return n+l.quantity;},0);}
    total() {return this.lines().reduce(function(n,l){return n+l.cents;},0);}
  }
  function weekSummary(entries,now,goal) {
    const today=parseDate(dateKey(now));const monday=new Date(today);monday.setDate(today.getDate()-((today.getDay()+6)%7));
    const days=Array.from({length:7},function(_,i){const d=new Date(monday);d.setDate(monday.getDate()+i);return {date:dateKey(d),minutes:0,count:0};});
    for(const e of entries){if(!e||!parseDate(e.date)||!Number.isFinite(e.minutes)||e.minutes<=0||e.minutes>180||e.date>dateKey(today))continue;const day=days.find(function(d){return d.date===e.date;});if(day){day.minutes+=e.minutes;day.count++;}}
    const sessions=days.reduce(function(n,d){return n+d.count;},0),minutes=days.reduce(function(n,d){return n+d.minutes;},0);
    return {days:days,sessions:sessions,minutes:minutes,activeDays:days.filter(function(d){return d.count>0;}).length,percent:Math.min(100,Math.round(sessions/Math.max(1,goal)*100))};
  }
  window.DemoCore={read:read,write:write,node:node,money:money,normalize:normalize,dateKey:dateKey,parseDate:parseDate,uid:uid,Cart:Cart,weekSummary:weekSummary};
}());
