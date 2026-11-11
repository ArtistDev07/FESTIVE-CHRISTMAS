import { RegistrationPayload } from './types.ts';

/**
 * Helper to safely sanitize and check if a field contains valid displayable content.
 * Prevents 'null', 'undefined', or blank values from appearing.
 */
function isValidField(val: unknown): boolean {
  if (val === null || val === undefined) return false;
  const s = String(val).trim();
  return s.length > 0 && s !== 'null' && s !== 'undefined' && s !== 'N/A';
}

function safeText(val: unknown, fallback: string = ''): string {
  if (!isValidField(val)) return fallback;
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 1. PARTICIPANT CONFIRMATION EMAIL TEMPLATE
 * Premium, responsive Christmas-themed HTML design with #061C14, gold #E9C578, emerald #25A18E
 */
export function generateParticipantEmail(data: RegistrationPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = 'Registration Received Successfully – Festive Christmas 2026';
  const leaderName = safeText(data.leaderName, 'Innovator');
  const teamName = safeText(data.teamName, 'Festive Team');
  const regId = safeText(data.registrationId, 'XMAS-2026-CONFIRMED');
  const teamSize = safeText(data.teamSize, 'Team');
  const domain = safeText(data.technicalDomain, 'Open Innovation');
  const utr = safeText(data.transactionId, 'PENDING_UTR');
  const fee = data.registrationFeeINR ? `₹${data.registrationFeeINR}` : '₹400';
  const paymentStatus = safeText(data.paymentStatus, 'PENDING_VERIFICATION');

  // Build dynamic member rows
  const memberRows: string[] = [];
  if (isValidField(data.member2Name)) {
    memberRows.push(`
      <div style="background: rgba(14, 53, 38, 0.6); border: 1px solid rgba(233, 197, 120, 0.2); border-radius: 8px; padding: 12px; margin-bottom: 8px;">
        <strong style="color: #25A18E; font-size: 13px;">Member 2:</strong>
        <span style="color: #FFFFFF; font-size: 13px; font-weight: 600;"> ${safeText(data.member2Name)}</span>
        ${isValidField(data.member2Phone) ? `<span style="color: #D9ECF5; font-size: 12px;"> • 📱 ${safeText(data.member2Phone)}</span>` : ''}
        ${isValidField(data.member2Email) ? `<span style="color: #D9ECF5; font-size: 12px;"> • ✉️ ${safeText(data.member2Email)}</span>` : ''}
      </div>
    `);
  }

  if (isValidField(data.member3Name)) {
    memberRows.push(`
      <div style="background: rgba(14, 53, 38, 0.6); border: 1px solid rgba(233, 197, 120, 0.2); border-radius: 8px; padding: 12px; margin-bottom: 8px;">
        <strong style="color: #FFB703; font-size: 13px;">Member 3:</strong>
        <span style="color: #FFFFFF; font-size: 13px; font-weight: 600;"> ${safeText(data.member3Name)}</span>
        ${isValidField(data.member3Phone) ? `<span style="color: #D9ECF5; font-size: 12px;"> • 📱 ${safeText(data.member3Phone)}</span>` : ''}
        ${isValidField(data.member3Email) ? `<span style="color: #D9ECF5; font-size: 12px;"> • ✉️ ${safeText(data.member3Email)}</span>` : ''}
      </div>
    `);
  }

  if (isValidField(data.member4Name)) {
    memberRows.push(`
      <div style="background: rgba(14, 53, 38, 0.6); border: 1px solid rgba(233, 197, 120, 0.2); border-radius: 8px; padding: 12px; margin-bottom: 8px;">
        <strong style="color: #FFD700; font-size: 13px;">Member 4:</strong>
        <span style="color: #FFFFFF; font-size: 13px; font-weight: 600;"> ${safeText(data.member4Name)}</span>
        ${isValidField(data.member4Phone) ? `<span style="color: #D9ECF5; font-size: 12px;"> • 📱 ${safeText(data.member4Phone)}</span>` : ''}
        ${isValidField(data.member4Email) ? `<span style="color: #D9ECF5; font-size: 12px;"> • ✉️ ${safeText(data.member4Email)}</span>` : ''}
      </div>
    `);
  }

  // Technical stack section
  let techStackHtml = '';
  if (isValidField(data.programmingLanguages) || isValidField(data.frameworks)) {
    techStackHtml = `
      <div style="margin-top: 16px; padding: 14px; background: rgba(10, 38, 29, 0.8); border: 1px solid rgba(233, 197, 120, 0.25); border-radius: 10px;">
        <h3 style="color: #E9C578; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Technical Stack & Profiles</h3>
        ${isValidField(data.programmingLanguages) ? `<p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;"><strong style="color: #FFFFFF;">Languages:</strong> ${safeText(data.programmingLanguages)}</p>` : ''}
        ${isValidField(data.frameworks) ? `<p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;"><strong style="color: #FFFFFF;">Frameworks:</strong> ${safeText(data.frameworks)}</p>` : ''}
        ${isValidField(data.githubUrl) ? `<p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;"><strong style="color: #FFFFFF;">GitHub:</strong> <a href="${safeText(data.githubUrl)}" style="color: #E9C578; text-decoration: underline;">${safeText(data.githubUrl)}</a></p>` : ''}
        ${isValidField(data.projectBrief) ? `<p style="margin: 8px 0 0 0; font-size: 13px; color: #D9ECF5; border-top: 1px dashed rgba(233, 197, 120, 0.2); padding-top: 8px;"><strong style="color: #FFFFFF;">Project Concept:</strong> <em>"${safeText(data.projectBrief)}"</em></p>` : ''}
      </div>
    `;
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #041710; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFF4DF;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #041710; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #061C14; border: 1px solid rgba(233, 197, 120, 0.35); border-radius: 18px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6); overflow: hidden;">
          
          <!-- Festive Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #09271E 0%, #123D2B 50%, #061C14 100%); padding: 32px 28px; text-align: center; border-bottom: 2px solid #E9C578;">
              <div style="font-size: 28px; line-height: 1;">🎄 ✨ 🏆</div>
              <h1 style="color: #E9C578; font-size: 24px; font-weight: 800; margin: 12px 0 4px 0; letter-spacing: 0.5px;">
                Festive Christmas Hackathon 2026
              </h1>
              <p style="color: #25A18E; font-size: 13px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
                Official Registration Pass &amp; Confirmation
              </p>
            </td>
          </tr>

          <!-- Salutation & Welcome -->
          <tr>
            <td style="padding: 28px 28px 16px 28px;">
              <p style="font-size: 16px; line-height: 1.6; color: #FFFFFF; margin: 0 0 12px 0;">
                Dear <strong style="color: #FFD700;">${leaderName}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #D9ECF5; margin: 0 0 16px 0;">
                Congratulations! We are thrilled to confirm that your registration for team 
                <strong style="color: #FFFFFF;">"${teamName}"</strong> has been successfully received for the 
                <strong>Festive Christmas 2026 Hackathon</strong>.
              </p>

              <!-- Event Details Block (Mandatory) -->
              <div style="background-color: #09271E; border: 1px solid #25A18E; border-radius: 12px; padding: 16px; margin: 18px 0; text-align: center;">
                <div style="color: #E9C578; font-weight: 800; font-size: 14px; margin-bottom: 6px;">
                  EVENT DETAILS OVERVIEW
                </div>
                <div style="color: #FFFFFF; font-size: 13px; line-height: 1.7;">
                  <strong>Event:</strong> Festive Christmas 2026 &nbsp;|&nbsp; 
                  <strong>Organizer:</strong> AIVERSEUI &nbsp;|&nbsp; 
                  <strong>Mode:</strong> Offline<br>
                  <strong>Date:</strong> 25 December 2026 &nbsp;|&nbsp; 
                  <strong>Location:</strong> Indore, Madhya Pradesh
                </div>
              </div>

              <!-- Registration Pass Box -->
              <div style="background: rgba(10, 38, 29, 0.9); border: 2px solid #E9C578; border-radius: 14px; padding: 20px; margin: 20px 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(233, 197, 120, 0.2);">
                      <span style="font-size: 11px; color: #D9ECF5; text-transform: uppercase; letter-spacing: 1.5px; display: block;">Registration Pass ID</span>
                      <span style="font-size: 20px; font-weight: 800; color: #FFD700; font-family: monospace;">${regId}</span>
                    </td>
                    <td align="right" style="padding-bottom: 12px; border-bottom: 1px solid rgba(233, 197, 120, 0.2);">
                      <span style="display: inline-block; background: #25A18E; color: #061C14; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 999px; text-transform: uppercase;">
                        ${paymentStatus}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 14px; font-size: 13px; color: #D9ECF5;" colspan="2">
                      <p style="margin: 4px 0;"><strong style="color: #FFFFFF;">Team Name:</strong> ${teamName}</p>
                      <p style="margin: 4px 0;"><strong style="color: #FFFFFF;">Squad Size:</strong> ${teamSize.toUpperCase()}</p>
                      <p style="margin: 4px 0;"><strong style="color: #FFFFFF;">Domain Track:</strong> <span style="color: #E9C578;">${domain}</span></p>
                      <p style="margin: 4px 0;"><strong style="color: #FFFFFF;">City &amp; State:</strong> ${safeText(data.city)}, ${safeText(data.state)}</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Team Leader Profile Block -->
              <div style="background: rgba(14, 53, 38, 0.7); border: 1px solid rgba(233, 197, 120, 0.25); border-radius: 10px; padding: 16px; margin: 16px 0;">
                <h3 style="color: #E9C578; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Team Leader Details</h3>
                <p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;"><strong style="color: #FFFFFF;">Name:</strong> ${leaderName}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;"><strong style="color: #FFFFFF;">Email:</strong> ${safeText(data.leaderEmail)}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;"><strong style="color: #FFFFFF;">Mobile:</strong> ${safeText(data.leaderPhone)}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;"><strong style="color: #FFFFFF;">Institution:</strong> ${safeText(data.leaderCollege)}</p>
                <p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;">
                  <strong style="color: #FFFFFF;">Program:</strong> ${safeText(data.leaderDegree)} - ${safeText(data.leaderBranch)} (${safeText(data.leaderYear)})
                </p>
                ${isValidField(data.leaderRollNumber) ? `<p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;"><strong style="color: #FFFFFF;">Roll No:</strong> ${safeText(data.leaderRollNumber)}</p>` : ''}
              </div>

              <!-- Dynamic Members (Rendered only if present) -->
              ${memberRows.length > 0 ? `
                <div style="margin-top: 16px;">
                  <h3 style="color: #E9C578; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Squad Members</h3>
                  ${memberRows.join('')}
                </div>
              ` : ''}

              <!-- Tech Stack Section -->
              ${techStackHtml}

              <!-- Payment Summary -->
              <div style="background: rgba(6, 28, 20, 0.9); border: 1px solid #25A18E; border-radius: 10px; padding: 14px; margin-top: 18px;">
                <h3 style="color: #25A18E; font-size: 14px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px;">Payment Verification</h3>
                <p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;">
                  <strong style="color: #FFFFFF;">Registration Fee:</strong> ${fee} (Confirmed via UPI)
                </p>
                <p style="margin: 4px 0; font-size: 13px; color: #D9ECF5;">
                  <strong style="color: #FFFFFF;">Transaction UTR / Reference:</strong> 
                  <code style="color: #FFD700; background: #0A261D; padding: 2px 6px; border-radius: 4px; font-size: 13px;">${utr}</code>
                </p>
              </div>

              <!-- Venue Instructions Note -->
              <div style="margin-top: 24px; padding: 14px; background: rgba(233, 197, 120, 0.08); border-left: 4px solid #E9C578; border-radius: 4px;">
                <p style="font-size: 12px; line-height: 1.6; color: #FFF4DF; margin: 0;">
                  ⚠️ <strong>Important Day-of-Event Check-in:</strong> Please carry this confirmation email (digital or printed slip) along with valid college photo IDs during morning check-in at <strong>09:00 AM on 25 December 2026</strong> at the Indore venue.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #03120C; padding: 20px 28px; text-align: center; border-top: 1px solid rgba(233, 197, 120, 0.2); font-size: 12px; color: #D9ECF5;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #E9C578;">
                Festive Christmas 2026 • Powered by AIVERSEUI
              </p>
              <p style="margin: 0; color: rgba(217, 236, 245, 0.6); font-size: 11px;">
                This is an automated registration pass. Please do not reply directly to this email. For queries, contact the organizing team.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Registration Received Successfully – Festive Christmas 2026
Dear ${leaderName},

Your team "${teamName}" has been successfully registered!

EVENT DETAILS:
- Event: Festive Christmas 2026
- Organizer: AIVERSEUI
- Mode: Offline
- Date: 25 December 2026
- Location: Indore, Madhya Pradesh

REGISTRATION PASS:
- Registration ID: ${regId}
- Team Name: ${teamName}
- Squad Size: ${teamSize}
- Domain Track: ${domain}
- Location: ${safeText(data.city)}, ${safeText(data.state)}

TEAM LEADER:
- Name: ${leaderName}
- Email: ${safeText(data.leaderEmail)}
- Phone: ${safeText(data.leaderPhone)}
- College: ${safeText(data.leaderCollege)}
- Program: ${safeText(data.leaderDegree)} - ${safeText(data.leaderBranch)} (${safeText(data.leaderYear)})

PAYMENT DETAILS:
- Fee Paid: ${fee}
- UTR / Transaction ID: ${utr}
- Status: ${paymentStatus}

Please present this registration ID and college photo IDs during morning check-in at 09:00 AM on 25 December 2026 in Indore, MP.
  `.trim();

  return { subject, html, text };
}

/**
 * 2. ORGANIZER NOTIFICATION EMAIL TEMPLATE
 * Complete, un-truncated raw registration breakdown divided into 9 clear sections:
 *  1. Registration Information
 *  2. Team Information
 *  3. Team Leader Information
 *  4. Individual Team Member Information
 *  5. Contact Information
 *  6. College / Institution Information
 *  7. Payment Information
 *  8. Technical Stack & Project Brief
 *  9. Raw Payload Timestamp (Asia/Kolkata timezone)
 */
export function generateOrganizerEmail(data: RegistrationPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const teamName = safeText(data.teamName, 'Untitled Team');
  const regId = safeText(data.registrationId, 'XMAS-2026');
  const subject = `New Festive Christmas Registration – ${teamName} – ${regId}`;

  const kolkataTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0F172A; color: #F8FAFC; margin: 0; padding: 20px;">
  <div style="max-width: 720px; margin: 0 auto; background-color: #1E293B; border: 1px solid #334155; border-radius: 12px; overflow: hidden;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #065F46 0%, #0F766E 100%); padding: 24px; color: #FFFFFF;">
      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.85;">
        ADMIN EVENT DISPATCHER • FESTIVE CHRISTMAS 2026
      </div>
      <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800;">
        New Registration: ${teamName}
      </h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; font-family: monospace; color: #FEF08A;">
        ID: ${regId}
      </p>
    </div>

    <div style="padding: 24px;">

      <!-- SECTION 1: REGISTRATION INFORMATION -->
      <div style="margin-bottom: 20px; border-bottom: 1px solid #334155; pb-3;">
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          1. Registration Information
        </h3>
        <table width="100%" style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          <tr><td width="35%" style="color: #94A3B8;">Registration ID:</td><td><strong style="color: #F8FAFC; font-family: monospace;">${regId}</strong></td></tr>
          <tr><td style="color: #94A3B8;">ISO Timestamp:</td><td>${safeText(data.timestamp, new Date().toISOString())}</td></tr>
          <tr><td style="color: #94A3B8;">Submission Formatted:</td><td>${safeText(data.submissionDateFormatted, kolkataTime)}</td></tr>
        </table>
      </div>

      <!-- SECTION 2: TEAM INFORMATION -->
      <div style="margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          2. Team Information
        </h3>
        <table width="100%" style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          <tr><td width="35%" style="color: #94A3B8;">Team Name:</td><td><strong style="color: #F8FAFC;">${teamName}</strong></td></tr>
          <tr><td style="color: #94A3B8;">Technical Domain Track:</td><td><span style="color: #FDE047;">${safeText(data.technicalDomain)}</span></td></tr>
          <tr><td style="color: #94A3B8;">Team Size:</td><td>${safeText(data.teamSize).toUpperCase()} (${data.totalMembers || 'N/A'} Total Members)</td></tr>
          <tr><td style="color: #94A3B8;">Location:</td><td>${safeText(data.city)}, ${safeText(data.state)}</td></tr>
        </table>
      </div>

      <!-- SECTION 3: TEAM LEADER INFORMATION -->
      <div style="margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          3. Team Leader Information
        </h3>
        <table width="100%" style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          <tr><td width="35%" style="color: #94A3B8;">Full Name:</td><td><strong style="color: #F8FAFC;">${safeText(data.leaderName)}</strong></td></tr>
          <tr><td style="color: #94A3B8;">College / University:</td><td>${safeText(data.leaderCollege)}</td></tr>
          <tr><td style="color: #94A3B8;">Degree &amp; Course:</td><td>${safeText(data.leaderDegree)}</td></tr>
          <tr><td style="color: #94A3B8;">Branch / Discipline:</td><td>${safeText(data.leaderBranch)}</td></tr>
          <tr><td style="color: #94A3B8;">Academic Year:</td><td>${safeText(data.leaderYear)}</td></tr>
          <tr><td style="color: #94A3B8;">Roll Number:</td><td>${safeText(data.leaderRollNumber, 'Not Provided')}</td></tr>
        </table>
      </div>

      <!-- SECTION 4: INDIVIDUAL TEAM MEMBER INFORMATION -->
      <div style="margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          4. Individual Team Member Information
        </h3>
        <div style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          ${isValidField(data.member2Name) ? `
            <div style="background: #0F172A; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <strong>Member 2:</strong> ${safeText(data.member2Name)} | <strong>Phone:</strong> ${safeText(data.member2Phone)} | <strong>Email:</strong> ${safeText(data.member2Email)}
            </div>
          ` : '<p style="color: #64748B; margin: 4px 0;">Member 2: N/A (Solo)</p>'}

          ${isValidField(data.member3Name) ? `
            <div style="background: #0F172A; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <strong>Member 3:</strong> ${safeText(data.member3Name)} | <strong>Phone:</strong> ${safeText(data.member3Phone)} | <strong>Email:</strong> ${safeText(data.member3Email)}
            </div>
          ` : '<p style="color: #64748B; margin: 4px 0;">Member 3: N/A</p>'}

          ${isValidField(data.member4Name) ? `
            <div style="background: #0F172A; padding: 10px; border-radius: 6px; margin-bottom: 8px;">
              <strong>Member 4:</strong> ${safeText(data.member4Name)} | <strong>Phone:</strong> ${safeText(data.member4Phone)} | <strong>Email:</strong> ${safeText(data.member4Email)}
            </div>
          ` : '<p style="color: #64748B; margin: 4px 0;">Member 4: N/A</p>'}
        </div>
      </div>

      <!-- SECTION 5: CONTACT INFORMATION -->
      <div style="margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          5. Contact Information
        </h3>
        <table width="100%" style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          <tr><td width="35%" style="color: #94A3B8;">Leader Email:</td><td><a href="mailto:${safeText(data.leaderEmail)}" style="color: #38BDF8;">${safeText(data.leaderEmail)}</a></td></tr>
          <tr><td style="color: #94A3B8;">Leader Phone:</td><td><a href="tel:${safeText(data.leaderPhone)}" style="color: #38BDF8;">${safeText(data.leaderPhone)}</a></td></tr>
        </table>
      </div>

      <!-- SECTION 6: COLLEGE / INSTITUTION INFORMATION -->
      <div style="margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          6. College / Institution Information
        </h3>
        <table width="100%" style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          <tr><td width="35%" style="color: #94A3B8;">College Name:</td><td>${safeText(data.leaderCollege)}</td></tr>
          <tr><td style="color: #94A3B8;">Course &amp; Branch:</td><td>${safeText(data.leaderDegree)} - ${safeText(data.leaderBranch)}</td></tr>
          <tr><td style="color: #94A3B8;">Student City / State:</td><td>${safeText(data.city)}, ${safeText(data.state)}</td></tr>
        </table>
      </div>

      <!-- SECTION 7: PAYMENT INFORMATION -->
      <div style="margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          7. Payment Information
        </h3>
        <table width="100%" style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          <tr><td width="35%" style="color: #94A3B8;">Fee Amount:</td><td><strong style="color: #4ADE80;">₹${data.registrationFeeINR || 400}</strong></td></tr>
          <tr><td style="color: #94A3B8;">Transaction / UTR ID:</td><td><code style="color: #FEF08A; font-size: 14px; background: #0F172A; padding: 2px 6px; border-radius: 4px;">${safeText(data.transactionId)}</code></td></tr>
          <tr><td style="color: #94A3B8;">Verification Status:</td><td><strong style="color: #F59E0B;">${safeText(data.paymentStatus, 'PENDING_VERIFICATION')}</strong></td></tr>
          <tr><td style="color: #94A3B8;">Payment Receipt:</td><td>${
            isValidField(data.paymentScreenshotFileName)
              ? `<strong style="color: #38BDF8;">📎 Attached: ${safeText(data.paymentScreenshotFileName)}</strong>`
              : isValidField(data.paymentScreenshotBase64)
              ? `<strong style="color: #38BDF8;">📎 Attached: Payment_Receipt_Screenshot.jpg</strong>`
              : '<span style="color: #94A3B8;">Screenshot not uploaded</span>'
          }</td></tr>
        </table>
      </div>

      <!-- SECTION 8: TECHNICAL STACK & PROJECT BRIEF -->
      <div style="margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          8. Technical Stack &amp; Project Brief
        </h3>
        <table width="100%" style="font-size: 13px; color: #CBD5E1; line-height: 1.6;">
          <tr><td width="35%" style="color: #94A3B8;">Languages:</td><td>${safeText(data.programmingLanguages, 'None specified')}</td></tr>
          <tr><td style="color: #94A3B8;">Frameworks:</td><td>${safeText(data.frameworks, 'None specified')}</td></tr>
          <tr><td style="color: #94A3B8;">GitHub:</td><td>${safeText(data.githubUrl, 'None specified')}</td></tr>
          <tr><td style="color: #94A3B8;">LinkedIn:</td><td>${safeText(data.linkedinUrl, 'None specified')}</td></tr>
          <tr><td style="color: #94A3B8;">Past Experience:</td><td>${safeText(data.pastExperience, 'None')}</td></tr>
          <tr><td style="color: #94A3B8;">Project Brief:</td><td><em>"${safeText(data.projectBrief, 'No brief provided')}"</em></td></tr>
        </table>
      </div>

      <!-- SECTION 9: RAW PAYLOAD TIMESTAMP -->
      <div>
        <h3 style="color: #38BDF8; font-size: 14px; text-transform: uppercase; margin: 0 0 10px 0;">
          9. Raw Payload Timestamp (Asia/Kolkata)
        </h3>
        <div style="background: #0F172A; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #94A3B8;">
          Kolkata Time: <strong style="color: #4ADE80;">${kolkataTime}</strong><br>
          ISO 8601 UTC: ${new Date().toISOString()}
        </div>
      </div>

    </div>

    <!-- Admin Footer -->
    <div style="background-color: #0F172A; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748B;">
      AIVERSEUI Official Event Dispatcher • Festive Christmas 2026 Admin Alert
    </div>

  </div>
</body>
</html>
  `.trim();

  const text = `
New Festive Christmas Registration – ${teamName} – ${regId}

1. REGISTRATION INFORMATION:
- ID: ${regId}
- Timestamp: ${safeText(data.timestamp, new Date().toISOString())}

2. TEAM INFORMATION:
- Team Name: ${teamName}
- Domain: ${safeText(data.technicalDomain)}
- Size: ${safeText(data.teamSize)}
- Location: ${safeText(data.city)}, ${safeText(data.state)}

3. TEAM LEADER:
- Name: ${safeText(data.leaderName)}
- College: ${safeText(data.leaderCollege)}
- Degree & Branch: ${safeText(data.leaderDegree)} - ${safeText(data.leaderBranch)} (${safeText(data.leaderYear)})
- Roll No: ${safeText(data.leaderRollNumber, 'N/A')}

4. SQUAD MEMBERS:
- Member 2: ${safeText(data.member2Name, 'N/A')} (${safeText(data.member2Phone, '')})
- Member 3: ${safeText(data.member3Name, 'N/A')} (${safeText(data.member3Phone, '')})
- Member 4: ${safeText(data.member4Name, 'N/A')} (${safeText(data.member4Phone, '')})

5. CONTACT INFO:
- Leader Email: ${safeText(data.leaderEmail)}
- Leader Phone: ${safeText(data.leaderPhone)}

6. COLLEGE:
- ${safeText(data.leaderCollege)}

7. PAYMENT INFO:
- Fee: ₹${data.registrationFeeINR || 400}
- Transaction UTR: ${safeText(data.transactionId)}
- Status: ${safeText(data.paymentStatus, 'PENDING_VERIFICATION')}

8. TECHNICAL STACK & BRIEF:
- Languages: ${safeText(data.programmingLanguages, 'N/A')}
- Frameworks: ${safeText(data.frameworks, 'N/A')}
- Brief: ${safeText(data.projectBrief, 'N/A')}

9. RAW TIMESTAMP:
- Asia/Kolkata: ${kolkataTime}
  `.trim();

  return { subject, html, text };
}
