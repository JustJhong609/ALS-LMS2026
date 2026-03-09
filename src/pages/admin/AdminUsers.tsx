import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonSearchbar,
  IonSegment, IonSegmentButton, IonLabel, IonAlert, IonBadge,
  IonRippleEffect, IonIcon, IonFab, IonFabButton,
  IonModal, IonButton, IonInput, IonSelect, IonSelectOption,
  IonLoading, IonTitle,
} from '@ionic/react';
import { personCircleOutline, trashOutline, createOutline, checkmarkCircle, closeCircle, addOutline, locationOutline, personOutline, closeOutline } from 'ionicons/icons';
import './AdminUsers.css';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  level?: string;
  classes?: number;
  status: 'active' | 'inactive';
  joined: string;
  avatar: string;
  age?: number;
  sex?: 'Male' | 'Female';
  address?: string;
  barangay?: string;
  civilStatus?: string;
}

const BARANGAYS = ['San Miguel', 'Dicklum', 'Sto. Niño', 'Ticala', 'Tankulan', 'Tankulan-Gaboc', 'Gaboc', 'Lingion'];
const LEVELS = ['Elementary Level', 'Secondary Level (Junior HS)', 'Secondary Level (Senior HS)', 'BLP (Basic Literacy Program)'];
const CIVIL_STATUSES = ['Single', 'Married', 'Widowed', 'Separated'];

const ALL_USERS: User[] = [
  { id: 1,  name: 'Maria Santos',    email: 'maria@als.edu.ph',  role: 'student', level: 'Elementary Level',  status: 'active',   joined: 'Jan 2025', avatar: '👩', age: 18, sex: 'Female', barangay: 'San Miguel', civilStatus: 'Single' },
  { id: 2,  name: 'Juan Dela Cruz',  email: 'juan@als.edu.ph',   role: 'student', level: 'Secondary Level (Junior HS)',   status: 'active',   joined: 'Feb 2025', avatar: '👨', age: 22, sex: 'Male', barangay: 'Dicklum', civilStatus: 'Single' },
  { id: 3,  name: 'Ana Reyes',       email: 'ana@als.edu.ph',    role: 'student', level: 'Secondary Level (Senior HS)',   status: 'inactive', joined: 'Mar 2025', avatar: '👩', age: 20, sex: 'Female', barangay: 'Ticala', civilStatus: 'Single' },
  { id: 4,  name: 'Pedro Aldrin',    email: 'pedro@als.edu.ph',  role: 'student', level: 'Elementary Level',  status: 'active',   joined: 'Mar 2025', avatar: '👦', age: 17, sex: 'Male', barangay: 'Tankulan', civilStatus: 'Single' },
  { id: 5,  name: 'Liza Buenafe',    email: 'liza@als.edu.ph',   role: 'student', level: 'Secondary Level (Junior HS)',   status: 'active',   joined: 'Apr 2025', avatar: '👧', age: 19, sex: 'Female', barangay: 'Gaboc', civilStatus: 'Single' },
  { id: 6,  name: 'Rosa Mendoza',    email: 'rosa@als.edu.ph',   role: 'teacher', classes: 3,           status: 'active',   joined: 'Jan 2025', avatar: '👩‍🏫' },
  { id: 7,  name: 'Carlos Robles',   email: 'carlos@als.edu.ph', role: 'teacher', classes: 2,           status: 'active',   joined: 'Feb 2025', avatar: '👨‍🏫' },
  { id: 8,  name: 'Elena Reyes',     email: 'elena@als.edu.ph',  role: 'teacher', classes: 4,           status: 'inactive', joined: 'Mar 2025', avatar: '👩‍🏫' },
];

