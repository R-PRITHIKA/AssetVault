# API Documentation

Base URL: `http://localhost:3000/api`. JSON errors use `{ "error": "message" }`. Login establishes an HTTP-only MongoDB-backed session cookie. Roles are Administrator, Editor and Viewer.

## Authentication

| Method/path | Auth | Description |
|---|---|---|
| `POST /auth/register` | Public | JSON `{ "name": "Name", "email": "name@example.com", "password": "12+ characters", "role": "Viewer" }`. Public roles are Viewer and Editor; Administrator access is granted by an existing Administrator. Returns 201 and signs the user in. Duplicate email returns 409. |
| `POST /auth/login` | Public | Checks the account and bcrypt password; returns a public user and establishes a session. Invalid credentials: 401. |
| `POST /auth/logout` | Session if present | Destroys the session. |
| `GET /auth/me` | Public | `{ "user": null }` or the current public user. |

## Assets and confidential access

Authenticated routes include `GET /dashboard`, `GET /categories`, `GET /assets`, and `GET /assets/:id`. Asset search supports `search`, `category`, and `sort` query parameters. `POST /assets` allows Administrators and Editors. `PATCH /assets/:id` allows Administrators and the Editor who uploaded the asset. `DELETE /assets/:id` is Administrator-only and soft-deletes the record.

`GET /assets/:id/download` streams a stored file. For Confidential assets, only the owner or a requester whose request the owner approved can download. `POST /assets/:id/access-requests` creates a request; `GET /access-requests` lists incoming and outgoing requests; only the asset owner can approve or deny a pending request using `PATCH /access-requests/:id`.

## Users

`GET /users`, `POST /users`, and `PATCH /users/:id` require Administrator access. Administrators can create accounts, grant roles, and activate or deactivate accounts. Passwords are stored as bcrypt hashes.

MongoDB stores records in `users`, `assets`, `access_requests`, `audit_logs`, and `sessions` collections. Uploaded files remain in local protected storage. Unauthenticated protected requests return 401; insufficient roles return 403.
