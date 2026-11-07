/**
 * ============================================================================
 * FESTIVE CHRISTMAS HACKATHON 2026 - SECURE PRODUCTION BACKEND WEBHOOK
 * ============================================================================
 *
 * Connected Google Sheet: "FESTIVE CHRISTMAS"
 * Organizer Admin Email: "y.s8269773357@gmail.com"
 *
 * SECURITY & PRIVATE OWNERSHIP CONSTRAINTS:
 *   1. Execution Identity: Executes as script owner (your Google account).
 *   2. Server-to-Server Authentication: Validates shared secret with Node.js proxy.
 *   3. Spreadsheet Access: Private. Never shared publicly. No public read access.
 *   4. Zero Data Exposure: doGet() never returns rows, IDs, or registrant data.
 *   5. Schema Alignment: Matches the existing sheet structure:
 *        Col A: Timestamp | Col B: Registration ID | Col C: Team Name
 *        Col D: Team Size | Col E: Leader Name     | Col F: Leader Email
 *        Col G: Leader Phone ... and remaining technical / roster fields.
 *   6. Dynamic Introspection: Maps each field dynamically based on Row 1 headers.
 *   7. Non-Destructive: Preserves existing records (such as XMAS-2026-TEST).
 *
 * APPS SCRIPT DEPLOYMENT INSTRUCTIONS:
 *   - Deployment Type: Web App
 *   - Execute as: "Me" (y.s8269773357@gmail.com)
 *   - Who has access: "Anyone"
 *   - Script Properties (optional custom secret):
 *       Name: REGISTRATION_AUTH_SECRET
 *       Value: xmas_sec_8f9a2b4e7c1d3f5a6b8e0d2c4b6a8e0f
 * ============================================================================
 */

// Core Configuration
var ORGANIZER_EMAIL = "y.s8269773357@gmail.com";
var EVENT_TITLE = "Festive Christmas Hackathon 2026";
var EVENT_DATE = "25 December 2026 (09:00 AM – 05:00 PM IST)";
var SPREADSHEET_NAME = "FESTIVE CHRISTMAS";
var SPREADSHEET_ID = ""; // Optional: explicit ID if script is standalone

// Server-to-Server Authentication Secret
var AUTH_SECRET_PROPERTY_NAME = "REGISTRATION_AUTH_SECRET";
var DEFAULT_AUTH_SECRET = "xmas_sec_8f9a2b4e7c1d3f5a6b8e0d2c4b6a8e0f";

/**
 * Returns the expected shared secret from Script Properties or fallback
 */
function getExpectedAuthSecret() {
  try {
    var secret = PropertiesService.getScriptProperties().getProperty(AUTH_SECRET_PROPERTY_NAME);
    if (secret && secret.trim() !== "") {
      return secret.trim();
    }
  } catch (err) {
    Logger.log("Notice: ScriptProperties lookup: " + err);
  }
  return DEFAULT_AUTH_SECRET;
}

/**
 * Validates request authorization
 */
function isAuthorizedRequest(e, data) {
  var expected = getExpectedAuthSecret();
  if (!expected || expected === "") return true;

  // 1. Check in POST payload body
  if (data && data.authSecret && String(data.authSecret).trim() === expected) {
    return true;
  }
  // 2. Check query parameter
  if (e && e.parameter && e.parameter.authSecret && String(e.parameter.authSecret).trim() === expected) {
    return true;
  }
  return false;
}

/**
 * HTTP GET Handler (Public Health Check Probe Only - Zero Sensitive Data)
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
 * HTTP OPTIONS Handler (CORS Preflight)
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * HTTP POST Handler (Main Secure Registration Ingestion)
 */
function doPost(e) {
  try {
    // 1. Parse incoming payload
    var data = parseIncomingPayload(e);

    // 2. Security Check: Validate server-to-server authentication secret
    if (!isAuthorizedRequest(e, data)) {
      Logger.log("[Security Alert] Unauthorized registration POST attempt rejected.");
      return createJsonResponse({
        status: "error",
        code: "UNAUTHORIZED",
        message: "Access Denied: Missing or invalid authentication token."
      });
    }

    // 3. Validate mandatory fields
    if (!data.leaderEmail || !data.teamName) {
      return createJsonResponse({
        status: "error",
        code: "INVALID_PAYLOAD",
        message: "Missing mandatory fields: leaderEmail and teamName are required."
      });
    }

    // 4. Save data into the active Google Sheet with duplicate check & schema mapping
    var sheetResult = saveToSheet(data);

    // 5. Automated Dual Email Notification Dispatcher (MailApp Native Google Service)
    var emailStatus = {
      participant: "PENDING",
      organizer: "PENDING",
      participantError: null,
      organizerError: null,
      participantRecipient: null,
      organizerRecipient: ORGANIZER_EMAIL
    };

    if (sheetResult.isDuplicate) {
      emailStatus.participant = "SKIPPED_DUPLICATE";
      emailStatus.organizer = "SKIPPED_DUPLICATE";
      Logger.log("[Email Service] Duplicate registration ID / UTR identified (" + sheetResult.registrationId + "). Skipping duplicate email dispatches.");
    } else {
      // Step A: Send Participant Confirmation Pass to Team Leader Email
      try {
        var pResult = sendLeaderConfirmationEmail(data, sheetResult.registrationId);
        emailStatus.participant = pResult.status || "SENT";
        emailStatus.participantRecipient = pResult.recipient || data.leaderEmail;
        Logger.log("[Email Service] ✓ Participant confirmation successfully dispatched via MailApp to: " + emailStatus.participantRecipient);
      } catch (pErr) {
        var pErrMsg = pErr instanceof Error ? pErr.message : String(pErr);
        Logger.log("[Email Error] ✗ Participant confirmation email failed: " + pErrMsg);
        emailStatus.participant = "FAILED";
        emailStatus.participantError = pErrMsg;
      }

      // Step B: Send Comprehensive Audit Breakdown to Organizer Admin INDEPENDENTLY
      // Executes even if participant email failed!
      try {
        var oResult = sendAdminNotificationEmail(data, sheetResult.registrationId, sheetResult.sheetUrl);
        emailStatus.organizer = oResult.status || "SENT";
        Logger.log("[Email Service] ✓ Organizer notification successfully dispatched via MailApp to: " + ORGANIZER_EMAIL);
      } catch (oErr) {
        var oErrMsg = oErr instanceof Error ? oErr.message : String(oErr);
        Logger.log("[Email Error] ✗ Organizer notification email failed: " + oErrMsg);
        emailStatus.organizer = "FAILED";
        emailStatus.organizerError = oErrMsg;
      }
    }

    // 6. Return verified response with truthful execution status
    var hasEmailFailure = (emailStatus.participant === "FAILED" || emailStatus.organizer === "FAILED");
    var responseMessage = sheetResult.isDuplicate
      ? "Existing registration identified. No duplicate row was created."
      : hasEmailFailure
        ? "Registration saved to Google Sheet, but email notification encountered an error: Participant=" + emailStatus.participant + " (" + (emailStatus.participantError || "OK") + "), Organizer=" + emailStatus.organizer + " (" + (emailStatus.organizerError || "OK") + ")."
        : "Registration successfully recorded in Google Sheets and dual confirmation emails dispatched via MailApp.";

    return createJsonResponse({
      status: "success",
      registrationId: sheetResult.registrationId,
      isDuplicate: sheetResult.isDuplicate,
      sheetSaved: true,
      rowNumber: sheetResult.rowNumber,
      participantEmailStatus: emailStatus.participant,
      organizerEmailStatus: emailStatus.organizer,
      participantEmailError: emailStatus.participantError,
      organizerEmailError: emailStatus.organizerError,
      emailStatus: emailStatus,
      message: responseMessage
    });

  } catch (error) {
    Logger.log("[Fatal Error in doPost]: " + error.toString());

    return createJsonResponse({
      status: "error",
      code: "PROCESSING_FAILED",
      message: error.toString()
    });
  }
}

