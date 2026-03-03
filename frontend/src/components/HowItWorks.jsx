import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: '📝',
      title: 'Report Issue',
      description: 'Submit details about the public infrastructure issue you encountered'
    },
    {
      icon: '👀',
      title: 'Track Progress',
      description: 'Monitor the status of your reported issue in real-time'
    },
    {
      icon: '✅',
      title: 'See Resolution',
      description: 'Get notified when the issue is resolved by authorities'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;