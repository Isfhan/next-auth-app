// Import stuff from next
import { NextRequest, NextResponse } from 'next/server';

// Import custom module
import { findDataInDB } from '@/helpers/db';

// Import third party packages
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

// Import types
import type { IUserData, IUserRequestData } from '@/types';



export const POST = async (request: NextRequest) => {

    try {

        // Get data from request
        const userLoginData = await request.json();

        // Find user in db
        const user: IUserData | undefined = findDataInDB(userLoginData.email);

        // Return error response 
        if (!user) {
            return NextResponse.json({ "error": "user is not registered" }, { status: 400 });
        }

        // Compare password
        const passwordMatch: boolean = await bcryptjs.compare(userLoginData.password, user.password);

        // Return error response if message not match
        if (!passwordMatch) {
            return NextResponse.json({ "error": "Password is incorrect" }, { status: 400 });
        }

        // Create a jwt token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY as string, {
            expiresIn: "7d"
        });

        // Crate response object
        const response = NextResponse.json({ "message": "Success" }, { status: 200 });

        // Set token in cookie
        response.cookies.set('authToken', token, {
            httpOnly: true
        });

        // Return response
        return response;

    } catch (error: any) {
        console.log(error.message);
    }

}