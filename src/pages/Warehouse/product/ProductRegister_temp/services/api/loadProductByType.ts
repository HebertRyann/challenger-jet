import api from '../../../../../../services/api'

type SaveProductParams = {
  id: string
  name: string
}

export const loadProductByType = async (
  type: string
): Promise<SaveProductParams[]> => {
  const { data, status } = await api.get<SaveProductParams[]>(
    `/product/type/${type}`
  )
  if (status === 500) throw new Error('Não foi possivel buscar os produtos')
  return data
}
