import {atom} from 'recoil';

export interface Task {
    title: string;
    completed: boolean;
}

const initialTasks: Task[] = [];

export const taskState = atom({
    key: 'task',
    default: initialTasks,
    // dangerouslyAllowMutability: true
})