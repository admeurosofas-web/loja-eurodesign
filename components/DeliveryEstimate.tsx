type Props = {
  status?: 'in-stock' | 'made-to-order' | 'pre-order';
  minDays?: number;
  maxDays?: number;
};

const LABELS: Record<NonNullable<Props['status']>, { label: string; dot: string; text: string }> = {
  'in-stock': {
    label: 'Pronta entrega',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
  },
  'made-to-order': {
    label: 'Sob encomenda',
    dot: 'bg-ouro',
    text: 'text-carvao',
  },
  'pre-order': {
    label: 'Pré-venda',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
  },
};

export default function DeliveryEstimate({
  status = 'made-to-order',
  minDays = 25,
  maxDays = 45,
}: Props) {
  const { label, dot, text } = LABELS[status];
  return (
    <div className="flex items-center gap-3 rounded-lg border border-linha bg-cream-2/40 px-4 py-3">
      <span className={`relative flex h-2.5 w-2.5 shrink-0`}>
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`} />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dot}`} />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-xs font-medium uppercase tracking-[0.14em] ${text}`}>{label}</p>
        <p className="text-xs text-carvao-soft">
          Prazo de produção: <span className="text-carvao">{minDays} a {maxDays} dias úteis</span>
        </p>
      </div>
    </div>
  );
}
