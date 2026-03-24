import Razorpay from 'razorpay';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    try {
        console.log('Using Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
        const { amount, courseKey } = await req.json();

        if (!amount || isNaN(amount)) {
            return NextResponse.json(
                { error: 'Amount is required and must be a number' },
                { status: 400 }
            );
        }

        // Amount comes from frontend in INR, Razorpay expects Paise (INR * 100)
        const totalPaise = Math.round(Number(amount) * 100);

        const order = await razorpay.orders.create({
            amount: totalPaise,
            currency: 'INR',
            receipt: `rcpt_${courseKey.substring(0, 15)}_${Date.now()}`.substring(0, 40),
        });

        return NextResponse.json(order);
    } catch (error: any) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}
