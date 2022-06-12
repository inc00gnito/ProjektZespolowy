import React, { useEffect, useRef, useState } from "react";
import styles from "./Filter.module.scss";
import cx from "classnames";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import Portal from "components/Portal/Portal";

interface IProps {
  list: string[];
  onChange: (values: string[]) => void;
  defaultValue: string;
}

const Filter: React.FC<IProps> = ({ list, onChange, defaultValue }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const anchorEl = useRef<HTMLButtonElement>(null);

  const handleToggleSelect = () => {
    setOpen(!isOpen);
  };

  const closeSelect = () => {
    setOpen(false);
  };

  function removeItemOnce<T>(arr: T[], index: number) {
    if (index > -1) {
      arr.splice(index, 1);
    }
    return [...arr];
  }

  const indexInSelectedOptions = (index: number) =>
    selectedOption.indexOf(index);

  const handleKeyDown = (index: number) => (e: any) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        const indexOfEl = indexInSelectedOptions(index);
        if (indexOfEl === -1) setSelectedOption([...selectedOption, index]);
        else setSelectedOption(removeItemOnce(selectedOption, indexOfEl));
        // setSelectedOption(index);
        setOpen(false);
        break;
      default:
        break;
    }
  };

  //   const handleListKeyDown = (e: any) => {
  //     let newValue;
  //     switch (e.key) {
  //       case "Escape":
  //         e.preventDefault();
  //         setOpen(false);
  //         break;
  //       case "ArrowUp":
  //         e.preventDefault();
  //         newValue = selectedOption - 1;
  //         if (newValue < 0) setSelectedOption(0);
  //         else setSelectedOption(newValue);
  //         break;
  //       case "ArrowDown":
  //         e.preventDefault();
  //         newValue = selectedOption + 1;
  //         if (newValue >= list.length) setSelectedOption(list.length - 1);
  //         else setSelectedOption(newValue);
  //         break;
  //       default:
  //         break;
  //     }
  //   };

  const handleItemClick = (key: number) => {
    const indexOfEl = indexInSelectedOptions(key);
    if (indexOfEl === -1) setSelectedOption([...selectedOption, key]);
    else setSelectedOption(removeItemOnce(selectedOption, indexOfEl));
    setOpen(false);
  };

  useEffect(() => {
    const listArr = selectedOption.map((item) => list[item]);
    onChange(listArr);
  }, [selectedOption]);

  const listString = selectedOption.map((item) => list[item]).join(", ");

  const clear = () => {
    setSelectedOption([]);
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={cx(styles.select, {
          [styles.selectActive]: isOpen,
        })}
      >
        <button
          className={styles.button}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={handleToggleSelect}
          //   onKeyDown={handleListKeyDown}
          aria-describedby="selectError"
          ref={anchorEl}
        >
          <span className={styles.filterItems}>
            {selectedOption.length === 0 ? defaultValue : listString}
          </span>
          {isOpen ? (
            <BsChevronUp className={styles.icon} />
          ) : (
            <BsChevronDown className={styles.icon} />
          )}
        </button>
        {isOpen ? (
          <Portal anchorEl={anchorEl} onClick={closeSelect}>
            <div className={styles.options}>
              <ul
                className={styles.list}
                tabIndex={-1}
                role="listbox"
                data-testid="modal__list"
                aria-activedescendant={listString}
              >
                <li
                  className={styles.item}
                  data-name="option1"
                  tabIndex={0}
                  role="option"
                  //   onKeyDown={() => handleKeyDown(key)}
                  onClick={clear}
                  aria-selected={selectedOption.length === 0}
                >
                  {defaultValue}
                </li>
                {list.map((item, key) => (
                  <li
                    className={styles.item}
                    data-name="option1"
                    tabIndex={0}
                    role="option"
                    onKeyDown={() => handleKeyDown(key)}
                    onClick={() => handleItemClick(key)}
                    aria-selected={listString.includes(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Portal>
        ) : null}
      </div>
    </div>
  );
};

export default Filter;
