"use client";
import { useEffect, useRef, useState } from "react";
import { fetchUpcoming } from "@/lib/campaignsApi";

export default function UpcomingCampaigns() {
  const [data, setData] = useState(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const adminData = await fetchUpcoming();
        if (adminData) {
          // Map backend fields to component expectations
          setData({
            name: adminData.campaignName,
            description: adminData.description,
            date_time: adminData.dateTime,
            promo_image: adminData.promoImage,
            register_url: adminData.registerUrl,
            location: adminData.location
          });
        }
      } catch (err) {
        console.error("Failed to load upcoming campaign", err);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [data]);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  if (!data) return null;

  return (
    <section className="w-full bg-white py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — Floating Image + Scroll Reveal */}
        <div className="flex justify-center">
          <div
            ref={addToRefs}
            className="w-[280px] sm:w-[340px] lg:w-[420px] float-animation opacity-0 translate-y-8 transition-all duration-[1200ms]"
          >
            <img
              src={data.promo_image || "https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764810649/Phone_Mockup_cxmgpl.png"}
              alt={data.name}
              className="rounded-3xl shadow-xl w-full"
            />
          </div>
        </div>

        {/* RIGHT — Content + Scroll Reveal */}
        <div
          ref={addToRefs}
          className="opacity-0 translate-y-8 transition-all duration-[1200ms]"
        >
          <p className="tracking-widest text-gray-500 text-sm mb-2 uppercase">
            Upcoming Campaigns
          </p>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            {data.name}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            {data.description}
          </p>

          <p className="font-semibold text-gray-800">
            {data.date_time}
          </p>

          {data.location && (
            <p className="text-gray-900 font-medium mt-2">{data.location}</p>
          )}

          {/* Button with Scale + Shine Hover Effect */}
          {data.register_url && (
            <a
              href={data.register_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block relative mt-8 bg-orange-500 text-white font-semibold px-10 py-3 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:bg-orange-600 shine-btn"
            >
              Register Now
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
