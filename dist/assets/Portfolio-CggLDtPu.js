import{R as o,j as e,L as m}from"./index-aDZq9VFJ.js";import{E as c}from"./external-link-D0OXBDDB.js";const p=({t:a})=>{const s=[...o],n=s.findIndex(r=>r.link==="https://crp.ba/");if(n>=0){const[r]=s.splice(n,1);s.splice(2,0,r)}const l=[...s,...s];return e.jsxs("section",{id:"portfolio",className:"py-16 lg:py-24 bg-black relative",children:[e.jsx("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"}),e.jsx("style",{children:`
        @keyframes clients-marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes clients-marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .clients-marquee-left {
          animation: clients-marquee-left 60s linear infinite;
          will-change: transform;
        }

        .clients-marquee-right {
          animation: clients-marquee-right 66s linear infinite;
          will-change: transform;
        }

        .clients-marquee-left:hover,
        .clients-marquee-right:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .clients-marquee-left,
          .clients-marquee-right {
            animation: none;
            transform: translateX(0);
          }
        }
      `}),e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10",children:[e.jsxs("div",{className:"flex items-center gap-6 mb-8",children:[e.jsxs("h2",{className:"text-3xl md:text-5xl font-black text-white tracking-tight font-mono text-left uppercase whitespace-nowrap",children:[e.jsx("span",{className:"techpark-accent-slash",children:"/"})," ",a.title]}),e.jsx("div",{className:"techpark-accent-line h-px flex-grow opacity-70"})]}),e.jsx("div",{className:"text-left mb-16 max-w-3xl pl-2",children:e.jsx("p",{className:"text-blue-100 text-lg font-mono",children:a.subtitle})}),e.jsxs("div",{className:"relative py-2",children:[e.jsx("div",{className:"pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent md:w-24"}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent md:w-24"}),e.jsx("div",{className:"mb-4 overflow-hidden",children:e.jsx("div",{className:"clients-marquee-left flex min-w-max gap-4 px-4 md:gap-6 md:px-6",children:l.map((r,t)=>e.jsx(i,{client:r,visualIndex:t},`client-row-a-${r.name}-${t}`))})}),e.jsx("div",{className:"overflow-hidden",children:e.jsx("div",{className:"clients-marquee-right flex min-w-max gap-4 px-4 md:gap-6 md:px-6",children:[...l].reverse().map((r,t)=>e.jsx(i,{client:r,visualIndex:t},`client-row-b-${r.name}-${t}`))})})]})]})]})},i=({client:a,visualIndex:s})=>{const l=(a.logoSurface??(s%2===0?"light":"dark"))==="dark"?"bg-[#0a1020] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)]":"bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]",r=a.logoSize==="large"?"h-16 md:h-20":"h-12 md:h-14";return e.jsxs("a",{href:a.link,target:"_blank",rel:"noreferrer noopener",className:"group min-h-[280px] w-[260px] shrink-0 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 md:w-[340px] md:p-6",children:[e.jsx("div",{className:`mb-6 w-full rounded-[1.25rem] p-4 ${l}`,children:e.jsx("div",{className:"flex min-h-[72px] w-full items-center justify-center md:min-h-[84px]",children:e.jsx(m,{src:a.logo,alt:a.name,referrerPolicy:"no-referrer",containerClassName:"mx-auto h-[84px] w-full",className:`h-full w-full object-contain ${r}`})})}),e.jsxs("div",{className:"min-w-0 space-y-4",children:[e.jsx("div",{children:e.jsx("span",{className:"inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-gray-400",children:a.industry})}),e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("h3",{className:"min-w-0 text-lg font-black tracking-tight text-white md:text-xl",children:a.name}),e.jsx("span",{className:"inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30 text-blue-300 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-500/10",children:e.jsx(c,{className:"h-4 w-4"})})]}),e.jsx("p",{className:"max-w-[18rem] font-mono text-sm leading-relaxed text-blue-100/80",children:a.description})]})]})};export{p as Portfolio};
