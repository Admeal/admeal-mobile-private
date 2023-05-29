import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mealsListState } from "../atoms/dataAtom";
import useAuth from "../hooks/useAuth";

function getMyMealsEndpoint() {
  const [mealsList, setMealsList] = useRecoilState(mealsListState);

  const { user } = useAuth();

  useEffect(() => {
    fetch("https://admeal-firebase-default-rtdb.firebaseio.com/my_meals.json")
      .then((response) => response.json())
      .then((data) => {
        const array = Object.keys(data).map((key) => {
          return data[key];
        });
        // const filteredArray = array.filter((meal) => {
        //   if (meal.user_id === user?.id) return meal;
        // });

        setMealsList(array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, mealsList]);

  return mealsList;
}

export default getMyMealsEndpoint;
