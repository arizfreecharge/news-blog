import styles from "../styles/Home.module.scss";
import Image from "next/image";

export default function Card({ postImg, title, excerpt, timestamp}) {

    return (
        <div className={styles.card}>
            <Image width={350} height={350} src={postImg ? postImg : "/freecharge.png"} alt="" objectFit="cover" />
            <div>
                <p>{title}</p>
                <p>{excerpt}</p>
                <div>
                    <Image width={20} height={20} src="/freecharge.png" alt="" objectFit="contain" />
                    <span>{timestamp}</span>
                </div>
                
            </div>
            <p className={styles.btn}>read more</p>
        </div>
    )
}