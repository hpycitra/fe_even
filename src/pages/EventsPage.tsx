import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Calendar, MapPin, Users, Clock } from 'lucide-react';
import api from '../lib/api';
import { Event, CategoryEvent, Pembicara } from '../types';
import toast from 'react-hot-toast';

const STATUS_COLORS: Record<string, string> = {
  upcoming: '#6366f1',
  ongoing: '#10b981',
  completed: '#6b7280',
  cancelled: '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
  upcoming: 'Akan Datang',
  ongoing: 'Berlangsung',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
};

const defaultForm = {
  title: '', description: '', date: '', time: '', location: '',
  capacity: '', status: 'upcoming', imageUrl: '', categoryId: '', pembicaraId: '',
};

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<CategoryEvent[]>([]);
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<Event | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [evRes, catRes, spkRes] = await Promise.all([
        api.get('/events'),
        api.get('/categories'),
        api.get('/pembicara'),
      ]);
      setEvents(evRes.data);
      setCategories(catRes.data);
      setPembicara(spkRes.data);
    } catch {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => { setEditItem(null); setForm(defaultForm); setModal(true); };

  const openEdit = (ev: Event) => {
    setEditItem(ev);
    setForm({
      title: ev.title,
      description: ev.description || '',
      date: ev.date.split('T')[0],
      time: ev.time,
      location: ev.location,
      capacity: String(ev.capacity),
      status: ev.status,
      imageUrl: ev.imageUrl || '',
      categoryId: String(ev.categoryId),
      pembicaraId: String(ev.pembicaraId),
    });
    setModal(true);
  };

  const closeModal = () => { setModal(false); setEditItem(null); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        await api.put(`/events/${editItem.id}`, form);
        toast.success('Event diperbarui');
      } else {
        await api.post('/events', form);
        toast.success('Event ditambahkan');
      }
      closeModal();
      fetchAll();
    } catch {
      toast.error('Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Hapus "${title}"?`)) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success('Dihapus');
      fetchAll();
    } catch {
      toast.error('Gagal menghapus');
    }
  };

  return (
    <>
      <style>{`
        .page {
          max-width: 1100px;
          margin: auto;
          padding: 30px 20px;
          color: white;
        }

        .header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
        }

        .header h1 {
          font-size:26px;
          font-weight:800;
          background: linear-gradient(135deg,#f093fb,#4facfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn {
          background: linear-gradient(135deg,#4facfe,#f093fb);
          border:none;
          padding:10px 16px;
          border-radius:12px;
          color:white;
          cursor:pointer;
          display:flex;
          gap:6px;
        }

        .grid {
          display:grid;
          grid-template-columns: repeat(auto-fill,minmax(260px,1fr));
          gap:16px;
        }

        .card {
          background: rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:18px;
          overflow:hidden;
          backdrop-filter: blur(20px);
          transition:.3s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .img {
          height:140px;
          background:#222;
          background-size:cover;
          background-position:center;
        }

        .content {
          padding:14px;
        }

        .title {
          font-weight:700;
          margin-bottom:6px;
        }

        .meta {
          font-size:12px;
          opacity:0.7;
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        }

        .badge {
          margin-top:8px;
          font-size:11px;
          padding:4px 10px;
          border-radius:999px;
          display:inline-block;
        }

        .footer {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:10px;
        }

        .actions {
          display:flex;
          gap:6px;
        }

        .icon-btn {
          background: rgba(255,255,255,0.08);
          border:none;
          padding:6px;
          border-radius:8px;
          cursor:pointer;
        }

        /* MODAL */
        .modal-overlay {
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.6);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index: 50;
        }

        .modal {
          background:#111;
          padding:24px;
          border-radius:16px;
          width:100%;
          max-width:600px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5);
        }

        .modal h2 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .input {
          width:100%;
          margin-bottom:12px;
          padding:11px;
          border-radius:10px;
          border:none;
          background:rgba(255,255,255,0.08);
          color:white;
          font-size: 14px;
        }

        .input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .input:focus {
          outline: 2px solid #4facfe;
          background: rgba(255,255,255,0.12);
        }

        .row {
          display:flex;
          gap:10px;
        }

        .select-option {
          color: black;
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 10px 16px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }

        .btn-primary {
          background: linear-gradient(135deg,#4facfe,#f093fb);
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>

      <div className="page">

        {/* HEADER */}
        <div className="header">
          <h1>Event</h1>
          <button className="btn" onClick={openAdd}>
            <Plus size={16}/> Tambah
          </button>
        </div>

        {/* CONTENT */}
        {loading ? <p>Loading...</p> : (
          <div className="grid">
            {events.map(ev => (
              <div key={ev.id} className="card">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${ev.imageUrl || 'https://picsum.photos/400'})` }}
                />

                <div className="content">
                  <div className="title">{ev.title}</div>

                  <div className="meta">
                    <span><Calendar size={12}/> {new Date(ev.date).toLocaleDateString('id-ID')}</span>
                    <span><Clock size={12}/> {ev.time}</span>
                    <span><MapPin size={12}/> {ev.location}</span>
                  </div>

                  <div
                    className="badge"
                    style={{
                      background: STATUS_COLORS[ev.status] + '22',
                      color: STATUS_COLORS[ev.status]
                    }}
                  >
                    {STATUS_LABELS[ev.status]}
                  </div>

                  <div className="footer">
                    <span style={{fontSize:'12px',opacity:0.7}}>
                      <Users size={12}/> {ev.capacity || '∞'}
                    </span>

                    <div className="actions">
                      <button className="icon-btn" onClick={()=>openEdit(ev)}>
                        <Pencil size={14}/>
                      </button>
                      <button className="icon-btn" onClick={()=>handleDelete(ev.id, ev.title)}>
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL DENGAN FIELD INPUT BARU */}
        {modal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e)=>e.stopPropagation()}>
              <h2>{editItem ? 'Edit' : 'Tambah'} Event</h2>

              <form onSubmit={handleSave}>
                <input className="input" placeholder="Judul" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />

                <div className="row">
                  <input type="date" className="input" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} required />
                  <input type="time" className="input" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})} required />
                </div>

                <input className="input" placeholder="Lokasi" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} required />
                
                {/* BARIS BARU: KUOTA & STATUS ACARA */}
                <div className="row">
                  <input type="number" className="input" placeholder="Kuota (Kapasitas)" value={form.capacity} onChange={(e)=>setForm({...form,capacity:e.target.value})} required />
                  <select className="input" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} required>
                    <option value="upcoming" className="select-option">Akan Datang</option>
                    <option value="ongoing" className="select-option">Berlangsung</option>
                    <option value="completed" className="select-option">Selesai</option>
                    <option value="cancelled" className="select-option">Dibatalkan</option>
                  </select>
                </div>

                {/* BARIS BARU: KATEGORI & PEMBICARA (DINAMIS DARI API) */}
                <div className="row">
                  <select className="input" value={form.categoryId} onChange={(e)=>setForm({...form,categoryId:e.target.value})} required>
                    <option value="" disabled className="select-option">Pilih Kategori</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id} className="select-option">{cat.name}</option>
                    ))}
                  </select>

                  <select className="input" value={form.pembicaraId} onChange={(e)=>setForm({...form,pembicaraId:e.target.value})} required>
                    <option value="" disabled className="select-option">Pilih Pembicara</option>
                    {pembicara.map(spk => (
                      <option key={spk.id} value={spk.id} className="select-option">{spk.name}</option>
                    ))}
                  </select>
                </div>

                <input className="input" placeholder="URL Gambar" value={form.imageUrl} onChange={(e)=>setForm({...form,imageUrl:e.target.value})} />

                <textarea className="input" placeholder="Deskripsi" rows={3} value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />

                <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:10}}>
                  <button type="button" className="btn-secondary" onClick={closeModal}>Batal</button>
                  <button type="submit" className="btn-primary">{saving ? '...' : 'Simpan'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default EventsPage;