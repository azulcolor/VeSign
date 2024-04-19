import Image from "next/image";

import lightLogo from "../../../../public/images/logo/lightLogo.png";
import styles from "../../../../styles/auth/auth.module.css";

export default function Logo() {
  return (
    <>
      <Image src={lightLogo} alt='logo' width={90} />
      <ul className={styles.title}>
        <li className={styles.veSign}>Vesign</li>
        <li className={styles.separation}>|</li>
        <li className={styles.capital}>Capital</li>
      </ul>
      <p className={styles.session}>Iniciar sesión</p>
    </>
  )
}
