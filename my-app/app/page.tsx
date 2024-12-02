"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaArrowRight, FaGift, FaTruck, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  image?: string;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const promotions = [
    {
      title: "Winter Sale!",
      description: "Up to 50% off on selected items",
      bgColor: "from-orange-500 to-pink-500",
    },
    {
      title: "Free Shipping",
      description: "On orders over $100",
      bgColor: "from-blue-500 to-purple-500",
    },
    {
      title: "New Arrivals",
      description: "Check out our latest collection",
      bgColor: "from-green-500 to-teal-500",
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/categories"
        );
        setCategories(data.categories);
        console.log(categories)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    const timer = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const categoriesSection = document.getElementById('categories-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    try {
      // Simulated API call for newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionMessage("Thanks for subscribing! Check your email for the discount code.");
      setEmail("");
    } catch (error) {
      setSubscriptionMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setSubscriptionMessage(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section with Dynamic Promotion Banner */}
      <div className="relative">
        <div
          className={`w-full bg-gradient-to-r ${promotions[currentPromoIndex].bgColor} transition-all duration-500`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                {promotions[currentPromoIndex].title}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {promotions[currentPromoIndex].description}
              </p>
              <button
                onClick={scrollToCategories}
                className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Shop Now <FaArrowRight className="ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-4 justify-center"
            >
              <FaTruck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Free Express Shipping
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  On orders over $100
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4 justify-center"
            >
              <FaGift className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Special Gift Cards
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Give the perfect gift
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4 justify-center"
            >
              <FaClock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  24/6 Customer Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Here to help anytime
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4"
          >
            Explore Our Collections
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Discover quality products across our diverse categories
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/products/${category.name}`}
                className="group block relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
              <div  className="w-50 h-80">
  <img
    src={category.image}
    alt={category.name}
className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"  />
</div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 mb-4">Explore Collection</p>
                    <span className="inline-flex items-center text-sm font-semibold text-white">
                      Shop Now{" "}
                      <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl font-extrabold mb-4">Special Offer!</h2>
              <p className="text-xl mb-6">
                Get 20% off your first purchase when you sign up for our
                newsletter
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg dark:text-white  text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubscribing}
                    className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
                {subscriptionMessage && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-0 text-sm text-white"
                  >
                    {subscriptionMessage}
                  </motion.p>
                )}
              </form>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                100k+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Happy Customers
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                50+
              </div>
              <div className="text-gray-600 dark:text-gray-300">Brands</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                5k+
              </div>
              <div className="text-gray-600 dark:text-gray-300">Products</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                4.8
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Average Rating
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
