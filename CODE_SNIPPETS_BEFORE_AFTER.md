# Code Snippets - Before & After Mobile Optimization

## 1. BOTÃO HAMBURGER (Touch Target)

### ANTES: 36px (Abaixo do mínimo)
```tsx
<button
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
  aria-expanded={menuOpen}
  className="w-9 h-9 flex items-center justify-center text-cream 
             hover:text-marca transition-colors"
>
```

### DEPOIS: 48px (Conforme padrão iOS/Android)
```tsx
<button
  onClick={toggleMenu}
  aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
  aria-expanded={menuOpen}
  aria-controls="mobile-menu"
  className="w-12 h-12 flex items-center justify-center text-cream 
             hover:text-marca active:text-marca active:scale-95 
             transition-all duration-200 rounded-lg hover:bg-cream/5 
             active:bg-cream/10"
>
```

**Mudanças:**
- ✅ w-9 h-9 → w-12 h-12 (36px → 48px)
- ✅ Adiciona active:text-marca (feedback tátil)
- ✅ Adiciona active:scale-95 (escala ao pressionar)
- ✅ Adiciona aria-controls="mobile-menu"
- ✅ Usa toggleMenu callback memoizado
- ✅ Adiciona hover:bg-cream/5 active:bg-cream/10 (background visual)

---

## 2. MEGAMENU COM SCROLL EM MOBILE

### ANTES: Sem limite de altura
```tsx
{menuOpen && (
  <div className="absolute left-0 top-12 min-w-[90vw] max-w-2xl 
                   bg-gradient-to-b from-carvao/98 to-carvao/95 
                   backdrop-blur-xl border border-cream/15 rounded-2xl 
                   shadow-2xl overflow-visible z-50 md:max-w-4xl"
       style={{ animation: 'fadeInDown 0.2s ease-out' }}>
    <div className="p-8 md:p-10">
```

### DEPOIS: Com scroll responsivo + padding adaptável
```tsx
{menuOpen && (
  <div
    id="mobile-menu"
    className="absolute left-0 top-12 min-w-[90vw] max-w-2xl 
               max-h-[80vh] bg-gradient-to-b from-carvao/98 to-carvao/95 
               backdrop-blur-xl border border-cream/15 rounded-2xl shadow-2xl 
               overflow-y-auto z-50 md:max-w-4xl md:max-h-none 
               md:overflow-visible"
    style={{ animation: 'fadeInDown 0.2s ease-out' }}
  >
    <div className="p-5 sm:p-6 md:p-10">
```

**Mudanças:**
- ✅ Adiciona id="mobile-menu" (acessibilidade)
- ✅ Adiciona max-h-[80vh] (limite de altura em mobile)
- ✅ Adiciona overflow-y-auto (scroll ativado)
- ✅ Adiciona md:max-h-none md:overflow-visible (desktop sem scroll)
- ✅ Padding responsivo: p-5 → sm:p-6 → md:p-10

---

## 3. ESPAÇAMENTO RESPONSIVO - GRID

### ANTES: Gaps fixos
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
```

### DEPOIS: Gaps responsivos para mobile pequenininho
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
```

**Mudanças:**
- ✅ Adiciona gap-4 (16px) para mobile (<640px)
- ✅ Mantém sm:gap-6 (24px) para tablets pequenos
- ✅ Mantém md:gap-8 (32px) para desktops

---

## 4. CARDS DE COLEÇÃO - Tap Feedback

### ANTES: Apenas hover
```tsx
<Link
  key={collection.id}
  href={collection.href}
  onClick={() => setMenuOpen(false)}
  className="group flex flex-col p-5 rounded-xl border border-cream/10 
             bg-gradient-to-br from-cream/8 to-transparent 
             hover:border-marca/40 hover:bg-gradient-to-br 
             hover:from-cream/12 hover:to-cream/5 
             transition-all duration-300 cursor-pointer"
>
```

### DEPOIS: Hover + active (feedback tátil)
```tsx
<Link
  key={collection.id}
  href={collection.href}
  onClick={closeMenu}
  className="group flex flex-col p-4 sm:p-5 rounded-xl 
             border border-cream/10 bg-gradient-to-br from-cream/8 to-transparent 
             hover:border-marca/40 hover:bg-gradient-to-br 
             hover:from-cream/12 hover:to-cream/5 
             active:border-marca/60 active:bg-gradient-to-br 
             active:from-cream/15 active:to-cream/8 
             transition-all duration-300 cursor-pointer"
>
```

