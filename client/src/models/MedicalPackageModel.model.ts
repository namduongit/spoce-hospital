type MedicalPackageModel = {
    id: number,
    name: string,
    description: string,  
    price: number,
    status: 'ACTIVE' | 'INACTIVE',

    createdAt: Date,
    updatedAt: Date
}

export type { MedicalPackageModel };