import { GetStaticProps } from 'next'
import Image from 'next/image';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import HomeImage from '../../public/images/avatar.svg'

import styles from './home.module.scss'

type HomeProps = {
  product: {
    priceId: string;
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
          <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>🖐 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image src={HomeImage} alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const revalidateTime = 60 * 60 * 24;

  const price = await stripe.prices.retrieve('price_1Jf7mEJKzQr01tGL138dqNys', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: revalidateTime
  }
}
