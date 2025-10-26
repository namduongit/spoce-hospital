type MedicineResponse = {
    id: number,
    name: string,
    description: string,
    unit: string,

    price: number,
    
    manufacturer: string,
    status: string,
    currentStock: number,

    minStock: number,
    maxStock: number,

    categoryId: number,
    categoryName: string,

    isLowStock: boolean,
    isOutOfStock: boolean
}

export type { MedicineResponse };
