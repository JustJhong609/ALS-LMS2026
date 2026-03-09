import React from 'react';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import {
  homeOutline, home, peopleOutline, people,
  documentTextOutline, documentText, statsChartOutline, statsChart, personOutline, person,
} from 'ionicons/icons';

import TeacherDashboard from './TeacherDashboard';
import TeacherLearners  from './TeacherLearners';
import TeacherGrading   from './TeacherGrading';
import TeacherReports   from './TeacherReports';
import TeacherProfile   from './TeacherProfile';

const TeacherTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/teacher/dashboard"  component={TeacherDashboard} />
      <Route exact path="/teacher/learners"   component={TeacherLearners} />
      <Route exact path="/teacher/grading"    component={TeacherGrading} />
      <Route exact path="/teacher/reports"    component={TeacherReports} />
      <Route exact path="/teacher/profile"    component={TeacherProfile} />
      <Redirect exact from="/teacher" to="/teacher/dashboard" />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/teacher/dashboard">
        <IonIcon ios={homeOutline} md={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="learners" href="/teacher/learners">
        <IonIcon ios={peopleOutline} md={people} />
        <IonLabel>Learners</IonLabel>
      </IonTabButton>
      <IonTabButton tab="grading" href="/teacher/grading">
        <IonIcon ios={documentTextOutline} md={documentText} />
        <IonLabel>Grading</IonLabel>
      </IonTabButton>
      <IonTabButton tab="reports" href="/teacher/reports">
        <IonIcon ios={statsChartOutline} md={statsChart} />
        <IonLabel>Reports</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/teacher/profile">
        <IonIcon ios={personOutline} md={person} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default TeacherTabs;
