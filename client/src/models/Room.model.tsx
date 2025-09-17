export interface RoomModel {
    id: number,
    name: string,
    status: 'ACTIVE' | 'INACTIVE',
    departmentId: number
}