import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const WEBAPP_URL = process.env.CONTACT_SHEET_WEBAPP_URL;

        if (!WEBAPP_URL || WEBAPP_URL === 'ADD_YOUR_WEBAPP_URL_HERE') {
            console.error('CONTACT_SHEET_WEBAPP_URL is not defined or is placeholder');
            return NextResponse.json({ success: false, error: 'Webapp URL not configured' }, { status: 500 });
        }

        console.log('Sending data to Google Sheet:', body);
        const response = await fetch(WEBAPP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const responseText = await response.text();
        console.log('Google Script Response Status:', response.status);
        console.log('Google Script Response Text:', responseText);

        if (!response.ok) {
            throw new Error(`Google Sheet sync failed with status ${response.status}: ${responseText}`);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Contact form submission Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
