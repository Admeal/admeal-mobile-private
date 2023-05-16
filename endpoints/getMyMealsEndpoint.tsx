import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mealsListState, userIdState } from "../atoms/dataAtom";

function getMyMealsEndpoint() {
  const [mealsList, setMealsList] = useRecoilState(mealsListState);
  const [userId, setUserId] = useRecoilState(userIdState);
  useEffect(() => {
    fetch("https://admeal-firebase-default-rtdb.firebaseio.com/my_meals.json")
      .then((response) => response.json())
      .then((data) => {
        const array = Object.keys(data).map((key) => {
          return data[key];
        });
        const filteredArray = array.filter((meal) => {
          if (meal.user_id === userId) return meal;
        });
        setMealsList(filteredArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, mealsList]);

  return mealsList;
}

export default getMyMealsEndpoint;
