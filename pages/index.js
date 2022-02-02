import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Home.module.css';
import Banner from '../commponents/Banner';
import Card from '../commponents/Card';
import coffeeStoreData from '../data/coffee-stores.json';

export default function Home({coffeeStores}) {

  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState('Locating...');

  function getLocation(){
    navigator.geolocation.getCurrentPosition((postion)=>{
      setStatus(null);
      setCoords(`${postion.coords.latitude},${postion.coords.longitude}`);
    })
  }

 function handleOnButtonClick(){
    console.log('hi')
    return 'hi';
  }

  useEffect(getLocation, []);

  console.log(`status = ${status} coords = ${coords}`)

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Coffee Connoisseur app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner buttonText="Find Coffee Shops Nearby." handleOnclick={handleOnButtonClick}/>
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="hero image"/>
        </div>
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store)=>{
                return <Card key={store.id} className={styles.card} name={store.name} href={`/coffee-store/${store.id}`} imageURL={store.imgUrl}  />
              })}
            </div>
          </>
        ) }

      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores:coffeeStoreData
    },
  }
}
