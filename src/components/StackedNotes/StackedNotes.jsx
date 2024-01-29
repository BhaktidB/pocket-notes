import { forwardRef } from "react";
import styles from '../StackedNotes/StackedNotes.module.css'
import GroupNotes from '../GroupNotes/GroupNotes'

const StackedNotes = forwardRef((props, ref) => {

    return (
        <>
            <div className={styles.flexContainer}

            >
                <p className={styles.heading}>Pocket Notes</p>
                <div className={styles.groupNotesConatiner} >
                    {props.grp.map((group, index) =>
                        <GroupNotes key={group} group={group} index={index} ref={ref} displayNotes={props.displayNotes} clickedGroup={props.clickedGroup} setBackBtnClicked={props.setBackBtnClicked} />
                    )}
                </div>
                <button onClick={props.onCreate} className={styles.btn}>
                    +
                </button>
            </div>
        </>
    );
});

export default StackedNotes;
