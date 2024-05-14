import React from "react"
import Styles from "./loader.module.scss"

export const Loader = () => {
    return (
        <>
            <div className={Styles.overlay}></div>
            <div className={Styles.loader}></div>
        </>
    )
}