# AssetVault — Digital Asset & Content Management System

A full stack digital asset and content management system using HTML, CSS, JavaScript, Express, MongoDB, bcrypt, sessions and protected local file storage.

## Requirements

- Node.js 18 or newer
- MongoDB Community Server (local) or MongoDB Atlas

## Setup and run

MongoDB Community Server is configured on this computer. The app uses the local `assetvault` database on `mongodb://127.0.0.1:27017`.

1. Make sure the MongoDB service is running.
2. Run `npm install`.
3. Run `npm run db:init` to create database indexes.
4. Run `npm start` and open http://localhost:3000.

For local development with automatic restart use `npm run dev`. Uploaded files are stored in `storage/` (or `UPLOAD_DIR`) and are not served as static content. The server accepts a 50 MB maximum by default; change `MAX_FILE_SIZE_MB` if needed.

## Account access

People can register an account from the sign-in page and sign in again later with that email and password. Public registration allows Viewer or Editor roles; only an existing Administrator can grant Workspace Owner (Administrator) access. Administrators can also create or change accounts from User management. New passwords must be at least 12 characters.

## Features and known limits

Implemented in source: login/logout, HTTP-only session cookie, password hashing, role enforcement, uploads, MongoDB metadata, search/category/sort, per-user saved searches, bulk asset updates, recoverable trash, in-app access notifications, metadata editing, user/role management and audit activity. Uploads are checked against basic file signatures and scanned with ClamAV when `clamscan` is installed; set `CLAMAV_REQUIRED=true` to reject uploads when ClamAV is unavailable, and `CLAMSCAN_PATH` to select its executable. Confidential asset downloads are blocked by the server unless the uploader-owner approves a request. The local application uses a local MongoDB service on port 27017 and a real Administrator account. File acceptance checks common file signatures; malware scanning requires ClamAV, which is optional unless `CLAMAV_REQUIRED=true`. See `documentation/implementation-progress.md` for verification evidence and limitations.

## Documentation

- [Implementation progress](documentation/implementation-progress.md)
- [API reference](documentation/api-documentation.md)
- [Database setup](documentation/database-setup.md)

Screenshots were not captured in this environment; `screenshots/` is provided for genuine captures from the running app.
