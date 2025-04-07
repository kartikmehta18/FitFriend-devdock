
import { Link } from "react-router-dom";
import { Dumbbell, Twitter, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Dumbbell className="h-6 w-6 text-fitfriend-blue" />
              <span className="font-bold text-xl">
                <span className="text-fitfriend-blue">Fit</span>
                <span className="text-fitfriend-purple">Friend</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect with fitness partners, access personalized workout plans, and track your health metrics all in one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-fitfriend-blue transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-fitfriend-blue transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-fitfriend-blue transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-fitfriend-blue transition">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6">Product</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Workouts
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/health-calculator" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Health Calculator
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-fitfriend-blue transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6">Subscribe</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get the latest news and articles to your inbox every month.
            </p>
            <div className="flex flex-col space-y-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-md"
              />
              <Button className="bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FitFriend. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 text-sm hover:text-fitfriend-blue transition">
              Privacy
            </Link>
            <Link to="/terms" className="text-gray-600 dark:text-gray-400 text-sm hover:text-fitfriend-blue transition">
              Terms
            </Link>
            <Link to="/cookies" className="text-gray-600 dark:text-gray-400 text-sm hover:text-fitfriend-blue transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
