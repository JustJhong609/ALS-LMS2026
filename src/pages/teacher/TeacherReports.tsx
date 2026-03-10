import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
} from '@ionic/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import './TeacherReports.css';

/* ALS Learning Strand averages across district */
const STRAND_AVG = [
  { strand: 'LS 1',  avg: 70 },
  { strand: 'LS 2',  avg: 64 },
  { strand: 'LS 3',  avg: 82 },
  { strand: 'LS 4',  avg: 58 },
  { strand: 'LS 5',  avg: 75 },
  { strand: 'LS 6',  avg: 68 },
];

const STATUS_DATA = [
  { name: 'Active',    value: 36, color: '#16a34a' },
  { name: 'Inactive',  value: 6,  color: '#dc2626' },
  { name: 'Completed', value: 3,  color: '#1d4ed8' },
];

const FLT_TREND = [
  { month: 'Aug', functional: 10, developing: 8, beginning: 5 },
  { month: 'Sep', functional: 14, developing: 9, beginning: 4 },
  { month: 'Oct', functional: 18, developing: 8, beginning: 3 },
  { month: 'Nov', functional: 22, developing: 10, beginning: 4 },
];

const AUDIT_LOG = [
  { action: 'Rosa Bautista submitted monthly report', time: '2 days ago' },
  { action: 'FLT classification verified — Tankulan batch', time: '3 days ago' },
  { action: 'Carlos Mendoza uploaded LS 3 resource', time: '5 days ago' },
  { action: 'Content recommendation sent to Elena Torres', time: '1 week ago' },
];

const TeacherReports: React.FC = () => (
  <IonPage>
    <IonHeader className="als-header ion-no-border">
      <IonToolbar>
        <IonTitle className="toolbar-title-green">District Reports</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="reports-content">
      <div className="reports-body">

        {/* ── District overview ── */}
        <div className="rep-summary-row">
          {[
            { num: '45',   lbl: 'Total Learners',   color: '#1d4ed8' },
            { num: '4',    lbl: 'Implementers',      color: '#d97706' },
            { num: '64%',  lbl: 'Avg. Progress',     color: '#7c3aed' },
            { num: '80%',  lbl: 'FLT Compliance',    color: '#16a34a' },
          ].map((s) => (
            <div key={s.lbl} className="rep-stat" style={{ borderTopColor: s.color }}>
              <span className="rep-num" style={{ color: s.color }}>{s.num}</span>
              <span className="rep-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* ── Learning Strand avg ── */}
        <div className="rep-card">
          <p className="rep-card-title">Average Score by Learning Strand</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={STRAND_AVG} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="strand" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} formatter={(v: number) => [`${v}%`, 'Avg']} />
              <Bar dataKey="avg" radius={[6, 6, 0, 0]} fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Learner status pie ── */}
        <div className="rep-card">
          <p className="rep-card-title">Learner Status Distribution</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={STATUS_DATA} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {STATUS_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ── FLT trend ── */}
        <div className="rep-card">
          <p className="rep-card-title">FLT Classification Trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={FLT_TREND} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
              <Bar dataKey="functional" name="Functional" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="developing" name="Developing" fill="#d97706" radius={[4, 4, 0, 0]} />
              <Bar dataKey="beginning" name="Beginning" fill="#dc2626" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Audit / Compliance Log ── */}
        <div className="rep-card">
          <p className="rep-card-title">Recent Audit Log</p>
          <div className="rep-audit-list">
            {AUDIT_LOG.map((a, i) => (
              <div key={i} className="rep-audit-item">
                <span className="rep-audit-dot" />
                <div>
                  <p className="rep-audit-action">{a.action}</p>
                  <p className="rep-audit-time">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </IonContent>
  </IonPage>
);

export default TeacherReports;
