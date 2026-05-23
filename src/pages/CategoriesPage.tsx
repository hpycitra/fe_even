import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Tags } from 'lucide-react';
import api from '../lib/api';
import { CategoryEvent } from '../types';
import toast from 'react-hot-toast';

const defaultForm = { name: '', description: '', color: '#6366f1' };

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<CategoryEvent | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch {
      toast.error('Gagal memuat data kategori');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(defaultForm);
    setModal(true);
  };

  const openEdit = (cat: CategoryEvent) => {
    setEditItem(cat);
    setForm({ name: cat.name, description: cat.description || '', color: cat.color });
    setModal(true);
  };

  const closeModal = () => { setModal(false); setEditItem(null); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        await api.put(`/categories/${editItem.id}`, form);
        toast.success('Kategori diperbarui');
      } else {
        await api.post('/categories', form);
        toast.success('Kategori ditambahkan');
      }
      closeModal();
      fetchCategories();
    } catch {
      toast.error('Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Hapus "${name}"?`)) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Berhasil dihapus');
      fetchCategories();
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .header h1 {
          font-size: 26px;
          font-weight: 800;
          background: linear-gradient(135deg,#f093fb,#4facfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header p {
          font-size: 13px;
          opacity: 0.6;
        }

        .btn {
          background: linear-gradient(135deg,#4facfe,#f093fb);
          border: none;
          padding: 10px 16px;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          display: flex;
          gap: 6px;
          align-items: center;
          font-size: 13px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
          gap: 16px;
        }

        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 18px;
          backdrop-filter: blur(20px);
          transition: .3s;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .color {
          width: 100%;
          height: 6px;
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .name {
          font-weight: 700;
          font-size: 15px;
        }

        .desc {
          font-size: 12px;
          opacity: 0.6;
          margin: 6px 0;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .badge {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
        }

        .actions {
          display: flex;
          gap: 6px;
        }

        .icon-btn {
          background: rgba(255,255,255,0.08);
          border: none;
          padding: 6px;
          border-radius: 8px;
          cursor: pointer;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: #111;
          padding: 20px;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
        }

        .modal h2 {
          margin-bottom: 10px;
        }

        .input {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

      `}</style>

      <div className="page">

        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Kategori Event</h1>
            <p>Kelola kategori event</p>
          </div>
          <button className="btn" onClick={openAdd}>
            <Plus size={16}/> Tambah
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p>Loading...</p>
        ) : categories.length === 0 ? (
          <div style={{textAlign:'center',opacity:0.6}}>
            <Tags size={40}/>
            <p>Belum ada kategori</p>
          </div>
        ) : (
          <div className="grid">
            {categories.map(cat => (
              <div key={cat.id} className="card">
                <div className="color" style={{background: cat.color}} />

                <div className="name">{cat.name}</div>
                <div className="desc">{cat.description || '-'}</div>

                <div className="footer">
                  <span className="badge">{cat._count?.events || 0} event</span>

                  <div className="actions">
                    <button className="icon-btn" onClick={() => openEdit(cat)}>
                      <Pencil size={14}/>
                    </button>
                    <button className="icon-btn" onClick={() => handleDelete(cat.id, cat.name)}>
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {modal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e)=>e.stopPropagation()}>
              <h2>{editItem ? 'Edit' : 'Tambah'} Kategori</h2>

              <form onSubmit={handleSave}>
                <input
                  className="input"
                  placeholder="Nama"
                  value={form.name}
                  onChange={(e)=>setForm({...form,name:e.target.value})}
                  required
                />

                <textarea
                  className="input"
                  placeholder="Deskripsi"
                  value={form.description}
                  onChange={(e)=>setForm({...form,description:e.target.value})}
                />

                <input
                  type="color"
                  value={form.color}
                  onChange={(e)=>setForm({...form,color:e.target.value})}
                />

                <div className="modal-actions">
                  <button type="button" onClick={closeModal}>Batal</button>
                  <button type="submit">{saving ? '...' : 'Simpan'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default CategoriesPage;