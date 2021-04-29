import React from 'react';
import Container from '../../../../../components/Container';
import { breadcrumbUpdate } from '../domain/breadcrumb';
import { nameActions, namePageTitle } from '../domain/info';
import { toolsCreate } from '../domain/tools';
import { Content } from './components/Content';
import { TabsProvider } from '../../../../../hooks/tabs';
import { ProductProvider } from './contextData';
import { useParams } from 'react-router';
const Create = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  return (
    <Container
      Content={() => (
        <TabsProvider>
          <ProductProvider>
            <Content id={id} tools={[toolsCreate]} />
          </ProductProvider>
        </TabsProvider>
      )}
      pageTitle={namePageTitle}
      portletTitle={nameActions.update.name}
      breadcrumb={breadcrumbUpdate}
    />
  );
};

export default Create;