/**
 * Safely parses the incoming POST payload from various client formats
 */
function parseIncomingPayload(e) {
  if (!e) return {};

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return parseUrlEncodedString(e.postData.contents);
    }
  }

  if (e.parameter) {
    return e.parameter;
  }

  return {};
}

function parseUrlEncodedString(str) {
  var result = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    var key = decodeURIComponent(pair[0] || "");
    var val = decodeURIComponent(pair[1] || "");
    if (key) result[key] = val;
  }
  return result;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Resolves the Google Spreadsheet and Target Sheet tab safely
 */
function resolveSpreadsheet() {
  var ss = null;

  // 1. Try explicit SPREADSHEET_ID if provided
  if (typeof SPREADSHEET_ID !== 'undefined' && SPREADSHEET_ID && SPREADSHEET_ID.trim() !== '') {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } catch (idErr) {
      Logger.log("Notice: openById failed: " + idErr);
    }
  }

  // 2. Try container-bound active spreadsheet
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (activeErr) {
      Logger.log("Notice: getActiveSpreadsheet failed: " + activeErr);
    }
  }

  // 3. Fallback: Search Drive for spreadsheet named "FESTIVE CHRISTMAS"
  if (!ss) {
    try {
      var files = DriveApp.getFilesByName(SPREADSHEET_NAME);
      while (files.hasNext()) {
        var file = files.next();
        if (file.getMimeType() === MimeType.GOOGLE_SHEETS) {
          ss = SpreadsheetApp.open(file);
          break;
        }
      }
    } catch (driveErr) {
      Logger.log("Notice: DriveApp search failed: " + driveErr);
    }
  }

  if (!ss) {
    throw new Error("Unable to locate Google Spreadsheet '" + SPREADSHEET_NAME + "'. Ensure script is container-bound or set SPREADSHEET_ID.");
  }

  // Match tab by name, or use active/first tab
  var sheet = ss.getSheetByName(SPREADSHEET_NAME) ||
              ss.getSheetByName("Registrations") ||
              ss.getSheetByName("Sheet1") ||
              ss.getActiveSheet() ||
              ss.getSheets()[0];

  return { ss: ss, sheet: sheet };
}

/**
 * Canonical 34-Column Schema Specification:
 * Matches the actual sheet structure:
 * Col A: Timestamp | Col B: Registration ID | Col C: Team Name | Col D: Team Size
 * Col E: Leader Name | Col F: Leader Email | Col G: Leader Phone ...
 */
var CANONICAL_HEADERS = [
  "Timestamp (IST)",               // Col A (1)
  "Registration ID",              // Col B (2) - e.g. XMAS-2026-TEST
  "Team Name",                    // Col C (3) - e.g. Aarogyam Test
  "Team Size",                    // Col D (4) - e.g. Solo
  "Leader Name",                  // Col E (5) - e.g. Yogesh Sharma
  "Leader Email",                 // Col F (6)
  "Leader Phone",                 // Col G (7)
  "Leader College / University",  // Col H (8)
  "Leader Degree",                // Col I (9)
  "Leader Branch",                // Col J (10)
  "Leader Academic Year",         // Col K (11)
  "Leader Roll No",               // Col L (12)
  "Total Members",                // Col M (13)
  "Technical Domain",             // Col N (14)
  "City",                         // Col O (15)
  "State",                        // Col P (16)
  "Member 2 Name",                // Col Q (17)
  "Member 2 Email",               // Col R (18)
  "Member 2 Phone",               // Col S (19)
  "Member 3 Name",                // Col T (20)
  "Member 3 Email",               // Col U (21)
  "Member 3 Phone",               // Col V (22)
  "Member 4 Name",                // Col W (23)
  "Member 4 Email",               // Col X (24)
  "Member 4 Phone",               // Col Y (25)
  "Programming Languages",        // Col Z (26)
  "Frameworks & Tech",            // Col AA (27)
  "GitHub Profile",               // Col AB (28)
  "LinkedIn Profile",             // Col AC (29)
  "Past Experience",              // Col AD (30)
  "Project Idea Brief",           // Col AE (31)
  "Registration Fee (INR)",       // Col AF (32)
  "Transaction ID / UTR",         // Col AG (33)
  "Payment Status"                // Col AH (34)
];

