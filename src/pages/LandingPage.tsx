import Navbar from "../components/organisms/Navbar";
import HeroSection from "../components/organisms/HeroSection";
import CommunityFeed from "../components/landing/CommunityFeed";
import LifecycleSection from "../components/landing/LifecycleSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

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