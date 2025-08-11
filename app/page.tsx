'use client';
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import './globals.css';

const BRAND = {
  cream: '#F3E6CB',
  teal: '#1396A2',
  deepTeal: '#0D6A72',
  coral: '#E7563A',
  offBlack: '#1a1a1a',
};

const CONDITION_COLORS: Record<string,string> = {
  GEM: '#2BB673', NM: '#47C58C', EX: '#7DD3A8',
  LP: '#F59E0B', MP: '#EF4444', HP: '#6B7280', DMG: '#374151',
};

type ConditionKey = keyof typeof CONDITION_COLORS;
type Listing = { name: string; condition: ConditionKey; price: string; img?: string };

const SHEET_CSV_URL = ""; // paste your published CSV url here

function hexWithAlpha(hex: string, a=1){ const c=hex.replace('#',''); const r=parseInt(c.slice(0,2),16), g=parseInt(c.slice(2,4),16), b=parseInt(c.slice(4,6),16); return a>=1?`rgb(${r},${g},${b})`:`rgba(${r},${g},${b},${a})`; }
function toCondition(v:string): ConditionKey { const k=v.toUpperCase().replace(' ','') as ConditionKey; return (['GEM','NM','EX','LP','MP','HP','DMG'] as const).includes(k) ? k : 'NM'; }
function splitCSV(line:string){ const out:string[]=[]; let cur='', q=false; for(let i=0;i<line.length;i++){ const ch=line[i]; if(ch==='"'){ if(q && line[i+1]==='"'){cur+='"'; i++;} else q=!q; } else if(ch===',' && !q){ out.push(cur); cur=''; } else cur+=ch;} out.push(cur); return out; }
function csvToObjects(csv:string){ const lines=csv.split(/\r?\n/).filter(Boolean); if(!lines.length) return [] as any[]; const header=splitCSV(lines[0]).map(s=>s.trim().toLowerCase()); return lines.slice(1).map(l=>{ const cells=splitCSV(l); const o:any={}; header.forEach((h,i)=>o[h]=cells[i]); return o; }); }

