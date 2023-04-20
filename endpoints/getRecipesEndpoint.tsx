import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recipeListState } from "../atoms/dataAtom";

function getRecipesEndpoint() {
  const [recipeList, setRecipeList] = useRecoilState(recipeListState);
  useEffect(() => {
    fetch("https://admeal-firebase-default-rtdb.firebaseio.com/recipes.json")
      .then((response) => response.json())
      .then((data) => {
        setRecipeList(data);
        console.log(recipeList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return recipeList;
}

export default getRecipesEndpoint;
