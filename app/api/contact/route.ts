import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'

export async function POST(req:Request){
  try{
    const body = await req.json()
    const { name, phone, email, interest, message } = body ?? {}
    if(!name || !phone){ return NextResponse.json({error:'Name and phone are required.'},{status:400}) }
    if(!writeClient){ return NextResponse.json({error:'CMS write token is not configured yet.'},{status:503}) }
    await writeClient.create({
      _type:'inquiry',
      name:String(name), phone:String(phone), email:email?String(email):'', interest:interest?String(interest):'', message:message?String(message):'', submittedAt:new Date().toISOString()
    })
    return NextResponse.json({ok:true})
  }catch{
    return NextResponse.json({error:'Unable to save enquiry.'},{status:500})
  }
}
