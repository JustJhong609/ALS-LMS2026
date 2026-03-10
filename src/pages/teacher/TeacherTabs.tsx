import React from 'react';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import {
  homeOutline, home, peopleOutline, people,
  analyticsOutline, analytics, statsChartOutline, statsChart, personOutline, person,
} from 'ionicons/icons';

import TeacherDashboard    from './TeacherDashboard';
import TeacherImplementers from './TeacherImplementers';
import TeacherFLT          from './TeacherFLT';
import TeacherReports      from './TeacherReports';
import TeacherProfile      from './TeacherProfile';

const TeacherTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/teacher/dashboard"     component={TeacherDashboard} />
      <Route exact path="/teacher/implementers"  component={TeacherImplementers} />
      <Route exact path="/teacher/flt"           component={TeacherFLT} />
      <Route exact path="/teacher/reports"       component={TeacherReports} />
      <Route exact path="/teacher/profile"       component={TeacherProfile} />
      <Redirect exact from="/teacher" to="/teacher/dashboard" />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/teacher/dashboard">
        <IonIcon ios={homeOutline} md={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="implementers" href="/teacher/implementers">
        <IonIcon ios={peopleOutline} md={people} />
        <IonLabel>Implementers</IonLabel>
      </IonTabButton>
      <IonTabButton tab="flt" href="/teacher/flt">
        <IonIcon ios={analyticsOutline} md={analytics} />
        <IonLabel>FLT</IonLabel>
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
