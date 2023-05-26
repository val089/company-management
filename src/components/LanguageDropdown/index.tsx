import { useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronDownIcon, ChevronUpIcon } from '@app/assets/icons';
import deFlag from '@app/assets/images/flags/germany.png';
import plFlag from '@app/assets/images/flags/poland.png';
import ruFlag from '@app/assets/images/flags/russia.png';
import ukFlag from '@app/assets/images/flags/uk.png';

import { LanguageItem } from './LanguageItem';

const localeOptions = {
  en: {
    label: 'english',
    flag: ukFlag,
  },
  pl: {
    label: 'polski',
    flag: plFlag,
  },
  ru: {
    label: 'русский',
    flag: ruFlag,
  },
  de: {
    label: 'deutsch',
    flag: deFlag,
  },
};

export type Locale = 'en' | 'pl' | 'ru' | 'de';

export const LanguageDropdown = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [locale, setLocale] = useState<Locale>('en');

  const currentLocale = localeOptions[locale];

  const handleChangeLocale = (option: Locale) => {
    setLocale(option);
    setIsActive(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => setIsActive(!isActive)}>
        <Image source={currentLocale.flag} style={styles.flag} />
        <Text>{currentLocale.label}</Text>
        {isActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </TouchableOpacity>

      <View
        ref={dropdownRef}
        style={[styles.dropdown, isActive ? styles.menuOpened : styles.menuClosed]}>
        <View>
          <FlatList
            data={Object.entries(localeOptions)}
            keyExtractor={localeCode => localeCode[0]}
            renderItem={({ item }) => (
              <LanguageItem
                flag={item[1].flag}
                onPress={() => handleChangeLocale(item[0] as Locale)}
                active={item[0] === locale}>
                {item[1].label}
              </LanguageItem>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  dropdown: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    elevation: 9,
  },
  menuClosed: {
    display: 'none',
  },
  menuOpened: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 180,
    position: 'absolute',
    top: 22,
    zIndex: 6,
    opacity: 1,
    height: 'auto',
  },
  flag: {
    width: 20,
    height: 20,
  },
});
