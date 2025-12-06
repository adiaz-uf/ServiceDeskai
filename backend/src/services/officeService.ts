import { IOffice, OfficeModel } from "../models/Office";

type OfficeData = Pick<IOffice, 'city' | 'country' | 'direction'>


export const getAllOffices = async() => {
    const offices = await OfficeModel.find().sort({ number: 1 });
    return offices;
}

export const createOffice = async ({ city, country, direction }: OfficeData) => {
    const existingOffice = await OfficeModel.findOne({ direction });
    if (existingOffice) {
        throw new Error('Esta oficina ya existe');
    }

    const lastOffice = await OfficeModel.findOne().sort({ number: -1 });
    const newOfficeNum = lastOffice ? lastOffice.number + 1 : 1;

    const newOffice = new OfficeModel({
        number: newOfficeNum,
        city, 
        country, 
        direction
    });

    // Save the Office to the database
    const savedOffice = await newOffice.save();

    // Return office without
    return {
        _id: savedOffice._id,
        number: savedOffice.number,
        city: savedOffice.city,
        country: savedOffice.country,
        direction: savedOffice.direction
    };
}