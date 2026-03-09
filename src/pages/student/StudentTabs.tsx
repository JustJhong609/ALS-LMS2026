import React from 'react';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import {
  homeOutline, home,
  bookOutline, book,
  documentTextOutline, documentText,
  statsChartOutline, statsChart,
  personOutline, person,
} from 'ionicons/icons';

import StudentDashboard  from './StudentDashboard';
import StudentCourses    from './StudentCourses';
import StudentAssessment from './StudentAssessment';
import StudentProgress   from './StudentProgress';
import StudentProfile    from './StudentProfile';
import CourseDetail      from '../shared/CourseDetail';
import LessonViewer      from '../shared/LessonViewer';
import AssessmentQuiz    from '../shared/AssessmentQuiz';

const StudentTabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/student/dashboard"   component={StudentDashboard} />
      <Route exact path="/student/courses"     component={StudentCourses} />
      <Route exact path="/student/assessment"  component={StudentAssessment} />
      <Route exact path="/student/progress"    component={StudentProgress} />
      <Route exact path="/student/profile"     component={StudentProfile} />
      <Route exact path="/student/course/:id"  component={CourseDetail} />
      <Route exact path="/student/lesson/:id"  component={LessonViewer} />
      <Route exact path="/student/quiz/:id"    component={AssessmentQuiz} />
      <Redirect exact from="/student" to="/student/dashboard" />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/student/dashboard">
        <IonIcon ios={homeOutline} md={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="courses" href="/student/courses">
        <IonIcon ios={bookOutline} md={book} />
        <IonLabel>Courses</IonLabel>
      </IonTabButton>
      <IonTabButton tab="assessment" href="/student/assessment">
        <IonIcon ios={documentTextOutline} md={documentText} />
        <IonLabel>Assess</IonLabel>
      </IonTabButton>
      <IonTabButton tab="progress" href="/student/progress">
        <IonIcon ios={statsChartOutline} md={statsChart} />
        <IonLabel>Progress</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/student/profile">
        <IonIcon ios={personOutline} md={person} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default StudentTabs;
