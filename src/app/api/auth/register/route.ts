// Import stuff from next
import { NextRequest, NextResponse } from 'next/server'

// Import custom module
import { findDataInDB, writeDataInDB } from '@/helpers/db';
import { RegisterUserSchema, UserRequestData } from '@/helpers/validations/user.schema';

// Import module from node
import { randomUUID } from 'crypto';

// Import third party packages
import bcryptjs from 'bcryptjs'

// Import types
import type { IUserData, IUserRequestData } from '@/types';



export const POST = async (request: NextRequest) => {

    try {

        // Get data from request

        // Using our custom interface
        // const newUserData: IUserRequestData = await request.json(); 

        // Using our zod type
        const newUserData: UserRequestData = await request.json();

        const data = RegisterUserSchema.parse(newUserData);
       
        // Find user in db
        const user: IUserData | undefined = findDataInDB(newUserData.email);

        // Return error response 
        if (user) {
            return NextResponse.json({ "error": "user already registered" }, { status: 400 });
        }

        // Create salt for password
        const salt: string = await bcryptjs.genSalt(10);

        // Create hash password
        const hashPassword: string = await bcryptjs.hash(newUserData.password, salt);

        // Create new user object
        const newUser: IUserData = {
            _id: randomUUID(),
            name: newUserData.name,
            email: newUserData.email,
            password: hashPassword
        }

        // Write data in db
        const response = writeDataInDB(newUser);

        if (response) {

            return NextResponse.json({
                "message": "User registration complete successfully 😅"
            }, {
                status: 201
            });
        }

    } catch (error: any) {

        return NextResponse.json({
            "message": error.message,
            "error": error
        }, {
            status: 500
        });
    }

}