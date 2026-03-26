import{j as e}from"./motion-Dl2wl4s9.js";import{a as g,u as O}from"./i18n-CxwYNjRM.js";import{u as t,a as Y,g as $,t as w,l as v,s as k,S as H,b as D}from"./index-8F3aszO0.js";import"./react-DqQl8_-a.js";import"./forms-CtI6C4-1.js";const K=t.div.attrs({className:"fixed inset-0 z-[90] bg-black/65 px-4 py-8 backdrop-blur-lg"})``,W=t.div.attrs({className:"mx-auto flex h-full max-w-5xl flex-col rounded-[2rem] bg-white p-6 shadow-2xl md:p-8"})``,U=t.div.attrs({className:"flex items-center justify-between gap-4 border-b border-black/10 pb-5"})``,V=t.h3.attrs({className:"font-display text-3xl text-ink"})``,q=t.button.attrs({className:"rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black/65 transition hover:border-black/20 hover:text-black"})``,J=t.div.attrs({className:"mt-6 min-h-0 flex-1 overflow-auto"})``,Q=({open:r,title:l,onClose:n,children:m,closeLabel:c})=>(g.useEffect(()=>{if(!r)return;const d=s=>{s.key==="Escape"&&n()};return window.addEventListener("keydown",d),()=>window.removeEventListener("keydown",d)},[n,r]),r?e.jsx(K,{children:e.jsxs(W,{children:[e.jsxs(U,{children:[e.jsx(V,{children:l}),e.jsx(q,{type:"button",onClick:n,children:c})]}),e.jsx(J,{children:m})]})}):null),j="/assets/AFTER-B02K1Ymb.png",y="/assets/BEFORE-CdUw3OAf.png",o={airLashes:{mdSpan:4,lgSpan:4,card:{src:w,position:"center 28%"},before:{src:y,position:"center center"},after:{src:j,position:"center center"}},softBrows:{mdSpan:2,lgSpan:2,card:{src:y,position:"center 38%"},before:{src:y,position:"center 40%"},after:{src:w,position:"center 30%"}},glassSkin:{mdSpan:3,lgSpan:3,card:{src:k,position:"center 42%"},before:{src:v,position:"center 45%"},after:{src:k,position:"center 42%"}},lipBlush:{mdSpan:3,lgSpan:3,card:{src:j,position:"center 30%"},before:{src:v,position:"center 48%"},after:{src:j,position:"center 30%"}},bridalGlow:{mdSpan:4,lgSpan:4,card:{src:v,position:"center 42%"},before:{src:v,position:"center 46%"},after:{src:j,position:"center 34%"}},browLift:{mdSpan:2,lgSpan:2,card:{src:w,position:"center 40%"},before:{src:y,position:"center 42%"},after:{src:w,position:"center 30%"}}},X=t.section`
  position: relative;
  isolation: isolate;
  padding: 6rem 1rem;

  &::after {
    content: '';
    position: absolute;
    inset: auto -15% -12rem;
    height: 14rem;
    background: radial-gradient(circle at center, rgba(231, 200, 161, 0.12), transparent 72%);
    filter: blur(24px);
    z-index: -1;
  }

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
`,Z=t.div`
  margin: 0 auto;
  max-width: 80rem;
`,_=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
`,ee=t.button`
  border: 1px solid ${({$active:r})=>r?"rgba(17, 17, 17, 0.9)":"rgba(17, 17, 17, 0.1)"};
  border-radius: 999px;
  background: ${({$active:r})=>r?"#111111":"rgba(255, 255, 255, 0.74)"};
  color: ${({$active:r})=>r?"#ffffff":"rgba(17, 17, 17, 0.68)"};
  padding: 0.82rem 1.15rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition:
    transform 260ms ease-out,
    border-color 260ms ease-out,
    background-color 260ms ease-out,
    color 260ms ease-out,
    box-shadow 260ms ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(109, 82, 59, 0.08);
  }
