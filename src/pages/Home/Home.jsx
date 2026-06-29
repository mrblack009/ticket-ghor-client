import Banner from "../../components/Banner/Banner";
import TicketSearchBanner from "../../components/TicketSearch/TicketSearchBanner";
import useUsers from "../../hooks/useUsers";
import AdvertisementSectionSection from "../AdvertisementSection/AdvertisementSection";

import AllTickets from "../AllTicketPages/AllTicketPages";
import LatestTickets from "../LatestTickets/LatestTickets";
import PopularRoutes from "../PopularRoutes/PopularRoutes";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const Home = () => {
  const { users } = useUsers();
  console.log(users);

  return (
    <>
      <div className="relative mb-24">
        <Banner />
        <div className="md:absolute md:-bottom-20 md:z-10 md:left-1/2 md:-translate-x-1/2">
          <TicketSearchBanner />
        </div>
      </div>

      <AllTickets />

      <AdvertisementSectionSection />

      <LatestTickets />

      <PopularRoutes />

      <WhyChooseUs />
    </>
  );
};

export default Home;
