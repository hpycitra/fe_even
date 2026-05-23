import { useEffect, useState } from 'react';
import { Calendar, Tags, Mic2, TrendingUp } from 'lucide-react';
import api from '../lib/api';

interface Event {
  id: number;
  title: string;
  date: string;
  status: string;
}

interface Stats {
  events: number;
  categories: number;
  pembicara: number;
  upcoming: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<Stats>({
    events: 0,
    categories: 0,
    pembicara: 0,
    upcoming: 0,
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evRes, catRes, spkRes] = await Promise.all([
          api.get('/events'),
          api.get('/categories'),
          api.get('/pembicara'),
        ]);

        const upcoming = evRes.data.filter(
          (e: Event) => e.status === 'upcoming'
        ).length;

        setStats({
          events: evRes.data.length,
          categories: catRes.data.length,
          pembicara: spkRes.data.length,
          upcoming,
        });

        // Ambil 5 event terbaru
        setEvents(evRes.data.slice(0, 5));
      } catch (error) {
        console.error("Gagal memuat data dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hitung persentase dinamis untuk chart lingkaran
  const totalEventsCount = stats.events || 1; 
  const upcomingPercent = Math.round((stats.upcoming / totalEventsCount) * 100);
  const remainingPercent = 100 - upcomingPercent;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        .dash {
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 1200px;
          margin: auto;
          padding: 30px 20px;
          color: #fff;
        }

        .fade {
          animation: fadeIn 0.6s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }

        /* BENTO GRID SYSTEM */
        .bento-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 20px;
          margin-top: 25px;
        }

        .bento-left-column, .bento-right-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* CARD GAYA GLASSMORPHISM */
        .bento-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .large-stats-card {
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-label {
          font-size: 14px;
          font-weight: 600;
          opacity: 0.7;
          color: #a3a3c2;
        }

        .large-value-wrapper {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-top: 10px;
         }

        .big-value {
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .growth-badge {
          font-size: 14px;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.15);
          padding: 4px 8px;
          border-radius: 8px;
        }

        /* SVG SPARKLINE GRAPH */
        .sparkline-container {
          margin-top: 20px;
          width: 100%;
          height: 60px;
        }

        .med-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .big-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #6366f1;
        }

        /* DONUT CHART SIMULATION */
        .chart-section {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 15px;
        }

        .donut-chart {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: conic-gradient(
            #4facfe 0% ${upcomingPercent}%, 
            rgba(255, 255, 255, 0.1) ${upcomingPercent}% 100%
          );
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .donut-inner-hole {
          width: 60px;
          height: 60px;
          background: #121224;
          border-radius: 50%;
        }

        .chart-legends {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        /* RECENT EVENTS LIST */
        .event-list {
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .event-item {
          padding: 12px 16px;
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .event-item:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.1);
        }

        .event-title {
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
        }

        .event-meta {
          font-size: 12px;
          opacity: 0.5;
          margin-top: 2px;
        }

        .status-pill {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 600;
        }
      `}</style>

      <div className="dash">
        
        {/* HEADER */}
        <div className="fade">
          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f093fb, #4facfe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}>
            Dashboard
          </h1>
          <p style={{ opacity: 0.5, fontSize: '14px' }}>Analisis Ringkasan Platform</p>
        </div>

        {/* BENTO GRID SYSTEM */}
        <div className="bento-grid fade">
          
          {/* KOLOM KIRI */}
          <div className="bento-left-column">
            
            {/* BOX 1: TOTAL EVENT & MINI TREND GRAPH */}
            <div className="bento-card large-stats-card">
              <div>
                <div className="card-label">Total Seluruh Event</div>
                <div className="large-value-wrapper">
                  <div className="big-value">{stats.events}</div>
                  <div className="growth-badge">▲ Aktif</div>
                </div>
              </div>
              
              {/* Grafik Garis Sparkline */}
              <div className="sparkline-container">
                <svg viewBox="0 0 300 60" width="100%" height="100%" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4facfe" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4facfe" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 0 50 Q 40 20 80 45 T 160 15 T 240 35 T 300 10" 
                    fill="none" 
                    stroke="#4facfe" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M 0 50 Q 40 20 80 45 T 160 15 T 240 35 T 300 10 L 300 60 L 0 60 Z" 
                    fill="url(#sparkline-grad)"
                  />
                </svg>
              </div>
            </div>

            {/* BOX 2: RECENT EVENTS */}
            <div className="bento-card">
              <div className="card-label" style={{ marginBottom: '5px' }}>Event Terbaru</div>
              <div className="event-list">
                {loading ? (
                  <p style={{ opacity: 0.5, fontSize: '13px' }}>Memuat data...</p>
                ) : events.length === 0 ? (
                  <p style={{ opacity: 0.5, fontSize: '13px' }}>Belum ada data event.</p>
                ) : (
                  events.map((e) => (
                    <div key={e.id} className="event-item">
                      <div>
                        <div className="event-title">{e.title}</div>
                        <div className="event-meta">
                          {new Date(e.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="status-pill" style={{
                        background: e.status === 'upcoming' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(107, 114, 128, 0.15)',
                        color: e.status === 'upcoming' ? '#818cf8' : '#9ca3af'
                      }}>
                        {e.status === 'upcoming' ? 'Akan Datang' : e.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* KOLOM KANAN */}
          <div className="bento-right-column">
            
            {/* BARIS DATA DOUBLE BERDAMPINGAN: UPCOMING & KATEGORI */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* METRIK 2: UPCOMING */}
              <div className="bento-card" style={{ padding: '20px' }}>
                <div className="med-card-header">
                  <div>
                    <div className="card-label">Upcoming</div>
                    <div className="big-value" style={{ fontSize: '28px', marginTop: '5px' }}>{stats.upcoming}</div>
                  </div>
                  <div className="big-icon-box" style={{ width: '38px', height: '38px' }}>
                    <TrendingUp size={16} />
                  </div>
                </div>
              </div>

              {/* METRIK 3: KATEGORI */}
              <div className="bento-card" style={{ padding: '20px' }}>
                <div className="med-card-header">
                  <div>
                    <div className="card-label">Kategori</div>
                    <div className="big-value" style={{ fontSize: '28px', marginTop: '5px' }}>{stats.categories}</div>
                  </div>
                  <div className="big-icon-box" style={{ width: '38px', height: '38px', color: '#f093fb' }}>
                    <Tags size={16} />
                  </div>
                </div>
              </div>

            </div>

            {/* BOX CHART PROPORSI DATA */}
            <div className="bento-card">
              <div className="card-label">Proporsi Sesi Utama</div>
              
              <div className="chart-section">
                <div className="donut-chart">
                  <div className="donut-inner-hole"></div>
                </div>

                <div className="chart-legends">
                  <div className="legend-item">
                    <div className="dot" style={{ backgroundColor: '#4facfe' }}></div>
                    <span>Akan Datang ({upcomingPercent}%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="dot" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    <span>Selesai / Lainnya ({remainingPercent}%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* METRIK 4: TOTAL PEMBICARA */}
            <div className="bento-card" style={{ padding: '18px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="card-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <Mic2 size={16} style={{ color: '#6366f1' }} /> Total Pembicara
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800' }}>{stats.pembicara} Ahli</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default DashboardPage;