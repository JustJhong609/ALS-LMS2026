import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonRippleEffect, IonRefresher, IonRefresherContent, IonBadge,
} from '@ionic/react';
import { notificationsOutline, chevronForward, trophyOutline, peopleOutline, documentTextOutline, checkmarkCircle } from 'ionicons/icons';
import { useAuth } from '../../App';
import { useHistory } from 'react-router-dom';
import './TeacherDashboard.css';

const CLASSES = [
  { id: 'cls1', name: 'Elementary Level — Section A', learners: 22, avgProgress: 64, color: '#1d4ed8' },
  { id: 'cls2', name: 'Secondary Junior — Section B', learners: 18, avgProgress: 78, color: '#16a34a' },
  { id: 'cls3', name: 'Elementary Level — Section C', learners: 15, avgProgress: 55, color: '#7c3aed' },
];

const PENDING_TASKS = [
  { id: 't1', label: 'Grade: Math Quiz (Section A)',       due: 'Today',   color: '#dc2626' },
  { id: 't2', label: 'Review: Science Essays (Section B)', due: 'Mar 12',  color: '#d97706' },
  { id: 't3', label: 'Upload: New Filipino Module',        due: 'Mar 14',  color: '#1d4ed8' },
];

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const history  = useHistory();

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <div className="t-dash-toolbar">
            <div>
              <p className="greet-label">Welcome back 📚</p>
              <h1 className="greet-name">{user?.name}</h1>
              <span className="greet-badge">ALS Facilitator</span>
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
              { icon: peopleOutline,      num: '55',    lbl: 'Total Learners', color: '#1d4ed8' },
              { icon: documentTextOutline,num: '3',     lbl: 'Classes',        color: '#16a34a' },
              { icon: checkmarkCircle,    num: '12',    lbl: 'To Grade',       color: '#d97706' },
              { icon: trophyOutline,      num: '66%',   lbl: 'Avg. Progress',  color: '#7c3aed' },
            ].map((s) => (
              <div key={s.lbl} className="t-stat-card">
                <IonIcon icon={s.icon} style={{ color: s.color, fontSize: 22, marginBottom: 4 }} />
                <p className="t-stat-num">{s.num}</p>
                <p className="t-stat-lbl">{s.lbl}</p>
              </div>
            ))}
          </div>

          {/* ── My Classes ── */}
          <div className="t-section">
            <div className="t-section-row">
              <p className="section-title">My Classes</p>
              <button className="see-all" onClick={() => history.push('/teacher/learners')}>
                View <IonIcon icon={chevronForward} />
              </button>
            </div>
            <div className="t-classes-list">
              {CLASSES.map((cls) => (
                <div key={cls.id} className="t-class-card ion-activatable">
                  <IonRippleEffect />
                  <div className="t-class-icon" style={{ background: cls.color + '18', color: cls.color }}>
                    👨‍🏫
                  </div>
                  <div className="t-class-info">
                    <p className="t-class-name">{cls.name}</p>
                    <p className="t-class-meta">{cls.learners} learners</p>
                    <div className="als-progress-track" style={{ marginTop: 6 }}>
                      <div className="als-progress-fill" style={{ width: `${cls.avgProgress}%`, background: cls.color }} />
                    </div>
                    <p className="t-class-meta" style={{ marginTop: 4 }}>Avg. {cls.avgProgress}% progress</p>
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

          {/* ── Quick Actions ── */}
          <div className="t-section">
            <p className="section-title">Quick Actions</p>
            <div className="t-quick-grid">
              {[
                { icon: '📝', label: 'Create Assessment', href: '/teacher/grading', color: '#1d4ed8' },
                { icon: '📤', label: 'Upload Material',   href: '/teacher/learners', color: '#16a34a' },
                { icon: '📊', label: 'View Reports',      href: '/teacher/reports', color: '#7c3aed' },
                { icon: '✉️',  label: 'Message Learner',  href: '/teacher/learners', color: '#d97706' },
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
