import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtected = createRouteMatcher([])

export default clerkMiddleware((auth, request) => {
    if (isProtected(request)) {
        auth().protect()
    }
    return NextResponse.next()
})