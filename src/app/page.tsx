import PricingSlider from '@/components/Price';

export default function Home() {
  return (
    <div className="min-h-screen bg-veryPaleBlue  text-gray-900 dark:bg-[#1e1c1c] cursor-default">
      <div className="w-full h-1/2 bg-bgcomponent dark:bg-[#424547] absolute rounded-bl-[12rem]">
        <div className="flex flex-col items-center justify-center relative mb-8 mx-4 text-center">
          <img src="/pattern-circles.svg" alt="Pattern" className="absolute top-10" />
          <div className="font-manrope font-bold xs:text-3xl absolute top-20 dark:text-white text-nowrap text-2xl ">
            Simple, traffic-based pricing
          </div>
          <div className="font-manrope font-semibold text-sm absolute top-32 text-grayishBlue dark:text-gray-400 xs:text-nowrap text-wrap">
            Sign-up for our 30-day trial. No credit card request
          </div>
        </div>
        <PricingSlider />
      </div>
    </div>
  );
}