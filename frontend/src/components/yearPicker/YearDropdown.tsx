import React, { useState, useEffect } from "react";
import { useCombobox } from "downshift";
import { styled } from "../../theme";
import Flex from "../flex/Flex";
import Input from "../input";
import Button from "../button";
import ClearIcon from "../../icons/ClearIcon";
import CaretDownIcon from "../../icons/CaretDownIcon";
import CaretUpIcon from "../../icons/CaretUpIcon";

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => (start + i).toString());

const Ul = styled("ul", {
  maxHeight: 150,
  maxWidth: 300,
  overflowY: "scroll",
  padding: 0,
  margin: 0,
  listStyle: "none",
  position: "absolute",
  top: "calc(100%)",
  width: "100%",
  boxShadow: "0 8px 24px 0 rgb(0 0 0 / 25%)",
  zIndex: "9999",
  backgroundColor: "white",
});

const Li = styled("li", {
  all: "unset",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
  height: "25px",
  userSelect: "none",
  padding: "0.5rem 1.25rem",
  transition: "color .13s ease-in",
  position: "relative",
});

const useItems = (minDate: number, maxDate: number) => {
  const [inputItems, setInputItems] = useState<string[]>([]);

  useEffect(() => {
    const items = range(minDate, maxDate);
    setInputItems(items);
  }, [minDate, maxDate]);

  return [inputItems, setInputItems] as const;
}

const YearDropdown = ({
  minDate,
  maxDate,
  onChange,
  label,
  value,
}: {
  minDate: number;
  maxDate: number;
  onChange: (value: string) => void;
  label: string;
  value: string;
}) => {
  const items = range(minDate, maxDate);
  const [, setInputItems] = useItems(minDate, maxDate);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    selectedItem,
  } = useCombobox({
    items,
    onSelectedItemChange: (changes) => {
      onChange(changes.selectedItem || null);
    },
    onInputValueChange: ({ inputValue }) => {

      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      )
    },
  });

  useEffect(() => {
    if(value !== selectedItem) {
      selectItem(value);
    }
  }, [value, selectItem])
  

  const liBackground = (index: number, item: string) => {
    if (item === selectedItem) {
      return "#2f68e3";
    } else if (highlightedIndex === index) {
      return "#eeeeee";
    }
    return "";
  }

  const liColor = (index: number, item: string) => {
    if (item === selectedItem) {
      return "white";
    } else if (highlightedIndex === index) {
      return "#424242";
    }
    return "";
  }

  return (
    <Flex
      direction={"column"}
      justify={"start"}
      css={{ alignItems: "start", width: "$full", position: "relative" }}
    >
      <Flex
        css={{
          boxShadow: isOpen ? "rgb(49 130 206) 0px 0px 0px 2px" : "rgb(224, 224, 224) 0px 0px 0px 2px",
          borderRadius: "$1px",
          boxSizing: "border-box",
        }}
        {...getLabelProps()}
      >
        <Input
          variant="ghost"
          placeholder={label}
          {...getInputProps()}
        />
        {selectedItem && (
          <Button
            type="button"
            variant={"square"}
            aria-label="clear selection"
            onClick={() => {
              selectItem(null);
            }}
            tabIndex={-1}
          >
            <ClearIcon />
          </Button>
        )}
        {!selectedItem && (
          <Button
            type="button"
            variant={"square"}
            aria-label="toggle menu"
            {...getToggleButtonProps()}
          >
            {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
          </Button>
        )}
      </Flex>
      <Ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <Li
              css={{ background: liBackground(index, item), color: liColor(index, item) }}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </Li>
          ))}
      </Ul>
    </Flex>
  );
};

export default YearDropdown;
