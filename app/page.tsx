'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

/** Brand */
const BRAND = {
  cream: '#F3E6CB',
  teal: '#1396A2',
  deepTeal: '#0D6A72',
  coral: '#E7563A',
  offBlack: '#1a1a1a',
};

/** Links */
const LINKS = {
  instagram: 'https://instagram.com/calzonecards',
  whatnot: 'https://whatnot.com/user/calzonecards',
  email: 'hello@calzonecards.com',
};

/** Conditions */
export const CONDITION_COLORS: Record<string, string> = {
  GEM: '#2BB673',
  NM: '#47C58C',
  EX: '#7DD3A8',
  LP: '#F59E0B',
  MP: '#EF4444',
  HP: '#6B7280',
  DMG: '#374151',
};
export type ConditionKey = 'GEM' | 'NM' | 'EX' | 'LP' | 'MP' | 'HP' | 'DMG';
export type Listing = { name: string; condition: ConditionKey; price: string; img?: string };

/** Google Sheet hookup: paste your published CSV URL here */
const SHEET_CSV_URL = ''; // <-- paste "Publish to web" CSV link here

/** Assets */
const LOGO_URL = '/888B384F-30CE-436A-AEE0-0637F7544563.png';
const SNORLAX_POSTER = '/BF7C8A59-D6D1-4702-8987-2288DCDCA65E.png';
const SNORLAX_GIF = ''; // optional: paste a hosted GIF url

