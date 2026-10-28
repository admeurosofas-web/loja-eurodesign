
import Link from 'next/link';
import { getProducts, isConfigured } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import ConfigNotice from '@/components/ConfigNotice';

export const revalidate = 60;

export const metadata = {
  title: 'Showroom',
  description:
    'Sofás e poltronas de couro legítimo EuroDesign. Reclináveis, Chesterfield, conjuntos e poltronas — direto da fábrica.',
};

const CATEGORIAS = [
  { q: '', label: 'Todos' },
  { q: 'sofá', label: 'Sofás' },
  { q: 'poltrona', label: 'Poltronas' },
  { q: 'reclinável', label: 'Reclináveis' },
  { q: 'chesterfield', label: 'Chesterfield' },
  { q: 'conjunto', label: 'Conjuntos' },
];

const ORDENAR: Record<
  string,
  { sortKey: string; reverse: boolean; label: string }
> = {
  recentes: {
    sortKey: 'CREATED_AT',
    reverse: true,
    label: 'Novidades',
  },
  'preco-asc': {
    sortKey: 'PRICE',
    reverse: false,
    label: 'Menor preço',
  },
  'preco-desc': {
    sortKey: 'PRICE',
    reverse: true,
    label: 'Maior preço',
  },
  nome: {
    sortKey: 'TITLE',
    reverse: false,
    label: 'Nome A–Z',
  },
};

