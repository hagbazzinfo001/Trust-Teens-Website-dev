
"use client";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function TeenAmbassadorsPage() {
    const router = useRouter();
  
  const ambassadors = [
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  ];
  const ambassadors2 = [
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
    { name: "Deborah Dada", school: "School name", location: "Ogun State, Nigeria" },
  ];
 
  
  return (

  <div>
{/* <AnimatePresence>
  {open && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
       className="bg-white max-w-6xl w-full mx-6 rounded-3xl p-8 relative 
       max-h-[90vh] overflow-y-auto scrollbar-hide"
         initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Close button
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-center">
        Ambassador Community        </h3>
        <p className="mb-6 text-center px-2 md:px-12">Our ambassadors are young leaders who embody purpose, responsibility, and influence. They help create awareness, encourage participation, and support peer-to-peer growth within their environments.</p>
        

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ambassadors2.map((a, i) => (
            <div
              key={i}
              className="rounded-2xl shadow-sm border p-4"
            >
              <Image
                src="/coreteam2.svg"
                alt="Ambassador"
                width={200}
                height={200}
                className="h-26 w-full rounded-xl mb-4 object-cover"
              />

              <h4 className="font-semibold">{a.name}</h4>
              <p className="text-sm text-orange-500">{a.school}</p>
              <p className="text-sm text-gray-500">{a.location}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence> */}

    <main className="bg-white text-black">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Teen Ambassadors</h1>
        <p className="text-gray-600 max-w-2xl">
          The people stewarding the vision, building the systems, and delivering the work behind Trust Teens. This team leads strategy, programs, partnerships, and daily execution with purpose and care.
        </p>
      </section>

      {/* Group Image */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
         <Image
          src="/ambassadors-hero.svg"
          alt="Teen Ambassadors Group"
          width={1200}
          height={400}  
          className="h-72 md:h-96 rounded-3xl" 
        />
      </section>

      {/* Ambassador Community */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ambassador Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Our ambassadors are young leaders who embody purpose, responsibility, and influence. They help create awareness, encourage participation, and support peer-to-peer growth within their environments.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {ambassadors.map((a, i) => (
              <Card key={i} className="rounded-2xl shadow-sm">
                <CardContent className="p-6 text-left">
                  <Image
                    src="/coreteam2.svg"
                    alt="Ambassador"  
                    width={200}
                    height={200}
                    className="h-26 w-full rounded-xl mb-4"
                  />
                  <h3 className="font-semibold text-lg">{a.name}</h3>
                  <p className="text-sm text-orange-500">{a.school}</p>
                  <p className="text-sm text-gray-500">{a.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>

    <motion.button
  whileHover={{ scale: 1.05 }}
  className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg"
  onClick={() => router.push("/team/Ambassador/allAmbassadoor")}
>
  See all Volunteers
</motion.button>

        </div>
      </section>

      {/* Become Ambassador */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
         <Image 
          src="/ctaAmbassador.svg"
          alt="Become an Ambassador"
          width={600}
          height={400}
          className="h-80 rounded-3xl"
        />
        <div>
          <h3 className="text-3xl font-semibold mb-4">Become an Ambassador</h3>
          <p className="text-gray-600 mb-8">
            We invite teenagers who are ready to lead with values and influence their peers positively to become Trust Teens Ambassadors. Ambassadors receive guidance, learning opportunities, and platforms to grow as leaders.
          </p>
          <Button className="bg-black text-white rounded-xl px-8">Join Us today</Button>
        </div>
      </section>
    </main>
    </div>

  );
}
