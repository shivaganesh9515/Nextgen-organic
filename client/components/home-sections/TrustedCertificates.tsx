'use client';

export default function TrustedCertificates() {
  const certifications = [
    {
      id: 'npop',
      name: 'National Programme for Organic Production',
      shortName: 'NPOP',
      description: 'India\'s national organic certification program'
    },
    {
      id: 'usda',
      name: 'USDA Organic',
      shortName: 'USDA',
      description: 'United States Department of Agriculture organic standards'
    },
    {
      id: 'jaivik',
      name: 'Jaivik Bharat',
      shortName: 'Jaivik',
      description: 'India\'s new organic logo and standards'
    },
    {
      id: 'iso',
      name: 'ISO 22000',
      shortName: 'ISO',
      description: 'International food safety management standards'
    },
    {
      id: 'fssai',
      name: 'Food Safety and Standards Authority',
      shortName: 'FSSAI',
      description: 'India\'s food safety regulatory body'
    },
    {
      id: 'gap',
      name: 'Good Agricultural Practices',
      shortName: 'GAP',
      description: 'Standards for sustainable farming practices'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted Certifications</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our products meet the highest standards of quality and safety
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow h-full"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-lg">{cert.shortName}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 text-center mb-1">{cert.shortName}</h3>
              <p className="text-xs text-gray-600 text-center">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}