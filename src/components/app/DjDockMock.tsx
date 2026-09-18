import { Music, Heart, Clock } from 'lucide-react';

import {
  favorites,
  history,
  playlistTree,
  type MockTrack,
  type PlaylistNode,
} from '@/lib/mockData';

/* ───────────────────────────────────────────────────────────────────────────
   Faithful static port of the in-app left dock (rekordbox/Serato style):
   SONAR header + profile pill, PLAYLISTS tree with matched/total counts,
   FAVORIS and HISTORIQUE sections. Presentational only.
   ─────────────────────────────────────────────────────────────────────────── */

function DockTitle({ children, count }: { children: React.ReactNode; count?: string }) {
  return (
    <div className="flex items-center justify-between px-1 pb-1.5">
      <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-slate-300">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
        {children}
      </span>
      {count && <span className="text-[9px] tabular-nums text-slate-500">{count}</span>}
    </div>
  );
}

function Node({ n, depth }: { n: PlaylistNode; depth: number }) {
  if (n.type === 'folder') {
    return (
      <div>
        <div className="flex items-center gap-1.5 rounded-md px-2 py-[4px] text-[11px] text-slate-300">
          <span className="inline-block rotate-90 text-[8px] text-slate-500">▸</span>
          <span className="text-[11px] opacity-80">📁</span>
          <span className="flex-1 truncate font-medium">{n.name}</span>
          <span className="text-[9px] tabular-nums text-slate-600">{n.children.length}</span>
        </div>
        <div className="ml-[13px] border-l border-white/[0.07] pl-1">
          {n.children.map((c, i) => (
            <Node key={i} n={c} depth={depth + 1} />
          ))}
        </div>
      </div>
    );
  }

  const active = n.active;
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md px-2 py-[4px] text-[11px] ${
        active ? 'text-white' : 'text-slate-400'
      }`}
      style={
        active
          ? {
              background:
                'linear-gradient(90deg, color-mix(in srgb, var(--accent) 24%, transparent), color-mix(in srgb, var(--accent) 5%, transparent))',
              boxShadow: 'inset 2px 0 0 var(--accent)',
            }
          : undefined
      }
    >
      <span className="text-[10px]" style={{ color: 'var(--accent)' }}>
        ♪
      </span>
      <span className="flex-1 truncate">{n.name}</span>
      <span
        className="text-[9px] tabular-nums text-slate-600"
        style={active ? { color: 'var(--accent)' } : undefined}
      >
        {n.n}
        {n.n !== n.total ? `/${n.total}` : ''}
      </span>
    </div>
  );
}

function TrackRow({ t }: { t: MockTrack }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.color }} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11px] text-slate-200">{t.title}</span>
        <span className="block truncate text-[9px] text-slate-500">
          {t.artist} · {t.bpm} · {t.camelot}
        </span>
      </span>
    </div>
  );
}

function SectionHead({
  icon: Icon,
  title,
  count,
}: {
  icon: typeof Heart;
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5">
      <span className="text-[8px] text-slate-500">▾</span>
      <Icon className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
      <span className="text-[10px] font-semibold tracking-[0.14em] text-slate-300">{title}</span>
      <span className="text-[9px] tabular-nums text-slate-600">{count}</span>
    </div>
  );
}

export function DjDockMock({ className }: { className?: string }) {
  return (
    <aside
      className={`relative flex w-[290px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl ${className ?? ''}`}
      style={
        {
          ['--accent' as string]: 'var(--c1)',
          ['--accent2' as string]: 'var(--c2)',
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.55 }}
      />
      <div
        className="pointer-events-none absolute -left-20 -top-24 h-56 w-72 rounded-full opacity-50 blur-3xl"
        style={{ background: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}
      />

      {/* header */}
      <header className="relative px-4 pb-3 pt-3.5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight text-white">
            GALAXY
            <span style={{ color: 'var(--accent)', textShadow: '0 0 16px color-mix(in srgb, var(--accent) 60%, transparent)' }}>
              {' '}
              IO
            </span>
          </h1>
          <span
            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px]"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent) 40%, transparent)',
              color: 'var(--accent)',
              background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
            }}
          >
            <Music className="h-3 w-3" />
            <span className="tracking-widest">REKORDBOX</span>
          </span>
        </div>
        <div className="mt-3 h-px" style={{ background: 'linear-gradient(90deg, color-mix(in srgb, var(--accent) 65%, transparent), transparent)' }} />
      </header>

      <div className="relative flex flex-col gap-2 px-2.5 pb-3">
        {/* playlists */}
        <div>
          <DockTitle count="3 421/4 218">PLAYLISTS</DockTitle>
          <div className="px-0.5">
            {playlistTree.map((n, i) => (
              <Node key={i} n={n} depth={0} />
            ))}
          </div>
        </div>

        {/* favoris */}
        <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-black/20">
          <SectionHead icon={Heart} title="FAVORIS" count={favorites.length} />
          <div className="px-1 pb-1">
            {favorites.map((t, i) => (
              <TrackRow key={i} t={t} />
            ))}
          </div>
        </div>

        {/* historique */}
        <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-black/20">
          <SectionHead icon={Clock} title="HISTORIQUE" count={history.length} />
          <div className="px-1 pb-1">
            {history.map((t, i) => (
              <TrackRow key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
