import { useState } from "react";
import styles from "../Modal/Modal.module.css";

const Modal = (props) => {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const [groupname, setgroupname] = useState("");
  const [iconname, seticonname] = useState("");
  const [grpcolor, setgrpcolor] = useState("");


  const handlechange = (e) => {
    const inputGroupName = e.target.value;
    setgroupname(inputGroupName);
    seticonname(
      inputGroupName
        .split(" ")
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
    );
  };

  const changecolor = (color) => {
    console.log("Selected color:", color);
    setgrpcolor(color);
  };


  const creategrp = () => {
    if (groupname && grpcolor) {
      const updatedGrp = [...props.grp, { noteIcon: iconname, noteGrpName: groupname, noteColor: grpcolor }];

      console.log("Saving data to localStorage");
      window.localStorage.setItem("grp", JSON.stringify(updatedGrp));

      props.setgrp(updatedGrp);

      setgroupname("");
      seticonname("");
      setgrpcolor("");

      props.onClose();
    }
  };

  return (
    <>
      <div className={styles.createnewgrppop}>
        <p style={{ fontSize: 'larger' }}>Create New group</p>
        <div className={styles.flexItem}>
          <p>Group Name</p>
          <input className={styles.inputModal}
            type="text"
            name="groupname"
            id="groupname"
            placeholder="Enter group name"
            value={groupname}
            onChange={(e) => handlechange(e)}
          />
        </div>

        <div className={styles.flexItem}>
          <p>Choose colour</p>
          {colors.map((colorItem) => {
            return <div key={colorItem} onClick={() => changecolor(colorItem)} style={{ backgroundColor: colorItem }} className={styles.red}></div>

          })}

        </div>
        <button onClick={creategrp} className={styles.modalbtn}>Create</button>

      </div>
    </>
  );
};

export default Modal;
