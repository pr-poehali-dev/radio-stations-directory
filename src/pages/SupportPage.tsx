import Icon from '@/components/ui/icon';

const amounts = [100, 250, 500, 1000];

export default function SupportPage() {
  return (
    <div className="space-y-8 animate-fade-up max-w-2xl mx-auto">
      {/* Hero */}
      <div className="text-center py-8 relative">
        <div className="absolute inset-0 rounded-3xl opacity-20"
          style={{ background: 'radial-gradient(ellipse at center top, hsl(262,83%,50%), transparent 70%)' }} />
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent/60 flex items-center justify-center mx-auto mb-5 glow-purple">
            <span className="text-4xl">🎙️</span>
          </div>
          <h1 className="font-oswald text-3xl md:text-4xl font-bold mb-3">
            Поддержите <span className="text-gradient">RadioWave</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Мы независимый проект. Ваша поддержка помогает нам оставаться в эфире и добавлять новые станции
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { icon: 'Zap',    title: 'Без рекламы',   desc: 'Слушайте без баннеров и перебоев' },
          { icon: 'Star',   title: 'Новые станции', desc: 'Каталог растёт каждую неделю' },
          { icon: 'Shield', title: 'Стабильность',  desc: 'Серверы работают 24/7' },
        ].map(item => (
          <div key={item.title} className="glass rounded-2xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
              <Icon name={item.icon} size={18} className="text-primary" />
            </div>
            <div className="font-oswald font-semibold mb-1">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Donation */}
      <div className="glass rounded-2xl p-6">
        <h2 className="font-oswald text-xl font-semibold mb-5">Выберите сумму поддержки</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {amounts.map(amount => (
            <button key={amount}
              className="py-3 rounded-xl border border-border bg-secondary text-foreground font-oswald font-semibold hover:border-primary/60 hover:bg-primary/10 hover:text-primary active:scale-95 transition-all">
              {amount} ₽
            </button>
          ))}
        </div>

        <div className="mb-5">
          <label className="text-xs text-muted-foreground mb-1.5 block">Своя сумма (₽)</label>
          <input type="number" placeholder="Введите сумму" className="input-field" />
        </div>

        <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-oswald font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all glow-purple flex items-center justify-center gap-2">
          <Icon name="Heart" size={18} className="fill-current" />
          Поддержать RadioWave
        </button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          Оплата через Tinkoff · Без комиссии
        </p>
      </div>

      {/* Stats */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm">
          Уже поддержали: <span className="text-foreground font-semibold text-primary">347 человек</span>
        </p>
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} name="Star" size={14} className="text-primary fill-primary" />
          ))}
        </div>
      </div>
    </div>
  );
}
