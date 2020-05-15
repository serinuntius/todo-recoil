import React, {FC, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {taskState, Task} from "./atoms/Task";

const TaskInput = () => {
    const [title, setTitle] = useState('');
    const setTask = useSetRecoilState(taskState);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const onClick = () => {
        setTask(t => {
            return [...t, {title, completed: false}]
        })
        setTitle('')
    }
    return (
        <div>
            <label>
                タスク名
                <input type="text" value={title} onChange={onChange}/>
            </label>
            <button onClick={onClick}>登録</button>
        </div>
    )
}

interface TaskItemProps {
    task: Task;
    index: number;
}

const removeTasksAtIndex = (tasks: Task[], index: number) => {
    return [...tasks.slice(0, index), ...tasks.slice(index + 1)]
}

const replaceTasksAtIndex = (tasks: Task[], index: number, newTask: Task) => {
    return [...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)]
}

const TaskItem: FC<TaskItemProps> = ({task, index}) => {
    const [tasks, setTasks] = useRecoilState(taskState);

    const onChange = () => {
        const newTasks = replaceTasksAtIndex(tasks, index, {
            ...task,
            completed: !task.completed
        });
        setTasks(newTasks);
    }

    const onClick = () => {
        const newTasks = removeTasksAtIndex(tasks, index);
        setTasks(newTasks);
    }

    return (
        <li key={index}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={onChange}
            />
            {task.title}
            <button onClick={onClick}>削除</button>
        </li>
    )
}

export const TaskList = () => {
    const tasks = useRecoilValue(taskState);

    return (
        <>
            <TaskInput/>
            <ul>
                {tasks.map((t, index) => {
                    return <TaskItem task={t} index={index} key={index}/>
                })}
            </ul>
        </>
    )
}
