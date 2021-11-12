import Image from "next/image"
import styles from "../styles/Home.module.scss";
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {

    console.log(useRouter().pathname);
    const pathName = useRouter().pathname;
    const [activePage,] = useState((pathName !== "/news") ? "news" : "blogs");
  
    return (
        
        <nav className={styles.header}>
            <Link href={`/`}>
                <a>
                <Image width={185} height={80} src="/blogIcon.jpeg" objectFit="contain" alt=""/>
                </a>
            </Link>
            
            <div className={styles.navigation}>
                <Link href="/news">
                    <a className={activePage === "blogs" ? styles.activate : " "}>
                        news
                    </a>
                </Link>
                <Link href={"/"}>
                    <a className={activePage === "news" ? styles.activate : " "}>
                        blogs
                    </a>
                </Link>
            </div>
                
        </nav>
    )
}