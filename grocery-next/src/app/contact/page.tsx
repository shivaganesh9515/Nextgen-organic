'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';
import GlassyButton from '../../components/ui/GlassyButton';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader 
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Contact Information */}
        <div>
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg text-primary-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Our Office</h3>
                  <p className="mt-1 text-gray-600">
                    123 Grocery Street<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg text-primary-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">+91 98765 43210</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Mon-Fri 8am-8pm, Sat-Sun 9am-6pm</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg text-primary-600">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">support@grocerynext.com</p>
                  <p className="mt-1 text-gray-600">partnerships@grocerynext.com</p>
                </div>
              </div>
            </div>
            
            {/* Animated Map */}
            <motion.div 
              className="mt-8 rounded-xl overflow-hidden h-64 bg-gradient-to-br from-blue-50 to-green-50 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary-500 mx-auto mb-2" />
                  <p className="font-medium text-gray-900">Our Location</p>
                  <p className="text-sm text-gray-600">Mumbai, India</p>
                </div>
              </div>
              
              {/* Animated pins */}
              <motion.div
                className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              />
              <motion.div
                className="absolute top-2/3 left-2/3 w-4 h-4 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitStatus === 'success' ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : submitStatus === 'error' ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h3>
                <p className="text-gray-600">
                  There was an error sending your message. Please try again.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your message..."
                  />
                </div>
                
                <div>
                  <GlassyButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 mr-2"
                        >
                          <Send className="h-4 w-4" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </GlassyButton>
                </div>
              </form>
            )}
          </div>
          
          {/* Social Media Links */}
          <div className="mt-8 bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-white/20">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', icon: 'f' },
                { name: 'Twitter', icon: 't' },
                { name: 'Instagram', icon: 'i' },
                { name: 'LinkedIn', icon: 'in' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className="font-semibold">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}