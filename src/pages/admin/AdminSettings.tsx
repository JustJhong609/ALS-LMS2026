import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonList, IonItem,
  IonLabel, IonToggle, IonSelect, IonSelectOption, IonInput,
  IonAlert, IonIcon, IonRippleEffect,
} from '@ionic/react';
import {
  globeOutline, notificationsOutline, lockClosedOutline, colorPaletteOutline,
  cloudUploadOutline, trashOutline, checkmarkCircleOutline, logOutOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../App';
import './AdminSettings.css';

const AdminSettings: React.FC = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const [emailNotifs,  setEmailNotifs]  = useState(true);
  const [smsNotifs,    setSmsNotifs]    = useState(false);
  const [pushNotifs,   setPushNotifs]   = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [openEnroll,   setOpenEnroll]   = useState(true);
  const [darkMode,     setDarkMode]     = useState(false);
  const [language,     setLanguage]     = useState('fil');
  const [siteName,     setSiteName]     = useState('ALS-LMS 2026');
  const [maxUpload,    setMaxUpload]    = useState('50');
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const save = () => setShowSaveAlert(true);

  const handleLogout = () => {
    logout();
    history.replace('/');
  };

  return (
    <IonPage>
      <IonHeader className="as-header ion-no-border">
        <IonToolbar>
          <div className="as-toolbar-title">System Settings</div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="as-content">
        <div className="as-body">

          {/* General */}
          <div className="as-section-header">
            <IonIcon icon={globeOutline} className="as-sec-icon" />
            <span>General</span>
          </div>
          <div className="as-card">
            <div className="as-field">
              <label className="as-field-label">Platform Name</label>
              <IonInput
                className="as-input"
                value={siteName}
                onIonInput={(e) => setSiteName(String(e.detail.value ?? ''))}
              />
            </div>
            <div className="as-field">
              <label className="as-field-label">Default Language</label>
              <IonSelect className="as-select" value={language} onIonChange={(e) => setLanguage(e.detail.value)}>
                <IonSelectOption value="fil">Filipino</IonSelectOption>
                <IonSelectOption value="en">English</IonSelectOption>
              </IonSelect>
            </div>
            <IonItem lines="none" className="as-toggle-item">
              <IonIcon icon={colorPaletteOutline} slot="start" className="as-item-icon" />
              <IonLabel>Dark Mode (System-wide)</IonLabel>
              <IonToggle checked={darkMode} onIonChange={(e) => setDarkMode(e.detail.checked)} slot="end" color="tertiary" />
            </IonItem>
          </div>

          {/* Enrollment */}
          <div className="as-section-header">
            <IonIcon icon={checkmarkCircleOutline} className="as-sec-icon" />
            <span>Enrollment</span>
          </div>
          <div className="as-card">
            <IonItem lines="full" className="as-toggle-item">
              <IonLabel>
                <h3>Open Enrollment</h3>
                <p>Allow new learners to self-register</p>
              </IonLabel>
              <IonToggle checked={openEnroll} onIonChange={(e) => setOpenEnroll(e.detail.checked)} slot="end" color="success" />
            </IonItem>
            <IonItem lines="none" className="as-toggle-item">
              <IonLabel>
                <h3>Maintenance Mode</h3>
                <p>Lock platform for all non-admin users</p>
              </IonLabel>
              <IonToggle checked={maintenanceMode} onIonChange={(e) => setMaintenanceMode(e.detail.checked)} slot="end" color="danger" />
            </IonItem>
          </div>

          {/* Notifications */}
          <div className="as-section-header">
            <IonIcon icon={notificationsOutline} className="as-sec-icon" />
            <span>Notifications</span>
          </div>
          <div className="as-card">
            <IonItem lines="full" className="as-toggle-item">
              <IonLabel>Email Notifications</IonLabel>
              <IonToggle checked={emailNotifs} onIonChange={(e) => setEmailNotifs(e.detail.checked)} slot="end" color="tertiary" />
            </IonItem>
            <IonItem lines="full" className="as-toggle-item">
              <IonLabel>SMS / Text Notifications</IonLabel>
              <IonToggle checked={smsNotifs} onIonChange={(e) => setSmsNotifs(e.detail.checked)} slot="end" color="tertiary" />
            </IonItem>
            <IonItem lines="none" className="as-toggle-item">
              <IonLabel>Push Notifications</IonLabel>
              <IonToggle checked={pushNotifs} onIonChange={(e) => setPushNotifs(e.detail.checked)} slot="end" color="tertiary" />
            </IonItem>
          </div>

          {/* Storage */}
          <div className="as-section-header">
            <IonIcon icon={cloudUploadOutline} className="as-sec-icon" />
            <span>Storage</span>
          </div>
          <div className="as-card">
            <div className="as-field">
              <label className="as-field-label">Max File Upload Size (MB)</label>
              <IonInput
                className="as-input"
                type="number"
                value={maxUpload}
                onIonInput={(e) => setMaxUpload(String(e.detail.value ?? '50'))}
              />
            </div>
          </div>

          {/* Security */}
          <div className="as-section-header">
            <IonIcon icon={lockClosedOutline} className="as-sec-icon" />
            <span>Security</span>
          </div>
          <div className="as-card as-security-list">
            {['Change Admin Password', 'Manage API Keys', 'View Audit Logs', 'Export All Data'].map((lbl) => (
              <div key={lbl} className="as-security-item ion-activatable">
                <IonRippleEffect />
                <span>{lbl}</span>
                <span className="as-chevron">›</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <button className="as-save-btn ion-activatable" onClick={save}>
            <IonRippleEffect />
            Save Settings
          </button>

          <button className="as-reset-btn ion-activatable" onClick={() => setShowResetAlert(true)}>
            <IonRippleEffect />
            <IonIcon icon={trashOutline} />
            Reset to Defaults
          </button>

          <button className="as-logout-btn ion-activatable" onClick={() => setShowLogoutAlert(true)}>
            <IonRippleEffect />
            <IonIcon icon={logOutOutline} />
            Sign Out
          </button>
        </div>

        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Sign Out"
          message="Are you sure you want to sign out?"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Sign Out', role: 'destructive', handler: handleLogout },
          ]}
        />
        <IonAlert
          isOpen={showSaveAlert}
          onDidDismiss={() => setShowSaveAlert(false)}
          header="Settings Saved"
          message="Your system settings have been saved successfully."
          buttons={['OK']}
        />
        <IonAlert
          isOpen={showResetAlert}
          onDidDismiss={() => setShowResetAlert(false)}
          header="Reset Settings"
          message="This will reset all settings to factory defaults. Are you sure?"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Reset', role: 'destructive' },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminSettings;
