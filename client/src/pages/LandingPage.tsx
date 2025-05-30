import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Demo from '../components/Demo';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Demo />
      <Footer />
    </div>
  );
}

export default LandingPage;