import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-oswald text-3xl font-bold">Контакты</h1>
        <p className="text-muted-foreground mt-1">Свяжитесь с нами по любому вопросу</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="space-y-4">
          {[
            { icon: 'Mail', label: 'Email', value: 'hello@radiowave.ru' },
            { icon: 'MessageCircle', label: 'Telegram', value: '@radiowave_support' },
            { icon: 'MapPin', label: 'Адрес', value: 'Москва, Россия' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon name={item.icon} size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div className="text-sm font-medium">{item.value}</div>
              </div>
            </div>
          ))}

          <div className="p-5 bg-card border border-border rounded-2xl">
            <h3 className="font-oswald text-base font-semibold mb-2">Добавить радиостанцию?</h3>
            <p className="text-sm text-muted-foreground">
              Если у вас есть своя радиостанция и вы хотите появиться в каталоге — напишите нам с темой «Добавление станции»
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-oswald text-xl font-semibold mb-4">Написать нам</h2>
          {sent ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-3">
                <Icon name="CheckCircle2" size={28} className="text-primary" />
              </div>
              <div className="font-oswald text-lg font-bold">Отправлено!</div>
              <p className="text-muted-foreground text-sm mt-1">Мы ответим в течение 24 часов</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Ваше имя</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ivan@example.com"
                  className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Сообщение</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Ваш вопрос или предложение..."
                  rows={4}
                  className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Отправить сообщение
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
