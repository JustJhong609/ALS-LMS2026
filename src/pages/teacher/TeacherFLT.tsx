import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonIcon,
} from '@ionic/react';
import { alertCircleOutline, checkmarkCircle } from 'ionicons/icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import './TeacherFLT.css';

type FLTTab = 'overview' | 'learners';

interface LearnerFLT {
  id: string; name: string; barangay: string; implementer: string;
  taken: boolean; score: number | null;
  classification: string | null;
  date: string | null;
}

const BARANGAY_DATA = [
  { name: 'San Miguel', taken: 11, notTaken: 1, avgScore: 76 },
  { name: 'Dicklum', taken: 10, notTaken: 0, avgScore: 81 },
  { name: 'Ticala', taken: 6, notTaken: 2, avgScore: 68 },
  { name: 'Tankulan', taken: 9, notTaken: 6, avgScore: 59 },
];

const CLASS_DIST = [
  { name: 'Functional', value: 22, color: '#16a34a' },
  { name: 'Developing', value: 10, color: '#d97706' },
  { name: 'Beginning', value: 4, color: '#dc2626' },
  { name: 'Not Taken', value: 9, color: '#94a3b8' },
];

const ALL_LEARNERS: LearnerFLT[] = [
  { id: 'l1', name: 'Maria Santos', barangay: 'San Miguel', implementer: 'Rosa Bautista', taken: true, score: 82, classification: 'Functional', date: 'Nov 15, 2025' },
  { id: 'l2', name: 'Pedro Ramos', barangay: 'San Miguel', implementer: 'Rosa Bautista', taken: true, score: 65, classification: 'Developing', date: 'Nov 12, 2025' },
  { id: 'l3', name: 'Juan Cruz', barangay: 'Dicklum', implementer: 'Carlos Mendoza', taken: true, score: 88, classification: 'Functional', date: 'Nov 10, 2025' },
  { id: 'l4', name: 'Sofia Lim', barangay: 'Ticala', implementer: 'Elena Torres', taken: false, score: null, classification: null, date: null },
  { id: 'l5', name: 'Mark Santos', barangay: 'Tankulan', implementer: 'Ramon Garcia', taken: false, score: null, classification: null, date: null },
  { id: 'l6', name: 'Joy Bautista', barangay: 'Tankulan', implementer: 'Ramon Garcia', taken: true, score: 58, classification: 'Developing', date: 'Oct 28, 2025' },
  { id: 'l7', name: 'Ramon Garcia Jr.', barangay: 'Tankulan', implementer: 'Ramon Garcia', taken: true, score: 45, classification: 'Beginning', date: 'Oct 22, 2025' },
];

const TeacherFLT: React.FC = () => {
  const [tab, setTab] = useState<FLTTab>('overview');
  const [filter, setFilter] = useState<'all' | 'taken' | 'not-taken'>('all');

  const totalTaken = BARANGAY_DATA.reduce((s, b) => s + b.taken, 0);
  const totalNot = BARANGAY_DATA.reduce((s, b) => s + b.notTaken, 0);
  const overallAvg = Math.round(BARANGAY_DATA.reduce((s, b) => s + b.avgScore * b.taken, 0) / totalTaken);

  const filteredLearners = ALL_LEARNERS.filter((l) => {
    if (filter === 'taken') return l.taken;
    if (filter === 'not-taken') return !l.taken;
    return true;
  });

  return (
    <IonPage>
      <IonHeader className="als-header ion-no-border">
        <IonToolbar>
          <IonTitle className="toolbar-title-green">FLT Oversight</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="tf-content">
        <IonSegment value={tab} onIonChange={(e) => setTab(e.detail.value as FLTTab)} className="als-segment-green">
          <IonSegmentButton value="overview"><IonLabel>Overview</IonLabel></IonSegmentButton>
          <IonSegmentButton value="learners"><IonLabel>Learners</IonLabel></IonSegmentButton>
        </IonSegment>

        {tab === 'overview' && (
          <div className="tf-body">
            {/* Summary */}
            <div className="tf-summary-row">
              <div className="tf-stat-card">
                <p className="tf-stat-val green">{totalTaken}</p>
                <p className="tf-stat-lbl">FLT Taken</p>
              </div>
              <div className="tf-stat-card">
                <p className="tf-stat-val red">{totalNot}</p>
                <p className="tf-stat-lbl">Not Taken</p>
              </div>
              <div className="tf-stat-card">
                <p className="tf-stat-val blue">{overallAvg}%</p>
                <p className="tf-stat-lbl">Avg Score</p>
              </div>
            </div>

            {/* Classification pie */}
            <div className="tf-section">
              <p className="tf-section-title">Classification Distribution</p>
              <div className="tf-chart-wrap">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={CLASS_DIST} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                      {CLASS_DIST.map((c, i) => (<Cell key={i} fill={c.color} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="tf-legend">
                  {CLASS_DIST.map((c) => (
                    <span key={c.name} className="tf-legend-item">
                      <span className="tf-legend-dot" style={{ background: c.color }} />
                      {c.name}: {c.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar chart per barangay */}
            <div className="tf-section">
              <p className="tf-section-title">FLT Completion by Barangay</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={BARANGAY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="taken" name="Taken" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="notTaken" name="Not Taken" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {tab === 'learners' && (
          <div className="tf-body">
            <div className="tf-filter-row">
              {(['all', 'taken', 'not-taken'] as const).map((f) => (
                <button key={f} className={`tf-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All' : f === 'taken' ? 'Taken' : 'Not Taken'}
                </button>
              ))}
            </div>

            {filteredLearners.map((l) => (
              <div key={l.id} className="tf-learner-card">
                <div className="tf-l-left">
                  <IonIcon icon={l.taken ? checkmarkCircle : alertCircleOutline}
                    style={{ color: l.taken ? '#16a34a' : '#dc2626', fontSize: 20 }} />
                </div>
                <div className="tf-l-info">
                  <p className="tf-l-name">{l.name}</p>
                  <p className="tf-l-meta">📍 {l.barangay} · {l.implementer}</p>
                  {l.taken ? (
                    <p className="tf-l-score">
                      Score: <strong>{l.score}%</strong> —
                      <span style={{ color: l.classification === 'Functional' ? '#16a34a' : l.classification === 'Developing' ? '#d97706' : '#dc2626' }}>
                        {' '}{l.classification}
                      </span>
                      <span className="tf-l-date">{l.date}</span>
                    </p>
                  ) : (
                    <p className="tf-l-score" style={{ color: '#dc2626' }}>FLT not yet taken</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TeacherFLT;
