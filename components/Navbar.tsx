"use client";
import { client } from "@/app/web3/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ConnectButton } from "thirdweb/react";
import Image from "next/image";
import logo from "../public/walmart-logo.png";

const Navbar: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-opacity-90 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="Walmart Logo"
              width={40} // Adjust width as needed
              height={40} // Adjust height as needed
              className="rounded-md" // Optional styling
            />
            <Link href="/" className="text-2xl font-bold">
              SecureID Chain
            </Link>
          </div>

          <div className="space-x-4 flex items-center">
            <Link href="/employee-idcard" className="hover:text-gray-300">
              Employee-Card
            </Link>
            <Link href="/tracking" className="hover:text-gray-300">
              Tracking
            </Link>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <ConnectButton client={client} theme={"light"} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
