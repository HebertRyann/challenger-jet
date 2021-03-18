import { ToolsContainerProps } from '../../../../../../components/Container';
import { nameActions } from '../../info';

export const toolsUpdate = ({
  id,
  value,
}: {
  id: string;
  value: string;
}): ToolsContainerProps[] => [
  {
    name: nameActions.read.name,
    to: nameActions.read.to,
    icon: nameActions.read.icon,
    hasParams: {
      id: id,
      value: value,
    },
  },
];
