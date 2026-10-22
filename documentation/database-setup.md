# MongoDB setup

AssetVault uses MongoDB through the official `mongodb` Node.js driver. The local configuration is `mongodb://127.0.0.1:27017`, database `assetvault`. Set `MONGODB_URI` and optionally `MONGODB_DB` in `.env` to use another server or an Atlas connection string.

## Initialize

Run `npm run db:init`. This connects to MongoDB and creates the required indexes. Start AssetVault with `npm start`.

## Existing records

The existing AssetVault MySQL records were copied to MongoDB. The original MySQL database was left unchanged.

## Collections

- `users`: names, normalized email addresses, bcrypt password hashes, role and active status.
- `assets`: metadata for protected files stored under `storage/`.
- `access_requests`: owner-approved access requests for confidential assets.
- `audit_logs`: account and asset activity.
- `sessions`: signed-in sessions, expired automatically after their cookie expiry.

The application creates indexes at startup, including unique email and access-request indexes. MongoDB must be running before the server starts.
