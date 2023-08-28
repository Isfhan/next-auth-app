// Import module from node
import path from 'path';
import fs from "fs";


// Import types
import type { IUserData } from '@/types';


// Create database file path
const databaseFilePath = path.join(process.cwd(), "/src/database/db.json");


export const getDataFromDB = (): { users: IUserData[] } => {

    try {

        const db = fs.readFileSync(databaseFilePath, "utf-8");
        const dataFromDB = JSON.parse(db);
        console.log(dataFromDB);
        return dataFromDB;

    } catch (error: any) {
        throw new Error(error?.message);
    }

};


export const writeDataInDB = (newUserData: IUserData) => {

    try {

        // Get data from DB         
        const currentDataFromDB = getDataFromDB();

        // Create data to insert in DB
        const newDataToInsertInDB = JSON.parse(JSON.stringify(currentDataFromDB));

        // Push new user data
        newDataToInsertInDB.users.push(newUserData);

        // Save data in file
        fs.writeFileSync(databaseFilePath, JSON.stringify(newDataToInsertInDB, null, 4))

        // Return true on success  
        return true;

    } catch (error: any) {
        throw new Error(error?.message);
    }

}


export const findDataInDB = (fieldValue: string) => {

    try {

        const currentDataFromDB = getDataFromDB();

        return currentDataFromDB.users.find((user) => {
            if (user._id == fieldValue) return true;
            else if (user.name == fieldValue) return true;
            else if (user.email == fieldValue) return true;
            else return undefined;
        });

    } catch (error: any) {
        throw new Error(error?.message);
    }

}
