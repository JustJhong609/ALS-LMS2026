import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonIcon, IonRippleEffect,
} from '@ionic/react';
import { alertCircleOutline, checkmarkCircle } from 'ionicons/icons';
import './ImplementerLearners.css';

interface Learner {
  id: string; name: string; age: number; sex: string;
  barangay: string; level: string; progress: number;
  status: 'active' | 'inactive'; fltScore: number | null;
  fltClassification: string | null; avatar: string;
  strandProgress: { strand: string; pct: number }[];
}

const LEARNERS: Learner[] = [
  { id: 's1', name: 'Maria Santos', age: 18, sex: 'Female', barangay: 'San Miguel', level: 'Elementary', progress: 72, status: 'active', fltScore: 78, fltClassification: 'Elementary Level', avatar: 'MS',
    strandProgress: [{ strand: 'LS 1', pct: 80 }, { strand: 'LS 2', pct: 65 }, { strand: 'LS 3', pct: 90 }, { strand: 'LS 4', pct: 55 }, { strand: 'LS 5', pct: 70 }, { strand: 'LS 6', pct: 40 }] },
  { id: 's2', name: 'Jose Reyes', age: 22, sex: 'Male', barangay: 'Dicklum', level: 'Elementary', progress: 45, status: 'active', fltScore: 62, fltClassification: 'BLP', avatar: 'JR',
    strandProgress: [{ strand: 'LS 1', pct: 50 }, { strand: 'LS 2', pct: 35 }, { strand: 'LS 3', pct: 60 }, { strand: 'LS 4', pct: 40 }, { strand: 'LS 5', pct: 45 }, { strand: 'LS 6', pct: 30 }] },
  { id: 's3', name: 'Ana Dela Cruz', age: 17, sex: 'Female', barangay: 'Ticala', level: 'Junior HS', progress: 88, status: 'active', fltScore: 85, fltClassification: 'Junior HS', avatar: 'AD',
    strandProgress: [{ strand: 'LS 1', pct: 92 }, { strand: 'LS 2', pct: 88 }, { strand: 'LS 3', pct: 95 }, { strand: 'LS 4', pct: 80 }, { strand: 'LS 5', pct: 85 }, { strand: 'LS 6', pct: 70 }] },
  { id: 's4', name: 'Pedro Gonzales', age: 30, sex: 'Male', barangay: 'Tankulan', level: 'Junior HS', progress: 30, status: 'inactive', fltScore: null, fltClassification: null, avatar: 'PG',
    strandProgress: [{ strand: 'LS 1', pct: 30 }, { strand: 'LS 2', pct: 25 }, { strand: 'LS 3', pct: 35 }, { strand: 'LS 4', pct: 20 }, { strand: 'LS 5', pct: 40 }, { strand: 'LS 6', pct: 15 }] },
  { id: 's5', name: 'Rosa Bautista', age: 19, sex: 'Female', barangay: 'Gaboc', level: 'Elementary', progress: 60, status: 'active', fltScore: 72, fltClassification: 'Elementary Level', avatar: 'RB',
    strandProgress: [{ strand: 'LS 1', pct: 65 }, { strand: 'LS 2', pct: 58 }, { strand: 'LS 3', pct: 70 }, { strand: 'LS 4', pct: 55 }, { strand: 'LS 5', pct: 60 }, { strand: 'LS 6', pct: 45 }] },
];

const COLORS = ['#d97706', '#1d4ed8', '#16a34a', '#7c3aed', '#dc2626', '#0891b2'];

const ImplementerLearners: React.FC = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = LEARNERS.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.barangay.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title-amber">My Learners</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="imp-learn-content">
        <div className="imp-learn-top">
          <IonSearchbar
            placeholder="Search learner or barangay..."
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? '')}
            className="als-searchbar-amber"
          />
        </div>

        <div className="imp-learn-body">
          <p className="imp-learn-count">{filtered.length} assigned learners — District I</p>

          {filtered.map((l, i) => (
            <div key={l.id} className="imp-learn-card" onClick={() => setExpanded(expanded === l.id ? null : l.id)}>
              <div className="imp-learn-main">
                <div className="imp-learn-av" style={{ background: COLORS[i % COLORS.length] }}>
                  {l.avatar}
                </div>
                <div className="imp-learn-info">
                  <p className="imp-learn-name">{l.name}</p>
                  <p className="imp-learn-meta">{l.level} · {l.barangay} · Age {l.age}</p>
                  <div className="als-progress-track" style={{ marginTop: 4 }}>
                    <div className="als-progress-fill" style={{ width: `${l.progress}%`, background: l.progress >= 75 ? '#16a34a' : l.progress >= 50 ? '#d97706' : '#dc2626' }} />
                  </div>
                </div>
                <div className="imp-learn-right">
                  <span className="imp-learn-pct">{l.progress}%</span>
                  <span className={`imp-learn-status ${l.status}`}>
                    {l.status === 'active' ? '● Active' : '○ Inactive'}
                  </span>
                  {l.progress < 50 && <IonIcon icon={alertCircleOutline} style={{ color: '#dc2626', fontSize: 18 }} />}
                </div>
              </div>

              {/* Expanded: strand progress */}
              {expanded === l.id && (
                <div className="imp-learn-expanded">
                  <p className="imp-exp-title">Learning Strand Progress</p>
                  {l.strandProgress.map((sp) => (
                    <div key={sp.strand} className="imp-strand-row">
                      <span className="imp-strand-name">{sp.strand}</span>
                      <div className="als-progress-track" style={{ flex: 1, margin: '0 8px' }}>
                        <div className="als-progress-fill" style={{ width: `${sp.pct}%`, background: sp.pct >= 75 ? '#16a34a' : sp.pct >= 50 ? '#d97706' : '#dc2626' }} />
                      </div>
                      <span className="imp-strand-pct">{sp.pct}%</span>
                    </div>
                  ))}
                  {l.fltScore !== null && (
                    <div className="imp-flt-mini">
                      <span>📋 FLT: {l.fltScore}% — {l.fltClassification}</span>
                    </div>
                  )}
                  {l.fltScore === null && (
                    <div className="imp-flt-mini warning">
                      <span>⚠ FLT not yet taken</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ImplementerLearners;
