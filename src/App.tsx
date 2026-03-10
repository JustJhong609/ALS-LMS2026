import React, { createContext, useContext, useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import WelcomePage       from './pages/Welcome';
import LoginPage         from './pages/Login';
import RegisterPage      from './pages/Register';
import StudentTabs       from './pages/student/StudentTabs';
import ImplementerTabs   from './pages/implementer/ImplementerTabs';
import TeacherTabs       from './pages/teacher/TeacherTabs';
import AdminTabs         from './pages/admin/AdminTabs';

setupIonicReact();

/* ── Auth Context (frontend mock) ── */
export interface AuthUser {
  id:     string;
  name:   string;
  email:  string;
  role:   'student' | 'implementer' | 'teacher' | 'admin';
  avatar: string;
  grade?: string;
}

interface AuthCtx {
  user: AuthUser | null;
  login:  (u: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthCtx>({
  user: null,
  login:  () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

/* Handles the root "/" path — shows Welcome when logged out,
   redirects to the role dashboard when logged in.
   This avoids putting a conditional expression directly inside
   IonRouterOutlet (which crashes Ionic's StackManager). */
const RootRoute: React.FC = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <WelcomePage />;
  const dest =
    user.role === 'student'     ? '/student/dashboard'
    : user.role === 'implementer' ? '/implementer/dashboard'
    : user.role === 'teacher'     ? '/teacher/dashboard'
    : '/admin/dashboard';
  return <Redirect to={dest} />;
};

const App: React.FC = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login  = (u: AuthUser) => setUser(u);
  const logout = ()            => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Root: Welcome when logged out, role dashboard when logged in */}
            <Route exact path="/" component={RootRoute} />
            <Route exact path="/login"    component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />

            {/* Protected routes — guard inside render prop, never conditionally omitted */}
            <Route path="/student"
              render={() => user?.role === 'student' ? <StudentTabs /> : <Redirect to="/" />} />
            <Route path="/implementer"
              render={() => user?.role === 'implementer' ? <ImplementerTabs /> : <Redirect to="/" />} />
            <Route path="/teacher"
              render={() => user?.role === 'teacher' ? <TeacherTabs /> : <Redirect to="/" />} />
            <Route path="/admin"
              render={() => user?.role === 'admin' ? <AdminTabs /> : <Redirect to="/" />} />

            <Redirect to="/" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthContext.Provider>
  );
};

export default App;
