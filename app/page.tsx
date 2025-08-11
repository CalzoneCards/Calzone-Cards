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

/** Conditions (NO exports here) */
const CONDITION_COLORS: Record<string, string> = {
  GEM: '#2BB673',
  NM: '#47C58C',
  EX: '#7DD3A8',
  LP: '#F59E0B',
  MP: '#EF4444',
  HP: '#6B7280',
  DMG: '#374151',
};
type ConditionKey = 'GEM' | 'NM' | 'EX' | 'LP' | 'MP' | 'HP' | 'DMG';
type Listing = { name: string; condition: ConditionKey; price: string; img?: string };

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
      const res = await fetch(SHEE
