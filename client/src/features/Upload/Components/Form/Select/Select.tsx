import React, { useEffect, useState } from "react";
import styles from "./Select.module.scss";
import cx from "classnames";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface IProps {
  field: ControllerRenderProps<FieldValues, any>;
  error: string | undefined;
  list: { id: number; name: number | string; value: string }[];
}

const Select: React.FC<IProps> = ({ field, error, list }) => {
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
    field.onChange(list[selectedOption].name);
  }, [selectedOption]);

  return (
    <div className={styles.container}>
      <div
        className={cx(styles.select, {
          [styles.selectActive]: isOpen,
          [styles.selectError]: !!error,
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
          <span>{list[selectedOption].value}</span>
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
              aria-activedescendant={list[selectedOption].value}
            >
              {list.map((item, key) => (
                <li
                  className={styles.item}
                  data-name="option1"
                  tabIndex={0}
                  key={item.id}
                  role="option"
                  onKeyDown={() => handleKeyDown(key)}
                  onClick={() => handleItemClick(key)}
                  aria-selected={list[selectedOption].name === item.name}
                >
                  {item.value}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {error ? (
        <p className={styles.error} id="selectError" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Select;
