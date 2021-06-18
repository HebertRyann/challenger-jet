import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Container from '../../../../components/Container'
import { useLoading } from '../../../../hooks/loading'
import api from '../../../../services/api'
import { FormRoles } from '../components/Form'
import { apiList } from '../domain/api'
import { nameActions, namePageTitle } from '../domain/info'
import { breadcrumbUpdate } from '../domain/breadcrumb'
import { toolsUpdate } from '../domain/tools'

const RolesUpdate = (): JSX.Element => {
  const { location } =
    useHistory<{
      id: string
      value: string
    }>()
  const { id } = useParams<{ id: string }>()
  const { activeLoading, disableLoading } = useLoading()
  const [roleItem, setRoleItem] = useState<{
    id: string
    name: string
    description: string
  }>({ id: '', name: '', description: '' })

  useEffect(() => {
    async function loadData() {
      activeLoading()
      const response = await api.get(apiList(id))
      const { data } = response
      setRoleItem(data)
      disableLoading()
    }

    loadData()
  }, [activeLoading, disableLoading, id])
  return (
    <Container
      pageTitle={namePageTitle}
      portletTitle={nameActions.update.name}
      breadcrumb={breadcrumbUpdate}
      tools={[
        toolsUpdate({
          id: location.state.id,
          value: location.state.value
        })
      ]}
    >
      <div className="form-body">
        <FormRoles
          initialValues={{
            idUpdate: Number(roleItem?.id),
            ...roleItem
          }}
          typeForm="update"
        />
      </div>
    </Container>
  )
}

export default RolesUpdate
