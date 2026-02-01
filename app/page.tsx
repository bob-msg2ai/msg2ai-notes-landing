'use client'

import { useEffect, useState, useRef } from 'react'
import { 
  Sparkles, 
  FileText, 
  Zap, 
  Linkedin, 
  MessageSquare, 
  Shield, 
  Check, 
  ArrowRight,
  Play,
  Menu,
  X
} from 'lucide-react'

// Smooth scroll hook
function useScrollAnimation() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    return () => observerRef.current?.disconnect()
  }, [])

  const observe = (element: HTMLElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element)
    }
  }

  return { visibleItems, observe }
}

const features = [
  {
    icon: FileText,
    title: 'Smart Notes',
    description: 'Capture text, voice, and photos during conferences. Everything organized automatically.'
  },
  {
    icon: Zap,
    title: 'AI Reports',
    description: 'Generate end-of-day reports with prioritized action items and contact summaries.'
  },
  {
    icon: Linkedin,
    title: 'LinkedIn Sync',
    description: 'Connect with contacts on LinkedIn. Import profiles and track connections.'
  },
  {
    icon: MessageSquare,
    title: 'Direct Follow-ups',
    description: 'Send WhatsApp or email follow-ups directly from the app. Never miss a connection.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data stays private. BYO API key option for full control.'
  }
]

const pricing = [
  {
    name: 'Limited Beta',
    price: 'Free',
    period: 'during beta',
    desc: 'Perfect for early adopters',
    features: ['Unlimited notes', 'Card scanning', 'Basic AI reports', 'Email support'],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Lifetime',
    price: '$19.99',
    period: 'one-time',
    desc: 'Best value for power users',
    features: ['Unlimited everything', 'Advanced AI', 'LinkedIn integration', 'WhatsApp/Email', 'BYO API key', 'Priority support', 'All updates'],
    cta: 'Get Lifetime',
    popular: true
  },
  {
    name: 'Per Conference',
    price: '$10',
    period: 'per event',
    desc: 'Flexible option',
    features: ['100 notes included', 'Card scanning', 'AI reports', '30-day access', '+$10 per 100 extra notes'],
    cta: 'Choose Plan',
    popular: false
  }
]

