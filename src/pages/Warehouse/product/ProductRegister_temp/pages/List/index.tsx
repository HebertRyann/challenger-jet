import React from 'react'
import Container from '../../../../../../components/Container'
import DataTable from '../../../../../../components/DataTable'
import { nameEntity, namePageTitle, nameSource } from '../../domain/data/info'
import { headers } from '../../domain/data/headers'
import { breadcrumbList } from '../../domain/data/breadcrumb'
import { toolsList } from '../../domain/data/tools'

const ProductAtributesList = (): JSX.Element => (
  <Container
    pageTitle={namePageTitle}
    portletTitle={'Listagem'}
    breadcrumb={breadcrumbList}
    tools={[toolsList]}
  >
    <DataTable
      source={'form'}
      entity={nameEntity}
      format={{ orderBy: 'name' }}
      notHasChildren
      headers={headers}
    />
  </Container>
)

export default ProductAtributesList
