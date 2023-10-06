type ShadowProps = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
};

const walletProfileShadow: ShadowProps = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 9
  },
  shadowOpacity: 0.48,
  shadowRadius: 11.95,

  elevation: 18,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24
};

const nftShadow: ShadowProps = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5
  },
  shadowOpacity: 0.36,
  shadowRadius: 5.68,

  elevation: 11
};

const mealCardShadow: ShadowProps = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5
  },
  shadowOpacity: 0.26,
  shadowRadius: 3.18,

  elevation: 4
};

const shadow4: ShadowProps = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 9
  },
  shadowOpacity: 0.48,
  shadowRadius: 11.95,

  elevation: 18,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24
};

const shadows = { walletProfileShadow, nftShadow, mealCardShadow, shadow4 };

export default shadows;