const steps = [
  { num: '01', title: 'Register', desc: 'Sign up and connect your accounts in seconds.' },
  { num: '02', title: 'Capture', desc: 'Take notes, record voice, scan cards during the event.' },
  { num: '03', title: 'Report', desc: 'Get AI-generated reports with action items instantly.' },
  { num: '04', title: 'Follow Up', desc: 'Send personalized messages directly from the app.' }
]

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activePricing, setActivePricing] = useState(1)
  const { visibleItems, observe } = useScrollAnimation()

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? 'hidden' : 'auto'
  }, [mobileMenu])

  const isVisible = (id: string) => visibleItems.has(id)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100,
        background: 'rgba(10, 15, 26, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              background: 'linear-gradient(135deg, #00d4ff, #00a8e8)', 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
            }}>
              <FileText style={{ width: '20px', height: '20px', color: '#fff' }} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>Msg2ai</div>
              <div style={{ fontSize: '11px', color: '#00d4ff', fontWeight: 500 }}>NOTES</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            {['Features', 'How It Works', 'Pricing'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                style={{ 
                  color: '#94a3b8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                {item}
              </a>
            ))}
            <a 
              href="#signup"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #00a8e8)',
                color: '#0a0f1a',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenu(!mobileMenu)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#fff',
              padding: '8px',
              cursor: 'pointer'
            }}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 15, 26, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '32px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {['Features', 'How It Works', 'Pricing'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => setMobileMenu(false)}
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  fontSize: '24px',
                  fontWeight: 600
                }}
              >
                {item}
              </a>
            ))}
            <a 
              href="#signup"
              onClick={() => setMobileMenu(false)}
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #00a8e8)',
                color: '#0a0f1a',
                padding: '16px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: 600,
                textAlign: 'center',
                marginTop: '16px'
              }}
            >
              Get Started Free
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '64px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80" 
            alt="Conference"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to bottom, rgba(10, 15, 26, 0.9) 0%, rgba(10, 15, 26, 0.7) 50%, rgba(10, 15, 26, 0.95) 100%)' 
          }} />
        </div>

        {/* Glow Effects */}
        <div style={{ 
          position: 'absolute', 
          top: '20%', 
          right: '-10%', 
          width: '400px', 
          height: '400px', 
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            padding: '8px 16px',
            borderRadius: '50px',
            marginBottom: '24px'
          }}>
            <Sparkles style={{ width: '16px', height: '16px', color: '#00d4ff' }} />
            <span style={{ color: '#00d4ff', fontSize: '13px', fontWeight: 500 }}>Limited Beta — Join Free</span>
          </div>

          {/* Headline */}
          <h1 style={{ 
            fontSize: 'clamp(36px, 8vw, 56px)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Never Lose a{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #00a8e8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Conference
            </span>
            <br />
            Contact Again
          </h1>

          {/* Subheadline */}
          <p style={{ 
            fontSize: 'clamp(16px, 4vw, 20px)', 
            color: '#94a3b8', 
            maxWidth: '500px',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Take notes, scan business cards, and generate AI-powered follow-up reports. All in one app.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
            <a 
              href="#signup"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #00a8e8)',
                color: '#0a0f1a',
                padding: '16px 28px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 24px rgba(0, 212, 255, 0.3)'
              }}
            >
              Start Free <ArrowRight style={{ width: '20px', height: '20px' }} />
            </a>
            <a 
              href="#demo"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                padding: '16px 28px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Play style={{ width: '18px', height: '18px' }} /> Watch Demo
            </a>
          </div>

          <p style={{ fontSize: '14px', color: '#64748b' }}>No credit card required</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
              Everything You <span style={{ color: '#00d4ff' }}>Need</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Powerful features for effortless networking</p>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div 
                  key={feature.title}
                  id={`feature-${i}`}
                  ref={(el) => observe(el)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '16px',
                    padding: '24px',
                    opacity: isVisible(`feature-${i}`) ? 1 : 0,
                    transform: isVisible(`feature-${i}`) ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease',
                    transitionDelay: `${i * 0.1}s`
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(0, 212, 255, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Icon style={{ width: '24px', height: '24px', color: '#00d4ff' }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{feature.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '80px 0', background: 'rgba(0, 212, 255, 0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
              How It <span style={{ color: '#00d4ff' }}>Works</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Four simple steps to success</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {steps.map((step, i) => (
              <div 
                key={step.num}
                id={`step-${i}`}
                ref={(el) => observe(el)}
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  opacity: isVisible(`step-${i}`) ? 1 : 0,
                  transform: isVisible(`step-${i}`) ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.5s ease',
                  transitionDelay: `${i * 0.15}s`
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #00d4ff, #00a8e8)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '6px' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
              Simple <span style={{ color: '#00d4ff' }}>Pricing</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Choose what works for you</p>
          </div>

          {/* Mobile: Horizontal scroll */}
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '16px',
            margin: '0 -20px',
            padding: '0 20px 16px'
          }}>
            {pricing.map((plan, i) => (
              <div 
                key={plan.name}
                onClick={() => setActivePricing(i)}
                style={{
                  minWidth: '300px',
                  flex: '0 0 auto',
                  scrollSnapAlign: 'center',
                  background: plan.popular 
                    ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 168, 232, 0.05))' 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: `2px solid ${plan.popular ? '#00d4ff' : 'rgba(255, 255, 255, 0.06)'}`,
                  borderRadius: '20px',
                  padding: '28px',
                  position: 'relative'
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#00d4ff',
                    color: '#0a0f1a',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    Most Popular
                  </div>
                )}

                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{plan.name}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>{plan.desc}</p>
                
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '40px', fontWeight: 700 }}>{plan.price}</span>
                  <span style={{ color: '#64748b', fontSize: '14px' }}>/{plan.period}</span>
                </div>

                <ul style={{ listStyle: 'none', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        background: 'rgba(0, 212, 255, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check style={{ width: '12px', height: '12px', color: '#00d4ff' }} />
                      </div>
                      <span style={{ color: '#94a3b8' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href="#signup"
                  style={{
                    display: 'block',
                    width: '100%',
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #00d4ff, #00a8e8)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    color: plan.popular ? '#0a0f1a' : '#fff',
                    padding: '14px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '15px'
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Pricing Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            {pricing.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePricing(i)}
                style={{
                  width: activePricing === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activePricing === i ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="signup" style={{ padding: '80px 20px' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 168, 232, 0.05))',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: '24px',
          padding: '48px 32px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px' }}>
            Join the limited beta today. No credit card required.
          </p>
          <a 
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #00d4ff, #00a8e8)',
              color: '#0a0f1a',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            Get Started Free <ArrowRight style={{ width: '20px', height: '20px' }} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #00d4ff, #00a8e8)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText style={{ width: '18px', height: '18px', color: '#fff' }} />
            </div>
            <span style={{ fontWeight: 600 }}>Msg2ai Notes</span>
          </div>
          
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
            {['Privacy', 'Terms', 'Support'].map((link) => (
              <a key={link} href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>
                {link}
              </a>
            ))}
          </div>
          
          <p style={{ color: '#475569', fontSize: '14px' }}>
            © 2026 Msg2ai Notes. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Desktop Styles */}
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          section#features > div > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          section#how-it-works > div > div:last-child {
            flex-direction: row !important;
            justify-content: space-between;
          }
          section#pricing > div > div:nth-child(3) {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            overflow-x: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}