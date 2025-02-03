export default class Task{
    constructor(){
    this.baseUrl = process.env.REACT_APP_API_URL
    }
    async createTask(task){
        const response = await fetch(`${this.baseUrl}/tasks/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        return response.json();
    }

    async getUsers(){
        const response = await fetch(`${this.baseUrl}/users/`);
        return response.json();
    }
}