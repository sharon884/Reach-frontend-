import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/ HeroSection";
import CommunityFeed from "../components/landing/CommunityFeed";

function LandingPage() {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <CommunityFeed/>
        </main>
    );
}

export default LandingPage;