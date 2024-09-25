import Image from 'next/image';
import { ProvidersLogo } from '@/types/types';

interface ProvidersLogoProps {
  providersLogo: ProvidersLogo[]
}

const ListLogoProviders = ({ providersLogo }: ProvidersLogoProps) => {
  const imgURL = process.env.NEXT_PUBLIC_LOGO_PROVIDER;

  return(
    <div className="flex flex-col gap-2 col-start-2 col-end-4 ml-2 mb-8 lg:justify-end lg:ml-0">
      <h3 className="font-bold text-xs">
              Disponible en
      </h3>
      <div className="flex gap-2 lg:gap-4">
        {
          providersLogo.filter((logo) => logo.logo_path !== null).map((logo) => {
            return (
              <Image src={`${imgURL + logo.logo_path}`}
                alt={`Logo de ${logo.provider_name}`}
                key={logo.logo_path}
                width={40}
                height={40}
                priority
              />
            );
          }).slice(0, 3)
        }
      </div>
    </div>
  );
};

export default ListLogoProviders;