import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const vercelBuildHook = process.env.VERCEL_BUILD_HOOK_URL
    
    if (!vercelBuildHook) {
      console.error('VERCEL_BUILD_HOOK_URL is not configured')
      return NextResponse.json(
        { error: 'Build hook not configured' },
        { status: 500 }
      )
    }

    // Trigger Vercel rebuild
    const response = await fetch(vercelBuildHook, {
      method: 'POST',
    })

    if (!response.ok) {
      console.error('Failed to trigger rebuild:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to trigger rebuild' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Rebuild triggered successfully' 
    })
  } catch (error) {
    console.error('Error triggering rebuild:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}