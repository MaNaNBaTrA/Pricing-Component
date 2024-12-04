import PricingSlider from '@/components/Price';
export default function Home() {
  return (
    <div className="min-h-screen bg-veryPaleBlue dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className='w-full h-1/2 bg-bgcomponent absolute rounded-bl-[12rem]'>
      <div className='flex flex-col items-center justify-center'>
        <div className='font-manrope font-bold text-3xl absolute top-20'>Simple, traffic-based pricing</div>
        <div className='font-manrope font-semibold text-sm absolute top-32 text-gray-400'>Sign-up for our 30-day trial. No credit card request</div>
      </div>
        <PricingSlider />
      </div>
    </div>
  );
}
