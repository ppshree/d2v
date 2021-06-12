import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { APPLICATION_URL } from '../../app/router/applicationRoutes';
import { Classes } from './modules/Classes';
import { Subjects } from './modules/Subjects';
import { MainLayout } from '../../components/MainLayout/MainLayout';

export const Courses: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="h-full flex">
      <MainLayout>
        <Switch>
          <Redirect exact from={path} to={APPLICATION_URL.SCHOOL} />
          <Route exact path={APPLICATION_URL.COURSE_CLASSLIST} component={Classes}></Route>
          <Route exact path={APPLICATION_URL.COURSE_SUBJECTLIST} component={Subjects}></Route>
          <Redirect to={APPLICATION_URL.SCHOOL} />
        </Switch>
      </MainLayout>
    </div>
  );
};
