'use client';

import Link from 'next/link';
import { useState } from 'react';

const views = [
  { label: 'Frente', image: '/images/gemini-atelier/gemini-atelier-frente.png', atelier: true },
  { label: 'Lateral esquerda', image: '/images/gemini-fotos/gemini-lateral-esquerda.png' },
  { label: 'Lateral direita', image: '/images/gemini-fotos/gemini-lateral-direita.png' },
  { label: 'Traseira', image: '/images/gemini-fotos/gemini-traseira.png' },
  { label: 'Mecanismo', image: '/images/gemini-fotos/gemini-mecanismo.png' },
  { label: 'Reclinada', image: '/images/gemini-aberta/gemini-aberta-lateral-direita.png' },
];

export default function GeminiExperience() {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const current = views[selected];

  return (
    <section className="gemini-section">
      <div className="gemini-layout">
        <div className="gemini-content">
          <span className="eyebrow">EURODESIGN · EXPERIÊNCIA INTERATIVA</span>
          <h2>Poltrona <em>Gemini</em></h2>
          <p className="description">
            Design sofisticado, conforto excepcional e tecnologia
            para transformar seus momentos de descanso.
          </p>

          <div className="features">
            <p>✓ Couro 100% legítimo</p>
            <p>✓ Totalmente elétrica</p>
            <p>✓ USB grátis</p>
          </div>

          <a
            className="contact"
            href="https://wa.me/5511913371140?text=Ol%C3%A1%21%20Quero%20saber%20mais%20sobre%20a%20Poltrona%20Gemini."
            target="_blank"
            rel="noopener noreferrer"
          >
            FALE COM UM VENDEDOR ↗
          </a>

          <Link
            className="details"
            href="/produtos/poltrona-gemini-reclinavel-eletrica-fixa"
          >
            Ver detalhes do produto →
          </Link>
        </div>

        <div className="gallery">
          <div className={`stage ${current.atelier ? 'atelier' : 'white'} ${fullscreen ? 'fullscreen' : ''}`}>
            <span className="gallery-label">● GALERIA INTERATIVA</span>
            <img
              src={current.image}
              alt={`Poltrona Gemini — ${current.label}`}
              className={current.atelier ? 'atelier-image' : 'product-image'}
              style={{ transform: `scale(${zoom})` }}
            />
            <div className="controls">
              <button onClick={() => { setSelected(0); setZoom(1); }}>⟳</button>
              <button onClick={() => setZoom(z => Math.min(2, z + 0.2))}>+</button>
              <button onClick={() => setZoom(z => Math.max(1, z - 0.2))}>−</button>
              <button onClick={() => setFullscreen(f => !f)}>{fullscreen ? '×' : '⛶'}</button>
            </div>
          </div>

          <div className="thumbnails">
            {views.map((view, index) => (
              <button
                key={view.label}
                className={`thumbnail ${selected === index ? 'active' : ''}`}
                onClick={() => { setSelected(index); setZoom(1); }}
              >
                <img
                  src={view.atelier
                    ? '/images/gemini-fotos/gemini-frente.png'
                    : view.image}
                  alt=""
                />
                <span>{view.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-features">
        <div>✧ <strong>Couro 100% legítimo</strong><small>Qualidade e durabilidade.</small></div>
        <div>ϟ <strong>Totalmente elétrica</strong><small>Reclinação personalizada.</small></div>
        <div>✦ <strong>USB grátis</strong><small>Praticidade no seu dia a dia.</small></div>
      </div>

      <style jsx>{`
        .gemini-section{background:#f7f5f0;padding:64px 4%;color:#24211c}
        .gemini-layout{max-width:1600px;margin:auto;display:grid;grid-template-columns:minmax(260px,.74fr) minmax(0,2.26fr);gap:32px;align-items:center}
        .eyebrow{color:#a58b5b;font-size:10px;font-weight:800;letter-spacing:2px}
        h2{font-size:clamp(44px,5vw,78px);font-weight:400;line-height:1.05;letter-spacing:-3px;margin:25px 0}
        h2 em{display:block;color:#a58b5b;font-style:normal;font-weight:300}
        .description{color:#5e5b55;font-size:15px;line-height:1.8;max-width:340px}
        .features{margin:28px 0;color:#443d33;font-size:14px}
        .features p{margin:15px 0}
        .contact{display:inline-block;background:#f2cd16;color:#181818;text-decoration:none;padding:19px 22px;border-radius:7px;font-size:12px;font-weight:800}
        .details{display:block;margin-top:18px;color:#38332c;text-decoration:none;font-size:13px}
        .gallery{display:grid;grid-template-columns:minmax(0,1fr) minmax(168px,24%);gap:18px;min-width:0}
        .stage{height:470px;position:relative;border-radius:20px;overflow:hidden;display:flex;align-items:center;justify-content:center}
        .stage.atelier{background:#c9aa8d}
        .stage.white{background:#fff}
        .stage.fullscreen{position:fixed;inset:0;z-index:9999;width:100vw;height:100dvh;border-radius:0}
        .atelier-image{width:100%;height:100%;object-fit:cover}
        .product-image{width:94%;height:90%;object-fit:contain;filter:drop-shadow(0 18px 13px rgba(30,24,18,.13))}
        .gallery-label{position:absolute;top:20px;left:20px;z-index:2;background:#fff;border-radius:25px;padding:12px 16px;font-size:10px;font-weight:800}
        .controls{position:absolute;bottom:15px;right:15px;z-index:2;display:flex;flex-direction:column;gap:6px}
        .controls button{width:39px;height:39px;border:0;border-radius:9px;background:#fff;font-size:20px;cursor:pointer}
        .thumbnails{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:12px}
        .thumbnail{position:relative;border:1px solid #e2d5c5;border-radius:17px;background:#e9e0d5;overflow:hidden;cursor:pointer;min-height:0}
        .thumbnail.active{border:2px solid #a87917;background:#fffdf9}
        .thumbnail img{width:94%;height:78%;object-fit:contain}
        .thumbnail span{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);white-space:nowrap;background:#fffdf9;border-radius:20px;padding:6px 8px;font-size:10px}
        .bottom-features{max-width:1600px;margin:24px auto 0;background:#f0e9df;border-radius:17px;padding:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;text-align:center}
        .bottom-features strong{font-size:14px}
        .bottom-features small{display:block;color:#81796f;margin-top:5px}
        @media(max-width:950px){.gemini-layout{grid-template-columns:1fr}.gallery{grid-template-columns:minmax(0,1fr) 25%}}
        @media(max-width:620px){.gemini-section{padding:42px 18px}.gallery{grid-template-columns:1fr}.stage{height:auto;aspect-ratio:1/.94}.thumbnails{grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,110px);gap:8px}.bottom-features{grid-template-columns:1fr;text-align:left}}
      `}</style>
    </section>
  );
}
