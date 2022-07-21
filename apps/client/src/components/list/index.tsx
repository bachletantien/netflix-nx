// interface ListProps {}
import { useRef, useState } from 'react';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import ListItem from '../listItem';
import './list.scss';

const List = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (direction === 'left' && listRef.current && slideNumber > 0) {
      const distance = listRef.current?.getBoundingClientRect().x - 50;
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === 'right' && listRef.current && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      const distance = listRef.current?.getBoundingClientRect().x - 50;
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowLeft
          onClick={() => handleClick('left')}
          className="icon sliderArrow left"
          style={!isMoved ? { display: 'none' } : {}}
        />
        <div className="container" ref={listRef}>
          <ListItem index={0} />
          <ListItem index={1} />
          <ListItem index={2} />
          <ListItem index={3} />
          <ListItem index={4} />
          <ListItem index={5} />
          <ListItem index={6} />
          <ListItem index={7} />
          <ListItem index={8} />
          <ListItem index={9} />
        </div>
        <ArrowRight
          onClick={() => handleClick('right')}
          className="icon sliderArrow right"
        />
      </div>
    </div>
  );
};

export default List;
