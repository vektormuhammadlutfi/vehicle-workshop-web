// types.ts
export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    branch: string;
    customerAddress: string;
    officeAddress: string | null;
    phoneNo: string;
    mobileNo: string | null;
    dateOfBirth: string; // Ubah ini menjadi Date jika diperlukan
    placeOfBirth: string | null;
    identificationType: string;
    identificationNo: string;
    religion: string | null;
    occupation: string | null;
    customerType: string | null;
    gender: string | null;
    email: string;
    country: string | null;
    province: string | null;
    city: string | null;
    district: string | null;
    subDistrict: string | null;
    postalCode: string | null;
    rt: string | null;
    rw: string | null;
    simCardNo: string | null;
    marriedStatus: string | null;
    incomePerMonth: number | null;
    expensesPerMonth: number | null;
    hobby: string | null;
    favoriteFood: string | null;
    favoriteDrink: string | null;
    businessFields: string | null;
    registeredDate: string | null;
    vehiclePhoneNo: string | null;
    createdAt: string;
    userCreated: string | null;
    updatedAt: string;
    userUpdate: string | null;
    deletedAt: string | null;
}

export interface CustomersResponse {
    success: boolean;
    message: string;
    data: {
        customers: Customer[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalCount: number;
            limit: number;
        };
    };
}