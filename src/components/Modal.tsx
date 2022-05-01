import { Fragment } from 'react'

function Modal(props: any) {

	return (
       <Fragment>
            <div className={`modal ${props.name ? `modal--active` : ``}`}>
                <div className='modal-close' onClick={() => props.reset(true)}>X</div>
                <div className='modal-video'>
                    <div className='modal-connecting'>Connecting...</div>
                    {props.video ? 
                        <video src={`/video/${props.video}.mp4`} 
                            autoPlay={true}
                            controls={false} 
                            muted={true} 
                            loop={true} /> : ``}
                </div>
                <div className='modal-body'>
                    <div className='modal-live'>Live</div>
                    <div className={`modal-image modal-image--${props.bubble}`}>

                        <div className={`modal-bubble modal-bubble--${props.bubble}`}>
                            {props.bubble === "check" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg> : ``}
                            {props.bubble === "sleep" ? <Fragment><sub>Z</sub><sup>z</sup></Fragment> : ``}
                            {props.bubble === "idle" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg> : ``}
                            {props.bubble === "alert" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 352c17.69 0 32-14.32 32-31.1V64.01c0-17.67-14.31-32.01-32-32.01S32 46.34 32 64.01v255.1C32 337.7 46.31 352 64 352zM64 400c-22.09 0-40 17.91-40 40s17.91 39.1 40 39.1s40-17.9 40-39.1S86.09 400 64 400z"/></svg> : ``}
                        </div>

                        <img src={props.image} />
                    </div>
                    <div className='modal-main'>
                        <div className='modal-name'>{props.name}</div>
                        <div className='modal-sub'>{props.sub}</div>
                    </div>
                    <div className='modal-stats'>
                        <div className='modal-stat'>
                            <div className='modal-stat-circle'>
                                <div className='modal-stat-value'>97%</div>
                                <div className='modal-stat-sub'>Full</div>
                            </div>
                            <div className='modal-stat-name'>
                                <div className='modal-stat-icon'>O<sub>2</sub></div>
                                <div className='modal-stat-name'>Oxygen</div>
                            </div>
                        </div>
                        <div className='modal-stat'>
                            <div className='modal-stat-circle'>
                                <div className='modal-stat-value'>99.8</div>
                                <div className='modal-stat-sub'>Fahrenheight</div>
                            </div>
                            <div className='modal-stat-name'>
                                <div className='modal-stat-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M176 322.9V112c0-8.75-7.25-16-16-16s-16 7.25-16 16v210.9c-18.62 6.625-32 24.25-32 45.13c0 26.5 21.5 48 48 48s48-21.5 48-48C208 347.1 194.6 329.5 176 322.9zM272 278.5V112c0-61.87-50.12-112-111.1-112S48 50.13 48 112v166.5c-19.75 24.75-32 55.5-32 89.5c0 79.5 64.5 143.1 144 143.1S304 447.5 304 368C304 334 291.8 303.1 272 278.5zM160 448c-44.13 0-80-35.87-80-79.1c0-25.5 12.25-48.88 32-63.75v-192.3c0-26.5 21.5-48 48-48s48 21.5 48 48v192.3c19.75 14.75 32 38.25 32 63.75C240 412.1 204.1 448 160 448z"/></svg></div>
                                <div className='modal-stat-name'>Body Temp</div>
                            </div>
                        </div>
                        <div className='modal-stat'>
                            <div className='modal-stat-circle'>
                                <div className='modal-stat-value'>110</div>
                                <div className='modal-stat-sub'>Bpm</div>
                            </div>
                            <div className='modal-stat-name'>
                                <div className='modal-stat-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M352.4 243.8l-49.83 99.5c-6.009 12-23.41 11.62-28.92-.625L216.7 216.3l-30.05 71.75L88.55 288l176.4 182.2c12.66 13.07 33.36 13.07 46.03 0l176.4-182.2l-112.1 .0052L352.4 243.8zM495.2 62.86c-54.36-46.98-137.5-38.5-187.5 13.06L288 96.25L268.3 75.92C218.3 24.36 135.2 15.88 80.81 62.86C23.37 112.5 16.84 197.6 60.18 256h105l35.93-86.25c5.508-12.88 23.66-13.12 29.54-.375l58.21 129.4l49.07-98c5.884-11.75 22.78-11.75 28.67 0l27.67 55.25h121.5C559.2 197.6 552.6 112.5 495.2 62.86z"/></svg></div>
                                <div className='modal-stat-name'>Heart Rate</div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-blocks'>
                        <div className='modal-block'>
                            <div className='modal-block-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 256C288 273.7 273.7 288 256 288C238.3 288 224 273.7 224 256C224 238.3 238.3 224 256 224C273.7 224 288 238.3 288 256zM112 256C112 176.5 176.5 112 256 112C335.5 112 400 176.5 400 256C400 335.5 335.5 400 256 400C176.5 400 112 335.5 112 256zM256 336C300.2 336 336 300.2 336 256C336 211.8 300.2 176 256 176C211.8 176 176 211.8 176 256C176 300.2 211.8 336 256 336zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 64C149.1 64 64 149.1 64 256C64 362 149.1 448 256 448C362 448 448 362 448 256C448 149.1 362 64 256 64z"/></svg></div>
                            <div className='modal-block-title'>Status</div>
                            <div className='modal-block-value'>In Building</div>
                        </div>
                        <div className='modal-block'>
                            <div className='modal-block-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg></div>
                            <div className='modal-block-title'>Location</div>
                            <div className='modal-block-value'>X, Y, Z</div>
                        </div>
                        <div className='modal-block'>
                            <div className='modal-block-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 256C288 273.7 273.7 288 256 288C238.3 288 224 273.7 224 256C224 238.3 238.3 224 256 224C273.7 224 288 238.3 288 256zM0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM325.1 306.7L380.6 162.4C388.1 142.1 369 123.9 349.6 131.4L205.3 186.9C196.8 190.1 190.1 196.8 186.9 205.3L131.4 349.6C123.9 369 142.1 388.1 162.4 380.6L306.7 325.1C315.2 321.9 321.9 315.2 325.1 306.7V306.7z"/></svg></div>
                            <div className='modal-block-title'>Closest Unit</div>
                            <div className='modal-block-value'>LD23</div>
                        </div>
                        <div className='modal-block'>
                            <div className='modal-block-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg></div>
                            <div className='modal-block-title'>Time Deployed</div>
                            <div className='modal-block-value'>1 hr 45 min</div>
                        </div>
                    </div>
                </div>
                <div className='modal-contact'>
                    <div className='modal-contact-button'>
                        <div className='modal-contact-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z"/></svg></div>
                        <div className='modal-contact-text'>Message</div>
                    </div>
                    <div className='modal-contact-button'>
                        <div className='modal-contact-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></svg></div>
                        <div className='modal-contact-text'>Call</div>
                    </div>
                </div>
            </div>
       </Fragment>
	)
}

export default Modal
