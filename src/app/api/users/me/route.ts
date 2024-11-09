import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function POST(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findById(userId).select("-password");

        return NextResponse.json({
            message : "User Found !!!",
            data : user
        })

    } catch (error: any) {
        return NextResponse.json({error : error.message}, {status : 500});
    }
}