import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";

type Props = {
  name: string;
  role: string;
  description: string;
  image: string;
};

export default function TeamCard({ name, role, description, image }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 text-center">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="rounded-lg object-cover mx-auto"
      />

      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-purple-600 font-medium">{role}</p>

      <p className="mt-3 text-sm text-gray-600">{description}</p>

      <div className="flex justify-center gap-4 mt-4 text-gray-400">
        <Facebook size={18} />
        <Instagram size={18} />
        <Linkedin size={18} />
      </div>
    </div>
  );
}
