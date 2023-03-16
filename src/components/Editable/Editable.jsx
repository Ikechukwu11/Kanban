import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Editable.css";
const Editable = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="editable">
      {showEdit ? (
        <form
          className="editable_edit"
          onSubmit={(e) => {
            e.preventDefault();

            if (props.onSubmit) props.onSubmit(inputValue);
            setShowEdit(false)
            setInputValue("")
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={props.placeholder || "Enter Name"}
            required
          />
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <AiOutlineClose onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        <p className="editable_toggle" onClick={() => setShowEdit(true)}>
          {props.text || "Add item"}
        </p>
      )}
    </div>
  );
};

export default Editable;