`,re=t.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  }
`,te=t.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(234, 223, 209, 0.6);
  border-radius: 2.6rem;
  background:
    radial-gradient(circle at top right, rgba(241, 219, 192, 0.12), transparent 26%),
    linear-gradient(180deg, #171312 0%, #111111 100%);
  color: #fffaf3;
  padding: 1.5rem;
  box-shadow: 0 35px 90px rgba(17, 17, 17, 0.18);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`,ae=t.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`,ie=t.p`
  color: rgba(255, 246, 232, 0.56);
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`,oe=t.h3`
  margin-top: 0.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 3vw, 3.2rem);
  line-height: 0.96;
`,ne=t.span`
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.7rem 0.95rem;
  color: rgba(255, 247, 236, 0.72);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  backdrop-filter: blur(14px);
`,se=t.p`
  max-width: 42rem;
  margin-top: 1.25rem;
  color: rgba(255, 244, 232, 0.68);
  font-size: 0.92rem;
  line-height: 1.8;
`,de=t.div`
  margin-top: 2rem;
`,A=t.div`
  position: relative;
  overflow: hidden;
  height: 24rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);

  @media (max-width: 767px) {
    height: 19rem;
  }
`,le=t.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;

  ${A}:hover img {
    transform: scale(1.035);
  }
`,S=t.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`,ce=t.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({$width:r})=>`${r}%`};
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
`,C=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({$position:r})=>r??"center"};
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
`,L=t.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 7, 8, 0.62) 0%, rgba(8, 7, 8, 0.18) 24%, transparent 46%),
    linear-gradient(0deg, rgba(8, 7, 8, 0.48) 0%, rgba(8, 7, 8, 0.16) 26%, transparent 48%);
`,z=t.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(232, 196, 155, 0.12), transparent 42%, rgba(255, 255, 255, 0.08) 100%);
`,T=t.span`
  position: absolute;
  top: 1rem;
  ${({$align:r})=>r==="left"?"left: 1rem;":"right: 1rem;"}
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background: rgba(8, 7, 8, 0.32);
  padding: 0.45rem 0.72rem;
  color: rgba(255, 250, 243, 0.86);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
`,B=t.div`
  position: absolute;
  right: ${({$align:r})=>r==="right"?"1.2rem":"auto"};
  bottom: 1.2rem;
  left: ${({$align:r})=>r==="left"?"1.2rem":"auto"};
  z-index: 2;
  max-width: 12rem;
  color: #fff8ef;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 2vw, 2rem);
  line-height: 0.95;
  text-shadow: 0 10px 22px rgba(0, 0, 0, 0.38);
`,ge=t.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(${({$left:r})=>`${r}%`} - 1px);
  width: 2px;
  pointer-events: none;
`,me=t.div`
  width: 2px;
  height: 100%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 248, 232, 0.92) 46%, rgba(255, 255, 255, 0.7) 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 16px rgba(255, 249, 240, 0.18);
`,pe=t.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: rgba(255, 249, 240, 0.96);
  font-size: 0.9rem;
  font-weight: 700;
  backdrop-filter: blur(14px);
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 10px rgba(255, 244, 230, 0.06),
    0 0 32px rgba(255, 228, 196, 0.16);
`,be=t.input`
  width: 100%;
  margin-top: 1.2rem;
  appearance: none;
  height: 0.28rem;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(224, 188, 111, 1) 0%,
    rgba(224, 188, 111, 1) ${({$value:r})=>`${r}%`},
    rgba(255, 255, 255, 0.22) ${({$value:r})=>`${r}%`},
    rgba(255, 255, 255, 0.22) 100%
  );
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0.85rem;
    height: 0.85rem;
    border: none;
    border-radius: 999px;
    background: #e0bc6f;
    box-shadow: 0 0 0 6px rgba(224, 188, 111, 0.12);
    cursor: ew-resize;
  }

  &::-moz-range-thumb {
    width: 0.85rem;
    height: 0.85rem;
    border: none;
    border-radius: 999px;
    background: #e0bc6f;
    box-shadow: 0 0 0 6px rgba(224, 188, 111, 0.12);
    cursor: ew-resize;
  }
`,xe=t.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`,b=t.button`
  position: relative;
  overflow: hidden;
  min-height: 15.5rem;
  border: 1px solid rgba(229, 217, 205, 0.78);
  border-radius: 2rem;
  background: linear-gradient(180deg, rgba(255, 250, 245, 0.88), rgba(252, 244, 236, 0.74));
  box-shadow:
    0 22px 44px rgba(118, 92, 65, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.32);
  text-align: left;
  transition:
    transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 360ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 360ms ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(236, 217, 193, 0.96);
    box-shadow:
      0 28px 58px rgba(118, 92, 65, 0.13),
      0 0 0 1px rgba(255, 248, 238, 0.58),
      0 0 32px rgba(241, 219, 192, 0.16);
  }

  @media (min-width: 768px) {
    grid-column: span ${({$mdSpan:r})=>r};
  }

  @media (min-width: 1024px) {
    grid-column: span ${({$lgSpan:r})=>r};
  }
