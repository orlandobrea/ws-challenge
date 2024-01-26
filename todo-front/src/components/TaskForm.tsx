import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  CardBody,
  Typography,
  IconButton,
  Input
} from "@material-tailwind/react";
import { PlusIcon } from '@heroicons/react/16/solid';

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [name, setName] = useState('');

  const onAddTask = () => {
    const task: Task = { id: uuidv4(), name: name, done: false };
    setName('');
    onAdd(task);
  }

  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Create a new Task
        </Typography>
        <div className="flex gap-2">
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} crossOrigin={undefined} />
          <IconButton onClick={onAddTask} className="bg-green-500"><PlusIcon className="h-5 w-5 text-white-500" /></IconButton>
        </div>
      </CardBody>
    </Card>
  )
}

