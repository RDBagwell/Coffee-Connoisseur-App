import { useEffect, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Home.module.css';
import Banner from '../commponents/Banner';
import Card from '../commponents/Card';
import {ACTION_TYPES, storeContext} from '../store/store-context';

import {getCoffeeShops} from '../lib/coffee-shops';
import useTrackLocation from '../hooks/use-track-location';


export default function Home({coffeeStores}) {

  const {hanleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation();

  function handleOnButtonClick(){
    hanleTrackLocation()
  }
  
  const {dispatch, state} = useContext(storeContext);
  const {localStores, latLong} = state;

  useEffect(async()=>{
    if(latLong){
      try {
        const limmit = 15;
        const fetchedCoffeeStores = await fetch(`/api/getCoffeeStoreByLocation?latLong=${latLong}&limit=${limmit}`);
         const localStores = await fetchedCoffeeStores.json()
        dispatch({
          type: ACTION_TYPES.SET_LOCAL_STORES,
          payload: {localStores}
        })
      } catch (error) {
         console.log(error);
      }
    }
  },[latLong])

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Coffee Connoisseur app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner buttonText={ isFindingLocation ? "Loading..." : "Coffee Shops Nearby."} handleOnclick={handleOnButtonClick}/>
        {locationErrorMsg&&<p>Something went wrong: {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} alt="hero image"/>
        </div>

        {localStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Loacal Stores</h2>
            <div className={styles.cardLayout}>
              {localStores.map((store)=>{
                return <Card key={store.fsq_id} className={styles.card} name={store.name} href={`/coffee-store/${store.fsq_id}`} imageURL={store.imageURL || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}  />
              })}
            </div>
          </div>
        ) }

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Salt Lake Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store)=>{
                return <Card key={store.fsq_id} className={styles.card} name={store.name} href={`/coffee-store/${store.fsq_id}`} imageURL={store.imageURL || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}  />
              })}
            </div>
          </div>
        ) }
      </main>
    </div>
  )

}

export async function getStaticProps(context) {
  const coffeeStores = await getCoffeeShops();
  return {
    props: {
      coffeeStores
    },
  }
}
