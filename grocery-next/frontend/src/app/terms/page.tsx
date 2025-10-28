'use client';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
      
      <div className="card prose max-w-none">
        <p className="text-gray-600 mb-6">
          Welcome to GroceryNext. These terms and conditions outline the rules and regulations for the use of GroceryNext{`'`}s website and services.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p className="text-gray-600 mb-4">
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use GroceryNext if you do not agree to all of the terms and conditions stated on this page.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. Intellectual Property Rights</h2>
        <p className="text-gray-600 mb-4">
          Unless otherwise stated, GroceryNext and/or its licensors own the intellectual property rights for all material on GroceryNext. All intellectual property rights are reserved.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. Restrictions</h2>
        <p className="text-gray-600 mb-4">
          You are specifically restricted from all of the following:
        </p>
        <ul className="list-disc pl-8 text-gray-600 mb-4">
          <li>Publishing any website material in any other media</li>
          <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
          <li>Using this website in any way that is or may be damaging to this website</li>
          <li>Using this website in any way that impacts user access to this website</li>
          <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">4. Your Content</h2>
        <p className="text-gray-600 mb-4">
          In these website standard terms and conditions, Your Content shall mean any audio, video, text, images or other material you choose to display on this website. By displaying Your Content, you grant GroceryNext a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">5. No Warranties</h2>
        <p className="text-gray-600 mb-4">
          This website is provided as is, with all faults, and GroceryNext expresses no representations or warranties, of any kind related to this website or the materials contained on this website.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          In no event shall GroceryNext, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">7. Indemnification</h2>
        <p className="text-gray-600 mb-4">
          You hereby indemnify to the fullest extent GroceryNext from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these terms.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">8. Severability</h2>
        <p className="text-gray-600 mb-4">
          If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">9. Variation of Terms</h2>
        <p className="text-gray-600 mb-4">
          GroceryNext is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">10. Assignment</h2>
        <p className="text-gray-600 mb-4">
          GroceryNext is allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">11. Entire Agreement</h2>
        <p className="text-gray-600 mb-4">
          These terms constitute the entire agreement between GroceryNext and you in relation to your use of this website, and supersede all prior agreements and understandings.
        </p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">12. Governing Law & Jurisdiction</h2>
        <p className="text-gray-600 mb-4">
          These terms will be governed by and interpreted in accordance with the laws of the State of Maharashtra, India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Maharashtra for the resolution of any disputes.
        </p>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}