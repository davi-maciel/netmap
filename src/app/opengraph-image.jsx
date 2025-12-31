import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'NetMap - Visualize Your Personal Network'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 200,
            marginBottom: 20,
          }}
        >
          🗺️
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          NetMap
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Visualize your personal network on an interactive world map
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
