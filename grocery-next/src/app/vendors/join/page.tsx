'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import GlassyButton from '../../../components/ui/GlassyButton';
import { Stepper } from '../../../components/ui/Stepper';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { CheckCircle, Users, DollarSign, Leaf } from 'lucide-react';

export default function JoinVendorsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Business Information
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    businessType: '',
    
    // Step 2: Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Step 3: Business Details
    gstNumber: '',
    businessLicense: '',
    organicCertification: '',
    yearsInBusiness: '',
    
    // Step 4: Payment Setup
    bankAccountNumber: '',
    ifscCode: '',
    upiId: '',
    
    // Step 5: Additional Information
    message: '',
  });

  const steps = [
    { id: '1', title: 'Business Info' },
    { id: '2', title: 'Address' },
    { id: '3', title: 'Business Details' },
    { id: '4', title: 'Payment Setup' },
    { id: '5', title: 'Additional Info' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log('Form submitted:', formData);
    
    // Show success animation
    alert('Thank you for your interest! We will contact you soon.');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title="Join Our Organic Vendor Network" 
          subtitle="Partner with OrganicNext to reach more health-conscious customers and grow your organic business"
        />
        
        {/* Animated Stepper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Stepper steps={steps} currentStep={currentStep} />
        </motion.div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Business Information */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Business Name"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => updateFormData('businessName', e.target.value)}
                  />
                  
                  <Input
                    label="Owner Name"
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => updateFormData('ownerName', e.target.value)}
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                  />
                  
                  <Input
                    label="Business Type"
                    type="text"
                    placeholder="e.g., Organic Farm, Organic Store, Organic Bakery"
                    required
                    value={formData.businessType}
                    onChange={(e) => updateFormData('businessType', e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Input
                  label="Full Address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="City"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                  />
                  
                  <Input
                    label="State"
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                  />
                  
                  <Input
                    label="Pincode"
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => updateFormData('pincode', e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Business Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="GST Number"
                    type="text"
                    placeholder="e.g., 22AAAAA0000A1Z5"
                    value={formData.gstNumber}
                    onChange={(e) => updateFormData('gstNumber', e.target.value)}
                  />
                  
                  <Input
                    label="Business License Number"
                    type="text"
                    value={formData.businessLicense}
                    onChange={(e) => updateFormData('businessLicense', e.target.value)}
                  />
                  
                  <Input
                    label="Organic Certification"
                    type="text"
                    placeholder="e.g., NPOP, USDA Organic, Jaivik Kheti"
                    required
                    value={formData.organicCertification}
                    onChange={(e) => updateFormData('organicCertification', e.target.value)}
                  />
                  
                  <Input
                    label="Years in Business"
                    type="number"
                    min="0"
                    value={formData.yearsInBusiness}
                    onChange={(e) => updateFormData('yearsInBusiness', e.target.value)}
                  />
                </div>
                
                {/* Document Upload (Simplified for demo) */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-gray-600 mb-2">Drag and drop organic certification documents here</p>
                    <p className="text-sm text-gray-500 mb-4">or</p>
                    <Button type="button" variant="outline">Browse Files</Button>
                    <p className="text-xs text-gray-500 mt-2">Supports: PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment Setup */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Bank Account Number"
                    type="text"
                    placeholder="e.g., 123456789012"
                    value={formData.bankAccountNumber}
                    onChange={(e) => updateFormData('bankAccountNumber', e.target.value)}
                  />
                  
                  <Input
                    label="IFSC Code"
                    type="text"
                    placeholder="e.g., HDFC0000123"
                    value={formData.ifscCode}
                    onChange={(e) => updateFormData('ifscCode', e.target.value)}
                  />
                  
                  <Input
                    label="UPI ID (Optional)"
                    type="text"
                    placeholder="e.g., yourname@upi"
                    value={formData.upiId}
                    onChange={(e) => updateFormData('upiId', e.target.value)}
                  />
                </div>
                
                {/* Animated Payment Card Visual */}
                <motion.div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm opacity-80">OrganicNext Vendor Card</p>
                      <h3 className="text-xl font-bold mt-1">**** **** **** 1234</h3>
                      <p className="mt-4">Account Holder: {formData.businessName || 'Your Business'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-80">Valid Thru</p>
                      <p className="font-bold">12/28</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm opacity-80">Bank</p>
                      <p className="font-bold">OrganicNext Payments</p>
                    </div>
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 5: Additional Information */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={4}
                    className="input-field w-full"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    placeholder="Tell us more about your organic business and why you'd like to join our platform..."
                  />
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Next Steps After Registration</h4>
                  <ul className="list-disc pl-5 space-y-1 text-green-700 text-sm">
                    <li>Our team will review your application within 3-5 business days</li>
                    <li>You will receive an email with account setup instructions</li>
                    <li>Complete your organic product catalog setup</li>
                    <li>Start selling on our platform!</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <GlassyButton type="submit">
                  Register as Organic Vendor
                </GlassyButton>
              )}
            </div>
          </form>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Benefits of Joining OrganicNext</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Organic Focus</h4>
              <p className="text-gray-600 text-sm">
                Connect with health-conscious customers specifically looking for organic products
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Zero Listing Fees</h4>
              <p className="text-gray-600 text-sm">
                No upfront costs to list your organic products on our platform
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Large Customer Base</h4>
              <p className="text-gray-600 text-sm">
                Access to thousands of customers actively seeking organic products
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Marketing Support</h4>
              <p className="text-gray-600 text-sm">
                Dedicated marketing and SEO support to grow your organic business
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}