import { Github, Instagram, Linkedin, Mail, MapPin, Phone, BookOpen, GraduationCap } from 'lucide-react';

const BiodataPage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        body {
          background: radial-gradient(circle at top, #1a1a2e, #0f0f1a);
        }

        .bio-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #fff;
          padding: 40px 20px;
          max-width: 900px;
          margin: auto;
        }

        .bio-header {
          margin-bottom: 30px;
        }

        .bio-header h1 {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg,#f093fb,#4facfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* SEMUA KE BAWAH */
        .bio-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        /* CARD */
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(20px);
        }

        /* PROFILE JADI LINGKARAN */
        .profile {
          width: 320px;
          height: 320px;
          border-radius: 50%;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 30px;
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg,#f093fb,#f5576c);
          display: grid;
          place-items: center;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .profile h2 {
          font-size: 16px;
          font-weight: 700;
        }

        .profile p {
          font-size: 12px;
          opacity: 0.6;
          margin-bottom: 10px;
        }

        .contact {
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 8px;
        }

        .contact div {
          display: flex;
          gap: 6px;
          align-items: center;
          justify-content: center;
        }

        .social {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .social a {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: rgba(255,255,255,0.08);
          color: #fff;
          transition: all 0.3s ease;
        }

        .social a:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        /* CONTENT */
        .content {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          font-weight: 700;
        }

        .info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .info div {
          background: rgba(255,255,255,0.04);
          padding: 10px;
          border-radius: 10px;
        }

        .info span {
          font-size: 11px;
          opacity: 0.5;
        }

        .info strong {
          display: block;
          font-size: 13px;
        }

        .repo-link {
          color: #4facfe;
          text-decoration: none;
          font-size: 13px;
          transition: opacity 0.2s;
        }

        .repo-link:hover {
          text-decoration: underline;
          opacity: 0.9;
        }
      `}</style>

      <div className="bio-page">

        <div className="bio-header">
          <h1>Biodata Mahasiswa</h1>
        </div>

        <div className="bio-layout">

          {/* PROFILE BULAT */}
          <div className="card profile">
            <div className="avatar">H</div>
            <h2>Happy Citra Lestari</h2>
            <p>D-4 Teknik Informatika</p>

            <div className="contact">
              <div><Mail size={12}/> happy@gmail.com</div>
              <div><MapPin size={12}/> Tegal</div>
              <div><Phone size={12}/> 08xx</div>
            </div>

            <div className="social">
              <a href="https://github.com/hpycitra" target="_blank" rel="noreferrer"><Github size={16}/></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={16}/></a>
              <a href="https://instagram.com/_hceell_" target="_blank" rel="noreferrer"><Instagram size={16}/></a>
            </div>
          </div>

          {/* CONTENT KE BAWAH */}
          <div className="content">

            <div className="card">
              <div className="title"><GraduationCap size={18}/> Informasi Akademik</div>

              <div className="info">
                <div><span>Nama</span><strong>Happy Citra Lestari</strong></div>
                <div><span>NIM</span><strong>24090103</strong></div>
                <div><span>Prodi</span><strong>D-4 TI</strong></div>
                <div><span>Fakultas</span><strong>Vokasi</strong></div>
              </div>
            </div>

            <div className="card">
              <div className="title"><BookOpen size={18}/> Tentang</div>
              <p style={{fontSize:'13px', opacity:'0.7', lineHeight:'1.6'}}>
                Aplikasi Event Management berbasis web untuk mengelola, menstrukturkan, dan mempublikasikan kegiatan kampus secara digital. Dikembangkan sebagai bagian dari pemenuhan tugas praktik mahasiswa Teknik Informatika.
              </p>
            </div>

            <div className="card">
              <div className="title"><Github size={18}/> Repository</div>
              <a 
                href="https://github.com/hpycitra/event-management" 
                target="_blank" 
                rel="noreferrer" 
                className="repo-link"
              >
                github.com/hpycitra/event-management
              </a>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default BiodataPage;