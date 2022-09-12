import React from 'react'
import Wave from 'react-wavify'
import './Wave.css';

const WaveAnimation = () => {
    return (
        <>
            <section className='wave'>
                <Wave fill='#4983FF'
                    paused={false}
                    options={{
                        height: 20,
                        amplitude: 20,
                        speed: 0.25,
                        points: 3
                    }}
                />
            </section>
        </>
    );
}

export default WaveAnimation;