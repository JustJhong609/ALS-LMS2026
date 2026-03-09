import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonContent,
} from '@ionic/react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import './AdminReports.css';

const PASS_FAIL = [
  { month: 'Jan', pass: 120, fail: 18 },
  { month: 'Feb', pass: 135, fail: 14 },
  { month: 'Mar', pass: 148, fail: 12 },
  { month: 'Apr', pass: 160, fail: 10 },
  { month: 'May', pass: 172, fail: 9  },
  { month: 'Jun', pass: 185, fail: 8  },
];

const SUBJECT_AVG = [
  { subject: 'Math',    score: 78 },
  { subject: 'English', score: 82 },
  { subject: 'Science', score: 74 },
  { subject: 'Filipino',score: 85 },
  { subject: 'AP',      score: 80 },
  { subject: 'TLE',     score: 88 },
];

const ENROLL_TREND = [
  { month: 'Jan', enrolled: 980 },
  { month: 'Feb', enrolled: 1050 },
  { month: 'Mar', enrolled: 1200 },
  { month: 'Apr', enrolled: 1380 },
  { month: 'May', enrolled: 1450 },
  { month: 'Jun', enrolled: 1560 },
];

const LEVEL_PIE = [
  { name: 'Elementary', value: 3800 },
  { name: 'Junior HS',  value: 4200 },
  { name: 'Senior HS',  value: 4482 },
];

const PIE_COLORS = ['#1d4ed8', '#7c3aed', '#16a34a'];

const AdminReports: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ar-header ion-no-border">
        <IonToolbar>
          <div className="ar-toolbar-title">System Reports</div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ar-content">
        <div className="ar-body">

          {/* KPI Row */}
          <div className="ar-kpi-row">
            {[
              { lbl: 'Total Enrolled', val: '12,482', delta: '+8.4%',  up: true  },
              { lbl: 'Overall Pass Rate', val: '95.2%', delta: '+1.1%',  up: true  },
              { lbl: 'Avg Session',    val: '42 min', delta: '-2m',     up: false },
              { lbl: 'Completions',    val: '1,820',  delta: '+12%',    up: true  },
            ].map((k) => (
              <div key={k.lbl} className="ar-kpi-card">
                <p className="ar-kpi-val">{k.val}</p>
                <p className="ar-kpi-lbl">{k.lbl}</p>
                <span className={`ar-kpi-delta ${k.up ? 'up' : 'down'}`}>{k.delta}</span>
              </div>
            ))}
          </div>

          {/* Enrollment Trend */}
          <div className="ar-chart-card">
            <p className="ar-chart-title">Enrollment Trend</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={ENROLL_TREND} margin={{ top: 4, right: 10, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Line type="monotone" dataKey="enrolled" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4, fill: '#7c3aed' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pass / Fail Over Time */}
          <div className="ar-chart-card">
            <p className="ar-chart-title">Pass / Fail Per Month</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={PASS_FAIL} margin={{ top: 4, right: 10, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="pass" name="Passed" fill="#16a34a" radius={[4,4,0,0]} />
                <Bar dataKey="fail" name="Failed" fill="#dc2626" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Subject Averages */}
          <div className="ar-chart-card">
            <p className="ar-chart-title">Average Score by Subject</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={SUBJECT_AVG} margin={{ top: 4, right: 10, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
                <Bar dataKey="score" name="Avg Score" radius={[5,5,0,0]}>
                  {SUBJECT_AVG.map((_, i) => (
                    <Cell key={i} fill={['#1d4ed8','#7c3aed','#0891b2','#dc2626','#d97706','#16a34a'][i % 6]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Learners by Level Pie */}
          <div className="ar-chart-card ar-pie-card">
            <p className="ar-chart-title">Learners by Level</p>
            <div className="ar-pie-wrap">
              <PieChart width={150} height={150}>
                <Pie data={LEVEL_PIE} cx={70} cy={70} outerRadius={60} dataKey="value">
                  {LEVEL_PIE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              </PieChart>
              <div className="ar-pie-legend">
                {LEVEL_PIE.map((l, i) => (
                  <div key={l.name} className="ar-pie-leg-item">
                    <span className="ar-pie-dot" style={{ background: PIE_COLORS[i] }} />
                    <div>
                      <p className="ar-pie-leg-name">{l.name}</p>
                      <p className="ar-pie-leg-val">{l.value.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminReports;
