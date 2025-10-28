'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="card prose max-w-none">
        <p className="text-gray-600 mb-6">
          Your privacy is important to us. It is GroceryNext{`'`}s policy to respect your privacy regarding any information we may collect from you across our website and other sites we own and operate.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <h3 className="text-lg font-medium mt-6 mb-3">Personal Information</h3>
        <p className="text-gray-600 mb-4">
          We may collect personal information such as your name, email address, phone number, and delivery address when you register for an account or place an order.
        </p>
        
        <h3 className="text-lg font-medium mt-6 mb-3">Usage Data</h3>
        <p className="text-gray-600 mb-4">
          We may also collect information about how you access and use our website, including your IP address, browser type, pages visited, and time spent on pages.
        </p>
        
        <h3 className="text-lg font-medium mt-6 mb-3">Cookies</h3>
        <p className="text-gray-600 mb-4">
          We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          We use the collected data for various purposes:
        </p>
        <ul className="list-disc pl-8 text-gray-600 mb-4">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To allow you to participate in interactive features of our service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our service</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
        <p className="text-gray-600 mb-4">
          We may share your personal information with:
        </p>
        <ul className="list-disc pl-8 text-gray-600 mb-4">
          <li>Vendors and service providers who assist us in operating our website and fulfilling orders</li>
          <li>Law enforcement or government agencies when required by law</li>
          <li>Third parties in connection with a business transfer, merger, or acquisition</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Retention</h2>
        <p className="text-gray-600 mb-4">
          We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal information to the extent necessary to comply with our legal obligations.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-8 text-gray-600 mb-4">
          <li>Access, update, or delete the information we have on you</li>
          <li>Object to our processing of your personal data</li>
          <li>Request the transfer of your personal data</li>
          <li>Withdraw your consent to the processing of your personal data</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">7. Children{`'`}s Privacy</h2>
        <p className="text-gray-600 mb-4">
          Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
        <p className="text-gray-600 mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the Last Updated date.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-disc pl-8 text-gray-600 mb-4">
          <li>By email: privacy@grocerynext.com</li>
          <li>By phone: +91 98765 43210</li>
          <li>By mail: 123 Market Street, Mumbai, Maharashtra 400001, India</li>
        </ul>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}