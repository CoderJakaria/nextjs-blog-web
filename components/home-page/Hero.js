import React from 'react'
import heroStyles from './hero.module.css'
import Image from 'next/image'

const Hero = () => {
    return (
        <section className={heroStyles.hero}>
            <div className={heroStyles.image}>
              <Image src="/images/site/max.jpg" alt="An image showing image" width={300} height={300}/>
            </div>
            <h1>Hi, I'm Mohammad Jakaria</h1>
            <p>I blog about web development specially --> about Frontend library like React JS and its framwork like Next JS</p>
        </section>
    )
}

export default Hero
