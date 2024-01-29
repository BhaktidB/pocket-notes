import React, { useState, useRef,useEffect } from 'react'
import styles from '../HomePage/HomePage.module.css'
import StackedNotes from '../StackedNotes/StackedNotes'
import DisplayNotes from '../DisplayNotes/DisplayNotes'
import Modal from '../Modal/Modal'


const HomePage = () => {

    const [grp, setgrp] = useState([]);
    const [modal, setModal] = useState(false);
    const [displaynote, setDisplaynote] = useState("");
    const [clickedGroup, setClickedGroup] = useState(null);
    const [visible, setVisible] = useState({ display: "none" });
    // const [toggle, setToggle] = useState(false);


    const modalref = useRef();
    const grprefs = useRef([]);

    const closemodale = (e) => {
        if (modalref.current === e.target) {
            setModal(false)
        }
    };
    console.log(grp)
    // useEffect(() => {
        
    //   }, [grp]);

    const displayNotes = (index,newdisplay) => {
        console.log('hello')
        const noteContent = grprefs.current[index].current.textContent;
        setDisplaynote(noteContent);
        setClickedGroup(index);
        setVisible({ display: "contents" ,...newdisplay});

    }

    useEffect(() => {
        console.log("Loading data from localStorage");
        const storedGrp = window.localStorage.getItem("grp");
        if (storedGrp) {
          setgrp(JSON.parse(storedGrp));
        }
      }, []);
      
   
    return (
        <>


            <div className={styles.flexContainer}>
                {modal && <div ref={modalref} onClick={closemodale} className={styles.modal}>
                    <Modal onClose={() => setModal(false)}
                        setgrp={setgrp} grp={grp}
                    />
                </div>}

                <StackedNotes ref={grprefs} grp={grp}
                    onCreate={() => setModal(true)}
                    displayNotes={displayNotes}
                    clickedGroup={clickedGroup}
                    setVisible={setVisible}
                   
                />
                <DisplayNotes grp={grp} clickedGroup={clickedGroup} visible={visible} setVisible={setVisible}
                />
            </div>
        </>
    )
}

export default HomePage