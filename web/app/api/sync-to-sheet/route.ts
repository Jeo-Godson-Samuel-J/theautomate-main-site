import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const WEBAPP_URL = process.env.GOOGLE_SHEET_WEBAPP_URL;

        if (!WEBAPP_URL) {
            console.error('GOOGLE_SHEET_WEBAPP_URL is not defined');
            return NextResponse.json({ success: false, error: 'Webapp URL not configured' }, { status: 500 });
        }

        const response = await fetch(WEBAPP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Google Sheet sync failed with status ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Sync to Sheets Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
