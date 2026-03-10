import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonIcon,
  IonToggle, IonRippleEffect, IonAlert,
} from '@ionic/react';
import {
  createOutline, settingsOutline, notificationsOutline, helpCircleOutline,
  logOutOutline, chevronForward, peopleOutline, folderOpenOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../App';
import './ImplementerProfile.css';

const ImplementerProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [notifOn, setNotifOn] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    logout();
    history.replace('/');
  };

  const menu = [
    { icon: createOutline,        label: 'Edit Profile',       color: '#d97706' },
    { icon: settingsOutline,      label: 'Account Settings',   color: '#64748b' },
    { icon: notificationsOutline, label: 'Notifications',      color: '#1d4ed8', toggle: true },
    { icon: folderOpenOutline,    label: 'My Shared Resources', color: '#16a34a' },
    { icon: peopleOutline,        label: 'My Learners',        color: '#7c3aed' },
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

      <IonContent className="imp-prof-content">
        <div className="imp-prof-hero">
          <div className="imp-prof-wave" />
          <div className="imp-prof-av-wrap">
            <div className="imp-prof-av">{user?.avatar}</div>
          </div>
          <h2 className="imp-prof-name">{user?.name}</h2>
          <p className="imp-prof-role">ALS Implementer (Volunteer)</p>
          <p className="imp-prof-district">District I — Manolo Fortich, Bukidnon</p>
          <div className="imp-prof-stats">
            <div className="ips"><span className="ips-num">5</span><span className="ips-lbl">Learners</span></div>
            <div className="ips-div" />
            <div className="ips"><span className="ips-num">4</span><span className="ips-lbl">Resources</span></div>
            <div className="ips-div" />
            <div className="ips"><span className="ips-num">59%</span><span className="ips-lbl">Avg. Progress</span></div>
          </div>
        </div>

        <div className="imp-prof-body">
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

        <IonAlert isOpen={showAlert} header="Sign Out" message="Are you sure?" buttons={[{ text: 'Cancel', role: 'cancel' }, { text: 'Sign Out', role: 'destructive', handler: handleLogout }]} onDidDismiss={() => setShowAlert(false)} />
      </IonContent>
    </IonPage>
  );
};

export default ImplementerProfile;
