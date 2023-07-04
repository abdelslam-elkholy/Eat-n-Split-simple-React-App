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
  const [friends, setFriends] = useState(initialFriends);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const selectFriend = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    handleFormOpen();
    // setSelectedFriend(friend);
    // selectedFriend ? setSelectedFriend(null) : setSelectedFriend(friend);
  };

  const handleFormOpen = () => setIsFormOpened(!isFormOpened);
  const addFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    handleFormOpen();
  };

  const setBalance = (yourExp, yourFriend, whoPays) => {
    if (yourExp && yourFriend) {
      const allFriends = friends.filter(
        (friend) => friend.id !== selectedFriend.id
      );
      const balance =
        whoPays === "user" ? yourExp - yourFriend : yourFriend - yourExp;
      const editeted = {
        id: selectFriend.id,
        name: selectFriend.name,
        image: selectFriend.image,
        balance: balance,
      };
    }
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectFriend={selectFriend}
          selectedFriend={selectedFriend}
        />

        {isFormOpened && <FormAddFriend addFriend={addFriend} />}
        <Button onClick={handleFormOpen}>
          {isFormOpened ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill selectedFriend={selectedFriend} setBalance={setBalance} />
    </div>
  );
}

function FriendsList({ friends, selectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectFriend={selectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={(e) => selectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !name) return;
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    addFriend(newFriend);
    setImage("https://i.pravatar.cc/48");
    setName("");
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

function FormSplitBill({ selectedFriend, setBalance }) {
  const [bill, setBill] = useState(0);
  const [yourExpenses, setYourExpenses] = useState(0);
  const [whoPays, setWhoPays] = useState("user");
  const diffrence = bill ? bill - yourExpenses : "";

  return (
    selectedFriend && (
      <form
        className="form-split-bill"
        onSubmit={(e) => setBalance(yourExpenses, diffrence, whoPays)}
      >
        <h2>Split a bill with {selectedFriend.name}</h2>

        <label> Bill Value</label>
        <input
          type="number"
          onChange={(e) => setBill(Number(e.target.value))}
        />

        <label> Your Expense</label>
        <input
          type="number"
          onChange={(e) => setYourExpenses(Number(e.target.value))}
        />

        <label> {selectedFriend.name}'s Expenses</label>
        <input type="text" disabled value={diffrence} />

        <label>Who is Paying The Bill</label>
        <select onChange={(e) => setWhoPays(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>

        <Button>Split Bill</Button>
      </form>
    )
  );
}
