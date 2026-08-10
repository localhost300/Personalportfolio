"use client";

import { useId, useMemo, useState } from "react";

const points = [
  { year: "2015", mary: 100, balanced: 100, sp500: 100 },
  { year: "2016", mary: 109, balanced: 107, sp500: 112 },
  { year: "2017", mary: 124, balanced: 118, sp500: 136 },
  { year: "2018", mary: 121, balanced: 115, sp500: 130 },
  { year: "2019", mary: 143, balanced: 133, sp500: 171 },
  { year: "2020", mary: 157, balanced: 147, sp500: 202 },
  { year: "2021", mary: 181, balanced: 164, sp500: 260 },
  { year: "2022", mary: 169, balanced: 139, sp500: 213 },
  { year: "2023", mary: 197, balanced: 158, sp500: 269 },
  { year: "2024", mary: 224, balanced: 176, sp500: 331 },
  { year: "2025", mary: 241, balanced: 185, sp500: 348 },
  { year: "2026", mary: 253, balanced: 192, sp500: 359 },
];

const series = [
  { key: "mary", label: "Mary’s Strategy", color: "#d7b541" },
  { key: "balanced", label: "60/40 Benchmark", color: "#7f9cc6" },
  { key: "sp500", label: "S&P 500", color: "#d6dbe4" },
] as const;

const width = 960;
const height = 330;
const left = 54;
const right = 24;
const top = 24;
const bottom = 46;
const minValue = 90;
const maxValue = 380;

export default function InteractiveChart() {
  const gradientId = useId().replaceAll(":", "");
  const [activeIndex, setActiveIndex] = useState(points.length - 1);
  const coordinates = useMemo(() => points.map((point, index) => ({
    ...point,
    x: left + (index / (points.length - 1)) * (width - left - right),
    y: (value: number) => top + ((maxValue - value) / (maxValue - minValue)) * (height - top - bottom),
  })), []);
  const active = coordinates[activeIndex];
  const pathFor = (key: typeof series[number]["key"]) => coordinates.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y(point[key])}`).join(" ");
  const maryPath = pathFor("mary");
  const area = `${maryPath} L${coordinates.at(-1)?.x} ${height - bottom} L${coordinates[0].x} ${height - bottom} Z`;

  const updateFromPointer = (clientX: number, currentTarget: SVGSVGElement) => {
    const bounds = currentTarget.getBoundingClientRect();
    const relative = ((clientX - bounds.left) / bounds.width) * width;
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    coordinates.forEach((point, index) => {
      const candidate = Math.abs(point.x - relative);
      if (candidate < distance) { distance = candidate; nearest = index; }
    });
    setActiveIndex(nearest);
  };

  return (
    <div className="border-panel overflow-hidden">
      <header className="border-b border-gold/20 px-5 py-5 sm:px-8">
        <p className="text-[10px] font-medium uppercase tracking-[.2em] text-gold">Performance comparison</p>
        <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">Mary’s Balanced Strategy vs. S&amp;P 500</h3>
        <p className="mt-1 text-xs leading-5 text-mist">2015 to 2026, indexed to 100 at the starting year</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {series.map((item) => <div key={item.key} className="flex items-center gap-2 text-[10px] uppercase tracking-[.12em] text-mist"><span className="h-0.5 w-7" style={{ backgroundColor: item.color }}/>{item.label}</div>)}
        </div>
      </header>
      <div className="grid lg:grid-cols-[1fr_270px]">
        <div className="min-w-0 p-5 sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-4"><p className="text-[10px] uppercase tracking-[.16em] text-mist">Hover, tap, or use arrow keys</p><p className="font-display text-2xl text-gold">{active.year}</p></div>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full touch-none overflow-visible"
            role="img"
            aria-label={`Interactive comparison chart for ${active.year}. Mary’s Strategy ${active.mary}, 60/40 Benchmark ${active.balanced}, S and P 500 ${active.sp500}.`}
            tabIndex={0}
            onPointerMove={(event) => updateFromPointer(event.clientX, event.currentTarget)}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") setActiveIndex((value) => Math.max(0, value - 1));
              if (event.key === "ArrowRight") setActiveIndex((value) => Math.min(points.length - 1, value + 1));
            }}
          >
            <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d7b541" stopOpacity=".17"/><stop offset="1" stopColor="#d7b541" stopOpacity="0"/></linearGradient></defs>
            {[100, 190, 280, 370].map((value) => {
              const y = coordinates[0].y(value);
              return <g key={value}><line x1={left} x2={width-right} y1={y} y2={y} stroke="rgba(127,156,198,.16)"/><text x={left-12} y={y+4} textAnchor="end" fill="#7f9cc6" fontSize="10">{value}</text></g>;
            })}
            <path d={area} fill={`url(#${gradientId})`}/>
            {series.map((item) => <path key={item.key} d={pathFor(item.key)} fill="none" stroke={item.color} strokeWidth={item.key === "mary" ? 3 : 2} strokeDasharray={item.key === "balanced" ? "7 5" : undefined}/>) }
            <line x1={active.x} x2={active.x} y1={top} y2={height-bottom} stroke="#d7b541" strokeDasharray="4 5" opacity=".55"/>
            {coordinates.map((point, index) => <g key={point.year} onClick={() => setActiveIndex(index)} className="cursor-pointer"><circle cx={point.x} cy={point.y(point.mary)} r={index === activeIndex ? 6 : 3} fill="#d7b541" stroke="#0a1a31" strokeWidth="2"/><text x={point.x} y={height-17} textAnchor="middle" fill={index === activeIndex ? "#f5f1e8" : "#7f9cc6"} fontSize="11">{point.year}</text></g>)}
          </svg>
        </div>
        <aside className="border-t border-gold/20 bg-deep/60 p-6 lg:border-l lg:border-t-0">
          <p className="text-[9px] font-medium uppercase tracking-[.18em] text-gold">Selected year</p>
          <p className="mt-2 font-display text-4xl text-ivory">{active.year}</p>
          <div className="mt-6 space-y-4 border-t border-gold/20 pt-5">
            {series.map((item) => <div key={item.key} className="flex items-end justify-between gap-4"><div><span className="mb-2 block h-0.5 w-7" style={{backgroundColor:item.color}}/><p className="text-[9px] uppercase tracking-[.12em] text-mist">{item.label}</p></div><p className="font-display text-2xl" style={{color:item.color}}>{active[item.key]}</p></div>)}
          </div>
          <p className="mt-6 border-t border-gold/20 pt-5 text-xs leading-5 text-mist">Each series begins at 100, making relative growth and periods of decline easier to compare across the same timeline.</p>
        </aside>
      </div>
      <p className="border-t border-gold/20 px-5 py-4 text-[10px] leading-5 text-mist sm:px-8">Indexed comparison, 2015 to 2026. Move across the chart to compare all three strategies year by year.</p>
    </div>
  );
}
