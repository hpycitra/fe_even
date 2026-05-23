import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Calendar, Eye, EyeOff, Lock, Hash, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(nim, password);
      toast.success('Login berhasil! Selamat datang.');
      navigate('/dashboard');
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Login gagal');
    }
  };

  return (
    <div className="sci-fi-universe">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .sci-fi-universe {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Efek Deep Nebula Space & Starfield */
          background: 
            radial-gradient(circle at 20% 30%, rgba(245, 87, 108, 0.15), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(79, 172, 254, 0.2), transparent 45%),
            radial-gradient(1px 1px at 10% 10%, #fff 100%, transparent),
            radial-gradient(1.5px 1.5px at 30% 50%, rgba(255,255,255,0.8) 100%, transparent),
            radial-gradient(1px 1px at 70% 20%, #fff 100%, transparent),
            radial-gradient(2px 2px at 85% 80%, rgba(255,255,255,0.9) 100%, transparent),
            #060814;
          background-size: 100% 100%, 100% 100%, 200px 200px, 350px 350px, 280px 280px, 400px 400px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }

        /* Dekorasi Jaringan Node Angkasa */
        .sci-fi-universe::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(79, 172, 254, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 172, 254, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black, transparent 70%);
        }

        /* ── CARD KACA AKRILIK 3D (3D GLASSMORPHISM) ── */
        .glass-cyber-panel {
          width: 100%;
          max-width: 460px;
          background: linear-gradient(135deg, rgba(20, 24, 54, 0.65) 0%, rgba(10, 12, 32, 0.85) 100%);
          border: 1px solid rgba(79, 172, 254, 0.25);
          border-radius: 32px;
          padding: 48px 40px;
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow: 
            0 30px 70px rgba(0, 0, 0, 0.8),
            inset 0 1px 2px rgba(255, 255, 255, 0.15),
            0 0 50px rgba(79, 172, 254, 0.1);
          z-index: 10;
          position: relative;
        }

        /* Garis Menyala Keliling Bergradasi */
        .glass-cyber-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 32px;
          padding: 1.5px;
          background: linear-gradient(140deg, rgba(79, 172, 254, 0.6), rgba(245, 87, 108, 0.6), transparent 50%, rgba(79, 172, 254, 0.4));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* ── Header Branding ── */
        .panel-branding {
          text-align: center;
          margin-bottom: 36px;
        }

        .neon-logo-box {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: rgba(13, 16, 38, 0.6);
          border: 1.5px solid rgba(245, 87, 108, 0.4);
          color: #f5576c;
          display: grid;
          place-items: center;
          margin: 0 auto 18px;
          box-shadow: 
            0 0 25px rgba(245, 87, 108, 0.25),
            inset 0 0 10px rgba(245, 87, 108, 0.2);
          filter: drop-shadow(0 0 5px rgba(245, 87, 108, 0.5));
        }

        .panel-branding h1 {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #ffffff 40%, #c4d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .panel-branding p {
          font-size: 12px;
          color: rgba(79, 172, 254, 0.8);
          margin-top: 6px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        /* ── Input Premium Form ── */
        .cyber-form-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-row label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding-left: 4px;
        }

        .input-glow-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-glow-container input {
          width: 100%;
          background: rgba(5, 7, 20, 0.6);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 15px 16px 15px 52px;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          letter-spacing: 0.5px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Bersihkan efek dasar autofill browser */
        .input-glow-container input:-webkit-autofill {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px #0b0d1f inset !important;
        }

        .input-glow-container input:focus {
          outline: none;
          background: rgba(4, 6, 18, 0.85);
          border-color: #4facfe;
          box-shadow: 
            0 0 25px rgba(79, 172, 254, 0.25),
            inset 0 0 15px rgba(79, 172, 254, 0.15);
          color: #4facfe;
        }

        .input-glow-container input:focus::placeholder {
          color: rgba(79, 172, 254, 0.4);
        }

        .icon-decorator {
          position: absolute;
          left: 20px;
          color: rgba(255, 255, 255, 0.25);
          pointer-events: none;
          transition: all 0.3s;
        }

        .input-glow-container input:focus ~ .icon-decorator {
          color: #4facfe;
          filter: drop-shadow(0 0 6px #4facfe);
        }

        .btn-toggle-eye {
          position: absolute;
          right: 18px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.25);
          cursor: pointer;
          display: grid;
          place-items: center;
          padding: 6px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .btn-toggle-eye:hover {
          color: #ff758c;
          filter: drop-shadow(0 0 4px #ff758c);
        }

        /* ── TOMBOL LOGIN EMAS/GRADASI METALIK (3D GLOW BUTTON) ── */
        .btn-neon-submit {
          margin-top: 12px;
          width: 100%;
          padding: 16px;
          border-radius: 18px;
          background: linear-gradient(90deg, #f5576c 0%, #ff7eb3 40%, #4facfe 100%);
          background-size: 200% auto;
          color: #ffffff;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          box-shadow: 
            0 12px 30px rgba(245, 87, 108, 0.3),
            0 0 20px rgba(79, 172, 254, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          justify-content: center;
          align-items: center;
          letter-spacing: 0.5px;
        }

        .btn-neon-submit:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-2px) scale(1.01);
          box-shadow: 
            0 15px 35px rgba(245, 87, 108, 0.45),
            0 0 30px rgba(79, 172, 254, 0.55);
        }

        .btn-neon-submit:active:not(:disabled) {
          transform: translateY(0) scale(1);
        }

        .btn-neon-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner-capsule {
          width: 22px;
          height: 22px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: fast-spin 0.6s linear infinite;
        }

        @keyframes fast-spin {
          to { transform: rotate(360deg); }
        }

        /* ── KOTAK PETUNJUK AKUN (PREMIUM HINT CONTAINER) ── */
        .glass-hint-panel {
          margin-top: 32px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(5, 8, 24, 0.5);
          border: 1px solid rgba(79, 172, 254, 0.15);
          border-radius: 16px;
          padding: 14px 18px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.4);
        }

        .glass-hint-panel svg {
          color: #4facfe;
          flex-shrink: 0;
          margin-top: 2px;
          filter: drop-shadow(0 0 4px #4facfe);
        }

        .glass-hint-panel strong {
          color: #4facfe;
          font-family: 'DM Mono', monospace;
          background: rgba(79, 172, 254, 0.12);
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid rgba(79, 172, 254, 0.2);
          font-weight: 500;
        }
        
        .glass-hint-panel strong.pass {
          color: #ff7eb3;
          background: rgba(245, 87, 108, 0.12);
          border-color: rgba(245, 87, 108, 0.2);
        }
      `}</style>

      {/* Main Glassmorphic Panel UI */}
      <div className="glass-cyber-panel">
        <div className="panel-branding">
          <div className="neon-logo-box">
            <Calendar size={30} />
          </div>
          <h1>NexaEvent</h1>
          <p>Event Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="cyber-form-grid">
          {/* Kolom NIM */}
          <div className="input-row">
            <label>NIM</label>
            <div className="input-glow-container">
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Masukkan NIM"
                required
                autoComplete="username"
              />
              <Hash size={18} className="icon-decorator" />
            </div>
          </div>

          {/* Kolom Password */}
          <div className="input-row">
            <label>PASSWORD</label>
            <div className="input-glow-container">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                required
                autoComplete="current-password"
              />
              <Lock size={18} className="icon-decorator" />
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button type="submit" className="btn-neon-submit" disabled={isLoading}>
            {isLoading ? <div className="spinner-capsule" /> : 'Masuk ke Dashboard'}
          </button>
        </form>

        {/* Info Hint Box Premium */}
        <div className="glass-hint-panel">
          <ShieldCheck size={18} />
          <span>
            Gunakan akun bawaan sistem untuk uji coba. NIM: <strong>24090103</strong> atau Password: <strong className="pass">24090103</strong>.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;