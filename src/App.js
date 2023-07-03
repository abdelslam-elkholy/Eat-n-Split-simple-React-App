import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  const handleFormOpen = () => setIsFormOpened(!isFormOpened);
  const addFriend = (friend) => setFriends((friends) => [...friends, friend]);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />

        {isFormOpened && <FormAddFriend addFriend={addFriend} />}
        <Button onClick={handleFormOpen}>
          {isFormOpened ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
function FormAddFriend({ addFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = crypto.randomUUID();
  const handleSubmit = () => {
    if (!image || !name) return;
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    addFriend(newFriend);
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label> image url</label>
      <input type="text" value={image} />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with x</h2>

      <label> Bill Value</label>
      <input type="text" />

      <label> Your Expense</label>
      <input type="text" />

      <label> x's Expenses</label>
      <input type="text" disabled />

      <label>Who is Paying The Bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
