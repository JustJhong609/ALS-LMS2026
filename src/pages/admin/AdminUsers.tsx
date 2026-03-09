import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent, IonSearchbar,
  IonSegment, IonSegmentButton, IonLabel, IonAlert, IonBadge,
  IonRippleEffect, IonIcon,
} from '@ionic/react';
import { personCircleOutline, trashOutline, createOutline, checkmarkCircle, closeCircle } from 'ionicons/icons';
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
}

const ALL_USERS: User[] = [
  { id: 1,  name: 'Maria Santos',    email: 'maria@als.edu.ph',  role: 'student', level: 'Elementary',  status: 'active',   joined: 'Jan 2025', avatar: '👩' },
  { id: 2,  name: 'Juan Dela Cruz',  email: 'juan@als.edu.ph',   role: 'student', level: 'Junior HS',   status: 'active',   joined: 'Feb 2025', avatar: '👨' },
  { id: 3,  name: 'Ana Reyes',       email: 'ana@als.edu.ph',    role: 'student', level: 'Senior HS',   status: 'inactive', joined: 'Mar 2025', avatar: '👩' },
  { id: 4,  name: 'Pedro Aldrin',    email: 'pedro@als.edu.ph',  role: 'student', level: 'Elementary',  status: 'active',   joined: 'Mar 2025', avatar: '👦' },
  { id: 5,  name: 'Liza Buenafe',    email: 'liza@als.edu.ph',   role: 'student', level: 'Junior HS',   status: 'active',   joined: 'Apr 2025', avatar: '👧' },
  { id: 6,  name: 'Rosa Mendoza',    email: 'rosa@als.edu.ph',   role: 'teacher', classes: 3,           status: 'active',   joined: 'Jan 2025', avatar: '👩‍🏫' },
  { id: 7,  name: 'Carlos Robles',   email: 'carlos@als.edu.ph', role: 'teacher', classes: 2,           status: 'active',   joined: 'Feb 2025', avatar: '👨‍🏫' },
  { id: 8,  name: 'Elena Reyes',     email: 'elena@als.edu.ph',  role: 'teacher', classes: 4,           status: 'inactive', joined: 'Mar 2025', avatar: '👩‍🏫' },
];

const AdminUsers: React.FC = () => {
  const [segment, setSegment]   = useState<'all' | 'student' | 'teacher'>('all');
  const [search, setSearch]     = useState('');
  const [users, setUsers]       = useState<User[]>(ALL_USERS);
  const [deleteId, setDeleteId] = useState<number | null>(null);

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

  return (
    <IonPage>
      <IonHeader className="au-header ion-no-border">
        <IonToolbar>
          <div className="au-toolbar-title">User Management</div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="au-content">
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
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Delete', role: 'destructive', handler: confirmDelete },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminUsers;
