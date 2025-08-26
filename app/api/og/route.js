export const dynamic = 'force-dynamic';
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract parameters from URL
    const title = searchParams.get('title') || 'Mvono Consultants';
    const subtitle = searchParams.get('subtitle') || 'Safety, Energy & Plant Management Experts';
    const page = searchParams.get('page') || 'home';
    const description = searchParams.get('description') || 'Serving Kenya & East Africa Since 2009';

    // Define page-specific content with enhanced designs
    const pageContent = {
      home: {
        title: 'MVONO CONSULTANTS',
        subtitle: 'Safety, Energy & Plant Management Experts',
        description: 'Serving Kenya & East Africa Since 2009',
        icons: ['🛡️', '⚡', '🏭'],
        iconLabels: ['Safety', 'Energy', 'Plant'],
        bgGradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
        accentColor: '#60a5fa',
      },
      services: {
        title: 'OUR SERVICES',
        subtitle: 'Expert Solutions Across East Africa',
        description: '8 Core Service Areas • 1000+ Projects Completed • 100% Compliance',
        icons: ['🌍', '🛡️', '🔥', '⚡', '🔍', '📚'],
        iconLabels: ['EIA', 'Safety', 'Fire', 'Energy', 'Inspection', 'Training'],
        bgGradient: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
        accentColor: '#34d399',
      },
      about: {
        title: 'ABOUT MVONO CONSULTANTS',
        subtitle: 'Led by Engineer Donald M Mbogho',
        description: 'Since 2009 • 29+ Years Experience • East Africa Leader',
        icons: ['🏆', '👥', '📈'],
        iconLabels: ['Excellence', 'Leadership', 'Growth'],
        bgGradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        accentColor: '#c084fc',
      },
      contact: {
        title: 'CONTACT US',
        subtitle: 'Get Expert Consultation Today',
        description: '+254 720 270 694 • sales@mvonoconsultants.com',
        icons: ['📞', '📧', '📍'],
        iconLabels: ['Call', 'Email', 'Visit'],
        bgGradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
        accentColor: '#f87171',
      }
    };

    const content = pageContent[page] || pageContent.home;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: content.bgGradient,
            padding: '60px 80px',
            position: 'relative',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.15,
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)',
              backgroundSize: '50px 50px',
            }}
          />

          {/* Your actual Mvono logo design */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '60px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.25)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                position: 'relative',
              }}
            >
              {/* Simplified M logo shape */}
              <div style={{
                fontSize: '36px', 
                fontWeight: '900', 
                color: 'white', 
                fontFamily: 'serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                marginBottom: '4px'
              }}>M</div>
              {/* Orange accent line */}
              <div style={{ 
                width: '40px', 
                height: '4px', 
                background: '#f15a27', 
                borderRadius: '2px',
                marginTop: '2px'
              }} />
              {/* Small MVONO text */}
              <div style={{
                fontSize: '9px',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 'bold',
                marginTop: '3px',
                letterSpacing: '0.5px'
              }}>MVONO</div>
            </div>
            <div style={{ color: 'white' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
                MVONO
              </div>
              <div style={{ fontSize: '16px', opacity: 0.9 }}>
                CONSULTANTS
              </div>
            </div>
          </div>

          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              marginTop: '20px',
              zIndex: 10,
            }}
          >
            {/* Main Title */}
            <h1
              style={{
                fontSize: content.title.length > 25 ? '44px' : '58px',
                fontWeight: '900',
                margin: '0 0 24px 0',
                lineHeight: 1.1,
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.02em',
                color: 'white',
              }}
            >
              {content.title}
            </h1>

            {/* Subtitle with accent line */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  width: '60px',
                  height: '3px',
                  background: content.accentColor,
                  marginRight: '20px',
                  borderRadius: '2px',
                }}
              />
              <p
                style={{
                  fontSize: '28px',
                  margin: '0',
                  opacity: 0.95,
                  fontWeight: '600',
                }}
              >
                {content.subtitle}
              </p>
              <div
                style={{
                  width: '60px',
                  height: '3px',
                  background: content.accentColor,
                  marginLeft: '20px',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Icons Section */}
            <div
              style={{
                display: 'flex',
                gap: '28px',
                margin: '40px 0',
                alignItems: 'center',
              }}
            >
              {content.icons.map((icon, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '40px',
                      background: 'rgba(255, 255, 255, 0.25)',
                      borderRadius: '20px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '88px',
                      height: '88px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {icon}
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      opacity: 0.9,
                      fontWeight: '600',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {content.iconLabels[index]}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '22px',
                margin: '32px 0 0 0',
                opacity: 0.9,
                maxWidth: '900px',
                lineHeight: 1.4,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '16px 32px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {content.description}
            </p>
          </div>

          {/* Bottom Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '60px',
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '30px',
              padding: '16px 32px',
              fontSize: '18px',
              color: 'white',
              fontWeight: '700',
              border: '2px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            www.mvonoconsultants.com
          </div>

          {/* Quality Badge */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '60px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '12px 20px',
              fontSize: '14px',
              color: 'white',
              fontWeight: '600',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>⭐</div>
            <div>Est. 2009</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log('Error generating OG image:', e.message);
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
}
