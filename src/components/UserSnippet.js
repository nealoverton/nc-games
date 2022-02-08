import { useNavigate } from "react-router-dom";

export const UserSnippet = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      className="UserSnippet"
      onClick={() => {
        navigate(`/users/${user.username}`);
      }}
    >
      <img
        src={user.avatar_url}
        className="Review__user-details__img"
        alt="The review author's profile picture"
      />
      <p className="Review__user-details__name">{user.username}</p>
    </div>
  );
};