`,he=t.div`
  position: absolute;
  inset: 0;
  background-image: url(${({$image:r})=>r});
  background-repeat: no-repeat;
  background-position: ${({$position:r})=>r??"center"};
  background-size: cover;
  transform: scale(1);
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);

  ${b}:hover & {
    transform: scale(1.05);
  }
`,fe=t.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(11, 10, 9, 0.22) 0%, rgba(11, 10, 9, 0.12) 22%, rgba(11, 10, 9, 0.56) 100%),
    linear-gradient(135deg, rgba(243, 218, 192, 0.11) 0%, rgba(243, 218, 192, 0) 44%, rgba(255, 255, 255, 0.06) 100%);
  transition: background 360ms ease;

  ${b}:hover & {
    background:
      linear-gradient(180deg, rgba(11, 10, 9, 0.28) 0%, rgba(11, 10, 9, 0.16) 24%, rgba(11, 10, 9, 0.62) 100%),
      linear-gradient(135deg, rgba(243, 218, 192, 0.15) 0%, rgba(243, 218, 192, 0) 44%, rgba(255, 255, 255, 0.08) 100%);
  }
`,ue=t.div`
  position: absolute;
  inset: auto 0 0;
  height: 62%;
  background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 0.14) 28%, rgba(10, 10, 10, 0.78) 100%);
`,we=t.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(228, 194, 162, 0.08) 0%, rgba(255, 255, 255, 0) 42%, rgba(243, 215, 189, 0.08) 100%);
`,ve=t.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 15.5rem;
  padding: 1.15rem;
`,je=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`,ye=t.p`
  color: rgba(255, 248, 239, 0.66);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`,$e=t.span`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  padding: 0.46rem 0.72rem;
  color: rgba(255, 251, 246, 0.9);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
`,ke=t.div`
  transform: translateY(0);
  transition: transform 320ms ease-out;

  ${b}:hover & {
    transform: translateY(-3px);
  }
`,Se=t.h3`
  max-width: 11ch;
  color: #fff8ef;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 2.5vw, 2.45rem);
  line-height: 0.95;
  text-shadow: 0 12px 22px rgba(0, 0, 0, 0.3);
  transition: color 320ms ease-out;

  ${b}:hover & {
    color: #ffffff;
  }
`,Ce=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.95rem;
  color: rgba(255, 245, 234, 0.84);
  font-size: 0.83rem;
`,Le=t.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  }
`,ze=t.div`
  position: relative;
`,Te=t.span`
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(17, 17, 17, 0.1);
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.03);
  padding: 0.7rem 0.95rem;
  color: rgba(17, 17, 17, 0.56);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`,Be=t.p`
  margin-top: 1.5rem;
  color: rgba(17, 17, 17, 0.66);
  font-size: 1.1rem;
  line-height: 1.8;
`,Fe=t.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,F=t.div`
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 1.4rem;
  background: rgba(17, 17, 17, 0.02);
  padding: 1.25rem;
`,I=t.p`
  color: rgba(17, 17, 17, 0.45);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`,E=t.p`
  margin-top: 0.75rem;
  color: #111111;
  font-size: 1.2rem;
  font-weight: 600;
