// Import stuff from next
import { NextRequest, NextResponse } from 'next/server'

// Import custom module
import { findDataInDB, writeDataInDB } from '@/helpers/db';

// Import module from node
import { randomUUID } from 'crypto';

// Import third party packages
import bcryptjs from 'bcryptjs'

// Import types
import type { IUserData, IUserRequestData } from '@/types';



export const POST = async (request: NextRequest) => {

    // Get data from request
    const newUserData: IUserRequestData = await request.json();

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

    return NextResponse.json({
        "error": "something went wrong 😑"
    }, {
        status: 500
    });
}