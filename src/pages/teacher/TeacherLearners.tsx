import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonIcon, IonRippleEffect, IonFab, IonFabButton,
  IonModal, IonButton, IonInput, IonSelect, IonSelectOption,
  IonLoading, IonAlert,
} from '@ionic/react';
import { addOutline, locationOutline, personOutline, closeOutline } from 'ionicons/icons';
import './TeacherLearners.css';

interface Learner {
  id: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female';
  address: string;
  barangay: string;
  level: string;
  civilStatus: string;
  progress: number;
  status: 'active' | 'inactive';
  avatar: string;
}

const BARANGAYS = ['San Miguel', 'Dicklum', 'Sto. Niño', 'Ticala', 'Tankulan', 'Tankulan-Gaboc', 'Gaboc', 'Lingion'];
const LEVELS = ['Elementary Level', 'Secondary Level (Junior HS)', 'Secondary Level (Senior HS)', 'BLP (Basic Literacy Program)'];
const CIVIL_STATUSES = ['Single', 'Married', 'Widowed', 'Separated'];
const COLORS = ['#1d4ed8', '#16a34a', '#7c3aed', '#d97706', '#dc2626', '#0891b2', '#be185d', '#065f46'];

const INITIAL_LEARNERS: Learner[] = [
  { id: 's1', name: 'Maria Santos', age: 18, sex: 'Female', address: 'Purok 5, San Miguel', barangay: 'San Miguel', level: 'Elementary Level', civilStatus: 'Single', progress: 72, status: 'active', avatar: 'MS' },
  { id: 's2', name: 'Jose Reyes', age: 22, sex: 'Male', address: 'Purok 3, Dicklum', barangay: 'Dicklum', level: 'Elementary Level', civilStatus: 'Single', progress: 45, status: 'active', avatar: 'JR' },
  { id: 's3', name: 'Ana Dela Cruz', age: 17, sex: 'Female', address: 'Purok 1, Ticala', barangay: 'Ticala', level: 'Secondary Level (Junior HS)', civilStatus: 'Single', progress: 88, status: 'active', avatar: 'AD' },
  { id: 's4', name: 'Pedro Gonzales', age: 30, sex: 'Male', address: 'Purok 2, Tankulan', barangay: 'Tankulan', level: 'Secondary Level (Junior HS)', civilStatus: 'Married', progress: 30, status: 'inactive', avatar: 'PG' },
  { id: 's5', name: 'Rosa Bautista', age: 19, sex: 'Female', address: 'Purok 7, Gaboc', barangay: 'Gaboc', level: 'Elementary Level', civilStatus: 'Single', progress: 60, status: 'active', avatar: 'RB' },
  { id: 's6', name: 'Carlos Mendoza', age: 25, sex: 'Male', address: 'Purok 4, Lingion', barangay: 'Lingion', level: 'Secondary Level (Junior HS)', civilStatus: 'Single', progress: 95, status: 'active', avatar: 'CM' },
];

