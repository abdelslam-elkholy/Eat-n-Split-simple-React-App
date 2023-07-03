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

  const handleFormOpen = () => setIsFormOpened(!isFormOpened);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button onClick={handleFormOpen}>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
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
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label> Friend name</label>
      <input type="text" />

      <label> image url</label>
      <input type="text" />

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
