import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Real-Time Event Discovery`,
      description: `Never miss out on meaningful local events. Get personalized recommendations based on your interests and location.`,
      icon: <i className="las la-calendar-alt"></i>,
    },
    {
      heading: `Community Building`,
      description: `Create and join interest-based groups to connect with like-minded individuals in your area.`,
      icon: <i className="las la-users"></i>,
    },
    {
      heading: `Professional Networking`,
      description: `Connect with mentors and collaborators in your field through our smart matching algorithm.`,
      icon: <i className="las la-handshake"></i>,
    },
    {
      heading: `Interactive Maps`,
      description: `Discover events and communities near you with our intuitive map interface.`,
      icon: <i className="las la-map-marked-alt"></i>,
    },
    {
      heading: `Multilingual Support`,
      description: `Break language barriers with automatic translation in over 50 languages.`,
      icon: <i className="las la-language"></i>,
    },
    {
      heading: `Smart Notifications`,
      description: `Stay updated with relevant events and connections through AI-powered notifications.`,
      icon: <i className="las la-bell"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `Tech Professional`,
      content: `After moving to a new city, this platform helped me build a professional network and find my community within weeks.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Marcus Rodriguez`,
      designation: `Community Organizer`,
      content: `The event management features have transformed how we engage with our local community. Attendance has increased by 200%.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emily Thompson`,
      designation: `Small Business Owner`,
      content: `I've found amazing business partners and mentors through the platform. It's like LinkedIn meets Meetup, but better!`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Community`,
      description: `Perfect for individuals looking to connect`,
      monthly: 9,
      yearly: 89,
      features: [`Event Discovery`, `Community Access`, `Basic Networking`],
    },
    {
      title: `Professional`,
      description: `Ideal for active networkers and organizers`,
      monthly: 29,
      yearly: 290,
      features: [
        `Advanced Networking`,
        `Event Creation`,
        `Analytics Dashboard`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `For organizations and large communities`,
      monthly: 99,
      yearly: 990,
      features: [`Custom Branding`, `API Access`, `Dedicated Support`],
    },
  ]

  const questionAnswers = [
    {
      question: `How is this different from other networking platforms?`,
      answer: `We combine professional networking with local community building, offering a unique hybrid approach that connects you with both career opportunities and meaningful local relationships.`,
    },
    {
      question: `Can I organize my own events?`,
      answer: `Absolutely! You can create and manage events, track attendance, and engage with participants through our comprehensive event management tools.`,
    },
    {
      question: `Is the platform available in my city?`,
      answer: `We're rapidly expanding across major urban areas. Our platform is currently available in 50+ cities worldwide.`,
    },
    {
      question: `How do you ensure meaningful connections?`,
      answer: `Our AI-powered matching algorithm considers shared interests, goals, and location to suggest relevant connections and events.`,
    },
  ]

  const steps = [
    {
      heading: `Create Your Profile`,
      description: `Set up your personal or professional profile with your interests and goals`,
    },
    {
      heading: `Discover Your Community`,
      description: `Browse local events and join communities that match your interests`,
    },
    {
      heading: `Connect & Engage`,
      description: `Network with professionals and participate in local events`,
    },
    {
      heading: `Grow Together`,
      description: `Build lasting relationships and achieve your personal and professional goals`,
    },
  ]

  const painPoints = [
    {
      emoji: `😔`,
      title: `Feeling isolated in a crowded city`,
    },
    {
      emoji: `🔍`,
      title: `Struggling to find meaningful professional connections`,
    },
    {
      emoji: `😮‍💨`,
      title: `Missing out on relevant local opportunities`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Build Meaningful Connections in Your Community`}
        subtitle={`Join thousands of professionals finding their tribe through local events and communities`}
        buttonText={`Get Started`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/JvAjD9-linkup-d9YX`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={50000}
            suffixText={`active community members`}
          />
        }
      />
      <LandingSocialProof title={`Featured on`} />
      <LandingPainPoints
        title={`61% of young adults feel seriously lonely in urban areas`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Journey to a Connected Life`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Build Your Community`}
        subtitle={`Powerful tools designed to help you discover, connect, and grow`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories from Our Community`}
        subtitle={`Join thousands who've found their tribe through our platform`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your Network`}
        subtitle={`Choose the perfect plan for your connection goals`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions`}
        subtitle={`Everything you need to know about building your community`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Build Your Community?`}
        subtitle={`Join thousands of professionals already connecting and growing together`}
        buttonText={`Start Your Journey`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
