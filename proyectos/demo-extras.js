/* Funciones propias para precios, calendario y temporizador. */
(function(){
  "use strict";
  const C=window.DemoCore;
  function totals(subtotal,rate,delivery){
    const sub=Number.isSafeInteger(subtotal)&&subtotal>=0?subtotal:0;
    const r=Number.isFinite(rate)?Math.min(1,Math.max(0,rate)):0;
    const fee=Number.isSafeInteger(delivery)&&delivery>=0&&sub?delivery:0;
    const discount=Math.round(sub*r);return {subtotal:sub,discount:discount,delivery:fee,total:sub-discount+fee};
  }
  function intervalState(work,rest,rounds,elapsed){
    const w=Math.max(1,Math.trunc(work)||1),r=Math.max(0,Math.trunc(rest)||0),n=Math.max(1,Math.trunc(rounds)||1);
    const seconds=Math.max(0,Math.floor(elapsed/1000)),total=w*n+r*(n-1);
    if(seconds>=total)return {done:true,phase:"Completado",round:n,left:0,total:total};
    const round=Math.min(n,Math.floor(seconds/(w+r))+1),offset=seconds-(round-1)*(w+r);
    return {done:false,phase:offset<w?"Actividad":"Descanso",round:round,left:offset<w?w-offset:w+r-offset,total:total};
  }
  function monthGrid(date){
    const first=new Date(date.getFullYear(),date.getMonth(),1),start=new Date(first);
    start.setDate(1-((first.getDay()+6)%7));const last=new Date(date.getFullYear(),date.getMonth()+1,0);
    const length=Math.ceil((((first.getDay()+6)%7)+last.getDate())/7)*7;
    return Array.from({length:length},function(_,i){const d=new Date(start);d.setDate(start.getDate()+i);return {date:C.dateKey(d),day:d.getDate(),current:d.getMonth()===date.getMonth()};});
  }
  function streak(entries,now){
    const dates=new Set(entries.filter(function(e){return e&&C.parseDate(e.date)&&e.date<=C.dateKey(now);}).map(function(e){return e.date;}));
    const d=C.parseDate(C.dateKey(now));if(!dates.has(C.dateKey(d)))d.setDate(d.getDate()-1);let count=0;
    while(dates.has(C.dateKey(d))){count++;d.setDate(d.getDate()-1);}return count;
  }
  function image(src,alt,cls){
    // Sin foto se muestra texto sobre el fondo de la tarjeta, sin dibujos.
    const fallback=()=>C.node("span","image-fallback","Imagen no disponible");
    if(typeof src!=="string"||!src.trim())return fallback();
    const i=C.node("img",cls||"photo");i.alt=alt;i.width=1536;i.height=1024;i.loading="lazy";i.decoding="async";
    i.addEventListener("error",function(){i.hidden=true;const holder=i.parentElement||i.parent;if(holder)holder.append(fallback());},{once:true});i.src=src;return i;
  }
  function notify(message){const box=document.getElementById("toast");if(!box)return;box.textContent=message;box.hidden=false;clearTimeout(notify.timer);notify.timer=setTimeout(function(){box.hidden=true;},4500);}
  function bindDialog(id,closeId){const d=document.getElementById(id);let opener=null;
    document.getElementById(closeId).addEventListener("click",function(){d.close();});
    d.addEventListener("close",function(){const target=opener&&opener.isConnected!==false&&!opener.disabled?opener:document.getElementById("search");if(target)target.focus();});
    return {element:d,open:function(trigger){opener=trigger||document.activeElement;d.showModal();},close:function(){d.close();}};
  }
  function brand(config){document.title=config.nombre+" · Demo de Rubén Santa Cruz";const logo=document.getElementById("brand-logo");logo.src=config.logo;logo.alt="Logo de "+config.nombre;logo.onerror=function(){this.hidden=true;};document.getElementById("brand-name").textContent=config.nombre;
    const cover=document.getElementById("cover-image");if(cover){
      cover.hidden=!config.portada;
      cover.addEventListener("error",function(){this.hidden=true;},{once:true});
      if(config.portada){cover.src=config.portada;cover.alt=config.portadaAlt||config.nombre;}
      else cover.removeAttribute("src");
    }
    if(config.colores)Object.keys(config.colores).forEach(function(k){if(/^#[a-f0-9]{6}$/i.test(config.colores[k]))document.documentElement.style.setProperty("--"+k,config.colores[k]);});
    // El teléfono se cambia únicamente en CONFIG.whatsapp de cada proyecto.
    const contact=document.getElementById("whatsapp-contact"),phone=String(config.whatsapp||"").replace(/\D/g,"");
    if(contact){
      contact.hidden=!/^\d{8,15}$/.test(phone);
      if(!contact.hidden){
        const visible=/^51\d{9}$/.test(phone)?"+51 "+phone.slice(2,5)+" "+phone.slice(5,8)+" "+phone.slice(8):"+"+phone;
        contact.href="https://wa.me/"+phone+"?text="+encodeURIComponent("Hola, quiero información sobre "+config.nombre+".");
        contact.textContent="WhatsApp · "+visible;contact.target="_blank";contact.rel="noopener noreferrer";
      }else contact.removeAttribute("href");
    }
  }
  window.DemoExtras={totals:totals,intervalState:intervalState,monthGrid:monthGrid,streak:streak,image:image,notify:notify,bindDialog:bindDialog,brand:brand};
}());
