type TransitionType = "spring" | "tween" | "just" | "keyframes";
const transition = (type: TransitionType, damping: number, stiffness: number) => {
  return { type, damping, stiffness };
};

export default transition;
