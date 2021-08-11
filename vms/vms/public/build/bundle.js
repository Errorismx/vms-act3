var app=function(){"use strict";function e(){}function t(e){return e()}function o(){return Object.create(null)}function i(e){e.forEach(t)}function n(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let a,m;function s(e,t){return a||(a=document.createElement("a")),a.href=t,e===a.href}function l(e,t){e.appendChild(t)}function c(e,t,o){e.insertBefore(t,o||null)}function p(e){e.parentNode.removeChild(e)}function d(e){return document.createElement(e)}function g(e){return document.createTextNode(e)}function y(){return g(" ")}function u(e,t,o,i){return e.addEventListener(t,o,i),()=>e.removeEventListener(t,o,i)}function x(e,t,o){null==o?e.removeAttribute(t):e.getAttribute(t)!==o&&e.setAttribute(t,o)}function f(e){m=e}function v(e){(function(){if(!m)throw new Error("Function called outside component initialization");return m})().$$.on_mount.push(e)}const h=[],T=[],H=[],N=[],b=Promise.resolve();let w=!1;function $(e){H.push(e)}function _(e){N.push(e)}let K=!1;const q=new Set;function L(){if(!K){K=!0;do{for(let e=0;e<h.length;e+=1){const t=h[e];f(t),F(t.$$)}for(f(null),h.length=0;T.length;)T.pop()();for(let e=0;e<H.length;e+=1){const t=H[e];q.has(t)||(q.add(t),t())}H.length=0}while(h.length);for(;N.length;)N.pop()();w=!1,K=!1,q.clear()}}function F(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach($)}}const E=new Set;let A;function k(e,t){e&&e.i&&(E.delete(e),e.i(t))}function j(e,t,o,i){if(e&&e.o){if(E.has(e))return;E.add(e),A.c.push((()=>{E.delete(e),i&&(o&&e.d(1),i())})),e.o(t)}}function C(e,t,o){const i=e.$$.props[t];void 0!==i&&(e.$$.bound[i]=o,o(e.$$.ctx[i]))}function M(e){e&&e.c()}function B(e,o,r,a){const{fragment:m,on_mount:s,on_destroy:l,after_update:c}=e.$$;m&&m.m(o,r),a||$((()=>{const o=s.map(t).filter(n);l?l.push(...o):i(o),e.$$.on_mount=[]})),c.forEach($)}function O(e,t){const o=e.$$;null!==o.fragment&&(i(o.on_destroy),o.fragment&&o.fragment.d(t),o.on_destroy=o.fragment=null,o.ctx=[])}function P(e,t){-1===e.$$.dirty[0]&&(h.push(e),w||(w=!0,b.then(L)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function S(t,n,r,a,s,l,c,d=[-1]){const g=m;f(t);const y=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:s,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(g?g.$$.context:n.context||[]),callbacks:o(),dirty:d,skip_bound:!1,root:n.target||g.$$.root};c&&c(y.root);let u=!1;if(y.ctx=r?r(t,n.props||{},((e,o,...i)=>{const n=i.length?i[0]:o;return y.ctx&&s(y.ctx[e],y.ctx[e]=n)&&(!y.skip_bound&&y.bound[e]&&y.bound[e](n),u&&P(t,e)),o})):[],y.update(),u=!0,i(y.before_update),y.fragment=!!a&&a(y.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);y.fragment&&y.fragment.l(e),e.forEach(p)}else y.fragment&&y.fragment.c();n.intro&&k(t.$$.fragment),B(t,n.target,n.anchor,n.customElement),L()}f(g)}class V{$destroy(){O(this,1),this.$destroy=e}$on(e,t){const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(t),()=>{const e=o.indexOf(t);-1!==e&&o.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}class R extends V{constructor(e){super(),S(this,e,null,null,r,{})}}function z(t){let o,i,n,r,a,m,g,f,v,h,T,H,N,b,w,$,_,K,q,L,F,E;return{c(){o=d("main"),i=d("div"),n=d("div"),r=y(),a=d("nav"),a.innerHTML='<div class="px-2 mx-auto sm:px-6 lg:px-24"><div class="flex items-center justify-end h-16"></div></div>',m=y(),g=d("div"),f=d("img"),h=y(),T=d("div"),T.innerHTML='<h1 class="text-4xl text-white pt-[30px]">Lorem ipsum dolor sit amet, consectetur adipiscing</h1> \n                <h3 class="text-xl text-white pt-[10px]">Lorem ipsum dolor sit amet, consectetur adipiscing</h3>',H=y(),N=d("div"),b=d("button"),b.textContent="GO TO SHOP",w=y(),$=d("button"),$.textContent="Contract",_=y(),K=d("div"),K.innerHTML='<div class="container w-[100%] h-[100%] mx-auto "><div class="flex flex-col items-center justify-center text-white align-middle"><h1 class="pt-[100px] Kanitfont text-[36px] svelte-yv3ov4">Our Product</h1> \n                 <h4 class="Kanitfont text-[18px] svelte-yv3ov4">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4> \n                 <div class="flex ageimgbox pt-[60px] gap-4"><div class="age1 w-[272px] h-[341px] "><img src="../img/24month.png" class="w-[272px] h-[272px]" alt=""/> \n                         <div class="Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center svelte-yv3ov4">birth to 24 months</div></div> \n                     <div class="age2 w-[272px] h-[341px] "><img src="../img/2_4year.png" class="w-[272px] h-[272px]" alt=""/> \n                        <div class="Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center svelte-yv3ov4">2 to 4 years</div></div> \n                    <div class="age3 w-[272px] h-[341px] "><img src="../img/5_7year.png" class="w-[272px] h-[272px]" alt=""/> \n                        <div class="Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center svelte-yv3ov4">5 to 7 years</div></div> \n                    <div class="age4 w-[272px] h-[341px] "><img src="../img/8_13year.png" class="w-[272px] h-[272px]" alt=""/> \n                        <div class="Kanitfont label w-full bg-[#240F0434] h-[69px] flex items-center justify-center svelte-yv3ov4">8 to 13 years &amp; up</div></div></div> \n\n                 <h1 class="pt-[103px] Kanitfont text-[36px] svelte-yv3ov4">Our Service</h1> \n                 <h4 class="Kanitfont text-[18px] svelte-yv3ov4">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4> \n\n                 <div class="servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center"><img class="ml-[169px] w-[144px] h-[144px]" src="../img/icons8_shipped_100px_2.png" alt=""/> \n                     <div class="pl-[61px] serinfo"><h1 class="Kanitfont text-white text-[48px] svelte-yv3ov4">Free Shipping</h1> \n                         <h4 class="Kanitfont text-[18px] w-[780px] svelte-yv3ov4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae,</h4></div></div> \n                    \n                    <div class="servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center"><img class="ml-[169px] w-[144px] h-[144px]" src="../img/icons8_data_arrived_filled_100px.png" alt=""/> \n                    <div class="pl-[61px] serinfo"><h1 class="Kanitfont text-white text-[48px] svelte-yv3ov4">High Quality</h1> \n                        <h4 class="Kanitfont text-[18px] w-[780px] svelte-yv3ov4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae,</h4></div></div> \n\n                   \n                <div class="servicebg w-[1268px] h-[245px] bg-[#483A39] rounded-full mt-[64px] flex items-center"><img class="ml-[169px] w-[144px] h-[144px]" src="../img/icons8_get_cash_filled_100px.png" alt=""/> \n                    <div class="pl-[61px] serinfo"><h1 class="Kanitfont text-white text-[48px] svelte-yv3ov4">Refundable</h1> \n                        <h4 class="Kanitfont text-[18px] w-[780px] svelte-yv3ov4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae,</h4></div></div></div></div>',q=y(),L=d("div"),L.innerHTML='<div class="f1 w-[757px] ml-[180px] mt-[37px]"><img src="../img/FirstToy_minicon.png" alt=""/> \n             <h4 class="Kanitfont text-[24px] w-[780px] mt-[20px] svelte-yv3ov4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dolor metus, scelerisque quis libero vitae, dignissim gravida risus. Maecenas facilisis, dolor fringilla sagittis commodo,</h4></div> \n         <div class="f2 w-[372px] mt-[37px] ml-[159px]"><h1 class="Kanitfont text-[36px] svelte-yv3ov4">Place</h1> \n            <h4 class="Kanitfont text-[24px] w-[394px] mt-[10px] svelte-yv3ov4">celerisque quis libero vitae, dignissim gravida risus. Maecenas commodo,</h4></div> \n         <div class="f3 w-[130px] mt-[137px] ml-[162px]"><h1 class="Kanitfont text-[24px] svelte-yv3ov4">Contract Us</h1> \n            <div class="flex items-center justify-center socialimg"><img src="../img/icons8_instagram_new_100px.png" class="w-[59px] h-[59px]" alt=""/> \n                <img src="../img/icons8_facebook_100px.png" class="w-[59px] h-[59px]" alt=""/></div></div>',x(n,"class","sidefade w-[80vw] h-[100vh] bg-gradient-to-r from-[#514647] to-transparent absolute z-0"),x(a,"class","bg-[#240F0440] absolute w-full"),s(f.src,v="../img/FirstToy.png")||x(f,"src","../img/FirstToy.png"),x(f,"alt",""),x(T,"class","info"),x(b,"class","rounded-full\t w-[379px] h-[65px] bg-[#F5B41A60] text-white Kanitfont text-[20px] focus:outline-none hover:bg-[#F5B41A90] svelte-yv3ov4"),x($,"class","ml-[32px] rounded-full\t w-[379px] h-[65px] bg-[#240F0460] text-white Kanitfont text-[20px] hover:bg-[#240F0490] svelte-yv3ov4"),x(N,"class","flex actionbutton mt-[50px]"),x(g,"class","z-10 px-[301px] pt-[240px] absolute "),x(i,"class","bg-baby h-[100vh] relative  svelte-yv3ov4"),x(K,"class","info  h-[2000px] bg-[#514647] "),x(L,"class","footer w-full h-[301px] bg-[#C4C4C4] flex")},m(e,s){c(e,o,s),l(o,i),l(i,n),l(i,r),l(i,a),l(i,m),l(i,g),l(g,f),l(g,h),l(g,T),l(g,H),l(g,N),l(N,b),l(N,w),l(N,$),l(o,_),l(o,K),l(o,q),l(o,L),F||(E=u(b,"click",t[1]),F=!0)},p:e,i:e,o:e,d(e){e&&p(o),F=!1,E()}}}function I(e,t,o){let{pages:i}=t;return e.$$set=e=>{"pages"in e&&o(0,i=e.pages)},[i,()=>{o(0,i="shop")}]}class G extends V{constructor(e){super(),S(this,e,I,z,r,{pages:0})}}function U(e,t,o){const i=e.slice();return i[3]=t[o],i[5]=o,i}function D(t){let o,i,n,r,a,m,s,u,f,v,h,T,H,N,b,w=t[3].name+"",$=1.3*t[3].price+"",_=t[3].price+"";return{c(){o=d("div"),i=d("div"),i.innerHTML='<img src="https://via.placeholder.com/248" alt=""/>',n=y(),r=d("div"),a=d("h1"),m=g(w),s=y(),u=d("h1"),f=g($),v=g(" THB"),h=y(),T=d("h1"),H=g(_),N=g(" THB"),b=y(),x(i,"class","imgholder h-[248px] border border-[#240F04]"),x(a,"class","mt-[2px]"),x(u,"class","mt-[2px] line-through text-xs text-[#98817C]"),x(T,"class","text-[#3E5A8F] flex text-center justify-center "),x(r,"class","imgholder h-[83px] text-black Kanitfont justify-center text-center svelte-1rmqm85"),x(o,"class","box w-[248px] h-[331px] ")},m(e,t){c(e,o,t),l(o,i),l(o,n),l(o,r),l(r,a),l(a,m),l(r,s),l(r,u),l(u,f),l(u,v),l(r,h),l(r,T),l(T,H),l(T,N),l(o,b)},p:e,d(e){e&&p(o)}}}function Q(t){let o,i,n,r,a,m,g,f,v,h,T,H,N,b,w,$,_,K,q,L,F,E,A,k,j=t[1],C=[];for(let e=0;e<j.length;e+=1)C[e]=D(U(t,j,e));return{c(){o=d("main"),i=d("nav"),n=d("div"),r=d("div"),r.innerHTML='<div class="credit"><img src="../img/credit.png" alt=""/></div> \n                <div class="absolute right-0 flex actionside "><div class="text-[11px] text-white Kanitfont svelte-1rmqm85"><span class="flex">Change Language<img src="../img/icons8_chevron_down_10px.png" alt="" class="w-[10px] h-[10px] mt-[3px] ml-[1px]"/></span></div> \n                    <div class="pl-[21px] text-[11px] text-white Kanitfont svelte-1rmqm85"><span class="flex">Login<img src="../img/icons8_chevron_down_10px.png" alt="" class="w-[10px] h-[10px] mt-[3px] ml-[1px]"/></span></div></div>',a=y(),m=d("div"),g=y(),f=d("div"),v=d("img"),T=y(),H=d("div"),H.innerHTML='<button class="text-white hover:opacity-60 Kanitfont focus:outline-none svelte-1rmqm85">SALES</button> \n                    <button class="text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px] svelte-1rmqm85">NEW ARRIVE</button> \n                    <button class="text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px] svelte-1rmqm85">AGE</button> \n                    <button class="text-white hover:opacity-60 Kanitfont focus:outline-none ml-[36px] svelte-1rmqm85">BRAND</button> \n                    <div class="absolute right-0 flex imgaction"><button class="hover:opacity-60"><img src="../img/icons8_search_filled_64px.png" alt=""/></button> \n                        <button class="ml-[20px] hover:opacity-60"><img src="../img/icons8_shopping_bag_filled_100px.png" alt=""/></button></div>',N=y(),b=d("div"),w=d("h1"),w.textContent="HOME - PUPPET",$=y(),_=d("img"),q=y(),L=d("div"),L.innerHTML='<div class="count Kanitfont text-[12px] svelte-1rmqm85">1-95 of 95 items</div> \n            <div class="ml-[40px] count Kanitfont text-[12px] border border-black w-[210px] h-full flex items-center relative svelte-1rmqm85"><p class="pl-[10px]">New Arrive</p>   <img class="absolute right-0 mr-[5px]" src="../img/icons8_chevron_down_64pxblack.png" alt=""/></div>',F=y(),E=d("div");for(let e=0;e<C.length;e+=1)C[e].c();x(r,"class","container mx-auto h-[31px] flex items-center relative"),x(m,"class","whiteline w-full h-[2px] bg-white"),s(v.src,h="../img/FirstToyproductIcon.png")||x(v,"src","../img/FirstToyproductIcon.png"),x(v,"class","hover:opacity-60"),x(v,"alt",""),x(H,"class","bar w-[340px] ml-[46px] flex"),x(f,"class","container relative flex items-center mx-auto h-[67px]"),x(n,"class","h-[100px] w-full"),x(i,"class","bg-[#514647]"),x(w,"class","text-[#5B5B5B] Kanitfont text-[12px] mt-[20px] svelte-1rmqm85"),x(_,"class","mt-[23px] w-full h-[312px]"),s(_.src,K="../img/imagepromotion.png")||x(_,"src","../img/imagepromotion.png"),x(_,"alt",""),x(L,"class","itemfilter flex items-center w-[336px] h-[31px] absolute right-0 mt-[16px]"),x(E,"class","mt-[75px] w-[100%] h-full justify-start grid grid-cols-6\t"),x(b,"class","container relative mx-auto")},m(e,s){c(e,o,s),l(o,i),l(i,n),l(n,r),l(n,a),l(n,m),l(n,g),l(n,f),l(f,v),l(f,T),l(f,H),l(o,N),l(o,b),l(b,w),l(b,$),l(b,_),l(b,q),l(b,L),l(b,F),l(b,E);for(let e=0;e<C.length;e+=1)C[e].m(E,null);A||(k=u(v,"click",t[2]),A=!0)},p(e,[t]){if(2&t){let o;for(j=e[1],o=0;o<j.length;o+=1){const i=U(e,j,o);C[o]?C[o].p(i,t):(C[o]=D(i),C[o].c(),C[o].m(E,null))}for(;o<C.length;o+=1)C[o].d(1);C.length=j.length}},i:e,o:e,d(e){e&&p(o),function(e,t){for(let o=0;o<e.length;o+=1)e[o]&&e[o].d(t)}(C,e),A=!1,k()}}}function W(e,t,o){let{pages:i}=t;return e.$$set=e=>{"pages"in e&&o(0,i=e.pages)},[i,[{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1300},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:690},{name:"Toy Name Holder",img:"toy1",price:1e3},{name:"Toy Name Holder",img:"toy1",price:690}],()=>{o(0,i="home")}]}class J extends V{constructor(e){super(),S(this,e,W,Q,r,{pages:0})}}function X(e){let t,o,i;function n(t){e[2](t)}let r={};return void 0!==e[0]&&(r.pages=e[0]),t=new J({props:r}),T.push((()=>C(t,"pages",n))),{c(){M(t.$$.fragment)},m(e,o){B(t,e,o),i=!0},p(e,i){const n={};!o&&1&i&&(o=!0,n.pages=e[0],_((()=>o=!1))),t.$set(n)},i(e){i||(k(t.$$.fragment,e),i=!0)},o(e){j(t.$$.fragment,e),i=!1},d(e){O(t,e)}}}function Y(e){let t,o,i;function n(t){e[1](t)}let r={};return void 0!==e[0]&&(r.pages=e[0]),t=new G({props:r}),T.push((()=>C(t,"pages",n))),{c(){M(t.$$.fragment)},m(e,o){B(t,e,o),i=!0},p(e,i){const n={};!o&&1&i&&(o=!0,n.pages=e[0],_((()=>o=!1))),t.$set(n)},i(e){i||(k(t.$$.fragment,e),i=!0)},o(e){j(t.$$.fragment,e),i=!1},d(e){O(t,e)}}}function Z(e){let t,o,n,r,a,m;t=new R({});const s=[Y,X],l=[];function g(e,t){return"home"==e[0]?0:1}return r=g(e),a=l[r]=s[r](e),{c(){M(t.$$.fragment),o=y(),n=d("main"),a.c()},m(e,i){B(t,e,i),c(e,o,i),c(e,n,i),l[r].m(n,null),m=!0},p(e,[t]){let o=r;r=g(e),r===o?l[r].p(e,t):(A={r:0,c:[],p:A},j(l[o],1,1,(()=>{l[o]=null})),A.r||i(A.c),A=A.p,a=l[r],a?a.p(e,t):(a=l[r]=s[r](e),a.c()),k(a,1),a.m(n,null))},i(e){m||(k(t.$$.fragment,e),k(a),m=!0)},o(e){j(t.$$.fragment,e),j(a),m=!1},d(e){O(t,e),e&&p(o),e&&p(n),l[r].d()}}}function ee(e,t,o){let i="home";return v((()=>{})),[i,function(e){i=e,o(0,i)},function(e){i=e,o(0,i)}]}return new class extends V{constructor(e){super(),S(this,e,ee,Z,r,{})}}({target:document.body})}();