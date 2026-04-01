import React, { useState, useEffect } from 'react';

const customStyles = {
  bgLayer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -2,
    backgroundImage: `
      radial-gradient(circle at 10% 0%, #db5e1e 0%, transparent 45%),
      radial-gradient(circle at 80% 10%, #e8a22d 0%, transparent 55%),
      radial-gradient(circle at 20% 50%, #68a87b 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, #b1d8d3 0%, transparent 60%),
      radial-gradient(circle at 10% 100%, #e6d370 0%, transparent 50%),
      radial-gradient(circle at 90% 100%, #5d7e82 0%, transparent 60%)
    `,
  },
  noiseLayer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    opacity: 0.55,
    pointerEvents: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    mixBlendMode: 'overlay',
  },
  appWrapper: {
    width: '100%',
    paddingTop: '10vh',
  },
  hLine: {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(12, 12, 12, 0.85)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  header: {
    paddingBottom: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  h1: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.2,
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    fontWeight: 400,
    marginBottom: '2rem',
  },
  headerActions: {
    display: 'flex',
    gap: '2rem',
    paddingBottom: '0.25rem',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#0c0c0c',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: '1rem',
    cursor: 'pointer',
    padding: 0,
    position: 'relative',
  },
  listHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 80px',
    gap: '1rem',
    padding: '1rem 0',
    opacity: 0.7,
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  listRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 80px',
    gap: '1rem',
    padding: '2rem 0',
    position: 'relative',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
  },
  itemName: {
    fontSize: '1.125rem',
    fontWeight: 400,
  },
  itemPrice: {
    fontFamily: 'monospace',
    fontSize: '1rem',
  },
  itemStatus: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  statusDot: {
    fontSize: '0.8rem',
    color: '#0c0c0c',
    cursor: 'pointer',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemForm: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 80px',
    gap: '1rem',
    padding: '2rem 0',
    position: 'relative',
  },
  input: {
    background: 'transparent',
    border: 'none',
    color: '#0c0c0c',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: '1.125rem',
    padding: '0.5rem 0',
    outline: 'none',
    width: '100%',
  },
  inputGroup: {
    position: 'relative',
    paddingBottom: '1px',
  },
  footer: {
    marginTop: '10vh',
    padding: '2rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const HLine = ({ style }) => (
  <div style={{ ...customStyles.hLine, ...style }} />
);

const StatusDot = ({ status, onClick, isFooter }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...customStyles.statusDot,
        cursor: isFooter ? 'default' : 'pointer',
        opacity: hovered && !isFooter ? 0.6 : 1,
        transition: 'opacity 0.2s',
      }}
      onClick={!isFooter ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {status === 'reserved' || status === 'purchased' ? '●' : '○'}
    </div>
  );
};

const WishlistRow = ({ item, onToggleStatus }) => {
  const [hovered, setHovered] = useState(false);
  const isPurchased = item.status === 'purchased';

  return (
    <div
      style={{
        ...customStyles.listRow,
        opacity: isPurchased ? 0.6 : 1,
        backgroundColor: hovered ? 'rgba(0,0,0,0.03)' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          ...customStyles.itemName,
          textDecoration: isPurchased ? 'line-through' : 'none',
        }}
      >
        {item.name}
      </div>
      <div style={customStyles.itemPrice}>{item.price}</div>
      <div>
        <ItemLink href={item.url} label={item.store} />
      </div>
      <div style={customStyles.itemStatus}>
        <StatusDot
          status={item.status}
          onClick={() => onToggleStatus(item.id)}
        />
      </div>
      <HLine style={{ position: 'absolute', bottom: 0, left: 0 }} />
    </div>
  );
};

const ItemLink = ({ href, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: 'inherit',
        textDecoration: 'none',
        position: 'relative',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <span
        style={{
          position: 'absolute',
          width: '100%',
          height: '1px',
          bottom: '-2px',
          left: 0,
          backgroundColor: 'rgba(12, 12, 12, 0.85)',
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.2s',
          display: 'block',
        }}
      />
    </a>
  );
};

const InputGroup = ({ children, style }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div
      style={{ ...customStyles.inputGroup, ...style }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(12, 12, 12, 0.85)',
          opacity: focused ? 1 : 0.2,
          transition: 'opacity 0.2s',
          display: 'block',
        }}
      />
    </div>
  );
};

const HeaderButton = ({ children, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={customStyles.button}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          width: '100%',
          height: '1px',
          bottom: '-2px',
          left: 0,
          backgroundColor: '#0c0c0c',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: hovered ? 'bottom left' : 'bottom right',
          transition: 'transform 0.25s ease-out',
          display: 'block',
        }}
      />
    </button>
  );
};

