import React from 'react';
import Container from '../../../../../components/Container';
import { breadcrumbCreate } from '../domain/breadcrumb';
import { nameActions, namePageTitle } from '../domain/info';
import { toolsCreate } from '../domain/tools/create';
import { Content } from './components/Content';
import { TabsProvider } from '../../../../../hooks/tabs';

const Create = (): JSX.Element => {
  return (
    <Container
      Content={() => (
        <TabsProvider>
          <Content />
        </TabsProvider>
      )}
      pageTitle={namePageTitle}
      portletTitle={nameActions.create.name}
      breadcrumb={breadcrumbCreate}
      tools={[toolsCreate]}
    />
  );
};

export default Create;
