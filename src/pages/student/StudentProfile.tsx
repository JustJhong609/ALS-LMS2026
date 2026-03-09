import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonIcon,
  IonList, IonItem, IonLabel, IonToggle, IonRippleEffect, IonAlert,
} from '@ionic/react';
import {
  personOutline, mailOutline, callOutline, schoolOutline, settingsOutline,
  notificationsOutline, shieldCheckmarkOutline, helpCircleOutline,
  logOutOutline, chevronForward, createOutline, trophyOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../App';
import './StudentProfile.css';

const COURSES_DONE = 1;
const BADGES_EARNED = 7;
const LESSONS_DONE = 45;

const StudentProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [notifOn, setNotifOn]   = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    logout();
    history.replace('/');
  };

  const menuItems = [
    { icon: createOutline,         label: 'Edit Profile',         color: '#1d4ed8' },
    { icon: settingsOutline,       label: 'Account Settings',     color: '#64748b' },
    { icon: notificationsOutline,  label: 'Notifications',        color: '#d97706', toggle: true },
    { icon: trophyOutline,         label: 'My Certificates',      color: '#7c3aed' },
    { icon: shieldCheckmarkOutline,label: 'Privacy & Security',   color: '#16a34a' },
    { icon: helpCircleOutline,     label: 'Help & Support',       color: '#0891b2' },
  ];

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <div className="prof-toolbar-inner">
            <span className="toolbar-title-text">My Profile</span>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="profile-content">

        {/* ── Hero card ── */}
        <div className="profile-hero">
          <div className="hero-wave" />
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{user?.avatar}</div>
            <button className="avatar-edit-btn">✏️</button>
          </div>
          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-role">ALS Learner · {user?.grade}</p>
          <div className="profile-stats-row">
            <div className="pstat">
              <span className="pstat-num">{COURSES_DONE}</span>
              <span className="pstat-lbl">Completed</span>
            </div>
            <div className="pstat-div" />
            <div className="pstat">
              <span className="pstat-num">{BADGES_EARNED}</span>
              <span className="pstat-lbl">Badges</span>
            </div>
            <div className="pstat-div" />
            <div className="pstat">
              <span className="pstat-num">{LESSONS_DONE}</span>
              <span className="pstat-lbl">Lessons</span>
            </div>
          </div>
        </div>

        <div className="profile-body">

          {/* ── Info card ── */}
          <div className="info-card">
            <p className="info-card-title">Personal Information</p>
            {[
              { icon: personOutline,  label: 'Full Name',    value: user?.name },
              { icon: mailOutline,    label: 'Email',        value: user?.email },
              { icon: callOutline,    label: 'Mobile',       value: '09XX XXX XXXX' },
              { icon: schoolOutline,  label: 'Level',        value: user?.grade },
            ].map((row) => (
              <div key={row.label} className="info-row">
                <div className="info-icon-wrap">
                  <IonIcon icon={row.icon} />
                </div>
                <div className="info-details">
                  <p className="info-lbl">{row.label}</p>
                  <p className="info-val">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Menu ── */}
          <div className="menu-card">
            {menuItems.map((item) => (
              <div key={item.label} className="menu-item ion-activatable">
                <IonRippleEffect />
                <div className="menu-icon-wrap" style={{ background: item.color + '18' }}>
                  <IonIcon icon={item.icon} style={{ color: item.color }} />
                </div>
                <span className="menu-label">{item.label}</span>
                {item.toggle ? (
                  <IonToggle
                    checked={notifOn}
                    onIonChange={(e) => setNotifOn(e.detail.checked)}
                    style={{ '--track-background': '#e2e8f0', '--track-background-checked': '#1d4ed8' }}
                  />
                ) : (
                  <IonIcon icon={chevronForward} className="menu-arrow" />
                )}
              </div>
            ))}
          </div>

          {/* ── Logout ── */}
          <button className="logout-btn ion-activatable" onClick={() => setShowAlert(true)}>
            <IonRippleEffect />
            <IonIcon icon={logOutOutline} />
            Sign Out
          </button>

          <p className="app-ver">ALS-LMS 2026 · v1.0.0</p>
        </div>

        <IonAlert
          isOpen={showAlert}
          header="Sign Out"
          message="Are you sure you want to sign out?"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Sign Out', role: 'destructive', handler: handleLogout },
          ]}
          onDidDismiss={() => setShowAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default StudentProfile;
