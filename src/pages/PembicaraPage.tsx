import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Mic2, Mail, Phone, Award, Layers, Code, Brain, Shield, Briefcase, GraduationCap, Globe } from 'lucide-react';
import api from '../lib/api';
import { Pembicara } from '../types';
import toast from 'react-hot-toast';

const defaultForm = { name: '', title: '', expertise: '', email: '', phone: '', bio: '', photoUrl: '' };

const PembicaraPage = () => {
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<Pembicara | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const fetchPembicara = async () => {
    setLoading(true);
    try {
      const res = await api.get('/pembicara');
      setPembicara(res.data);
    } catch {
      toast.error('Gagal memuat data pembicara');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPembicara(); }, []);

  const openAdd = () => { setEditItem(null); setForm(defaultForm); setModal(true); };
  const openEdit = (p: Pembicara) => {
    setEditItem(p);
    setForm({ name: p.name, title: p.title, expertise: p.expertise, email: p.email || '', phone: p.phone || '', bio: p.bio || '', photoUrl: p.photoUrl || '' });
    setModal(true);
  };
  const closeModal = () => { setModal(false); setEditItem(null); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        await api.put(`/pembicara/${editItem.id}`, form);
        toast.success('Pembicara berhasil diperbarui');
      } else {
        await api.post('/pembicara', form);
        toast.success('Pembicara berhasil ditambahkan');
      }
      closeModal();
      fetchPembicara();
    } catch {
      toast.error('Gagal menyimpan pembicara');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Hapus pembicara "${name}"?`)) return;
    try {
      await api.delete(`/pembicara/${id}`);
      toast.success('Pembicara berhasil dihapus');
      fetchPembicara();
    } catch {
      toast.error('Gagal menghapus pembicara');
    }
  };

  // Fungsi pembantu untuk memilih ikon Tech secara dinamis berdasarkan judul/keahlian
  const getSpeakerIcon = (title: string = '', expertise: string = '') => {
    const text = (title + ' ' + expertise).toLowerCase();
    if (text.includes('code') || text.includes('developer') || text.includes('web') || text.includes('software')) {
      return <Code size={28} className="neon-icon-cyan" />;
    }
    if (text.includes('ai') || text.includes('intelligence') || text.includes('machine') || text.includes('data')) {
      return <Brain size={28} className="neon-icon-green" />;
    }
    if (text.includes('security') || text.includes('cyber') || text.includes('network')) {
      return <Shield size={28} className="neon-icon-purple" />;
    }
    if (text.includes('dosen') || text.includes('researcher') || text.includes('m.kom') || text.includes('ph.d')) {
      return <GraduationCap size={28} className="neon-icon-pink" />;
    }
    if (text.includes('ceo') || text.includes('founder') || text.includes('manager') || text.includes('owner')) {
      return <Briefcase size={28} className="neon-icon-orange" />;
    }
    return <Globe size={28} className="neon-icon-blue" />;
  };

  return (
    <div className="page-bento">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        .page-bento {
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 1200px;
          margin: auto;
          padding: 10px 20px;
          color: #fff;
        }

        /* ── Page Header ── */
        .page-header-bento {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-header-bento h1 {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #f093fb 0%, #4facfe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header-bento p {
          font-size: 14px;
          color: #a3a3c2;
          opacity: 0.6;
          margin-top: 4px;
        }

        /* ── Modern Neon Button ── */
        .btn-bento-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 16px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: #fff;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(79, 172, 254, 0.3);
          transition: all 0.25s ease;
        }

        .btn-bento-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0, 242, 254, 0.5), inset 0 0 8px rgba(255,255,255,0.4);
        }

        /* ── Grid & Modern Cards ── */
        .cards-grid-bento {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .speaker-card-bento {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .speaker-card-bento:hover {
          border-color: rgba(79, 172, 254, 0.4);
          box-shadow: 0 12px 40px rgba(79, 172, 254, 0.12);
          transform: translateY(-4px);
        }

        /* ── Futuristic Avatar & Icons ── */
        .speaker-avatar-bento {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: grid;
          place-items: center;
          margin-bottom: 16px;
          position: relative;
          transition: all 0.3s ease;
        }

        .speaker-card-bento:hover .speaker-avatar-bento {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.06);
        }

        .speaker-avatar-bento img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Efek Pendaran Neon Icon Luaran */
        .neon-icon-cyan { color: #00f2fe; filter: drop-shadow(0 0 8px rgba(0,242,254,0.6)); }
        .neon-icon-green { color: #38f9d7; filter: drop-shadow(0 0 8px rgba(56,249,215,0.6)); }
        .neon-icon-purple { color: #b185ff; filter: drop-shadow(0 0 8px rgba(177,133,255,0.6)); }
        .neon-icon-pink { color: #f093fb; filter: drop-shadow(0 0 8px rgba(240,147,251,0.6)); }
        .neon-icon-orange { color: #ff9f43; filter: drop-shadow(0 0 8px rgba(255,159,67,0.6)); }
        .neon-icon-blue { color: #4facfe; filter: drop-shadow(0 0 8px rgba(79,172,254,0.6)); }

        /* ── Card Info Typography ── */
        .speaker-info-bento {
          flex: 1;
          width: 100%;
        }

        .speaker-info-bento h3 {
          font-size: 17px;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.4;
        }

        .speaker-title-bento {
          font-size: 13px;
          color: #a3a3c2;
          opacity: 0.7;
          font-weight: 500;
          margin-top: 3px;
        }

        .speaker-expertise-bento {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 14px;
          border-radius: 12px;
          margin: 14px auto 10px auto;
          width: max-content;
          max-width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .speaker-contacts-bento {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          width: 100%;
        }

        .speaker-contact-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: #a3a3c2;
          opacity: 0.8;
        }

        .badge-bento {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: #4facfe;
          background: rgba(79, 172, 254, 0.12);
          border: 1px solid rgba(79, 172, 254, 0.25);
          padding: 4px 12px;
          border-radius: 20px;
          margin-top: 14px;
        }

        /* ── Action Buttons System ── */
        .card-actions-bento {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          gap: 8px;
          opacity: 0;
          transform: translateY(-4px);
          transition: all 0.2s ease;
        }

        .speaker-card-bento:hover .card-actions-bento {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-action-bento {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(15, 12, 41, 0.7);
          color: #a3a3c2;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-action-bento.edit:hover {
          color: #4facfe;
          border-color: rgba(79, 172, 254, 0.4);
          background: rgba(79, 172, 254, 0.15);
        }

        .btn-action-bento.delete:hover {
          color: #f5576c;
          border-color: rgba(245, 87, 108, 0.4);
          background: rgba(245, 87, 108, 0.15);
        }

        /* Modals & Skeletons */
        .empty-state-bento {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          color: #a3a3c2;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          gap: 12px;
        }

        .skeleton-bento {
          grid-column: 1 / -1;
          height: 220px;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: loading-shimmer 1.5s infinite;
          border-radius: 24px;
        }

        @keyframes loading-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .modal-overlay-bento {
          position: fixed;
          inset: 0;
          background: rgba(10, 7, 30, 0.75);
          backdrop-filter: blur(12px);
          display: grid;
          place-items: center;
          z-index: 100;
          padding: 16px;
        }

        .modal-box-bento {
          background: #121224;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
          overflow: hidden;
          animation: modal-appear 0.25s cubic-bezier(.4,0,.2,1);
        }

        @keyframes modal-appear {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .modal-header-bento {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modal-header-bento h2 {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: #a3a3c2;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: color 0.15s;
        }

        .modal-close-btn:hover { color: #fff; }

        .modal-form-bento {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row-bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 500px) {
          .form-row-bento { grid-template-columns: 1fr; }
        }

        .form-group-bento {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group-bento label {
          font-size: 13px;
          font-weight: 600;
          color: #a3a3c2;
        }

        .form-group-bento input,
        .form-group-bento textarea {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 12px 16px;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          transition: all 0.2s;
        }

        .form-group-bento input:focus,
        .form-group-bento textarea:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(79, 172, 254, 0.6);
          box-shadow: 0 0 14px rgba(79, 172, 254, 0.2);
        }

        .modal-actions-bento {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 10px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .btn-bento-cancel {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #a3a3c2;
          padding: 12px 22px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.15s;
        }

        .btn-bento-cancel:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }
      `}</style>

      {/* ── Header Section ── */}
      <div className="page-header-bento">
        <div>
          <h1>Pembicara</h1>
          <p>Kelola data insting ahli dan pembicara event</p>
        </div>
        <button className="btn-bento-primary" onClick={openAdd}>
          <Plus size={16} /> Tambah Pembicara
        </button>
      </div>

      {/* ── Main Grid ── */}
      {loading ? (
        <div className="cards-grid-bento">
          <div className="skeleton-bento" />
        </div>
      ) : (
        <div className="cards-grid-bento">
          {pembicara.length === 0 ? (
            <div className="empty-state-bento">
              <Mic2 size={36} style={{ color: '#a3a3c2' }} />
              <p>Belum ada pembicara. Yuk, tambahkan data pertama!</p>
            </div>
          ) : (
            pembicara.map((p) => (
              <div key={p.id} className="speaker-card-bento">
                {/* Actions Hover Over */}
                <div className="card-actions-bento">
                  <button className="btn-action-bento edit" onClick={() => openEdit(p)} title="Edit">
                    <Pencil size={14} />
                  </button>
                  <button className="btn-action-bento delete" onClick={() => handleDelete(p.id, p.name)} title="Hapus">
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Avatar / Dynamic Neon Icon Container */}
                <div className="speaker-avatar-bento">
                  {p.photoUrl ? (
                    <img src={p.photoUrl} alt={p.name} />
                  ) : (
                    getSpeakerIcon(p.title, p.expertise)
                  )}
                </div>

                {/* Speaker Main Info */}
                <div className="speaker-info-bento">
                  <h3>{p.name}</h3>
                  <p className="speaker-title-bento">{p.title}</p>
                  
                  <div className="speaker-expertise-bento">
                    <Award size={13} style={{ color: '#00f2fe' }} />
                    <span>{p.expertise}</span>
                  </div>

                  {/* Contacts */}
                  {(p.email || p.phone) && (
                    <div className="speaker-contacts-bento">
                      {p.email && (
                        <div className="speaker-contact-item">
                          <Mail size={12} style={{ color: '#4facfe' }} /> <span>{p.email}</span>
                        </div>
                      )}
                      {p.phone && (
                        <div className="speaker-contact-item">
                          <Phone size={12} style={{ color: '#38f9d7' }} /> <span>{p.phone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="badge-bento">
                    <Layers size={12} />
                    <span>{p._count?.events || 0} Event</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Form Modal ── */}
      {modal && (
        <div className="modal-overlay-bento" onClick={closeModal}>
          <div className="modal-box-bento" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bento">
              <h2>{editItem ? 'Edit Pembicara' : 'Tambah Pembicara'}</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="modal-form-bento">
              <div className="form-row-bento">
                <div className="form-group-bento">
                  <label>Nama Lengkap *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama pembicara" required />
                </div>
                <div className="form-group-bento">
                  <label>Jabatan / Gelar *</label>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="S.Kom., M.T., Fullstack Developer" required />
                </div>
              </div>

              <div className="form-group-bento">
                <label>Keahlian / Bidang *</label>
                <input type="text" value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} placeholder="UI/UX, Cybersecurity, Machine Learning..." required />
              </div>

              <div className="form-row-bento">
                <div className="form-group-bento">
                  <label>Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="pembicara@example.com" />
                </div>
                <div className="form-group-bento">
                  <label>Telepon</label>
                  <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="08xxxxxxxxxx" />
                </div>
              </div>

              <div className="form-group-bento">
                <label>Foto URL</label>
                <input type="url" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} placeholder="https://images.unsplash.com/..." />
              </div>

              <div className="form-group-bento">
                <label>Biografi Short</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tulis deskripsi singkat latar belakang pembicara..." rows={3} />
              </div>

              <div className="modal-actions-bento">
                <button type="button" className="btn-bento-cancel" onClick={closeModal}>Batal</button>
                <button type="submit" className="btn-bento-primary" disabled={saving}>
                  {saving ? 'Menyimpan...' : editItem ? 'Simpan Perubahan' : 'Tambah Pembicara'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PembicaraPage;