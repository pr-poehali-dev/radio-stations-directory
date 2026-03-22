import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="font-oswald text-3xl font-bold">Контакты</h1>
        <p className="text-muted-foreground mt-1">Свяжитесь с нами по любому вопросу</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Info */}
        <div className="space-y-3">
          {[
            { icon: 'Mail',           label: 'Email',    value: 'hello@radiowave.ru' },
            { icon: 'MessageCircle',  label: 'Telegram', value: '@radiowave_support' },
            { icon: 'MapPin',         label: 'Адрес',    value: 'Москва, Россия' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-4 p-4 glass rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
                <div className="text-sm font-medium">{item.value}</div>
              </div>
            </div>
          ))}

          <div className="p-5 glass rounded-2xl border border-primary/15">
            <h3 className="font-oswald font-semibold mb-2 flex items-center gap-2">
              <Icon name="Radio" size={16} className="text-primary" />
              Хотите добавить станцию?
            </h3>
            <p className="text-sm text-muted-foreground">
              Напишите нам с темой «Добавление станции» и укажите название, частоту и URL потока
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-oswald text-xl font-semibold mb-5">Написать нам</h2>
          {sent ? (
            <div className="text-center py-10 animate-scale-in">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
                <Icon name="CheckCircle2" size={28} className="text-primary" />
              </div>
              <div className="font-oswald text-lg font-bold">Отправлено!</div>
              <p className="text-muted-foreground text-sm mt-1">Мы ответим в течение 24 часов</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Ваше имя</label>
                <input required type="text" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов" className="input-field" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                <input required type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="ivan@example.com" className="input-field" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
                <textarea required value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Ваш вопрос или предложение..." rows={4}
                  className="input-field resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all glow-purple">
                Отправить сообщение
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
