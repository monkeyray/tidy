export class Task {
    name: string;
    description: string;  
    completed: number;
    created: number;
    deadline: number;
    repeat: number;

    constructor(name: string = 'Example task name', 
                description: string = 'Example task description',
                deadline: number = 0,
                repeat: number = 0,
                completed: number = 0,
                created: number = +new Date()) {
        this.name = name;
        this.description = description;  
        this.deadline = deadline;
        this.repeat = repeat;
        this.completed = completed;
        this.created = created;
    }

    toggleComplete() {
        return new Task(
            this.name,
            this.description,
            this.deadline,
            this.repeat,
            this.isCompleted() ? 0 : +new Date(),
            this.created
        );
    }

    isCompleted() {
        return this.completed !== 0;
    }
}