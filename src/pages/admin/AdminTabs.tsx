import React from 'react';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import {
  homeOutline, home, peopleOutline, people,
  bookOutline, book, statsChartOutline, statsChart, settingsOutline, settings,
} from 'ionicons/icons';
import AdminDashboard from './AdminDashboard';
import AdminUsers     from './AdminUsers';
import AdminCourses   from './AdminCourses';
import AdminReports   from './AdminReports';
import AdminSettings  from './AdminSettings';

const AdminTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/admin/dashboard" component={AdminDashboard} />
      <Route exact path="/admin/users"     component={AdminUsers} />
      <Route exact path="/admin/courses"   component={AdminCourses} />
      <Route exact path="/admin/reports"   component={AdminReports} />
      <Route exact path="/admin/settings"  component={AdminSettings} />
      <Redirect exact from="/admin" to="/admin/dashboard" />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/admin/dashboard">
        <IonIcon ios={homeOutline} md={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="users" href="/admin/users">
        <IonIcon ios={peopleOutline} md={people} />
        <IonLabel>Users</IonLabel>
      </IonTabButton>
      <IonTabButton tab="courses" href="/admin/courses">
        <IonIcon ios={bookOutline} md={book} />
        <IonLabel>Courses</IonLabel>
      </IonTabButton>
      <IonTabButton tab="reports" href="/admin/reports">
        <IonIcon ios={statsChartOutline} md={statsChart} />
        <IonLabel>Reports</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/admin/settings">
        <IonIcon ios={settingsOutline} md={settings} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default AdminTabs;
