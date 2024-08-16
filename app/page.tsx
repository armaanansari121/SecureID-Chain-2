// pages/index.tsx
import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Image from "next/image";
import logo from "../public/walmart-logo.png";

// Dynamically import client components to ensure server-side rendering
const ParallaxSection = dynamic(() => import("@/components/ParallaxSection"), {
  ssr: false,
});
const CarouselSection = dynamic(() => import("./CarouselSection"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600">
      <main>
        <ParallaxSection>
          <div className="text-center text-white">
            <div className="flex justify-center items-center">
              <Image
                src={logo}
                alt="Walmart Logo"
                width={76} // Adjust width as needed
                height={76} // Adjust height as needed
                className="rounded-md" // Optional styling
              />
              <h1 className="text-6xl font-bold mb-4">SecureID Chain</h1>
            </div>
            <h2 className="text-2xl mb-8">
              Revolutionizing Identity Management with Blockchain Technology
            </h2>
            <Button size="lg">Get Started</Button>
          </div>
        </ParallaxSection>

        <ParallaxSection>
          <CarouselSection />
        </ParallaxSection>

        <ParallaxSection>
          <div className="text-center text-white w-3/5">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl mb-8">
              SecureID Chain uses advanced blockchain technology to create a
              secure, decentralized identity management system. Your personal
              information is encrypted and stored across a distributed network,
              ensuring maximum security and privacy.
            </p>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-purple-600 transition-colors duration-300"
            >
              Learn More
            </Button>
          </div>
        </ParallaxSection>

        <ParallaxSection>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Join the Future of Identity Management
            </h2>
            <p className="text-xl mb-8">
              Be part of the revolution. Secure your identity with blockchain
              technology today.
            </p>
            <Button size="lg">Sign Up Now</Button>
          </div>
        </ParallaxSection>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        © 2024 SecureID Chain. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
