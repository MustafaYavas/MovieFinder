import styles from './Alert.module.css';
import ReactDOM from "react-dom";

const AlertOverlay = (props) => {
    return (
        <div className={styles["parent-content"]}>
            <div className={styles["child-content"]}>
                {props.message}
            </div>
        </div>
    )
}

const Alert = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<AlertOverlay message={props.message} />, document.getElementById("overlays"))}
        </>
    )
}

export default Alert;
