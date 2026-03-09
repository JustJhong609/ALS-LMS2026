import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon, IonToggle, IonRippleEffect, IonAlert } from '@ionic/react';
import { createOutline, settingsOutline, notificationsOutline, helpCircleOutline, logOutOutline, chevronForward, bookOutline, peopleOutline } from 'ionicons/icons';
import { useAuth } from '../../App';
import './TeacherProfile.css';

const TeacherProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [notifOn, setNotifOn] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const menu = [
    { icon: createOutline,        label: 'Edit Profile',       color: '#16a34a' },
    { icon: settingsOutline,      label: 'Account Settings',   color: '#64748b' },
    { icon: notificationsOutline, label: 'Notifications',      color: '#d97706', toggle: true },
    { icon: bookOutline,          label: 'My Materials',       color: '#1d4ed8' },
    { icon: peopleOutline,        label: 'My Classes',         color: '#7c3aed' },
    { icon: helpCircleOutline,    label: 'Help & Support',     color: '#0891b2' },
  ];

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <div style={{ padding: '12px 20px 8px' }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>My Profile</span>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="t-profile-content">
        <div className="t-profile-hero">
          <div className="t-hero-wave" />
          <div className="t-avatar-wrap">
            <div className="t-avatar">{user?.avatar}</div>
          </div>
          <h2 className="t-profile-name">{user?.name}</h2>
          <p className="t-profile-role">ALS Facilitator</p>
          <div className="t-profile-stats">
            <div className="tps"><span className="tps-num">3</span><span className="tps-lbl">Classes</span></div>
            <div className="tps-div" />
            <div className="tps"><span className="tps-num">55</span><span className="tps-lbl">Learners</span></div>
            <div className="tps-div" />
            <div className="tps"><span className="tps-num">76%</span><span className="tps-lbl">Pass Rate</span></div>
          </div>
        </div>

        <div className="t-profile-body">
          <div className="menu-card">
            {menu.map((item) => (
              <div key={item.label} className="menu-item ion-activatable">
                <IonRippleEffect />
                <div className="menu-icon-wrap" style={{ background: item.color + '18' }}>
                  <IonIcon icon={item.icon} style={{ color: item.color }} />
                </div>
                <span className="menu-label">{item.label}</span>
                {item.toggle ? (
                  <IonToggle checked={notifOn} onIonChange={(e) => setNotifOn(e.detail.checked)} />
                ) : (
                  <IonIcon icon={chevronForward} className="menu-arrow" />
                )}
              </div>
            ))}
          </div>

          <button className="logout-btn ion-activatable" onClick={() => setShowAlert(true)}>
            <IonRippleEffect />
            <IonIcon icon={logOutOutline} />
            Sign Out
          </button>
          <p className="app-ver">ALS-LMS 2026 · v1.0.0</p>
        </div>

        <IonAlert isOpen={showAlert} header="Sign Out" message="Are you sure?" buttons={[{ text: 'Cancel', role: 'cancel' }, { text: 'Sign Out', role: 'destructive', handler: logout }]} onDidDismiss={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default TeacherProfile;
