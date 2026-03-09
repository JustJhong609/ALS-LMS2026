import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonIcon,
  IonRippleEffect, IonBadge,
} from '@ionic/react';
import { notificationsOutline, peopleOutline, bookOutline, documentTextOutline, trophyOutline, chevronForward } from 'ionicons/icons';
import { useAuth } from '../../App';
import { useHistory } from 'react-router-dom';
import './AdminDashboard.css';

const RECENT_ACTIVITY = [
  { id: 1, text: 'New learner registered: Pedro Aldrin', time: '5 min ago',  icon: '👤', color: '#1d4ed8' },
  { id: 2, text: 'Maria Santos completed \'Filipino\' course', time: '1 hr ago',   icon: '🏆', color: '#16a34a' },
  { id: 3, text: 'New facilitator account approved',          time: '2 hrs ago',  icon: '✅', color: '#7c3aed' },
  { id: 4, text: 'System backup completed',                   time: '6 hrs ago',  icon: '💾', color: '#0891b2' },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const history  = useHistory();

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <div className="admin-toolbar">
            <div>
              <p className="a-greet-label">System Administration</p>
              <h1 className="a-greet-name">{user?.name}</h1>
              <span className="a-role-badge">ALS System Admin</span>
            </div>
            <div className="a-toolbar-right">
              <button className="notif-btn ion-activatable">
                <IonRippleEffect />
                <IonIcon icon={notificationsOutline} />
                <IonBadge color="danger" className="notif-badge">8</IonBadge>
              </button>
              <div className="a-avatar">{user?.avatar}</div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="admin-content">
        <div className="admin-body">

          {/* ── System stats ── */}
          <div className="admin-stats-grid">
            {[
              { icon: peopleOutline,       num: '12,482', lbl: 'Total Learners',    color: '#1d4ed8', href: '/admin/users' },
              { icon: peopleOutline,       num: '480',    lbl: 'Facilitators',      color: '#16a34a', href: '/admin/users' },
              { icon: bookOutline,         num: '48',     lbl: 'Active Courses',    color: '#7c3aed', href: '/admin/courses' },
              { icon: documentTextOutline, num: '2,104',  lbl: 'Assessments Taken', color: '#d97706', href: '/admin/reports' },
              { icon: trophyOutline,       num: '1,820',  lbl: 'Certificates',      color: '#0891b2', href: '/admin/reports' },
              { icon: peopleOutline,       num: '95%',    lbl: 'Pass Rate',         color: '#dc2626', href: '/admin/reports' },
            ].map((s) => (
              <div key={s.lbl} className="admin-stat-card ion-activatable" onClick={() => history.push(s.href)}>
                <IonRippleEffect />
                <div className="asc-icon" style={{ background: s.color + '18', color: s.color }}>
                  <IonIcon icon={s.icon} />
                </div>
                <p className="asc-num" style={{ color: s.color }}>{s.num}</p>
                <p className="asc-lbl">{s.lbl}</p>
              </div>
            ))}
          </div>

          {/* ── Recent Activity ── */}
          <div className="admin-section">
            <div className="admin-section-row">
              <p className="section-title">Recent Activity</p>
            </div>
            <div className="activity-list">
              {RECENT_ACTIVITY.map((a) => (
                <div key={a.id} className="activity-item">
                  <div className="activity-icon-wrap" style={{ background: a.color + '18' }}>
                    <span>{a.icon}</span>
                  </div>
                  <div className="activity-info">
                    <p className="activity-text">{a.text}</p>
                    <p className="activity-time">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Quick Admin Actions ── */}
          <div className="admin-section">
            <p className="section-title">Admin Actions</p>
            <div className="admin-quick-list">
              {[
                { icon: '👤', label: 'Manage Users',          href: '/admin/users',    color: '#1d4ed8' },
                { icon: '📚', label: 'Manage Courses',        href: '/admin/courses',  color: '#16a34a' },
                { icon: '📊', label: 'System Reports',        href: '/admin/reports',  color: '#7c3aed' },
                { icon: '⚙️', label: 'System Settings',       href: '/admin/settings', color: '#64748b' },
              ].map((qa) => (
                <div key={qa.label} className="admin-quick-item ion-activatable" onClick={() => history.push(qa.href)}>
                  <IonRippleEffect />
                  <div className="aqi-icon" style={{ background: qa.color + '18' }}>{qa.icon}</div>
                  <span className="aqi-label">{qa.label}</span>
                  <IonIcon icon={chevronForward} style={{ color: '#cbd5e1', fontSize: 18 }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
