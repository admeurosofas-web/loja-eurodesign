import Link from "next/link";

export const metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="kicker">Erro 404</p>
      <h1 className="mt-5 font-serif text-5xl md:text-6xl">Página não encontrada</h1>
      <p className="mt-5 max-w-md text-carvao-soft">
        A peça que você procura pode ter sido removida do catálogo ou está indisponível
        no momento.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block border border-carvao bg-carvao px-8 py-3 text-[12px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-marca hover:border-marca hover:text-carvao"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