const TeacherLearners: React.FC = () => {
  const [search, setSearch] = useState('');
  const [learners, setLearners] = useState<Learner[]>(INITIAL_LEARNERS);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Add student form state
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newSex, setNewSex] = useState<'Male' | 'Female'>('Male');
  const [newAddress, setNewAddress] = useState('');
  const [newBarangay, setNewBarangay] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [newCivilStatus, setNewCivilStatus] = useState('');

  const filtered = learners.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.level.toLowerCase().includes(search.toLowerCase()) ||
    l.barangay.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setNewFirstName(''); setNewLastName(''); setNewAge('');
    setNewSex('Male'); setNewAddress(''); setNewBarangay('');
    setNewLevel(''); setNewCivilStatus('');
  };

  const handleAddStudent = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    const fullName = `${newFirstName.trim()} ${newLastName.trim()}`;
    const initials = `${newFirstName.charAt(0)}${newLastName.charAt(0)}`.toUpperCase();
    const newLearner: Learner = {
      id: `s${Date.now()}`,
      name: fullName,
      age: parseInt(newAge) || 0,
      sex: newSex,
      address: newAddress.trim(),
      barangay: newBarangay,
      level: newLevel,
      civilStatus: newCivilStatus,
      progress: 0,
      status: 'active',
      avatar: initials,
    };
    setLearners((prev) => [newLearner, ...prev]);
    setSaving(false);
    setShowModal(false);
    resetForm();
    setShowSuccess(true);
  };

  const canSave = newFirstName.trim() && newLastName.trim() && newAge && newBarangay && newLevel && newCivilStatus;

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title-green">My Learners</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="learners-content">
        <IonLoading isOpen={saving} message="Enrolling student..." spinner="crescent" cssClass="als-loading" />

        <IonAlert
          isOpen={showSuccess}
          onDidDismiss={() => setShowSuccess(false)}
          header="Student Added! ✅"
          message="The new learner has been successfully enrolled."
          buttons={['OK']}
          cssClass="als-alert"
        />

        <div className="learners-top">
          <IonSearchbar
            placeholder="Search learner, level, or barangay..."
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? '')}
            className="als-searchbar-green"
          />
        </div>

        <div className="learners-body">
          <p className="learners-count">{filtered.length} learners — District I, Manolo Fortich</p>
          {filtered.map((l, i) => (
            <div key={l.id} className="learner-card ion-activatable">
              <IonRippleEffect />
              <div className="learner-avatar" style={{ background: COLORS[i % COLORS.length] }}>
                {l.avatar}
              </div>
              <div className="learner-info">
                <p className="learner-name">{l.name}</p>
                <p className="learner-level">{l.level} · {l.barangay}</p>
                <div className="learner-meta-chips">
                  <span className="learner-chip">{l.sex}</span>
                  <span className="learner-chip">Age {l.age}</span>
                  <span className="learner-chip">{l.civilStatus}</span>
                </div>
                <div className="learner-progress-row">
                  <div className="als-progress-track" style={{ flex: 1 }}>
                    <div className="als-progress-fill" style={{ width: `${l.progress}%`, background: l.progress >= 75 ? '#16a34a' : l.progress >= 50 ? '#d97706' : '#dc2626' }} />
                  </div>
                  <span className="learner-pct">{l.progress}%</span>
                </div>
              </div>
              <div className="learner-actions">
                <span className={`learner-status ${l.status}`}>{l.status === 'active' ? '● Active' : '○ Inactive'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── FAB to Add Student ── */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton className="fab-green" onClick={() => setShowModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* ── Add Student Modal ── */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="add-student-modal">
          <IonHeader className="ion-no-border">
            <IonToolbar className="modal-toolbar">
              <IonTitle className="modal-title">Enroll New Learner</IonTitle>
              <IonButton fill="clear" slot="end" onClick={() => setShowModal(false)}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="modal-content">
            <div className="modal-body">
              <p className="modal-district-badge">📍 District I — Manolo Fortich, Bukidnon</p>

              {/* Name */}
              <div className="modal-row">
                <div className="form-group half">
                  <p className="field-label">First Name <span className="req">*</span></p>
                  <div className="input-wrap">
                    <IonInput placeholder="First name" value={newFirstName} onIonInput={(e) => setNewFirstName(e.detail.value ?? '')} className="als-field" />
                  </div>
                </div>
                <div className="form-group half">
                  <p className="field-label">Last Name <span className="req">*</span></p>
                  <div className="input-wrap">
                    <IonInput placeholder="Last name" value={newLastName} onIonInput={(e) => setNewLastName(e.detail.value ?? '')} className="als-field" />
                  </div>
                </div>
              </div>

              {/* Age & Sex */}
              <div className="modal-row">
                <div className="form-group half">
                  <p className="field-label">Age <span className="req">*</span></p>
                  <div className="input-wrap">
                    <IonInput type="number" placeholder="Age" value={newAge} onIonInput={(e) => setNewAge(e.detail.value ?? '')} className="als-field" min="5" max="99" />
                  </div>
                </div>
                <div className="form-group half">
                  <p className="field-label">Sex <span className="req">*</span></p>
                  <div className="input-wrap">
                    <IonSelect value={newSex} placeholder="Select sex" onIonChange={(e) => setNewSex(e.detail.value)} className="als-field als-select" interface="action-sheet">
                      <IonSelectOption value="Male">Male</IonSelectOption>
                      <IonSelectOption value="Female">Female</IonSelectOption>
                    </IonSelect>
                  </div>
                </div>
              </div>

              {/* Civil Status */}
              <div className="form-group">
                <p className="field-label">Civil Status <span className="req">*</span></p>
                <div className="input-wrap">
                  <IonSelect value={newCivilStatus} placeholder="Select civil status" onIonChange={(e) => setNewCivilStatus(e.detail.value)} className="als-field als-select" interface="action-sheet">
                    {CIVIL_STATUSES.map((c) => (
                      <IonSelectOption key={c} value={c}>{c}</IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              </div>

              {/* Address */}
              <div className="form-group">
                <p className="field-label">Address</p>
                <div className="input-wrap">
                  <IonIcon icon={locationOutline} className="input-icon" />
                  <IonInput placeholder="Purok/Sitio, Street" value={newAddress} onIonInput={(e) => setNewAddress(e.detail.value ?? '')} className="als-field" />
                </div>
              </div>

              {/* Barangay */}
              <div className="form-group">
                <p className="field-label">Barangay <span className="req">*</span></p>
                <div className="input-wrap">
                  <IonIcon icon={locationOutline} className="input-icon" />
                  <IonSelect value={newBarangay} placeholder="Select barangay" onIonChange={(e) => setNewBarangay(e.detail.value)} className="als-field als-select" interface="action-sheet" interfaceOptions={{ header: 'Select Barangay — District I' }}>
                    {BARANGAYS.map((b) => (
                      <IonSelectOption key={b} value={b}>{b}</IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              </div>

              {/* Level / Program */}
              <div className="form-group">
                <p className="field-label">Level / Program <span className="req">*</span></p>
                <div className="input-wrap">
                  <IonIcon icon={personOutline} className="input-icon" />
                  <IonSelect value={newLevel} placeholder="Select level" onIonChange={(e) => setNewLevel(e.detail.value)} className="als-field als-select" interface="action-sheet" interfaceOptions={{ header: 'Select Level' }}>
                    {LEVELS.map((l) => (
                      <IonSelectOption key={l} value={l}>{l}</IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              </div>

              <IonButton expand="block" shape="round" className="modal-save-btn" onClick={handleAddStudent} disabled={!canSave || saving}>
                ✅ Enroll Learner
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TeacherLearners;
