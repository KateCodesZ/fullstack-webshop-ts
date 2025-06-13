import Categories from '../components/Categories';
import Hero from '../components/Hero';
import OfferBlock from '../components/OfferBlock';
import Button from '../components/Button';
import OfferImage from '../assets/images/offer glasses.jpg';
import OfferRegImage from '../assets/images/offer reg.jpg';
import NewItems from '../components/NewItems';
import SaleItems from '../components/SaleItems';

const HomePage = () => {
  const handleOfferClick = () => {
    console.log('Navigating to glass section...');
  };

  const handleLoginClick = () => {
    console.log('Navigating to registration / login page...');
  };

  return (
    <main>
      <Hero>
        <Button onClick={handleOfferClick} className="w-full md:w-auto">
          Handla nu
        </Button>
      </Hero>
      <Categories />

      {/* OfferBlock glasses */}
      <OfferBlock
        imageSrc={OfferImage}
        imageAlt="Martini cocktail glasses with blue stems"
        subtitle="ERBJUDANDE"
        title="Glas 50%*"
        description="Upptäck vårt breda utbud av glas för vardag, fest och mysiga familjemiddagar!"
        note="*Gäller t.o.m.  22/12 och kan inte kombineras med andra erbjudanden."
      >
        <Button onClick={handleOfferClick} className="w-full md:w-auto">
          Se erbjudande
        </Button>
      </OfferBlock>

      <NewItems/>
      <SaleItems/>

      {/* Offer block registration */}
      <OfferBlock
        imageSrc={OfferRegImage}
        imageAlt="Two geometric ceramic vasses with floral compositions"
        title="Bli kund idag"
        reverse={true}
      >
        <ul className="list-none text-left px-4 md:px-8 text-gray-700 lg:text-2xl space-y-2">
          <li className="flex items-start">
            <span className="mr-2">✔</span>
            <span>Bonuspoäng</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✔</span>
            <span>Få 10% rabatt på ett kommande köp</span>
          </li>
          <li className="flex items-start mb-6">
            <span className="mr-2">✔</span>
            <span>Exklusiva erbjudanden &amp; spännande nyheter</span>
          </li>
        </ul>
        <Button onClick={handleLoginClick} className="w-full md:w-auto">
          Bli medlem
        </Button>
      </OfferBlock>
    </main>
  );
};

export default HomePage;
