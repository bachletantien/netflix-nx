import React, { useState } from 'react';
import './listItem.scss';
import { ReactComponent as Add } from '../../assets/add.svg';
import { ReactComponent as Like } from '../../assets/thumb-up.svg';
import { ReactComponent as Unlike } from '../../assets/thumb-down.svg';
import { ReactComponent as Play } from '../../assets/play.svg';

interface ListItemProps {
  index: number;
}

const ListItem = ({ index }: ListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761';
  return (
    <div
      className="listItem"
      style={{ left: `${isHovered && index * 225 - 50 + index * 2.5 + 'px'}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src="../../assets/imgItem.jpg" alt="" />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <Play className="icon" />
              <Add className="icon" />
              <Like className="icon" />
              <Unlike className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+16</span>
              <span>1999</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium hic rem eveniet error possimus, neque ex doloribus.
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
