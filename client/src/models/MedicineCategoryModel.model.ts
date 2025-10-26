import type { MedicineModel } from "./MedicineModel.model";

type MedicineCategoryModel = {
    id: number,
    name: string,
    description: string,
    
    medicines: MedicineModel[]
}

export type { MedicineCategoryModel };