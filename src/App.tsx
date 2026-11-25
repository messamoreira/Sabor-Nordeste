import { useMemo, useState } from 'react'
import {
  ArrowRight, Bell, ChevronDown, ChevronRight, Clock3, Gift, Heart,
  Home, MapPin, Menu, Minus, Plus, Search, ShoppingBag, Star, UserRound, X,
} from 'lucide-react'

type Category = 'Todos' | 'Favoritos' | 'Combos' | 'Lanches' | 'Porções' | 'Bebidas' | 'Sobremesas'
type Product = { id: number; name: string; description: string; price: number; category: Exclude<Category, 'Todos' | 'Favoritos'>; image: string; tag?: string; }

const products: Product[] = [
  { id: 1, name: 'Xis Nordestino', description: 'Carne de sol, queijo coalho, vinagrete e molho da casa.', price: 28.9, category: 'Lanches', image: '🍔', tag: 'Mais pedido' },
  { id: 2, name: 'Combo Arretado', description: 'Xis nordestino, batata crocante e Guaraná Jesus.', price: 39.9, category: 'Combos', image: '🍟', tag: 'Economize R$ 8' },
  { id: 3, name: 'Baião de dois', description: 'Arroz, feijão fradinho, queijo coalho e carne de sol.', price: 32.5, category: 'Porções', image: '🍲' },
  { id: 4, name: 'Coxinha de carne seca', description: 'Massa cremosa, recheio de carne seca e catupiry.', price: 9.9, category: 'Porções', image: '🥟' },
  { id: 5, name: 'Cajuína gelada', description: 'A bebida mais querida do Nordeste, 300ml.', price: 7.5, category: 'Bebidas', image: '🥤' },
  { id: 6, name: 'Cartola', description: 'Banana, queijo coalho, canela e açúcar.', price: 16.9, category: 'Sobremesas', image: '🍌' },
  { id: 7, name: 'Tapioca Sertaneja', description: 'Carne de sol desfiada, queijo e manteiga de garrafa.', price: 22.9, category: 'Lanches', image: '🫓', tag: 'Novidade' },
  { id: 8, name: 'Suco de umbu', description: 'Fruta brasileira, refrescante e sem conservantes.', price: 8.9, category: 'Bebidas', image: '🧃' },
]

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1 })
  const [favorites, setFavorites] = useState<number[]>([1, 6])
  const [modal, setModal] = useState<'cart' | 'login' | 'profile' | 'success' | null>(null)
  const [orderStatus, setOrderStatus] = useState(false)
  const [location, setLocation] = useState('Boa Viagem')
  const [showPrivacy, setShowPrivacy] = useState(true)

  const visibleProducts = useMemo(() => products.filter((product) => {
    const categoryMatches = activeCategory === 'Todos' || (activeCategory === 'Favoritos' ? favorites.includes(product.id) : product.category === activeCategory)
    return categoryMatches && `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase())
  }), [activeCategory, favorites, search])

  const cartItems = products.filter((product) => cart[product.id])
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0)
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0)

  const addItem = (id: number) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  const removeItem = (id: number) => setCart((current) => {
    const next = { ...current, [id]: (current[id] || 0) - 1 }
    if (next[id] <= 0) delete next[id]
    return next
  })

  const checkout = () => {
    setModal('success')
    setOrderStatus(true)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">✦</span><span>Sabor <b>Nordeste</b></span></div>
        <nav className="desktop-nav"><a className="active">Início</a><a>Cardápio</a><a>Promoções</a><a>Fidelidade</a></nav>
        <div className="top-actions">
          <button className="location-button" onClick={() => setLocation(location === 'Boa Viagem' ? 'Casa Forte' : 'Boa Viagem')}><MapPin size={16} /><span>Unidade <b>{location}</b></span><ChevronDown size={15} /></button>
          <button className="icon-button notification"><Bell size={20} /><i /></button>
          <button className="icon-button" onClick={() => setModal('profile')}><UserRound size={20} /></button>
          <button className="cart-button" onClick={() => setModal('cart')}><ShoppingBag size={20} /><span>{cartCount}</span></button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy"><span className="eyebrow">FEITO COM AFETO, SERVIDO COM ALEGRIA</span><h1>O sabor que<br /><em>abraça</em> você.</h1><p>Receitas de família, ingredientes de verdade e aquele tempero que faz você se sentir em casa.</p><button className="primary-button" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>Ver cardápio <ArrowRight size={18} /></button></div>
          <div className="hero-art"><div className="sun" /><div className="food-plate">🍔</div><div className="leaf leaf-one">⌁</div><div className="leaf leaf-two">⌁</div><div className="hero-sticker"><Star size={15} fill="currentColor" /> O queridinho do bairro</div></div>
        </section>

        <section className="welcome-strip"><div><span className="welcome-icon">☀</span><strong>Olá, Ana!</strong><span> Que bom ter você por aqui.</span></div><div className="points"><Gift size={18} /><span>Você tem <b>180 pontos</b></span><ChevronRight size={17} /></div></section>

        {orderStatus && <section className="order-banner"><div className="order-icon"><Clock3 size={21} /></div><div><strong>Pedido de demonstração</strong><span>Fluxo ilustrativo · Unidade {location}</span></div><button onClick={() => setModal('success')}>Ver detalhes <ChevronRight size={17} /></button></section>}

        <section className="menu-section" id="menu">
          <div className="section-heading"><div><span className="eyebrow">ESCOLHA SEU MOMENTO</span><h2>Nosso cardápio</h2></div><button className="view-all">Ver tudo <ArrowRight size={16} /></button></div>
          <div className="menu-toolbar"><div className="categories">{(['Todos', 'Favoritos', 'Combos', 'Lanches', 'Porções', 'Bebidas', 'Sobremesas'] as Category[]).map((category) => <button key={category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{category === 'Favoritos' && <Heart size={15} fill="currentColor" />}{category}</button>)}</div><label className="search-box"><Search size={18} /><input placeholder="O que você está com vontade?" value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
          <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><span>{product.image}</span>{product.tag && <small>{product.tag}</small>}<button className={`favorite ${favorites.includes(product.id) ? 'liked' : ''}`} onClick={() => setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}><Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button></div><div className="product-body"><div><h3>{product.name}</h3><p>{product.description}</p></div><div className="product-footer"><strong>{money(product.price)}</strong><button className="add-button" onClick={() => addItem(product.id)}><Plus size={19} /></button></div></div></article>)}</div>
          {visibleProducts.length === 0 && <div className="empty-state">Nenhum sabor encontrado. Tente outra busca.</div>}
        </section>

        <section className="loyalty-section"><div className="loyalty-copy"><span className="eyebrow">CLUBE SABOR NORDESTE</span><h2>Cada pedido vale<br /><em>um carinho</em> a mais.</h2><p>Junte pontos, troque por delícias e aproveite vantagens exclusivas.</p><button className="secondary-button" onClick={() => setModal('profile')}>Conhecer meu clube <ArrowRight size={17} /></button></div><div className="loyalty-card"><div className="loyalty-card-top"><Gift size={22} /><span>SEUS PONTOS</span></div><strong>180</strong><span>pontos disponíveis</span><div className="progress"><i /></div><small>Faltam 20 pontos para ganhar <b>um suco grátis</b></small></div></section>
      </main>

      <footer><div className="brand"><span className="brand-mark">✦</span><span>Sabor <b>Nordeste</b></span></div><span>Demonstração de cardápio digital.</span><div className="footer-links"><a>Privacidade</a><a>Termos de uso</a><a>Fale conosco</a></div></footer>
      {showPrivacy && <div className="privacy-toast"><div><strong>Aviso da demonstração</strong><p>Este protótipo não envia nem salva seus dados. As informações exibidas são de exemplo.</p></div><button onClick={() => setShowPrivacy(false)}>Entendi</button><X size={16} onClick={() => setShowPrivacy(false)} /></div>}

      {modal === 'cart' && <div className="modal-backdrop" onClick={() => setModal(null)}><div className="modal cart-modal" onClick={(event) => event.stopPropagation()}><div className="modal-header"><div><span className="eyebrow">SUA SACOLA</span><h2>Sacola <span>({cartCount} itens)</span></h2></div><button className="close-button" onClick={() => setModal(null)}><X size={20} /></button></div>{cartItems.map((product) => <div className="cart-item" key={product.id}><span className="cart-emoji">{product.image}</span><div><strong>{product.name}</strong><span>{money(product.price)}</span></div><div className="quantity"><button onClick={() => removeItem(product.id)}><Minus size={14} /></button><b>{cart[product.id]}</b><button onClick={() => addItem(product.id)}><Plus size={14} /></button></div></div>)}{cartItems.length === 0 && <p className="empty-cart">Sua sacola está vazia.</p>}<div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Taxa de serviço</span><span>Grátis</span></div><div className="total"><span>Total</span><strong>{money(subtotal)}</strong></div></div><button className="primary-button full" disabled={!cartItems.length} onClick={checkout}>Simular pedido <ArrowRight size={18} /></button><p className="payment-note">Demonstração: nenhum pagamento será realizado.</p></div></div>}
      {modal === 'profile' && <div className="modal-backdrop" onClick={() => setModal(null)}><div className="modal profile-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setModal(null)}><X size={20} /></button><div className="profile-avatar">AS</div><span className="eyebrow">PERFIL DE EXEMPLO</span><h2>Olá, Ana Souza!</h2><p>Esta tela ilustra uma área de perfil e benefícios; não há cadastro ou dados salvos.</p><div className="profile-points"><Gift size={20} /><div><strong>180 pontos</strong><span>exemplo de saldo</span></div><ChevronRight /></div><button className="secondary-button full">Pedidos de exemplo</button><button className="text-button">Fechar</button></div></div>}
      {modal === 'success' && <div className="modal-backdrop"><div className="modal success-modal"><div className="success-check">✓</div><span className="eyebrow">SIMULAÇÃO DE PEDIDO</span><h2>Fluxo demonstrativo</h2><p>Nenhum pedido foi enviado à unidade {location} e nenhum pagamento foi processado.</p><div className="status-steps"><div className="done">✓<span>Pedido simulado</span></div><div className="done">✓<span>Preparo (exemplo)</span></div><div>3<span>Retirada (exemplo)</span></div></div><button className="primary-button full" onClick={() => setModal(null)}>Fechar demonstração <ArrowRight size={18} /></button></div></div>}
    </div>
  )
}

export default App
