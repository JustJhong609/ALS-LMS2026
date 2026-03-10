import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonRefresher,
  IonRefresherContent, IonRippleEffect, IonIcon, IonBadge,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { notificationsOutline, chevronForward, peopleOutline, clipboardOutline, folderOpenOutline, alertCircleOutline } from 'ionicons/icons';
import { useAuth } from '../../App';
import './ImplementerDashboard.css';

const ASSIGNED_LEARNERS = [
  { id: 's1', name: 'Maria Santos',    level: 'Elementary', progress: 72, status: 'active',   barangay: 'San Miguel' },
  { id: 's2', name: 'Jose Reyes',      level: 'Elementary', progress: 45, status: 'active',   barangay: 'Dicklum' },
  { id: 's3', name: 'Ana Dela Cruz',   level: 'Junior HS',  progress: 88, status: 'active',   barangay: 'Ticala' },
  { id: 's4', name: 'Pedro Gonzales',  level: 'Junior HS',  progress: 30, status: 'inactive', barangay: 'Tankulan' },
  { id: 's5', name: 'Rosa Bautista',   level: 'Elementary', progress: 60, status: 'active',   barangay: 'Gaboc' },
];

const ANNOUNCEMENTS = [
  { id: 1, title: 'F2F Session at Brgy. San Miguel CLC — Mar 13', color: '#16a34a' },
  { id: 2, title: 'Submit learner attendance report by Mar 15',     color: '#d97706' },
  { id: 3, title: 'New supplementary materials uploaded by Teacher', color: '#1d4ed8' },
];

const needsIntervention = ASSIGNED_LEARNERS.filter((l) => l.progress < 50);

const ImplementerDashboard: React.FC = () => {
  const { user } = useAuth();
  const history  = useHistory();

  const avgProgress = Math.round(
    ASSIGNED_LEARNERS.reduce((s, l) => s + l.progress, 0) / ASSIGNED_LEARNERS.length
  );

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <div className="imp-dash-toolbar">
            <div>
              <p className="greet-label">Welcome 👋</p>
              <h1 className="greet-name">{user?.name}</h1>
              <span className="greet-badge imp-badge">ALS Implementer (Volunteer)</span>
            </div>
            <div className="dash-actions-row">
              <button className="notif-btn ion-activatable">
                <IonRippleEffect />
                <IonIcon icon={notificationsOutline} />
                <IonBadge color="danger" className="notif-badge">3</IonBadge>
              </button>
              <div className="dash-avatar">{user?.avatar}</div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="imp-dash-content">
        <IonRefresher slot="fixed"><IonRefresherContent /></IonRefresher>

        <div className="imp-dash-body">

          {/* ── Summary Stats ── */}
          <div className="imp-stats">
            <div className="imp-stat-card">
              <IonIcon icon={peopleOutline} style={{ color: '#d97706', fontSize: 22 }} />
              <p className="imp-stat-num">{ASSIGNED_LEARNERS.length}</p>
              <p className="imp-stat-lbl">Assigned Learners</p>
            </div>
            <div className="imp-stat-card">
              <p className="imp-stat-num">{ASSIGNED_LEARNERS.filter(l => l.status === 'active').length}</p>
              <p className="imp-stat-lbl">Active</p>
            </div>
            <div className="imp-stat-card">
              <p className="imp-stat-num">{avgProgress}%</p>
              <p className="imp-stat-lbl">Avg. Progress</p>
            </div>
            <div className="imp-stat-card">
              <IonIcon icon={alertCircleOutline} style={{ color: '#dc2626', fontSize: 22 }} />
              <p className="imp-stat-num">{needsIntervention.length}</p>
              <p className="imp-stat-lbl">Need Help</p>
            </div>
          </div>

          {/* ── Announcements ── */}
          <div className="imp-section">
            <p className="section-title">Announcements</p>
            <div className="imp-ann-list">
              {ANNOUNCEMENTS.map((a) => (
                <div key={a.id} className="imp-ann-item" style={{ borderLeft: `4px solid ${a.color}` }}>
                  <p className="imp-ann-text">{a.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Needs Intervention ── */}
          {needsIntervention.length > 0 && (
            <div className="imp-section">
              <p className="section-title" style={{ color: '#dc2626' }}>⚠ Needs Intervention</p>
              {needsIntervention.map((l) => (
                <div key={l.id} className="imp-learner-alert">
                  <div className="imp-learner-avatar">{l.name.split(' ').map(n => n[0]).join('')}</div>
                  <div className="imp-learner-info">
                    <p className="imp-learner-name">{l.name}</p>
                    <p className="imp-learner-meta">{l.level} · {l.barangay} · {l.progress}% progress</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── My Learners Preview ── */}
          <div className="imp-section">
            <div className="imp-section-row">
              <p className="section-title">My Learners</p>
              <button className="see-all" onClick={() => history.push('/implementer/learners')}>
                View All <IonIcon icon={chevronForward} />
              </button>
            </div>
            {ASSIGNED_LEARNERS.slice(0, 3).map((l) => (
              <div key={l.id} className="imp-learner-card">
                <div className="imp-learner-avatar">{l.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="imp-learner-info">
                  <p className="imp-learner-name">{l.name}</p>
                  <p className="imp-learner-meta">{l.level} · {l.barangay}</p>
                  <div className="als-progress-track" style={{ marginTop: 4 }}>
                    <div className="als-progress-fill" style={{ width: `${l.progress}%`, background: l.progress >= 75 ? '#16a34a' : l.progress >= 50 ? '#d97706' : '#dc2626' }} />
                  </div>
                </div>
                <span className="imp-learner-pct">{l.progress}%</span>
              </div>
            ))}
          </div>

          {/* ── Quick Actions ── */}
          <div className="imp-section">
            <p className="section-title">Quick Actions</p>
            <div className="imp-quick-grid">
              <div className="imp-quick-card ion-activatable" onClick={() => history.push('/implementer/learners')}>
                <IonRippleEffect />
                <span style={{ fontSize: 24 }}>👥</span>
                <p>View Learners</p>
              </div>
              <div className="imp-quick-card ion-activatable" onClick={() => history.push('/implementer/resources')}>
                <IonRippleEffect />
                <span style={{ fontSize: 24 }}>📂</span>
                <p>Share Resources</p>
              </div>
              <div className="imp-quick-card ion-activatable" onClick={() => history.push('/implementer/flt')}>
                <IonRippleEffect />
                <span style={{ fontSize: 24 }}>📋</span>
                <p>FLT Results</p>
              </div>
              <div className="imp-quick-card ion-activatable" onClick={() => {}}>
                <IonRippleEffect />
                <span style={{ fontSize: 24 }}>✉️</span>
                <p>Message Teacher</p>
              </div>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default ImplementerDashboard;
