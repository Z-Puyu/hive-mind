import { NavigateFunction, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useEffect, useState } from "react";
import { onSnapshot, query, collection, orderBy, DocumentData } from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Friends() {
  const [usersData, setUsersData] = useState<DocumentData[]>([]);
  const [email, setEmail] = useState<string>("");
  const [matchedEmails, setMatchedEmails] = useState<string[]>([]);
  
  useEffect(() => onAuthStateChanged(auth, user => {
    if (user) {
      onSnapshot(
        query(
          collection(db, "users"),
        ),
        docsSnap => {
          const currUsers: DocumentData[] = [];
          docsSnap.forEach(doc => currUsers.push({ ...doc.data(), }));
          setUsersData(currUsers);
          //console.log(currUsers);
        },
      )
    }
  }), []);

  const onSearchHandler = (email: string) => {
    let currMatchedEmails:string[] = []; 
    for (const user of usersData) {
      if(user.email.includes(email))
      {
        currMatchedEmails.push(user.email);
      }
    }
    setMatchedEmails(currMatchedEmails);
    console.log(currMatchedEmails);
  }

  return (
    <div>
      <input 
        onChange = {event => setEmail(event.target.value)}
      />
      <button onClick={() => onSearchHandler(email)}>Search</button>
      {matchedEmails.map(data => <p>{data}</p>)}
    </div>
  )
}
