type User = {
  username: string;
  password: string;
  email: string;
  profiledPic: string;
  isAdmin: boolean;
};

type UserDocument = User & { _id: import('mongoose').Types.ObjectId };

type Movie = {
  title: string;
  desc: string;
  img: string;
  imgTitle: string;
  imgSm: string;
  trailer: string;
  video: string;
  year: string;
  limit: number;
  genre: string;
  isSeries: boolean;
};

type List = {
  title: string;
  type: string;
  genre: string;
  content: Array;
};
