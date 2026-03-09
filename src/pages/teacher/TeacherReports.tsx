import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
} from '@ionic/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import './TeacherReports.css';

const SUBJECT_AVG = [
  { subject: 'Filipino', avg: 70 },
  { subject: 'English',  avg: 64 },
  { subject: 'Math',     avg: 82 },
  { subject: 'Science',  avg: 58 },
  { subject: 'AP',       avg: 75 },
  { subject: 'EsP',      avg: 68 },
];

const STATUS_DATA = [
  { name: 'Active',    value: 42, color: '#16a34a' },
  { name: 'Inactive',  value: 8,  color: '#dc2626' },
  { name: 'Completed', value: 5,  color: '#1d4ed8' },
];

const PASS_FAIL = [
  { quiz: 'Math Q1',   pass: 18, fail: 4 },
  { quiz: 'Science U2',pass: 14, fail: 8 },
  { quiz: 'English V', pass: 20, fail: 2 },
  { quiz: 'Filipino R',pass: 17, fail: 5 },
];

const TeacherReports: React.FC = () => (
  <IonPage>
    <IonHeader className="als-header ion-no-border">
      <IonToolbar>
        <IonTitle className="toolbar-title-green">Reports & Analytics</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="reports-content">
      <div className="reports-body">

        {/* ── Class overview ── */}
        <div className="rep-summary-row">
          {[
            { num: '55',   lbl: 'Total Learners', color: '#1d4ed8' },
            { num: '76%',  lbl: 'Pass Rate',      color: '#16a34a' },
            { num: '68%',  lbl: 'Avg. Progress',  color: '#7c3aed' },
            { num: '12',   lbl: 'Assessments',    color: '#d97706' },
          ].map((s) => (
            <div key={s.lbl} className="rep-stat" style={{ borderTopColor: s.color }}>
              <span className="rep-num" style={{ color: s.color }}>{s.num}</span>
              <span className="rep-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* ── Subject avg ── */}
        <div className="rep-card">
          <p className="rep-card-title">Average Score by Subject</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SUBJECT_AVG} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
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

        {/* ── Pass/Fail per quiz ── */}
        <div className="rep-card">
          <p className="rep-card-title">Quiz Pass/Fail Breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PASS_FAIL} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="quiz" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
              <Bar dataKey="pass" name="Passed" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fail" name="Failed" fill="#dc2626" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </IonContent>
  </IonPage>
);

export default TeacherReports;
