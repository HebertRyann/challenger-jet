import { ToolsContainerProps } from '../../../../../../components/Container';
import { nameActions } from '../../info';

export const toolsCreate: ToolsContainerProps = {
  name: 'Listar',
  to: nameActions.read.to,
  icon: nameActions.read.icon,
  hasParams: false,
};
