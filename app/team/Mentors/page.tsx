import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MentorCommunityPage() {
  const mentors = [
    { name: "Deborah Dada", role: "Founder & Lead", bio: "Enjoys adventurous travel, seeks new cultures and offbeat destinations." },
    { name: "Iyanoluwa Sonde-Ikokoh", role: "Programs Manager", bio: "Over a decade of experience empowering young people to lead change." },
    { name: "Oluwadunni Akinhanmi", role: "Media Manager", bio: "5+ years of hands-on experience in media & marketing." },
    { name: "Samuel Dada", role: "Events Manager", bio: "Creative painter capturing beauty with imaginative artwork." },
    { name: "Favour Ikediashi", role: "Community Manager", bio: "Football enthusiast, enjoys movie nights with friends." },
    { name: "Esther Ogunyemi", role: "Assistant Programs Manager", bio: "Culinary artist, explores diverse flavors, skilled in cooking." },
  ];

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mentor Community</h1>
          <p className="text-gray-300 max-w-lg mb-8">
            Mentors support teenagers by sharing guidance, perspective, and lived experience—helping them think clearly, grow confidently, and make better life decisions.
          </p>
          <Button className="rounded-full px-6">Mentor a teenager today</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48 rounded-2xl bg-gray-800" />
          <div className="h-48 rounded-2xl bg-gray-800" />
        </div>
      </section>

      {/* Mentors */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-4">Meet the Trust Teens Mentors</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Our mentors are professionals, creatives, educators, and leaders committed to guiding teenagers beyond academics.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((m, i) => (
              <Card key={i} className="bg-white text-black rounded-2xl shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200" />
                  <h3 className="font-semibold text-lg">{m.name}</h3>
                  <p className="text-sm text-blue-600 mb-2">{m.role}</p>
                  <p className="text-sm text-gray-600">{m.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div className="h-64 rounded-3xl bg-gray-800" />
        <div className="h-64 rounded-3xl bg-gray-800" />
      </section>

      {/* Footer CTA */}
      <section className="text-center py-20">
        <h3 className="text-2xl font-semibold mb-4">Join Us Today</h3>
        <Button className="rounded-full px-8">Get Started</Button>
      </section>
    </main>
  );
}
