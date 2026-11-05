/**
 * ============================================================================
 * FESTIVE CHRISTMAS HACKATHON 2026 - GOOGLE APPS SCRIPT WEBHOOK
 * ============================================================================
 *
 * This script serves as the backend webhook for the React Registration Page.
 * Actions performed upon receiving a POST request:
 *   1. Appends full registration data as a new row in Google Sheets (with auto-headers).
 *   2. Sends a festive HTML confirmation email to the Team Leader.
 *   3. Sends a comprehensive admin notification email to the Organizer (y.s8269773357@gmail.com).
 *   4. Returns a clean JSON response with CORS compatibility.
 */

// Configuration
var ORGANIZER_EMAIL = "y.s8269773357@gmail.com";
var EVENT_TITLE = "Festive Christmas Hackathon 2026";
var EVENT_DATE = "25 December 2026 (09:00 AM – 05:00 PM IST)";

/**
 * Handle HTTP GET Requests (Service Health Check)
 */
function doGet(e) {
  var output = {
    status: "online",
    service: "Festive Christmas Hackathon 2026 - Registration Webhook",
    timestamp: new Date().toISOString()
  };
  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle HTTP OPTIONS Preflight Requests (CORS Support)
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Handle HTTP POST Requests (Main Webhook Handler)
 */
function doPost(e) {
  try {
    var rawData = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);

    // 1. Save data into the active Google Sheet
    var sheetResult = saveToSheet(data);

    // 2. Send festive confirmation email to the Team Leader
    sendLeaderConfirmationEmail(data);

    // 3. Send complete admin notification email to the Organizer
    sendAdminNotificationEmail(data);

    // 4. Return successful JSON response
    var response = {
      status: "success",
      registrationId: data.registrationId || sheetResult.generatedId,
      message: "Registration successfully recorded. Confirmation emails dispatched."
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());

    var errorResponse = {
      status: "error",
      message: error.toString()
    };

    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Appends the registration data to the active Google Sheet.
 * Automatically initializes and styles header row if the sheet is empty.
 */
function saveToSheet(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var headers = [
    "Registration ID",
    "Timestamp (IST)",
    "Team Name",
    "Team Size",
    "Total Members",
    "Technical Domain",
    "City",
    "State",
    "Leader Name",
    "Leader Email",
    "Leader Phone",
    "Leader College / University",
    "Leader Degree",
    "Leader Branch",
    "Leader Academic Year",
    "Leader Roll No",
    "Member 2 Name",
    "Member 2 Email",
    "Member 2 Phone",
    "Member 3 Name",
    "Member 3 Email",
    "Member 3 Phone",
    "Member 4 Name",
    "Member 4 Email",
    "Member 4 Phone",
    "Programming Languages",
    "Frameworks & Tech",
    "GitHub Profile",
    "LinkedIn Profile",
    "Past Experience",
    "Project Idea Brief",
    "Fee (INR)",
    "Transaction ID / UTR",
    "Payment Status"
  ];

  // Auto-setup headers if row 1 is blank
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#09271E");
    headerRange.setFontColor("#E9C578");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);
  }

  var regId = data.registrationId || ("XMAS-2026-" + Math.floor(100000 + Math.random() * 900000));
  var dateFormatted = data.submissionDateFormatted || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a");

  var row = [
    regId,
    dateFormatted,
    data.teamName || "N/A",
    data.teamSize ? data.teamSize.toUpperCase() : "N/A",
    data.totalMembers || 1,
    data.technicalDomain || "N/A",
    data.city || "N/A",
    data.state || "N/A",
    data.leaderName || "N/A",
    data.leaderEmail || "N/A",
    data.leaderPhone || "N/A",
    data.leaderCollege || "N/A",
    data.leaderDegree || "N/A",
    data.leaderBranch || "N/A",
    data.leaderYear || "N/A",
    data.leaderRollNumber || "N/A",
    data.member2Name || "N/A",
    data.member2Email || "N/A",
    data.member2Phone || "N/A",
    data.member3Name || "N/A",
    data.member3Email || "N/A",
    data.member3Phone || "N/A",
    data.member4Name || "N/A",
    data.member4Email || "N/A",
    data.member4Phone || "N/A",
    data.programmingLanguages || "N/A",
    data.frameworks || "N/A",
    data.githubUrl || "N/A",
    data.linkedinUrl || "N/A",
    data.pastExperience || "N/A",
    data.projectBrief || "N/A",
    data.registrationFeeINR || 400,
    data.transactionId || "N/A",
    data.paymentStatus || "PENDING_VERIFICATION"
  ];

  sheet.appendRow(row);

  return {
    generatedId: regId
  };
}

