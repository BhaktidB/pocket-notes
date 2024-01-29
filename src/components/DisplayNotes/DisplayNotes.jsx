import styles from '../DisplayNotes/DisplayNotes.module.css'
import React, { useEffect, useState } from 'react'


const DisplayNotes = (props) => {
    const [submittedTexts, setSubmittedTexts] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [chat, setchat] = useState("");


    useEffect(()=>{
        const storedSubmittedTexts = localStorage.getItem("submittedTexts");
        if (storedSubmittedTexts) {
          setSubmittedTexts(JSON.parse(storedSubmittedTexts));
        }
      }, []);


    const handleTextsChange = (e) => {
        if (e.target.value === "") {
            return setDisabled(true);
        }
        setchat(e.target.value);
        setDisabled(false);
    };
    


    const handleNoteSubmission = () => {
        if (chat.trim() !== "" && props.clickedGroup !== null) {
            const currentDate = new Date();
            const formattedTime = currentDate.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
            });
            const options = { day: "numeric", month: "short", year: "numeric" };
            const formattedDate = currentDate.toLocaleDateString(undefined, options);
    
            const newSubmittedText = {
                text: chat,
                timec: formattedTime,
                datec: formattedDate,
                groupIndex: props.clickedGroup,
            };
    
            setSubmittedTexts((prevTexts) => [...prevTexts, newSubmittedText]);
    
            // Corrected code: use setSubmittedTexts instead of submittedTexts
            localStorage.setItem("submittedTexts", JSON.stringify([...submittedTexts, newSubmittedText]));
    
            setchat(""); // Clear the input after submission
            setDisabled(true);
        }
    };
    
    

    const handleKeyDown = (e) => {
        // Check if the pressed key is Enter
        if (e.key === "Enter") {
            e.preventDefault();
            handleNoteSubmission();
        } else if (e.key === "Backspace") {
            e.preventDefault();

            // Implement your custom backspace logic
            const updatedChat = chat.slice(0, -1); // Remove the last character
            setchat(updatedChat);        }
    };

 

    return (
        <>
            <div 
            className={styles.flexContainer} 
            // style={props.visible}
            // style={{display: props.visible?{display:'contents'}:{display:'flex'}}}
            >

                {/* onclick the grp  */}
                {props.clickedGroup !== null ? (
                    <div className={styles.sidebar}>


                            {/* Heading */}
                        <div 
                        className={styles.flex1}
                        style={{
                            width: '-webkit-fill-available',
                            padding: '1px 14px',
                            backgroundColor: '#001F8B',
                            color: '#FFFFFF'
                        }}>
                            <img src="/svgs/backBtn.svg" alt="back" 
                            className={styles.backBtn}
                            // style={{display: 'none'}}
                            onClick={() => {
                                props.setVisible({ display: "none" });
                            }}

                            />
                            <div className={styles.groupNotes}>
                                <p style={{ backgroundColor: props.grp[props.clickedGroup].noteColor }} className={styles.noteIcon}>
                                    {props.grp[props.clickedGroup].noteIcon}</p>
                                <p>{props.grp[props.clickedGroup].noteGrpName}</p>
                            </div>

                        </div>



                            {/* Display submitted texts for the selected group */}
                        <div className={styles.flex2}>
                            <ul className={styles.ulcard}>
                                {submittedTexts
                                    .filter((text) => text.groupIndex === props.clickedGroup)
                                    .map((text, index) => (
                                        <li className={styles.licard}
                                            key={index}>
                                            <span className={styles.chatli}>{text.text}</span> <br />
                                            <p className={styles.date}>
                                            {text.datec} ● {text.timec}
                                            </p>
                                        </li>
                                    ))}
                            </ul>
                        </div>



                            {/* Add notes input*/}
                        <div className={styles.flex3}>
                            <textarea 
                                onKeyDown={(e) => handleKeyDown(e)}
                                onChange={(e) => handleTextsChange(e)}
                                type="text"
                                value={chat}
                                className={styles.sendInput}
                                placeholder='Enter your text here...........'>
                            </textarea>
                            <img
                            src={disabled?'/svgs/disabledSend.svg':'/svgs/enabledSend.svg'}
                                style={disabled ? {cursor: "not-allowed" } : {}}
                                onClick={handleNoteSubmission}
                                className={styles.sendBtn}
                            />
                                
                        </div>
                    </div>
                ) : 
                
                // ....................................................
                <>
                    <img className={styles.heroBg} src="/images/heroBg.png" alt="Pocket notes" />
                    <p>Pocket Notes</p>
                    <p>Send and receive messages without keeping your phone online.
                    </p>
                    <p> Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
                    </p>

                    <footer className={styles.notesFooter}>
                        <img className={styles.encryptedSvg} src="/svgs/lock.svg" alt="encrypted" />
                        <span>end-to-end encrypted</span>
                    </footer>
                </>
                }
            </div>
            
        </>
    )
}

export default DisplayNotes