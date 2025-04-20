import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ShopEase</h3>
            <p className="text-gray-400">Your one-stop shop for all your shopping needs with the best prices and quality products.</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-gray-400 hover:text-white transition-colors">Home</a></Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Special Offers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-2">Subscribe to get special offers and updates.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none bg-white text-gray-800" 
              />
              <Button className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
