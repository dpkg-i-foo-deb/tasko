export interface Task {
    code: number,
    title: string,
    description: string,
    main_task: number,
    start_date: string,
    due_date: string,
    status: boolean,
    user_email: string,
}