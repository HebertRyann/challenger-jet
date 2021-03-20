import { ToolsContainerProps } from '../../../../../../../components/Container';
import { nameActions } from '../../info';

export const toolsViewCreate = (): ToolsContainerProps => ({
  name: 'Adicionar',
  to: nameActions.create.to,
  icon: nameActions.create.icon,
});

export const toolsViewList = (): ToolsContainerProps => ({
  name: 'Listar',
  to: nameActions.read.to,
  icon: nameActions.read.icon,
});

export const toolsViewUpdate = (id: string): ToolsContainerProps => ({
  name: 'Editar',
  to: `${nameActions.update.to}${id}`,
  icon: nameActions.update.icon,
});

export const toolsViewDelete = (
  handleOnClick: (pamams: any) => void,
): ToolsContainerProps => ({
  name: 'Remover',
  to: nameActions.delete.to,
  icon: nameActions.delete.icon,
  handleOnClick,
});
