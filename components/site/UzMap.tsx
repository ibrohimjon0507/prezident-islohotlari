"use client";
import { useEffect, useRef, useState } from "react";
import { UZ_REGIONS, UZ_VIEWBOX } from "@/lib/uzmap";

/** Oʻzbekiston viloyatlari xaritasi (vektor). Tanlangan hudud ajratib koʻrsatiladi va belgi qoʻyiladi. */
export default function UzMap({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const ref = useRef<SVGSVGElement>(null);
  const [centers, setCenters] = useState<Record<string, [number, number]>>({});
  const [hover, setHover] = useState<string | null>(null);
  useEffect(() => {
    const out: Record<string, [number, number]> = {};
    ref.current?.querySelectorAll<SVGPathElement>("path[data-id]").forEach((p) => {
      const b = p.getBBox();
      out[p.dataset.id!] = [b.x + b.width / 2, b.y + b.height / 2];
    });
    setCenters(out);
  }, []);
  const active = hover ?? selected;
  const c = selected ? centers[selected] : null;
  const label = active ? UZ_REGIONS.find((r) => r.id === active)?.name : null;
  return (
    <div className="uzmap">
      <svg ref={ref} viewBox={UZ_VIEWBOX} role="img" aria-label="Oʻzbekiston xaritasi">
        <defs>
          <linearGradient id="mapfill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a9cdf5" />
            <stop offset="1" stopColor="#86b6ec" />
          </linearGradient>
          <filter id="mapshadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#2f7fd0" floodOpacity=".22" />
          </filter>
        </defs>
        <g filter="url(#mapshadow)">
          {UZ_REGIONS.map((r) => (
            <path
              key={r.id}
              data-id={r.id}
              d={r.path}
              className={r.id === selected ? "on" : r.id === hover ? "hv" : undefined}
              onMouseEnter={() => setHover(r.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect(r.id)}
            >
              <title>{r.name}</title>
            </path>
          ))}
        </g>
        {c && (
          <g className="pin" transform={`translate(${c[0]} ${c[1]})`}>
            <circle r="22" className="pulse" />
            <circle r="9" />
          </g>
        )}
      </svg>
      {label && <span className="maplabel">{label}</span>}
    </div>
  );
}
