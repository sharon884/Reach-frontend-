import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/ HeroSection";
import CommunityFeed from "../components/landing/CommunityFeed";
import LifecycleSection from "../components/landing/LifecycleSection";
import CTASection from "../components/landing/CTASection";

function LandingPage() {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <CommunityFeed />
            <LifecycleSection />
            <CTASection/>
        </main>
    );
}

export default LandingPage;