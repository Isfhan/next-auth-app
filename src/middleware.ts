import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";



export const middleware = async (request: NextRequest) => {

    console.log('middleware invoked');

    if (request.cookies.has('authToken')) {


        let token = request.cookies.get('authToken')?.value;

        // we get error here 
        const data = jwt.verify(token as string, process.env.SECRET_KEY as string);
        console.log(data);


    } else {

        return NextResponse.json({ "message": "Token not found" })
    }

}


export const config = {
    matcher: [
        '/api/profile/:path*',
        '/api/admin/:path*',
    ],

}