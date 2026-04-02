import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  Card, Button, Input, Badge, Link, Text, Heading, Divider,
} from '../src/components';
import styles from './App.module.css';

// ── Types ──────────────────────────────────────────────────────────────────

interface Gift {
  id: string;
  name: string;
  price: string;
  store: string;
  url: string;
  emoji: string;
}

type Claims = Record<string, string>;
type View = 'guest' | 'admin';

// ── Constants ──────────────────────────────────────────────────────────────

const STORAGE_KEY   = 'birthday-wishlist-v1';
const CLAIMS_KEY    = 'birthday-claims-v1';
const SESSION_KEY   = 'birthday-admin-unlocked';
// Simple djb2 hash — good enough for a client-side birthday wishlist gate
function hashStr(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return (h >>> 0).toString(16);
}

const ADMIN_HASH = hashStr('tee2026'); // pre-computed at build time

const DEFAULT_GIFTS: Gift[] = [
  { id: '1775081239175', name: 'NISHANE Wūlóng Chá 50ML',                  price: '₦264,000',    store: 'Essenza',         url: 'https://www.essenza.ng/products/nishane-wulong-cha?_pos=3&_psq=nishane&_ss=e&_v=1.0',                                         emoji: '🏺'     },
  { id: '1775081336845', name: 'Amélie Shoulder bag Lilac/Mustard/Green',   price: '₦60,000',     store: 'Bagsnco',         url: 'https://www.instagram.com/p/DUiPx4-CEQ5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',                               emoji: '👜'     },
  { id: '1775082518883', name: 'WRIST WATCH',                               price: '₦92,500',     store: 'Bankecoo',        url: 'https://www.instagram.com/p/DWTm5x4CCHX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',                               emoji: '⌚️'    },
  { id: '1775082610663', name: 'Polene Numéro Neuf East West',              price: '€440',        store: 'Polene',          url: 'https://www.polene-paris.com/products/numero-neuf-east-west-textured-cherry',                                              emoji: '👛'     },
  { id: '1775083645866', name: 'Dress',                                     price: '₦120,000',    store: 'Lizandco',        url: 'https://www.lizandcoofficial.com/products/patch-dress',                                                                     emoji: '👗'     },
  { id: '1775084408504', name: 'Money: 0079398999 / Access Bank',           price: '',            store: '',                url: '',                                                                                                                          emoji: '💸'     },
  { id: '1775084555568', name: 'Money FX: Wise',                            price: '',            store: '',                url: 'https://wise.com/pay/me/thelmad8?utm_source=request_flow',                                                                  emoji: '💵💶💷' },
  { id: '1775084952042', name: 'Adire Play Set',                            price: '₦30,000',     store: 'Bloom Womenwear', url: 'https://www.bloomwomenswear.com/products/Adire-Play-Set-p821142514',                                                        emoji: '👗'     },
  { id: '1775085345752', name: 'Yobe Dress',                                price: '₦65,000',     store: 'Cassandra Collins', url: 'https://cassandracollins.co/products/yobe-dress?variant=51477330886965',                                                  emoji: '👗'     },
];

// ── Storage helpers ────────────────────────────────────────────────────────

function loadGifts(): Gift[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [...DEFAULT_GIFTS];
  } catch {
    return [...DEFAULT_GIFTS];
  }
}