const AdminUsers: React.FC = () => {
  const [segment, setSegment]   = useState<'all' | 'student' | 'teacher'>('all');
  const [search, setSearch]     = useState('');
  const [users, setUsers]       = useState<User[]>(ALL_USERS);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Add student form
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newSex, setNewSex] = useState<'Male' | 'Female'>('Male');
  const [newAddress, setNewAddress] = useState('');
  const [newBarangay, setNewBarangay] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [newCivilStatus, setNewCivilStatus] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'student' | 'teacher'>('student');

  const filtered = users.filter((u) => {
    const matchSeg = segment === 'all' || u.role === segment;
    const matchSrc = u.name.toLowerCase().includes(search.toLowerCase()) ||
                     u.email.toLowerCase().includes(search.toLowerCase());
    return matchSeg && matchSrc;
  });

  const toggleStatus = (id: number) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      setDeleteId(null);
    }
  };

  const resetForm = () => {
    setNewFirstName(''); setNewLastName(''); setNewAge('');
    setNewSex('Male'); setNewAddress(''); setNewBarangay('');
    setNewLevel(''); setNewCivilStatus(''); setNewEmail('');
    setNewRole('student');
  };

  const handleAddStudent = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    const fullName = `${newFirstName.trim()} ${newLastName.trim()}`;
    const newUser: User = {
      id: Date.now(),
      name: fullName,
      email: newEmail.trim() || `${newFirstName.trim().toLowerCase()}@als.edu.ph`,
      role: newRole,
      level: newRole === 'student' ? newLevel : undefined,
      classes: newRole === 'teacher' ? 0 : undefined,
      status: 'active',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avatar: newRole === 'teacher' ? '👨‍🏫' : '🎓',
      age: parseInt(newAge) || 0,
      sex: newSex,
      address: newAddress.trim(),
      barangay: newBarangay,
      civilStatus: newCivilStatus,
    };
    setUsers((prev) => [newUser, ...prev]);
    setSaving(false);
    setShowModal(false);
    resetForm();
    setShowSuccess(true);
  };

  const canSave = newFirstName.trim() && newLastName.trim() && newBarangay &&
    (newRole === 'teacher' || (newAge && newCivilStatus && newLevel));

  return (
    <IonPage>
      <IonHeader className="au-header ion-no-border">
        <IonToolbar>
          <div className="au-toolbar-title">User Management</div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="au-content">
        <IonLoading isOpen={saving} message="Adding student..." spinner="crescent" cssClass="als-loading" />

        <IonAlert
          isOpen={showSuccess}
          onDidDismiss={() => setShowSuccess(false)}
          header="Student Added! ✅"
          message="The new learner has been successfully enrolled."
          buttons={['OK']}
          cssClass="als-alert"
        />

        <div className="au-body">

          {/* Summary chips */}
          <div className="au-summary-chips">
            <div className="au-chip">
              <span className="au-chip-num">{users.length}</span>
              <span className="au-chip-lbl">Total</span>
            </div>
            <div className="au-chip">
              <span className="au-chip-num">{users.filter(u => u.role === 'student').length}</span>
              <span className="au-chip-lbl">Learners</span>
            </div>
            <div className="au-chip">
              <span className="au-chip-num">{users.filter(u => u.role === 'teacher').length}</span>
              <span className="au-chip-lbl">Facilitators</span>
            </div>
            <div className="au-chip">
              <span className="au-chip-num">{users.filter(u => u.status === 'active').length}</span>
              <span className="au-chip-lbl">Active</span>
            </div>
          </div>

          <IonSearchbar
            className="au-searchbar"
            placeholder="Search by name or email..."
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? '')}
          />

          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)} className="au-segment">
            <IonSegmentButton value="all"><IonLabel>All</IonLabel></IonSegmentButton>
            <IonSegmentButton value="student"><IonLabel>Learners</IonLabel></IonSegmentButton>
            <IonSegmentButton value="teacher"><IonLabel>Facilitators</IonLabel></IonSegmentButton>
          </IonSegment>

          <div className="au-list">
            {filtered.length === 0 && (
              <div className="au-empty">
                <IonIcon icon={personCircleOutline} style={{ fontSize: 52, color: '#cbd5e1' }} />
                <p>No users found</p>
              </div>
            )}
            {filtered.map((u) => (
              <div key={u.id} className="au-card">
                <div className="au-avatar">{u.avatar}</div>
                <div className="au-info">
                  <div className="au-name-row">
                    <span className="au-name">{u.name}</span>
                    <span className={`au-status-dot ${u.status}`} />
                  </div>
                  <span className="au-email">{u.email}</span>
                  <div className="au-meta-row">
                    <IonBadge className={`au-role-badge role-${u.role}`}>
                      {u.role === 'student' ? 'Learner' : 'Facilitator'}
                    </IonBadge>
                    {u.level  && <span className="au-meta-text">{u.level}</span>}
                    {u.barangay && <span className="au-meta-text">📍 {u.barangay}</span>}
                    {u.age && <span className="au-meta-text">Age {u.age}</span>}
                    {u.sex && <span className="au-meta-text">{u.sex}</span>}
                    {u.civilStatus && <span className="au-meta-text">{u.civilStatus}</span>}
                    {u.classes !== undefined && <span className="au-meta-text">{u.classes} classes</span>}
                    <span className="au-meta-text">Joined {u.joined}</span>
                  </div>
                </div>
                <div className="au-actions">
                  <button
                    className={`au-toggle-btn ${u.status}`}
                    onClick={() => toggleStatus(u.id)}
                    title={u.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    <IonIcon icon={u.status === 'active' ? checkmarkCircle : closeCircle} />
                  </button>
                  <button className="au-edit-btn" title="Edit"><IonIcon icon={createOutline} /></button>
                  <button className="au-del-btn" onClick={() => setDeleteId(u.id)} title="Delete">
                    <IonIcon icon={trashOutline} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <IonAlert
          isOpen={deleteId !== null}
          onDidDismiss={() => setDeleteId(null)}
          header="Delete User"
          message="Are you sure you want to permanently remove this user account?"
          cssClass="als-alert"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Delete', role: 'destructive', handler: confirmDelete },
          ]}
        />

        {/* ── FAB to Add Student ── */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton className="fab-purple" onClick={() => setShowModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* ── Add User Modal ── */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="admin-add-modal">
          <IonHeader className="ion-no-border">
            <IonToolbar className="admin-modal-toolbar">
              <IonTitle className="admin-modal-title">{newRole === 'teacher' ? 'Add Facilitator' : 'Enroll Learner'}</IonTitle>
              <IonButton fill="clear" slot="end" onClick={() => setShowModal(false)}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="admin-modal-content">
            <div className="admin-modal-body">
              <p className="admin-modal-badge">📍 District I — Manolo Fortich, Bukidnon</p>

              {/* Role toggle */}
              <div className="form-group">
                <p className="field-label">Role <span className="req">*</span></p>
                <div className="admin-role-toggle">
                  <button
                    className={`admin-role-btn${newRole === 'student' ? ' active-learner' : ''}`}
                    onClick={() => setNewRole('student')}
                  >🎓 Learner</button>
                  <button
                    className={`admin-role-btn${newRole === 'teacher' ? ' active-facilitator' : ''}`}
                    onClick={() => setNewRole('teacher')}
                  >👨‍🏫 Facilitator</button>
                </div>
              </div>

              <div className="admin-modal-row">
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

              {/* Learner-only fields */}
              {newRole === 'student' && (
                <>
                  <div className="admin-modal-row">
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

                  <div className="form-group">
                    <p className="field-label">Address</p>
                    <div className="input-wrap">
                      <IonIcon icon={locationOutline} className="input-icon" />
                      <IonInput placeholder="Purok/Sitio, Street" value={newAddress} onIonInput={(e) => setNewAddress(e.detail.value ?? '')} className="als-field" />
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <p className="field-label">Email (optional)</p>
                <div className="input-wrap">
                  <IonInput type="email" placeholder={newRole === 'teacher' ? 'facilitator@als.edu.ph' : 'learner@email.com'} value={newEmail} onIonInput={(e) => setNewEmail(e.detail.value ?? '')} className="als-field" />
                </div>
              </div>

              <div className="form-group">
                <p className="field-label">Barangay Assigned <span className="req">*</span></p>
                <div className="input-wrap">
                  <IonIcon icon={locationOutline} className="input-icon" />
                  <IonSelect value={newBarangay} placeholder="Select barangay" onIonChange={(e) => setNewBarangay(e.detail.value)} className="als-field als-select" interface="action-sheet" interfaceOptions={{ header: 'Select Barangay — District I' }}>
                    {BARANGAYS.map((b) => (
                      <IonSelectOption key={b} value={b}>{b}</IonSelectOption>
                    ))}
                  </IonSelect>
                </div>
              </div>

              {newRole === 'student' && (
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
              )}

              <IonButton expand="block" shape="round" className="admin-modal-save-btn" onClick={handleAddStudent} disabled={!canSave || saving}>
                {newRole === 'teacher' ? '✅ Add Facilitator' : '✅ Enroll Learner'}
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AdminUsers;
