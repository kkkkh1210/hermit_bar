'use client';
import React, { useState } from 'react';

const WEBHOOK_URL = '/api/order';

const MENU = [
  {
    category: 'NON-ALCOHOL COCKTAIL',
    emoji: '🍹',
    items: [
      { id: 1, name: 'THE HERMIT', sub: '바이올렛 문', price: 6500, signature: true },
      { id: 2, name: 'THE SUN', sub: '자몽 선셋 오렌지', price: 5500 },
      { id: 3, name: 'THE FOOL', sub: '모히또', price: 5500 },
      { id: 4, name: 'THE STAR', sub: '블루라군', price: 5500 },
    ],
  },
  {
    category: 'FOOD',
    emoji: '🍽️',
    items: [
      { id: 5, name: '핀초', price: 6000 },
      { id: 6, name: '참치 카나페', price: 6500 },
      { id: 7, name: '토마토 카프레제', price: 7000 },
      { id: 8, name: '조각 케이크', price: 5000 },
    ],
  },
  {
    category: 'TAROT READING',
    emoji: '🔮',
    items: [
      { id: 9, name: 'ONLY TAROT', price: 5000 },
      { id: 10, name: 'SHARING INSTAGRAM', price: 4000 },
      { id: 11, name: 'WITH MENU', price: 2000 },
    ],
  },
];

const styles = `
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

  body {
    background: #0a0010;
    font-family: 'Noto Sans KR', sans-serif;
    color: #fff;
    min-height: 100vh;
  }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  /* Background glow */
  .bg-glow {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    max-width: 480px;
    margin: 0 auto;
    pointer-events: none;
    z-index: 0;
  }
  .bg-glow::before {
    content: '';
    position: absolute;
    top: -100px; left: -100px;
    width: 350px; height: 350px;
    background: radial-gradient(circle, rgba(120,40,180,0.35) 0%, transparent 70%);
    border-radius: 50%;
  }
  .bg-glow::after {
    content: '';
    position: absolute;
    bottom: 100px; right: -80px;
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(180,60,220,0.2) 0%, transparent 70%);
    border-radius: 50%;
  }

  .content { position: relative; z-index: 1; padding-bottom: 120px; }

  /* Header */
  .header {
    padding: 40px 24px 24px;
    text-align: center;
    border-bottom: 1px solid rgba(180,100,255,0.2);
  }
  .header-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    letter-spacing: 6px;
    color: #fff;
    text-shadow: 0 0 30px rgba(200,100,255,0.8), 0 0 60px rgba(180,60,220,0.4);
    margin: 0 0 4px;
  }
  .header-sub {
    font-size: 11px;
    letter-spacing: 4px;
    color: rgba(200,150,255,0.6);
    text-transform: uppercase;
  }

  /* Table selector */
  .table-section {
    padding: 20px 24px 0;
  }
  .table-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: rgba(200,150,255,0.5);
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .table-select {
    width: 100%;
    background: rgba(120,40,180,0.15);
    border: 1px solid rgba(180,100,255,0.3);
    border-radius: 12px;
    color: #fff;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 15px;
    padding: 12px 16px;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
  }
  .table-select:focus {
    border-color: rgba(180,100,255,0.7);
    box-shadow: 0 0 0 2px rgba(180,100,255,0.15);
  }

  /* Category */
  .category-section { padding: 28px 24px 0; }
  .category-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 4px;
    color: rgba(220,170,255,0.9);
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .category-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(180,100,255,0.4), transparent);
  }

  /* Menu items */
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    margin-bottom: 8px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(180,100,255,0.1);
    border-radius: 14px;
    transition: all 0.2s ease;
    gap: 12px;
  }
  .menu-item.selected {
    background: rgba(140,60,200,0.18);
    border-color: rgba(180,100,255,0.4);
    box-shadow: 0 0 20px rgba(140,60,200,0.2);
  }
  .menu-item.signature {
    background: rgba(160,60,220,0.12);
    border-color: rgba(220,120,255,0.3);
  }

  .item-info { flex: 1; min-width: 0; }
  .item-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    letter-spacing: 2px;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .signature-badge {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 9px;
    letter-spacing: 1px;
    color: #f0b0ff;
    background: rgba(200,80,255,0.2);
    border: 1px solid rgba(200,80,255,0.4);
    border-radius: 20px;
    padding: 1px 7px;
    font-style: italic;
  }
  .item-sub {
    font-size: 12px;
    color: rgba(200,170,255,0.55);
    margin-top: 2px;
    font-weight: 300;
  }
  .item-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
    color: rgba(220,170,255,0.8);
    white-space: nowrap;
    margin-right: 8px;
  }

  /* Quantity controls */
  .qty-controls {
    display: flex;
    align-items: center;
    gap: 0;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(180,100,255,0.3);
    border-radius: 20px;
    overflow: hidden;
  }
  .qty-btn {
    width: 30px; height: 30px;
    background: transparent;
    border: none;
    color: rgba(200,150,255,0.9);
    font-size: 18px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
    line-height: 1;
  }
  .qty-btn:active { background: rgba(180,100,255,0.2); }
  .qty-num {
    min-width: 24px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  /* Cart summary */
  .cart-bar {
    position: fixed;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 480px;
    padding: 16px 24px;
    background: rgba(10,0,20,0.95);
    border-top: 1px solid rgba(180,100,255,0.25);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 100;
  }
  .cart-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .cart-count {
    font-size: 12px;
    color: rgba(200,150,255,0.6);
    letter-spacing: 2px;
  }
  .cart-total {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
    color: #fff;
    text-shadow: 0 0 15px rgba(200,100,255,0.5);
  }
  .order-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #7b2ff7, #c060ff);
    border: none;
    border-radius: 14px;
    color: #fff;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 30px rgba(140,60,220,0.5);
  }
  .order-btn:active { transform: scale(0.98); box-shadow: 0 2px 15px rgba(140,60,220,0.4); }
  .order-btn:disabled {
    background: rgba(100,60,140,0.3);
    box-shadow: none;
    cursor: not-allowed;
    color: rgba(255,255,255,0.3);
  }

  /* Success screen */
  .success-screen {
    position: fixed;
    inset: 0;
    max-width: 480px;
    margin: 0 auto;
    background: rgba(10,0,20,0.97);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 200;
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

  .success-icon {
    font-size: 70px;
    margin-bottom: 24px;
    animation: pulse 1.5s ease infinite;
  }
  @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }

  .success-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    letter-spacing: 6px;
    color: #fff;
    text-shadow: 0 0 30px rgba(200,100,255,0.8);
    margin-bottom: 8px;
  }
  .success-sub {
    font-size: 13px;
    color: rgba(200,150,255,0.6);
    letter-spacing: 2px;
    margin-bottom: 40px;
  }
  .success-btn {
    padding: 14px 40px;
    background: transparent;
    border: 1px solid rgba(180,100,255,0.5);
    border-radius: 30px;
    color: rgba(200,150,255,0.8);
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .success-btn:active { background: rgba(140,60,200,0.2); }

  /* Loading */
  .loading-dots {
    display: flex; gap: 5px; align-items: center; justify-content: center;
  }
  .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.8);
    animation: bounce 0.8s ease infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.15s; }
  .dot:nth-child(3) { animation-delay: 0.3s; }
  @keyframes bounce { 0%,100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(-4px); opacity: 1; } }
`;

