'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function WatchOurImpact() {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { once: true, margin: '-100px' });
  const [playVideo, setPlayVideo] = useState(false);

  // Autoplay when in view
  useEffect(() => {
    if (isInView) {
      setPlayVideo(true);
    }
  }, [isInView]);

  return (
    <section className="relative py-24 overflow-hidden">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Watch our Impact
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
            See the moments, voices, and stories behind the numbers. Our impact
            videos capture teenagers learning, speaking, creating, and leading
            across conferences, summits, campaigns, and community activities.
            <br /><br />
            Watch real experiences. Hear real reflections. See the transformation
            unfold.
          </p>

          <a
            href="https://www.youtube.com/watch?v=ygXT6v59cTU"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center
              px-6 py-3 rounded-xl
              bg-purple-600 text-white font-semibold
              shadow-md hover:bg-purple-700 transition
            "
          >
            Watch on YouTube
          </a>
        </motion.div>

        {/* RIGHT — VIDEO */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            relative w-full aspect-video
            rounded-3xl overflow-hidden
            shadow-xl border bg-black
          "
        >
          {!playVideo ? (
            /* CUSTOM PLAY OVERLAY */
            <button
              onClick={() => setPlayVideo(true)}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="
                relative z-10 w-20 h-20 rounded-full
                bg-white flex items-center justify-center
                shadow-lg group-hover:scale-110 transition
              ">
                <svg
                  className="w-8 h-8 text-purple-600 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          ) : (
            /* YOUTUBE IFRAME */
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/ygXT6v59cTU?autoplay=1&mute=1"
              title="Trust Teens Impact Video"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          )}
        </motion.div>

      </div>
    </section>
  );
}
