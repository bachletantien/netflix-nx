import Featured from '../../components/featured';
import List from '../../components/list';
import Navbar from '../../components/navbar';
import './home.scss';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured type="series" />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Home;
