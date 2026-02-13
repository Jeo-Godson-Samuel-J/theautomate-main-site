# Google Sheets Apps Script Setup

To ensure your contact form submits data correctly to Google Sheets, use the following Google Apps Script.

## 1. Setup Instructions
1. Open your Google Sheet.
2. Go to **Extensions** > **Apps Script**.
3. Delete any existing code and paste the code below.
4. Click the **Save** icon (disk).
5. Click **Deploy** > **New Deployment**.
6. Select Type: **Web App**.
7. Description: `Contact Form Backend`.
8. Execute as: **Me**.
9. Who has access: **Anyone**.
10. Click **Deploy**.
11. Copy the **Web App URL** and paste it into your `.env.local` as `CONTACT_SHEET_WEBAPP_URL`.

## 2. Apps Script Code

```javascript
function doGet(e) {
  return ContentService.createTextOutput("Auto-Mate Contact Script is LIVE. Please use POST to submit data.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create headers if sheet is empty
    if (sheet.getLastRow() == 0) {
      sheet.appendRow(["Timestamp", "First Name", "Last Name", "Email", "Phone Number", "Subject", "Message"]);
    }
    
    // Append the form data
    sheet.appendRow([
      new Date(),
      data.firstName || "N/A",
      data.lastName || "N/A",
      data.email || "N/A",
      data.phoneNumber || "N/A",
      data.subject || "N/A",
      data.message || "N/A"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "success": true, "message": "Row appended successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "success": false, "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Why this works
- **JSON Parsing**: It correctly parses the JSON body sent by your Next.js API route.
- **Dynamic Headers**: It checks if the sheet is empty and adds headers automatically.
- **JSON Response**: It returns a proper JSON response so the website knows the submission was successful.
