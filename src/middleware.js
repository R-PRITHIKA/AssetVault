const db = require('./db');
async function currentUser(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'Please sign in to continue.' });
  try {
    const user = await db.collection('users').findOne({ _id: String(req.session.user.id), active: true });
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: 'Your account is inactive. Please contact an administrator.' });
    }
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role, active: user.active };
    next();
  } catch (err) { next(err); }
}
function requireAuth(req, res, next) { return currentUser(req, res, next); }
function allow(...roles) { return (req, res, next) => currentUser(req, res, err => { if (err) return next(err); if (res.headersSent) return; if (!roles.includes(req.session.user.role)) return res.status(403).json({ error: 'Your role does not allow this action.' }); next(); }); }
async function audit(userId, action, assetId = null, details = '') {
  try { await db.collection('audit_logs').insertOne({ user_id: String(userId), action, asset_id: assetId == null ? null : String(assetId), details, created_at: new Date() }); }
  catch (e) { console.error('Audit log failed:', e.message); }
}
module.exports = { requireAuth, allow, audit };
