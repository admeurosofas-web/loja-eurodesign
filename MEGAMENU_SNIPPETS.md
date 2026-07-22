# Megamenu - Snippets de Referência Rápida

## 1. Adicionar Nova Featured Collection

**Passo 1**: Adicione em `FEATURED_COLLECTIONS`
```typescript
const FEATURED_COLLECTIONS = [
  // Existentes...
  {
    id: 'sectional-sofas',
    title: 'Sofás Seccionais',
    description: 'Modulares para espaços grandes com máximo conforto',
    href: '/produtos?q=seccional',
    icon: 'sofa-section', // novo icon
  },
];
```

**Passo 2**: Adicione o SVG em `FeaturedIcon()`
```typescript
function FeaturedIcon({ icon }: { icon: string }): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    // Existentes...
    'sofa-section': (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M3 12h3v6H3v-6zm4 0h6v6H7v-6zm7 0h3v6h-3v-6zm0-2v2h3V10h-3z" />
      </svg>
    ),
  };
  return icons[icon] || null;
}
```

---

## 2. Customizar Cores

### Option A: Tailwind Config
**Arquivo**: `tailwind.config.ts`
```typescript
export default {
  theme: {
    extend: {
      colors: {
        carvao: '#0d0d0d',   // Dark charcoal
        cream: '#f5f3f0',    // Cream
        marca: '#FF6B35',    // Custom orange (exemplo)
      },
    },
  },
};
```

### Option B: Modificar Card Hover Color (inline)
**Antes** (laranja padrão):
```html
hover:border-marca/40
from-marca/20 to-marca/5
group-hover:text-marca/80
```

**Depois** (customizado):
```html
hover:border-yellow-400/40
from-yellow-400/20 to-yellow-400/5
group-hover:text-yellow-400/80
```

---

## 3. Trocar Featured Icon por Imagem Real

**Atual (SVG icon)**:
```typescript
<div className="flex items-center justify-center w-full h-20 
                bg-gradient-to-br from-marca/20 to-marca/5 
                rounded-lg mb-3 text-marca/60">
  <FeaturedIcon icon={collection.icon} />
</div>
```

**Novo (Next.js Image)**:
```typescript
import Image from 'next/image';

// No FEATURED_COLLECTIONS, adicione image URL:
{
  id: 'sofas-premium',
  title: 'Sofás Premium',
  image: '/images/sofas-premium.jpg', // Adicionar
  href: '/produtos?q=sofá',
  // ...
}

// No Card:
<div className="relative w-full h-24 rounded-lg mb-3 overflow-hidden">
  <Image
    src={collection.image}
    alt={collection.title}
    fill
    className="object-cover group-hover:scale-105 transition-transform"
  />
</div>
```

---

## 4. Ajustar Tamanho do Megamenu

**Aumentar largura**:
```typescript
// De: w-[900px]
// Para:
<div className="absolute left-0 top-12 w-[1000px] max-w-[calc(100vw-20px)]">
```

**Aumentar altura**:
```typescript
// De: lg:h-96
// Para:
<div className="flex flex-col lg:flex-row lg:h-[450px]">
```

**Ajustar grid de cards**:
```typescript
// De: grid-cols-1 md:grid-cols-3
// Para (4 cards):
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
```

---

## 5. Modificar Animação de Entrada

**Atual**:
```html
animate-in fade-in slide-in-from-top-2 duration-200
```

**Alternativas**:
```html
<!-- Mais suave (fade only) -->
animate-in fade-in duration-300

<!-- Slide da esquerda -->
animate-in fade-in slide-in-from-left-4 duration-300

<!-- Zoom in -->
animate-in fade-in zoom-in-95 duration-300
```

---

## 6. Adicionar Descrição Expandida (Tooltip)

**Em cada card**:
```typescript
<div className="group relative">
  {/* Card content */}
  
  {/* Tooltip */}
  <div className="absolute bottom-full left-0 mb-2 p-3 bg-carvao/95 border border-cream/20 
                  rounded-lg text-xs text-cream whitespace-nowrap hidden group-hover:block
                  shadow-lg z-50">
    Coleção premium de {collection.title}
  </div>
</div>
```

