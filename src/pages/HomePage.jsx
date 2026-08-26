import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TalkInput from '../components/TalkInput';
import TalksList from '../components/TalksList';
import { asyncPopulateUsersAndTalks } from '../states/shared/action';
import { asyncAddTalk, asyncToggleLikeTalk } from '../states/talks/action';

function HomePage() {
  const talks = useSelector((state) => state.talks) || [];
  const users = useSelector((state) => state.users) || [];
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndTalks());
  }, [dispatch]);

  const onAddTalk = ({ title, body, category }) => {
    dispatch(asyncAddTalk({ title, body, category }));
  };

  const onLike = (id) => {
    dispatch(asyncToggleLikeTalk(id));
  };

  const talkList = talks.map((talk) => ({
    ...talk,
    user: users.find((user) => user.id === talk.ownerId) || null,
    authUser: authUser ? authUser.id : null,
  }));

  return (
    <section className="home-page">
      {authUser && <TalkInput addTalk={onAddTalk} />}
      <TalksList talks={talkList} like={onLike} />
    </section>
  );
}

export default HomePage;
