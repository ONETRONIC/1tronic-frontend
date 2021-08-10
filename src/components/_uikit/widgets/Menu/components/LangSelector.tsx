import React from "react";
import { Toggle } from "components/_uikit";
import Text from "../../../components/Text/Text";
import Flex from "../../../components/Box/Flex";
import { Language } from "../types";

interface Props {
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
}

const LangSelector: React.FC<Props> = ({ currentLang, setLang }) => (
  <Flex justifyContent="space-between" width="100%">    
    <Text color="contrast" mx="4px">
      Language
    </Text>
    <Toggle
      checked={currentLang === 'en'}
      text={currentLang === 'en' ? "En" : "Id"}
      scale="md"
      onChange={() => {
        if (currentLang === 'en') {
          setLang({ locale: 'id-ID', language: 'Bahasa Indonesia', code: 'id' })
        } else {
          setLang({ locale: 'en-US', language: 'English', code: 'en' })
        }
      }}
    />
  </Flex>
);

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang);
