import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '12'

    const { data: inspirations, error } = await supabase
      .from('inspiration_gallery')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(0, parseInt(limit) - 1)

    if (error) {
      console.error('Error fetching inspirations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch inspirations' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      inspirations: inspirations || []
    })
  } catch (error) {
    console.error('Error in inspirations API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}