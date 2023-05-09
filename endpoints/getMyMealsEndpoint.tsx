import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mealsListState } from "../atoms/dataAtom";

function getMyMealsEndpoint() {
  const [mealsList, setMealsList] = useRecoilState(mealsListState);
  useEffect(() => {
    fetch("https://admeal-firebase-default-rtdb.firebaseio.com/my_meals.json")
      .then((response) => response.json())
      .then((data) => {
        setMealsList(data);
        console.log("mealsList", mealsList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return mealsList;
}

export default getMyMealsEndpoint;
