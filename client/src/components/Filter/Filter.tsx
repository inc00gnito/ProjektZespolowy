import React, { useEffect, useRef, useState } from "react";
import styles from "./Filter.module.scss";
import cx from "classnames";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Portal from "components/Portal/Portal";

interface IProps {
  list: string[];
  onChange: (value: string) => void;
  defaultValue: string;
}

const Filter: React.FC<IProps> = ({ list, onChange, defaultValue }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>();

  const handleToggleSelect = () => {
    setOpen(!isOpen);
  };

  const closeSelect = () => {
    setOpen(false);
  };

  const handleKeyDown = (index: number) => (e: any) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        setSelectedOption(index);
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: any) => {
    let newValue;
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (selectedOption === undefined) return;
        newValue = selectedOption - 1;
        if (newValue < 0) setSelectedOption(0);
        else setSelectedOption(newValue);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (selectedOption === undefined) return;
        newValue = selectedOption + 1;
        if (newValue >= list.length) setSelectedOption(list.length - 1);
        else setSelectedOption(newValue);
        break;
      default:
        break;
    }
  };

  const handleItemClick = (key: number) => {
    setSelectedOption(key);
    setOpen(false);
  };

  useEffect(() => {
    if (selectedOption === undefined) return onChange("");
    onChange(list[selectedOption]);
  }, [selectedOption]);

  const clear = () => {
    setSelectedOption(undefined);
    onChange("");
    setOpen(false);
  };

  const anchorEl = useRef<HTMLButtonElement>(null);

  useEffect(() => {}, []);
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
          onKeyDown={handleListKeyDown}
          aria-describedby="selectError"
          ref={anchorEl}
        >
          <span>
            {selectedOption === undefined ? defaultValue : list[selectedOption]}
          </span>
          {isOpen ? (
            <BsChevronUp className={styles.icon} />
          ) : (
            <BsChevronDown className={styles.icon} />
          )}
        </button>

        {isOpen ? (
          <Portal anchorEl={anchorEl} onClick={closeSelect}>
            <div
              className={styles.options}
              onClick={(e) => {
                console.log("clikc child?");
                e.stopPropagation();
              }}
            >
              <ul
                className={styles.list}
                tabIndex={-1}
                role="listbox"
                aria-activedescendant={
                  selectedOption === undefined ? "" : list[selectedOption]
                }
              >
                <li
                  className={styles.item}
                  data-name="option1"
                  tabIndex={0}
                  role="option"
                  // onKeyDown={() => handleKeyDown(key)}
                  onClick={clear}
                  // aria-selected={
                  // !!selectedOption && list?.[selectedOption] === item
                  // }
                >
                  clear
                </li>

                {list.map((item, key) => (
                  <li
                    className={styles.item}
                    data-name="option1"
                    tabIndex={0}
                    role="option"
                    onKeyDown={() => handleKeyDown(key)}
                    onClick={() => handleItemClick(key)}
                    aria-selected={
                      selectedOption !== undefined &&
                      list?.[selectedOption] === item
                    }
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
