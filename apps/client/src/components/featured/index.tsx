import './featured.scss';
import { ReactComponent as Play } from '../../assets/play.svg';
import { ReactComponent as Info } from '../../assets/info.svg';
interface FeaturedProps {
  type: string;
}

const Featured = (props: FeaturedProps) => {
  const { type } = props;
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src="../../assets/avatar.webp" alt="" />
      <div className="info">
        <img className="w-[400px]" src="../../assets/imgTitle.webp" alt="" />
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro odio at
          distinctio veritatis vel, aut cum aperiam consequuntur corrupti
          nesciunt.
        </span>
        <div className="buttons">
          <button className="play bg-white text-black">
            <Play className="icon" />
            <span>Play</span>
          </button>
          <button className="more bg-gray text-white">
            <Info className="icon" />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
