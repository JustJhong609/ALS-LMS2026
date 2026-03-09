import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonIcon, IonRippleEffect,
} from '@ionic/react';
import { mailOutline, callOutline, chevronForward, checkmarkCircle } from 'ionicons/icons';
import './TeacherLearners.css';

const LEARNERS = [
  { id: 's1',  name: 'Maria Santos',     level: 'Elementary',       progress: 72, status: 'active',   avatar: 'MS' },
  { id: 's2',  name: 'Jose Reyes',       level: 'Elementary',       progress: 45, status: 'active',   avatar: 'JR' },
  { id: 's3',  name: 'Ana Dela Cruz',    level: 'Secondary Junior', progress: 88, status: 'active',   avatar: 'AD' },
  { id: 's4',  name: 'Pedro Gonzales',   level: 'Secondary Junior', progress: 30, status: 'inactive', avatar: 'PG' },
  { id: 's5',  name: 'Rosa Bautista',    level: 'Elementary',       progress: 60, status: 'active',   avatar: 'RB' },
  { id: 's6',  name: 'Carlos Mendoza',   level: 'Secondary Junior', progress: 95, status: 'active',   avatar: 'CM' },
  { id: 's7',  name: 'Liza Ramos',       level: 'Elementary',       progress: 15, status: 'inactive', avatar: 'LR' },
  { id: 's8',  name: 'Ramon Torres',     level: 'Secondary Junior', progress: 78, status: 'active',   avatar: 'RT' },
];

const COLORS = ['#1d4ed8', '#16a34a', '#7c3aed', '#d97706', '#dc2626', '#0891b2', '#be185d', '#065f46'];

const TeacherLearners: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = LEARNERS.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title-green">My Learners</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="learners-content">
        <div className="learners-top">
          <IonSearchbar
            placeholder="Search learner..."
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? '')}
            className="als-searchbar-green"
          />
        </div>

        <div className="learners-body">
          <p className="learners-count">{filtered.length} learners</p>
          {filtered.map((l, i) => (
            <div key={l.id} className="learner-card ion-activatable">
              <IonRippleEffect />
              <div className="learner-avatar" style={{ background: COLORS[i % COLORS.length] }}>
                {l.avatar}
              </div>
              <div className="learner-info">
                <p className="learner-name">{l.name}</p>
                <p className="learner-level">{l.level}</p>
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
      </IonContent>
    </IonPage>
  );
};

export default TeacherLearners;
