import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonRippleEffect, IonRefresher, IonRefresherContent, IonBadge,
} from '@ionic/react';
import { notificationsOutline, chevronForward, trophyOutline, peopleOutline, documentTextOutline, checkmarkCircle, analyticsOutline } from 'ionicons/icons';
import { useAuth } from '../../App';
import { useHistory } from 'react-router-dom';
import './TeacherDashboard.css';

const IMPLEMENTERS = [
  { id: 'imp1', name: 'Rosa Bautista',   barangay: 'San Miguel',  learners: 12, avgProgress: 64, fltCompliance: 92, color: '#d97706' },
  { id: 'imp2', name: 'Carlos Mendoza',  barangay: 'Dicklum',     learners: 10, avgProgress: 78, fltCompliance: 100, color: '#16a34a' },
  { id: 'imp3', name: 'Elena Torres',    barangay: 'Ticala',      learners: 8,  avgProgress: 55, fltCompliance: 75, color: '#7c3aed' },
  { id: 'imp4', name: 'Ramon Garcia',    barangay: 'Tankulan',    learners: 15, avgProgress: 42, fltCompliance: 60, color: '#dc2626' },
];

const PENDING_TASKS = [
  { id: 't1', label: 'Review attendance reports — San Miguel CLC',  due: 'Today',   color: '#dc2626' },
  { id: 't2', label: 'Approve FLT results — Dicklum batch',         due: 'Mar 12',  color: '#d97706' },
  { id: 't3', label: 'Upload new LS 3 module for District I',       due: 'Mar 14',  color: '#1d4ed8' },
];

const RECENT_AUDIT = [
  { id: 'a1', action: 'FLT results approved for Brgy. Dicklum', timestamp: 'Mar 9, 2026 10:22 AM', user: 'You' },
  { id: 'a2', action: 'Learner enrolled by Implementer Rosa B.', timestamp: 'Mar 8, 2026 3:15 PM', user: 'Rosa Bautista' },
  { id: 'a3', action: 'Attendance report submitted — San Miguel', timestamp: 'Mar 7, 2026 5:00 PM', user: 'Rosa Bautista' },
];

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const history  = useHistory();

  const totalLearners = IMPLEMENTERS.reduce((s, i) => s + i.learners, 0);
  const avgProgress = Math.round(IMPLEMENTERS.reduce((s, i) => s + i.avgProgress, 0) / IMPLEMENTERS.length);

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <div className="t-dash-toolbar">
            <div>
              <p className="greet-label">Welcome back 📚</p>
              <h1 className="greet-name">{user?.name}</h1>
              <span className="greet-badge">ALS Mobile Teacher — District I</span>
            </div>
            <div className="dash-actions-row">
              <button className="notif-btn ion-activatable">
                <IonRippleEffect />
                <IonIcon icon={notificationsOutline} />
                <IonBadge color="danger" className="notif-badge">5</IonBadge>
              </button>
              <div className="dash-avatar">{user?.avatar}</div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="t-dash-content">
        <IonRefresher slot="fixed"><IonRefresherContent /></IonRefresher>

        <div className="t-dash-body">

          {/* ── Summary stats ── */}
          <div className="t-stats">
            {[
              { icon: peopleOutline,      num: String(totalLearners), lbl: 'Total Learners',  color: '#1d4ed8' },
              { icon: documentTextOutline, num: String(IMPLEMENTERS.length), lbl: 'Implementers', color: '#d97706' },
              { icon: checkmarkCircle,    num: '12',    lbl: 'Pending Tasks',  color: '#dc2626' },
              { icon: trophyOutline,      num: `${avgProgress}%`, lbl: 'Avg. Progress',  color: '#16a34a' },
            ].map((s) => (
              <div key={s.lbl} className="t-stat-card">
                <IonIcon icon={s.icon} style={{ color: s.color, fontSize: 22, marginBottom: 4 }} />
                <p className="t-stat-num">{s.num}</p>
                <p className="t-stat-lbl">{s.lbl}</p>
              </div>
            ))}
          </div>

          {/* ── Multi-Center View: Implementers ── */}
          <div className="t-section">
            <div className="t-section-row">
              <p className="section-title">Implementer Overview (District I)</p>
              <button className="see-all" onClick={() => history.push('/teacher/implementers')}>
                Manage <IonIcon icon={chevronForward} />
              </button>
            </div>
            <div className="t-classes-list">
              {IMPLEMENTERS.map((imp) => (
                <div key={imp.id} className="t-class-card ion-activatable" onClick={() => history.push('/teacher/implementers')}>
                  <IonRippleEffect />
                  <div className="t-class-icon" style={{ background: imp.color + '18', color: imp.color }}>
                    👥
                  </div>
                  <div className="t-class-info">
                    <p className="t-class-name">{imp.name}</p>
                    <p className="t-class-meta">📍 {imp.barangay} · {imp.learners} learners</p>
                    <div className="als-progress-track" style={{ marginTop: 6 }}>
                      <div className="als-progress-fill" style={{ width: `${imp.avgProgress}%`, background: imp.avgProgress >= 60 ? '#16a34a' : '#dc2626' }} />
                    </div>
                    <p className="t-class-meta" style={{ marginTop: 4 }}>Avg. {imp.avgProgress}% · FLT Compliance: {imp.fltCompliance}%</p>
                  </div>
                  <IonIcon icon={chevronForward} style={{ color: '#cbd5e1', fontSize: 18, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Pending Tasks ── */}
          <div className="t-section">
            <p className="section-title">Pending Tasks</p>
            <div className="t-tasks-list">
              {PENDING_TASKS.map((t) => (
                <div key={t.id} className="t-task-item">
                  <div className="t-task-dot" style={{ background: t.color }} />
                  <p className="t-task-label">{t.label}</p>
                  <span className="t-task-due" style={{ color: t.color }}>{t.due}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Recent Audit Log ── */}
          <div className="t-section">
            <div className="t-section-row">
              <p className="section-title">Recent Activity Log</p>
              <button className="see-all" onClick={() => history.push('/teacher/reports')}>
                View All <IonIcon icon={chevronForward} />
              </button>
            </div>
            <div className="t-audit-list">
              {RECENT_AUDIT.map((a) => (
                <div key={a.id} className="t-audit-item">
                  <p className="t-audit-action">{a.action}</p>
                  <p className="t-audit-meta">{a.user} · {a.timestamp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Quick Actions ── */}
          <div className="t-section">
            <p className="section-title">Quick Actions</p>
            <div className="t-quick-grid">
              {[
                { icon: '📊', label: 'FLT Oversight',       href: '/teacher/flt',           color: '#1d4ed8' },
                { icon: '📤', label: 'Recommend Content',    href: '/teacher/implementers',  color: '#16a34a' },
                { icon: '📋', label: 'View Reports',         href: '/teacher/reports',       color: '#7c3aed' },
                { icon: '✉️',  label: 'Message Implementer', href: '/teacher/implementers',  color: '#d97706' },
              ].map((qa) => (
                <div key={qa.label} className="t-quick-card ion-activatable" onClick={() => history.push(qa.href)}>
                  <IonRippleEffect />
                  <div className="t-qc-icon" style={{ background: qa.color + '18' }}>{qa.icon}</div>
                  <p className="t-qc-label">{qa.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default TeacherDashboard;