**Mudanças:**
- ✅ Padding responsivo: p-4 → sm:p-5
- ✅ Adiciona active:border-marca/60 (cor forte ao tocar)
- ✅ Adiciona active:bg-gradient-to-br active:from-cream/15 active:to-cream/8
- ✅ Usa closeMenu callback (não setMenuOpen inline)

---

## 5. ÍCONE DE COLEÇÃO - Responsive

### ANTES: Tamanho fixo
```tsx
<div className="mb-4 inline-flex items-center justify-center w-12 h-12 
                rounded-lg bg-gradient-to-br from-marca/20 to-marca/5 
                text-marca/70 group-hover:text-marca 
                group-hover:from-marca/30 group-hover:to-marca/10 
                transition-all">
```

### DEPOIS: Responsive com active state
```tsx
<div className="mb-3 sm:mb-4 inline-flex items-center justify-center 
                w-10 sm:w-12 h-10 sm:h-12 rounded-lg 
                bg-gradient-to-br from-marca/20 to-marca/5 
                text-marca/70 group-hover:text-marca 
                group-hover:from-marca/30 group-hover:to-marca/10 
                active:text-marca active:from-marca/40 active:to-marca/20 
                transition-all">
```

**Mudanças:**
- ✅ Margin responsiva: mb-3 → sm:mb-4
- ✅ Tamanho responsivo: w-10 sm:w-12 h-10 sm:h-12
- ✅ Adiciona active:text-marca active:from-marca/40 active:to-marca/20

---

## 6. CTA COM FEEDBACK VISUAL

### ANTES: Apenas hover
```tsx
<div className="flex items-center gap-1 mt-3 text-marca/40 
                group-hover:text-marca group-hover:translate-x-1 
                transition-all">
  <span className="text-xs uppercase font-medium">Ver</span>
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</div>
```

### DEPOIS: Hover + active (feedback tátil aumentado)
```tsx
<div className="flex items-center gap-1 mt-2 sm:mt-3 text-marca/40 
                group-hover:text-marca group-hover:translate-x-1 
                active:text-marca active:translate-x-2 
                transition-all">
  <span className="text-xs uppercase font-medium">Ver</span>
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</div>
```

**Mudanças:**
- ✅ Margin responsiva: mt-3 → mt-2 sm:mt-3
- ✅ Adiciona active:text-marca (color feedback)
- ✅ Adiciona active:translate-x-2 (movimento aumentado ao tocar)

---

## 7. BOTÕES DE CONTATO E SOCIAL - Touch Targets

### ANTES: Sem container, sem feedback
```tsx
<div className="flex items-center gap-4">
  {CONTACT_LINKS.map((item) => (
    <a
      key={item.href}
      href={item.href}
      target={item.icon !== 'phone' && item.icon !== 'mail' ? '_blank' : undefined}
      rel={item.icon !== 'phone' && item.icon !== 'mail' ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      onClick={() => setMenuOpen(false)}
      className="text-cream/70 hover:text-marca transition-colors duration-200"
    >
      <SocialIcon icon={item.icon} />
    </a>
  ))}
</div>
```

### DEPOIS: 40px touch targets com feedback
```tsx
<div className="flex items-center gap-3 sm:gap-4">
  {CONTACT_LINKS.map((item) => (
    <a
      key={item.href}
      href={item.href}
      target={item.icon !== 'phone' && item.icon !== 'mail' ? '_blank' : undefined}
      rel={item.icon !== 'phone' && item.icon !== 'mail' ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      onClick={closeMenu}
      className="w-10 h-10 flex items-center justify-center 
                 text-cream/70 hover:text-marca active:text-marca 
                 hover:bg-cream/10 active:bg-cream/15 rounded-lg 
                 transition-all duration-200"
    >
      <SocialIcon icon={item.icon} />
    </a>
  ))}
</div>
```

**Mudanças:**
- ✅ Adiciona w-10 h-10 (40px touch target)
- ✅ Adiciona flex items-center justify-center (centra ícone)
- ✅ Adiciona active:text-marca (color feedback)
- ✅ Adiciona hover:bg-cream/10 active:bg-cream/15 (background feedback)
- ✅ Adiciona rounded-lg (border radius)
- ✅ Usa closeMenu callback
- ✅ Gap responsivo: gap-4 → gap-3 sm:gap-4

---

## 8. REDES SOCIAIS - Animação ao Tocar

### ANTES: Apenas hover com scale
```tsx
<a
  key={item.href}
  href={item.href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={item.label}
  onClick={() => setMenuOpen(false)}
  className="text-cream/70 hover:text-marca hover:scale-110 
             transition-all duration-200"
>
  <SocialIcon icon={item.icon} />
</a>
```

