import Reveal from '@/components/Reveal';

export default function ShowroomSection() {
  return (
    <section id="showroom" className="bg-carvao text-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-24 text-center lg:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-ouro-l">
            Visite o showroom
          </p>
          <h2 className="mx-auto mt-6 max-w-[20ch] text-4xl text-cream md:text-6xl">
            Sente-se. É outra conversa pessoalmente.
          </h2>
          <p className="mx-auto mt-6 max-w-[42ch] text-cream/70">
            Rod. Anchieta, 1113 — Sacomã, São Paulo · Seg a Sáb 9h–18h,
            Domingo 10h–17h.
          </p>
          <a
            href="https://wa.me/5511913371140"
            target="_blank"
            rel="noopener"
            className="rounded-lg mt-10 inline-block border border-cream/40 px-9 py-4 text-[12px] uppercase tracking-[0.2em] hover:duration-300 hover:ease-in-out hover:transition-colors hover:border-ouro-l hover:text-ouro-l"
          >
            Agendar uma visita
          </a>
        </Reveal>
      </div>
    </section>
  );
}
