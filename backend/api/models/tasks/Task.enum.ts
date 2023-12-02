export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
export enum TaskState {
  DONE = 'DONE',
  TODO = 'TODO',
  DOING = 'DOING',
  BLOCKED = 'BLOCKED',
}

export const AllPriorities: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH]
export const AllStates: TaskState[] = [TaskState.DONE, TaskState.DOING, TaskState.TODO, TaskState.BLOCKED]
