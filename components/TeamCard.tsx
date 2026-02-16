'use client';

import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from "next/link";

export default function TeamCard({ name, role, description, image }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-sm p-5 text-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="rounded-lg object-cover mx-auto h-full w-full"
         />
      </motion.div>

      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-purple-600 font-medium">{role}</p>

      <p className="mt-3 text-sm text-gray-600">{description}</p>

      <motion.div
        className="flex justify-center gap-4 mt-4 text-gray-400"
        whileHover={{ color: '#7c3aed' }}
      >
         <Link href="/volunteers">
    <Facebook size={18} className="cursor-pointer hover:text-blue-600 transition" />
  </Link>

  <Link href="/volunteers">
    <Instagram size={18} className="cursor-pointer hover:text-pink-600 transition" />
  </Link>

  <Link href="/volunteers">
    <Linkedin size={18} className="cursor-pointer hover:text-blue-700 transition" />
  </Link>

      </motion.div>
    </motion.div>
  );
}
