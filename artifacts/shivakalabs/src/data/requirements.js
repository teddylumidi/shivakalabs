/**
 * requirements.js — What to prepare for each eCitizen category.
 * Keys match the `category` values in ECITIZEN_SERVICES (services.js).
 * Keep this general: exact requirements vary by case, and we confirm on WhatsApp.
 */
export const ECITIZEN_REQUIREMENTS = {
  id: [
    'ID waiting card (acknowledgement slip) number',
    'Phone number used during application',
  ],
  birth: [
    'Parents’ national ID copies',
    'Birth notification from the hospital (new registration)',
    'Certificate or entry number (replacement or follow-up)',
    'Applicant’s ID and eCitizen login, if available',
  ],
  death: [
    'Deceased’s national ID copy',
    'Burial permit or death notification',
    'Applicant’s ID and relationship to the deceased',
  ],
  marriage: [
    'National IDs or passports of both parties',
    'Passport-size photos',
    'Witnesses’ IDs (notice and registration)',
    'Certificate number (replacement)',
  ],
  goodconduct: [
    'National ID number',
    'eCitizen login, or phone and email to create one',
    'Note: new applications need fingerprints taken in person at DCI or a Huduma Centre',
  ],
  passport: [
    'National ID and birth certificate',
    'Parents’ national ID copies',
    'Recommender’s details',
    'Old passport (renewal) or police abstract (lost passport)',
    'Note: biometrics are captured in person at an immigration office',
  ],
  immigration: [
    'Passport bio-data page',
    'Passport-size photo',
    'Invitation letter, travel itinerary or permit details, as applicable',
  ],
  ntsa: [
    'National ID and KRA PIN',
    'eCitizen / NTSA login',
    'Driving licence number (licence services)',
    'Vehicle registration and logbook details (vehicle services)',
  ],
  kra: [
    'National ID number',
    'KRA PIN and iTax password, or access to your registered email',
    'P9 form from your employer (employed income returns)',
  ],
  sha: [
    'National ID number and phone number',
    'Spouse’s ID and children’s birth certificates (adding dependants)',
  ],
  nssf: [
    'National ID number',
    'NSSF number and registered phone number',
  ],
  helb: [
    'National ID and KCSE index number and year',
    'Admission letter (applications)',
    'Parents’ or guardians’ ID copies (applications)',
    'HELB portal login, if available',
  ],
  business: [
    'Three proposed names in order of preference (new registration)',
    'Owners’ or directors’ IDs and KRA PINs',
    'Physical address, phone and email',
    'Company or business number (CR12, annual returns)',
  ],
  land: [
    'Title or parcel number',
    'Owner’s national ID and KRA PIN',
    'eCitizen or Ardhisasa login, if available',
  ],
  county: [
    'Business name and location',
    'Owner’s national ID and KRA PIN',
    'Previous permit or receipt (renewals)',
  ],
  general: [
    'National ID number',
    'Phone number and email address',
    'eCitizen login, if you have one',
  ],
};