/**
 * Sends a Festive Confirmation Email to the Team Leader
 */
function sendLeaderConfirmationEmail(data) {
  if (!data.leaderEmail) return;

  var subject = "Registration Confirmed: Festive Christmas Hackathon 2026 🎄";
  var regId = data.registrationId || "XMAS-2026-CONFIRMED";
  var fee = data.registrationFeeINR || 400;

  var membersListHtml = "";
  if (data.totalMembers >= 2 && data.member2Name && data.member2Name !== "N/A") {
    membersListHtml += "<li><strong>Member 2:</strong> " + data.member2Name + " (" + data.member2Email + ", " + data.member2Phone + ")</li>";
  }
  if (data.totalMembers >= 3 && data.member3Name && data.member3Name !== "N/A") {
    membersListHtml += "<li><strong>Member 3:</strong> " + data.member3Name + " (" + data.member3Email + ", " + data.member3Phone + ")</li>";
  }
  if (data.totalMembers >= 4 && data.member4Name && data.member4Name !== "N/A") {
    membersListHtml += "<li><strong>Member 4:</strong> " + data.member4Name + " (" + data.member4Email + ", " + data.member4Phone + ")</li>";
  }

  var htmlBody = ""
    + "<div style='background-color:#041710; color:#FFF4DF; font-family:Helvetica, Arial, sans-serif; padding:30px 20px; text-align:center;'>"
    + "  <div style='max-width:600px; margin:0 auto; background-color:#061C14; border:1px solid #E9C578; border-radius:18px; padding:32px 24px; text-align:left; box-shadow:0 8px 30px rgba(0,0,0,0.6);'>"
    + "    <div style='text-align:center; border-bottom:1px solid rgba(233,197,120,0.3); padding-bottom:20px; margin-bottom:24px;'>"
    + "      <h1 style='color:#E9C578; font-size:26px; margin:0; font-family:Georgia, serif;'>🎄 Festive Christmas Hackathon 2026</h1>"
    + "      <p style='color:#25A18E; font-size:13px; font-weight:bold; letter-spacing:1px; margin-top:6px; text-transform:uppercase;'>Registration Received & Confirmed</p>"
    + "    </div>"
    + "    <p style='font-size:16px; line-height:1.6; color:#FFF4DF;'>Dear <strong>" + data.leaderName + "</strong>,</p>"
    + "    <p style='font-size:14px; line-height:1.6; color:#D9ECF5;'>"
    + "      Welcome to the <strong>Festive Christmas Hackathon 2026</strong>! Your team registration has been successfully received. Get ready for an intensive 8-hour sprint of coding, creativity, and festive innovation."
    + "    </p>"
    + "    <div style='background-color:#0A261D; border:1px solid #E9C578; border-radius:12px; padding:18px; margin:24px 0;'>"
    + "      <table style='width:100%; font-size:13px; color:#FFF4DF; border-collapse:collapse;'>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Registration ID:</td><td style='padding:6px 0; font-weight:bold; color:#FFD700; font-family:monospace; font-size:15px;'>" + regId + "</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Team Name:</td><td style='padding:6px 0; font-weight:bold;'>" + data.teamName + "</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Track Domain:</td><td style='padding:6px 0;'>" + data.technicalDomain + "</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Team Size:</td><td style='padding:6px 0;'>" + (data.teamSize ? data.teamSize.toUpperCase() : "SOLO") + " (" + data.totalMembers + " Participant" + (data.totalMembers > 1 ? "s" : "") + ")</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Event Date:</td><td style='padding:6px 0; color:#25A18E; font-weight:bold;'>" + EVENT_DATE + "</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Registration Fee:</td><td style='padding:6px 0;'>₹" + fee + " (Paid)</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Transaction / UTR:</td><td style='padding:6px 0; font-family:monospace; color:#E9C578;'>" + data.transactionId + "</td></tr>"
    + "      </table>"
    + "    </div>"
    + (membersListHtml ? "<div style='margin-bottom:20px;'><h4 style='color:#FFEA9F; font-size:14px; margin-bottom:8px;'>Registered Team Members:</h4><ul style='color:#D9ECF5; font-size:13px; padding-left:20px; line-height:1.6;'>" + membersListHtml + "</ul></div>" : "")
    + "    <div style='background-color:#123D2B; border-left:4px solid #25A18E; padding:12px 16px; border-radius:6px; margin:20px 0; font-size:13px; color:#D9ECF5; line-height:1.5;'>"
    + "      <strong>Next Steps & Verification:</strong><br/>"
    + "      Our organizing team will verify your payment UTR (" + data.transactionId + "). Your digital QR entry pass and Discord mentor lounge invitation will be dispatched to this email 48 hours prior to kickoff."
    + "    </div>"
    + "    <p style='font-size:13px; line-height:1.5; color:#D9ECF5; margin-top:24px;'>"
    + "      If you have any questions or need to make adjustments to your roster, reply directly to this email or reach out to <a href='mailto:" + ORGANIZER_EMAIL + "' style='color:#E9C578;'>" + ORGANIZER_EMAIL + "</a>."
    + "    </p>"
    + "    <div style='border-top:1px solid rgba(233,197,120,0.2); padding-top:18px; margin-top:24px; text-align:center; font-size:12px; color:#88D4B0;'>"
    + "      Happy Hacking & Merry Christmas! 🌟<br/>"
    + "      <strong>The Festive Christmas Hackathon 2026 Organizing Committee</strong>"
    + "    </div>"
    + "  </div>"
    + "</div>";

  MailApp.sendEmail({
    to: data.leaderEmail,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * Sends a Complete Admin Notification Email to the Organizer
 */
function sendAdminNotificationEmail(data) {
  var regId = data.registrationId || "N/A";
  var subject = "New Registration Received: " + (data.teamName || "New Team") + " [" + regId + "]";

  var sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();

  var htmlBody = ""
    + "<div style='font-family:Arial, sans-serif; background-color:#F5F7FA; padding:24px; color:#1A202C;'>"
    + "  <div style='max-width:650px; margin:0 auto; background-color:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; padding:24px; box-shadow:0 4px 12px rgba(0,0,0,0.05);'>"
    + "    <h2 style='color:#09271E; border-bottom:2px solid #E9C578; padding-bottom:10px; margin-top:0;'>🎉 New Hackathon Team Registration</h2>"
    + "    <p style='font-size:14px; color:#4A5568;'>A new registration submission has arrived and has been appended to your Google Sheet.</p>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>1. Team Overview</h3>"
    + "    <ul style='font-size:13px; line-height:1.7; color:#2D3748;'>"
    + "      <li><strong>Registration ID:</strong> <span style='font-family:monospace; color:#C62835; font-weight:bold;'>" + regId + "</span></li>"
    + "      <li><strong>Team Name:</strong> " + data.teamName + "</li>"
    + "      <li><strong>Team Size:</strong> " + (data.teamSize ? data.teamSize.toUpperCase() : "SOLO") + " (" + (data.totalMembers || 1) + " Members)</li>"
    + "      <li><strong>Track Domain:</strong> " + data.technicalDomain + "</li>"
    + "      <li><strong>Location:</strong> " + data.city + ", " + data.state + "</li>"
    + "    </ul>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>2. Team Leader Details</h3>"
    + "    <ul style='font-size:13px; line-height:1.7; color:#2D3748;'>"
    + "      <li><strong>Name:</strong> " + data.leaderName + "</li>"
    + "      <li><strong>Email:</strong> <a href='mailto:" + data.leaderEmail + "'>" + data.leaderEmail + "</a></li>"
    + "      <li><strong>Phone / WhatsApp:</strong> <a href='tel:" + data.leaderPhone + "'>" + data.leaderPhone + "</a></li>"
    + "      <li><strong>College / University:</strong> " + data.leaderCollege + "</li>"
    + "      <li><strong>Course & Branch:</strong> " + data.leaderDegree + " - " + data.leaderBranch + "</li>"
    + "      <li><strong>Academic Year:</strong> " + data.leaderYear + "</li>"
    + "      <li><strong>Roll Number:</strong> " + (data.leaderRollNumber || "N/A") + "</li>"
    + "    </ul>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>3. Team Members</h3>"
    + "    <ul style='font-size:13px; line-height:1.7; color:#2D3748;'>"
    + "      <li><strong>Member 2:</strong> " + (data.member2Name || "N/A") + " | " + (data.member2Email || "N/A") + " | " + (data.member2Phone || "N/A") + "</li>"
    + "      <li><strong>Member 3:</strong> " + (data.member3Name || "N/A") + " | " + (data.member3Email || "N/A") + " | " + (data.member3Phone || "N/A") + "</li>"
    + "      <li><strong>Member 4:</strong> " + (data.member4Name || "N/A") + " | " + (data.member4Email || "N/A") + " | " + (data.member4Phone || "N/A") + "</li>"
    + "    </ul>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>4. Technical Profile & Experience</h3>"
    + "    <ul style='font-size:13px; line-height:1.7; color:#2D3748;'>"
    + "      <li><strong>Languages:</strong> " + data.programmingLanguages + "</li>"
    + "      <li><strong>Frameworks:</strong> " + data.frameworks + "</li>"
    + "      <li><strong>GitHub:</strong> <a href='" + data.githubUrl + "' target='_blank'>" + data.githubUrl + "</a></li>"
    + "      <li><strong>LinkedIn:</strong> <a href='" + data.linkedinUrl + "' target='_blank'>" + data.linkedinUrl + "</a></li>"
    + "      <li><strong>Past Experience:</strong> " + data.pastExperience + "</li>"
    + "      <li><strong>Project Brief:</strong> " + data.projectBrief + "</li>"
    + "    </ul>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>5. Payment Verification</h3>"
    + "    <div style='background-color:#FFFBEB; border:1px solid #F6E05E; padding:12px; border-radius:8px; font-size:13px; color:#744210;'>"
    + "      <p style='margin:0 0 6px 0;'><strong>Registration Fee:</strong> ₹" + (data.registrationFeeINR || 400) + "</p>"
    + "      <p style='margin:0 0 6px 0;'><strong>Transaction ID / UTR Number:</strong> <span style='font-family:monospace; font-weight:bold; font-size:14px; color:#B7791F;'>" + data.transactionId + "</span></p>"
    + "      <p style='margin:0;'><strong>Status:</strong> Needs manual verification on UPI bank statement.</p>"
    + "    </div>"
    + "    <div style='margin-top:24px; text-align:center;'>"
    + "      <a href='" + sheetUrl + "' target='_blank' style='display:inline-block; background-color:#09271E; color:#E9C578; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:bold; font-size:14px;'>Open Active Google Sheet ↗</a>"
    + "    </div>"
    + "  </div>"
    + "</div>";

  MailApp.sendEmail({
    to: ORGANIZER_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}
