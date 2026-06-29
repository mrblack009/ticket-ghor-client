import Banner from "../../components/Banner/Banner";
import useUsers from "../../hooks/useUsers";
import AllTickets from "../AllTicketPages/AllTicketPages";


const Home = () => {
    const {users} = useUsers();
    console.log(users);
    
    return (
        <>
           <Banner />
            
            
            <AllTickets />
          
        </>
    );
};

export default Home;