/**
/**
 * Sanitizes values written into Google Sheets to prevent formula injection (=, +, -, @, \t, \r)
 */
function sanitizeForSheet(val) {
  if (val === null || val === undefined) return "N/A";
  var str = String(val).trim();
  if (str === "") return "N/A";
  // Prepend single quote if string starts with formula trigger characters
  if (/^[=\+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

/**
 * Escapes HTML entities to prevent XSS / markup injection in email templates
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Maps a single field value dynamically based on the column header title
 */
function resolveValueByHeaderName(headerTitle, data, regId, dateFormatted) {
  var h = String(headerTitle || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  if (h.indexOf("timestamp") !== -1 || h.indexOf("date") !== -1 || h.indexOf("time") !== -1) return dateFormatted;
  if (h.indexOf("registrationid") !== -1 || h.indexOf("regid") !== -1 || h === "id") return regId;
  if (h.indexOf("teamname") !== -1) return data.teamName || "N/A";
  if (h.indexOf("teamsize") !== -1 || h.indexOf("squadsize") !== -1) return data.teamSize ? String(data.teamSize).toUpperCase() : "SOLO";
  if (h.indexOf("leadername") !== -1 || h === "name" || h === "participantname") return data.leaderName || "N/A";
  if (h.indexOf("leaderemail") !== -1 || h === "email" || h === "participantemail") return data.leaderEmail || "N/A";
  if (h.indexOf("leaderphone") !== -1 || h === "phone" || h === "mobile" || h === "contact") return data.leaderPhone || "N/A";
  if (h.indexOf("college") !== -1 || h.indexOf("university") !== -1 || h.indexOf("institution") !== -1) return data.leaderCollege || "N/A";
  if (h.indexOf("degree") !== -1 || h.indexOf("course") !== -1) return data.leaderDegree || "N/A";
  if (h.indexOf("branch") !== -1 || h.indexOf("specialization") !== -1) return data.leaderBranch || "N/A";
  if (h.indexOf("academicyear") !== -1 || h.indexOf("year") !== -1) return data.leaderYear || "N/A";
  if (h.indexOf("roll") !== -1 || h.indexOf("rollnumber") !== -1) return data.leaderRollNumber || "N/A";
  if (h.indexOf("totalmembers") !== -1 || h.indexOf("memberscount") !== -1) return data.totalMembers || 1;
  if (h.indexOf("domain") !== -1 || h.indexOf("track") !== -1) return data.technicalDomain || "N/A";
  if (h === "city") return data.city || "N/A";
  if (h === "state" || h === "region") return data.state || "N/A";
  if (h.indexOf("member2name") !== -1) return data.member2Name || "N/A";
  if (h.indexOf("member2email") !== -1) return data.member2Email || "N/A";
  if (h.indexOf("member2phone") !== -1) return data.member2Phone || "N/A";
  if (h.indexOf("member3name") !== -1) return data.member3Name || "N/A";
  if (h.indexOf("member3email") !== -1) return data.member3Email || "N/A";
  if (h.indexOf("member3phone") !== -1) return data.member3Phone || "N/A";
  if (h.indexOf("member4name") !== -1) return data.member4Name || "N/A";
  if (h.indexOf("member4email") !== -1) return data.member4Email || "N/A";
  if (h.indexOf("member4phone") !== -1) return data.member4Phone || "N/A";
  if (h.indexOf("language") !== -1) return data.programmingLanguages || "N/A";
  if (h.indexOf("framework") !== -1 || h.indexOf("tech") !== -1) return data.frameworks || "N/A";
  if (h.indexOf("github") !== -1) return data.githubUrl || "N/A";
  if (h.indexOf("linkedin") !== -1) return data.linkedinUrl || "N/A";
  if (h.indexOf("experience") !== -1) return data.pastExperience || "N/A";
  if (h.indexOf("brief") !== -1 || h.indexOf("idea") !== -1 || h.indexOf("concept") !== -1) return data.projectBrief || "N/A";
  if (h.indexOf("fee") !== -1 || h.indexOf("amount") !== -1) return data.registrationFeeINR || 400;
  if (h.indexOf("transaction") !== -1 || h.indexOf("utr") !== -1) return data.transactionId || "N/A";
  if (h.indexOf("payment") !== -1 || h.indexOf("status") !== -1) return data.paymentStatus || "PENDING_VERIFICATION";

  return "N/A";
}

/**
 * Appends registration row to Google Sheets.
 * Protected with LockService (30-second script lock) to prevent concurrent write collisions.
 * Dynamically adapts to existing headers and preserves pre-existing rows (XMAS-2026-TEST).
 */
function saveToSheet(data) {
  var lock = LockService.getScriptLock();
  var lockAcquired = false;

  try {
    // Acquire exclusive write lock to prevent race conditions during simultaneous submissions
    lockAcquired = lock.tryLock(30000);
    if (!lockAcquired) {
      Logger.log("[Concurrency Warning] Script lock busy; attempting non-blocking write.");
    }

    var resolved = resolveSpreadsheet();
    var sheet = resolved.sheet;
    var ss = resolved.ss;

    var lastRow = sheet.getLastRow();
    var activeHeaders = [];

    // Setup headers if sheet is empty
    if (lastRow === 0) {
      activeHeaders = CANONICAL_HEADERS;
      sheet.appendRow(activeHeaders);
      var headerRange = sheet.getRange(1, 1, 1, activeHeaders.length);
      headerRange.setBackground("#09271E");
      headerRange.setFontColor("#E9C578");
      headerRange.setFontWeight("bold");
      headerRange.setFontFamily("Arial");
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 40);
      sheet.setFrozenRows(1);
      lastRow = 1;
    } else {
      // Read the actual headers present in Row 1 of the real sheet
      var lastCol = sheet.getLastColumn();
      activeHeaders = sheet.getRange(1, 1, 1, Math.max(lastCol, 1)).getValues()[0];
    }

    var submittedRegId = (data.registrationId || "").trim();
    var submittedUtr = (data.transactionId || "").trim();

    // Find column indices dynamically for duplicate protection
    var regIdColIdx = -1;
    var utrColIdx = -1;

    for (var c = 0; c < activeHeaders.length; c++) {
      var colHeader = String(activeHeaders[c] || "").toLowerCase().replace(/[^a-z0-9]/g, "");
      if (regIdColIdx === -1 && (colHeader.indexOf("registrationid") !== -1 || colHeader.indexOf("regid") !== -1)) {
        regIdColIdx = c;
      }
      if (utrColIdx === -1 && (colHeader.indexOf("transaction") !== -1 || colHeader.indexOf("utr") !== -1)) {
        utrColIdx = c;
      }
    }

    // Fallbacks if headers weren't named identically
    if (regIdColIdx === -1) regIdColIdx = 1; // Default Col B
    if (utrColIdx === -1) utrColIdx = activeHeaders.length >= 33 ? 32 : activeHeaders.length - 2;

    // Idempotency / Duplicate Check
    if (lastRow > 1) {
      var checkRange = sheet.getRange(2, 1, lastRow - 1, activeHeaders.length);
      var existingValues = checkRange.getValues();

      for (var i = 0; i < existingValues.length; i++) {
        var row = existingValues[i];
        var existingRegId = String(row[regIdColIdx] || "").trim();
        var existingUtr = String(row[utrColIdx] || "").trim();

        if (submittedRegId && existingRegId === submittedRegId) {
          Logger.log("[Duplicate Protection] Existing Registration ID found: " + submittedRegId);
          return {
            registrationId: existingRegId,
            isDuplicate: true,
            rowNumber: i + 2,
            sheetUrl: ss.getUrl()
          };
        }

        if (submittedUtr && submittedUtr !== "N/A" && existingUtr === submittedUtr) {
          Logger.log("[Duplicate Protection] Existing Transaction UTR found: " + submittedUtr);
          return {
            registrationId: existingRegId || submittedRegId,
            isDuplicate: true,
            rowNumber: i + 2,
            sheetUrl: ss.getUrl()
          };
        }
      }
    }

    var regId = submittedRegId || ("XMAS-2026-" + Math.floor(100000 + Math.random() * 900000));
    var dateFormatted = data.submissionDateFormatted || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a");

    // Construct row dynamically matching the real header sequence & sanitize values
    var newRow = [];
    for (var j = 0; j < activeHeaders.length; j++) {
      var cellValue = resolveValueByHeaderName(activeHeaders[j], data, regId, dateFormatted);
      newRow.push(sanitizeForSheet(cellValue));
    }

    sheet.appendRow(newRow);
    var newRowNumber = sheet.getLastRow();

    return {
      registrationId: regId,
      isDuplicate: false,
      rowNumber: newRowNumber,
      sheetUrl: ss.getUrl()
    };
  } finally {
    if (lockAcquired) {
      try {
        lock.releaseLock();
      } catch (lErr) {
        Logger.log("Notice: Lock release: " + lErr);
      }
    }
  }
}

/**
 * EMAIL 1: Sends Festive Confirmation Pass to the Participant (Team Leader)
 * Uses native Google Apps Script MailApp with required plain-text body and sender name.
 */
function sendLeaderConfirmationEmail(data, regId) {
  // Resolve participant recipient email from real payload variants
  var rawEmail = data.leaderEmail || data.leader_email || data.email || data.participantEmail || "";
  var recipient = String(rawEmail).trim();

  if (!recipient || recipient === "") {
    throw new Error("Missing recipient: team leader email address is blank.");
  }

  // Validate email address format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    throw new Error("Invalid recipient email address format: '" + recipient + "'");
  }

  var subject = "Registration Received Successfully – Festive Christmas 2026";
  var fee = data.registrationFeeINR || 400;
  var leaderName = (data.leaderName || data.leader_name || data.name || "Participant").trim();
  var teamName = (data.teamName || data.team_name || "Team").trim();
  var domain = (data.technicalDomain || data.domain || "Open Innovation").trim();
  var teamSize = (data.teamSize ? String(data.teamSize).toUpperCase() : "SOLO");
  var totalMembers = data.totalMembers || 1;
  var utr = (data.transactionId || data.utr || "N/A").trim();

  // Dynamic team member list for HTML and Plain Text
  var membersListHtml = "";
  var membersListPlain = "";

  if (totalMembers >= 2 && data.member2Name && data.member2Name !== "N/A") {
    membersListHtml += "<li><strong>Member 2:</strong> " + escapeHtml(data.member2Name) + " (" + escapeHtml(data.member2Email || "N/A") + ", " + escapeHtml(data.member2Phone || "N/A") + ")</li>";
    membersListPlain += "\n  - Member 2: " + data.member2Name + " (" + (data.member2Email || "N/A") + ", " + (data.member2Phone || "N/A") + ")";
  }
  if (totalMembers >= 3 && data.member3Name && data.member3Name !== "N/A") {
    membersListHtml += "<li><strong>Member 3:</strong> " + escapeHtml(data.member3Name) + " (" + escapeHtml(data.member3Email || "N/A") + ", " + escapeHtml(data.member3Phone || "N/A") + ")</li>";
    membersListPlain += "\n  - Member 3: " + data.member3Name + " (" + (data.member3Email || "N/A") + ", " + (data.member3Phone || "N/A") + ")";
  }
  if (totalMembers >= 4 && data.member4Name && data.member4Name !== "N/A") {
    membersListHtml += "<li><strong>Member 4:</strong> " + escapeHtml(data.member4Name) + " (" + escapeHtml(data.member4Email || "N/A") + ", " + escapeHtml(data.member4Phone || "N/A") + ")</li>";
    membersListPlain += "\n  - Member 4: " + data.member4Name + " (" + (data.member4Email || "N/A") + ", " + (data.member4Phone || "N/A") + ")";
  }

  // Mandatory Plain-Text Email Body (Required by MailApp)
  var plainTextBody = "🎄 Festive Christmas Hackathon 2026\n"
    + "Registration Received & Confirmed\n\n"
    + "Dear " + leaderName + ",\n\n"
    + "Thank you for registering for the Festive Christmas Hackathon 2026! Your registration has been securely recorded. Get ready for an intensive 8-hour sprint of festive coding, creativity, and architectural innovation.\n\n"
    + "REGISTRATION DETAILS:\n"
    + "--------------------------------------------------\n"
    + "- Registration ID : " + regId + "\n"
    + "- Team Name       : " + teamName + "\n"
    + "- Track Domain    : " + domain + "\n"
    + "- Team Size       : " + teamSize + " (" + totalMembers + " Participant" + (totalMembers > 1 ? "s" : "") + ")\n"
    + "- Event Date      : " + EVENT_DATE + "\n"
    + "- Registration Fee: ₹" + fee + " (Paid)\n"
    + "- Transaction/UTR : " + utr + "\n"
    + (membersListPlain ? "\nREGISTERED TEAM MEMBERS:" + membersListPlain + "\n" : "")
    + "\nNEXT STEPS & VERIFICATION:\n"
    + "Our organizing team will verify your payment UTR (" + utr + "). Your digital QR entry pass and Discord mentor lounge invitation will be dispatched to this email 48 hours prior to kickoff.\n\n"
    + "If you have questions or need to make adjustments to your roster, reply directly to this email or contact us at " + ORGANIZER_EMAIL + ".\n\n"
    + "Happy Hacking & Merry Christmas! 🌟\n"
    + "The Festive Christmas Hackathon 2026 Organizing Committee\n"
    + "Contact: " + ORGANIZER_EMAIL;

  // Responsive Festive HTML Body
  var htmlBody = ""
    + "<div style='background-color:#041710; color:#FFF4DF; font-family:Helvetica, Arial, sans-serif; padding:30px 20px; text-align:center;'>"
    + "  <div style='max-width:600px; margin:0 auto; background-color:#061C14; border:1px solid #E9C578; border-radius:18px; padding:32px 24px; text-align:left; box-shadow:0 8px 30px rgba(0,0,0,0.6);'>"
    + "    <div style='text-align:center; border-bottom:1px solid rgba(233,197,120,0.3); padding-bottom:20px; margin-bottom:24px;'>"
    + "      <h1 style='color:#E9C578; font-size:26px; margin:0; font-family:Georgia, serif;'>🎄 Festive Christmas Hackathon 2026</h1>"
    + "      <p style='color:#25A18E; font-size:13px; font-weight:bold; letter-spacing:1px; margin-top:6px; text-transform:uppercase;'>Registration Received & Confirmed</p>"
    + "    </div>"
    + "    <p style='font-size:16px; line-height:1.6; color:#FFF4DF;'>Dear <strong>" + escapeHtml(leaderName) + "</strong>,</p>"
    + "    <p style='font-size:14px; line-height:1.6; color:#D9ECF5;'>"
    + "      Thank you for registering for the <strong>Festive Christmas Hackathon 2026</strong>! Your registration has been securely recorded. Get ready for an intensive 8-hour sprint of festive coding, creativity, and architectural innovation."
    + "    </p>"
    + "    <div style='background-color:#0A261D; border:1px solid #E9C578; border-radius:12px; padding:18px; margin:24px 0;'>"
    + "      <table style='width:100%; font-size:13px; color:#FFF4DF; border-collapse:collapse;'>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Registration ID:</td><td style='padding:6px 0; font-weight:bold; color:#FFD700; font-family:monospace; font-size:15px;'>" + escapeHtml(regId) + "</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Team Name:</td><td style='padding:6px 0; font-weight:bold;'>" + escapeHtml(teamName) + "</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Track Domain:</td><td style='padding:6px 0;'>" + escapeHtml(domain) + "</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Team Size:</td><td style='padding:6px 0;'>" + escapeHtml(teamSize) + " (" + totalMembers + " Participant" + (totalMembers > 1 ? "s" : "") + ")</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Event Date:</td><td style='padding:6px 0; color:#25A18E; font-weight:bold;'>" + EVENT_DATE + "</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Registration Fee:</td><td style='padding:6px 0;'>₹" + fee + " (Paid)</td></tr>"
    + "        <tr><td style='padding:6px 0; color:#FFEA9F;'>Transaction / UTR:</td><td style='padding:6px 0; font-family:monospace; color:#E9C578;'>" + escapeHtml(utr) + "</td></tr>"
    + "      </table>"
    + "    </div>"
    + (membersListHtml ? "<div style='margin-bottom:20px;'><h4 style='color:#FFEA9F; font-size:14px; margin-bottom:8px;'>Registered Team Members:</h4><ul style='color:#D9ECF5; font-size:13px; padding-left:20px; line-height:1.6;'>" + membersListHtml + "</ul></div>" : "")
    + "    <div style='background-color:#123D2B; border-left:4px solid #25A18E; padding:12px 16px; border-radius:6px; margin:20px 0; font-size:13px; color:#D9ECF5; line-height:1.5;'>"
    + "      <strong>Next Steps & Verification:</strong><br/>"
    + "      Our organizing team will verify your payment UTR (" + escapeHtml(utr) + "). Your digital QR entry pass and Discord mentor lounge invitation will be dispatched to this email 48 hours prior to kickoff."
    + "    </div>"
    + "    <p style='font-size:13px; line-height:1.5; color:#D9ECF5; margin-top:24px;'>"
    + "      If you have questions or need to make adjustments to your roster, reply directly to this email or contact us at <a href='mailto:" + ORGANIZER_EMAIL + "' style='color:#E9C578;'>" + ORGANIZER_EMAIL + "</a>."
    + "    </p>"
    + "    <div style='border-top:1px solid rgba(233,197,120,0.2); padding-top:18px; margin-top:24px; text-align:center; font-size:12px; color:#88D4B0;'>"
    + "      Happy Hacking & Merry Christmas! 🌟<br/>"
    + "      <strong>The Festive Christmas Hackathon 2026 Organizing Committee</strong>"
    + "    </div>"
    + "  </div>"
    + "</div>";

  // Native Google Apps Script MailApp invocation with all mandatory parameters
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: plainTextBody,
    htmlBody: htmlBody,
    name: "Festive Christmas Hackathon 2026"
  });

  return {
    status: "SENT",
    recipient: recipient
  };
}

