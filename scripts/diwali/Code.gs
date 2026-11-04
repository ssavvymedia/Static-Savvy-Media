/**
 * SSM Diwali 2026 "Digital Surprise" lead intake, v2: Google Apps Script web app bound to the
 * "SSM Diwali 2026 Leads" sheet. The website never calls this directly: POST /api/diwali-lead (Vercel)
 * forwards each validated wish here with a shared secret, so the URL and secret stay server-side.
 *
 * DEPLOYED as v2 (live web app runs this version; the /exec URL is unchanged from v1, so no Vercel
 * change was needed). To ship a future change: open the sheet > Extensions > Apps Script > replace
 * Code.gs > Deploy > Manage deployments > edit the existing web app deployment > Version: New version
 * > Deploy. Leads tab headers I1:M1 are listed below.
 *
 * Columns: Timestamp IST | Name (sender) | Phone | Business (To: recipient) | Service | Source/UTM |
 *          User agent | Status (New / repeat) | Recipient | Firecracker | Language | Message | Wish ID
 * Every wish is a row; a phone already in the sheet is marked 'repeat' (never rejected).
 */
var SHARED_SECRET = ''; // or Script property SHARED_SECRET (preferred)
var SHEET_NAME = 'Leads';
var START_MS = Date.UTC(2026, 10, 2, 18, 30, 0);       // 3 Nov 2026 00:00:00 IST
var END_MS = Date.UTC(2026, 10, 9, 18, 29, 59, 999);   // 9 Nov 2026 23:59:59 IST
var CRACKERS = ['ssm', 'flowerpot', 'chakri', 'rocket', 'sparkler'];
var HEADERS_V2 = ['Recipient', 'Firecracker', 'Language', 'Message', 'Wish ID'];

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Indian 10-digit mobile or +international (8-15 digits) -> E.164, else ''. */
function phone_(raw) {
  var s = String(raw || '').trim();
  if (!s || s.length > 25 || /[^\d\s+().-]/.test(s)) return '';
  var plus = s.charAt(0) === '+' || s.indexOf('00') === 0;
  var d = s.replace(/\D/g, '');
  if (s.indexOf('00') === 0) d = d.slice(2);
  if (plus) {
    if (d.indexOf('91') === 0) return /^91[6-9]\d{9}$/.test(d) ? '+' + d : '';
    return /^[1-9]\d{7,14}$/.test(d) ? '+' + d : '';
  }
  if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
  if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
  return /^[6-9]\d{9}$/.test(d) ? '+91' + d : '';
}

function istNow_() {
  return Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss') + ' IST';
}

function doGet() {
  return json_({ ok: true, service: 'ssm-diwali-2026-leads', v: 2 });
}

function doPost(e) {
  var body;
  try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return json_({ ok: false, code: 'INVALID_JSON' }); }

  var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET') || SHARED_SECRET;
  if (!secret || body.secret !== secret) return json_({ ok: false, code: 'UNAUTHORIZED' });

  var now = Date.now();
  if (now < START_MS) return json_({ ok: false, code: 'CAMPAIGN_NOT_STARTED' });
  if (now > END_MS) return json_({ ok: false, code: 'CAMPAIGN_ENDED' });

  var sender = clean_(body.sender || body.name, 80), recipient = clean_(body.recipient, 60);
  var cracker = clean_(body.cracker, 20), lang = body.lang === 'ta' ? 'ta' : 'en';
  var message = clean_(body.message, 200), phone = phone_(body.phone);
  if (sender.length < 2 || recipient.length < 2 || !phone || CRACKERS.indexOf(cracker) === -1 || message.length < 2) return json_({ ok: false, code: 'VALIDATION' });

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, code: 'BUSY' });
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    if (!sh.getRange(1, 9).getDisplayValue()) sh.getRange(1, 9, 1, HEADERS_V2.length).setValues([HEADERS_V2]);
    var last = sh.getLastRow(), repeat = false;
    if (last >= 2) {
      var phones = sh.getRange(2, 3, last - 1, 1).getDisplayValues();
      for (var i = 0; i < phones.length; i++) {
        if (phone_(phones[i][0]) === phone) { repeat = true; break; }
      }
    }
    var row = [istNow_(), sender, phone, 'To: ' + recipient, 'Wish', clean_(body.source, 300), clean_(body.userAgent, 300), repeat ? 'repeat' : 'New',
      recipient, cracker, lang === 'ta' ? 'Tamil' : 'English', message, clean_(body.wishId, 20)];
    sh.getRange(last + 1, 1, 1, row.length).setNumberFormat('@').setValues([row]);
    return json_({ ok: true, row: last + 1, repeat: repeat });
  } finally {
    lock.releaseLock();
  }
}
