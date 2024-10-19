import React from 'react';
import { FaLinkedin, FaEnvelope, FaInstagram, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 mb-4">Dibuat dengan ❤️ oleh Agani Satria</p>
        <div className="flex justify-center space-x-6">
          <a href="https://linkedin.com/in/agani-satria" className="text-gray-400 hover:text-blue-400 transition duration-300">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:aganisatria1@gmail.com" className="text-gray-400 hover:text-blue-400 transition duration-300">
            <FaEnvelope size={24} />
          </a>
          <a href="https://instagram.com/aganisatria" className="text-gray-400 hover:text-blue-400 transition duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://github.com/aganisatria" className="text-gray-400 hover:text-blue-400 transition duration-300">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
