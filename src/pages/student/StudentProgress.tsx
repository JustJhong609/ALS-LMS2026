import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,
} from '@ionic/react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';
import { trophyOutline, flameOutline, ribbonOutline, timeOutline } from 'ionicons/icons';
import './StudentProgress.css';

const RADAR_DATA = [
  { subject: 'Filipino',   A: 72 },
  { subject: 'English',    A: 55 },
  { subject: 'Math',       A: 88 },
  { subject: 'Science',    A: 40 },
  { subject: 'AP',         A: 100 },
  { subject: 'EsP',        A: 60 },
];

const BAR_DATA = [
  { month: 'Oct', score: 62 },
  { month: 'Nov', score: 70 },
  { month: 'Dec', score: 68 },
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 80 },
  { month: 'Mar', score: 85 },
];

const BADGES = [
  { icon: '🏅', label: 'First Lesson!',    earned: true },
  { icon: '🔥', label: '7-Day Streak',     earned: true },
  { icon: '🎯', label: 'Perfect Score',    earned: true },
  { icon: '📚', label: '10 Lessons Done',  earned: true },
  { icon: '⭐', label: 'Top Performer',    earned: false },
  { icon: '💎', label: 'Subject Master',   earned: false },
  { icon: '🚀', label: 'Early Bird',       earned: true },
  { icon: '🏆', label: 'ALS Champion',     earned: false },
];

const StudentProgress: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title">My Progress</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="progress-content">
        <div className="progress-body">

          {/* ── Summary Pills ── */}
          <div className="prog-stats">
            <div className="prog-stat-card">
              <IonIcon icon={flameOutline} style={{ color: '#d97706' }} />
              <span className="ps-num">12</span>
              <span className="ps-lbl">Day Streak</span>
            </div>
            <div className="prog-stat-card">
              <IonIcon icon={trophyOutline} style={{ color: '#1d4ed8' }} />
              <span className="ps-num">7</span>
              <span className="ps-lbl">Badges</span>
            </div>
            <div className="prog-stat-card">
              <IonIcon icon={ribbonOutline} style={{ color: '#7c3aed' }} />
              <span className="ps-num">85%</span>
              <span className="ps-lbl">Avg. Score</span>
            </div>
            <div className="prog-stat-card">
              <IonIcon icon={timeOutline} style={{ color: '#16a34a' }} />
              <span className="ps-num">18h</span>
              <span className="ps-lbl">Total Time</span>
            </div>
          </div>

          {/* ── Skills Radar ── */}
          <div className="prog-card">
            <p className="prog-card-title">Subject Mastery</p>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid gridType="polygon" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                <Radar dataKey="A" stroke="#1d4ed8" fill="#1d4ed8" fillOpacity={0.25} dot={{ r: 4, fill: '#1d4ed8' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* ── Monthly Scores ── */}
          <div className="prog-card">
            <p className="prog-card-title">Monthly Score Trend</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={BAR_DATA} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                  formatter={(v: number) => [`${v}%`, 'Score']}
                />
                {BAR_DATA.map((entry, index) => (
                  <Bar key={index} dataKey="score" radius={[6, 6, 0, 0]}>
                    <Cell fill={entry.score >= 80 ? '#16a34a' : entry.score >= 70 ? '#1d4ed8' : '#d97706'} />
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ── Subject breakdown ── */}
          <div className="prog-card">
            <p className="prog-card-title">Subject Breakdown</p>
            {RADAR_DATA.map((s) => (
              <div key={s.subject} className="subj-row">
                <p className="subj-name">{s.subject}</p>
                <div className="als-progress-track subj-track">
                  <div
                    className="als-progress-fill"
                    style={{
                      width: `${s.A}%`,
                      background: s.A >= 80 ? '#16a34a' : s.A >= 60 ? '#1d4ed8' : '#d97706',
                    }}
                  />
                </div>
                <span className="subj-pct">{s.A}%</span>
              </div>
            ))}
          </div>

          {/* ── Badges ── */}
          <div className="prog-card">
            <p className="prog-card-title">Achievements & Badges</p>
            <div className="badge-grid">
              {BADGES.map((b) => (
                <div key={b.label} className={`badge-item ${b.earned ? 'earned' : 'locked'}`}>
                  <span className="badge-icon">{b.icon}</span>
                  <p className="badge-label">{b.label}</p>
                  {!b.earned && <div className="badge-lock">🔒</div>}
                </div>
              ))}
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default StudentProgress;
