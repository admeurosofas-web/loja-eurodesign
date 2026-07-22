export default function ConfigNotice() {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-ouro/30 bg-ouro/5 p-8 text-center">
      <h1 className="text-xl font-bold text-ouro-l">Storefront ainda não conectado</h1>
      <p className="mt-3 text-sm text-neutral-300">
        Preencha o arquivo <code className="rounded bg-black/40 px-1.5 py-0.5">.env.local</code> com:
      </p>
      <ul className="mx-auto mt-4 max-w-sm space-y-2 text-left text-sm text-neutral-400">
        <li>
          <b className="text-neutral-200">SHOPIFY_STORE_DOMAIN</b> — o domínio{" "}
          <code>.myshopify.com</code> da loja
        </li>
        <li>
          <b className="text-neutral-200">SHOPIFY_STOREFRONT_ACCESS_TOKEN</b> — token da Storefront
          API (Admin → Develop apps)
        </li>
      </ul>
      <p className="mt-4 text-xs text-neutral-500">
        Depois reinicie o servidor (<code>npm run dev</code>).
      </p>
    </div>
  );
}
