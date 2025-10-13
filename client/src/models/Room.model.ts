export interface RoomModel {
    id: number,
    name: string,
    status: 'EMPTY' | 'FULL' | 'REPAIR',
    departmentId: number,

    departmentName?: string
}