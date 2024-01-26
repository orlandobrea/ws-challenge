import {
  Card,
  CardBody,
  Typography,
  List,
} from "@material-tailwind/react";
import TaskListItem from "./TaskListItem";

interface TaskListProps {
  list: Task[];
  onRemove: (item: Task) => void;
  onToggleDone: (item: Task) => void;
}

export default function TaskList({ list, onRemove, onToggleDone }: TaskListProps) {
  return (
    <Card className="mt-2 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Task list
        </Typography>
        <List>
          {list && list.filter(item => !item.done).map((item: Task) =>
            <TaskListItem onRemove={onRemove} onToggleDone={onToggleDone} item={item} key={item.id} />
          )}
          {list && list.filter(item => item.done).map((item: Task) =>
            <TaskListItem onRemove={onRemove} onToggleDone={onToggleDone} item={item} key={item.id} />
          )}
        </List>
      </CardBody>
    </Card>
  )
}

