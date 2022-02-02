import {useRouter} from "next/router";
import Link from 'next/link';
import Head from "next/head";
import Image from 'next/image';
import cls from 'classnames';
import coffeeStoreData from '../../data/coffee-stores.json';
import styles from "../../styles/coffee-store.module.css";


export default function CoffeeStaore({coffeeStores}) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    let stars = 0

    const handleUpVoteButton = ()=>{
        return stars++;
    }

 
    const {name, address, neighbourhood, imgUrl} = coffeeStores
    return (
        <div className={styles.layout}> 
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href={'/'}>
                            <a>Back To Home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name} />
                </div>
                <div className={cls("glass",styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width={24} height={24} />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width={24} height={24} />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width={24} height={24} />
                        <p className={styles.text}>{stars}</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpVoteButton}>Up Vote</button>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps({ params }) {

    return {
        props: {
        coffeeStores:coffeeStoreData.find((coffeeStore)=>{
            return coffeeStore.id.toString() === params.id;
        })
        },
    }
}

export async function getStaticPaths() {
    const path = coffeeStoreData.map((coffeeStore)=>{
        return {
            params: {
                id: coffeeStore.id.toString()
            }
        }
    })
    return {
        paths: path,
        fallback: true
    };
}