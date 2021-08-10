import React from "react";
import { Toggle } from "components/_uikit";
import Text from "../../../components/Text/Text";
import Flex from "../../../components/Box/Flex";

interface Props {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const ThemeSwitcher: React.FC<Props> = ({ isDark, toggleTheme }) => (
  <Flex justifyContent="space-between" width="100%" mb="10px">    
    <Text color="contrast" mx="4px">
      Theme
    </Text>
    <Toggle
      checked={!isDark}
      scale="md"
      text={isDark ? "Dark" : "Light"}
      onChange={() => {
        toggleTheme(!isDark)
        // if (isDark) {
        //   // toggleTheme(!isDark)
        // } else {
        //   // toggleTheme(isDark)
        // }
      }}
    />
  </Flex>
);

export default React.memo(ThemeSwitcher, (prev, next) => prev.isDark === next.isDark);
