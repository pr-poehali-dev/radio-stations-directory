import { useState } from 'react';
import { useRadioStore } from '@/store/radioStore';
import { Station, GENRES, Genre } from '@/data/stations';
import Icon from '@/components/ui/icon';

const emptyForm = {
  name: '',
  description: '',
  genre: 'Поп' as Genre,
  city: '',
  streamUrl: '',
  logo: '📻',
  frequency: '',
  listeners: '',
  isPopular: false,
};

export default function AdminPage() {
  const { stations, addStation, updateStation, deleteStation } = useRadioStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (station: Station) => {
    setForm({
      name: station.name,
      description: station.description,
      genre: station.genre,
      city: station.city,
      streamUrl: station.streamUrl,
      logo: station.logo,
      frequency: station.frequency || '',
      listeners: station.listeners?.toString() || '',
      isPopular: station.isPopular || false,
    });
    setEditId(station.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name,
      description: form.description,
      genre: form.genre,
      city: form.city,
      streamUrl: form.streamUrl,
      logo: form.logo,
      frequency: form.frequency || undefined,
      listeners: form.listeners ? Number(form.listeners) : undefined,
      isPopular: form.isPopular,
    };
    if (editId) {
      updateStation(editId, data);
    } else {
      addStation(data);
    }
    setShowForm(false);
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    deleteStation(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-oswald text-3xl font-bold">Админ-панель</h1>
          <p className="text-muted-foreground text-sm mt-1">{stations.length} радиостанций</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm"
        >
          <Icon name="Plus" size={16} />
          Добавить
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur p-4 pt-8 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-oswald text-xl font-bold">
                {editId ? 'Редактировать' : 'Новая станция'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Название *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Европа Плюс"
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">Описание</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Короткое описание станции"
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Жанр *</label>
                  <select
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value as Genre })}
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  >
                    {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Иконка (эмодзи)</label>
                  <input
                    type="text"
                    value={form.logo}
                    onChange={(e) => setForm({ ...form, logo: e.target.value })}
                    placeholder="📻"
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Город *</label>
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Москва"
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Частота (FM)</label>
                  <input
                    type="text"
                    value={form.frequency}
                    onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                    placeholder="106.2 FM"
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground mb-1 block">URL потока (MP3/AAC) *</label>
                  <input
                    required
                    type="url"
                    value={form.streamUrl}
                    onChange={(e) => setForm({ ...form, streamUrl: e.target.value })}
                    placeholder="https://stream.example.com/radio.mp3"
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Слушателей</label>
                  <input
                    type="number"
                    value={form.listeners}
                    onChange={(e) => setForm({ ...form, listeners: e.target.value })}
                    placeholder="50000"
                    className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-3 pt-5">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={form.isPopular}
                    onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                    className="w-4 h-4 accent-[hsl(var(--primary))]"
                  />
                  <label htmlFor="popular" className="text-sm text-foreground">Пометить как ТОП</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                >
                  {editId ? 'Сохранить' : 'Добавить'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-secondary text-foreground py-3 rounded-xl font-semibold hover:bg-secondary/70 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-sm p-6 text-center animate-fade-in">
            <Icon name="Trash2" size={32} className="text-red-400 mx-auto mb-3" />
            <h2 className="font-oswald text-xl font-bold mb-2">Удалить станцию?</h2>
            <p className="text-muted-foreground text-sm mb-5">Это действие нельзя отменить</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                Удалить
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-secondary text-foreground py-3 rounded-xl font-semibold"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="space-y-2">
        {stations.map((station, i) => (
          <div
            key={station.id}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl animate-fade-in"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-lg flex-shrink-0">
              {station.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-oswald font-semibold text-sm truncate">{station.name}</span>
                {station.isPopular && (
                  <span className="text-[9px] bg-primary/20 text-primary border border-primary/30 px-1.5 rounded-full font-oswald tracking-wider hidden sm:inline">ТОП</span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{station.genre} · {station.city}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openEdit(station)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="Pencil" size={13} />
              </button>
              <button
                onClick={() => setDeleteConfirm(station.id)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-red-400 transition-colors"
              >
                <Icon name="Trash2" size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
