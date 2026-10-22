const session = require('express-session');
const db = require('./db');
class MongoSessionStore extends session.Store {
  async get(sid, callback) {
    try { const row=await db.collection('sessions').findOne({_id:sid,expiresAt:{$gt:new Date()}}); callback(null,row?.session||null); }
    catch(e) { callback(e); }
  }
  async set(sid, sess, callback=()=>{}) {
    try { const expiresAt=sess.cookie?.expires?new Date(sess.cookie.expires):new Date(Date.now()+(sess.cookie?.maxAge||28800000)); await db.collection('sessions').updateOne({_id:sid},{$set:{session:sess,expiresAt}},{upsert:true}); callback(null); }
    catch(e) { callback(e); }
  }
  async touch(sid, sess, callback=()=>{}) {
    try { const expiresAt=sess.cookie?.expires?new Date(sess.cookie.expires):new Date(Date.now()+(sess.cookie?.maxAge||28800000)); await db.collection('sessions').updateOne({_id:sid},{$set:{expiresAt}}); callback(null); }
    catch(e) { callback(e); }
  }
  async destroy(sid, callback=()=>{}) {
    try { await db.collection('sessions').deleteOne({_id:sid}); callback(null); }
    catch(e) { callback(e); }
  }
}
module.exports = MongoSessionStore;
