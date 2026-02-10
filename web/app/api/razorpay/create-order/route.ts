import Razorpay from 'razorpay';
import { NextResponse, NextRequest } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const COURSE_PRICE_MAP: Record<string, number> = {
    playwright: 20,
    selenium: 40,
    devops: 50,
};

export async function POST(req: NextRequest) {
    const { courseKey } = await req.json();

    const amount = COURSE_PRICE_MAP[courseKey] * 100;

    const order = await razorpay.orders.create({
        amount,
        currency: 'INR',
        receipt: `client_receipt_${Date.now()}`,
    });

    return NextResponse.json(order);
}
