import React, { forwardRef } from 'react';
import styles from '../GroupNotes/GroupNotes.module.css';

const GroupNotes = forwardRef((props, ref) => {
  return (
    <>
      <div
        ref={ref.current[props.index] || (ref.current[props.index] = React.createRef())}
        onClick={() => {
          props.displayNotes(props.index);
          props.setVisible({display:'contents'});
        }}
        
        className={`${styles.groupNotes} ${props.clickedGroup === props.index ? styles.backgroundColorPink : styles.backgroundColorBlue}`}
      >
        <p style={{ backgroundColor: props.group.noteColor }} className={styles.noteIcon}>
          {props.group.noteIcon}
        </p>
        <p>{props.group.noteGrpName}</p>
      </div>
      
    </>
  );
});

export default GroupNotes;