---

## 7. Integrar Links de Categoria

**Adicionar links diretos no FEATURED_COLLECTIONS**:
```typescript
{
  id: 'sofas-premium',
  title: 'Sofás Premium',
  description: 'Conforto máximo...',
  href: '/produtos?q=sofá',
  sublinks: [ // NOVO
    { label: 'Sofás 2-lugares', href: '/produtos?q=sofá&tipo=2-lugares' },
    { label: 'Sofás 3-lugares', href: '/produtos?q=sofá&tipo=3-lugares' },
  ],
}
```

**Renderizar sublinks no card**:
```typescript
{collection.sublinks && (
  <div className="mt-2 pt-2 border-t border-cream/10 space-y-1">
    {collection.sublinks.map((link) => (
      <Link key={link.href} href={link.href} 
            className="text-xs text-cream/50 hover:text-cream">
        {link.label}
      </Link>
    ))}
  </div>
)}
```

---

## 8. Mobile-First Customização

**Mostrar/esconder seções por breakpoint**:
```typescript
{/* Mostrar footer apenas em mobile */}
<div className="md:hidden">
  {/* Footer content */}
</div>

{/* Mostrar coluna de coleções apenas em desktop */}
<div className="hidden lg:block lg:w-1/4">
  {/* Coleções */}
</div>
```

**Ajustar padding em mobile**:
```typescript
<div className="px-4 py-4 lg:px-6 lg:py-6">
  {/* Content */}
</div>
```

---

## 9. Adicionar Badge de "Novo" ou "Promoção"

**Em cada card**:
```typescript
<div className="absolute top-2 right-2">
  {collection.badge && (
    <span className="px-2 py-1 bg-marca text-carvao text-xs font-bold rounded">
      {collection.badge}
    </span>
  )}
</div>
```

**Dados**:
```typescript
{
  id: 'sofas-premium',
  title: 'Sofás Premium',
  badge: 'NOVO', // ou 'PROMOÇÃO'
  // ...
}
```

---

## 10. Analytics / Tracking

**Adicionar ao Link**:
```typescript
<Link
  href={collection.href}
  onClick={(e) => {
    // Custom tracking
    gtag?.event('megamenu_card_click', {
      collection_id: collection.id,
      collection_title: collection.title,
    });
    setMenuOpen(false);
  }}
>
  {/* Card content */}
</Link>
```

---

## Quick Copy-Paste Blocks

### Novo Card Minimal
```typescript
{
  id: 'novo-id',
  title: 'Novo Título',
  description: 'Descrição breve do produto',
  href: '/produtos?q=novo',
  icon: 'sofa', // ou outro icon
}
```

### Novo Featured Icon SVG
```typescript
novoicon: (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
          d="M YOUR_D_PATH_HERE" />
  </svg>
),
```

### CSS Hover State Customizado
```css
/* Em Tailwind */
@layer components {
  .card-featured {
    @apply group relative flex flex-col bg-gradient-to-br from-cream/10 to-cream/5 
           border border-cream/20 rounded-lg p-4 
           hover:border-marca/40 hover:from-cream/15 hover:to-cream/8 
           transition-all duration-300;
  }
}
```

---

## Debug / Troubleshooting

### Menu não fecha ao clicar fora
```typescript
// Verificar menuRef
console.log('menuRef.current:', menuRef.current);

// Verificar se click está sendo capturado
function handleClickOutside(e: MouseEvent) {
  console.log('Clicked element:', e.target);
  if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
    setMenuOpen(false);
  }
}
```

### Cards estão cortados em mobile
```typescript
// Aumentar max-width responsivo
max-w-[calc(100vw-40px)] // ao invés de 20px
```

### Icones não aparecem
```typescript
// Verificar className dos SVGs
// Deve ter: w-12 h-12 (ou w-5 h-5 para social icons)
```

---

## Referência de Arquivo
- 📄 **Principal**: `/components/Header.tsx` (269 linhas)
- 📖 **Docs**: `/MEGAMENU_REFACTORING.md`
- 🔧 **Snippets**: Este arquivo
