import Navbar from "../components/organisms/Navbar";
import HeroSection from "../components/organisms/HeroSection";
import CommunityFeed from "../components/organisms/CommunityFeed";
import LifecycleSection from "../components/organisms/LifecycleSection";
import CTASection from "../components/organisms/CTASection";
import Footer from "../components/organisms/Footer";

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