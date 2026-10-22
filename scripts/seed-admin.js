require('dotenv').config();
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const db=require('../src/db');

(async()=>{
  try{
    await db.connect();
    const email='owner@assetvault.local';
    await db.collection('users').updateMany({role:'Administrator',email:{$ne:email}},{$set:{role:'Editor'}});
    await db.collection('users').updateOne({email},{$set:{name:'Workspace Owner',email,password_hash:await bcrypt.hash('Owner@asset123',12),role:'Administrator',active:true},$setOnInsert:{_id:crypto.randomUUID(),created_at:new Date()}},{upsert:true});
    console.log('Default Workspace Owner account is ready.');
  }catch(e){
    console.error('Could not provision Workspace Owner:',e.message);
    process.exitCode=1;
  }finally{
    await db.close();
  }
})();
