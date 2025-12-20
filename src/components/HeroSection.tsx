import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-leather.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
          Maroquinerie d'Exception
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl text-gray-200">
          Découvrez notre collection artisanale de sacs, bijoux et lunettes
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/" 
            className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Découvrir la collection
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Notre histoire
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;