import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userListState } from "../atoms/dataAtom";

function getUserEndpoint() {
  const [userList, setUserList] = useRecoilState(userListState);
  useEffect(() => {
    fetch("https://admeal-firebase-default-rtdb.firebaseio.com/users.json")
      .then((response) => response.json())
      .then((data) => {
        const array = Object.keys(data).map((key) => {
          return data[key];
        });
        setUserList(array);
        console.log(userList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return userList;
}

export default getUserEndpoint;
