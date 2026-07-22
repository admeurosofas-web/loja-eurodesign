export default function Newsletter() {
  return (
    <section className="border-y border-linha bg-cream-2">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-10">
        <div>
          <p className="kicker">Fique por dentro</p>
          <h2 className="mt-4 max-w-[16ch] text-4xl md:text-5xl">
            Lançamentos e condições, antes de todo mundo.
          </h2>
        </div>

        <form className="flex flex-col gap-4" aria-label="Assinar newsletter">
          <div className="flex items-center border-b border-carvao/30 py-3 focus-within:border-ouro">
            <input
              type="email"
              required
              placeholder="Seu melhor e-mail"
              aria-label="E-mail"
              className="flex-1 bg-transparent text-sm tracking-wide outline-none placeholder:text-carvao-soft/60"
            />
            <button
              type="submit"
              className="text-[12px] uppercase tracking-[0.2em] text-ouro transition-colors hover:text-carvao"
            >
              Assinar
            </button>
          </div>
          <p className="text-xs text-carvao-soft/70">
            Ao assinar, você concorda em receber comunicações da EuroDesign. Cancele quando quiser.
          </p>
        </form>
      </div>
    </section>
  );
}
