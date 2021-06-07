import { ToolsContainerProps } from '../../../../../../../../components/Container'
import { nameActions } from '../../info'

export const toolsCreate: ToolsContainerProps = {
  name: 'Adicionar',
  to: nameActions.read.to,
  icon: nameActions.read.icon,
  hasParams: false
}
