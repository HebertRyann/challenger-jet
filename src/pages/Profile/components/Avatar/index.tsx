import React, { ChangeEvent, useRef } from 'react'
import api from '../../../../services/api'
import { useToast } from '../../../../hooks/toast'
import { useLoading } from '../../../../hooks/loading'
import { apiUpdateAvatar } from '../../domain/api'
import { useAuth } from '../../../../hooks/auth'
import { AvatarContainer } from './styles'
import AvatarImg from '../../../../assets/layouts/layout3/img/avatar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

type TypesFormProps = {
  avatarUrl?: string
}

export const FormAvatar = ({ avatarUrl }: TypesFormProps): JSX.Element => {
  const { updateUser } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)

  const { addToast } = useToast()
  const { activeLoading, disableLoading } = useLoading()

  async function uploadAvatar(file: File) {
    if (!file) return
    const data = new FormData()

    try {
      if (file) data.append('avatar', file)
      activeLoading()
      await api.patch(apiUpdateAvatar(), data)

      disableLoading()
      addToast({
        type: 'success',
        title: 'Imagem de perfil atualizada!'
      })
      updateUser()
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Não foi possível atualizar imagem, tente novamente!'
      })
      disableLoading()
    }
    if (fileRef.current) fileRef.current.value = ''
  }

  function onChangeFileHandler(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const file = event.target.files[0]

    uploadAvatar(file)
  }

  return (
    <AvatarContainer>
      <img alt="" className="img-circle" src={avatarUrl || AvatarImg} />
      <label htmlFor="file">
        <FontAwesomeIcon icon={faCamera} />
        <span> Trocar imagem </span>
      </label>
      <input
        style={{ display: 'none' }}
        type="file"
        name="file"
        id="file"
        ref={fileRef}
        onChange={onChangeFileHandler}
      />
    </AvatarContainer>
  )
}
