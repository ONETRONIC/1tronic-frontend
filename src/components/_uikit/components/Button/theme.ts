import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.LG]: {
    height: "48px",
    fontSize: "16px",
    padding: "0 24px",
  },
  [scales.MD]: {
    height: "32px",
    fontSize: "12px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "8px 20px",
    fontSize: "12px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },  
  [scales.XST]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 0px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "background",
    color: "primary",
    border: "1px solid",
    borderColor: "primary",
    ":hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active)":{
      color: "background",
      backgroundColor: "primary",
    }
  },
  [variants.SECONDARY]: {
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "primary",
    boxShadow: "none",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: "tertiary",
    boxShadow: "none",
    color: "primary",
  },
  [variants.SUBTLE]: {
    backgroundColor: "textSubtle",
    color: "backgroundAlt",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "white",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "white",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    color: "primary",
    boxShadow: "none",
  },
  [variants.CONTRAST]: {
    backgroundColor: "transparent",
    color: "background",
    border: "2px solid",
    borderColor: "textDisabled",
    ":hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active)":{
      color: "highlight",
      backgroundColor: "transparent",
      border: "2px solid",
      borderColor: "highlight",
    }
  },
  [variants.PRIMARY_CONTRAST]: {
    backgroundColor: "primary",
    color: "background",
    border: "2px solid",
    borderColor: "primary",
    ":hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active)":{
      color: "primary",
      backgroundColor: "background",
      border: "2px solid",
      borderColor: "primary",
    }
  }
};
