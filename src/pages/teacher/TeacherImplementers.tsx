import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonIcon, IonRippleEffect,
} from '@ionic/react';
import { chevronForward, alertCircleOutline } from 'ionicons/icons';
import './TeacherImplementers.css';

interface Implementer {
  id: string; name: string; barangay: string; learnerCount: number;
  avgProgress: number; fltCompliance: number; reportsSubmitted: number;
  totalReports: number; status: 'active' | 'inactive'; avatar: string;
  learners: { name: string; progress: number; fltTaken: boolean }[];
}

const IMPLEMENTERS: Implementer[] = [
  {
    id: 'imp1', name: 'Rosa Bautista', barangay: 'San Miguel', learnerCount: 12,
    avgProgress: 64, fltCompliance: 92, reportsSubmitted: 8, totalReports: 10,
    status: 'active', avatar: 'RB',
    learners: [
      { name: 'Maria Santos', progress: 72, fltTaken: true },
      { name: 'Pedro Ramos', progress: 45, fltTaken: true },
      { name: 'Ana Dizon', progress: 88, fltTaken: true },
    ],
  },
  {
    id: 'imp2', name: 'Carlos Mendoza', barangay: 'Dicklum', learnerCount: 10,
    avgProgress: 78, fltCompliance: 100, reportsSubmitted: 10, totalReports: 10,
    status: 'active', avatar: 'CM',
    learners: [
      { name: 'Juan Cruz', progress: 80, fltTaken: true },
      { name: 'Lisa Reyes', progress: 76, fltTaken: true },
    ],
  },
  {
    id: 'imp3', name: 'Elena Torres', barangay: 'Ticala', learnerCount: 8,
    avgProgress: 55, fltCompliance: 75, reportsSubmitted: 6, totalReports: 10,
    status: 'active', avatar: 'ET',
    learners: [
      { name: 'Ramon Garcia', progress: 40, fltTaken: true },
      { name: 'Sofia Lim', progress: 65, fltTaken: false },
    ],
  },
  {
    id: 'imp4', name: 'Ramon Garcia', barangay: 'Tankulan', learnerCount: 15,
    avgProgress: 42, fltCompliance: 60, reportsSubmitted: 4, totalReports: 10,
    status: 'active', avatar: 'RG',
    learners: [
      { name: 'Mark Santos', progress: 30, fltTaken: false },
      { name: 'Joy Bautista', progress: 55, fltTaken: true },
    ],
  },
];

const COLORS = ['#d97706', '#16a34a', '#7c3aed', '#dc2626', '#1d4ed8'];

const TeacherImplementers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = IMPLEMENTERS.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.barangay.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title-green">Implementer Management</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ti-content">
        <div className="ti-top">
          <IonSearchbar
            placeholder="Search implementer or barangay..."
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? '')}
            className="als-searchbar-green"
          />
        </div>

        <div className="ti-body">
          <p className="ti-count">{filtered.length} implementers — District I, Manolo Fortich</p>

          {filtered.map((imp, i) => (
            <div key={imp.id} className="ti-card" onClick={() => setExpanded(expanded === imp.id ? null : imp.id)}>
              <div className="ti-card-main">
                <div className="ti-avatar" style={{ background: COLORS[i % COLORS.length] }}>
                  {imp.avatar}
                </div>
                <div className="ti-info">
                  <p className="ti-name">{imp.name}</p>
                  <p className="ti-meta">📍 {imp.barangay} · {imp.learnerCount} learners</p>
                  <div className="ti-metrics">
                    <span className="ti-metric">Progress: <strong>{imp.avgProgress}%</strong></span>
                    <span className="ti-metric">FLT: <strong style={{ color: imp.fltCompliance >= 80 ? '#16a34a' : '#dc2626' }}>{imp.fltCompliance}%</strong></span>
                    <span className="ti-metric">Reports: <strong>{imp.reportsSubmitted}/{imp.totalReports}</strong></span>
                  </div>
                </div>
                <IonIcon icon={chevronForward} style={{ color: '#cbd5e1', fontSize: 18 }} />
              </div>

              {/* Expanded: show learner caseload */}
              {expanded === imp.id && (
                <div className="ti-expanded">
                  <p className="ti-exp-title">Learner Caseload</p>
                  {imp.learners.map((l) => (
                    <div key={l.name} className="ti-learner-row">
                      <span className="ti-learner-name">{l.name}</span>
                      <div className="als-progress-track" style={{ flex: 1, margin: '0 8px' }}>
                        <div className="als-progress-fill" style={{ width: `${l.progress}%`, background: l.progress >= 75 ? '#16a34a' : l.progress >= 50 ? '#d97706' : '#dc2626' }} />
                      </div>
                      <span className="ti-learner-pct">{l.progress}%</span>
                      {!l.fltTaken && <IonIcon icon={alertCircleOutline} style={{ color: '#dc2626', fontSize: 16, marginLeft: 4 }} />}
                    </div>
                  ))}

                  <div className="ti-actions">
                    <button className="ti-action-btn recommend">📚 Recommend Content</button>
                    <button className="ti-action-btn message">✉️ Message</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TeacherImplementers;