const AddItemButton = ({ children, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        ...customStyles.button,
        fontSize: '0.875rem',
        fontWeight: 400,
        justifySelf: 'end',
        alignSelf: 'center',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          width: '100%',
          height: '1px',
          bottom: '-2px',
          left: 0,
          backgroundColor: '#0c0c0c',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: hovered ? 'bottom left' : 'bottom right',
          transition: 'transform 0.25s ease-out',
          display: 'block',
        }}
      />
    </button>
  );
};

const initialItems = [
  {
    id: 1,
    name: 'Sony WH-1000XM5 Headphones',
    price: '€ 329.00',
    store: 'sony.com',
    url: '#',
    status: 'available',
  },
  {
    id: 2,
    name: 'Aalto Vase 160mm, Clear',
    price: '€ 165.00',
    store: 'iittala.com',
    url: '#',
    status: 'reserved',
  },
  {
    id: 3,
    name: 'Aesop Resurrection Duet',
    price: '€ 110.00',
    store: 'aesop.com',
    url: '#',
    status: 'purchased',
  },
  {
    id: 4,
    name: 'Hario V60 Copper Dripper',
    price: '€ 65.00',
    store: 'hario-europe.com',
    url: '#',
    status: 'available',
  },
  {
    id: 5,
    name: 'Coffee Table Art Book (Assorted)',
    price: '€ 40.00 - € 80.00',
    store: 'taschen.com',
    url: '#',
    status: 'available',
  },
];

const App = () => {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({ name: '', price: '', url: '' });
  const [editMode, setEditMode] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        color: #0c0c0c;
        background-color: #b1d8d3;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
      }
      input::placeholder { color: rgba(12, 12, 12, 0.4); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleToggleStatus = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (item.status === 'available') return { ...item, status: 'reserved' };
        if (item.status === 'reserved') return { ...item, status: 'available' };
        if (item.status === 'purchased') return { ...item, status: 'available' };
        return item;
      })
    );
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;
    const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const urlText = newItem.url.trim();
    let storeName = '';
    if (urlText) {
      try {
        storeName = new URL(urlText).hostname.replace('www.', '');
      } catch {
        storeName = urlText;
      }
    }
    setItems((prev) => [
      ...prev,
      {
        id: nextId,
        name: newItem.name.trim(),
        price: newItem.price.trim() || '—',
        store: storeName || '—',
        url: urlText || '#',
        status: 'available',
      },
    ]);
    setNewItem({ name: '', price: '', url: '' });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={customStyles.bgLayer} />
      <div style={customStyles.noiseLayer} />

      <div style={customStyles.appWrapper}>
        <HLine />

        <header style={{ ...customStyles.header, ...customStyles.container }}>
          <div>
            <h1 style={customStyles.h1}>Birthday 30</h1>
            <div style={customStyles.subtitle}>Wishlist collection</div>
          </div>
          <div style={customStyles.headerActions}>
            <div style={{ position: 'relative' }}>
              <HeaderButton onClick={handleShare}>Share list</HeaderButton>
              {shareTooltip && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#0c0c0c',
                    color: '#fff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  Link copied!
                </div>
              )}
            </div>
            <HeaderButton onClick={() => setEditMode((e) => !e)}>
              {editMode ? 'Done' : 'Edit mode'}
            </HeaderButton>
          </div>
        </header>

        <HLine />

        <main style={customStyles.container}>
          <div style={customStyles.listHeader}>
            <div>Item</div>
            <div>Estimated Price</div>
            <div>Store</div>
            <div style={{ textAlign: 'right' }}>Status</div>
          </div>
          <HLine style={{ opacity: 0.3 }} />

          <div style={customStyles.addItemForm}>
            <InputGroup>
              <input
                type="text"
                placeholder="Add new item..."
                style={customStyles.input}
                value={newItem.name}
                onChange={(e) => setNewItem((n) => ({ ...n, name: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
            </InputGroup>
            <InputGroup>
              <input
                type="text"
                placeholder="€ 0.00"
                style={{ ...customStyles.input, fontFamily: 'monospace' }}
                value={newItem.price}
                onChange={(e) => setNewItem((n) => ({ ...n, price: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
            </InputGroup>
            <InputGroup>
              <input
                type="url"
                placeholder="URL"
                style={customStyles.input}
                value={newItem.url}
                onChange={(e) => setNewItem((n) => ({ ...n, url: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
            </InputGroup>
            <AddItemButton onClick={handleAddItem}>Add</AddItemButton>
            <HLine />
          </div>

          {items.map((item) => (
            <WishlistRow
              key={item.id}
              item={item}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </main>

        <footer style={{ ...customStyles.footer, ...customStyles.container }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 400 }}>User.Account</div>
          <StatusDot status="reserved" isFooter={true} />
        </footer>
        <HLine />
      </div>
    </div>
  );
};

export default App;