export default function Page(){
  const [email,setEmail] = useState('');
  const [listings,setListings] = useState<Listing[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);

  async function fetchListings(){
    if(!SHEET_CSV_URL) return;
    setLoading(true); setError(null);
    try{
      const res = await fetch(SHEET_CSV_URL, { cache: 'no-store' });
      const text = await res.text();
      const parsed = csvToObjects(text);
      const normalized: Listing[] = parsed
        .filter((r:any)=> (r.active ?? '').toString().trim().toLowerCase() !== 'false')
        .map((r:any)=>({ name:(r.name??'').toString().trim(), condition: toCondition((r.condition??'NM').toString().trim()), price:(r.price??'').toString().trim(), img: (r.img??'').toString().trim() || undefined }));
      setListings(normalized);
    }catch(e:any){ setError(e?.message || 'Failed to load'); }
    finally{ setLoading(false); }
  }

  React.useEffect(()=>{ fetchListings(); }, []);

  return (
    <div className='min-h-screen' style={{ backgroundColor: BRAND.cream }}>
      <header className='sticky top-0 z-50 border-b' style={{ backgroundColor:'#F3E6CBcc' }}>
        <div className='mx-auto max-w-7xl px-4 py-3 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img src='/888B384F-30CE-436A-AEE0-0637F7544563.png' className='h-9 w-9 rounded-lg border' style={{ borderColor: BRAND.deepTeal }} alt='Calzone Cards'/>
            <span className='font-semibold' style={{ color: BRAND.deepTeal }}>Calzone Cards</span>
            <Badge className='ml-2' >Vintage Pokémon</Badge>
          </div>
          <div className='flex items-center gap-2'>
            <a href='https://whatnot.com/user/calzonecards'><Button className='rounded-xl' style={{ backgroundColor: BRAND.teal, color:'#fff' }}>Whatnot</Button></a>
          </div>
        </div>
      </header>

      <main className='relative z-10'>
        <section className='mx-auto max-w-6xl px-4 pt-8 pb-12 grid md:grid-cols-2 gap-10 items-center'>
          <div>
            <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-4 border' style={{ background:'rgba(19,150,162,0.08)', color:BRAND.deepTeal, borderColor:BRAND.deepTeal }}>✨ Clean raws. Thoughtful curation. Fair deals.</div>
            <h1 className='text-4xl md:text-6xl font-extrabold leading-tight' style={{ color: BRAND.deepTeal }}>
              Vintage Pokémon singles —<span className='block' style={{ color: BRAND.coral }}>curated by Calzone Cards</span>
            </h1>
            <p className='mt-4 max-w-prose' style={{ color: BRAND.offBlack }}>We buy and flip clean cards. No fluff. Just iconic art, honest condition, and smooth deals.</p>
            <div className='mt-6 flex gap-3'>
              <a href='https://instagram.com/calzonecards'><Button className='rounded-2xl' style={{ backgroundColor: BRAND.coral, color:'#fff' }}>Shop Instagram</Button></a>
              <a href='https://whatnot.com/user/calzonecards'><Button className='rounded-2xl' style={{ backgroundColor: BRAND.teal, color:'#fff' }}>Watch the weekly show</Button></a>
            </div>
          </div>
          <div className='relative'>
            <div className='relative aspect-[4/3] rounded-3xl overflow-hidden border shadow-2xl' style={{ borderColor: BRAND.deepTeal }}>
              <img src='/BF7C8A59-D6D1-4702-8987-2288DCDCA65E.png' className='w-full h-full object-cover' alt='Snorlax poster'/>
            </div>
          </div>
        </section>

        <section className='mx-auto max-w-6xl px-4 pb-4 grid md:grid-cols-3 gap-4'>
          {[
            ['🥟','Raw-first brand','Our lane is clean raws you can trust.'],
            ['⭐','Gen 1–4 focus','Iconic EX, Gold Stars, and era-defining art.'],
            ['🤝','Fair pricing','Deals that keep collectors coming back.'],
          ].map((i,idx)=> (
            <Card key={idx} className='rounded-3xl'>
              <CardContent>
                <div className='text-3xl mb-2'>{i[0]}</div>
                <h3 className='text-lg font-semibold' style={{ color: BRAND.deepTeal }}>{i[1]}</h3>
                <p className='text-sm mt-1' style={{ color: BRAND.offBlack }}>{i[2]}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section id='inventory' className='mx-auto max-w-6xl px-4 py-12'>
          <div className='flex items-end justify-between mb-6'>
            <div>
              <h2 className='text-2xl md:text-3xl font-bold' style={{ color: BRAND.deepTeal }}>Inventory Highlights</h2>
              <p className='text-sm' style={{ color: BRAND.offBlack }}>Edit your Google Sheet → site updates automatically.</p>
              {error && <p className='text-sm' style={{ color:'#b91c1c' }}>Error: {error}</p>}
            </div>
            <div className='flex gap-2'>
              <a href='https://instagram.com/calzonecards'><Button className='rounded-xl' style={{ backgroundColor: BRAND.coral, color:'#fff' }}>View feed →</Button></a>
              <Button onClick={fetchListings} className='rounded-xl' style={{ backgroundColor: BRAND.teal, color:'#fff' }}>{loading? 'Refreshing…' : 'Refresh'}</Button>
            </div>
          </div>

          <div className='flex flex-wrap gap-2 items-center'>
            <span className='text-xs' style={{ color: BRAND.offBlack }}>Condition legend:</span>
            {Object.entries(CONDITION_COLORS).map(([k,col])=> (
              <span key={k} className='text-[11px] px-2 py-1 rounded-full border' style={{ backgroundColor: hexWithAlpha(col,0.12), borderColor: hexWithAlpha(col,0.5), color: BRAND.offBlack }}>{k}</span>
            ))}
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
            {listings.map((card,i)=> (
              <Card key={i} className='rounded-3xl overflow-hidden'>
                <CardHeader className='p-0'>
                  <div className='aspect-[4/3] overflow-hidden'>
                    <img src={card.img || '/888B384F-30CE-436A-AEE0-0637F7544563.png'} className='w-full h-full object-cover' alt={card.name}/>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold pr-2' style={{ color: BRAND.offBlack }}>{card.name}</h3>
                    <span className='text-xs px-2 py-1 rounded-full border font-medium' style={{ backgroundColor: hexWithAlpha(CONDITION_COLORS[card.condition],0.12), color: BRAND.offBlack, borderColor: hexWithAlpha(CONDITION_COLORS[card.condition],0.5) }}>{card.condition}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className='font-medium' style={{ color: BRAND.deepTeal }}>{card.price}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className='mx-auto max-w-6xl px-4 pb-12'>
          <Card className='rounded-3xl'>
            <CardContent>
              <div className='grid md:grid-cols-2 gap-6 items-center'>
                <div>
                  <h3 className='text-xl md:text-2xl font-bold' style={{ color: BRAND.deepTeal }}>Get drops in your inbox</h3>
                  <p className='text-sm mt-1' style={{ color: BRAND.offBlack }}>Early peeks, show reminders, and the occasional spicy calzone.</p>
                </div>
                <form onSubmit={(e)=>{e.preventDefault(); alert(`Thanks! We'll be in touch at ${email}`)}} className='flex gap-2'>
                  <Input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='you@trainer.com' />
                  <Button type='submit' className='rounded-2xl' style={{ backgroundColor: BRAND.coral, color:'#fff' }}>Join</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className='mt-8 border-t'>
        <div className='mx-auto max-w-6xl px-4 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4' style={{ color: BRAND.offBlack }}>
          <div className='flex items-center gap-2'>
            <img src='/888B384F-30CE-436A-AEE0-0637F7544563.png' className='h-8 w-8 rounded-lg border' style={{ borderColor: BRAND.deepTeal }} alt='CC'/>
            <span>© {new Date().getFullYear()} Calzone Cards</span>
          </div>
          <div className='flex items-center gap-4'>
            <a href='https://instagram.com/calzonecards' className='underline'>Instagram</a>
            <a href='https://whatnot.com/user/calzonecards' className='underline'>Whatnot</a>
            <a href='mailto:hello@calzonecards.com' className='underline'>Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
