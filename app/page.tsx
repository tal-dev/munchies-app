import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-700 flex flex-col px-6 py-8 lg:px-12 lg:py-12">
      <div className="flex-1 flex flex-col max-w-md lg:max-w-2xl w-full mx-auto text-white lg:justify-center">
        <div className="pt-8 lg:pt-0 mb-auto lg:mb-16">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-4xl lg:text-5xl">☕</span>
            <h1 className="text-4xl lg:text-5xl font-normal tracking-tight">Munchies</h1>
          </div>
        </div>
        
        <div className="mb-12 lg:mb-16">
          <h2 className="text-6xl lg:text-8xl font-light mb-6 lg:mb-8 leading-tight tracking-tight">
            Treat<br />yourself.
          </h2>
          <p className="text-emerald-50 text-base lg:text-xl leading-relaxed">
            Find the best restaurants in your city<br />
            and get it delivered to your place!
          </p>
        </div>
        
        <Link 
          href="/restaurants"
          className="block w-full lg:w-auto lg:px-16 py-5 lg:py-6 text-center border-2 border-white rounded-2xl text-white text-lg lg:text-xl font-medium hover:bg-white hover:text-emerald-700 transition-all active:scale-95 shadow-lg"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