`,M=({beforeSrc:r,afterSrc:l,beforePosition:n,afterPosition:m,beforeText:c,afterText:d,compareValue:s,onCompareChange:x,rangeLabel:h})=>e.jsxs(de,{children:[e.jsx(A,{children:e.jsxs(le,{children:[e.jsxs(S,{children:[e.jsx(C,{src:r,alt:c,$position:n,loading:"eager"}),e.jsx(L,{}),e.jsx(z,{}),e.jsx(T,{$align:"left",children:"Before"}),e.jsx(B,{$align:"left",children:c})]}),e.jsx(ce,{$width:s,children:e.jsxs(S,{children:[e.jsx(C,{src:l,alt:d,$position:m,loading:"eager"}),e.jsx(L,{}),e.jsx(z,{}),e.jsx(T,{$align:"right",children:"After"}),e.jsx(B,{$align:"right",children:d})]})}),e.jsxs(ge,{$left:s,children:[e.jsx(me,{}),e.jsx(pe,{children:"⇆"})]})]})}),e.jsx(be,{type:"range",min:15,max:85,value:s,onChange:p=>x(Number(p.target.value)),"aria-label":h,$value:s})]}),Re=()=>{const{t:r}=O(),l=g.useRef(null),[n,m]=g.useState("all"),[c,d]=g.useState(null),[s,x]=g.useState(54);Y(l);const h=g.useMemo(()=>$.filter(a=>n==="all"||a.category===n),[n]),p=h[0]??$[0],i=$.find(a=>a.id===c)??null,f=o[p.id]??o.airLashes,P=f.before.src,R=f.after.src;return e.jsxs(X,{id:"results",ref:l,children:[e.jsxs(Z,{children:[e.jsx(H,{eyebrow:r("gallery.eyebrow"),title:r("gallery.title"),description:r("gallery.description")}),e.jsx(_,{children:D.map(a=>e.jsx(ee,{type:"button",onClick:()=>m(a),$active:n===a,children:r(`gallery.filters.${a}`)},a))}),e.jsxs(re,{children:[e.jsxs(te,{"data-reveal":"blur",children:[e.jsxs(ae,{children:[e.jsxs("div",{children:[e.jsx(ie,{children:r("gallery.comparisonTitle")}),e.jsx(oe,{children:r(`gallery.items.${p.id}.title`)})]}),e.jsx(ne,{children:r(`gallery.items.${p.id}.tag`)})]}),e.jsx(se,{children:r("gallery.comparisonDescription")}),e.jsx(M,{beforeSrc:P,afterSrc:R,beforePosition:f.before.position,afterPosition:f.after.position,beforeText:"Before",afterText:"After",compareValue:s,onCompareChange:x,rangeLabel:r("gallery.dragLabel")})]}),e.jsx(xe,{children:h.map((a,G)=>{const u=o[a.id]??o.airLashes,N=u.card.src;return e.jsxs(b,{type:"button",onClick:()=>d(a.id),$mdSpan:u.mdSpan,$lgSpan:u.lgSpan,"data-reveal":G%2===0?"fade-up":"scale-in",children:[e.jsx(he,{$image:N,$position:u.card.position}),e.jsx(fe,{}),e.jsx(ue,{}),e.jsx(we,{}),e.jsxs(ve,{children:[e.jsxs(je,{children:[e.jsx(ye,{children:r(`gallery.items.${a.id}.treatment`)}),e.jsx($e,{children:r(`gallery.items.${a.id}.tag`)})]}),e.jsxs(ke,{children:[e.jsx(Se,{children:r(`gallery.items.${a.id}.title`)}),e.jsxs(Ce,{children:[e.jsx("span",{children:r(`gallery.items.${a.id}.duration`)}),e.jsx("span",{children:r(`gallery.items.${a.id}.price`)})]})]})]})]},a.id)})})]})]}),e.jsx(Q,{open:!!i,onClose:()=>d(null),title:i?r(`gallery.items.${i.id}.title`):"",closeLabel:r("common.close"),children:i?e.jsxs(Le,{children:[e.jsx(ze,{children:e.jsx(M,{beforeSrc:(o[i.id]??o.airLashes).before.src,afterSrc:(o[i.id]??o.airLashes).after.src,beforePosition:(o[i.id]??o.airLashes).before.position,afterPosition:(o[i.id]??o.airLashes).after.position,beforeText:"Before",afterText:"After",compareValue:s,onCompareChange:x,rangeLabel:r("gallery.dragLabel")})}),e.jsxs("div",{children:[e.jsx(Te,{children:r(`gallery.items.${i.id}.tag`)}),e.jsx(Be,{children:r(`gallery.items.${i.id}.note`)}),e.jsxs(Fe,{children:[e.jsxs(F,{children:[e.jsx(I,{children:r(`gallery.items.${i.id}.treatment`)}),e.jsx(E,{children:r(`gallery.items.${i.id}.duration`)})]}),e.jsxs(F,{children:[e.jsx(I,{children:"Price"}),e.jsx(E,{children:r(`gallery.items.${i.id}.price`)})]})]})]})]}):null})]})};export{Re as default};
