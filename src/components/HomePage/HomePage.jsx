import React, { useState, useRef, useEffect } from 'react'
import styles from '../HomePage/HomePage.module.css'
import StackedNotes from '../StackedNotes/StackedNotes'
import DisplayNotes from '../DisplayNotes/DisplayNotes'
import Modal from '../Modal/Modal'


const HomePage = () => {

    const [grp, setgrp] = useState([]);
    const [modal, setModal] = useState(false);
    const [displaynote, setDisplaynote] = useState("");
    const [clickedGroup, setClickedGroup] = useState(null);


    const modalref = useRef();
    const grprefs = useRef([]);

    const closemodale = (e) => {
        if (modalref.current === e.target) {
            setModal(false)
        }
    };
    console.log(grp)


    const displayNotes = (index) => {
        console.log('hello')
        const noteContent = grprefs.current[index].current.textContent;
        setDisplaynote(noteContent);
        setClickedGroup(index);
    }

    useEffect(() => {
        console.log("Loading data from localStorage");
        const storedGrp = window.localStorage.getItem("grp");
        if (storedGrp) {
            setgrp(JSON.parse(storedGrp));
        }
    }, []);

    let [backBtnClicked, setBackBtnClicked] = useState(false);
    console.log('not rendered', backBtnClicked);


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
                    setBackBtnClicked={setBackBtnClicked}
                />
                <DisplayNotes grp={grp} clickedGroup={clickedGroup} setBackBtnClicked={setBackBtnClicked} backBtnClicked={backBtnClicked}
                />
            </div>
        </>
    )
}

export default HomePage