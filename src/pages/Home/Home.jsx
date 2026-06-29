import Banner from "../../components/Banner/Banner";
import useUsers from "../../hooks/useUsers";


const Home = () => {
    const {users} = useUsers();
    console.log(users);
    
    return (
        <>
           <Banner />
            
            <h4>Users{users?.length}</h4>
          
        </>
    );
};

export default Home;