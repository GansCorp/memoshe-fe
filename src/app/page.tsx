'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { FaRocket, FaBook, FaBrain } from 'react-icons/fa';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: 'Selamat datang di MEMOSHE',
      description: 'Platform belajar dengan flashcard interaktif',
      icon: <FaRocket className="text-4xl mb-4" />,
    },
    {
      title: 'Buat Flashcard Anda',
      description: 'Buat dan atur flashcard sesuai kebutuhan belajar Anda',
      icon: <FaBook className="text-4xl mb-4" />,
    },
    {
      title: 'Tingkatkan Ingatan Anda',
      description: 'Gunakan flashcard untuk meningkatkan daya ingat dan pemahaman',
      icon: <FaBrain className="text-4xl mb-4" />,
    },
  ];

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl bg-gray-800 shadow-xl">
          <CardHeader className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
            <h1 className="text-3xl font-bold mb-2">MEMOSHE</h1>
            <p className="text-lg">Belajar Lebih Cerdas dengan Flashcard</p>
          </CardHeader>
          <CardBody className="p-6 text-gray-300">
            <div
              className={`text-center transition-all duration-300 ${
                isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
              }`}
            >
              {steps[currentStep].icon}
              <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
              <p className="text-lg mb-6">{steps[currentStep].description}</p>
            </div>
            <div className="flex justify-between items-center mt-8">
              <Button
                color="primary"
                isDisabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
              >
                Sebelumnya
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button
                  color="primary"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                >
                  Selanjutnya
                </Button>
              ) : (
                <Link href="/flashcards" passHref>
                  <Button as="a" color="success">
                    Mulai Belajar
                  </Button>
                </Link>
              )}
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
