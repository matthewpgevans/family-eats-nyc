(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,2099,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(47163);e.s(["default",0,function({restaurants:o,selectedId:i,onSelect:a,singlePin:l=!1,height:s="100%"}){let c=(0,r.useRef)(null),d=(0,r.useRef)(null),p=(0,r.useRef)(new Map);return(0,r.useEffect)(()=>{if(c.current&&!d.current)return(async()=>{let t=(await e.A(71400)).default;delete t.Icon.Default.prototype._getIconUrl,t.Icon.Default.mergeOptions({iconRetinaUrl:"/leaflet/marker-icon-2x.png",iconUrl:"/leaflet/marker-icon.png",shadowUrl:"/leaflet/marker-shadow.png"});let r=l&&o[0]?[o[0].lat,o[0].lng]:[40.73,-73.99],s=t.map(c.current,{center:r,zoom:l?15:12,zoomControl:!l,scrollWheelZoom:!l,dragging:!l});t.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{attribution:"© OpenStreetMap contributors © CARTO",subdomains:"abcd",maxZoom:19}).addTo(s),d.current=s,o.forEach((e,r)=>{var o,l,c;let d,u,f=t.divIcon({className:"",html:(o=e.score,l=r+1,d=(c=e.id===i)?"#c0392b":(0,n.scoreColor)(o),u=c?32:28,`
    <div style="
      width:${u}px;height:${u}px;
      background:${d};
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:2px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
    ">
      <span style="
        transform:rotate(45deg);
        color:white;font-weight:700;
        font-size:${u<=28?"10":"11"}px;
        font-family:Inter,sans-serif;
        line-height:1;
      ">${l}</span>
    </div>
  `),iconSize:[32,32],iconAnchor:[16,32],popupAnchor:[0,-32]}),m=t.marker([e.lat,e.lng],{icon:f}).addTo(s).bindPopup(`<div style="padding:12px 14px;min-width:180px;font-family:Inter,sans-serif">
              <div style="font-family:Sora,sans-serif;font-weight:700;font-size:14px;color:#1a1a1a;margin-bottom:4px">${e.name}</div>
              <div style="font-size:11px;color:#808080;margin-bottom:8px">${e.neighborhood.split(",")[0]} \xb7 ${e.cuisine}</div>
              <a href="/restaurant/${e.id}" style="display:inline-block;background:#c0392b;color:white;font-size:11px;font-weight:600;
                padding:5px 10px;border-radius:8px;text-decoration:none">View Details →</a>
            </div>`,{maxWidth:240,minWidth:200});m.on("click",()=>{a?.(e.id)}),p.current.set(e.id,m)})})(),()=>{d.current?.remove(),d.current=null,p.current.clear()}},[]),(0,r.useEffect)(()=>{if(!d.current||!i)return;let e=o.find(e=>e.id===i);e&&(d.current.setView([e.lat,e.lng],Math.max(d.current.getZoom(),14),{animate:!0}),p.current.get(i)?.openPopup())},[i,o]),(0,t.jsx)("div",{ref:c,style:{height:s,width:"100%",minHeight:200}})}])},19156,e=>{e.n(e.i(2099))},71400,e=>{e.v(t=>Promise.all(["static/chunks/06r9_3ub2r-4z.js"].map(t=>e.l(t))).then(()=>t(32322)))}]);