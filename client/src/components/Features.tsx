import React from 'react';
import { useInView } from '../hooks/useInView';
import { 
  Cpu, 
  LayoutGrid, 
  Search, 
  Calculator, 
  MessageSquare 
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const { ref, inView } = useInView({ threshold: 0.1 }) as { ref: any; inView: any; };

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-700 ease-out transform ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1 }) as { ref: any; inView: any; };

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Prompt Composer UI",
      description: "Craft, test and refine LLM prompts with a powerful visual interface that shows results in real-time."
    },
    {
      icon: <LayoutGrid className="h-6 w-6" />,
      title: "Visual Node Canvas",
      description: "Drag and drop components to build complex agent workflows with branching logic and tool integrations."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Web Search Integration",
      description: "Enable your agents to search the web and extract relevant information for more accurate responses."
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Calculation Tools",
      description: "Add computational capabilities to your agents with built-in calculators and data processing tools."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Streaming LLM Responses",
      description: "Watch responses generate in real-time with token-by-token streaming from multiple LLM providers."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 
            ref={ref}
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Powerful Features
          </h2>
          <p 
            className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Everything you need to build, test and deploy intelligent AI agents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;