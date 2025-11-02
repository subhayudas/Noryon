export interface AIService {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  size: "small" | "medium" | "large";
  tiers: {
    basic: {
      name: string;
      description: string;
      features: string[];
      price?: string;
    };
    smart: {
      name: string;
      description: string;
      features: string[];
      price?: string;
    };
    fullAI: {
      name: string;
      description: string;
      features: string[];
      price?: string;
    };
  };
}

export const aiServicesData: AIService[] = [
  {
    id: "chatbot",
    title: "Chatbot Services",
    description: "AI-powered conversational agents that engage customers 24/7",
    icon: "🤖",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    size: "large",
    tiers: {
      basic: {
        name: "Basic",
        description: "A simple AI assistant that answers FAQs and captures leads automatically.",
        features: [
          "Instant answers for hours, pricing, services",
          "Lead capture to inbox or CRM",
          "Guides to booking/forms",
          "24/7 coverage; hands-off"
        ]
      },
      smart: {
        name: "Smart",
        description: "Advanced conversational AI with context awareness and multi-channel support.",
        features: [
          "Context-aware conversations",
          "Multi-language support",
          "Integration with CRM systems",
          "Advanced analytics and insights"
        ]
      },
      fullAI: {
        name: "Full AI",
        description: "Complete AI solution with machine learning and predictive capabilities.",
        features: [
          "Machine learning optimization",
          "Predictive customer insights",
          "Custom AI model training",
          "Advanced automation workflows"
        ]
      }
    }
  },
  {
    id: "voice-ai",
    title: "Voice AI Services",
    description: "Professional voice agents that handle calls and capture leads intelligently",
    icon: "🎙️",
    imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    size: "large",
    tiers: {
      basic: {
        name: "Basic",
        description: "A professional voice that answers every call and captures leads.",
        features: [
          "Instant answers for common questions",
          "Sends caller details to inbox/CRM",
          "Smart transfers so callers reach the right person",
          "After-hours coverage + voicemail"
        ]
      },
      smart: {
        name: "Smart",
        description: "Intelligent voice AI with natural conversation flow and sentiment analysis.",
        features: [
          "Natural conversation flow",
          "Sentiment analysis",
          "Call routing optimization",
          "Real-time transcription"
        ]
      },
      fullAI: {
        name: "Full AI",
        description: "Advanced voice AI with emotional intelligence and predictive calling.",
        features: [
          "Emotional intelligence",
          "Predictive call outcomes",
          "Custom voice training",
          "Advanced call analytics"
        ]
      }
    }
  },
  {
    id: "automation",
    title: "Automation Services",
    description: "Intelligent workflows that save time and streamline business processes",
    icon: "⚡",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    size: "medium",
    tiers: {
      basic: {
        name: "Basic",
        description: "Save time on repetitive tasks and keep workflows running.",
        features: [
          "Automates forms, reminders, notifications",
          "Connects Sheets, email, calendar",
          "Auto-stores and organizes leads",
          "Runs 24/7 in the background"
        ]
      },
      smart: {
        name: "Smart",
        description: "Advanced automation with conditional logic and multi-platform integration.",
        features: [
          "Conditional workflow logic",
          "Multi-platform integration",
          "Error handling and recovery",
          "Performance monitoring"
        ]
      },
      fullAI: {
        name: "Full AI",
        description: "AI-driven automation that learns and optimizes processes automatically.",
        features: [
          "Self-optimizing workflows",
          "Predictive automation",
          "Custom AI model integration",
          "Advanced process mining"
        ]
      }
    }
  },
  {
    id: "reviews",
    title: "Review & Reputation",
    description: "Automated systems to collect and manage customer feedback and reviews",
    icon: "⭐",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    size: "medium",
    tiers: {
      basic: {
        name: "Basic",
        description: "Collect more positive reviews with minimal effort.",
        features: [
          "Automated SMS/email requests",
          "Direct to Google & Facebook",
          "Simple request tracking",
          "Follow-ups until feedback is left"
        ]
      },
      smart: {
        name: "Smart",
        description: "Intelligent review management with sentiment analysis and response automation.",
        features: [
          "Sentiment analysis",
          "Automated response generation",
          "Review trend analysis",
          "Competitor monitoring"
        ]
      },
      fullAI: {
        name: "Full AI",
        description: "Complete reputation management with AI-powered insights and optimization.",
        features: [
          "AI-powered reputation scoring",
          "Predictive review trends",
          "Automated reputation recovery",
          "Advanced analytics dashboard"
        ]
      }
    }
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    description: "AI-powered insights and automated reporting for data-driven decisions",
    icon: "📊",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    size: "small",
    tiers: {
      basic: {
        name: "Basic",
        description: "Simple KPIs always available without spreadsheets.",
        features: [
          "Daily/weekly lead & sales reports",
          "Top KPIs in a clean dashboard",
          "Summary reports via email/SMS",
          "24/7 data tracking"
        ]
      },
      smart: {
        name: "Smart",
        description: "Advanced analytics with predictive insights and automated recommendations.",
        features: [
          "Predictive analytics",
          "Automated recommendations",
          "Custom dashboard creation",
          "Real-time alerts"
        ]
      },
      fullAI: {
        name: "Full AI",
        description: "Complete AI analytics platform with machine learning and automated insights.",
        features: [
          "Machine learning models",
          "Automated insight generation",
          "Custom AI predictions",
          "Advanced data visualization"
        ]
      }
    }
  }
];