function loadClaims(): Claims {
  try {
    const raw = localStorage.getItem(CLAIMS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [gifts,  setGifts]  = useState<Gift[]>(loadGifts);
  const [claims, setClaims] = useState<Claims>(loadClaims);
  const [view,   setView]   = useState<View>('guest');

  // Admin auth — persists for the browser session only
  const [adminUnlocked,    setAdminUnlocked]    = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput,    setPasswordInput]    = useState('');
  const [passwordError,    setPasswordError]    = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);

  // Claim modal
  const [pendingId,   setPendingId]   = useState<string | null>(null);
  const [claimerName, setClaimerName] = useState('');
  const [nameError,   setNameError]   = useState('');
  const claimerRef = useRef<HTMLInputElement>(null);

  // Add-gift form
  const [newName,  setNewName]  = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStore, setNewStore] = useState('');
  const [newUrl,   setNewUrl]   = useState('');
  const [newEmoji, setNewEmoji] = useState('');

  // Persist gifts + claims
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts)); }, [gifts]);
  useEffect(() => { localStorage.setItem(CLAIMS_KEY,  JSON.stringify(claims)); }, [claims]);

  // Focus password input when modal opens
  useEffect(() => {
    if (showPasswordModal) setTimeout(() => passwordRef.current?.focus(), 50);
  }, [showPasswordModal]);

  // Focus claimer input when claim modal opens
  useEffect(() => {
    if (pendingId !== null) setTimeout(() => claimerRef.current?.focus(), 50);
  }, [pendingId]);

  // ── Admin auth ─────────────────────────────────────────────────────────────

  function handleAdminTabClick() {
    if (adminUnlocked) { setView('admin'); return; }
    setPasswordInput('');
    setPasswordError('');
    setShowPasswordModal(true);
  }

  function confirmPassword() {
    if (hashStr(passwordInput) === ADMIN_HASH) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAdminUnlocked(true);
      setShowPasswordModal(false);
      setView('admin');
    } else {
      setPasswordError('Incorrect password');
      setPasswordInput('');
    }
  }

  function closePasswordModal() {
    setShowPasswordModal(false);
  }

  // ── Claim handlers ─────────────────────────────────────────────────────────

  function openModal(id: string) {
    setPendingId(id);
    setClaimerName('');
    setNameError('');
  }

  function closeModal() { setPendingId(null); }

  function confirmClaim() {
    const name = claimerName.trim();
    if (!name) { setNameError('Please enter your name'); return; }
    if (!pendingId) return;
    setClaims(prev => ({ ...prev, [pendingId]: name }));
    closeModal();
  }

  function unclaim(id: string) {
    setClaims(prev => { const next = { ...prev }; delete next[id]; return next; });
  }

  // ── Gift handlers ──────────────────────────────────────────────────────────

  function addGift() {
    if (!newName.trim()) return;
    setGifts(prev => [...prev, {
      id:    Date.now().toString(),
      name:  newName.trim(),
      price: newPrice.trim(),
      store: newStore.trim(),
      url:   newUrl.trim(),
      emoji: newEmoji.trim() || '🎁',
    }]);
    setNewName(''); setNewPrice(''); setNewStore(''); setNewUrl(''); setNewEmoji('');
  }

  function deleteGift(id: string) {
    if (!confirm('Remove this gift from the wishlist?')) return;
    setGifts(prev => prev.filter(g => g.id !== id));
    setClaims(prev => { const next = { ...prev }; delete next[id]; return next; });
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const pendingGift = gifts.find(g => g.id === pendingId);

  return (
    <>
      <div className={styles.bgLayer} />
      <div className={styles.noiseLayer} />

      <div className={styles.app}>
        {/* Header */}
        <header className={styles.header}>
          <Heading as="h1" size="xl" weight="medium">Tee's birthday wishlist 🎂</Heading>
          <Text size="sm" secondary className={styles.headerSub}>
            Pick something and let her know it's coming
          </Text>
        </header>

        {/* Tab bar */}
        <nav className={styles.tabBar}>
          <Button
            variant={view === 'guest' ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => setView('guest')}
          >
            Wishlist
          </Button>
          <Button
            variant={view === 'admin' ? 'outline' : 'ghost'}
            size="sm"
            onClick={handleAdminTabClick}
          >
            Admin
          </Button>
        </nav>

        {/* Guest view */}
        {view === 'guest' && (
          <div className={styles.grid}>
            {gifts.length === 0 ? (
              <div className={styles.empty}>
                <Text size="sm" secondary>No gifts added yet!</Text>
              </div>
            ) : (
              gifts.map(gift => {
                const claim = claims[gift.id];
                return (
                  <Card
                    key={gift.id}
                    variant="outlined"
                    padding="sm"
                    className={clsx(styles.giftCard, claim && styles.claimed)}
                  >
                    <div className={styles.cardEmoji}>{gift.emoji || '🎁'}</div>

                    <Text size="sm" weight="medium">{gift.name}</Text>

                    {gift.price && <Text size="sm" secondary>{gift.price}</Text>}

                    <div className={styles.storeLine}>
                      {gift.url ? (
                        <Link href={gift.url} external subtle>
                          {gift.store || 'Buy here'} →
                        </Link>
                      ) : gift.store ? (
                        <Text size="xs" secondary>{gift.store}</Text>
                      ) : null}
                    </div>

                    <div className={styles.claimArea}>
                      {claim ? (
                        <>
                          <Badge color="sage" dot>Claimed</Badge>
                          <Text size="xs" secondary className={styles.claimedBy}>
                            by {claim}
                          </Text>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" fullWidth onClick={() => openModal(gift.id)}>
                          I'll get this
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {/* Admin view */}
        {view === 'admin' && (
          <>
            {/* Add gift */}
            <section className={styles.adminSection}>
              <Card variant="flat" padding="md">
                <Text size="xs" weight="medium" tertiary className={styles.sectionTitle}>
                  Add a gift item
                </Text>
                <div className={styles.addGrid}>
                  <div className={styles.addGridFull}>
                    <Input
                      placeholder="Gift name e.g. Kindle Paperwhite"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addGift()}
                    />
                  </div>
                  <Input placeholder="Price e.g. £120"   value={newPrice} onChange={e => setNewPrice(e.target.value)} />
                  <Input placeholder="Store e.g. Amazon" value={newStore} onChange={e => setNewStore(e.target.value)} />
                  <div className={styles.addGridFull}>
                    <Input placeholder="Link to buy (https://...)" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
                  </div>
                  <div className={styles.addGridFull}>
                    <Input
                      placeholder="Emoji (optional) e.g. 📚"
                      value={newEmoji}
                      onChange={e => setNewEmoji(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addGift()}
                    />
                  </div>
                  <div className={styles.addGridFull}>
                    <Button variant="outline" size="sm" fullWidth onClick={addGift}>
                      + Add to wishlist
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* Claims */}
            <section className={styles.adminSection}>
              <Card variant="flat" padding="md">
                <Text size="xs" weight="medium" tertiary className={styles.sectionTitle}>
                  Claims so far
                </Text>
                {(() => {
                  const claimed = gifts.filter(g => claims[g.id]);
                  return claimed.length === 0 ? (
                    <Text size="sm" secondary>No claims yet</Text>
                  ) : claimed.map((g, i) => (
                    <div key={g.id}>
                      {i > 0 && <Divider subtle />}
                      <div className={styles.claimRow}>
                        <Text size="sm">{g.emoji || '🎁'} {g.name}</Text>
                        <Text size="sm" secondary>{claims[g.id]}</Text>
                        <button className={styles.deleteBtn} onClick={() => unclaim(g.id)} title="Remove claim">×</button>
                      </div>
                    </div>
                  ));
                })()}
              </Card>
            </section>

            {/* Manage items */}
            <section className={styles.adminSection}>
              <Card variant="flat" padding="md">
                <Text size="xs" weight="medium" tertiary className={styles.sectionTitle}>
                  Manage items
                </Text>
                {gifts.length === 0 ? (
                  <Text size="sm" secondary>No gifts yet</Text>
                ) : gifts.map((g, i) => (
                  <div key={g.id}>
                    {i > 0 && <Divider subtle />}
                    <div className={styles.claimRow}>
                      <Text size="sm">{g.emoji || '🎁'} {g.name}</Text>
                      <button className={styles.deleteBtn} onClick={() => deleteGift(g.id)} title="Delete gift">×</button>
                    </div>
                  </div>
                ))}
              </Card>
            </section>
          </>
        )}
      </div>

      {/* Password modal */}
      {showPasswordModal && (
        <div
          className={styles.modalBg}
          onClick={e => { if (e.target === e.currentTarget) closePasswordModal(); }}
        >
          <Card variant="elevated" padding="md" className={styles.modal}>
            <Heading as="h2" size="md" weight="medium">Admin access</Heading>
            <Text size="sm" secondary className={styles.modalDesc}>
              Enter the password to manage the wishlist.
            </Text>
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              value={passwordInput}
              error={passwordError}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(''); }}
              onKeyDown={e => {
                if (e.key === 'Enter') confirmPassword();
                if (e.key === 'Escape') closePasswordModal();
              }}
            />
            <div className={styles.modalActions}>
              <Button variant="outline" size="sm" fullWidth onClick={closePasswordModal}>Cancel</Button>
              <Button variant="solid"   size="sm" fullWidth onClick={confirmPassword}>Unlock</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Claim modal */}
      {pendingId !== null && pendingGift && (
        <div
          className={styles.modalBg}
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <Card variant="elevated" padding="md" className={styles.modal}>
            <Heading as="h2" size="md" weight="medium">Claim: {pendingGift.name}</Heading>
            <Text size="sm" secondary className={styles.modalDesc}>
              Let Tee know who's getting this for her.
            </Text>
            <Input
              ref={claimerRef}
              placeholder="Your name"
              value={claimerName}
              error={nameError}
              onChange={e => { setClaimerName(e.target.value); setNameError(''); }}
              onKeyDown={e => {
                if (e.key === 'Enter') confirmClaim();
                if (e.key === 'Escape') closeModal();
              }}
            />
            <div className={styles.modalActions}>
              <Button variant="outline" size="sm" fullWidth onClick={closeModal}>Cancel</Button>
              <Button variant="solid"   size="sm" fullWidth onClick={confirmClaim}>Confirm</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