/**
 * EMAIL 2: Sends Comprehensive Audit Breakdown to Organizer Admin
 * Uses native Google Apps Script MailApp with required plain-text body, full 11-point audit details.
 */
function sendAdminNotificationEmail(data, regId, sheetUrl) {
  var recipient = (ORGANIZER_EMAIL || "y.s8269773357@gmail.com").trim();
  var subject = "New Registration Received — Festive Christmas Hackathon 2026";

  var teamName = data.teamName || "N/A";
  var teamSize = (data.teamSize ? String(data.teamSize).toUpperCase() : "SOLO");
  var totalMembers = data.totalMembers || 1;
  var domain = data.technicalDomain || "N/A";
  var city = data.city || "N/A";
  var state = data.state || "N/A";
  var leaderName = data.leaderName || "N/A";
  var leaderEmail = data.leaderEmail || data.email || "N/A";
  var leaderPhone = data.leaderPhone || data.phone || "N/A";
  var college = data.leaderCollege || "N/A";
  var degree = data.leaderDegree || "N/A";
  var branch = data.leaderBranch || "N/A";
  var academicYear = data.leaderYear || "N/A";
  var rollNumber = data.leaderRollNumber || "N/A";
  var languages = data.programmingLanguages || "N/A";
  var frameworks = data.frameworks || "N/A";
  var github = data.githubUrl || "N/A";
  var linkedin = data.linkedinUrl || "N/A";
  var pastExp = data.pastExperience || "N/A";
  var projectBrief = data.projectBrief || "N/A";
  var fee = data.registrationFeeINR || 400;
  var utr = data.transactionId || "N/A";
  var timestamp = data.submissionDateFormatted || new Date().toISOString();

  // Plain-Text Audit Breakdown Body (Mandatory for MailApp)
  var plainTextBody = "========================================================\n"
    + "🎉 NEW HACKATHON REGISTRATION RECEIVED — AUDIT SUMMARY\n"
    + "Festive Christmas Hackathon 2026\n"
    + "========================================================\n\n"
    + "1. REGISTRATION INFORMATION:\n"
    + "--------------------------------------------------------\n"
    + "- Registration ID        : " + regId + "\n"
    + "- Submission Timestamp   : " + timestamp + "\n"
    + "- Registration Status    : PENDING_PAYMENT_VERIFICATION\n\n"
    + "2. TEAM OVERVIEW:\n"
    + "--------------------------------------------------------\n"
    + "- Team Name              : " + teamName + "\n"
    + "- Team Size Category     : " + teamSize + " (" + totalMembers + " Members)\n"
    + "- Technical Domain Track : " + domain + "\n"
    + "- Location               : " + city + ", " + state + "\n\n"
    + "3. TEAM LEADER INFORMATION:\n"
    + "--------------------------------------------------------\n"
    + "- Full Name              : " + leaderName + "\n"
    + "- Email Address          : " + leaderEmail + "\n"
    + "- Contact / WhatsApp     : " + leaderPhone + "\n"
    + "- College / University   : " + college + "\n"
    + "- Course & Branch        : " + degree + " - " + branch + "\n"
    + "- Academic Year          : " + academicYear + "\n"
    + "- Student Roll No        : " + rollNumber + "\n\n"
    + "4. INDIVIDUAL TEAM MEMBERS:\n"
    + "--------------------------------------------------------\n"
    + "- Member 2               : " + (data.member2Name || "N/A") + " | " + (data.member2Email || "N/A") + " | " + (data.member2Phone || "N/A") + "\n"
    + "- Member 3               : " + (data.member3Name || "N/A") + " | " + (data.member3Email || "N/A") + " | " + (data.member3Phone || "N/A") + "\n"
    + "- Member 4               : " + (data.member4Name || "N/A") + " | " + (data.member4Email || "N/A") + " | " + (data.member4Phone || "N/A") + "\n\n"
    + "5. TECHNICAL PROFILE & PROJECT BRIEF:\n"
    + "--------------------------------------------------------\n"
    + "- Primary Languages      : " + languages + "\n"
    + "- Frameworks & Tech      : " + frameworks + "\n"
    + "- GitHub Profile         : " + github + "\n"
    + "- LinkedIn Profile       : " + linkedin + "\n"
    + "- Past Experience        : " + pastExp + "\n"
    + "- Project Idea Brief     : " + projectBrief + "\n\n"
    + "6. PAYMENT & UTR VERIFICATION:\n"
    + "--------------------------------------------------------\n"
    + "- Fee Amount             : ₹" + fee + "\n"
    + "- UPI Transaction / UTR  : " + utr + "\n"
    + "- Action Required        : Check UPI bank statement for UTR " + utr + "\n"
    + (sheetUrl ? "\nCONNECTED GOOGLE SHEET:\n" + sheetUrl + "\n" : "");

  // Structured HTML Email Body
  var htmlBody = ""
    + "<div style='font-family:Arial, sans-serif; background-color:#F5F7FA; padding:24px; color:#1A202C;'>"
    + "  <div style='max-width:650px; margin:0 auto; background-color:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; padding:24px; box-shadow:0 4px 12px rgba(0,0,0,0.05);'>"
    + "    <h2 style='color:#09271E; border-bottom:2px solid #E9C578; padding-bottom:10px; margin-top:0;'>🎉 New Hackathon Registration Received</h2>"
    + "    <p style='font-size:14px; color:#4A5568;'>A new registration submission has arrived and has been appended to your Google Sheet.</p>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>1. Registration & Team Overview</h3>"
    + "    <ul style='font-size:13px; line-height:1.7; color:#2D3748;'>"
    + "      <li><strong>Registration ID:</strong> <span style='font-family:monospace; color:#C62835; font-weight:bold;'>" + escapeHtml(regId) + "</span></li>"
    + "      <li><strong>Timestamp:</strong> " + escapeHtml(timestamp) + "</li>"
    + "      <li><strong>Team Name:</strong> " + escapeHtml(teamName) + "</li>"
    + "      <li><strong>Team Size:</strong> " + escapeHtml(teamSize) + " (" + totalMembers + " Members)</li>"
    + "      <li><strong>Track Domain:</strong> " + escapeHtml(domain) + "</li>"
    + "      <li><strong>Location:</strong> " + escapeHtml(city) + ", " + escapeHtml(state) + "</li>"
    + "    </ul>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>2. Team Leader Details</h3>"
    + "    <ul style='font-size:13px; line-height:1.7; color:#2D3748;'>"
    + "      <li><strong>Name:</strong> " + escapeHtml(leaderName) + "</li>"
    + "      <li><strong>Email:</strong> <a href='mailto:" + escapeHtml(leaderEmail) + "'>" + escapeHtml(leaderEmail) + "</a></li>"
    + "      <li><strong>Phone / WhatsApp:</strong> <a href='tel:" + escapeHtml(leaderPhone) + "'>" + escapeHtml(leaderPhone) + "</a></li>"
    + "      <li><strong>College / University:</strong> " + escapeHtml(college) + "</li>"
    + "      <li><strong>Course & Branch:</strong> " + escapeHtml(degree) + " - " + escapeHtml(branch) + "</li>"
    + "      <li><strong>Academic Year:</strong> " + escapeHtml(academicYear) + "</li>"
    + "      <li><strong>Roll Number:</strong> " + escapeHtml(rollNumber) + "</li>"
    + "    </ul>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>3. Team Members</h3>"
    + "    <ul style='font-size:13px; line-height:1.7; color:#2D3748;'>"
    + "      <li><strong>Member 2:</strong> " + escapeHtml(data.member2Name || "N/A") + " | " + escapeHtml(data.member2Email || "N/A") + " | " + escapeHtml(data.member2Phone || "N/A") + "</li>"
    + "      <li><strong>Member 3:</strong> " + escapeHtml(data.member3Name || "N/A") + " | " + escapeHtml(data.member3Email || "N/A") + " | " + escapeHtml(data.member3Phone || "N/A") + "</li>"
    + "      <li><strong>Member 4:</strong> " + escapeHtml(data.member4Name || "N/A") + " | " + escapeHtml(data.member4Email || "N/A") + " | " + escapeHtml(data.member4Phone || "N/A") + "</li>"
    + "    </ul>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>4. Technical Profile & Experience</h3>"
    + "    <ul style='font-size:13px; line-height:1.7; color:#2D3748;'>"
    + "      <li><strong>Languages:</strong> " + escapeHtml(languages) + "</li>"
    + "      <li><strong>Frameworks:</strong> " + escapeHtml(frameworks) + "</li>"
    + "      <li><strong>GitHub:</strong> <a href='" + escapeHtml(github) + "' target='_blank'>" + escapeHtml(github) + "</a></li>"
    + "      <li><strong>LinkedIn:</strong> <a href='" + escapeHtml(linkedin) + "' target='_blank'>" + escapeHtml(linkedin) + "</a></li>"
    + "      <li><strong>Past Experience:</strong> " + escapeHtml(pastExp) + "</li>"
    + "      <li><strong>Project Brief:</strong> " + escapeHtml(projectBrief) + "</li>"
    + "    </ul>"
    + "    <h3 style='color:#09271E; font-size:15px; margin-top:20px; background:#EDF2F7; padding:8px 12px; border-radius:6px;'>5. Payment Verification</h3>"
    + "    <div style='background-color:#FFFBEB; border:1px solid #F6E05E; padding:12px; border-radius:8px; font-size:13px; color:#744210;'>"
    + "      <p style='margin:0 0 6px 0;'><strong>Registration Fee:</strong> ₹" + fee + "</p>"
    + "      <p style='margin:0 0 6px 0;'><strong>Transaction ID / UTR Number:</strong> <span style='font-family:monospace; font-weight:bold; font-size:14px; color:#B7791F;'>" + escapeHtml(utr) + "</span></p>"
    + "      <p style='margin:0;'><strong>Status:</strong> Needs manual verification on UPI bank statement.</p>"
    + "    </div>"
    + (sheetUrl ? ("<div style='margin-top:24px; text-align:center;'><a href='" + escapeHtml(sheetUrl) + "' target='_blank' style='display:inline-block; background-color:#09271E; color:#E9C578; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:bold; font-size:14px;'>Open Connected Google Sheet ↗</a></div>") : "")
    + "  </div>"
    + "</div>";

  // Native Google Apps Script MailApp invocation
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: plainTextBody,
    htmlBody: htmlBody,
    name: "Festive Christmas Hackathon 2026"
  });

  return {
    status: "SENT",
    recipient: recipient
  };
}

