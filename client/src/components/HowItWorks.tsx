import React from 'react';
import { useInView } from '../hooks/useInView';
import { 
  Edit3, 
  Play, 
  MessageSquare,
  PenTool
} from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: number;
  inView: boolean;
}

const Step: React.FC<StepProps> = ({ icon, title, description, stepNumber, inView }) => {
  return (
    <div 
      className={`flex flex-col items-center transition-all duration-700 transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${stepNumber * 200}ms` }}
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
          {stepNumber}
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-xs">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const steps = [
    {
      icon: <Edit3 className="h-6 w-6" />,
      title: "Enter a prompt",
      description: "Start by crafting a clear prompt that describes what you want your agent to accomplish."
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Select a tool",
      description: "Choose from available tools like web search, calculator, or custom APIs to enhance your agent."
    },
    {
      icon: <Play className="h-6 w-6" />,
      title: "Click Run",
      description: "Execute your agent with a single click and watch as it processes your instructions."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "View live response",
      description: "See results in real-time as your agent processes information and generates responses."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Building powerful AI agents has never been easier
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Connect line for desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-0" style={{ width: '70%', left: '15%' }}></div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <Step
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                stepNumber={index + 1}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;