import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/instagram.svg" />
      </Head>
      <Header />
      <Feed/>
      <Modal/>
    </div>
  )
}

export default Home
