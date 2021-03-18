import { ToolsContainerProps } from '../../../../../../components/Container';
import { nameActions } from '../../info';

export const toolsCreate: ToolsContainerProps[] = [
  {
    name: nameActions.read.name,
    to: nameActions.read.to,
    icon: nameActions.read.icon,
    modal: false,
    hasParams: false,
  },
];
