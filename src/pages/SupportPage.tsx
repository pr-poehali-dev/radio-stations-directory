import Icon from '@/components/ui/icon';

export default function SupportPage() {
  const amounts = [100, 250, 500, 1000];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/40 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎙️</span>
        </div>
        <h1 className="font-oswald text-3xl font-bold mb-2">Поддержите проект</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          RadioWave — независимый проект. Ваша поддержка помогает нам оставаться в эфире, добавлять новые станции и улучшать сервис
        </p>
      </div>

      {/* Benefits */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: 'Zap', title: 'Без рекламы', desc: 'Слушайте без перебоев и баннеров' },
          { icon: 'Star', title: 'Новые станции', desc: 'Мы расширяем каталог каждую неделю' },
          { icon: 'Shield', title: 'Стабильность', desc: 'Ваш вклад — наши сервера 24/7' },
        ].map((item) => (
          <div key={item.title} className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
              <Icon name={item.icon} size={18} className="text-primary" />
            </div>
            <div className="font-oswald font-semibold mb-1">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Donation amounts */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-oswald text-xl font-semibold mb-4">Выберите сумму</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {amounts.map((amount) => (
            <button
              key={amount}
              className="py-3 rounded-xl border border-border bg-secondary text-foreground font-oswald font-semibold hover:border-primary hover:bg-primary/10 hover:text-primary transition-all"
            >
              {amount} ₽
            </button>
          ))}
        </div>
        <div className="flex gap-3 mb-5">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">Своя сумма (₽)</label>
            <input
              type="number"
              placeholder="Введите сумму"
              className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-oswald font-bold text-base hover:opacity-90 transition-opacity glow-orange flex items-center justify-center gap-2">
          <Icon name="Heart" size={18} />
          Поддержать RadioWave
        </button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Оплата через Tinkoff. Безопасно и без комиссии.
        </p>
      </div>

      {/* Thanks */}
      <div className="text-center py-4">
        <p className="text-muted-foreground text-sm">
          Уже поддержали: <span className="text-foreground font-semibold">347 человек</span>
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
