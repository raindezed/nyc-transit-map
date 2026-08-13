'use client';

import { useMemo, useState } from 'react';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import { lines, stations, type Station } from '@/data/transit';

const allLineIds = lines.map((line) => line.id);

function Recenter({ station }: { station: Station | null }) {
  const map = useMap();
  if (station) {
    map.flyTo([station.lat, station.lng], 14, { duration: 0.8 });
  }
  return null;
}

function LinePill({ id, compact = false }: { id: string; compact?: boolean }) {
  const line = lines.find((item) => item.id === id)!;
  return (
    <span
      className={compact ? 'line-pill compact' : 'line-pill'}
      style={{ background: line.color, color: line.textColor ?? '#fff' }}
    >
      {line.name}
    </span>
  );
}

export default function TransitMap() {
  const [activeLines, setActiveLines] = useState<string[]>(allLineIds);
  const [selected, setSelected] = useState<Station | null>(stations[0]);
  const [search, setSearch] = useState('');

  const visibleStations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return stations.filter((station) => {
      const matchesLine = station.lines.some((line) => activeLines.includes(line));
      const matchesSearch = !query || station.name.toLowerCase().includes(query) || station.borough.toLowerCase().includes(query);
      return matchesLine && matchesSearch;
    });
  }, [activeLines, search]);

  const toggleLine = (lineId: string) => {
    setActiveLines((current) => current.includes(lineId)
      ? current.filter((id) => id !== lineId)
      : [...current, lineId]);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark">NY</div>
          <div>
            <p className="eyebrow">NEW YORK CITY</p>
            <h1>Transit Explorer</h1>
          </div>
        </div>

        <div className="status-card">
          <span className="status-dot" />
          <div>
            <strong>Service map</strong>
            <span>Interactive demo • selected subway routes</span>
          </div>
        </div>

        <label className="search-wrap">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search station or borough"
          />
        </label>

        <section>
          <div className="section-heading">
            <h2>Subway lines</h2>
            <button onClick={() => setActiveLines(allLineIds)}>Show all</button>
          </div>
          <div className="line-filter-row">
            {lines.map((line) => {
              const enabled = activeLines.includes(line.id);
              return (
                <button
                  key={line.id}
                  className={`line-filter ${enabled ? 'active' : ''}`}
                  onClick={() => toggleLine(line.id)}
                  aria-label={`Toggle ${line.name} train`}
                >
                  <span style={{ background: line.color, color: line.textColor ?? '#fff' }}>{line.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="station-section">
          <div className="section-heading">
            <h2>Stations</h2>
            <span>{visibleStations.length}</span>
          </div>
          <div className="station-list">
            {visibleStations.map((station) => (
              <button
                key={station.id}
                className={`station-card ${selected?.id === station.id ? 'selected' : ''}`}
                onClick={() => setSelected(station)}
              >
                <div>
                  <strong>{station.name}</strong>
                  <span>{station.borough}</span>
                </div>
                <div className="mini-lines">
                  {station.lines.map((line) => <LinePill key={line} id={line} compact />)}
                </div>
              </button>
            ))}
          </div>
        </section>
      </aside>

      <section className="map-panel">
        <div className="map-topbar">
          <div>
            <p className="eyebrow">LIVE VIEW</p>
            <h2>{selected?.name ?? 'New York City'}</h2>
          </div>
          <div className="topbar-meta">
            <span>12 featured stations</span>
            <span className="separator">•</span>
            <span>5 routes</span>
          </div>
        </div>

        <div className="map-wrap">
          <MapContainer center={[40.744, -73.97]} zoom={12} minZoom={10} maxZoom={17} zoomControl={false} attributionControl={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Recenter station={selected} />
            {lines.filter((line) => activeLines.includes(line.id)).map((line) => (
              <Polyline
                key={line.id}
                positions={line.path}
                pathOptions={{ color: line.color, weight: 7, opacity: 0.82, lineCap: 'round', lineJoin: 'round' }}
              />
            ))}
            {visibleStations.map((station) => {
              const selectedStation = selected?.id === station.id;
              return (
                <CircleMarker
                  key={station.id}
                  center={[station.lat, station.lng]}
                  radius={selectedStation ? 10 : 6}
                  pathOptions={{ color: '#fff', weight: selectedStation ? 4 : 3, fillColor: '#111827', fillOpacity: 1 }}
                  eventHandlers={{ click: () => setSelected(station) }}
                >
                  <Popup>
                    <div className="popup-content">
                      <strong>{station.name}</strong>
                      <span>{station.note}</span>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          <div className="floating-legend">
            <span className="legend-kicker">SELECTED STATION</span>
            <strong>{selected?.name ?? 'Choose a station'}</strong>
            {selected && (
              <>
                <span className="legend-note">{selected.note}</span>
                <div className="legend-lines">
                  {selected.lines.map((line) => <LinePill key={line} id={line} />)}
                </div>
              </>
            )}
          </div>

          <button
            className="reset-button"
            onClick={() => {
              setSearch('');
              setActiveLines(allLineIds);
              setSelected(stations[0]);
            }}
          >
            Reset view
          </button>
        </div>
      </section>
    </main>
  );
}
