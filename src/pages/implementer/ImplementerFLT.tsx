import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
} from '@ionic/react';
import './ImplementerFLT.css';

interface LearnerFLT {
  id: string; name: string; level: string; barangay: string;
  fltTaken: boolean; fltScore: number | null; classification: string | null;
  fltDate: string | null; avatar: string;
  breakdown: { area: string; score: number }[] | null;
}

const LEARNER_FLT_DATA: LearnerFLT[] = [
  { id: 's1', name: 'Maria Santos', level: 'Elementary', barangay: 'San Miguel', fltTaken: true, fltScore: 78, classification: 'Elementary Level', fltDate: 'Feb 20, 2026', avatar: 'MS',
    breakdown: [{ area: 'Reading', score: 82 }, { area: 'Numeracy', score: 75 }, { area: 'Writing', score: 70 }, { area: 'Oral', score: 85 }] },
  { id: 's2', name: 'Jose Reyes', level: 'Elementary', barangay: 'Dicklum', fltTaken: true, fltScore: 62, classification: 'BLP', fltDate: 'Feb 18, 2026', avatar: 'JR',
    breakdown: [{ area: 'Reading', score: 55 }, { area: 'Numeracy', score: 68 }, { area: 'Writing', score: 58 }, { area: 'Oral', score: 65 }] },
  { id: 's3', name: 'Ana Dela Cruz', level: 'Junior HS', barangay: 'Ticala', fltTaken: true, fltScore: 85, classification: 'Junior HS', fltDate: 'Feb 22, 2026', avatar: 'AD',
    breakdown: [{ area: 'Reading', score: 90 }, { area: 'Numeracy', score: 82 }, { area: 'Writing', score: 80 }, { area: 'Oral', score: 88 }] },
  { id: 's4', name: 'Pedro Gonzales', level: 'Junior HS', barangay: 'Tankulan', fltTaken: false, fltScore: null, classification: null, fltDate: null, avatar: 'PG', breakdown: null },
  { id: 's5', name: 'Rosa Bautista', level: 'Elementary', barangay: 'Gaboc', fltTaken: true, fltScore: 72, classification: 'Elementary Level', fltDate: 'Feb 19, 2026', avatar: 'RB',
    breakdown: [{ area: 'Reading', score: 75 }, { area: 'Numeracy', score: 70 }, { area: 'Writing', score: 68 }, { area: 'Oral', score: 74 }] },
];

const ImplementerFLT: React.FC = () => {
  const taken = LEARNER_FLT_DATA.filter(l => l.fltTaken);
  const notTaken = LEARNER_FLT_DATA.filter(l => !l.fltTaken);

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title-amber">Learner FLT Results</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="imp-flt-content">
        <div className="imp-flt-body">

          {/* Summary */}
          <div className="imp-flt-summary">
            <div className="imp-flt-sum-card">
              <p className="imp-flt-sum-num">{taken.length}</p>
              <p className="imp-flt-sum-lbl">FLT Taken</p>
            </div>
            <div className="imp-flt-sum-card warning">
              <p className="imp-flt-sum-num">{notTaken.length}</p>
              <p className="imp-flt-sum-lbl">Not Yet Taken</p>
            </div>
            <div className="imp-flt-sum-card">
              <p className="imp-flt-sum-num">
                {taken.length > 0 ? Math.round(taken.reduce((s, l) => s + (l.fltScore ?? 0), 0) / taken.length) : 0}%
              </p>
              <p className="imp-flt-sum-lbl">Avg. Score</p>
            </div>
          </div>

          {/* Not taken warning */}
          {notTaken.length > 0 && (
            <div className="imp-flt-warn-section">
              <p className="imp-flt-warn-title">⚠ Learners who have NOT taken the FLT</p>
              {notTaken.map((l) => (
                <div key={l.id} className="imp-flt-warn-item">
                  <div className="imp-flt-av">{l.avatar}</div>
                  <div>
                    <p className="imp-flt-name">{l.name}</p>
                    <p className="imp-flt-meta">{l.level} · {l.barangay}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FLT results */}
          <p className="imp-flt-section-title">FLT Results</p>
          {taken.map((l) => (
            <div key={l.id} className="imp-flt-card">
              <div className="imp-flt-card-header">
                <div className="imp-flt-av">{l.avatar}</div>
                <div className="imp-flt-card-info">
                  <p className="imp-flt-name">{l.name}</p>
                  <p className="imp-flt-meta">{l.level} · {l.barangay} · {l.fltDate}</p>
                </div>
                <div className="imp-flt-score-circle" style={{ borderColor: (l.fltScore ?? 0) >= 75 ? '#16a34a' : '#d97706' }}>
                  <span>{l.fltScore}%</span>
                </div>
              </div>

              <div className="imp-flt-class-badge">
                Classification: <strong>{l.classification}</strong>
              </div>

              {l.breakdown && (
                <div className="imp-flt-breakdown">
                  {l.breakdown.map((b) => (
                    <div key={b.area} className="imp-flt-break-row">
                      <span className="imp-flt-break-area">{b.area}</span>
                      <div className="als-progress-track" style={{ flex: 1, margin: '0 8px' }}>
                        <div className="als-progress-fill" style={{ width: `${b.score}%`, background: b.score >= 75 ? '#16a34a' : '#d97706' }} />
                      </div>
                      <span className="imp-flt-break-pct">{b.score}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ImplementerFLT;