export default function Page() {
  const [quantities, setQuantities] = useState({});
  const [tableNumber, setTableNumber] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const updateQty = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = MENU.flatMap(c => c.items).reduce((sum, item) => {
    return sum + (quantities[item.id] || 0) * item.price;
  }, 0);

  const handleOrder = async () => {
    if (!tableNumber) { alert('테이블 번호를 선택해주세요!'); return; }
    if (totalItems === 0) { alert('메뉴를 선택해주세요!'); return; }

    const orderItems = MENU.flatMap(c => c.items)
      .filter(item => quantities[item.id] > 0)
      .map(item => ({ name: item.name, qty: quantities[item.id], price: item.price, subtotal: quantities[item.id] * item.price }));

    setStatus('loading');
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableNumber,
          items: orderItems,
          totalPrice,
          orderTime: new Date().toLocaleString('ko-KR'),
        }),
      });
      setStatus('success');
    } catch (e) {
      setStatus('error');
      alert('주문 전송 실패. 다시 시도해주세요.');
      setStatus('idle');
    }
  };

  const resetOrder = () => {
    setQuantities({});
    setTableNumber('');
    setStatus('idle');
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-glow" />

        {status === 'success' && (
          <div className="success-screen">
            <div className="success-icon">🔮</div>
            <div className="success-title">주문 완료</div>
            <div className="success-sub">잠시 후 가져다드릴게요 ✨</div>
            <button className="success-btn" onClick={resetOrder}>새 주문하기</button>
          </div>
        )}

        <div className="content">
          <div className="header">
            <div className="header-title">HERMIT BAR</div>
            <div className="header-sub">Order & Program</div>
          </div>

          <div className="table-section">
            <div className="table-label">테이블 선택</div>
            <select
              className="table-select"
              value={tableNumber}
              onChange={e => setTableNumber(e.target.value)}
            >
              <option value="">테이블 번호를 선택하세요</option>
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={`T${n}`}>테이블 {n}</option>
              ))}
            </select>
          </div>

          {MENU.map(category => (
            <div key={category.category} className="category-section">
              <div className="category-title">
                <span>{category.emoji}</span>
                {category.category}
              </div>
              {category.items.map(item => (
                <div
                  key={item.id}
                  className={`menu-item ${quantities[item.id] ? 'selected' : ''} ${item.signature ? 'signature' : ''}`}
                >
                  <div className="item-info">
                    <div className="item-name">
                      {item.name}
                      {item.signature && <span className="signature-badge">signature</span>}
                    </div>
                    {item.sub && <div className="item-sub">{item.sub}</div>}
                  </div>
                  <div className="item-price">{item.price.toLocaleString()}</div>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-num">{quantities[item.id] || 0}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="cart-bar">
          <div className="cart-info">
            <span className="cart-count">{totalItems > 0 ? `${totalItems}개 선택됨` : '메뉴를 선택하세요'}</span>
            <span className="cart-total">₩ {totalPrice.toLocaleString()}</span>
          </div>
          <button
            className="order-btn"
            onClick={handleOrder}
            disabled={status === 'loading' || totalItems === 0}
          >
            {status === 'loading' ? (
              <span className="loading-dots">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </span>
            ) : '주문하기'}
          </button>
        </div>
      </div>
    </>
  );
}