export default function Page() {
  const [email, setEmail] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchListings() {
    if (!SHEET_CSV_URL) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(SHEET_CSV_URL, { cache: 'no-store' });
      const text = await res.text();
      const parsed = csvToObjects(text);
      const normalized: Listing[] = parsed
        .filter((r: any) => (r.active ?? '').toString().trim().toLowerCase() !== 'false')
        .map((r: any) => ({
          name: (r.name ?? '').toString().trim(),
          condition: toCondition((r.condition ?? 'NM').toString().trim()),
          price: (r.price ?? '').toString().trim(),
          img: (r.img ?? '').toString().trim() || undefined,
        }));
      setListings(normalized);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  const bg = useMemo(() => ({ backgroundColor: BRAND.cream }), []);

  return (
    <div className="min-h-screen w-full" style={bg}>
      <NavBar />
      <main className="relative z-10">
        <Hero />
        <Highlights />
        <Showcase listings={listings} onRefresh={fetchListings} loading={loading} error={error} />
        <QuickAdd onAdd={(l) => setListings((prev) => [l, ...prev])} />
        <Schedule />
        <Subscribe email={email} setEmail={setEmail} />
        <About />
        <Footer />
      </main>
    </div>
  );
}

/** Sections */

function NavBar() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur border-b"
      style={{ backgroundColor: '#F3E6CBcc', borderColor: '#00000014' }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="Calzone Cards"
            className="h-9 w-9 rounded-xl border"
            style={{ borderColor: BRAND.deepTeal }}
          />
          <span className="font-semibold tracking-tight" style={{ color: BRAND.deepTeal }}>
            Calzone Cards
          </span>
          <Badge className="ml-2" style={{ backgroundColor: BRAND.coral, color: '#fff', borderColor: BRAND.deepTeal }}>
            Vintage Pokémon
          </Badge>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: BRAND.offBlack }}>
          <a href="#inventory" className="hover:opacity-80">
            Inventory
          </a>
          <a href="#schedule" className="hover:opacity-80">
            Shows
          </a>
          <a href="#about" className="hover:opacity-80">
            About
          </a>
          <a href={LINKS.instagram} target="_blank" className="hover:opacity-80 flex items-center gap-2">
            Instagram
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button className="rounded-xl" style={{ backgroundColor: BRAND.teal, color: '#fff' }}>
            <a href={LINKS.whatnot} target="_blank" className="flex items-center gap-2">
              Whatnot
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const src = SNORLAX_GIF || SNORLAX_POSTER;
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-4 border"
            style={{ background: 'rgba(19,150,162,0.08)', color: BRAND.deepTeal, borderColor: BRAND.deepTeal }}
          >
            ✨ Clean raws. Thoughtful curation. Fair deals.
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight" style={{ color: BRAND.deepTeal }}>
            Vintage Pokémon singles —
            <span className="block" style={{ color: BRAND.coral }}>
              curated by Calzone Cards
            </span>
          </h1>
          <p className="mt-4 max-w-prose" style={{ color: BRAND.offBlack }}>
            We buy and flip clean cards. No fluff. Just iconic art, honest condition, and smooth deals.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-2xl" style={{ backgroundColor: BRAND.coral, color: '#fff' }}>
              <a href={LINKS.instagram} target="_blank" className="flex items-center gap-2">
                Shop Instagram
              </a>
            </Button>
            <Button className="rounded-2xl" style={{ backgroundColor: BRAND.teal, color: '#fff' }}>
              <a href={LINKS.whatnot} target="_blank" className="flex items-center gap-2">
                Watch the weekly show
              </a>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-4" style={{ color: BRAND.offBlack }}>
            <div className="flex items-center gap-1">⭐ Trusted by collectors</div>
            <div className="flex items-center gap-1">⏱️ Quick shipping & comms</div>
          </div>
        </div>
        <div className="relative">
          <div
            className="relative aspect-[4/3] rounded-3xl overflow-hidden border shadow-2xl"
            style={{ borderColor: BRAND.deepTeal }}
          >
            <img src={src} alt="Snorlax eating a calzone" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { title: 'Raw-first brand', desc: 'Our lane is clean raws you can trust.', icon: '🥟' },
    { title: 'Gen 1–4 focus', desc: 'Iconic EX, Gold Stars, and era-defining art.', icon: '⭐' },
    { title: 'Fair pricing', desc: 'Deals that keep collectors coming back.', icon: '🤝' },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4">
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((i, idx) => (
          <Card key={idx} className="rounded-3xl border" style={{ borderColor: '#00000014' }}>
            <CardContent className="p-6 bg-white/80">
              <div className="text-3xl mb-2" aria-hidden>
                {i.icon}
              </div>
              <h3 className="text-lg font-semibold" style={{ color: BRAND.deepTeal }}>
                {i.title}
              </h3>
              <p className="text-sm mt-1" style={{ color: BRAND.offBlack }}>
                {i.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Showcase({
  listings,
  onRefresh,
  loading,
  error,
}: {
  listings: Listing[];
  onRefresh?: () => void;
  loading?: boolean;
  error?: string | null;
}) {
  return (
    <section id="inventory" className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND.deepTeal }}>
            Inventory Highlights
          </h2>
          <p className="text-sm" style={{ color: BRAND.offBlack }}>
            Edit your Google Sheet → site updates automatically.
          </p>
          {error && (
            <p className="text-sm" style={{ color: '#b91c1c' }}>
              Error: {error}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button className="rounded-xl" style={{ backgroundColor: BRAND.coral, color: '#fff' }}>
            <a href={LINKS.instagram} target="_blank" className="flex items-center gap-2">
              View feed →
            </a>
          </Button>
          {onRefresh && (
            <Button onClick={onRefresh} disabled={loading} className="rounded-xl" style={{ backgroundColor: BRAND.teal, color: '#fff' }}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </Button>
          )}
        </div>
      </div>

      <Legend />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {listings.map((card, i) => (
          <Card key={i} className="rounded-3xl overflow-hidden border" style={{ borderColor: '#00000014', background: '#fff' }}>
            <CardHeader className="p-0">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={card.img || LOGO_URL} alt={card.name} className="h-full w-full object-cover" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold leading-tight pr-2" style={{ color: BRAND.offBlack }}>
                  {card.name}
                </h3>
                <span
                  className="text-xs px-2 py-1 rounded-full border font-medium"
                  style={{
                    backgroundColor: hexWithAlpha(CONDITION_COLORS[card.condition], 0.12),
                    color: BRAND.offBlack,
                    borderColor: hexWithAlpha(CONDITION_COLORS[card.condition], 0.5),
                  }}
                >
                  {card.condition}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="font-medium" style={{ color: BRAND.deepTeal }}>
                {card.price}
              </div>
            </CardFooter>
          </Card>
        ))}
        {(!listings || listings.length === 0) && (
          <div className="text-sm text-center opacity-70">Add items to your Google Sheet (CSV) and press Refresh.</div>
        )}
      </div>
    </section>
  );
}

function Legend() {
  const items = Object.entries(CONDITION_COLORS);
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs" style={{ color: BRAND.offBlack }}>
        Condition legend:
      </span>
      {items.map(([k, col]) => (
        <span
          key={k}
          className="text-[11px] px-2 py-1 rounded-full border"
          style={{ backgroundColor: hexWithAlpha(col, 0.12), borderColor: hexWithAlpha(col, 0.5), color: BRAND.offBlack }}
        >
          {k}
        </span>
      ))}
    </div>
  );
}

function QuickAdd({ onAdd }: { onAdd: (l: Listing) => void }) {
  const [name, setName] = useState('');
  const [condition, setCondition] = useState<ConditionKey>('NM');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  return (
    <section className="mx-auto max-w-6xl px-4">
      <Card className="rounded-3xl border mt-4" style={{ borderColor: '#00000014', background: '#ffffffa8' }}>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3" style={{ color: BRAND.deepTeal }}>
            ➕ Quick add a listing (local preview)
          </div>
          <p className="text-xs mb-3" style={{ color: BRAND.offBlack }}>
            This adds a card only in your browser preview. To make it permanent, add it to your Google Sheet.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAdd({ name, condition, price, img: img || undefined });
              setName('');
              setPrice('');
              setImg('');
            }}
            className="grid md:grid-cols-4 gap-2"
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Card name (e.g., Lugia ex UF)" className="rounded-xl" />
            <select value={condition} onChange={(e) => setCondition(e.target.value as ConditionKey)} className="rounded-xl border px-3 py-2" style={{ borderColor: '#00000022' }}>
              {(['GEM', 'NM', 'EX', 'LP', 'MP', 'HP', 'DMG'] as const).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="$ Price" className="rounded-xl" />
            <Input value={img} onChange={(e) => setImg(e.target.value)} placeholder="Image URL (optional)" className="rounded-xl" />
            <div className="md:col-span-4">
              <Button type="submit" className="rounded-xl" style={{ backgroundColor: BRAND.teal, color: '#fff' }}>
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND.deepTeal }}>
            Weekly Show
          </h2>
          <p className="text-sm" style={{ color: BRAND.offBlack }}>
            Every Tuesday • 8pm ET • Vintage singles, claim-ready
          </p>
        </div>
        <Button className="rounded-xl" style={{ backgroundColor: BRAND.teal, color: '#fff' }}>
          <a href={LINKS.whatnot} target="_blank" className="flex items-center gap-2">
            Follow on Whatnot
          </a>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {['$1 starts (select)', 'Fixed-price slabs & raws', 'Viewer offers welcome'].map((t, i) => (
          <Card key={i} className="rounded-3xl border" style={{ borderColor: '#00000014', background: '#ffffffa8' }}>
            <CardContent className="p-6" style={{ color: BRAND.offBlack }}>
              {t}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Subscribe({ email, setEmail }: { email: string; setEmail: (v: string) => void }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <Card className="rounded-3xl border" style={{ borderColor: '#00000014', background: '#ffffffa8' }}>
        <CardContent className="p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold" style={{ color: BRAND.deepTeal }}>
                Get drops in your inbox
              </h3>
              <p className="text-sm mt-1" style={{ color: BRAND.offBlack }}>
                Early peeks, show reminders, and the occasional spicy calzone.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Thanks! We'll be in touch at ${email}`);
              }}
              className="flex gap-2"
            >
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@trainer.com" className="rounded-2xl" />
              <Button type="submit" className="rounded-2xl" style={{ backgroundColor: BRAND.coral, color: '#fff' }}>
                Join
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND.deepTeal }}>
            About Calzone Cards
          </h2>
          <p className="mt-3 leading-relaxed" style={{ color: BRAND.offBlack }}>
            Calzone Cards is a vintage-forward Pokémon shop run by a collector who keeps it simple: find clean cards, price them fairly, and ship fast.
          </p>
          <div className="mt-5 flex gap-3">
            <Button className="rounded-xl" style={{ backgroundColor: BRAND.coral, color: '#fff' }}>
              <a href={LINKS.instagram} target="_blank" className="flex items-center gap-2">
                Follow
              </a>
            </Button>
            <Button className="rounded-xl" style={{ backgroundColor: BRAND.teal, color: '#fff' }}>
              <a href={`mailto:${LINKS.email}`} className="flex items-center gap-2">
                Contact
              </a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border" style={{ borderColor: BRAND.deepTeal }}>
            <img src={LOGO_URL} alt="Calzone Cards logo" className="h-full w-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-8 border-t" style={{ borderColor: '#00000014' }}>
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4" style={{ color: BRAND.offBlack }}>
        <div className="flex items-center gap-2">
          <img src={LOGO_URL} alt="CC" className="h-8 w-8 rounded-lg border" style={{ borderColor: BRAND.deepTeal }} />
          <span>© {new Date().getFullYear()} Calzone Cards</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={LINKS.instagram} target="_blank" className="hover:opacity-80 flex items-center gap-2">
            Instagram
          </a>
          <a href={LINKS.whatnot} target="_blank" className="hover:opacity-80 flex items-center gap-2">
            Whatnot
          </a>
          <a href={`mailto:${LINKS.email}`} className="hover:opacity-80 flex items-center gap-2">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Helpers */

function hexWithAlpha(hex: string, a = 1) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16),
    g = parseInt(c.slice(2, 4), 16),
    b = parseInt(c.slice(4, 6), 16);
  return a >= 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
}

function toCondition(v: string): ConditionKey {
  const k = v.toUpperCase().replace(/\s+/g, '');
  const allowed = ['GEM', 'NM', 'EX', 'LP', 'MP', 'HP', 'DMG'] as const;
  return (allowed as readonly string[]).includes(k) ? (k as ConditionKey) : 'NM';
}

function splitCSV(line: string) {
  const out: string[] = [];
  let cur = '',
    q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (q && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else q = !q;
    } else if (ch === ',' && !q) {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

function csvToObjects(csv: string) {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [] as any[];
  const header = splitCSV(lines[0]).map((s) => s.trim().toLowerCase());
  return lines.slice(1).map((l) => {
    const cells = splitCSV(l);
    const o: any = {};
    header.forEach((h, i) => (o[h] = cells[i]));
    return o;
  });
}

