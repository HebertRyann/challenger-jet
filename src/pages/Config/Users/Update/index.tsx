import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Container from '../../../../components/Container'
import { useLoading } from '../../../../hooks/loading'
import api from '../../../../services/api'
import { FormUser } from '../components/Form'
import { apiList } from '../domain/api'
import { nameActions, namePageTitle } from '../domain/info'
import { breadcrumbUpdate } from '../domain/breadcrumb'
import { toolsUpdate } from '../domain/tools'

const UserUpdate = (): JSX.Element => {
  const { location } =
    useHistory<{
      id: string
      value: string
    }>()
  const { id } = useParams<{ id: string }>()
  const { activeLoading, disableLoading } = useLoading()
  const [userItem, setUserItem] =
    useState<{
      id: string
      role_id: string
      name: string
      email: string
      username: string
      password: string
      active: boolean
    }>()

  useEffect(() => {
    async function loadData() {
      activeLoading()
      const response = await api.get(apiList(id))
      const { data } = response
      setUserItem(data)
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
        <FormUser
          typeForm="update"
          initialValues={{
            idUpdate: Number(userItem?.id),
            ...userItem
          }}
        />
      </div>
    </Container>
  )
}

export default UserUpdate