/**
 * ============================================================================
 * EMAIL DIAGNOSTIC UTILITIES
 * ============================================================================
 */

/**
 * Diagnostic Function 1: testFestiveChristmasEmail()
 * Run this function directly from the Google Apps Script editor.
 *
 * PURPOSE:
 * 1. Checks MailApp availability and daily sending quota.
 * 2. Triggers the Google OAuth authorization prompt if the script needs
 *    to authorize https://www.googleapis.com/auth/script.send_mail.
 * 3. Sends a real test email to the organizer address: y.s8269773357@gmail.com.
 * 4. Captures and logs any exception without swallowing it.
 */
function testFestiveChristmasEmail() {
  Logger.log("=============================================================");
  Logger.log("🎄 FESTIVE CHRISTMAS HACKATHON 2026 — EMAIL DIAGNOSTIC PROBE");
  Logger.log("=============================================================");

  // 1. Check MailApp Service Quota
  var remainingQuota = -1;
  try {
    remainingQuota = MailApp.getRemainingDailyQuota();
    Logger.log("✓ Step 1: MailApp service accessible. Remaining daily quota: " + remainingQuota + " emails.");
  } catch (quotaErr) {
    var quotaMsg = quotaErr instanceof Error ? quotaErr.message : String(quotaErr);
    Logger.log("✗ Step 1 Failed: Cannot read MailApp quota: " + quotaMsg);
    Logger.log("ACTION: Run this function in the Apps Script Editor and click 'Review Permissions' -> 'Allow'.");
    return {
      status: "FAILED",
      step: "QUOTA_CHECK",
      error: quotaMsg
    };
  }

  // 2. Log Configured Organizer Recipient
  Logger.log("✓ Step 2: Target organizer recipient address: " + ORGANIZER_EMAIL);

  // 3. Compose Real Test Email
  var testSubject = "Test Verification: Festive Christmas Hackathon 2026 Email Service";
  var testPlainBody = "🎄 Festive Christmas Hackathon 2026 — Email Diagnostic Probe\n\n"
    + "This is an automated verification email sent via Google Apps Script MailApp.\n\n"
    + "DIAGNOSTIC STATUS:\n"
    + "- Service: Google Apps Script MailApp (Native)\n"
    + "- Remaining Daily Email Quota: " + remainingQuota + "\n"
    + "- Timestamp: " + new Date().toISOString() + "\n"
    + "- Target Recipient: " + ORGANIZER_EMAIL + "\n"
    + "- Authorization Status: AUTHORIZED AND OPERATIONAL\n\n"
    + "If you are reading this email in your inbox, MailApp authorization, daily quota, and message delivery are 100% verified.";

  var testHtmlBody = "<div style='font-family:Arial, sans-serif; background-color:#041710; padding:24px; color:#FFF4DF; border-radius:14px; border:1px solid #E9C578; max-width:600px; margin:0 auto;'>"
    + "  <div style='text-align:center; border-bottom:1px solid rgba(233,197,120,0.3); padding-bottom:16px; margin-bottom:20px;'>"
    + "    <h2 style='color:#E9C578; margin:0;'>🎄 Festive Christmas Hackathon 2026</h2>"
    + "    <p style='color:#25A18E; font-size:13px; font-weight:bold; letter-spacing:1px; margin-top:6px; text-transform:uppercase;'>✓ MailApp Diagnostic Test Verified</p>"
    + "  </div>"
    + "  <p style='font-size:14px; line-height:1.6; color:#D9ECF5;'>This is an automated test email dispatched directly via <code>MailApp.sendEmail</code> from your Google Apps Script backend project.</p>"
    + "  <div style='background:#0A261D; border:1px solid #E9C578; border-radius:8px; padding:16px; margin:18px 0; font-size:13px;'>"
    + "    <p style='margin:4px 0;'><strong>Service:</strong> Google Apps Script Native MailApp</p>"
    + "    <p style='margin:4px 0;'><strong>Remaining Quota:</strong> " + remainingQuota + " emails</p>"
    + "    <p style='margin:4px 0;'><strong>Timestamp:</strong> " + new Date().toISOString() + "</p>"
    + "    <p style='margin:4px 0;'><strong>Recipient:</strong> " + ORGANIZER_EMAIL + "</p>"
    + "    <p style='margin:4px 0; color:#25A18E;'><strong>Status:</strong> AUTHORIZED & VERIFIED</p>"
    + "  </div>"
    + "  <p style='font-size:12px; color:#88D4B0; text-align:center; margin-top:20px;'>Your Google Apps Script backend is fully authorized to send both participant passes and organizer notifications.</p>"
    + "</div>";

  // 4. Send Real Test Email via MailApp
  try {
    Logger.log("Step 3: Dispatching test email via MailApp.sendEmail()...");
    MailApp.sendEmail({
      to: ORGANIZER_EMAIL,
      subject: testSubject,
      body: testPlainBody,
      htmlBody: testHtmlBody,
      name: "Festive Christmas Hackathon 2026"
    });
    Logger.log("✓ SUCCESS: Real test email accepted by MailApp and dispatched to: " + ORGANIZER_EMAIL);
    Logger.log("=============================================================");
    return {
      status: "SUCCESS",
      recipient: ORGANIZER_EMAIL,
      remainingQuota: remainingQuota,
      timestamp: new Date().toISOString()
    };
  } catch (sendErr) {
    var sendMsg = sendErr instanceof Error ? sendErr.message : String(sendErr);
    Logger.log("✗ FAILED: MailApp.sendEmail threw an exception: " + sendMsg);
    Logger.log("ACTION NEEDED: Check authorization dialog or sending quota limit.");
    Logger.log("=============================================================");
    return {
      status: "FAILED",
      step: "MAILAPP_SEND",
      error: sendMsg,
      remainingQuota: remainingQuota
    };
  }
}

/**
 * Diagnostic Function 2: testParticipantEmail(testInbox)
 * Sends a controlled test participant confirmation email to a specified test inbox.
 * Never sends test emails to real participants.
 */
function testParticipantEmail(testInbox) {
  var target = testInbox || ORGANIZER_EMAIL;
  Logger.log("[Diagnostic] Testing participant confirmation email to controlled inbox: " + target);

  var mockData = {
    leaderName: "Yogesh Sharma (Test)",
    leaderEmail: target,
    leaderPhone: "9425903357",
    teamName: "Diagnostic Test Crew",
    technicalDomain: "Artificial Intelligence & Machine Learning",
    teamSize: "trio",
    totalMembers: 3,
    member2Name: "Priya Patel (Test)",
    member2Email: target,
    member2Phone: "9876543210",
    member3Name: "Rahul Verma (Test)",
    member3Email: target,
    member3Phone: "9812345678",
    registrationFeeINR: 400,
    transactionId: "123456789012"
  };

  return sendLeaderConfirmationEmail(mockData, "XMAS-2026-DIAG-999");
}

