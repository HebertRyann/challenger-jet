import React from 'react';
import Container from '../../../../../components/Container';
import { breadcrumbCreate } from '../domain/breadcrumb';
import { nameActions, namePageTitle } from '../domain/info';
import { toolsCreate } from '../domain/tools/create';
import { Content } from './components/Content';
import { TabsProvider } from '../../../../../hooks/tabs';
import { TabUpdateProvider } from './providers/tabsProvider';
import { useParams } from 'react-router';

const Create = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container
      Content={() => (
        <TabsProvider>
          <TabUpdateProvider>
            <Content id={id} tools={[toolsCreate]} />
          </TabUpdateProvider>
        </TabsProvider>
      )}
      pageTitle={namePageTitle}
      portletTitle={nameActions.create.name}
      breadcrumb={breadcrumbCreate}
    />
  );
};

export default Create;
