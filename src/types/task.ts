export class Task {
    name: string;
    description: string;  
    completed: number;
    created: number;
    deadline: number;
    repeat: number;    
    id: number;

    constructor(name: string = '', 
                description: string = '',
                deadline: number = +new Date(),
                repeat: number = 0,
                completed: number = 0,
                created: number = +new Date(),
                id: number = -1) {
        this.name = name;
        this.description = description;  
        this.deadline = deadline;
        this.repeat = repeat;
        this.completed = completed;
        this.created = created;
        this.id = id;
    }

    getCopy(name: string = this.name,
            description: string = this.description,
            deadline: number = this.deadline,
            repeat: number = this.repeat,
            completed: number = this.completed,
            created: number = this.created,
            id: number = this.id) {
        return new Task(
            name,
            description,
            deadline,
            repeat,
            completed,
            created,
            id
        );
    }

    setDetails( name: string = this.name,
                description: string = this.description,
                deadline: number = this.deadline) {
        return this.getCopy(name, description, deadline);
    }

    setId(id: number) {
        const _ = undefined;
        return this.getCopy(_,_,_,_,_,_,id);
    }

    toggleComplete() {
        const _ = undefined;
        return this.getCopy(_,_,_,_,this.isCompleted() ? 0 : +new Date());
    }

    isCompleted() {
        return this.completed !== 0;
    }
}