function href(q: string, ordenar?: string) {
  const params = new URLSearchParams();

  if (q) {
    params.set('q', q);
  }

  if (ordenar && ordenar !== 'recentes') {
    params.set('ordenar', ordenar);
  }

  const s = params.toString();

  return s ? `/produtos?${s}` : '/produtos';
}

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    ordenar?: string;
  }>;
}) {
  if (!isConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <ConfigNotice />
      </div>
    );
  }

  const { q = '', ordenar = 'recentes' } = await searchParams;

  const ord = ORDENAR[ordenar] ?? ORDENAR.recentes;

  /*
   * =====================================================
   * BUSCA NORMAL DOS PRODUTOS
   * =====================================================
   */
  let products = await getProducts({
    first: 48,
    query: q,
    sortKey: ord.sortKey,
    reverse: ord.reverse,
  });

  /*
   * =====================================================
   * POLTRONAS
   * =====================================================
   *
   * Na categoria Poltronas deve aparecer
   * exclusivamente a Poltrona Gemini.
   */
  if (q.toLowerCase() === 'poltrona') {
    const geminiProducts = await getProducts({
      first: 10,
      query: 'Gemini',
      sortKey: ord.sortKey,
      reverse: ord.reverse,
    });

    products = geminiProducts.filter((product) => {
      const titulo = product.title.trim().toLowerCase();
      const handle = product.handle.trim().toLowerCase();

      return (
        titulo.includes('gemini') ||
        handle.includes('gemini')
      );
    });
  }

  /*
   * =====================================================
   * CONJUNTOS
   * =====================================================
   *
   * O modelo Star também pertence à categoria Conjuntos.
   *
   * Mantemos os produtos encontrados normalmente pelo
   * filtro "conjunto" e adicionamos o Star.
   */
  if (q.toLowerCase() === 'conjunto') {
    const starProducts = await getProducts({
      first: 10,
      query: 'Star',
      sortKey: ord.sortKey,
      reverse: ord.reverse,
    });

    const stars = starProducts.filter((product) => {
      const titulo = product.title.trim().toLowerCase();
      const handle = product.handle.trim().toLowerCase();

      return (
        titulo === 'star' ||
        handle === 'star' ||
        handle.startsWith('star-')
      );
    });

    /*
     * Junta os conjuntos encontrados normalmente
     * com o Star e elimina duplicatas.
     */
    products = [...products, ...stars].filter(
      (product, index, array) =>
        array.findIndex(
          (item) => item.id === product.id,
        ) === index,
    );
  }

  /*
   * =====================================================
   * RECLINÁVEIS
   * =====================================================
   *
   * Somente os seguintes modelos:
   *
   * - Lumin
   * - Magnus
   * - Stylo
   *
   * Não incluir:
   * - Gaby
   * - York
   * - Bellatrix
   * - Outros modelos
   *
   * A categoria utiliza uma lista exclusiva.
   */
  if (q.toLowerCase() === 'reclinável') {
    const modelosReclinaveis = [
      'Lumin',
      'Magnus',
      'Stylo',
    ];

    /*
     * Busca os três modelos individualmente
     * na Shopify.
     */
    const resultados = await Promise.all(
      modelosReclinaveis.map((modelo) =>
        getProducts({
          first: 20,
          query: modelo,
          sortKey: ord.sortKey,
          reverse: ord.reverse,
        }),
      ),
    );

    /*
     * Confere os nomes dos modelos.
     *
     * Aceita títulos como:
     * "Lumin"
     * "Sofá Lumin"
     * "Sofá Reclinável Lumin"
     *
     * E identificadores como:
     * "lumin"
     * "sofa-lumin"
     * "sofa-reclinavel-lumin"
     */
    const ehModeloPermitido = (
      product: (typeof products)[number],
    ) => {
      const titulo = product.title
        .trim()
        .toLowerCase();

      const handle = product.handle
        .trim()
        .toLowerCase();

      return modelosReclinaveis.some((modelo) => {
        const nome = modelo.toLowerCase();

        const padrao = new RegExp(
          `(^|[^a-z])${nome}([^a-z]|$)`,
        );

        return (
          padrao.test(titulo) ||
          padrao.test(handle)
        );
      });
    };

    /*
     * Substitui os resultados anteriores
     * exclusivamente pelos três modelos.
     *
     * Remove eventuais produtos duplicados.
     */
    products = resultados
      .flat()
      .filter(ehModeloPermitido)
      .filter(
        (product, index, array) =>
          array.findIndex(
            (item) => item.id === product.id,
          ) === index,
      );

    /*
     * Mantém a ordenação selecionada
     * para os produtos desta categoria.
     */
    if (ordenar === 'nome') {
      products.sort((a, b) =>
        a.title.localeCompare(b.title, 'pt-BR'),
      );
    }
  }

  return (
    <div className="mx-auto max-w-350 px-6 py-16 mt-6 lg:px-10 lg:py-20">
      <Reveal>
        <p className="kicker">
          {q
            ? `Filtro · ${q}`
            : 'Todos os modelos'}
        </p>

        <h1 className="mt-5 text-5xl md:text-7xl">
          Showroom
        </h1>
      </Reveal>

      {/* Filtros de categoria + ordenação */}
      <div className="mt-10 flex flex-col gap-5 border-y border-linha py-5 lg:flex-row lg:items-center lg:justify-between">
        <nav
          className="flex flex-wrap gap-2"
          aria-label="Categorias"
        >
          {CATEGORIAS.map((c) => {
            const ativo = q === c.q;

            return (
              <Link
                key={c.label}
                href={href(c.q, ordenar)}
                className={`border px-4 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors rounded-lg ${
                  ativo
                    ? 'border-carvao bg-carvao text-cream'
                    : 'border-linha text-carvao-soft hover:border-carvao hover:text-carvao'
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-[12px] text-carvao-soft">
          <span className="uppercase tracking-[0.14em]">
            {products.length} peças
          </span>

          <span className="text-linha">·</span>

          <div className="flex flex-wrap gap-3">
            {Object.entries(ORDENAR).map(
              ([key, o]) => (
                <Link
                  key={key}
                  href={href(q, key)}
                  className={`transition-colors hover:text-ouro ${
                    ordenar === key
                      ? 'text-carvao underline underline-offset-4'
                      : ''
                  }`}
                >
                  {o.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Produtos */}
      {products.length === 0 ? (
        <p className="py-24 text-center text-carvao-soft">
          Nenhuma peça encontrada.
        </p>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-16 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal
              key={p.id}
              delay={(i % 3) * 80}
            >
              <ProductCard
                product={p}
                priority={i < 3}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
