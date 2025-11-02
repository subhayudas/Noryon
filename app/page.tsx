import Hero from "@/components/main/Hero";
import ImageTrailSection from "@/components/main/ImageTrailSection";
import Projects from "@/components/main/Projects";
import Services from "@/components/main/Services";
import Portfolio from "@/components/main/Portfolio";
import { ZoomParallax } from "@/components/main/ZoomParallax";
import FAQSection from "@/components/main/FAQSection";
import ContactForm from "@/components/main/ContactForm";
import AboutUs from "@/components/main/AboutUs";
import Approach from "@/components/main/Approach";
import ChooseUs from "@/components/main/ChooseUs";
import TerminalDemo from "@/components/main/TerminalDemo";
import FeatureShowcase from "@/components/main/FeatureShowcase";
import Statistics from "@/components/main/Statistics";
import ProcessTimeline from "@/components/main/ProcessTimeline";
import TeamSection from "@/components/main/TeamSection";
import CallToAction from "@/components/main/CallToAction";
import ContentMarketingCards from "@/components/main/ContentMarketingCards";
import ContainerScroll from "@/components/main/ContainerScroll";

// Import the BookingForm component at the top of your file
import BookingForm from '@/components/main/BookingForm';

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        {/* Hero section - no border needed as it's the first section */}
        <Hero />
        
        {/* Image Trail Section */}
        <div className="border-t border-white">
          <ImageTrailSection />
        </div>
        
        {/* Services Section */}
        <div className="border-t border-white">
          <Services />
        </div>
        
        {/* Content Marketing Cards Section */}
        <div className="border-t border-white">
          <ContentMarketingCards />
        </div>
        
        
        
        {/* Zoom Parallax Section */}
        <div className="border-t border-white">
          <ZoomParallax 
            images={[
              { src: "/imagezoom5.jpeg", alt: "Zoom Image 5" },
              { src: "/imagezoom2.jpeg", alt: "Zoom Image 2" },
              { src: "/imagezoom3.jpeg", alt: "Zoom Image 3" },
              { src: "/imagezoom4.jpeg", alt: "Zoom Image 4" },
              { src: "/imagezoom1.jpeg", alt: "Zoom Image 1" },
              { src: "/imagezoom6.jpeg", alt: "Zoom Image 6" },
              { src: "/imagezoom7.jpeg", alt: "Zoom Image 7" }
            ]} 
          />
        </div>
        
        
        
        {/* Approach Section */}
        <div className="border-t border-white">
          <Approach />
        </div>

        {/* Our Approach - Scroll Showcase */}
        <div className="border-t border-white">
          <ContainerScroll
            titleComponent={
              <div className="font-bold text-4xl md:text-5xl text-white">
                We reduce your Expenses
              </div>
            }
          >
            <div className="flex h-full w-full items-center justify-center">
              <img
                src="/ipadscroll.png"
                alt="iPad Scroll Demo"
                className="object-contain max-h-full max-w-full rounded-2xl shadow-xl bg-zinc-900 p-2"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </ContainerScroll>
        </div>
        
        {/* Terminal Demo */}
        <div className="border-t border-white">
          <TerminalDemo />
        </div>
        
        {/* Statistics */}
        <div className="border-t border-white">
          <Statistics />
        </div>
        
        {/* Process Timeline */}
        <div className="border-t border-white">
          <ProcessTimeline />
        </div>
        
        {/* Team Section */}
        <div className="border-t border-white">
          <TeamSection />
        </div>
        
        {/* Call to Action */}
        <div className="border-t border-white">
          <CallToAction />
        </div>
        
        {/* Booking Form */}
        <div className="border-t border-white">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
