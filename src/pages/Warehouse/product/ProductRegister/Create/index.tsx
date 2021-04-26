import React from 'react';
import Container from '../../../../../components/Container';
import { breadcrumbCreate } from '../domain/breadcrumb';
import { nameActions, namePageTitle } from '../domain/info';
import { toolsCreate } from '../domain/tools/create';
import { Content } from './components/Content';
import { TabsProvider } from '../../../../../hooks/tabs';
import { TabCreateProvider } from '../Create/providers/tabsProvider';

const Create = (): JSX.Element => (
  <Container
    Content={() => (
      <TabsProvider>
        <TabCreateProvider>
          <Content tools={[toolsCreate]} />
        </TabCreateProvider>
      </TabsProvider>
    )}
    pageTitle={namePageTitle}
    portletTitle={nameActions.create.name}
    breadcrumb={breadcrumbCreate}
  />
);

export default Create;
