import Navbar from "@/components/organisms/Navbar/Navbar";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";
import CommunityFeed from "@/components/organisms/CommunityFeed/CommunityFeed";
import LifecycleSection from "@/components/organisms/LifecycleSection/LifecycleSection";
import CTASection from "@/components/organisms/CTASection/CTASection";
import Footer from "@/components/organisms/Footer/Footer";

function LandingPage() {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <CommunityFeed />
            <LifecycleSection />
            <CTASection/>
            <Footer/>
        </main>
    );
}

export default LandingPage;