import {
  IconButton,
  Checkbox,
  ListItem
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/16/solid";

interface TaskListItemProps {
  item: Task;
  onToggleDone: (item: Task) => void;
  onRemove: (item: Task) => void;
}

export default function TaskListItem({ item, onToggleDone, onRemove }: TaskListItemProps) {
  return (
    <ListItem key={item.id} className="p-0 m-0 flex justify-between border-b-4">
      <Checkbox color="green" checked={item.done} onChange={() => onToggleDone(item)} label={item.name} crossOrigin={undefined} />
      <IconButton onClick={() => onRemove(item)} variant="text" size="sm"><TrashIcon className="h-4 w-4 text-red-500" /></IconButton>
    </ListItem>
  )
}

