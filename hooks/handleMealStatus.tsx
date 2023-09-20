const handleMealStatus = (mealStatus: MealStatusProps, meal: MealProps) => {
  switch (mealStatus) {
    case "COMPLETE":
      return `you have earned ${meal?.tokens_earned} tokens!`;
    case "INVALID":
      return "Your photos weren’t approved.  Probably your uploaded wrong photos.";
    case "AWAITING_VALIDATION":
    case "INCOMPLETE":
      return "We’re checking your photos. You’ll receive your reward soon!";
    default:
      return "";
  }
};

export default handleMealStatus;
