'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

type ModalState = { html: string; afterOpen?: (root: HTMLElement) => void } | null;
type UI = { openModal: (html: string, afterOpen?: (root: HTMLElement) => void) => void; closeModal: () => void; toast: (msg: string) => void };

const Ctx = createContext<UI | null>(null);
export const useUI = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useUI must be used inside <UIProvider>');
  return v;
};

export default function UIProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>(null);
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const mcRef = useRef<HTMLDivElement>(null);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openModal = useCallback((html: string, afterOpen?: (root: HTMLElement) => void) => { setModal({ html, afterOpen }); setOpen(true); }, []);
  const closeModal = useCallback(() => setOpen(false), []);
  const toast = useCallback((msg: string) => {
    setToastMsg(msg); setToastOn(true);
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setToastOn(false), 2600);
  }, []);

  useEffect(() => { if (open && modal?.afterOpen && mcRef.current) modal.afterOpen(mcRef.current); }, [open, modal]);

  useEffect(() => {
    const done = () => setTimeout(() => setLoaded(true), 450);
    if (document.readyState === 'complete') done(); else window.addEventListener('load', done);
    const safety = setTimeout(() => setLoaded(true), 2500);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      setProgress(h ? scrollY / h : 0); setShowTop(scrollY > 600);
    };
    addEventListener('keydown', onKey); addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => { removeEventListener('load', done); clearTimeout(safety); removeEventListener('keydown', onKey); removeEventListener('scroll', onScroll); };
  }, []);

  const value = useMemo(() => ({ openModal, closeModal, toast }), [openModal, closeModal, toast]);
  return (
    <Ctx.Provider value={value}>
      <div id="pre" className={loaded ? 'done' : ''}>
        <div>
          <svg className="star" viewBox="0 0 100 100"><use href="#rosette" /></svg>
          <div className="t">ISLOHOTDAN NATIJAGA</div>
          <div className="bar"><i /></div>
        </div>
      </div>
      <div className="progress" style={{ width: progress * 100 + '%' }} />
      {children}
      <button id="toTop" className={showTop ? 'show' : ''} aria-label="Yuqoriga" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 52 52" style={{ position: 'absolute', inset: -2, width: 52, height: 52 }}>
          <circle cx="26" cy="26" r="24" style={{ strokeDashoffset: 151 * (1 - progress) }} />
        </svg>
        <svg viewBox="0 0 24 24" style={{ width: 20 }}><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className={'modal' + (open ? ' open' : '')} onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
        <div className="mbox">
          <button className="x" aria-label="Yopish" onClick={() => setOpen(false)}>×</button>
          <div ref={mcRef} dangerouslySetInnerHTML={{ __html: modal?.html ?? '' }} />
        </div>
      </div>
      <div className={'toast' + (toastOn ? ' show' : '')}>{toastMsg}</div>
    </Ctx.Provider>
  );
}
