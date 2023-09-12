import { NextResponse } from 'next/server'

export async function GET() {
    console.log('get api invoked');
    return NextResponse.json({ "message": "Welcome to next API" })
}