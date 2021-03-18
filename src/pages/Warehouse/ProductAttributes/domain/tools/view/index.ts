import { ToolsContainerProps } from '../../../../../../components/Container';
import { nameActions } from '../../info';

export const toolsView = (id: string): ToolsContainerProps[] => [
  {
    name: 'Editar',
    to: `${nameActions.update.to}${id}`,
    hasParams: false,
    icon: nameActions.update.icon,
  },
  {
    name: 'Remover',
    to: nameActions.delete.to,
    icon: nameActions.delete.icon,
    hasParams: false,
  },
  {
    name:'Adicionar',
    to: nameActions.create.to,
    icon: nameActions.create.icon,
    hasParams: false,
  },
  {
    name: 'Listar',
    to: nameActions.read.to,
    icon: nameActions.read.icon,
    hasParams: false,
  },
];
