import SDGSection from "@/components/SDGSection";
import ImpactHeader from "@/components/ImpactHeader"
import WatchOurImpact from "@/components/WatchOurImpact";
import ImpactStats from "@/components/ImpactStats"
import TestimonialCarousel from "@/components/TestimonialCarousel";
export default function ImpactPage() {
  return (
    // <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div>
      <ImpactHeader/>
      <ImpactStats/>

<WatchOurImpact/>
<TestimonialCarousel/>
      <SDGSection/>
    
 
    </div>
    // </div>
  );
}