### DEPOIS: Hover + active com feedback tátil distinto
```tsx
<a
  key={item.href}
  href={item.href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={item.label}
  onClick={closeMenu}
  className="w-10 h-10 flex items-center justify-center 
             text-cream/70 hover:text-marca active:text-marca 
             hover:bg-cream/10 active:bg-cream/15 active:scale-95 
             rounded-lg hover:scale-110 transition-all duration-200"
>
  <SocialIcon icon={item.icon} />
</a>
```

**Mudanças:**
- ✅ Adiciona w-10 h-10 (touch target)
- ✅ Adiciona flex items-center justify-center
- ✅ Adiciona background hover/active
- ✅ Adiciona active:scale-95 (feedback de press)
- ✅ Mantém hover:scale-110 (desktop hover)
- ✅ Adiciona rounded-lg
- ✅ Usa closeMenu callback

---

## 9. FOOTER - ESPAÇAMENTO RESPONSIVO

### ANTES: Espaçamento fixo
```tsx
<div className="border-t border-cream/10 px-6 py-4 bg-cream/5 -mx-8 -mb-10">
  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
```

### DEPOIS: Espaçamento adaptável
```tsx
<div className="border-t border-cream/10 px-4 sm:px-6 py-4 bg-cream/5 
                -mx-5 sm:-mx-6 md:-mx-10 -mb-5 sm:-mb-6 md:-mb-10">
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
```

**Mudanças:**
- ✅ Padding responsivo: px-4 → sm:px-6 → md não definido (usa md:px-8)
- ✅ Margin negativa responsiva: -mx-5 → sm:-mx-6 → md:-mx-10
- ✅ Margin negativa responsiva: -mb-5 → sm:-mb-6 → md:-mb-10
- ✅ Gap responsivo: gap-4 → sm:gap-6

---

## 10. CALLBACKS MEMOIZADOS

### ANTES: Sem otimização
```tsx
// Inline onClick
<button onClick={() => setMenuOpen(!menuOpen)} ... />

// Inline em links
<Link href={url} onClick={() => setMenuOpen(false)} ... />
```

### DEPOIS: Memoizado para performance
```tsx
// Callbacks no topo do componente
const closeMenu = useCallback(() => {
  setMenuOpen(false);
}, []);

const toggleMenu = useCallback(() => {
  setMenuOpen((prev) => !prev);
}, []);

// Usados em lugar de lambdas inline
<button onClick={toggleMenu} ... />
<Link href={url} onClick={closeMenu} ... />
```

**Benefícios:**
- ✅ Evita recriação de função a cada render
- ✅ Permite memoization de componentes filhos (se usado com React.memo)
- ✅ Melhor performance em aplicações complexas

---

## 11. EVENT LISTENERS MULTI-MODAL

### ANTES: Apenas mouse
```tsx
useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  }
  if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [menuOpen]);
```

### DEPOIS: Mouse + Touch + Keyboard
```tsx
useEffect(() => {
  const handleClickOutside = (e: Event) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      closeMenu();
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeMenu();
  };

  if (menuOpen) {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);  // ← Novo
    document.addEventListener('keydown', handleEscape);           // ← Novo
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('touchstart', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  };
}, [menuOpen, closeMenu]);
```

**Mudanças:**
- ✅ Tipo de evento genérico: MouseEvent → Event (aceita ambos)
- ✅ Adiciona touchstart listener (fecha menu ao tocar fora)
- ✅ Adiciona keydown listener com Escape key
- ✅ Usa closeMenu callback (não setMenuOpen direto)
- ✅ Dependency array inclui closeMenu

---

## Resumo das Mudanças

| Componente | Métrica | Antes | Depois | Tipo |
|-----------|---------|-------|--------|------|
| Botão | Touch Target | 36px | 48px | Size |
| Botão | Feedback | hover | hover + active | UX |
| Ícones | Touch Target | 20px | 40px | Size |
| Ícones | Feedback | hover | hover + active | UX |
| Menu | Scroll Mobile | Não | Sim | Layout |
| Menu | Height | Ilimitado | 80vh mobile | Layout |
| Padding | Mobile | 32px fixo | 20px adaptável | Spacing |
| Gap | Mobile | 24px fixo | 16px adaptável | Spacing |
| Cards | Feedback | hover | hover + active | UX |
| Escape | Suporte | Não | Sim | A11y |
| Callbacks | Otimização | Inline | useCallback | Perf |

---

**Status:** ✅ Todas as mudanças implementadas e compiladas com sucesso
