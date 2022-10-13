import React from "react";
import Card from "./Card";
import contacts from "../contacts";

function createCard(contact) {
  return (
    <Card
      key={contact.id}
      id={contact.id}
      name={contact.name}
      img={contact.imgURL}
      phone={contact.phone}
      email={contact.email}
    />
  );
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>

      {contacts.map(createCard)} 
      {/* we can also use contacts.map(contact => (<Card key={contact.id} id={contact.id} name={contact.name} img={contact.imgURL} phone={contact.phone} email={contact.email} />)) */}
    </div>
  );
}

export default App;
