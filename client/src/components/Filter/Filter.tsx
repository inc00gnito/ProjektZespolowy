import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import cx from "classnames";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface IProps {
  list: string[];
  onChange: (value: string) => void;
}

const list = ["option1", "option2", "option3"];

const Filter: React.FC<IProps> = ({ list, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  const handleToggleSelect = () => {
    setOpen(!isOpen);
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
        newValue = selectedOption - 1;
        if (newValue < 0) setSelectedOption(0);
        else setSelectedOption(newValue);
        break;
      case "ArrowDown":
        e.preventDefault();
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
    onChange(list[selectedOption]);
  }, [selectedOption]);

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
        >
          <span>{list[selectedOption]}</span>
          {isOpen ? (
            <BsChevronUp className={styles.icon} />
          ) : (
            <BsChevronDown className={styles.icon} />
          )}
        </button>
        {isOpen ? (
          <div className={styles.options}>
            <ul
              className={styles.list}
              tabIndex={-1}
              role="listbox"
              aria-activedescendant={list[selectedOption]}
            >
              {list.map((item, key) => (
                <li
                  className={styles.item}
                  data-name="option1"
                  tabIndex={0}
                  role="option"
                  onKeyDown={() => handleKeyDown(key)}
                  onClick={() => handleItemClick(key)}
                  aria-selected={list[selectedOption] === item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Filter;
